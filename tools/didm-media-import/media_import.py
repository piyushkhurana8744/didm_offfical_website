#!/usr/bin/env python3
"""Offline-first, safety-conscious importer for public DIDM media.

Discovery never performs network I/O. Downloads require both --download and an
explicit authorization acknowledgement so a plain invocation is always safe.
"""

from __future__ import annotations

import argparse
import csv
import hashlib
import html
from html.parser import HTMLParser
from io import BytesIO
import ipaddress
import json
import mimetypes
from pathlib import Path
import re
import socket
import ssl
import time
from typing import Any, Iterable
import xml.etree.ElementTree as ET
from urllib.error import HTTPError, URLError
from urllib.parse import unquote, urljoin, urlparse
from urllib.request import HTTPRedirectHandler, HTTPSHandler, Request, build_opener
from urllib.robotparser import RobotFileParser

try:
    from PIL import Image, UnidentifiedImageError
except ImportError:  # Live imports fail closed; offline inventory remains usable.
    Image = None
    UnidentifiedImageError = OSError

ROOT = Path(__file__).resolve().parents[2]
CRAWLER = ROOT / "crawler-output"
PUBLIC_ROOT = ROOT / "apps/web/public/images/didm"
STATE_FILE = Path(__file__).with_name("import-state.jsonl")
INVENTORY_CSV = Path(__file__).with_name("dry-run-inventory.csv")
SUMMARY_JSON = Path(__file__).with_name("dry-run-summary.json")
RUN_REPORT_JSON = Path(__file__).with_name("last-run-report.json")
STAGE_PLAN_JSON = Path(__file__).with_name("staged-import-plan.json")

SOURCE_HOSTS = {"didm.in", "www.didm.in"}
BLOG_HOSTS = {"blog.didm.in", "www.blog.didm.in"}
# Live downloads are intentionally narrower than discovery. Cloudinary and all
# other third-party hosts remain inventoried but are never fetched by this tool.
ALLOWED_MEDIA_HOSTS = SOURCE_HOSTS
ALLOWED_MIMES = {
    "image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml",
    "image/avif", "image/x-icon", "image/vnd.microsoft.icon",
}
MAX_BYTES = 25 * 1024 * 1024
MAX_PIXELS = 50_000_000
MAX_FRAMES = 1_000
AUTH_ACK = "I_APPROVE_PUBLIC_DIDM_MEDIA_DOWNLOADS"
RIGHTS_ACK = "I_CONFIRM_DIDM_REUSE_AUTHORIZATION"
USER_AGENT = "DIDM-Media-Importer/2.0 (+https://www.didm.in/)"
REDIRECT_CODES = {301, 302, 303, 307, 308}
MAX_REDIRECTS = 5
URL_RE = re.compile(r"https?://[^\s\"'<>\\)]+", re.I)
CSS_URL_RE = re.compile(r"url\(\s*(['\"]?)(.*?)\1\s*\)", re.I)
IMAGE_EXT_RE = re.compile(r"\.(?:avif|gif|ico|jpe?g|png|svg|webp)(?:$|[?#])", re.I)


def normalise_url(value: str, page_url: str) -> str | None:
    value = html.unescape(value.strip().strip("'\""))
    if not value or value.startswith(("data:", "blob:", "javascript:", "#")):
        return None
    absolute = urljoin(page_url, value)
    parsed = urlparse(absolute)
    if parsed.scheme not in {"http", "https"} or not parsed.hostname:
        return None
    # Fragments never affect the resource returned by HTTP.
    return parsed._replace(fragment="").geturl()


def srcset_values(value: str) -> Iterable[str]:
    for candidate in value.split(","):
        candidate = candidate.strip()
        if candidate:
            yield candidate.split()[0]


class MediaHTMLParser(HTMLParser):
    ATTRS = {"src", "data-src", "data-lazy-src", "data-original", "data-bg", "data-background", "poster"}
    SRCSETS = {"srcset", "data-srcset", "data-lazy-srcset"}

    def __init__(self, page_url: str) -> None:
        super().__init__(convert_charrefs=True)
        self.page_url = page_url
        self.items: list[tuple[str, str, str, str]] = []

    def add(self, raw: str, kind: str, alt: str = "", title: str = "") -> None:
        url = normalise_url(raw, self.page_url)
        if url:
            self.items.append((url, kind, alt.strip(), title.strip()))

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = {k.lower(): v or "" for k, v in attrs}
        alt, title = values.get("alt", ""), values.get("title", "")
        for key in self.ATTRS:
            if values.get(key) and (tag in {"img", "source", "video", "input"} or key != "src"):
                self.add(values[key], f"html:{tag}:{key}", alt, title)
        for key in self.SRCSETS:
            for raw in srcset_values(values.get(key, "")):
                self.add(raw, f"html:{tag}:{key}", alt, title)
        if values.get("style"):
            for match in CSS_URL_RE.finditer(values["style"]):
                self.add(match.group(2), "css:inline", alt, title)
        if tag == "meta":
            prop = (values.get("property") or values.get("name") or "").lower()
            if prop in {"og:image", "og:image:url", "og:image:secure_url", "twitter:image", "twitter:image:src"}:
                self.add(values.get("content", ""), f"meta:{prop}")
        if tag == "link":
            rel = values.get("rel", "").lower()
            if any(token in rel for token in ("icon", "apple-touch-image", "image_src")):
                self.add(values.get("href", ""), f"html:link:{rel}")

    def handle_data(self, data: str) -> None:
        # Captures background-image rules in style elements and JSON-LD image URLs.
        for match in CSS_URL_RE.finditer(data):
            self.add(match.group(2), "css:style-block")


def add_record(records: dict[str, dict[str, Any]], url: str, page: str, kind: str,
               alt: str = "", title: str = "") -> None:
    parsed = urlparse(url)
    if not parsed.hostname:
        return
    rec = records.setdefault(url, {
        "source_url": url, "host": parsed.hostname.lower(), "referring_pages": set(),
        "discovered_via": set(), "alt_texts": set(), "titles": set(),
    })
    if page:
        rec["referring_pages"].add(page)
    rec["discovered_via"].add(kind)
    if alt:
        rec["alt_texts"].add(alt)
    if title:
        rec["titles"].add(title)


def looks_like_image(url: str, kind: str) -> bool:
    return bool(IMAGE_EXT_RE.search(urlparse(url).path)) or any(
        marker in kind for marker in ("img", "image", "srcset", "poster", "css")
    )


def discover() -> dict[str, dict[str, Any]]:
    records: dict[str, dict[str, Any]] = {}
    manifest = CRAWLER / "media_manifest.csv"
    if manifest.exists():
        with manifest.open(newline="", encoding="utf-8-sig") as handle:
            for row in csv.DictReader(handle):
                raw = row.get("media_url", "")
                page = row.get("source_page", "") or "https://www.didm.in/"
                url = normalise_url(raw, page)
                kind = "manifest:" + row.get("media_type", "unknown")
                if url and looks_like_image(url, kind):
                    add_record(records, url, page, kind, row.get("alt_text", ""), row.get("title", ""))

    pages_by_snapshot: dict[str, str] = {}
    pages_file = CRAWLER / "pages.jsonl"
    if pages_file.exists():
        for line in pages_file.read_text(encoding="utf-8").splitlines():
            try:
                row = json.loads(line)
            except json.JSONDecodeError:
                continue
            page = row.get("final_url") or row.get("source_url") or "https://www.didm.in/"
            snap = row.get("raw_html_snapshot")
            if snap:
                pages_by_snapshot[Path(snap).name] = page
            # Extract explicit media URLs recorded in crawler JSON without treating
            # every ordinary hyperlink as an image.
            def walk(value: Any, key: str = "") -> None:
                if isinstance(value, dict):
                    for child_key, child in value.items():
                        walk(child, str(child_key).lower())
                elif isinstance(value, list):
                    for child in value:
                        walk(child, key)
                elif isinstance(value, str) and any(x in key for x in ("image", "logo", "thumbnail", "media")):
                    for raw in URL_RE.findall(value):
                        url = normalise_url(raw, page)
                        if url and looks_like_image(url, "pages-json:" + key):
                            add_record(records, url, page, "pages-json:" + key)
            walk(row)

    # page_content.json is a separate normalized crawler artifact. Keep its
    # references and provenance even when they overlap with pages.jsonl.
    content_file = CRAWLER / "page_content.json"
    if content_file.exists():
        try:
            content_payload = json.loads(content_file.read_text(encoding="utf-8"))
        except json.JSONDecodeError:
            content_payload = []
        def walk_content(value: Any, page: str = "https://www.didm.in/", key: str = "") -> None:
            if isinstance(value, dict):
                candidate_page = value.get("source_url") or value.get("url") or page
                if not isinstance(candidate_page, str) or not candidate_page.startswith(("http://", "https://")):
                    candidate_page = page
                for child_key, child in value.items():
                    walk_content(child, candidate_page, str(child_key).lower())
            elif isinstance(value, list):
                for child in value:
                    walk_content(child, page, key)
            elif isinstance(value, str) and any(x in key for x in ("image", "logo", "thumbnail", "media")):
                for raw in URL_RE.findall(value):
                    url = normalise_url(raw, page)
                    if url and looks_like_image(url, "page-content:" + key):
                        add_record(records, url, page, "page-content:" + key)
        walk_content(content_payload)

    for snapshot in sorted((CRAWLER / "raw_html").glob("*.html")):
        page = pages_by_snapshot.get(snapshot.name, "https://www.didm.in/")
        parser = MediaHTMLParser(page)
        try:
            parser.feed(snapshot.read_text(encoding="utf-8", errors="replace"))
        except Exception:
            continue
        for url, kind, alt, title in parser.items:
            if looks_like_image(url, kind):
                add_record(records, url, page, kind, alt, title)

    return records


def category_for(rec: dict[str, Any]) -> str:
    text = " ".join([rec["source_url"], *rec["referring_pages"], *rec["alt_texts"]]).lower()
    rules = [
        ("logo", ("logo", "favicon", "badge")),
        ("trainers", ("trainer", "mentor", "rahul", "shrey", "faculty")),
        ("students", ("student", "testimonial", "review", "batch", "convocation")),
        ("placements", ("placement", "partner", "company", "career")),
        ("certifications", ("certificate", "certification", "award", "assocham", "iso")),
        ("centres", ("centre", "center", "branch", "campus", "dwarka", "noida", "gurgaon", "kalkaji", "meerut")),
        ("courses", ("course", "program", "midm", "aidm", "digital-marketing-artificial")),
        ("blog", ("blog.didm", "/blog/", "news")),
        ("homepage", ("banner", "slider", "hero", "didm.in/")),
    ]
    return next((category for category, tokens in rules if any(t in text for t in tokens)), "misc")


def status_for(rec: dict[str, Any]) -> tuple[str, str]:
    host = rec["host"]
    parsed = urlparse(rec["source_url"])
    if host in BLOG_HOSTS:
        return "blocked_blog_tls", "Blog downloads prohibited until its TLS issue is resolved"
    if host not in ALLOWED_MEDIA_HOSTS:
        return "pending_authorization", "Third-party host is not on the media allowlist"
    if parsed.scheme != "https":
        return "ineligible_http", "TLS-verified HTTPS is required"
    return "eligible", "Network-eligible DIDM-host image; reuse authorization must be confirmed separately"


def safe_stem(url: str) -> str:
    stem = Path(unquote(urlparse(url).path)).stem.lower()
    stem = re.sub(r"[^a-z0-9]+", "-", stem).strip("-")[:80] or "image"
    return stem


def planned_path(rec: dict[str, Any]) -> str:
    parsed = urlparse(rec["source_url"])
    ext = Path(unquote(parsed.path)).suffix.lower()
    if ext not in {".avif", ".gif", ".ico", ".jpeg", ".jpg", ".png", ".svg", ".webp"}:
        ext = ".img"
    suffix = hashlib.sha256(rec["source_url"].encode()).hexdigest()[:10]
    return f"apps/web/public/images/didm/{category_for(rec)}/{safe_stem(rec['source_url'])}-{suffix}{ext}"


def serialise(records: dict[str, dict[str, Any]]) -> list[dict[str, str]]:
    output: list[dict[str, str]] = []
    for rec in sorted(records.values(), key=lambda item: item["source_url"]):
        status, reason = status_for(rec)
        output.append({
            "source_url": rec["source_url"], "host": rec["host"], "status": status,
            "reason": reason, "category": category_for(rec), "local_destination": planned_path(rec),
            "referring_pages": " | ".join(sorted(rec["referring_pages"])),
            "discovered_via": " | ".join(sorted(rec["discovered_via"])),
            "alt_texts": " | ".join(sorted(rec["alt_texts"])),
            "license_authorization_status": "pending_explicit_reuse_confirmation",
        })
    return output


def write_inventory(rows: list[dict[str, str]]) -> dict[str, Any]:
    INVENTORY_CSV.parent.mkdir(parents=True, exist_ok=True)
    with INVENTORY_CSV.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=list(rows[0]) if rows else ["source_url"])
        writer.writeheader()
        writer.writerows(rows)
    statuses: dict[str, int] = {}
    hosts: dict[str, int] = {}
    for row in rows:
        statuses[row["status"]] = statuses.get(row["status"], 0) + 1
        hosts[row["host"]] = hosts.get(row["host"], 0) + 1
    summary = {
        "mode": "offline-dry-run", "network_requests_made": 0,
        "unique_image_urls_discovered": len(rows), "status_counts": dict(sorted(statuses.items())),
        "host_counts": dict(sorted(hosts.items())),
        "eligible_hosts": sorted({r["host"] for r in rows if r["status"] == "eligible"}),
        "expected_media_get_requests": sum(r["status"] == "eligible" for r in rows),
        "expected_robots_get_requests": len({r["host"] for r in rows if r["status"] == "eligible"}),
        "expected_minimum_total_get_requests": (
            sum(r["status"] == "eligible" for r in rows)
            + len({r["host"] for r in rows if r["status"] == "eligible"})
        ),
        "note": "Minimum total includes one robots.txt GET per eligible host; redirects and policy-compliant retries cannot be known offline.",
    }
    SUMMARY_JSON.write_text(json.dumps(summary, indent=2) + "\n", encoding="utf-8")
    return summary


def load_inventory() -> list[dict[str, str]]:
    if not INVENTORY_CSV.is_file():
        raise FileNotFoundError(f"Preserved inventory is missing: {INVENTORY_CSV}")
    with INVENTORY_CSV.open(newline="", encoding="utf-8-sig") as handle:
        rows = list(csv.DictReader(handle))
    required = {"source_url", "host", "status", "category", "local_destination", "referring_pages"}
    if not rows or not required.issubset(rows[0]):
        raise ValueError("Preserved inventory is empty or missing required columns")
    return rows


def assert_public_host(host: str) -> None:
    if host.lower() not in ALLOWED_MEDIA_HOSTS:
        raise ValueError(f"Host is not allowlisted: {host}")
    for info in socket.getaddrinfo(host, 443, type=socket.SOCK_STREAM):
        address = ipaddress.ip_address(info[4][0])
        if not address.is_global:
            raise ValueError(f"Host resolves to a non-public address: {address}")


class NoRedirectHandler(HTTPRedirectHandler):
    """Expose redirects as HTTPError so every hop can be policy-checked."""

    def redirect_request(self, req: Request, fp: Any, code: int, msg: str,
                         headers: Any, newurl: str) -> None:
        return None


def sniff_mime(data: bytes) -> str | None:
    if data.startswith(b"\xff\xd8\xff"):
        return "image/jpeg"
    if data.startswith(b"\x89PNG\r\n\x1a\n"):
        return "image/png"
    if data[:6] in {b"GIF87a", b"GIF89a"}:
        return "image/gif"
    if data.startswith(b"RIFF") and data[8:12] == b"WEBP":
        return "image/webp"
    if data.startswith(b"\x00\x00\x01\x00"):
        return "image/x-icon"
    if data[4:12] in {b"ftypavif", b"ftypavis"}:
        return "image/avif"
    prefix = data[:1024].lstrip(b"\xef\xbb\xbf\x00\t\r\n ").lower()
    if prefix.startswith(b"<svg") or (prefix.startswith(b"<?xml") and b"<svg" in prefix):
        return "image/svg+xml"
    return None


def normalise_mime(value: str) -> str:
    value = value.split(";", 1)[0].strip().lower()
    return {
        "image/jpg": "image/jpeg", "image/pjpeg": "image/jpeg",
        "image/x-png": "image/png", "image/vnd.microsoft.icon": "image/x-icon",
    }.get(value, value)


def validate_svg(data: bytes) -> None:
    if b"<!doctype" in data.lower() or b"<!entity" in data.lower():
        raise ValueError("SVG DTD/entity declarations are forbidden")
    try:
        root = ET.fromstring(data)
    except ET.ParseError as exc:
        raise ValueError(f"SVG XML is invalid: {exc}") from exc
    if root.tag.split("}")[-1].lower() != "svg":
        raise ValueError("SVG root element is not <svg>")
    for element in root.iter():
        if element.tag.split("}")[-1].lower() in {"script", "foreignobject", "iframe", "object", "embed"}:
            raise ValueError("SVG contains active or embedded content")
        for raw_name, raw_value in element.attrib.items():
            name = raw_name.split("}")[-1].lower()
            value = raw_value.strip().lower()
            if name.startswith("on"):
                raise ValueError("SVG event handlers are forbidden")
            if name in {"href", "src"} and value.startswith(("http:", "https:", "//", "javascript:", "data:")):
                raise ValueError("SVG external or active references are forbidden")
            if name == "style" and ("url(" in value or "@import" in value or "javascript:" in value):
                raise ValueError("SVG CSS references are forbidden")
        if element.tag.split("}")[-1].lower() == "style" and element.text:
            css = element.text.lower()
            if "url(" in css or "@import" in css or "javascript:" in css:
                raise ValueError("SVG CSS references are forbidden")


def validate_image_data(data: bytes, declared_mime: str | None = None,
                        expected_mime: str | None = None) -> str:
    detected = sniff_mime(data)
    if detected not in ALLOWED_MIMES:
        raise ValueError("Invalid or unsupported image signature")
    detected = normalise_mime(detected)
    if declared_mime and normalise_mime(declared_mime) != detected:
        raise ValueError(f"MIME/signature mismatch: declared {declared_mime}, detected {detected}")
    if expected_mime and normalise_mime(expected_mime) != detected:
        raise ValueError(f"Stored MIME/signature mismatch: expected {expected_mime}, detected {detected}")
    if detected == "image/svg+xml":
        validate_svg(data)
        return detected
    if Image is None:
        raise ValueError("Pillow is required to decode raster images safely")
    try:
        with Image.open(BytesIO(data)) as image:
            image.verify()
        with Image.open(BytesIO(data)) as image:
            if image.width < 1 or image.height < 1:
                raise ValueError("Decoded image has invalid dimensions")
            if image.width * image.height > MAX_PIXELS:
                raise ValueError("Decoded image exceeds pixel limit")
            frames = getattr(image, "n_frames", 1)
            if frames > MAX_FRAMES:
                raise ValueError("Animated image exceeds frame limit")
            for frame in range(frames):
                image.seek(frame)
                image.load()
    except (UnidentifiedImageError, OSError, SyntaxError) as exc:
        raise ValueError(f"Image decoding failed: {exc}") from exc
    return detected


def state_rows() -> list[dict[str, Any]]:
    rows: list[dict[str, Any]] = []
    if STATE_FILE.exists():
        for line in STATE_FILE.read_text(encoding="utf-8").splitlines():
            try:
                rows.append(json.loads(line))
            except json.JSONDecodeError:
                pass
    return rows


def verify_resume_entry(row: dict[str, Any]) -> tuple[bool, str]:
    try:
        relative = Path(row["local_destination"])
        if relative.is_absolute() or ".." in relative.parts:
            return False, "unsafe stored destination"
        path = ROOT / relative
        if not path.is_file():
            return False, "stored file is missing"
        data = path.read_bytes()
        if len(data) != int(row["file_size"]):
            return False, "stored size does not match"
        if hashlib.sha256(data).hexdigest() != row["sha256"]:
            return False, "stored SHA-256 does not match"
        validate_image_data(data, expected_mime=row["mime_type"])
        return True, "verified"
    except (KeyError, OSError, TypeError, ValueError) as exc:
        return False, str(exc)


def verified_completed() -> tuple[set[str], list[dict[str, str]]]:
    latest: dict[str, dict[str, Any]] = {}
    for row in state_rows():
        if row.get("status") == "downloaded" and row.get("source_url"):
            latest[row["source_url"]] = row
    completed: set[str] = set()
    invalid: list[dict[str, str]] = []
    for url, row in latest.items():
        valid, reason = verify_resume_entry(row)
        if valid:
            completed.add(url)
        else:
            invalid.append({"source_url": url, "reason": reason})
    return completed, invalid


def append_state(row: dict[str, Any]) -> None:
    with STATE_FILE.open("a", encoding="utf-8") as handle:
        handle.write(json.dumps(row, sort_keys=True) + "\n")


class PolicyClient:
    def __init__(self, delay_seconds: float = 3.0) -> None:
        self.delay_seconds = max(3.0, delay_seconds)
        self.last_request: dict[str, float] = {}
        self.robots: dict[str, RobotFileParser | None] = {}
        self.robots_errors: dict[str, str] = {}
        self.ssl_context = ssl.create_default_context()
        self.opener = build_opener(HTTPSHandler(context=self.ssl_context), NoRedirectHandler())

    def throttle(self, host: str) -> None:
        wait = self.delay_seconds - (time.monotonic() - self.last_request.get(host, 0.0))
        if wait > 0:
            time.sleep(wait)

    def raw_get(self, url: str) -> Any:
        parsed = urlparse(url)
        if parsed.scheme != "https" or not parsed.hostname:
            raise ValueError("Only HTTPS GET requests are allowed")
        assert_public_host(parsed.hostname)
        self.throttle(parsed.hostname)
        request = Request(url, method="GET", headers={"User-Agent": USER_AGENT})
        self.last_request[parsed.hostname] = time.monotonic()
        return self.opener.open(request, timeout=30)

    def fetch_robots_document(self, robots_url: str) -> tuple[str, bytes]:
        current = robots_url
        visited: set[str] = set()
        for _ in range(MAX_REDIRECTS + 1):
            if current in visited:
                raise PermissionError("robots.txt redirect loop rejected")
            visited.add(current)
            try:
                response = self.raw_get(current)
            except HTTPError as exc:
                if exc.code not in REDIRECT_CODES:
                    raise
                location = exc.headers.get("Location")
                if not location:
                    raise ValueError("robots.txt redirect has no Location header") from exc
                destination = urljoin(current, location)
                parsed = urlparse(destination)
                if parsed.scheme != "https" or not parsed.hostname:
                    raise PermissionError("robots.txt redirect destination must be HTTPS")
                assert_public_host(parsed.hostname)
                current = destination
                continue
            with response:
                content_type = normalise_mime(response.headers.get_content_type())
                if content_type != "text/plain":
                    raise ValueError(f"robots.txt must be text/plain, received {content_type}")
                body = response.read(1024 * 1024 + 1)
                if len(body) > 1024 * 1024:
                    raise ValueError("robots.txt exceeds size limit")
            prefix = body.lstrip().lower()[:256]
            if prefix.startswith((b"<!doctype html", b"<html", b"<head", b"<body")):
                raise ValueError("robots.txt response contains HTML")
            return current, body
        raise PermissionError(f"robots.txt exceeds {MAX_REDIRECTS} redirects")

    def robots_for(self, host: str) -> RobotFileParser | None:
        if host in self.robots:
            return self.robots[host]
        robots_url = f"https://{host}/robots.txt"
        try:
            _final_url, body = self.fetch_robots_document(robots_url)
            robots = RobotFileParser(robots_url)
            robots.parse(body.decode("utf-8", errors="strict").splitlines())
            self.robots[host] = robots
            self.robots_errors.pop(host, None)
        except (HTTPError, URLError, OSError, UnicodeError, ValueError, PermissionError) as exc:
            self.robots[host] = None
            self.robots_errors[host] = str(exc)
        return self.robots[host]

    def ensure_allowed(self, url: str) -> None:
        host = urlparse(url).hostname
        if not host:
            raise ValueError("URL has no host")
        robots = self.robots_for(host)
        if robots is None:
            detail = self.robots_errors.get(host, "unknown robots verification error")
            raise PermissionError(f"robots.txt could not be verified for {host}: {detail}; failing closed")
        if not robots.can_fetch(USER_AGENT, url):
            raise PermissionError(f"robots.txt disallows {url}")

    def get_media(self, url: str) -> tuple[Any, str]:
        current = url
        for _ in range(MAX_REDIRECTS + 1):
            self.ensure_allowed(current)
            try:
                return self.raw_get(current), current
            except HTTPError as exc:
                if exc.code not in REDIRECT_CODES:
                    raise
                location = exc.headers.get("Location")
                if not location:
                    raise ValueError("Redirect response has no Location header") from exc
                destination = urljoin(current, location)
                parsed = urlparse(destination)
                if parsed.scheme != "https" or not parsed.hostname:
                    raise PermissionError("Redirect destination must be HTTPS")
                assert_public_host(parsed.hostname)
                current = destination
        raise ValueError(f"More than {MAX_REDIRECTS} redirects")


def pilot_rows(rows: list[dict[str, str]], batch_size: int) -> list[dict[str, str]]:
    roles = ("branding", "homepage", "courses", "centres")

    def matches(row: dict[str, str], role: str) -> bool:
        if role == "branding":
            return row["category"] == "logo" and "didm-logo" in row["source_url"].lower()
        if role == "homepage":
            return "https://www.didm.in/" in row["referring_pages"].split(" | ") and row["category"] != "logo"
        return row["category"] == role

    def rank(row: dict[str, str]) -> tuple[int, str]:
        url = unquote(row["source_url"]).lower()
        preferred = ("didm-logo-reg", "banner", "hero", "master_in_", "ai-powered", "branch")
        return (next((index for index, token in enumerate(preferred) if token in url), len(preferred)), url)

    buckets = {role: sorted((row for row in rows if matches(row, role)), key=rank) for role in roles}
    selected: list[dict[str, str]] = []
    seen_resources: set[str] = set()
    while len(selected) < batch_size and any(buckets.values()):
        for role in roles:
            while buckets[role]:
                parsed = urlparse(buckets[role][0]["source_url"])
                resource_key = unquote(parsed.path).lower() + ("?" + parsed.query if parsed.query else "")
                if resource_key not in seen_resources:
                    break
                buckets[role].pop(0)
            if buckets[role] and len(selected) < batch_size:
                row = buckets[role].pop(0)
                parsed = urlparse(row["source_url"])
                seen_resources.add(unquote(parsed.path).lower() + ("?" + parsed.query if parsed.query else ""))
                selected.append(row)
    return selected


def load_staged_pilot_urls() -> list[str]:
    if not STAGE_PLAN_JSON.is_file():
        raise FileNotFoundError(f"Staged pilot plan is missing: {STAGE_PLAN_JSON}")
    payload = json.loads(STAGE_PLAN_JSON.read_text(encoding="utf-8"))
    urls = [row["source_url"] for row in payload.get("selected", [])]
    if len(urls) != 12 or len(set(urls)) != 12:
        raise ValueError("Staged pilot plan must contain exactly 12 unique assets")
    return urls


def select_batch(rows: list[dict[str, str]], completed: set[str], scope: str,
                 batch_size: int, pilot_urls: list[str] | None = None) -> list[dict[str, str]]:
    eligible = [
        row for row in rows
        if row["status"] == "eligible" and row["host"] in SOURCE_HOSTS
        and row["source_url"] not in completed
    ]
    if scope == "pilot":
        if pilot_urls is None:
            eligible = pilot_rows(eligible, batch_size)
        else:
            by_url = {row["source_url"]: row for row in eligible}
            eligible = [by_url[url] for url in pilot_urls if url in by_url]
    return eligible[:batch_size]


def stage_plan(rows: list[dict[str, str]], batch_size: int, scope: str) -> dict[str, Any]:
    completed, invalid_resume = verified_completed()
    selected = select_batch(rows, completed, scope, batch_size)
    return {
        "mode": "offline-stage-plan", "network_requests_made": 0,
        "scope": scope, "batch_size": batch_size,
        "reuse_authorization_status": "pending_explicit_user_confirmation",
        "already_verified": len(completed), "invalid_resume_entries": invalid_resume,
        "selected_count": len(selected),
        "pilot_coverage": ["branding", "homepage", "courses", "centres"] if scope == "pilot" else [],
        "selected": [
            {key: row[key] for key in ("source_url", "host", "category", "referring_pages", "local_destination")}
            for row in selected
        ],
    }


def error_outcome(exc: Exception) -> str:
    if isinstance(exc, PermissionError):
        return "blocked"
    if isinstance(exc, HTTPError) and exc.code in {401, 403, 406, 429}:
        return "blocked"
    return "failed"


def download(rows: list[dict[str, str]], batch_size: int, scope: str) -> dict[str, Any]:
    completed, invalid_resume = verified_completed()
    pilot_urls = load_staged_pilot_urls() if scope == "pilot" else None
    selected = select_batch(rows, completed, scope, batch_size, pilot_urls)
    counts = {
        "selected": len(selected), "downloaded": 0, "skipped": len(completed),
        "failed": 0, "blocked": 0, "resume_invalid": len(invalid_resume),
    }
    results: list[dict[str, Any]] = []
    client = PolicyClient()
    for row in selected:
        url = row["source_url"]
        try:
            response, final_url = client.get_media(url)
            with response:
                declared_mime = normalise_mime(response.headers.get_content_type())
                if declared_mime not in {normalise_mime(mime) for mime in ALLOWED_MIMES}:
                    raise ValueError(f"Disallowed MIME type: {declared_mime}")
                declared_size = response.headers.get("Content-Length")
                if declared_size and int(declared_size) > MAX_BYTES:
                    raise ValueError("Response exceeds size limit")
                data = response.read(MAX_BYTES + 1)
            if len(data) > MAX_BYTES:
                raise ValueError("Response exceeds size limit")
            detected = validate_image_data(data, declared_mime=declared_mime)
            digest = hashlib.sha256(data).hexdigest()
            dest = ROOT / row["local_destination"]
            ext = mimetypes.guess_extension(detected) or dest.suffix
            dest = dest.with_name(f"{dest.stem.rsplit('-', 1)[0]}-{digest[:12]}{ext}")
            dest.parent.mkdir(parents=True, exist_ok=True)
            if dest.exists():
                existing = dest.read_bytes()
                if hashlib.sha256(existing).hexdigest() != digest:
                    raise FileExistsError(f"Refusing to overwrite different content: {dest}")
                validate_image_data(existing, expected_mime=detected)
            else:
                temporary = dest.with_suffix(dest.suffix + ".part")
                if temporary.exists():
                    raise FileExistsError(f"Temporary destination already exists: {temporary}")
                temporary.write_bytes(data)
                temporary.replace(dest)
            state = {
                "source_url": url, "final_url": final_url,
                "referring_page": row["referring_pages"], "sha256": digest,
                "file_size": len(data), "mime_type": detected,
                "license_authorization_status": "user_confirmed_didm_reuse_authorization",
                "local_destination": str(dest.relative_to(ROOT)), "status": "downloaded",
            }
            append_state(state)
            results.append(state)
            counts["downloaded"] += 1
        except (HTTPError, URLError, OSError, ValueError, PermissionError) as exc:
            outcome = error_outcome(exc)
            state = {"source_url": url, "status": outcome, "error": str(exc)}
            append_state(state)
            results.append(state)
            counts[outcome] += 1
    report = {
        "mode": "live-download", "scope": scope, "batch_size": batch_size,
        "counts": counts, "invalid_resume_entries": invalid_resume, "results": results,
    }
    RUN_REPORT_JSON.write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
    return report


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--dry-run", action="store_true", help="Discover and report without network access (default)")
    parser.add_argument("--plan", action="store_true", help="Plan a staged batch from the preserved inventory; no network")
    parser.add_argument("--download", action="store_true", help="Perform approved GET-only downloads")
    parser.add_argument("--authorization-ack", default="", help="Required exact authorization phrase for downloads")
    parser.add_argument("--rights-ack", default="", help="Required exact reuse-rights confirmation for downloads")
    parser.add_argument("--scope", choices=("pilot", "remaining"), default="pilot",
                        help="Pilot samples branding/homepage/courses/centres; remaining resumes eligible assets")
    parser.add_argument("--batch-size", type=int, default=12, help="Maximum assets attempted (1-100)")
    args = parser.parse_args()
    if sum((args.download, args.dry_run, args.plan)) > 1:
        parser.error("Choose only one of --dry-run, --plan, or --download")
    if args.download and args.authorization_ack != AUTH_ACK:
        parser.error(f"Downloads require --authorization-ack {AUTH_ACK}")
    if args.download and args.rights_ack != RIGHTS_ACK:
        parser.error(f"Downloads require --rights-ack {RIGHTS_ACK}")
    if not 1 <= args.batch_size <= 100:
        parser.error("--batch-size must be between 1 and 100")
    if args.download:
        # Live runs consume the reviewed inventory and never repeat discovery.
        rows = load_inventory()
        print(json.dumps(download(rows, args.batch_size, args.scope), indent=2))
    elif args.plan:
        plan = stage_plan(load_inventory(), args.batch_size, args.scope)
        STAGE_PLAN_JSON.write_text(json.dumps(plan, indent=2) + "\n", encoding="utf-8")
        print(json.dumps(plan, indent=2))
    else:
        rows = serialise(discover())
        print(json.dumps(write_inventory(rows), indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

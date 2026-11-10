#!/usr/bin/env python3
"""Safe, sequential, robots-aware crawler for the public DIDM websites."""

from __future__ import annotations

import argparse
import csv
import email.utils
import hashlib
import html
import json
import os
import platform
import re
import shutil
import socket
import ssl
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
import urllib.robotparser
import xml.etree.ElementTree as ET
from collections import Counter, deque
from dataclasses import dataclass, field
from datetime import datetime, timedelta, timezone
from html.parser import HTMLParser
from pathlib import Path
from typing import Any, Iterable

ALLOWED_HOSTS = ("www.didm.in", "www.blog.didm.in")
SEEDS = ("https://www.didm.in/", "https://www.blog.didm.in/")
USER_AGENT = "DIDMContentMigrationCrawler/1.0 (+read-only; contact: info@didm.in)"
MAX_SITEMAP_DOCUMENTS_PER_HOST = 5
MAX_REDIRECT_HOPS = 5
MAX_TRANSIENT_RETRIES = 2
PRIVATE_SEGMENTS = {
    "admin", "administrator", "login", "signin", "signup", "account",
    "dashboard", "wp-admin", "wp-login.php", "user", "users", "auth",
    "checkout", "cart", "cgi-bin", "private", "internal",
}
UNSAFE_QUERY_KEYS = {"action", "token", "nonce", "logout", "delete", "remove",
                     "add-to-cart", "checkout", "submit"}
TRACKING_QUERY_PREFIXES = ("utm_",)
TRACKING_QUERY_KEYS = {"gclid", "fbclid", "msclkid", "mc_cid", "mc_eid"}
MEDIA_EXTENSIONS = {
    ".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".avif", ".ico",
    ".pdf", ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx", ".zip",
    ".mp3", ".mp4", ".webm", ".mov", ".avi", ".woff", ".woff2", ".ttf",
}
CONTENT_HINTS = {
    "course": ("course", "program", "syllabus", "curriculum", "training"),
    "centre": ("centre", "center", "location", "branch"),
    "trainer": ("trainer", "faculty", "mentor"),
    "testimonial": ("testimonial", "review", "trainee", "alumni", "story"),
    "placement": ("placement", "hiring", "career", "job"),
    "certification": ("certification", "certificate", "award"),
    "blog": ("blog", "article", "journal"),
    "news_event": ("news", "event"),
    "gallery": ("gallery", "media", "image", "life-didm"),
    "faq": ("faq", "frequently asked"),
    "legal": ("privacy", "terms", "refund", "legal", "policy"),
}
FLAGSHIP_COURSE_PATHS = (
    "digital-marketing-artificial-intelligence",
    "master-in-digital-marketing-course",
    "advanced-digital-marketing-course",
    "customized-digital-marketing-course",
    "online-digital-marketing-course",
    "gen-ai-knowledge-camp",
    "digital-marketing-course",
)
PRIORITY_CATEGORY_ORDER = {
    "flagship_course": 0,
    "centre": 1,
    "trainers_placements": 2,
    "testimonials_certifications": 3,
    "legal": 4,
    "other": 5,
    "news_events": 6,
    "blog": 7,
}


def utc_now() -> str:
    return datetime.now(timezone.utc).isoformat()


def canonicalize_url(url: str, base: str | None = None) -> str | None:
    absolute = urllib.parse.urljoin(base or url, html.unescape(url.strip()))
    parts = urllib.parse.urlsplit(absolute)
    if parts.scheme.lower() not in {"http", "https"}:
        return None
    host = (parts.hostname or "").lower().rstrip(".")
    if host == "didm.in":
        host = "www.didm.in"
    if host == "blog.didm.in":
        host = "www.blog.didm.in"
    port = parts.port
    netloc = host if port is None else f"{host}:{port}"
    path = re.sub(r"/{2,}", "/", parts.path or "/")
    if path != "/":
        path = path.rstrip("/")
    query_pairs = [(key, value) for key, value in urllib.parse.parse_qsl(parts.query, keep_blank_values=True)
                   if not key.lower().startswith(TRACKING_QUERY_PREFIXES)
                   and key.lower() not in TRACKING_QUERY_KEYS]
    query = urllib.parse.urlencode(sorted(query_pairs))
    return urllib.parse.urlunsplit((parts.scheme.lower(), netloc, path, query, ""))


def host_allowed(url: str) -> bool:
    return (urllib.parse.urlsplit(url).hostname or "").lower() in ALLOWED_HOSTS


def is_private_path(url: str) -> bool:
    segments = {s.lower() for s in urllib.parse.urlsplit(url).path.split("/") if s}
    query_keys = {key.lower() for key, _ in urllib.parse.parse_qsl(urllib.parse.urlsplit(url).query)}
    return bool(segments & PRIVATE_SEGMENTS or query_keys & UNSAFE_QUERY_KEYS)


def is_media_url(url: str) -> bool:
    suffix = Path(urllib.parse.urlsplit(url).path).suffix.lower()
    return suffix in MEDIA_EXTENSIONS


def classify_url(url: str) -> str:
    path = urllib.parse.urlsplit(url).path.lower().strip("/")
    query = dict(urllib.parse.parse_qsl(urllib.parse.urlsplit(url).query))
    if re.search(r"(?:^|/)news-and-event/[^/]+/\d+$", path):
        return "news_detail"
    if re.search(r"(?:^|/)(?:page/)?\d+$", path) or any(k.lower() in {"page", "paged", "p"} for k in query):
        return "pagination"
    rules = (("course", ("course", "program", "training")), ("centre", ("centre", "center", "location")),
             ("trainer", ("trainer", "faculty")), ("placement", ("placement", "hiring")),
             ("gallery", ("gallery", "media", "life-didm")),
             ("legal", ("privacy", "terms", "refund", "policy")),
             ("news", ("news", "event")))
    for kind, hints in rules:
        if any(hint in path for hint in hints):
            return kind
    return "page"


def scheduling_category(url: str) -> str:
    parts = urllib.parse.urlsplit(url)
    host = (parts.hostname or "").lower()
    path = parts.path.lower().strip("/")
    if host == "www.blog.didm.in":
        return "blog"
    if path in FLAGSHIP_COURSE_PATHS or "syllabus" in path or "curriculum" in path:
        return "flagship_course"
    if path.startswith("digital-marketing-course-in-"):
        return "centre"
    if any(token in path for token in ("trainer", "faculty", "placement", "hiring")):
        return "trainers_placements"
    if any(token in path for token in ("trainee-reviews", "testimonial", "didm-certifications", "certification")):
        return "testimonials_certifications"
    if any(token in path for token in ("privacy", "terms-and-conditions", "refund", "legal", "policy")):
        return "legal"
    if path.startswith("news-and-event") or path.startswith("news-and-events"):
        return "news_events"
    return "other"


def scheduling_key(url: str) -> tuple[int, int, str]:
    category = scheduling_category(url)
    path = urllib.parse.urlsplit(url).path.lower().strip("/")
    course_rank = FLAGSHIP_COURSE_PATHS.index(path) if path in FLAGSHIP_COURSE_PATHS else len(FLAGSHIP_COURSE_PATHS)
    return PRIORITY_CATEGORY_ORDER[category], course_rank, canonicalize_url(url) or url


def prioritize_queue(urls: Iterable[str]) -> list[str]:
    """Return every unique queued URL in deterministic migration priority order."""
    unique = dict.fromkeys(urls)
    return sorted(unique, key=scheduling_key)


def clean_text(value: str) -> str:
    return re.sub(r"\s+", " ", html.unescape(value)).strip()


TRANSPORT_ACTIONS = {
    "dns_resolution_failure": "Verify DNS availability and hostname resolution from the execution environment.",
    "tls_certificate_failure": "Verify system trust roots, hostname, certificate validity, and TLS interception policy.",
    "connection_timeout": "Verify outbound connectivity, firewall policy, routing, and remote service availability.",
    "connection_refused": "Verify the destination service is listening and outbound connections are permitted.",
    "network_restriction": "Verify sandbox, firewall, proxy, or organizational outbound-network policy.",
    "http_response_failure": "Review the HTTP status and Retry-After header without bypassing robots or rate limits.",
    "unexpected_transport_exception": "Review the sanitized exception type locally; do not retry without diagnosis.",
}


def classify_transport_exception(exc: Exception) -> dict[str, str]:
    """Classify an exception without retaining raw messages, URLs, or secrets."""
    root: Any = exc.reason if isinstance(exc, urllib.error.URLError) and hasattr(exc, "reason") else exc
    exception_type = type(root).__name__
    errno_value = getattr(root, "errno", None)
    message = str(root).lower()
    if isinstance(root, socket.gaierror):
        category, detail = "dns_resolution_failure", "Hostname resolution failed."
    elif isinstance(root, (ssl.SSLCertVerificationError, ssl.CertificateError)):
        category, detail = "tls_certificate_failure", "TLS certificate or hostname verification failed."
    elif isinstance(root, ssl.SSLError):
        category, detail = "tls_certificate_failure", "TLS negotiation failed."
    elif isinstance(root, (socket.timeout, TimeoutError)):
        category, detail = "connection_timeout", "Connection or read operation timed out."
    elif isinstance(root, ConnectionRefusedError) or errno_value in {61, 111}:
        category, detail = "connection_refused", "The remote connection was refused."
    elif (isinstance(root, PermissionError) or errno_value in {1, 13, 51, 65, 101, 113}
          or any(token in message for token in ("proxy", "tunnel", "network is unreachable", "operation not permitted"))):
        category, detail = "network_restriction", "Outbound access was denied or unavailable by network policy/routing."
    else:
        category, detail = "unexpected_transport_exception", "An unclassified transport exception occurred."
    return {"category": category, "exception_type": exception_type, "detail": detail,
            "action": TRANSPORT_ACTIONS[category]}


class PageParser(HTMLParser):
    SKIP_TAGS = {"script", "style", "noscript", "template", "svg"}
    BLOCK_TAGS = {"h1", "h2", "h3", "h4", "h5", "h6", "p", "li", "dt", "dd",
                  "blockquote", "address", "figcaption", "th", "td"}
    CHROME_TAGS = {"nav", "footer", "aside", "dialog"}
    CHROME_HINTS = {"nav", "navbar", "menu", "footer", "modal", "popup", "cookie",
                    "breadcrumb", "sidebar", "topbar", "top-bar", "offcanvas"}
    VOID_TAGS = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link",
                 "meta", "param", "source", "track", "wbr"}

    def __init__(self, base_url: str):
        super().__init__(convert_charrefs=True)
        self.base_url = base_url
        self.title_parts: list[str] = []
        self.text_parts: list[str] = []
        self.headings: list[dict[str, str]] = []
        self.content_blocks: list[dict[str, Any]] = []
        self.links: list[dict[str, str]] = []
        self.media: list[dict[str, str]] = []
        self.meta: dict[str, str] = {}
        self.canonical = ""
        self.json_ld: list[Any] = []
        self._skip_depth = 0
        self._title = False
        self._heading: str | None = None
        self._heading_parts: list[str] = []
        self._anchor: str | None = None
        self._anchor_parts: list[str] = []
        self._anchor_zone = "body"
        self._json_ld = False
        self._json_parts: list[str] = []
        self._elements: list[dict[str, Any]] = []
        self._blocks: list[dict[str, Any]] = []
        self._list_stack: list[str] = []
        self._table_index = -1
        self._row_index = -1
        self._text_sequence: list[dict[str, str]] = []
        self._block_order = 0

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        tag = tag.lower()
        data = {k.lower(): (v or "") for k, v in attrs}
        if tag in self.SKIP_TAGS:
            if tag == "script" and data.get("type", "").lower() == "application/ld+json":
                self._json_ld = True
                self._json_parts = []
            else:
                self._skip_depth += 1
            return
        parent = self._elements[-1] if self._elements else {"chrome": False, "main": False}
        identity = f"{data.get('id', '')} {data.get('class', '')} {data.get('role', '')}".lower()
        hints = set(re.split(r"[^a-z0-9-]+", identity))
        chrome = bool(parent["chrome"] or tag in self.CHROME_TAGS or hints & self.CHROME_HINTS)
        main = bool(parent["main"] or tag in {"main", "article"} or data.get("role", "").lower() == "main")
        if tag == "li":
            self._finish_open_blocks({"li"})
        if tag in {"th", "td"}:
            self._finish_open_blocks({"th", "td"})
        if tag == "tr":
            self._finish_open_blocks({"th", "td"})
        if tag == "p" or tag in {"ul", "ol", "table", "h1", "h2", "h3", "h4", "h5", "h6"}:
            self._finish_open_blocks({"p"})
        if tag in {"h1", "h2", "h3", "h4", "h5", "h6"}:
            self._finish_open_blocks({"h1", "h2", "h3", "h4", "h5", "h6"})
        self._elements.append({"tag": tag, "chrome": chrome, "main": main})
        if tag in {"ul", "ol"}:
            self._list_stack.append(tag)
        if tag == "table":
            self._table_index += 1
            self._row_index = -1
        if tag == "tr":
            self._row_index += 1
        if tag in self.BLOCK_TAGS:
            self._blocks.append({"tag": tag, "parts": [], "zone": "chrome" if chrome else ("main" if main else "body"),
                                 "list_type": self._list_stack[-1] if self._list_stack else "",
                                 "table_index": self._table_index if tag in {"th", "td"} else "",
                                 "row_index": self._row_index if tag in {"th", "td"} else "",
                                 "order": self._block_order})
            self._block_order += 1
        if tag == "title":
            self._title = True
        if re.fullmatch(r"h[1-6]", tag):
            self._heading = tag
            self._heading_parts = []
        if tag == "a" and data.get("href"):
            self._anchor = data["href"]
            self._anchor_parts = []
            self._anchor_zone = "chrome" if chrome else ("main" if main else "body")
        if tag == "meta":
            key = data.get("name") or data.get("property") or data.get("http-equiv")
            if key and data.get("content"):
                self.meta[key.lower()] = clean_text(data["content"])
        if tag == "link" and "canonical" in data.get("rel", "").lower():
            self.canonical = urllib.parse.urljoin(self.base_url, data.get("href", ""))
        if tag in {"img", "source", "video", "audio", "iframe"}:
            candidates = []
            for attr in ("src", "data-src", "poster"):
                if data.get(attr):
                    candidates.append(data[attr])
            if data.get("srcset"):
                candidates.extend(item.strip().split()[0] for item in data["srcset"].split(","))
            for candidate in candidates:
                media_url = urllib.parse.urljoin(self.base_url, candidate)
                self.media.append({
                    "url": media_url,
                    "type": tag,
                    "alt": clean_text(data.get("alt", "")),
                    "title": clean_text(data.get("title", "")),
                })
        if tag in self.VOID_TAGS:
            self._elements.pop()

    def handle_endtag(self, tag: str) -> None:
        tag = tag.lower()
        if tag == "script" and self._json_ld:
            raw = "".join(self._json_parts).strip()
            if raw:
                try:
                    self.json_ld.append(json.loads(raw))
                except json.JSONDecodeError:
                    self.json_ld.append({"_invalid_json_ld": raw[:2000]})
            self._json_ld = False
            self._json_parts = []
            return
        if tag in self.SKIP_TAGS and self._skip_depth:
            self._skip_depth -= 1
            return
        if tag in self.BLOCK_TAGS:
            self._finish_open_blocks({tag}, newest_only=True)
        if tag in {"ul", "ol"}:
            self._finish_open_blocks({"li"})
        if tag in {"tr", "table"}:
            self._finish_open_blocks({"th", "td"})
        if tag in {"main", "article", "body", "html"}:
            self._finish_open_blocks(set(self.BLOCK_TAGS))
        if tag == "title":
            self._title = False
        if self._heading == tag:
            value = clean_text(" ".join(self._heading_parts))
            if value:
                self.headings.append({"level": tag, "text": value})
            self._heading = None
        if tag == "a" and self._anchor is not None:
            resolved = urllib.parse.urljoin(self.base_url, self._anchor)
            self.links.append({"url": resolved, "text": clean_text(" ".join(self._anchor_parts)),
                               "zone": self._anchor_zone})
            self._anchor = None
        if tag in {"ul", "ol"} and self._list_stack:
            self._list_stack.pop()
        for index in range(len(self._elements) - 1, -1, -1):
            if self._elements[index]["tag"] == tag:
                del self._elements[index:]
                break

    def _finish_open_blocks(self, tags: set[str], newest_only: bool = False) -> None:
        indexes = [index for index, block in enumerate(self._blocks) if block["tag"] in tags]
        if newest_only and indexes:
            indexes = [indexes[-1]]
        for index in reversed(indexes):
            block = self._blocks.pop(index)
            value = clean_text(" ".join(block.pop("parts")))
            if not value:
                continue
            tag = block["tag"]
            block["text"] = value
            block["type"] = ("heading" if tag.startswith("h") else
                             "list_item" if tag == "li" else
                             "table_cell" if tag in {"th", "td"} else "paragraph")
            self.content_blocks.append(block)

    def handle_data(self, data: str) -> None:
        if self._json_ld:
            self._json_parts.append(data)
            return
        if self._skip_depth:
            return
        value = clean_text(data)
        if not value:
            return
        self.text_parts.append(value)
        zone = "body"
        if self._elements:
            zone = "chrome" if self._elements[-1]["chrome"] else ("main" if self._elements[-1]["main"] else "body")
        self._text_sequence.append({"text": value, "zone": zone})
        for block in self._blocks:
            block["parts"].append(value)
        if self._title:
            self.title_parts.append(value)
        if self._heading:
            self._heading_parts.append(value)
        if self._anchor is not None:
            self._anchor_parts.append(value)

    def result(self) -> dict[str, Any]:
        original = clean_text(" ".join(self.text_parts))
        self.content_blocks.sort(key=lambda block: block["order"])
        structured_headings = [{"level": block["tag"], "text": block["text"]}
                               for block in self.content_blocks if block["type"] == "heading"]
        main_blocks = [b for b in self.content_blocks if b["zone"] == "main"]
        non_chrome = [b for b in self.content_blocks if b["zone"] != "chrome"]
        selected = main_blocks or non_chrome
        has_main_sequence = any(item["zone"] == "main" for item in self._text_sequence)
        selected_sequence = ([item for item in self._text_sequence if item["zone"] == "main"]
                             if has_main_sequence else
                             [item for item in self._text_sequence if item["zone"] != "chrome"])
        cleaned = clean_text(" ".join(item["text"] for item in selected_sequence))
        confidence = "high" if main_blocks else ("medium" if non_chrome else "low")
        notes = [] if main_blocks else ["No explicit <main>, <article>, or role=main container; cleaned content uses conservative non-chrome blocks."]
        if not cleaned:
            cleaned = original
            notes.append("No structured content blocks were found; original visible text was retained.")
        tables: dict[int, dict[int, list[dict[str, str]]]] = {}
        for block in self.content_blocks:
            if block["type"] != "table_cell":
                continue
            tables.setdefault(int(block["table_index"]), {}).setdefault(int(block["row_index"]), []).append(
                {"cell_type": block["tag"], "text": block["text"]})
        faq_candidates = []
        for index, block in enumerate(selected[:-1]):
            if block["type"] == "heading" and block["text"].rstrip().endswith("?"):
                following = selected[index + 1]
                if following["type"] in {"paragraph", "list_item"}:
                    faq_candidates.append({"question": block["text"], "answer": following["text"],
                                           "confidence": "candidate"})
        module_candidates = [b for b in selected if b["type"] == "heading" and
                             re.search(r"\b(module|phase|unit|week|syllabus|curriculum)\b", b["text"], re.I)]
        phones = sorted(set(re.findall(r"(?:\+?91[\s-]?)?[6-9]\d{9}", cleaned)))
        emails = sorted(set(re.findall(r"[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}", cleaned, re.I)))
        return {
            "title": clean_text(" ".join(self.title_parts)),
            "headings": structured_headings,
            "main_headings": [{"level": b["tag"], "text": b["text"]} for b in selected if b["type"] == "heading"],
            "original_content_text": original,
            "cleaned_content_text": cleaned,
            "content_text": cleaned,
            "content_blocks": self.content_blocks,
            "structured_content": {
                "paragraphs": [b["text"] for b in selected if b["type"] == "paragraph"],
                "lists": [b for b in selected if b["type"] == "list_item"],
                "tables": [{"table_index": table, "rows": [rows[row] for row in sorted(rows)]}
                           for table, rows in sorted(tables.items())],
                "faq_candidates": faq_candidates,
                "course_module_candidates": [{"heading": b["text"], "confidence": "candidate"}
                                             for b in module_candidates],
                "contact_details": {"phones": phones, "emails": emails},
            },
            "extraction_quality": {"confidence": confidence, "notes": notes,
                                   "main_block_count": len(main_blocks),
                                   "excluded_chrome_block_count": len([b for b in self.content_blocks if b["zone"] == "chrome"])},
            "links": self.links,
            "media": self.media,
            "meta": self.meta,
            "canonical_url": canonicalize_url(self.canonical) if self.canonical else "",
            "json_ld": self.json_ld,
        }


@dataclass
class FetchResult:
    requested_url: str
    final_url: str
    status: int
    headers: dict[str, str]
    body: bytes
    redirects: list[dict[str, Any]] = field(default_factory=list)
    error: str = ""
    retry_after_seconds: float = 0.0
    blocked_redirect: bool = False
    transport_category: str = ""
    exception_type: str = ""
    diagnostic_detail: str = ""
    diagnostic_action: str = ""


class HttpClient:
    def __init__(self, delay: float, timeout: float = 30.0):
        self.delay = delay
        self.timeout = timeout
        self.last_request: dict[str, float] = {}
        self.retry_after_until: dict[str, float] = {}

    class _NoRedirect(urllib.request.HTTPRedirectHandler):
        def redirect_request(self, req, fp, code, msg, headers, newurl):  # noqa: ANN001
            return None

    def fetch(self, url: str, method: str = "GET", redirect_allowed=None) -> FetchResult:
        if method != "GET":
            raise ValueError("Only GET is permitted")
        if not host_allowed(url) or is_private_path(url):
            raise ValueError(f"Disallowed URL: {url}")
        redirects: list[dict[str, Any]] = []
        current = url
        opener = urllib.request.build_opener(self._NoRedirect())
        for _hop in range(MAX_REDIRECT_HOPS + 1):
            host = urllib.parse.urlsplit(current).hostname or ""
            self._wait_for_host(host)
            request = urllib.request.Request(current, method="GET", headers={
                "User-Agent": USER_AGENT,
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,text/plain;q=0.8,*/*;q=0.1",
                "Accept-Encoding": "identity",
            })
            self.last_request[host] = time.monotonic()
            try:
                with opener.open(request, timeout=self.timeout) as response:
                    return FetchResult(url, current, response.status, dict(response.headers.items()),
                                       response.read(), redirects)
            except urllib.error.HTTPError as exc:
                headers = dict(exc.headers.items())
                if exc.code in {301, 302, 303, 307, 308} and exc.headers.get("Location"):
                    destination = canonicalize_url(exc.headers["Location"], current)
                    reason = ""
                    if not destination or not host_allowed(destination):
                        reason = "unapproved_host"
                    elif is_private_path(destination):
                        reason = "private_or_state_changing"
                    elif redirect_allowed is None or not redirect_allowed(destination):
                        reason = "robots_disallowed"
                    redirect_record = {"source_url": current, "target_url": destination or "",
                                       "status": exc.code, "followed": str(not reason).lower(),
                                       "blocked_reason": reason}
                    redirects.append(redirect_record)
                    if reason:
                        return FetchResult(url, current, exc.code, headers, b"", redirects,
                                           f"blocked_redirect:{reason}", blocked_redirect=True)
                    current = destination
                    continue
                body = exc.read()
                retry_seconds = self._record_retry_after(host, exc.headers.get("Retry-After", ""))
                return FetchResult(url, current, exc.code, headers, body, redirects,
                                   f"http_status_{exc.code}",
                                   retry_after_seconds=retry_seconds,
                                   transport_category="http_response_failure",
                                   exception_type="HTTPError",
                                   diagnostic_detail=f"HTTP response status {exc.code}.",
                                   diagnostic_action=TRANSPORT_ACTIONS["http_response_failure"])
            except Exception as exc:
                diagnostic = classify_transport_exception(exc)
                return FetchResult(url, current, 0, {}, b"", redirects,
                                   diagnostic["category"],
                                   transport_category=diagnostic["category"],
                                   exception_type=diagnostic["exception_type"],
                                   diagnostic_detail=diagnostic["detail"],
                                   diagnostic_action=diagnostic["action"])
        return FetchResult(url, current, 0, {}, b"", redirects, "redirect_hop_limit", blocked_redirect=True)

    def _wait_for_host(self, host: str) -> None:
        now = time.monotonic()
        delay_until = max(self.last_request.get(host, 0.0) + self.delay,
                          self.retry_after_until.get(host, 0.0))
        if now < delay_until:
            time.sleep(delay_until - now)

    def _record_retry_after(self, host: str, value: str) -> float:
        if not value:
            return 0.0
        seconds = 0.0
        try:
            seconds = max(0.0, float(value))
        except ValueError:
            try:
                retry_at = email.utils.parsedate_to_datetime(value)
                seconds = max(0.0, retry_at.timestamp() - time.time())
            except (TypeError, ValueError, OverflowError):
                return 0.0
        self.retry_after_until[host] = max(self.retry_after_until.get(host, 0.0),
                                            time.monotonic() + seconds)
        return seconds


class RobotsPolicy:
    def __init__(self, client: HttpClient):
        self.client = client
        self.parsers: dict[str, urllib.robotparser.RobotFileParser] = {}
        self.sitemaps: dict[str, list[str]] = {}
        self.failures: list[dict[str, str]] = []
        self.loaded_successfully: dict[str, bool] = {}

    def load(self, seed: str) -> None:
        host = urllib.parse.urlsplit(seed).hostname or ""
        robots_url = f"https://{host}/robots.txt"
        result = self.client.fetch(
            robots_url,
            redirect_allowed=lambda destination: (
                (urllib.parse.urlsplit(destination).hostname or "") == host
                and urllib.parse.urlsplit(destination).path == "/robots.txt"
                and not is_private_path(destination)
            ),
        )
        parser = urllib.robotparser.RobotFileParser(robots_url)
        if result.status == 200:
            text = result.body.decode("utf-8", errors="replace")
            parser.parse(text.splitlines())
            self.sitemaps[host] = [canonicalize_url(line.split(":", 1)[1].strip())
                                   for line in text.splitlines()
                                   if line.lower().startswith("sitemap:")]
            self.loaded_successfully[host] = True
        else:
            # Fail closed: do not crawl a host whose robots policy cannot be read.
            parser.parse(["User-agent: *", "Disallow: /"])
            self.sitemaps[host] = []
            self.failures.append({
                "url": robots_url, "reason": f"robots_status_{result.status}",
                "transport_category": result.transport_category,
                "exception_type": result.exception_type,
                "diagnostic_detail": result.diagnostic_detail,
                "diagnostic_action": result.diagnostic_action,
            })
            self.loaded_successfully[host] = False
        self.parsers[host] = parser

    def allowed(self, url: str) -> bool:
        return self.decision(url) == "robots_allowed"

    def decision(self, url: str) -> str:
        host = urllib.parse.urlsplit(url).hostname or ""
        if not self.loaded_successfully.get(host, False):
            return "robots_unavailable"
        parser = self.parsers.get(host)
        return "robots_allowed" if parser and parser.can_fetch(USER_AGENT, url) else "robots_disallowed"


def content_types(url: str, parsed: dict[str, Any]) -> list[str]:
    haystack = " ".join([url, parsed.get("title", ""),
                         " ".join(x["text"] for x in parsed.get("headings", []))]).lower()
    return [kind for kind, hints in CONTENT_HINTS.items() if any(h in haystack for h in hints)]


def safe_filename(url: str) -> str:
    digest = hashlib.sha256(url.encode()).hexdigest()[:16]
    path = urllib.parse.urlsplit(url).path.strip("/").replace("/", "__") or "index"
    path = re.sub(r"[^A-Za-z0-9_.-]+", "-", path)[:100]
    return f"{path}--{digest}.html"


def read_checkpoint(path: Path) -> dict[str, Any]:
    if not path.exists():
        return {"visited": [], "queued": list(SEEDS), "page_counts": {}, "stopped_hosts": []}
    return json.loads(path.read_text(encoding="utf-8"))


def write_json(path: Path, value: Any) -> None:
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def atomic_write_text(path: Path, value: str) -> None:
    temporary = path.with_suffix(path.suffix + ".tmp")
    temporary.write_text(value, encoding="utf-8")
    temporary.replace(path)


def write_csv(path: Path, rows: Iterable[dict[str, Any]], fields: list[str]) -> None:
    with path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=fields, extrasaction="ignore")
        writer.writeheader()
        for row in rows:
            writer.writerow({key: row.get(key, "") for key in fields})


def load_jsonl(path: Path) -> list[dict[str, Any]]:
    if not path.exists():
        return []
    result = []
    for line in path.read_text(encoding="utf-8").splitlines():
        if line.strip():
            result.append(json.loads(line))
    return result


def load_csv(path: Path) -> list[dict[str, str]]:
    if not path.exists():
        return []
    with path.open(newline="", encoding="utf-8") as handle:
        return list(csv.DictReader(handle))


class Crawler:
    def __init__(self, output: Path, limit: int, delay: float):
        self.output = output
        self.limit = limit
        self.client = HttpClient(delay)
        self.robots = RobotsPolicy(self.client)
        self.checkpoint_path = output / "checkpoint.json"
        self.pages_path = output / "pages.jsonl"
        self.failures: list[dict[str, Any]] = []
        self.redirects: list[dict[str, Any]] = []
        self.inventory: dict[str, dict[str, Any]] = {}
        self.media: dict[str, dict[str, Any]] = {}

    def prepare(self) -> None:
        self.output.mkdir(parents=True, exist_ok=True)
        (self.output / "raw_html").mkdir(exist_ok=True)
        write_json(self.output / "crawl_config.json", {
            "allowed_hosts": ALLOWED_HOSTS, "seeds": SEEDS, "user_agent": USER_AGENT,
            "page_limit_per_host": self.limit, "minimum_delay_seconds": self.client.delay,
            "methods": ["GET"], "media_downloads": False,
            "started_or_resumed_at": utc_now(),
        })

    def load_existing_exports(self) -> None:
        """Retain previously exported state when resuming a crawl."""
        for row in load_csv(self.output / "url_inventory.csv"):
            if row.get("url"):
                self.inventory[row["url"]] = row
        for row in load_csv(self.output / "media_manifest.csv"):
            if row.get("media_url"):
                self.media[row["media_url"]] = row
        self.redirects.extend(load_csv(self.output / "redirects.csv"))
        self.failures.extend(load_csv(self.output / "failed_urls.csv"))

    def add_inventory(self, url: str, discovered_from: str, source: str) -> str | None:
        normalized = canonicalize_url(url)
        if not normalized or not host_allowed(normalized):
            return None
        record = self.inventory.setdefault(normalized, {
            "url": normalized, "host": urllib.parse.urlsplit(normalized).hostname,
            "discovered_from": discovered_from, "discovery_source": source,
            "url_kind": classify_url(normalized),
            "schedule_category": scheduling_category(normalized),
            "schedule_priority": PRIORITY_CATEGORY_ORDER[scheduling_category(normalized)],
            "status": "discovered", "http_status": "", "robots_allowed": "",
            "content_type": "", "final_url": "",
        })
        return record["url"]

    def fetch_sitemap(self, url: str, queue: deque[str], seen_sitemaps: set[str],
                      sitemap_counts: Counter) -> None:
        if url in seen_sitemaps:
            return
        host = urllib.parse.urlsplit(url).hostname or ""
        if sitemap_counts[host] >= MAX_SITEMAP_DOCUMENTS_PER_HOST:
            self.failures.append({"url": url, "stage": "sitemap", "status": "",
                                  "reason": "sitemap_document_limit", "timestamp": utc_now()})
            return
        seen_sitemaps.add(url)
        sitemap_counts[host] += 1
        sitemap_robots = self.robots.decision(url)
        if sitemap_robots != "robots_allowed":
            self.failures.append({"url": url, "stage": "sitemap", "status": "",
                                  "reason": ("robots_unavailable" if sitemap_robots == "robots_unavailable"
                                             else "blocked_by_robots"), "timestamp": utc_now()})
            return
        result = self.client.fetch(url, redirect_allowed=self.robots.allowed)
        self.redirects.extend(result.redirects)
        if result.status != 200:
            self.failures.append({"url": url, "stage": "sitemap", "status": result.status,
                                  "reason": result.error or "non_200", "timestamp": utc_now()})
            return
        content_type = result.headers.get("Content-Type", "").lower()
        if "xml" not in content_type and not result.body.lstrip().startswith(b"<?xml"):
            self.failures.append({"url": url, "stage": "sitemap", "status": result.status,
                                  "reason": "not_xml", "timestamp": utc_now()})
            return
        try:
            root = ET.fromstring(result.body)
        except ET.ParseError as exc:
            self.failures.append({"url": url, "stage": "sitemap", "status": result.status,
                                  "reason": f"invalid_xml:{exc}", "timestamp": utc_now()})
            return
        is_index = root.tag.rsplit("}", 1)[-1] == "sitemapindex"
        for node in root.iter():
            if node.tag.rsplit("}", 1)[-1] != "loc" or not node.text:
                continue
            found = self.add_inventory(node.text, url, "sitemap_index" if is_index else "sitemap")
            if not found or is_media_url(found) or is_private_path(found):
                continue
            if is_index:
                self.fetch_sitemap(found, queue, seen_sitemaps, sitemap_counts)
            else:
                queue.append(found)
                self.inventory[found]["status"] = "queued"

    def run(self) -> None:
        self.prepare()
        self.load_existing_exports()
        checkpoint = read_checkpoint(self.checkpoint_path)
        existing_failure_keys = {(row.get("url"), row.get("stage"), row.get("timestamp"), row.get("reason"))
                                 for row in self.failures}
        for failure in checkpoint.get("failure_history", []):
            key = (failure.get("url"), failure.get("stage"), failure.get("timestamp"), failure.get("reason"))
            if key not in existing_failure_keys:
                self.failures.append(failure)
                existing_failure_keys.add(key)
        visited = set(checkpoint.get("visited", []))
        stopped_hosts = set(checkpoint.get("stopped_hosts", []))
        self.stopped_host_state = dict(checkpoint.get("stopped_host_state", {}))
        page_counts = Counter(checkpoint.get("page_counts", {}))
        for url, retry_state in checkpoint.get("retry_state", {}).items():
            if url in self.inventory:
                self.inventory[url].update(retry_state)
        completed_pages = {p.get("source_url") for p in load_jsonl(self.pages_path)}
        visited.update(url for url in completed_pages if url)
        pending = list(checkpoint.get("queued", []))
        for url, record in self.inventory.items():
            prior_status = str(record.get("status", ""))
            if url not in visited and prior_status in {"", "discovered", "queued"}:
                pending.append(url)
        if not pending and not self.inventory:
            pending.extend(SEEDS)
        queue = deque(prioritize_queue(pending))
        queued = set(queue)
        for url in queued:
            if url in self.inventory:
                self.inventory[url]["status"] = "queued"
        consecutive_errors = Counter()
        seen_sitemaps: set[str] = set()
        sitemap_counts: Counter = Counter()

        for seed in SEEDS:
            self.robots.load(seed)
        now = datetime.now(timezone.utc)
        for host in list(stopped_hosts):
            state = self.stopped_host_state.get(host, {})
            resume_after_text = state.get("resume_after", "")
            try:
                resume_due = not resume_after_text or datetime.fromisoformat(resume_after_text) <= now
            except ValueError:
                resume_due = False
            # A previously stopped host is released only in a new run, after a
            # fresh successful robots retrieval and its persisted delay.
            if self.robots.loaded_successfully.get(host, False) and resume_due:
                stopped_hosts.remove(host)
                state["resumed_at"] = utc_now()
                state["resume_condition"] = "fresh_robots_success_and_retry_delay_elapsed"
                self.stopped_host_state[host] = state
        for seed in SEEDS:
            host = urllib.parse.urlsplit(seed).hostname or ""
            if not self.robots.loaded_successfully.get(host, False):
                stopped_hosts.add(host)
                existing_state = self.stopped_host_state.get(host, {})
                self.stopped_host_state[host] = {
                    **existing_state,
                    "reason": "robots_unavailable",
                    "stopped_at": existing_state.get("stopped_at") or utc_now(),
                    "resume_after": (datetime.now(timezone.utc) + timedelta(seconds=self.client.delay)).isoformat(),
                    "requires_fresh_robots_check": True,
                }
                for url in queue:
                    if (urllib.parse.urlsplit(url).hostname or "") == host and url in self.inventory:
                        self.inventory[url]["robots_state"] = "pending_robots_check"
                        self.inventory[url]["status"] = "queued"
        self.failures.extend({"url": x["url"], "stage": "robots", "status": "",
                              "reason": x["reason"],
                              "transport_category": x.get("transport_category", ""),
                              "exception_type": x.get("exception_type", ""),
                              "diagnostic_detail": x.get("diagnostic_detail", ""),
                              "diagnostic_action": x.get("diagnostic_action", ""),
                              "timestamp": utc_now()}
                             for x in self.robots.failures)
        for seed in SEEDS:
            host = urllib.parse.urlsplit(seed).hostname or ""
            self.add_inventory(seed, "", "seed")
            if seed not in visited and seed not in queued:
                queue.append(seed)
                queued.add(seed)
                self.inventory[seed]["status"] = "queued"
            for sitemap in self.robots.sitemaps.get(host, []):
                if sitemap and host_allowed(sitemap):
                    self.fetch_sitemap(sitemap, queue, seen_sitemaps, sitemap_counts)

        queue = deque(prioritize_queue(queue))
        queued = set(queue)

        while queue:
            eligible_index = None
            eligible_key = None
            for index, candidate in enumerate(queue):
                candidate_host = urllib.parse.urlsplit(candidate).hostname or ""
                record = self.inventory.get(candidate, {})
                next_retry = record.get("next_retry_at", "")
                retry_ready = True
                if next_retry:
                    try:
                        retry_ready = datetime.fromisoformat(str(next_retry)) <= datetime.now(timezone.utc)
                    except ValueError:
                        retry_ready = True
                if (candidate_host not in stopped_hosts and page_counts[candidate_host] < self.limit
                        and retry_ready):
                    candidate_key = scheduling_key(candidate)
                    if eligible_key is None or candidate_key < eligible_key:
                        eligible_index = index
                        eligible_key = candidate_key
            if eligible_index is None:
                break
            queue.rotate(-eligible_index)
            url = queue.popleft()
            queue.rotate(eligible_index)
            queued.discard(url)
            normalized = self.add_inventory(url, "", "queue")
            if not normalized or normalized in visited:
                continue
            host = urllib.parse.urlsplit(normalized).hostname or ""
            # Persist the in-flight URL as pending before any request. If the process
            # terminates during I/O, resume will retry this URL rather than lose it.
            self._checkpoint(visited, deque([normalized, *queue]), page_counts, stopped_hosts)
            if is_private_path(normalized):
                self.inventory[normalized]["status"] = "blocked"
                self.inventory[normalized]["skip_reason"] = "private_path"
                visited.add(normalized)
                self._checkpoint(visited, queue, page_counts, stopped_hosts)
                continue
            if is_media_url(normalized):
                self.media.setdefault(normalized, {"media_url": normalized, "source_page": "",
                                                   "media_type": "link", "alt_text": "",
                                                   "title": "", "downloaded": "false"})
                self.inventory[normalized]["status"] = "skipped"
                self.inventory[normalized]["skip_reason"] = "media_reference"
                visited.add(normalized)
                self._checkpoint(visited, queue, page_counts, stopped_hosts)
                continue
            robots_decision = self.robots.decision(normalized)
            self.inventory[normalized]["robots_state"] = robots_decision
            self.inventory[normalized]["robots_allowed"] = (
                "true" if robots_decision == "robots_allowed" else
                "false" if robots_decision == "robots_disallowed" else ""
            )
            if robots_decision == "robots_unavailable":
                self.inventory[normalized]["status"] = "queued"
                self.inventory[normalized]["robots_state"] = "pending_robots_check"
                if normalized not in queued:
                    queue.appendleft(normalized)
                    queued.add(normalized)
                stopped_hosts.add(host)
                self.stopped_host_state[host] = {
                    "reason": "robots_unavailable", "stopped_at": utc_now(),
                    "resume_after": (datetime.now(timezone.utc) + timedelta(seconds=self.client.delay)).isoformat(),
                    "requires_fresh_robots_check": True,
                }
                self._checkpoint(visited, queue, page_counts, stopped_hosts)
                continue
            if robots_decision == "robots_disallowed":
                self.inventory[normalized]["status"] = "blocked"
                self.inventory[normalized]["skip_reason"] = "robots"
                self.inventory[normalized]["robots_state"] = "robots_disallowed"
                self.failures.append({"url": normalized, "stage": "page", "status": "",
                                      "reason": "blocked_by_robots", "timestamp": utc_now()})
                visited.add(normalized)
                self._checkpoint(visited, queue, page_counts, stopped_hosts)
                continue

            result = self.client.fetch(normalized, redirect_allowed=self.robots.allowed)
            self.redirects.extend(result.redirects)
            record = self.inventory[normalized]
            record["http_status"] = result.status
            record["final_url"] = canonicalize_url(result.final_url) or result.final_url
            record["content_type"] = result.headers.get("Content-Type", "")
            transient = result.status == 0 or result.status in {408, 425, 429} or result.status >= 500
            if transient:
                consecutive_errors[host] += 1
                if consecutive_errors[host] >= 3:
                    stopped_hosts.add(host)
            else:
                consecutive_errors[host] = 0
            if result.status != 200:
                retry_count = int(record.get("retry_count") or 0)
                failure_type = "permanent"
                retry_eligible = False
                if result.blocked_redirect:
                    record["status"] = "blocked"
                    record["skip_reason"] = result.error
                    failure_type = "blocked_redirect"
                elif transient:
                    retry_count += 1
                    retry_eligible = retry_count <= MAX_TRANSIENT_RETRIES and host not in stopped_hosts
                    failure_type = "transient" if retry_eligible else "transient_exhausted"
                    record["retry_count"] = retry_count
                    wait_seconds = max(self.client.delay, result.retry_after_seconds)
                    record["next_retry_at"] = (datetime.now(timezone.utc) + timedelta(seconds=wait_seconds)).isoformat()
                    if host in stopped_hosts:
                        self.stopped_host_state[host] = {
                            "reason": "three_consecutive_transient_failures",
                            "stopped_at": utc_now(),
                            "resume_after": record["next_retry_at"],
                            "requires_fresh_robots_check": True,
                        }
                    record["status"] = "queued" if retry_eligible else "failed"
                else:
                    record["status"] = "failed"
                record["failure_type"] = failure_type
                self.failures.append({"url": normalized, "stage": "page", "status": result.status,
                                      "reason": result.error or "non_200", "failure_type": failure_type,
                                      "retry_count": retry_count, "retry_eligible": str(retry_eligible).lower(),
                                      "next_retry_at": record.get("next_retry_at", ""),
                                      "transport_category": result.transport_category,
                                      "exception_type": result.exception_type,
                                      "diagnostic_detail": result.diagnostic_detail,
                                      "diagnostic_action": result.diagnostic_action,
                                      "timestamp": utc_now()})
                if retry_eligible:
                    if normalized not in queued:
                        queue.append(normalized)
                        queued.add(normalized)
                else:
                    visited.add(normalized)
                self._checkpoint(visited, queue, page_counts, stopped_hosts)
                continue
            content_type = result.headers.get("Content-Type", "").lower()
            if "text/html" not in content_type and b"<html" not in result.body[:2048].lower():
                record["status"] = "skipped"
                record["skip_reason"] = "non_html"
                visited.add(normalized)
                self._checkpoint(visited, queue, page_counts, stopped_hosts)
                continue

            final_url = canonicalize_url(result.final_url) or normalized
            decoded = result.body.decode("utf-8", errors="replace")
            parser = PageParser(final_url)
            parser.feed(decoded)
            parsed = parser.result()
            kinds = content_types(final_url, parsed)
            snapshot_name = safe_filename(final_url)
            (self.output / "raw_html" / snapshot_name).write_bytes(result.body)
            page = {
                "source_url": normalized, "final_url": final_url, "status": result.status,
                "fetched_at": utc_now(), "content_type": content_type,
                "content_length": len(result.body), "sha256": hashlib.sha256(result.body).hexdigest(),
                "raw_html_snapshot": f"raw_html/{snapshot_name}", "content_categories": kinds,
                **parsed,
            }
            with self.pages_path.open("a", encoding="utf-8") as handle:
                handle.write(json.dumps(page, ensure_ascii=False) + "\n")
            page_counts[host] += 1
            visited.add(normalized)
            record["status"] = "crawled"
            record["failure_type"] = ""
            record["next_retry_at"] = ""

            for item in parsed["media"]:
                media_url = canonicalize_url(item["url"]) or item["url"]
                self.media.setdefault(media_url, {
                    "media_url": media_url, "source_page": final_url,
                    "media_type": item["type"], "alt_text": item["alt"],
                    "title": item["title"], "downloaded": "false",
                })
            for item in parsed["links"]:
                found = canonicalize_url(item["url"])
                if not found or not host_allowed(found):
                    continue
                if is_media_url(found):
                    self.media.setdefault(found, {"media_url": found, "source_page": final_url,
                                                  "media_type": "link", "alt_text": item["text"],
                                                  "title": "", "downloaded": "false"})
                    continue
                source = "navigation_link" if item.get("zone") == "chrome" else "page_link"
                added = self.add_inventory(found, final_url, source)
                if added and added not in visited and added not in queued and not is_private_path(added):
                    queue.append(added)
                    queued.add(added)
                    self.inventory[added]["status"] = "queued"
            queue = deque(prioritize_queue(queue))
            queued = set(queue)
            self._checkpoint(visited, queue, page_counts, stopped_hosts)

        self._checkpoint(visited, queue, page_counts, stopped_hosts)
        self.export(page_counts, stopped_hosts)

    def _checkpoint(self, visited: set[str], queue: deque[str], counts: Counter,
                    stopped_hosts: set[str]) -> None:
        retry_state = {url: {key: record.get(key, "") for key in
                             ("retry_count", "next_retry_at", "failure_type")}
                       for url, record in self.inventory.items() if record.get("retry_count")}
        write_json(self.checkpoint_path, {"visited": sorted(visited), "queued": list(queue),
                                         "page_counts": dict(counts),
                                         "stopped_hosts": sorted(stopped_hosts),
                                         "stopped_host_state": getattr(self, "stopped_host_state", {}),
                                         "retry_state": retry_state,
                                         "failure_history": self.failures,
                                         "updated_at": utc_now()})

    def export(self, counts: Counter, stopped_hosts: set[str]) -> None:
        pages = load_jsonl(self.pages_path)
        # Include prior run data when resuming, while retaining the latest record per URL.
        pages_by_url = {p["source_url"]: p for p in pages}
        pages = list(pages_by_url.values())
        write_json(self.output / "page_content.json", [{
            "source_url": p["source_url"], "title": p["title"], "headings": p["headings"],
            "main_headings": p.get("main_headings", []),
            "original_content_text": p.get("original_content_text", p.get("content_text", "")),
            "cleaned_content_text": p.get("cleaned_content_text", p.get("content_text", "")),
            "content_blocks": p.get("content_blocks", []),
            "structured_content": p.get("structured_content", {}),
            "extraction_quality": p.get("extraction_quality", {}),
            "content_categories": p["content_categories"],
        } for p in pages])
        write_csv(self.output / "url_inventory.csv", sorted(self.inventory.values(), key=lambda x: x["url"]),
                  ["url", "host", "discovered_from", "discovery_source", "url_kind",
                   "schedule_category", "schedule_priority", "status", "http_status",
                   "robots_allowed", "robots_state", "content_type", "final_url", "skip_reason", "failure_type",
                   "retry_count", "next_retry_at"])
        write_csv(self.output / "media_manifest.csv", sorted(self.media.values(), key=lambda x: x["media_url"]),
                  ["media_url", "source_page", "media_type", "alt_text", "title", "downloaded"])
        seo_rows = []
        for p in pages:
            meta = p.get("meta", {})
            seo_rows.append({
                "source_url": p["source_url"], "final_url": p["final_url"], "title": p["title"],
                "meta_description": meta.get("description", ""), "canonical_url": p.get("canonical_url", ""),
                "robots": meta.get("robots", ""), "og_title": meta.get("og:title", ""),
                "og_description": meta.get("og:description", ""), "og_image": meta.get("og:image", ""),
                "twitter_card": meta.get("twitter:card", ""),
            })
        write_csv(self.output / "seo_metadata.csv", seo_rows,
                  ["source_url", "final_url", "title", "meta_description", "canonical_url", "robots",
                   "og_title", "og_description", "og_image", "twitter_card"])
        dedup_redirects = {(r["source_url"], r["target_url"], r["status"]): r for r in self.redirects}
        write_csv(self.output / "redirects.csv", dedup_redirects.values(),
                  ["source_url", "target_url", "status", "followed", "blocked_reason"])
        write_csv(self.output / "failed_urls.csv", self.failures,
                  ["url", "stage", "status", "reason", "failure_type", "retry_count",
                   "retry_eligible", "next_retry_at", "transport_category", "exception_type",
                   "diagnostic_detail", "diagnostic_action", "timestamp"])
        mapping = [{"source_url": p["source_url"], "content_categories": "|".join(p["content_categories"]),
                    "proposed_target_url": "", "migration_action": "review",
                    "notes": "Target intentionally left blank pending architecture approval"} for p in pages]
        write_csv(self.output / "source_to_target_mapping_draft.csv", mapping,
                  ["source_url", "content_categories", "proposed_target_url", "migration_action", "notes"])
        summary = [
            "# DIDM crawl summary", "", f"Generated: {utc_now()}", "",
            "## Safety configuration", "", f"- Page limit per host: {self.limit}",
            f"- Minimum per-host delay: {self.client.delay} seconds", "- Concurrency per host: 1",
            "- HTTP methods: GET only during crawl", "- Media binary downloads: disabled",
            "- robots.txt: enforced independently per host", "", "## Results", "",
            f"- Parsed HTML pages: {len(pages)}", f"- Discovered URLs: {len(self.inventory)}",
            f"- Media references: {len(self.media)}", f"- Failed or blocked URLs: {len(self.failures)}",
            f"- Redirect hops: {len(dedup_redirects)}", "",
            "### Pages per host", "",
        ]
        summary.extend(f"- {host}: {counts.get(host, 0)}" for host in ALLOWED_HOSTS)
        summary.extend(["", "### Hosts stopped for sustained errors/throttling", "",
                        *(f"- {host}" for host in sorted(stopped_hosts))])
        if not stopped_hosts:
            summary.append("- None")
        (self.output / "crawl_summary.md").write_text("\n".join(summary) + "\n", encoding="utf-8")
        quality_report(self.output, pages, self.failures)
        coverage_report(self.output, list(self.inventory.values()), pages,
                        list(self.media.values()), self.failures)


def quality_report(output: Path, pages: list[dict[str, Any]], failures: list[dict[str, Any]]) -> None:
    checks = {
        "missing_title": [p["source_url"] for p in pages if not p.get("title")],
        "missing_h1": [p["source_url"] for p in pages if not any(h["level"] == "h1" for h in p.get("headings", []))],
        "missing_meta_description": [p["source_url"] for p in pages if not p.get("meta", {}).get("description")],
        "missing_canonical": [p["source_url"] for p in pages if not p.get("canonical_url")],
        "empty_content": [p["source_url"] for p in pages if len(p.get("content_text", "")) < 100],
        "invalid_json_ld": [p["source_url"] for p in pages
                            if any("_invalid_json_ld" in x for x in p.get("json_ld", []) if isinstance(x, dict))],
    }
    lines = ["# Extraction quality report", "", f"Generated: {utc_now()}", "",
             f"Pages assessed: {len(pages)}", f"Failed/blocked URL records: {len(failures)}", ""]
    for name, urls in checks.items():
        lines.extend([f"## {name.replace('_', ' ').title()}", "", f"Count: {len(urls)}", ""])
        lines.extend(f"- {url}" for url in urls[:100])
        if not urls:
            lines.append("- None")
        lines.append("")
    (output / "extraction_quality_report.md").write_text("\n".join(lines), encoding="utf-8")


def coverage_report(output: Path, inventory: list[dict[str, Any]] | None = None,
                    pages: list[dict[str, Any]] | None = None,
                    media: list[dict[str, Any]] | None = None,
                    failures: list[dict[str, Any]] | None = None) -> None:
    inventory = inventory if inventory is not None else load_csv(output / "url_inventory.csv")
    pages = pages if pages is not None else load_jsonl(output / "pages.jsonl")
    media = media if media is not None else load_csv(output / "media_manifest.csv")
    failures = failures if failures is not None else load_csv(output / "failed_urls.csv")
    checkpoint = read_checkpoint(output / "checkpoint.json")
    page_urls = {p.get("source_url") for p in pages}
    pending = set(checkpoint.get("queued", []))
    statuses: Counter = Counter()
    for row in inventory:
        url = row.get("url")
        raw_status = row.get("status", "unknown")
        if url in page_urls:
            state = "crawled"
        elif url in pending:
            state = "queued"
        elif raw_status in {"blocked", "blocked_by_robots"}:
            state = "blocked"
        elif raw_status in {"failed", "skipped", "discovered", "queued", "crawled"}:
            state = raw_status
        else:
            state = "legacy/unknown"
        statuses[state] += 1
    robots_blocked = {row.get("url") for row in inventory
                      if row.get("skip_reason") == "robots"
                      or row.get("robots_state") == "robots_disallowed"
                      or row.get("status") == "blocked_by_robots"}
    robots_blocked.update(row.get("url") for row in failures if row.get("reason") == "blocked_by_robots")
    robots_unavailable = {row.get("url") for row in failures
                          if row.get("reason") == "robots_unavailable"
                          or row.get("reason", "").startswith("robots_status_0")}
    permanent: set[str] = set()
    transient: set[str] = set()
    for row in failures:
        failure_type = row.get("failure_type", "")
        reason = row.get("reason", "")
        status = str(row.get("status", ""))
        if failure_type == "permanent" or (not failure_type and reason in {"not_xml"}):
            permanent.add(row.get("url", ""))
        if (failure_type.startswith("transient") or (not failure_type and
                (reason.endswith("status_0") or status == "429" or status.startswith("5")))):
            transient.add(row.get("url", ""))
    category_counts: Counter = Counter()
    confidence: Counter = Counter()
    for page in pages:
        category_counts.update(page.get("content_categories", []))
        confidence[page.get("extraction_quality", {}).get("confidence", "legacy_or_unknown")] += 1
    expected = set(CONTENT_HINTS)
    missing_categories = sorted(expected - set(category_counts))
    pagination_urls = {row.get("url") for row in inventory
                       if row.get("url_kind") == "pagination" or classify_url(row.get("url", "")) == "pagination"}
    duplicated = [url for url, count in Counter(row.get("url") for row in inventory).items() if url and count > 1]
    lines = [
        "# Crawl coverage report", "", f"Generated: {utc_now()}", "",
        "> This report describes the current controlled crawl only. It does not claim full source-site coverage.", "",
        "## URL coverage", "", f"- Total discovered URLs: {len({row.get('url') for row in inventory if row.get('url')})}",
        f"- Crawled URLs: {len(page_urls)}", f"- Pending URLs: {len(pending)}",
        f"- Robots-blocked URLs: {len(robots_blocked)}",
        f"- Robots-policy unavailable records: {len(robots_unavailable)}",
        f"- Permanent failures: {len(permanent)}",
        f"- Transient failures: {len(transient)}", f"- Media references: {len(media)}",
        f"- Source URL duplications: {len(duplicated)}", "",
        "## Inventory states", "",
    ]
    lines.extend(f"- {state or 'legacy/blank'}: {count}" for state, count in sorted(statuses.items()))
    lines.extend(["", "## Pages by content category", ""])
    lines.extend(f"- {category}: {category_counts.get(category, 0)}" for category in sorted(expected))
    lines.extend(["", "## Pagination coverage", "",
                  f"- Pagination URLs discovered: {len(pagination_urls)}",
                  f"- Pagination URLs crawled: {len(pagination_urls & page_urls)}", "",
                  "## Missing content categories", ""])
    lines.extend(f"- {category}" for category in missing_categories)
    if not missing_categories:
        lines.append("- None detected in the current sample")
    lines.extend(["", "## Extraction confidence", ""])
    lines.extend(f"- {level}: {count}" for level, count in sorted(confidence.items()))
    lines.extend(["", "## Source URL duplication", ""])
    lines.extend(f"- {url}" for url in duplicated)
    if not duplicated:
        lines.append("- None")
    (output / "crawl_coverage_report.md").write_text("\n".join(lines) + "\n", encoding="utf-8")


def validate_exports(output: Path) -> int:
    required = {
        "url_inventory.csv", "pages.jsonl", "page_content.json", "media_manifest.csv",
        "seo_metadata.csv", "redirects.csv", "failed_urls.csv", "crawl_summary.md",
        "source_to_target_mapping_draft.csv", "extraction_quality_report.md", "crawl_coverage_report.md",
    }
    missing = sorted(name for name in required if not (output / name).exists())
    errors: list[str] = []
    warnings: list[str] = []
    readiness: dict[str, Any] = {}
    if missing:
        errors.append(f"Missing files: {', '.join(missing)}")
    pages: list[dict[str, Any]] = []
    if (output / "pages.jsonl").exists():
        try:
            pages = load_jsonl(output / "pages.jsonl")
            urls = [p["source_url"] for p in pages]
            if len(urls) != len(set(urls)):
                errors.append("pages.jsonl contains duplicate source_url values")
            for page in pages:
                snapshot = output / page.get("raw_html_snapshot", "")
                if not snapshot.is_file():
                    errors.append(f"Missing raw snapshot for {page.get('source_url')}")
                    continue
                actual_hash = hashlib.sha256(snapshot.read_bytes()).hexdigest()
                if page.get("sha256") and page["sha256"] != actual_hash:
                    errors.append(f"Snapshot SHA-256 mismatch for {page.get('source_url')}")
                if not page.get("title"):
                    warnings.append(f"Missing title: {page.get('source_url')}")
                if not page.get("cleaned_content_text", page.get("content_text", "")):
                    warnings.append(f"Missing extracted content: {page.get('source_url')}")
        except (json.JSONDecodeError, KeyError) as exc:
            errors.append(f"Invalid pages.jsonl: {exc}")
    for json_name, expected_type in (("page_content.json", list), ("checkpoint.json", dict),
                                     ("crawl_config.json", dict)):
        path = output / json_name
        if not path.exists():
            if json_name in {"checkpoint.json", "crawl_config.json"}:
                errors.append(f"Missing file: {json_name}")
            continue
        try:
            value = json.loads(path.read_text(encoding="utf-8"))
            if not isinstance(value, expected_type):
                errors.append(f"{json_name} must contain {expected_type.__name__}")
        except json.JSONDecodeError as exc:
            errors.append(f"Invalid {json_name}: {exc}")
    csv_requirements = {
        "url_inventory.csv": {"url", "status"}, "media_manifest.csv": {"media_url", "source_page"},
        "seo_metadata.csv": {"source_url", "title", "canonical_url"},
        "redirects.csv": {"source_url", "target_url", "status"},
        "failed_urls.csv": {"url", "reason"},
        "source_to_target_mapping_draft.csv": {"source_url", "proposed_target_url"},
    }
    csv_rows: dict[str, list[dict[str, str]]] = {}
    for filename, required_headers in csv_requirements.items():
        path = output / filename
        if not path.exists():
            continue
        try:
            with path.open(newline="", encoding="utf-8") as handle:
                reader = csv.DictReader(handle)
                headers = set(reader.fieldnames or [])
                if not required_headers <= headers:
                    errors.append(f"{filename} missing headers: {', '.join(sorted(required_headers - headers))}")
                csv_rows[filename] = list(reader)
        except (csv.Error, UnicodeError) as exc:
            errors.append(f"Invalid {filename}: {exc}")
    inventory = csv_rows.get("url_inventory.csv", [])
    inventory_urls = [row.get("url", "") for row in inventory if row.get("url")]
    if len(inventory_urls) != len(set(inventory_urls)):
        errors.append("url_inventory.csv contains duplicate URLs")
    seo = csv_rows.get("seo_metadata.csv", [])
    if len([row.get("source_url") for row in seo]) != len(set(row.get("source_url") for row in seo)):
        errors.append("seo_metadata.csv contains duplicate source URLs")
    for row in seo:
        missing_seo = [field for field in ("title", "canonical_url", "meta_description",
                                           "og_image", "twitter_card") if not row.get(field)]
        if missing_seo:
            warnings.append(f"Incomplete SEO ({', '.join(missing_seo)}): {row.get('source_url')}")
    checkpoint = read_checkpoint(output / "checkpoint.json") if (output / "checkpoint.json").exists() else {}
    queued = set(checkpoint.get("queued", []))
    visited = set(checkpoint.get("visited", []))
    if queued & visited:
        errors.append(f"Checkpoint has {len(queued & visited)} URLs in both queued and visited")
    unknown_queued = queued - set(inventory_urls)
    if unknown_queued:
        errors.append(f"Checkpoint has {len(unknown_queued)} queued URLs missing from inventory")
    page_urls = {page.get("source_url") for page in pages}
    if page_urls - visited:
        errors.append(f"Checkpoint visited set omits {len(page_urls - visited)} captured pages")
    categories = set().union(*(set(page.get("content_categories", [])) for page in pages)) if pages else set()
    missing_categories = sorted(set(CONTENT_HINTS) - categories)
    readiness = {"ready_for_migration": False,
                 "captured_pages": len(pages), "pending_urls": len(queued),
                 "missing_content_categories": missing_categories,
                 "reason": "Controlled crawl coverage is incomplete; migration requires reviewed source-to-target mappings."}
    validation = {"generated_at": utc_now(), "valid": not errors, "errors": errors,
                  "warnings": warnings, "migration_readiness": readiness}
    write_json(output / "validation_report.json", validation)
    if errors:
        print("Validation failed:", file=sys.stderr)
        for error in errors:
            print(f"- {error}", file=sys.stderr)
        return 1
    if warnings:
        print(f"Validation passed with {len(warnings)} warning(s): {output}")
    else:
        print(f"Validation passed: {output}")
    return 0


def reprocess_snapshots(output: Path) -> int:
    pages = load_jsonl(output / "pages.jsonl")
    if not pages:
        print("No captured pages are available for reprocessing.", file=sys.stderr)
        return 1
    revised_pages = []
    for page in pages:
        snapshot = output / page.get("raw_html_snapshot", "")
        if not snapshot.is_file():
            print(f"Missing snapshot: {snapshot}", file=sys.stderr)
            return 1
        raw = snapshot.read_bytes()
        actual_hash = hashlib.sha256(raw).hexdigest()
        if page.get("sha256") and page["sha256"] != actual_hash:
            print(f"Refusing reprocess: SHA-256 mismatch for {page.get('source_url')}", file=sys.stderr)
            return 1
        parser = PageParser(page.get("final_url") or page["source_url"])
        parser.feed(raw.decode("utf-8", errors="replace"))
        parsed = parser.result()
        updated = dict(page)
        updated.update(parsed)
        updated["sha256"] = actual_hash
        updated["content_length"] = len(raw)
        updated["content_categories"] = content_types(updated.get("final_url", page["source_url"]), parsed)
        updated["extraction_version"] = 2
        revised_pages.append(updated)

    replace_files = ["pages.jsonl", "page_content.json", "extraction_quality_report.md",
                     "crawl_coverage_report.md", "validation_report.json"]
    backup = output / ".backups" / datetime.now(timezone.utc).strftime("reprocess-%Y%m%dT%H%M%S%fZ")
    backup.mkdir(parents=True, exist_ok=False)
    for name in replace_files:
        source = output / name
        if source.exists():
            shutil.copy2(source, backup / name)
    jsonl = "".join(json.dumps(page, ensure_ascii=False) + "\n" for page in revised_pages)
    atomic_write_text(output / "pages.jsonl", jsonl)
    page_content = [{
        "source_url": p["source_url"], "title": p.get("title", ""), "headings": p.get("headings", []),
        "main_headings": p.get("main_headings", []), "original_content_text": p.get("original_content_text", ""),
        "cleaned_content_text": p.get("cleaned_content_text", ""), "content_blocks": p.get("content_blocks", []),
        "structured_content": p.get("structured_content", {}), "extraction_quality": p.get("extraction_quality", {}),
        "content_categories": p.get("content_categories", []),
    } for p in revised_pages]
    atomic_write_text(output / "page_content.json", json.dumps(page_content, ensure_ascii=False, indent=2) + "\n")
    failures = load_csv(output / "failed_urls.csv")
    quality_report(output, revised_pages, failures)
    coverage_report(output, pages=revised_pages, failures=failures)
    result = validate_exports(output)
    if result == 0:
        print(f"Reprocessed {len(revised_pages)} snapshots offline; backup: {backup}")
    return result


def backup_output(output: Path, label: str = "preflight") -> int:
    if not output.is_dir():
        print(f"Output directory does not exist: {output}", file=sys.stderr)
        return 1
    backup_root = output / ".backups"
    backup_root.mkdir(exist_ok=True)
    target = backup_root / datetime.now(timezone.utc).strftime(f"{label}-%Y%m%dT%H%M%S%fZ")
    shutil.copytree(output, target, ignore=shutil.ignore_patterns(".backups"))
    manifest = []
    for path in sorted(target.rglob("*")):
        if path.is_file():
            manifest.append({"path": str(path.relative_to(target)), "size": path.stat().st_size,
                             "sha256": hashlib.sha256(path.read_bytes()).hexdigest()})
    write_json(target / "backup_manifest.json", {"created_at": utc_now(), "source": str(output),
                                                  "file_count": len(manifest), "files": manifest})
    print(f"Backup created: {target}")
    return 0


def restore_state_from_backup(output: Path, backup: Path) -> int:
    output = output.resolve()
    backup = backup.resolve()
    backup_root = (output / ".backups").resolve()
    if backup.parent != backup_root or not backup.is_dir():
        print("Backup must be an existing direct child of output/.backups", file=sys.stderr)
        return 1
    required = ["checkpoint.json", "url_inventory.csv", "failed_urls.csv", "pages.jsonl"]
    missing = [name for name in required if not (backup / name).is_file()]
    if missing:
        print(f"Backup is missing required files: {', '.join(missing)}", file=sys.stderr)
        return 1

    def snapshot_evidence(base: Path) -> dict[str, str]:
        evidence = {}
        for page in load_jsonl(base / "pages.jsonl"):
            relative = page.get("raw_html_snapshot", "")
            snapshot = base / relative
            if not snapshot.is_file():
                raise ValueError(f"Missing snapshot in {base}: {relative}")
            actual = hashlib.sha256(snapshot.read_bytes()).hexdigest()
            if page.get("sha256") and page["sha256"] != actual:
                raise ValueError(f"Snapshot hash mismatch in {base}: {relative}")
            evidence[relative] = actual
        return evidence

    try:
        current_snapshots = snapshot_evidence(output)
        backup_snapshots = snapshot_evidence(backup)
    except (ValueError, json.JSONDecodeError) as exc:
        print(f"Restore refused: {exc}", file=sys.stderr)
        return 1
    if current_snapshots != backup_snapshots:
        print("Restore refused: current and backup snapshot evidence differ", file=sys.stderr)
        return 1

    before_checkpoint = read_checkpoint(output / "checkpoint.json")
    source_checkpoint = read_checkpoint(backup / "checkpoint.json")
    before_inventory_hash = hashlib.sha256((output / "url_inventory.csv").read_bytes()).hexdigest()
    source_inventory_hash = hashlib.sha256((backup / "url_inventory.csv").read_bytes()).hexdigest()
    if backup_output(output, "pre-state-restore") != 0:
        return 1
    state_files = ["checkpoint.json", "url_inventory.csv", "failed_urls.csv",
                   "crawl_config.json", "crawl_summary.md"]
    for name in state_files:
        source = backup / name
        if not source.is_file():
            continue
        temporary = (output / name).with_suffix((output / name).suffix + ".restore.tmp")
        temporary.write_bytes(source.read_bytes())
        temporary.replace(output / name)
    audit = {
        "restored_at": utc_now(), "source_backup": str(backup),
        "restored_files": state_files, "raw_snapshots_modified": False,
        "before": {"queued": len(before_checkpoint.get("queued", [])),
                   "visited": len(before_checkpoint.get("visited", [])),
                   "inventory_sha256": before_inventory_hash},
        "after": {"queued": len(source_checkpoint.get("queued", [])),
                  "visited": len(source_checkpoint.get("visited", [])),
                  "inventory_sha256": source_inventory_hash},
        "snapshot_sha256": current_snapshots,
    }
    write_json(output / "queue_restore_audit.json", audit)
    print(f"Crawler state restored from verified backup: {backup}")
    return 0


def print_priority_plan(output: Path, page_limit: int) -> int:
    checkpoint = read_checkpoint(output / "checkpoint.json")
    visited = set(checkpoint.get("visited", []))
    pending = [url for url in checkpoint.get("queued", []) if url not in visited]
    ordered = prioritize_queue(pending)
    existing_counts = Counter(checkpoint.get("page_counts", {}))
    remaining_by_host = {host: max(0, page_limit - existing_counts.get(host, 0)) for host in ALLOWED_HOSTS}
    selected = []
    used: Counter = Counter()
    for url in ordered:
        host = urllib.parse.urlsplit(url).hostname or ""
        if used[host] < remaining_by_host.get(host, 0):
            selected.append(url)
            used[host] += 1
    print(json.dumps({
        "network_enabled": False, "page_limit_per_host": page_limit,
        "existing_page_counts": dict(existing_counts), "pending_count": len(pending),
        "all_pending_preserved": len(ordered) == len(set(pending)),
        "category_counts": dict(Counter(scheduling_category(url) for url in ordered)),
        "planned_urls_within_limit": [
            {"position": index + 1, "category": scheduling_category(url), "url": url}
            for index, url in enumerate(selected)
        ],
        "remaining_after_planned_window": len(ordered) - len(selected),
    }, indent=2))
    return 0


def protected_state_hashes(output: Path) -> dict[str, Any]:
    files = {}
    for name in ("checkpoint.json", "url_inventory.csv", "pages.jsonl"):
        path = output / name
        files[name] = hashlib.sha256(path.read_bytes()).hexdigest() if path.is_file() else None
    snapshots = {}
    raw_dir = output / "raw_html"
    if raw_dir.is_dir():
        for path in sorted(raw_dir.iterdir()):
            if path.is_file():
                snapshots[str(path.relative_to(output))] = hashlib.sha256(path.read_bytes()).hexdigest()
    return {"state_files": files, "raw_snapshots": snapshots}


def environment_facts() -> dict[str, Any]:
    codex_signals = sorted(key for key in os.environ if key.startswith("CODEX"))
    proxy_names = [key for key in ("HTTP_PROXY", "HTTPS_PROXY", "ALL_PROXY", "NO_PROXY",
                                   "http_proxy", "https_proxy", "all_proxy", "no_proxy")
                   if key in os.environ]
    container_markers = []
    cgroup = Path("/proc/1/cgroup")
    if cgroup.is_file():
        text = cgroup.read_text(errors="replace").lower()
        container_markers = [marker for marker in ("docker", "containerd", "kubepods", "podman", "lxc")
                             if marker in text]
    return {
        "platform": platform.platform(), "python_version": platform.python_version(),
        "working_directory": str(Path.cwd()), "stdin_is_tty": sys.stdin.isatty(),
        "stdout_is_tty": sys.stdout.isatty(), "dockerenv_present": Path("/.dockerenv").exists(),
        "cgroup_container_markers": container_markers,
        "codex_environment_signal_names": codex_signals,
        "codex_sandbox_network_disabled_signal_present": "CODEX_SANDBOX_NETWORK_DISABLED" in os.environ,
        "proxy_variable_names_present": proxy_names,
        "note": "Only environment-variable names are reported; values are intentionally excluded.",
    }


def diagnose_network(output: Path, live: bool, client: HttpClient | None = None) -> int:
    if not output.is_dir():
        print(f"Output directory does not exist: {output}", file=sys.stderr)
        return 1
    before = protected_state_hashes(output)
    results = []
    if live:
        diagnostic_client = client or HttpClient(3.0)
        for host in ALLOWED_HOSTS:
            url = f"https://{host}/robots.txt"
            result = diagnostic_client.fetch(url, redirect_allowed=lambda _destination: False)
            if result.status == 200:
                outcome = "success"
                detail = "robots.txt returned HTTP 200. Body was not persisted by diagnostics."
                action = "A separately approved crawl may perform its normal robots parse and safety checks."
            elif result.blocked_redirect:
                outcome = "http_redirect_not_followed"
                detail = "robots.txt returned a redirect; diagnostics intentionally did not follow it."
                action = "Review the recorded public redirect target before any crawl attempt."
            elif result.transport_category:
                outcome = result.transport_category
                detail = result.diagnostic_detail
                action = result.diagnostic_action
            else:
                outcome = "http_response_failure"
                detail = f"robots.txt returned HTTP status {result.status}."
                action = TRANSPORT_ACTIONS["http_response_failure"]
            results.append({
                "host": host, "stage": "robots", "url": url, "timestamp": utc_now(),
                "outcome": outcome, "http_status": result.status,
                "exception_type": result.exception_type, "detail": detail, "action": action,
                "redirects": result.redirects,
            })
    after = protected_state_hashes(output)
    report = {
        "generated_at": utc_now(), "network_attempted": live,
        "network_permission_acknowledged": live,
        "request_policy": {"method": "GET", "maximum_requests_per_host": 1,
                           "targets": [f"https://{host}/robots.txt" for host in ALLOWED_HOSTS],
                           "redirects_followed": False, "authentication": False,
                           "proxy_bypass": False, "minimum_per_host_delay_seconds": 3,
                           "concurrency_per_host": 1},
        "environment": environment_facts(), "results": results,
        "protected_state_before": before, "protected_state_after": after,
        "protected_state_unchanged": before == after,
        "offline_alternative": (
            "Run without --live to record environment and state-hash evidence only. "
            "No DNS or connectivity conclusion can be made without approved network access."
        ),
        "status": "completed" if live else "approval_required_no_network_attempted",
    }
    atomic_write_text(output / "network_diagnostic_report.json",
                      json.dumps(report, ensure_ascii=False, indent=2) + "\n")
    if not live:
        print("Network diagnostic not executed: add --live only after explicit network approval.", file=sys.stderr)
        print(f"Offline diagnostic report written: {output / 'network_diagnostic_report.json'}")
        return 2
    print(f"Network diagnostic report written: {output / 'network_diagnostic_report.json'}")
    return 0


def compare_extraction(output: Path) -> int:
    pages = load_jsonl(output / "pages.jsonl")
    if not pages:
        print("No captured pages are available for comparison.", file=sys.stderr)
        return 1
    lines = ["# Before/after extraction comparison", "", f"Generated: {utc_now()}", "",
             "The before value is the legacy all-visible-text extraction. The after value is the",
             "conservative structured extraction from the unchanged raw HTML snapshot.", ""]
    for page in pages:
        snapshot = output / page.get("raw_html_snapshot", "")
        if not snapshot.is_file():
            lines.extend([f"## {page.get('source_url', 'unknown')}", "", "- Snapshot missing", ""])
            continue
        raw = snapshot.read_bytes()
        parser = PageParser(page.get("final_url") or page["source_url"])
        parser.feed(raw.decode("utf-8", errors="replace"))
        revised = parser.result()
        before = page.get("original_content_text") or page.get("content_text", "")
        after = revised["cleaned_content_text"]
        ratio = (len(after) / len(before)) if before else 0
        quality = revised["extraction_quality"]
        lines.extend([
            f"## {page['source_url']}", "",
            f"- Before characters: {len(before)}", f"- After characters: {len(after)}",
            f"- Retained ratio: {ratio:.1%}",
            f"- Structured blocks: {len(revised['content_blocks'])}",
            f"- Excluded chrome blocks: {quality['excluded_chrome_block_count']}",
            f"- Extraction confidence: {quality['confidence']}",
            f"- Tables: {len(revised['structured_content']['tables'])}",
            f"- FAQ candidates: {len(revised['structured_content']['faq_candidates'])}",
            f"- Course module candidates: {len(revised['structured_content']['course_module_candidates'])}",
            "",
        ])
        for note in quality["notes"]:
            lines.append(f"- Review note: {note}")
        if quality["notes"]:
            lines.append("")
    target = output / "extraction_comparison.md"
    target.write_text("\n".join(lines), encoding="utf-8")
    print(f"Extraction comparison written: {target}")
    return 0


def repair_resume_checkpoint(output: Path) -> int:
    checkpoint_path = output / "checkpoint.json"
    inventory_path = output / "url_inventory.csv"
    if not checkpoint_path.exists() or not inventory_path.exists():
        print("checkpoint.json and url_inventory.csv are required", file=sys.stderr)
        return 1
    if backup_output(output, "pre-resume-repair") != 0:
        return 1
    checkpoint = read_checkpoint(checkpoint_path)
    visited = set(checkpoint.get("visited", []))
    visited.update(p.get("source_url") for p in load_jsonl(output / "pages.jsonl") if p.get("source_url"))
    pending = list(checkpoint.get("queued", []))
    for row in load_csv(inventory_path):
        url = canonicalize_url(row.get("url", ""))
        if not url or url in visited or not host_allowed(url) or is_private_path(url) or is_media_url(url):
            continue
        if row.get("status", "") in {"", "discovered", "queued"}:
            pending.append(url)
    checkpoint["visited"] = sorted(visited)
    checkpoint["queued"] = list(dict.fromkeys(pending))
    checkpoint["updated_at"] = utc_now()
    checkpoint["repair_note"] = "Pending public URLs reconstructed from inventory; no network requests made."
    write_json(checkpoint_path, checkpoint)
    print(f"Resume checkpoint repaired with {len(checkpoint['queued'])} pending URLs: {checkpoint_path}")
    return 0


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description=__doc__)
    sub = parser.add_subparsers(dest="command", required=True)
    sub.add_parser("plan", help="Print the safe crawl plan without network access")
    crawl = sub.add_parser("crawl", help="Run an explicitly approved live crawl")
    crawl.add_argument("--live", action="store_true", help="Required network safety acknowledgement")
    crawl.add_argument("--page-limit", type=int, default=25)
    crawl.add_argument("--delay", type=float, default=3.0)
    crawl.add_argument("--output", type=Path, default=Path("crawler-output"))
    validate = sub.add_parser("validate", help="Validate an existing export without network access")
    validate.add_argument("--output", type=Path, required=True)
    compare = sub.add_parser("compare-extraction", help="Compare legacy and revised extraction offline")
    compare.add_argument("--output", type=Path, required=True)
    repair = sub.add_parser("repair-resume", help="Reconstruct pending checkpoint URLs offline")
    repair.add_argument("--output", type=Path, required=True)
    reprocess = sub.add_parser("reprocess-snapshots", help="Re-extract existing raw snapshots offline")
    reprocess.add_argument("--output", type=Path, required=True)
    backup = sub.add_parser("backup-output", help="Create a timestamped offline backup of crawler output")
    backup.add_argument("--output", type=Path, required=True)
    backup.add_argument("--label", default="preflight")
    restore = sub.add_parser("restore-state", help="Explicitly restore queue/inventory state from a verified backup")
    restore.add_argument("--output", type=Path, required=True)
    restore.add_argument("--backup", type=Path, required=True)
    priority = sub.add_parser("priority-plan", help="Print deterministic pending-queue order without mutation")
    priority.add_argument("--output", type=Path, required=True)
    priority.add_argument("--page-limit", type=int, default=25)
    diagnostic = sub.add_parser("diagnose-network", help="Run isolated robots transport diagnostics")
    diagnostic.add_argument("--output", type=Path, required=True)
    diagnostic.add_argument("--live", action="store_true",
                            help="Required explicit acknowledgement for two robots GET requests")
    return parser


def main() -> int:
    args = build_parser().parse_args()
    if args.command == "plan":
        print(json.dumps({"seeds": SEEDS, "allowed_hosts": ALLOWED_HOSTS,
                          "page_limit_per_host": 25, "minimum_delay_seconds": 3,
                          "concurrency_per_host": 1, "network_enabled": False,
                          "media_downloads": False}, indent=2))
        return 0
    if args.command == "validate":
        return validate_exports(args.output.resolve())
    if args.command == "compare-extraction":
        return compare_extraction(args.output.resolve())
    if args.command == "repair-resume":
        return repair_resume_checkpoint(args.output.resolve())
    if args.command == "reprocess-snapshots":
        return reprocess_snapshots(args.output.resolve())
    if args.command == "backup-output":
        return backup_output(args.output.resolve(), args.label)
    if args.command == "restore-state":
        return restore_state_from_backup(args.output.resolve(), args.backup.resolve())
    if args.command == "priority-plan":
        if not 1 <= args.page_limit <= 25:
            print("--page-limit must be between 1 and 25", file=sys.stderr)
            return 2
        return print_priority_plan(args.output.resolve(), args.page_limit)
    if args.command == "diagnose-network":
        return diagnose_network(args.output.resolve(), args.live)
    if not args.live:
        print("Refusing network access: pass --live only after crawl approval.", file=sys.stderr)
        return 2
    if not 1 <= args.page_limit <= 25:
        print("--page-limit must be between 1 and 25 per host", file=sys.stderr)
        return 2
    if args.delay < 3:
        print("--delay cannot be less than 3 seconds", file=sys.stderr)
        return 2
    Crawler(args.output.resolve(), args.page_limit, args.delay).run()
    return validate_exports(args.output.resolve())


if __name__ == "__main__":
    raise SystemExit(main())


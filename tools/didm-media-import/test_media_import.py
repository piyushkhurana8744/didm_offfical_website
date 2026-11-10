import importlib.util
from io import BytesIO
import hashlib
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch
from urllib.error import HTTPError
from email.message import Message
import ssl

from PIL import Image


class MockResponse:
    def __init__(self, body: bytes, content_type: str = "text/plain"):
        self.body = body
        self.headers = Message()
        self.headers["Content-Type"] = content_type

    def read(self, _limit=-1):
        return self.body

    def __enter__(self):
        return self

    def __exit__(self, *_args):
        return False


def redirect_error(source: str, destination: str, status: int = 301):
    headers = Message()
    headers["Location"] = destination
    return HTTPError(source, status, "Redirect", headers, None)


MODULE_PATH = Path(__file__).with_name("media_import.py")
SPEC = importlib.util.spec_from_file_location("media_import", MODULE_PATH)
media_import = importlib.util.module_from_spec(SPEC)
assert SPEC.loader
SPEC.loader.exec_module(media_import)


class MediaImportTests(unittest.TestCase):
    def test_resolves_relative_and_srcset_media(self):
        parser = media_import.MediaHTMLParser("https://www.didm.in/course/page")
        parser.feed('<picture><source srcset="/a.webp 1x, /a@2x.webp 2x"><img data-src="../b.jpg" alt="Class"></picture>')
        urls = {item[0] for item in parser.items}
        self.assertEqual(urls, {
            "https://www.didm.in/a.webp",
            "https://www.didm.in/a@2x.webp",
            "https://www.didm.in/b.jpg",
        })

    def test_finds_css_and_open_graph_images(self):
        parser = media_import.MediaHTMLParser("https://www.didm.in/")
        parser.feed('<meta property="og:image" content="/hero.png"><div style="background-image:url(\'/room.webp\')"></div>')
        self.assertEqual({item[0] for item in parser.items}, {
            "https://www.didm.in/hero.png", "https://www.didm.in/room.webp",
        })

    def test_rejects_embedded_and_non_http_urls(self):
        self.assertIsNone(media_import.normalise_url("data:image/png;base64,abc", "https://www.didm.in/"))
        self.assertIsNone(media_import.normalise_url("javascript:alert(1)", "https://www.didm.in/"))

    def test_signatures(self):
        self.assertEqual(media_import.sniff_mime(b"\x89PNG\r\n\x1a\nrest"), "image/png")
        self.assertEqual(media_import.sniff_mime(b"<svg xmlns='http://www.w3.org/2000/svg'></svg>"), "image/svg+xml")
        self.assertIsNone(media_import.sniff_mime(b"not an image"))

    @staticmethod
    def png_bytes():
        output = BytesIO()
        Image.new("RGB", (2, 2), "red").save(output, format="PNG")
        return output.getvalue()

    def test_mime_signature_mismatch_is_rejected(self):
        with self.assertRaisesRegex(ValueError, "MIME/signature mismatch"):
            media_import.validate_image_data(self.png_bytes(), declared_mime="image/jpeg")

    def test_raster_must_decode_not_just_match_magic_bytes(self):
        with self.assertRaisesRegex(ValueError, "decoding failed"):
            media_import.validate_image_data(b"\x89PNG\r\n\x1a\ntruncated")

    def test_svg_rejects_active_content_and_accepts_static_markup(self):
        safe = b'<svg xmlns="http://www.w3.org/2000/svg"><rect width="1" height="1"/></svg>'
        self.assertEqual(media_import.validate_image_data(safe, "image/svg+xml"), "image/svg+xml")
        unsafe = b'<svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script></svg>'
        with self.assertRaisesRegex(ValueError, "active"):
            media_import.validate_image_data(unsafe, "image/svg+xml")
        external = b'<svg xmlns="http://www.w3.org/2000/svg"><style>.x{fill:url(https://bad.example/x)}</style></svg>'
        with self.assertRaisesRegex(ValueError, "CSS"):
            media_import.validate_image_data(external, "image/svg+xml")

    def test_resume_requires_existing_matching_decodable_file(self):
        data = self.png_bytes()
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            image_path = root / "asset.png"
            image_path.write_bytes(data)
            row = {
                "local_destination": "asset.png", "file_size": len(data),
                "sha256": hashlib.sha256(data).hexdigest(), "mime_type": "image/png",
            }
            with patch.object(media_import, "ROOT", root):
                self.assertEqual(media_import.verify_resume_entry(row), (True, "verified"))
                row["sha256"] = "0" * 64
                self.assertEqual(media_import.verify_resume_entry(row)[0], False)
                image_path.unlink()
                self.assertEqual(media_import.verify_resume_entry(row)[0], False)

    def test_each_redirect_hop_is_checked_before_request(self):
        headers = Message()
        headers["Location"] = "https://didm.in/final.png"

        class Client(media_import.PolicyClient):
            def __init__(self):
                self.checked = []
                self.requests = []

            def ensure_allowed(self, url):
                self.checked.append(url)

            def raw_get(self, url):
                self.requests.append(url)
                if len(self.requests) == 1:
                    raise HTTPError(url, 302, "Found", headers, None)
                return "response"

        client = Client()
        with patch.object(media_import, "assert_public_host"):
            response, final = client.get_media("https://www.didm.in/start.png")
        self.assertEqual(response, "response")
        self.assertEqual(final, "https://didm.in/final.png")
        self.assertEqual(client.checked, [
            "https://www.didm.in/start.png", "https://didm.in/final.png",
        ])

    def test_rate_limit_state_is_host_specific(self):
        client = media_import.PolicyClient(delay_seconds=3)
        client.last_request = {"didm.in": 99.0, "www.didm.in": 90.0}
        with patch.object(media_import.time, "monotonic", return_value=100.0), \
             patch.object(media_import.time, "sleep") as sleep:
            client.throttle("didm.in")
            client.throttle("www.didm.in")
        sleep.assert_called_once_with(2.0)

    def test_successful_same_host_robots_redirect(self):
        client = media_import.PolicyClient()
        responses = [
            redirect_error("https://www.didm.in/robots.txt", "/canonical-robots.txt"),
            MockResponse(b"User-agent: *\nDisallow: /cgi-bin/\n"),
        ]
        with patch.object(client, "raw_get", side_effect=responses), \
             patch.object(media_import, "assert_public_host"):
            final, body = client.fetch_robots_document("https://www.didm.in/robots.txt")
        self.assertEqual(final, "https://www.didm.in/canonical-robots.txt")
        self.assertIn(b"User-agent", body)

    def test_legitimate_cross_host_robots_redirect(self):
        client = media_import.PolicyClient()
        responses = [
            redirect_error("https://didm.in/robots.txt", "https://www.didm.in/robots.txt"),
            MockResponse(b"User-agent: *\nDisallow:\n"),
        ]
        with patch.object(client, "raw_get", side_effect=responses), \
             patch.object(media_import, "assert_public_host") as validate_host:
            final, _body = client.fetch_robots_document("https://didm.in/robots.txt")
        self.assertEqual(final, "https://www.didm.in/robots.txt")
        validate_host.assert_called_once_with("www.didm.in")

    def test_robots_redirect_loop_is_rejected(self):
        client = media_import.PolicyClient()
        responses = [
            redirect_error("https://didm.in/robots.txt", "https://www.didm.in/robots.txt"),
            redirect_error("https://www.didm.in/robots.txt", "https://didm.in/robots.txt"),
        ]
        with patch.object(client, "raw_get", side_effect=responses), \
             patch.object(media_import, "assert_public_host"):
            with self.assertRaisesRegex(PermissionError, "loop"):
                client.fetch_robots_document("https://didm.in/robots.txt")

    def test_robots_https_downgrade_is_rejected(self):
        client = media_import.PolicyClient()
        error = redirect_error("https://didm.in/robots.txt", "http://www.didm.in/robots.txt")
        with patch.object(client, "raw_get", side_effect=error):
            with self.assertRaisesRegex(PermissionError, "HTTPS"):
                client.fetch_robots_document("https://didm.in/robots.txt")

    def test_non_allowlisted_robots_redirect_is_rejected(self):
        client = media_import.PolicyClient()
        error = redirect_error("https://didm.in/robots.txt", "https://example.com/robots.txt")
        with patch.object(client, "raw_get", side_effect=error), \
             patch.object(media_import, "assert_public_host", side_effect=ValueError("not allowlisted")):
            with self.assertRaisesRegex(ValueError, "allowlisted"):
                client.fetch_robots_document("https://didm.in/robots.txt")

    def test_html_masquerading_as_robots_is_rejected(self):
        client = media_import.PolicyClient()
        response = MockResponse(b"<!doctype html><html><body>blocked</body></html>", "text/plain")
        with patch.object(client, "raw_get", return_value=response):
            with self.assertRaisesRegex(ValueError, "HTML"):
                client.fetch_robots_document("https://didm.in/robots.txt")

    def test_robots_disallow_is_enforced(self):
        client = media_import.PolicyClient()
        response = MockResponse(b"User-agent: *\nDisallow: /assets/private/\n")
        with patch.object(client, "raw_get", return_value=response):
            with self.assertRaisesRegex(PermissionError, "disallows"):
                client.ensure_allowed("https://didm.in/assets/private/image.png")

    def test_tls_verification_remains_enabled(self):
        client = media_import.PolicyClient()
        self.assertEqual(client.ssl_context.verify_mode, ssl.CERT_REQUIRED)
        self.assertTrue(client.ssl_context.check_hostname)

    def test_blocked_robots_host_never_requests_media(self):
        client = media_import.PolicyClient()
        with patch.object(client, "robots_for", return_value=None), \
             patch.object(client, "raw_get") as raw_get:
            with self.assertRaisesRegex(PermissionError, "failing closed"):
                client.get_media("https://didm.in/assets/image.png")
        raw_get.assert_not_called()

    def test_verified_files_are_not_selected_for_redownload(self):
        row = {"source_url": "https://www.didm.in/done.png", "host": "www.didm.in",
               "status": "eligible", "category": "courses", "referring_pages": "https://www.didm.in/"}
        selected = media_import.select_batch([row], {row["source_url"]}, "pilot", 12, [row["source_url"]])
        self.assertEqual(selected, [])

    def test_pilot_is_representative_and_never_selects_third_party(self):
        rows = []
        for category in ("logo", "homepage", "courses", "centres"):
            name = "didm-logo-reg" if category == "logo" else category
            referrer = "https://www.didm.in/" if category == "homepage" else "https://www.didm.in/page"
            rows.append({
                "source_url": f"https://www.didm.in/{name}.png", "host": "www.didm.in",
                "status": "eligible", "category": category, "referring_pages": referrer,
            })
        rows.append({
            "source_url": "https://example.com/no.png", "host": "example.com",
            "status": "eligible", "category": "logo", "referring_pages": "https://www.didm.in/",
        })
        selected = media_import.select_batch(rows, set(), "pilot", 4)
        self.assertEqual({row["category"] for row in selected}, {"logo", "homepage", "courses", "centres"})
        self.assertNotIn("example.com", {row["host"] for row in selected})

    def test_resumed_pilot_cannot_drift_beyond_persisted_urls(self):
        rows = [
            {"source_url": f"https://www.didm.in/{name}.png", "host": "www.didm.in",
             "status": "eligible", "category": "courses", "referring_pages": "https://www.didm.in/"}
            for name in ("approved-a", "approved-b", "not-approved")
        ]
        approved = [rows[0]["source_url"], rows[1]["source_url"]]
        selected = media_import.select_batch(rows, {approved[0]}, "pilot", 12, approved)
        self.assertEqual([row["source_url"] for row in selected], [approved[1]])

    def test_http_restrictions_are_blocked_without_retry_classification(self):
        for status in (401, 403, 406, 429):
            error = HTTPError("https://www.didm.in/a.png", status, "blocked", Message(), None)
            self.assertEqual(media_import.error_outcome(error), "blocked")
        error = HTTPError("https://www.didm.in/a.png", 500, "error", Message(), None)
        self.assertEqual(media_import.error_outcome(error), "failed")

    def test_blog_is_blocked_and_third_party_is_pending(self):
        self.assertEqual(media_import.status_for({"host": "blog.didm.in", "source_url": "https://blog.didm.in/a.jpg"})[0], "blocked_blog_tls")
        self.assertEqual(media_import.status_for({"host": "example.com", "source_url": "https://example.com/a.jpg"})[0], "pending_authorization")
        self.assertEqual(
            media_import.serialise({
                "https://www.didm.in/a.jpg": {
                    "source_url": "https://www.didm.in/a.jpg", "host": "www.didm.in",
                    "referring_pages": set(), "discovered_via": {"test"},
                    "alt_texts": set(), "titles": set(),
                }
            })[0]["license_authorization_status"],
            "pending_explicit_reuse_confirmation",
        )


if __name__ == "__main__":
    unittest.main()

import json
import io
import email.message
import sys
import tempfile
import unittest
import urllib.error
import urllib.parse
import socket
import ssl
from pathlib import Path
from unittest import mock

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

from crawler import (Crawler, FetchResult, HttpClient, PageParser, backup_output,
                     canonicalize_url, classify_transport_exception, content_types,
                     coverage_report, diagnose_network, host_allowed,
                     is_media_url, is_private_path, load_jsonl, repair_resume_checkpoint,
                     prioritize_queue, reprocess_snapshots, restore_state_from_backup,
                     scheduling_category, validate_exports)


class UrlSafetyTests(unittest.TestCase):
    def test_canonicalization_and_dedup_shape(self):
        self.assertEqual(
            canonicalize_url("https://didm.in/course/?b=2&a=1#section"),
            "https://www.didm.in/course?a=1&b=2",
        )
        self.assertEqual(
            canonicalize_url("https://www.didm.in/course?utm_source=test&fbclid=x&a=1"),
            "https://www.didm.in/course?a=1",
        )

    def test_host_allowlist(self):
        self.assertTrue(host_allowed("https://www.didm.in/"))
        self.assertTrue(host_allowed("https://www.blog.didm.in/post"))
        self.assertFalse(host_allowed("https://example.com/"))

    def test_private_and_media_classification(self):
        self.assertTrue(is_private_path("https://www.didm.in/wp-admin/"))
        self.assertTrue(is_private_path("https://www.didm.in/course?action=delete"))
        self.assertTrue(is_media_url("https://www.didm.in/file.PDF"))
        self.assertFalse(is_media_url("https://www.didm.in/course"))


class PrioritySchedulingTests(unittest.TestCase):
    def setUp(self):
        self.urls = [
            "https://www.didm.in/news-and-event/example/1",
            "https://www.didm.in/privacy-policy",
            "https://www.didm.in/trainee-reviews",
            "https://www.didm.in/placement",
            "https://www.didm.in/digital-marketing-course-in-dwarka",
            "https://www.didm.in/master-in-digital-marketing-course",
            "https://www.didm.in/about-us",
        ]

    def test_priority_order_is_deterministic_and_preserves_every_url(self):
        forward = prioritize_queue(self.urls)
        reverse = prioritize_queue(reversed(self.urls))
        self.assertEqual(forward, reverse)
        self.assertEqual(set(forward), set(self.urls))
        self.assertEqual(len(forward), len(self.urls))
        priorities = [
            "flagship_course", "centre", "trainers_placements",
            "testimonials_certifications", "legal", "other", "news_events",
        ]
        self.assertEqual([scheduling_category(url) for url in forward], priorities)

    def test_news_cannot_consume_mixed_initial_window(self):
        news = [f"https://www.didm.in/news-and-event/story/{index}" for index in range(30)]
        ordered = prioritize_queue(news + self.urls)
        first_six = ordered[:6]
        self.assertTrue(any(scheduling_category(url) != "news_events" for url in first_six))
        first_news = next(index for index, url in enumerate(ordered) if scheduling_category(url) == "news_events")
        self.assertEqual(first_news, 6)


class ExtractionTests(unittest.TestCase):
    def setUp(self):
        self.fixture = (ROOT / "tests" / "fixtures" / "sample.html").read_text(encoding="utf-8")

    def test_extracts_content_seo_links_and_media(self):
        parser = PageParser("https://www.didm.in/sample-course")
        parser.feed(self.fixture)
        page = parser.result()
        self.assertEqual(page["title"], "DIDM Sample Course")
        self.assertEqual(page["canonical_url"], "https://www.didm.in/sample-course")
        self.assertEqual(page["headings"][0], {"level": "h1", "text": "Sample course"})
        self.assertEqual(page["meta"]["description"], "A sample course fixture.")
        self.assertIn("https://www.didm.in/about-us", [x["url"] for x in page["links"]])
        self.assertEqual(page["media"][0]["alt"], "Students learning")
        self.assertEqual(page["json_ld"][0]["@type"], "Course")
        self.assertIn("course", content_types("https://www.didm.in/sample-course", page))
        self.assertNotIn("About DIDM navigation", page["cleaned_content_text"])
        self.assertNotIn("Repeated footer content", page["cleaned_content_text"])
        self.assertIn("Keyword research", page["cleaned_content_text"])
        self.assertIn("Repeated footer content", page["original_content_text"])
        self.assertEqual(len(page["structured_content"]["tables"]), 1)
        self.assertEqual(page["structured_content"]["faq_candidates"][0]["confidence"], "candidate")
        self.assertIn("info@didm.in", page["structured_content"]["contact_details"]["emails"])
        self.assertEqual(page["extraction_quality"]["confidence"], "high")

    def test_malformed_html_void_elements_nesting_order_and_script_exclusion(self):
        fixture = (ROOT / "tests" / "fixtures" / "malformed.html").read_text(encoding="utf-8")
        parser = PageParser("https://www.didm.in/malformed")
        parser.feed(fixture)
        page = parser.result()
        cleaned = page["cleaned_content_text"]
        self.assertNotIn("DO NOT LEAK", page["original_content_text"])
        self.assertNotIn("Repeated navigation", cleaned)
        self.assertNotIn("Repeated footer", cleaned)
        for expected in ("Course", "Overview", "Opening text", "First", "nested", "Second item",
                         "Module", "Topic", "SEO and Analytics", "practical exercises"):
            self.assertIn(expected, cleaned)
        self.assertLess(cleaned.index("Opening text"), cleaned.index("First"))
        self.assertLess(cleaned.index("First"), cleaned.index("Second item"))
        self.assertEqual(len(page["structured_content"]["tables"]), 1)
        self.assertTrue(page["structured_content"]["faq_candidates"])

    def test_export_validator_detects_valid_fixture_export(self):
        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory)
            (output / "raw_html").mkdir()
            (output / "raw_html" / "sample.html").write_text(self.fixture, encoding="utf-8")
            page = {"source_url": "https://www.didm.in/sample-course",
                    "raw_html_snapshot": "raw_html/sample.html",
                    "sha256": __import__("hashlib").sha256(self.fixture.encode()).hexdigest(),
                    "title": "Sample", "content_text": "Sample content", "content_categories": []}
            (output / "pages.jsonl").write_text(json.dumps(page) + "\n", encoding="utf-8")
            (output / "checkpoint.json").write_text(json.dumps({"visited": [page["source_url"]], "queued": []}))
            (output / "crawl_config.json").write_text("{}")
            for name in ("url_inventory.csv", "page_content.json", "media_manifest.csv",
                         "seo_metadata.csv", "redirects.csv", "failed_urls.csv",
                         "crawl_summary.md", "source_to_target_mapping_draft.csv",
                         "extraction_quality_report.md", "crawl_coverage_report.md"):
                (output / name).write_text("fixture\n", encoding="utf-8")
            (output / "url_inventory.csv").write_text("url,status\nhttps://www.didm.in/sample-course,crawled\n")
            (output / "media_manifest.csv").write_text("media_url,source_page\n")
            (output / "seo_metadata.csv").write_text(
                "source_url,title,canonical_url,meta_description\nhttps://www.didm.in/sample-course,Sample,https://www.didm.in/sample-course,Sample\n")
            (output / "redirects.csv").write_text("source_url,target_url,status\n")
            (output / "failed_urls.csv").write_text("url,reason\n")
            (output / "source_to_target_mapping_draft.csv").write_text(
                "source_url,proposed_target_url\nhttps://www.didm.in/sample-course,\n")
            (output / "page_content.json").write_text("[]")
            self.assertEqual(validate_exports(output), 0)


class FakeResponse:
    def __init__(self, url, status=200, body=b"ok", headers=None):
        self.url, self.status, self.body = url, status, body
        self.headers = email.message.Message()
        for key, value in (headers or {}).items():
            self.headers[key] = value

    def __enter__(self):
        return self

    def __exit__(self, *args):
        return False

    def read(self):
        return self.body


class SequenceOpener:
    def __init__(self, responses):
        self.responses = list(responses)
        self.requests = []

    def open(self, request, timeout=None):
        self.requests.append(request.full_url)
        response = self.responses.pop(0)
        if isinstance(response, Exception):
            raise response
        return response


def redirect_error(source, destination, status=302):
    headers = email.message.Message()
    headers["Location"] = destination
    return urllib.error.HTTPError(source, status, "redirect", headers, io.BytesIO(b""))


class RedirectSafetyTests(unittest.TestCase):
    def test_same_host_redirect_is_delayed_and_robots_checked(self):
        opener = SequenceOpener([
            redirect_error("https://www.didm.in/start", "/allowed"),
            FakeResponse("https://www.didm.in/allowed", body=b"done"),
        ])
        checked = []
        with mock.patch("urllib.request.build_opener", return_value=opener), mock.patch("time.sleep") as sleeper:
            result = HttpClient(3).fetch("https://www.didm.in/start",
                                         redirect_allowed=lambda url: checked.append(url) or True)
        self.assertEqual(result.status, 200)
        self.assertEqual(checked, ["https://www.didm.in/allowed"])
        self.assertEqual(len(opener.requests), 2)
        self.assertTrue(sleeper.called)
        self.assertEqual(result.redirects[0]["followed"], "true")

    def test_cross_host_or_robots_disallowed_redirect_is_not_fetched(self):
        for destination, expected_reason in (("https://example.com/x", "unapproved_host"),
                                             ("https://www.blog.didm.in/private-page", "robots_disallowed")):
            opener = SequenceOpener([redirect_error("https://www.didm.in/start", destination)])
            with mock.patch("urllib.request.build_opener", return_value=opener):
                result = HttpClient(3).fetch("https://www.didm.in/start", redirect_allowed=lambda _url: False)
            self.assertTrue(result.blocked_redirect)
            self.assertEqual(len(opener.requests), 1)
            self.assertEqual(result.redirects[0]["blocked_reason"], expected_reason)

    def test_retry_after_is_parsed_without_automatic_retry(self):
        headers = email.message.Message()
        headers["Retry-After"] = "7"
        error = urllib.error.HTTPError("https://www.didm.in/busy", 429, "busy", headers, io.BytesIO(b""))
        opener = SequenceOpener([error])
        with mock.patch("urllib.request.build_opener", return_value=opener):
            result = HttpClient(3).fetch("https://www.didm.in/busy", redirect_allowed=lambda _url: True)
        self.assertEqual(result.status, 429)
        self.assertEqual(result.retry_after_seconds, 7)
        self.assertEqual(len(opener.requests), 1)


class TransportDiagnosticTests(unittest.TestCase):
    def test_transport_error_classification(self):
        cases = [
            (urllib.error.URLError(socket.gaierror(-2, "name failure")), "dns_resolution_failure"),
            (ssl.SSLCertVerificationError(1, "certificate failure"), "tls_certificate_failure"),
            (socket.timeout("timed out"), "connection_timeout"),
            (ConnectionRefusedError(61, "refused"), "connection_refused"),
            (PermissionError(13, "not permitted"), "network_restriction"),
            (RuntimeError("unexpected secret-bearing text"), "unexpected_transport_exception"),
        ]
        for exc, expected in cases:
            result = classify_transport_exception(exc)
            self.assertEqual(result["category"], expected)
            self.assertNotIn("secret-bearing", result["detail"])
            self.assertTrue(result["exception_type"])
            self.assertTrue(result["action"])

    def test_network_diagnostic_never_mutates_crawl_state(self):
        class DiagnosticClient:
            delay = 3.0

            def __init__(self):
                self.calls = []

            def fetch(self, url, redirect_allowed=None):
                self.calls.append(url)
                return FetchResult(url, url, 0, {}, b"", error="dns_resolution_failure",
                                   transport_category="dns_resolution_failure",
                                   exception_type="gaierror", diagnostic_detail="Hostname resolution failed.",
                                   diagnostic_action="Verify DNS.")

        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory)
            (output / "raw_html").mkdir()
            (output / "checkpoint.json").write_text('{"queued": ["https://www.didm.in/course"]}')
            (output / "url_inventory.csv").write_text("url,status\nhttps://www.didm.in/course,queued\n")
            (output / "pages.jsonl").write_text("")
            state = [output / "checkpoint.json", output / "url_inventory.csv", output / "pages.jsonl"]
            before = {p.name: p.read_bytes() for p in state}
            client = DiagnosticClient()
            self.assertEqual(diagnose_network(output, True, client), 0)
            self.assertEqual(client.calls, [
                "https://www.didm.in/robots.txt", "https://www.blog.didm.in/robots.txt"])
            self.assertEqual(before, {p.name: p.read_bytes() for p in state})
            report = json.loads((output / "network_diagnostic_report.json").read_text())
            self.assertTrue(report["protected_state_unchanged"])
            self.assertEqual([r["outcome"] for r in report["results"]],
                             ["dns_resolution_failure", "dns_resolution_failure"])

    def test_offline_diagnostic_makes_no_requests(self):
        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory)
            (output / "raw_html").mkdir()
            for name, content in (("checkpoint.json", "{}"), ("url_inventory.csv", "url,status\n"),
                                  ("pages.jsonl", "")):
                (output / name).write_text(content)
            self.assertEqual(diagnose_network(output, False), 2)
            report = json.loads((output / "network_diagnostic_report.json").read_text())
            self.assertFalse(report["network_attempted"])
            self.assertEqual(report["results"], [])


class FakeRobots:
    failures = []

    def __init__(self, successful=True):
        self.sitemaps = {"www.didm.in": [], "www.blog.didm.in": []}
        self.loaded_successfully = {"www.didm.in": successful, "www.blog.didm.in": successful}

    def load(self, seed):
        return None

    def allowed(self, url):
        return self.decision(url) == "robots_allowed"

    def decision(self, url):
        host = urllib.parse.urlsplit(url).hostname or ""
        return "robots_allowed" if self.loaded_successfully.get(host, False) else "robots_unavailable"


class FakeClient:
    delay = 0.0

    def __init__(self, pages, interrupt_on=None):
        self.pages = pages
        self.interrupt_on = interrupt_on
        self.calls = []

    def fetch(self, url, method="GET", redirect_allowed=None):
        self.calls.append(url)
        if self.interrupt_on and len(self.calls) == self.interrupt_on:
            raise KeyboardInterrupt()
        body = self.pages.get(url, "<html><main><h1>Fixture</h1><p>Fixture body text long enough for extraction.</p></main></html>").encode()
        return FetchResult(url, url, 200, {"Content-Type": "text/html; charset=UTF-8"}, body)


class StatusClient(FakeClient):
    def __init__(self, sequences):
        super().__init__({})
        self.sequences = {url: list(results) for url, results in sequences.items()}

    def fetch(self, url, method="GET", redirect_allowed=None):
        self.calls.append(url)
        results = self.sequences.get(url)
        if results:
            return results.pop(0)
        body = b"<html><main><h1>OK</h1><p>Successful fixture page.</p></main></html>"
        return FetchResult(url, url, 200, {"Content-Type": "text/html"}, body)


class ResumeTests(unittest.TestCase):
    def pages(self):
        return {
            "https://www.didm.in/": '<html><main><h1>Home</h1><a href="/course">Course</a></main></html>',
            "https://www.blog.didm.in/": '<html><main><h1>Blog</h1><a href="/post/2">Post</a></main></html>',
            "https://www.didm.in/course": '<html><main><h1>Course</h1><p>Course body.</p></main></html>',
            "https://www.blog.didm.in/post/2": '<html><main><h1>Post</h1><p>Post body.</p></main></html>',
        }

    def crawler(self, output, limit, client):
        crawler = Crawler(output, limit, 3.0)
        crawler.client = client
        crawler.robots = FakeRobots()
        return crawler

    def test_page_limit_preserves_pending_and_resume_avoids_refetch(self):
        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory)
            first_client = FakeClient(self.pages())
            self.crawler(output, 1, first_client).run()
            checkpoint = json.loads((output / "checkpoint.json").read_text())
            self.assertEqual(len(load_jsonl(output / "pages.jsonl")), 2)
            self.assertEqual(set(checkpoint["queued"]), {
                "https://www.didm.in/course", "https://www.blog.didm.in/post/2"})

            second_client = FakeClient(self.pages())
            self.crawler(output, 2, second_client).run()
            self.assertEqual(set(second_client.calls), {
                "https://www.didm.in/course", "https://www.blog.didm.in/post/2"})
            self.assertEqual(len(load_jsonl(output / "pages.jsonl")), 4)
            resumed = json.loads((output / "checkpoint.json").read_text())
            self.assertEqual(resumed["queued"], [])

    def test_prioritized_checkpoint_resume_preserves_order_and_skips_completed(self):
        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory)
            course = "https://www.didm.in/master-in-digital-marketing-course"
            centre = "https://www.didm.in/digital-marketing-course-in-dwarka"
            news = "https://www.didm.in/news-and-event/example/1"
            (output / "url_inventory.csv").write_text(
                "url,status\n" + "".join(f"{url},queued\n" for url in (news, centre, course)))
            (output / "checkpoint.json").write_text(json.dumps({
                "visited": list(__import__("crawler").SEEDS),
                "queued": [news, centre, course], "page_counts": {}, "stopped_hosts": [],
            }))
            first = FakeClient({})
            self.crawler(output, 1, first).run()
            self.assertEqual(first.calls, [course])
            checkpoint = json.loads((output / "checkpoint.json").read_text())
            self.assertEqual(checkpoint["queued"], [centre, news])

            second = FakeClient({})
            self.crawler(output, 2, second).run()
            self.assertEqual(second.calls, [centre])
            resumed = json.loads((output / "checkpoint.json").read_text())
            self.assertEqual(resumed["queued"], [news])

    def test_interrupted_inflight_url_survives_checkpoint(self):
        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory)
            interrupted = FakeClient(self.pages(), interrupt_on=2)
            with self.assertRaises(KeyboardInterrupt):
                self.crawler(output, 2, interrupted).run()
            checkpoint = json.loads((output / "checkpoint.json").read_text())
            self.assertIn(interrupted.calls[-1], checkpoint["queued"])

            resumed_client = FakeClient(self.pages())
            self.crawler(output, 2, resumed_client).run()
            self.assertNotIn(interrupted.calls[0], resumed_client.calls)
            self.assertEqual(len(load_jsonl(output / "pages.jsonl")), 4)

    def test_legacy_empty_queue_is_repaired_from_inventory(self):
        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory)
            (output / "checkpoint.json").write_text(json.dumps({
                "visited": ["https://www.didm.in/"], "queued": [],
                "page_counts": {"www.didm.in": 1}, "stopped_hosts": []}))
            (output / "pages.jsonl").write_text("")
            (output / "url_inventory.csv").write_text(
                "url,status\nhttps://www.didm.in/,crawled\n"
                "https://www.didm.in/course,discovered\n"
                "https://www.didm.in/wp-admin/,discovered\n")
            self.assertEqual(repair_resume_checkpoint(output), 0)
            repaired = json.loads((output / "checkpoint.json").read_text())
            self.assertEqual(repaired["queued"], ["https://www.didm.in/course"])

    def test_offline_reprocess_preserves_snapshot_hash_and_is_idempotent(self):
        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory)
            self.crawler(output, 1, FakeClient(self.pages())).run()
            snapshots = {path.name: path.read_bytes() for path in (output / "raw_html").iterdir()}
            hashes = {page["source_url"]: page["sha256"] for page in load_jsonl(output / "pages.jsonl")}
            self.assertEqual(reprocess_snapshots(output), 0)
            first = load_jsonl(output / "pages.jsonl")
            self.assertEqual(reprocess_snapshots(output), 0)
            second = load_jsonl(output / "pages.jsonl")
            self.assertEqual(first, second)
            self.assertEqual(snapshots, {path.name: path.read_bytes() for path in (output / "raw_html").iterdir()})
            self.assertEqual(hashes, {page["source_url"]: page["sha256"] for page in second})
            self.assertGreaterEqual(len(list((output / ".backups").iterdir())), 2)

    def test_transient_failures_are_bounded_and_permanent_failure_is_not_retried(self):
        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory)
            didm = "https://www.didm.in/"
            blog = "https://www.blog.didm.in/"
            transient = [FetchResult(didm, didm, 500, {}, b"", error="server error") for _ in range(3)]
            permanent = [FetchResult(blog, blog, 404, {}, b"", error="not found")]
            client = StatusClient({didm: transient, blog: permanent})
            self.crawler(output, 1, client).run()
            self.assertEqual(client.calls.count(didm), 3)
            self.assertEqual(client.calls.count(blog), 1)
            with (output / "url_inventory.csv").open() as handle:
                inventory = {row["url"]: row for row in __import__("csv").DictReader(handle)}
            self.assertEqual(inventory[didm]["failure_type"], "transient_exhausted")
            self.assertEqual(inventory[didm]["retry_count"], "3")
            self.assertEqual(inventory[blog]["failure_type"], "permanent")
            checkpoint = json.loads((output / "checkpoint.json").read_text())
            self.assertEqual(len(checkpoint["failure_history"]), 4)
            self.assertIn(didm.removeprefix("https://").rstrip("/"), checkpoint["stopped_host_state"])

    def test_stopped_host_resumes_only_after_fresh_robots_success_and_delay(self):
        def prepare(output, resume_after):
            (output / "raw_html").mkdir()
            (output / "url_inventory.csv").write_text(
                "url,status\nhttps://www.didm.in/course,queued\n")
            (output / "checkpoint.json").write_text(json.dumps({
                "visited": ["https://www.blog.didm.in/"], "queued": ["https://www.didm.in/course"],
                "page_counts": {}, "stopped_hosts": ["www.didm.in"],
                "stopped_host_state": {"www.didm.in": {
                    "resume_after": resume_after, "requires_fresh_robots_check": True}},
            }))

        past = "2000-01-01T00:00:00+00:00"
        future = "2999-01-01T00:00:00+00:00"
        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory)
            prepare(output, past)
            client = FakeClient(self.pages())
            crawler = self.crawler(output, 1, client)
            crawler.robots = FakeRobots(successful=False)
            crawler.run()
            self.assertEqual(client.calls, [])
            checkpoint = json.loads((output / "checkpoint.json").read_text())
            self.assertEqual(set(checkpoint["queued"]), {
                "https://www.didm.in/course", "https://www.didm.in/"})
            self.assertIn("www.didm.in", checkpoint["stopped_hosts"])
            with (output / "url_inventory.csv").open() as handle:
                inventory = {row["url"]: row for row in __import__("csv").DictReader(handle)}
            self.assertEqual(inventory["https://www.didm.in/course"]["status"], "queued")
            self.assertEqual(inventory["https://www.didm.in/course"]["robots_state"], "pending_robots_check")
        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory)
            prepare(output, future)
            client = FakeClient(self.pages())
            self.crawler(output, 1, client).run()
            self.assertEqual(client.calls, [])
        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory)
            prepare(output, past)
            client = FakeClient(self.pages())
            self.crawler(output, 1, client).run()
            self.assertEqual(client.calls, ["https://www.didm.in/"])

    def test_offline_validation_and_coverage_do_not_mutate_state(self):
        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory)
            self.crawler(output, 1, FakeClient(self.pages())).run()
            state_files = [output / "checkpoint.json", output / "url_inventory.csv"]
            before = {path.name: __import__("hashlib").sha256(path.read_bytes()).hexdigest() for path in state_files}
            self.assertEqual(validate_exports(output), 0)
            coverage_report(output)
            self.assertEqual(validate_exports(output), 0)
            coverage_report(output)
            after = {path.name: __import__("hashlib").sha256(path.read_bytes()).hexdigest() for path in state_files}
            self.assertEqual(before, after)

    def test_verified_backup_restore_preserves_pages_and_snapshots(self):
        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory)
            self.crawler(output, 1, FakeClient(self.pages())).run()
            pages_before = (output / "pages.jsonl").read_bytes()
            snapshots_before = {p.name: p.read_bytes() for p in (output / "raw_html").iterdir()}
            self.assertEqual(backup_output(output, "verified"), 0)
            backup = next((output / ".backups").glob("verified-*"))
            (output / "checkpoint.json").write_text(json.dumps({"visited": [], "queued": []}))
            (output / "url_inventory.csv").write_text("url,status\nhttps://www.didm.in/course,blocked\n")
            self.assertEqual(restore_state_from_backup(output, backup), 0)
            self.assertEqual((output / "pages.jsonl").read_bytes(), pages_before)
            self.assertEqual({p.name: p.read_bytes() for p in (output / "raw_html").iterdir()}, snapshots_before)
            restored = json.loads((output / "checkpoint.json").read_text())
            source = json.loads((backup / "checkpoint.json").read_text())
            self.assertEqual(restored, source)


if __name__ == "__main__":
    unittest.main()

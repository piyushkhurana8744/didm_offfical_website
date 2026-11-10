# DIDM crawler hardening report

**Date:** 4 November 2026  
**Scope:** Isolated read-only crawler under `tools/didm-crawler`  
**Network activity during hardening:** None

## Outcome

The existing crawler was hardened in place. It was not rewritten, and no live
crawl was launched. Fourteen offline regression tests pass. The two existing raw
HTML snapshots were reprocessed locally after backup; their bytes and SHA-256
hashes were preserved.

## Critical fixes

### Redirect handling

- Disabled automatic redirect following.
- Every redirect destination is checked before it is fetched.
- Checks cover approved hosts, private/state-changing paths, and the applicable
  host's loaded robots policy.
- The per-host delay is applied independently to every redirect hop.
- Blocked redirects are recorded with a reason and are not fetched.
- Redirect chains are limited to five hops.
- Robots-file redirects are restricted to the same host and `/robots.txt` path.

### Parser correctness

- Void elements no longer corrupt the element stack.
- Nested and malformed headings, paragraphs, lists, and tables retain text.
- Cleaned content is produced from an ordered text sequence rather than block
  close order.
- Script, style, template, noscript, and SVG bodies are excluded.
- Main content, original visible text, ordered structured blocks, and extraction
  confidence remain separate.
- A malformed production-style HTML fixture covers missing optional closing tags,
  nested inline elements, tables, void elements, site chrome, scripts, and styles.

### Offline snapshot reprocessing

`reprocess-snapshots`:

- reads only existing local snapshots;
- verifies stored SHA-256 values before making changes;
- preserves raw snapshot bytes and hashes;
- backs up generated exports under `crawler-output/.backups/`;
- atomically replaces structured page exports;
- regenerates quality, coverage, and validation reports;
- is idempotent for extracted page records.

### Retry and failure handling

- HTTP 408, 425, 429, 5xx, and transport failures are transient.
- Other HTTP failures are permanent unless explicitly classified otherwise.
- `Retry-After` seconds and HTTP-date values are respected.
- Retry count and next eligibility time persist in checkpoints.
- At most two retries are allowed after the initial request.
- Three consecutive transient server/throttling failures stop that host.
- Future-eligible retries remain queued rather than bypassing the wait.
- Failure history persists in the checkpoint and export.

### Export integrity

Validation now checks:

- JSONL, JSON, and CSV parseability and required structure;
- source URL uniqueness;
- raw snapshot existence and SHA-256 integrity;
- checkpoint/inventory and queued/visited consistency;
- captured-page presence in the visited set;
- incomplete SEO and extracted content;
- content-category coverage and migration readiness.

The current exports pass integrity validation with two non-fatal SEO warnings:
both captured pages lack Open Graph images and Twitter Card values.

## Current controlled-crawl coverage

- Discovered URLs: 68
- Crawled pages: 2
- Pending URLs: 65
- Robots-blocked records: 2
- Permanent failures: 1 (invalid/non-XML sitemap response)
- Transient failures: 1 (blog robots retrieval failure)
- Media references: 61
- Duplicate source URLs: 0
- Pagination URLs discovered/crawled: 3 / 0
- Extraction confidence: 2 medium-confidence pages

This is not a complete crawl. Blog, FAQ, legal, and testimonial page categories
are not represented in the captured two-page sample. The blog remains fail-closed
because its robots policy could not be retrieved.

## Offline verification

Fourteen tests pass, covering:

- same-host redirect delay and robots checks;
- blocked cross-host and robots-disallowed redirects;
- `Retry-After` parsing without automatic retry;
- transient retry exhaustion and permanent no-retry behavior;
- interruption, checkpoint recovery, and completed-page avoidance;
- page-limit queue retention and legacy queue reconstruction;
- malformed HTML, void elements, nesting, order, and script/style exclusion;
- snapshot hash preservation, backup creation, and idempotent reprocessing;
- URL canonicalization, tracking-parameter removal, and unsafe-path blocking;
- export validation.

All tests use fixtures, fakes, or mocked HTTP openers. No public host is contacted.

## Safe 25-page resume command

The limit is cumulative per host, so the main host will progress from two captured
pages up to at most 25 rather than adding 25 more:

```bash
cd /Users/piyushkhurana/didm_official_website/tools/didm-crawler

python3 crawler.py crawl \
  --live \
  --page-limit 25 \
  --delay 3 \
  --output ../../crawler-output
```

This command was documented but not executed.

## Remaining risks and limitations

- Source pages without semantic `main` or `article` containers require
  conservative heuristic extraction and remain marked medium confidence.
- JavaScript-rendered content is not executed or captured.
- FAQ and course-module detection produces review candidates, not asserted facts.
- The declared main-site sitemap returned HTML rather than valid XML.
- The blog cannot be crawled while its robots policy is unavailable.
- Media bodies are not downloaded, so dimensions, hashes, licenses, and binary
  integrity are not verified.
- The current sample is too small for migration approval; source-to-target mapping
  and human content verification remain necessary.

## Isolation confirmation

- No Next.js application source or configuration was changed by this work.
- No database exists or was written.
- No media binary was downloaded.
- No DIDM form, login, admin, private, or state-changing endpoint was used.
- Existing unrelated changes in `apps/web/package.json` and
  `apps/web/src/components/Navbar.tsx` were left untouched.


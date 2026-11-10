# DIDM 25-page crawl report

**Status:** Offline preflight complete; 25-page live crawl awaiting explicit owner approval  
**Date:** 4 November 2026  
**Live requests during this task:** None

## Preflight outcome

The crawler passed integrity checks after one critical stopped-host resume issue
was corrected. Fifteen offline regression tests now pass.

A stopped host can no longer remain permanently stranded or resume prematurely.
It is released only in a later run after:

1. a fresh successful retrieval of that host's robots policy; and
2. expiration of its persisted `resume_after`/retry delay.

Failed robots retrieval or a future retry timestamp keeps the host stopped. This
behavior is covered by an offline regression test.

## Backup

A complete timestamped backup was created at:

`crawler-output/.backups/preflight-25-page-20261104T133519106583Z`

It contains the checkpoint, exports, reports, and both raw snapshots, plus a
SHA-256 backup manifest. No existing snapshot was deleted or overwritten.

## Snapshot and checkpoint verification

- Existing HTML snapshots: 2
- Snapshot SHA-256 matches: 2/2
- Pending URLs: 65
- Visited URLs: 3
- Pending URLs absent from inventory: 0
- Pending/visited overlap: 0
- Currently stopped hosts: 0
- Active retry records: 0
- Export validation: passed
- Non-fatal SEO warnings: 2

Snapshot hashes:

- `https://www.didm.in/`: `dddca36074efc741538913e78c84e792d74ccb24451ba4ee809c0527b322bcc2`
- `https://www.didm.in/news-and-events`: `fd0711659fb73e9bfde4534b6e7b4b553234242b905a73900a6b56dc8fec9759`

## 1. Exact pages crawled per host

Current pre-crawl baseline:

- `www.didm.in`: 2
- `www.blog.didm.in`: 0

Captured pages:

- `https://www.didm.in/`
- `https://www.didm.in/news-and-events`

## 2. New pages captured

No new pages were captured during this task because live-crawl approval for the
25-page run has not yet been provided.

## 3. Remaining pending URLs

- 65 checkpointed URLs

All 65 are represented in the URL inventory and remain resumable.

## 4. Robots-blocked URLs

- 1 legacy blog URL-level block
- 1 separate blog robots-policy-unavailable record

Policy unavailability is no longer counted as an explicit robots denial. The blog
remains fail-closed and this preflight did not retry or bypass it.

## 5. Transient and permanent failures

- Transient failures: 1 — blog robots retrieval failure
- Permanent failures: 1 — declared sitemap returned HTML rather than XML

No retry was attempted during this offline preflight.

## 6. Content coverage

The following are category signals found within the two captured pages, not proof
that dedicated pages for those modules have been crawled:

- Course signal: 2 captured pages
- Centre signal: 2 captured pages
- Trainer signal: 1 captured page
- Placement signal: 1 captured page
- Blog signal: 0 captured pages

Dedicated course, centre, trainer, placement, testimonial, legal, and blog
coverage remains unverified until more pages are successfully captured.

## 7. Missing content categories

The current two-page sample has no captured-page classification for:

- Blog
- FAQ
- Legal
- Testimonial

## 8. SEO completeness

Both captured pages contain titles, descriptions, and canonical URLs. Both lack:

- Open Graph image
- Twitter Card value

These are warnings, not export-integrity failures.

## 9. Extraction confidence

- Medium confidence: 2 pages
- High confidence: 0 pages
- Low confidence: 0 pages

Both source documents lack a reliable semantic `main` or `article` container, so
the crawler conservatively excludes detected site chrome and flags the result for
review.

## 10. Recommended next phase

Await explicit owner approval. Once approved, run the documented controlled
resume command. After it completes, regenerate and review:

- coverage and migration-readiness reports;
- URL, course, and centre inventories;
- page content and extraction quality;
- SEO, media, redirect, and failure exports;
- exact per-host crawl counts and remaining queue state.

Do not begin database migration or CMS work until expanded coverage and human
content verification are complete.

## Approved command template — not executed

```bash
cd /Users/piyushkhurana/didm_official_website/tools/didm-crawler

python3 crawler.py crawl \
  --live \
  --page-limit 25 \
  --delay 3 \
  --output ../../crawler-output
```

This command requires explicit owner approval before execution.


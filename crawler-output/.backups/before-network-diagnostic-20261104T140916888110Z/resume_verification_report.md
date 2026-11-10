# DIDM crawler resume verification

Generated: 4 November 2026

## Root cause

Crawler version 1.0 removed every URL from the in-memory queue before checking
whether that URL's host had reached its page limit. URLs skipped because of the
limit were therefore discarded, and the final checkpoint incorrectly contained
an empty `queued` list.

## Remediation

- Page-limit and stopped-host entries remain pending instead of being consumed.
- The current in-flight URL is checkpointed before network I/O, so interruption
  during a request does not lose it.
- Resume reconstructs pending URLs from `url_inventory.csv` when an older
  checkpoint has an incomplete queue.
- URLs already recorded in `pages.jsonl` are added to the visited set and are not
  fetched again.
- Inventory records now distinguish discovered, queued, crawled, skipped,
  blocked, and failed states, with HTTP status stored separately.
- The legacy checkpoint was repaired offline without making network requests.

## Existing crawl repair result

- Previously queued: 0
- Reconstructed pending URLs: 65
- Visited URLs: 3
- Previously captured HTML pages: 2
- Existing per-host page count: `www.didm.in = 2`
- Blog host remains blocked because its robots policy was unavailable; no bypass
  was attempted.

## Offline verification

Eight tests pass, including:

- process interruption while a URL is in flight;
- resuming after interruption;
- retaining URLs when a per-host limit is reached;
- increasing the page limit and fetching only pending pages;
- avoiding repeat requests for completed pages;
- reconstructing a legacy empty queue from inventory;
- URL canonicalization and tracking-parameter deduplication;
- main-content, structured-content, and chrome-exclusion extraction.

## Remaining gaps

- Main-content selection is necessarily heuristic where source pages have no
  semantic `main` or `article` element. Such pages are marked medium confidence.
- JavaScript-only content is not rendered because the crawler intentionally does
  not use browser automation.
- FAQ and course-module identification is emitted only as review candidates.
- The source sitemap returned HTML rather than XML during the controlled crawl.
- The blog host remains excluded until its robots policy can be fetched normally.
- No media binary bodies are downloaded, so media integrity and dimensions are
  not yet verified.


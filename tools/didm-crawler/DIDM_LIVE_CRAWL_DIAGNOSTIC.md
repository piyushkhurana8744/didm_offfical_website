# DIDM live-crawl diagnostic

**Date:** 4 November 2026  
**Mode:** Offline forensic analysis  
**Live requests during diagnosis:** None

## Conclusion

A crawl-mode invocation was started against the correct output directory with a
25-page limit, but it captured no new pages because robots retrieval failed at
the transport layer. The historical crawler then incorrectly drained the queue
because it conflated unavailable robots policy with explicit robots denial. That
state-machine defect has already been repaired and the verified queue restored.

## Evidence timeline

Verified two-page baseline:

- Crawl start: `2026-11-04T12:45:50.795734+00:00`
- Page limit: 2 per host
- Captured pages: 2
- Pending URLs after recovery: 65

Failed 25-page invocation preserved in the forensic backup:

- Crawl start: `2026-11-04T13:41:25.650622+00:00`
- Page limit: 25 per host
- Methods: GET only
- Both robots failures recorded at approximately `13:41:26Z`
- `www.didm.in/robots.txt`: status `0`
- `www.blog.didm.in/robots.txt`: status `0`
- New page snapshots: 0
- `pages.jsonl` SHA-256 remained unchanged

## Diagnostic answers

### Was the live crawl command invoked?

Yes, crawl mode was invoked. The forensic `crawl_config.json` records a new
25-page run and timestamp. The artifacts do not identify the operator or exact
shell history, so attribution is not possible.

### Did robots retrieval fail?

Yes. Both host policies returned transport status `0` before any queued page was
successfully captured.

### Was network access unavailable?

Network access was unavailable to these requests at the crawler transport layer.
The older failure record did not preserve the underlying exception, so the
artifacts cannot distinguish DNS failure, sandbox denial, TLS failure, or another
transport cause. No more specific cause is asserted.

### Was the wrong output directory used?

No. The designated `crawler-output` state, configuration, failures, checkpoint,
and inventory were all changed by the invocation. The output directory was
correct.

### Did the crawler exit without processing the queue?

It processed queue state but captured no queued pages. The historical boolean
robots check treated policy unavailability as denial, marked 65 pending URLs
blocked/visited, and emptied the queue. The verified backup was subsequently used
to restore exactly those 65 URLs.

### Were offline reports responsible?

No. Coverage and validation reflected the already-corrupted checkpoint. Repeated
offline plan, validation, coverage, and priority-plan operations now leave
checkpoint and inventory hashes unchanged.

## Available logs

No standalone crawler log file exists. The available execution evidence is:

- `crawl_config.json`
- `checkpoint.json`
- `failed_urls.csv`
- `pages.jsonl`
- timestamped forensic and preflight backups

## Current repaired baseline

- Discovered: 68
- Captured: 2
- Pending: 65
- Duplicates: 0
- Stopped hosts: 0
- Active retries: 0
- Snapshot hashes valid: 2/2

No new live crawl was run during this diagnostic.


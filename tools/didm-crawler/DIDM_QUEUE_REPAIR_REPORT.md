a# DIDM queue repair report

**Date:** 4 November 2026  
**Network requests:** None

## Evidence preservation

The broken state was preserved before code or state repair at:

`crawler-output/.backups/forensic-queue-regression-20261104T134322236654Z`

The explicit restore operation created another automatic pre-restore backup at:

`crawler-output/.backups/pre-state-restore-20261104T134653545674Z`

The original verified baseline remains untouched at:

`crawler-output/.backups/preflight-25-page-20261104T133519106583Z`

## Repair method

The new explicit `restore-state` command:

1. accepts only a direct child of `crawler-output/.backups`;
2. verifies the backup contains required state and page evidence;
3. verifies current and backup raw snapshot hashes match;
4. creates a new pre-restore backup;
5. atomically restores checkpoint, inventory, failures, crawl configuration, and
   crawl summary;
6. does not replace `pages.jsonl` or any raw snapshot;
7. writes `queue_restore_audit.json`.

Only URLs proven pending by the verified checkpoint were restored. No blanket
blocked-to-queued conversion was performed.

## Before and after

| Metric | Broken forensic state | Repaired state |
|---|---:|---:|
| Captured pages | 2 | 2 |
| Pending URLs | 0 | 65 |
| Visited URLs | 68 | 3 |
| Inventory blocked | 66 | 1 legacy blog record |
| Inventory discovered/pending | 0 | 65 |
| Duplicate source URLs | 0 | 0 |
| Raw snapshot hash matches | 2/2 | 2/2 |

## Robots state-machine repair

The crawler now distinguishes:

- `robots_allowed`
- `robots_disallowed`
- `robots_unavailable`
- `host_temporarily_stopped` through persisted stopped-host state
- `pending_robots_check`

When robots retrieval is unavailable, eligible URLs remain queued and no page
request occurs. A later run may release the host only after a fresh successful
robots retrieval and the persisted delay.

## Regression verification

Seventeen offline tests pass, including new checks that:

- validation does not mutate checkpoint or inventory;
- coverage generation does not mutate checkpoint or inventory;
- repeated offline inspection preserves identical state hashes;
- robots unavailability preserves pending URLs;
- a temporarily stopped host retains its queue;
- restart requires fresh robots success and elapsed delay;
- verified backup restore preserves pages and raw snapshots.

## Final integrity result

- Captured pages: 2
- Correctly pending URLs: 65
- Current robots-blocked URLs: 1 legacy blog URL
- Robots-policy unavailable records: 1 blog robots retrieval
- Duplicate source URLs: 0
- Snapshot hashes: unchanged and valid
- Export validation: passed with two existing SEO warnings
- Live crawl executed during repair: no

The 25-page crawl remains unexecuted and requires explicit owner approval.


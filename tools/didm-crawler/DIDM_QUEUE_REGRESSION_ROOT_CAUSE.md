# DIDM queue regression root-cause analysis

**Date:** 4 November 2026  
**Investigation mode:** Offline; no network requests

## Finding

The corruption was caused by a crawl-mode invocation entering `Crawler.run()`,
not by validation or coverage generation.

The broken backup contains `crawl_config.json` with:

- `page_limit_per_host: 25`
- `started_or_resumed_at: 2026-11-04T13:41:25.650622+00:00`

Immediately afterward, failure history records both robots requests at
approximately `13:41:26Z` with status `0`. The crawler's former boolean robots
API returned `False` for both an explicit robots denial and an unavailable policy.
The page loop interpreted that `False` as `blocked_by_robots`, moved each of the
65 pending URLs into visited, and emptied the queue.

No successful new page capture occurred. `pages.jsonl`, `seo_metadata.csv`, and
both raw snapshots remained byte-identical to the verified preflight backup.

The available artifacts prove that crawl mode ran; they do not identify which
person or external process invoked the command, so this report does not attribute
the invocation.

## Exact defective transition

Former behavior:

```text
robots retrieval status 0
    -> fail-closed parser
    -> allowed(url) == False
    -> URL status = blocked
    -> URL added to visited
    -> URL removed from queue
```

Correct behavior:

```text
robots retrieval unavailable
    -> host state = robots_unavailable / temporarily stopped
    -> URL state = pending_robots_check
    -> URL remains queued
    -> no page request
    -> next run requires fresh successful robots retrieval and elapsed delay
```

## Evidence comparison

| File | Verified preflight SHA-256 | Broken-state SHA-256 | Finding |
|---|---|---|---|
| `checkpoint.json` | `228676a09f9cedb0b16d5b4a6a32bb1128f979d186bcbdab03f04c0c9605cbf3` | `578a3b3dec4de3887c0e5407ff60c3c786c924e31c72a33ad03016a126a5816d` | Queue drained; 65 URLs moved to visited |
| `url_inventory.csv` | `87183411d01b6c145b2960ee255b6240829ecf989ce514fba338136688a03fa0` | `1a50222983103ed9ca76309e51139c8f42b69341698a4f3b1d26176cda9cba99` | 65 discovered records changed to blocked |
| `failed_urls.csv` | `dd61bf586232b7c261e9a9a90ce2f397e92ca02e5da92c20062155a6d50ea758` | `a6165d7a57824f846208817cccd5cf68f6a52f24b1e5440201ead58a6b70078c` | 65 false URL-level robots failures added |
| `crawl_coverage_report.md` | `3645a95d501fb0028ee83a478e969a95d68977513d1d81c3f4eb7b84ed85ca1a` | `3abea7bcdc2e3ff10cbee8fed6aecacb64794182baa2a69f28829d0f154bf115` | Reflected corrupted state; did not create it |
| `validation_report.json` | `a74e0be2f44c88df8a496e32d6a25b772cbe29e06ada77bd2f2ef123e9f09a76` | `edd1577169bc2ce012ea44c338a4ad1e175c4bdc74108e3bfdf4d885ed6ed866` | Reflected zero pending; did not mutate queue |
| `pages.jsonl` | `d1c7609d972af7fd76c1dc06ce51b5bdec306b8b1c0053505cf51782be7ce115` | Same | No page capture/change |
| `seo_metadata.csv` | `5044e134be8b7a223c77c43e4e6cd626a0e96b848b07ba79e6451acff759818e` | Same | Unchanged |

## Offline immutability verification

On the repaired real output, repeated `plan`, `validate`, and coverage operations
left these state hashes unchanged:

- `checkpoint.json`: `228676a09f9cedb0b16d5b4a6a32bb1128f979d186bcbdab03f04c0c9605cbf3`
- `url_inventory.csv`: `87183411d01b6c145b2960ee255b6240829ecf989ce514fba338136688a03fa0`

Validation and coverage write only their designated report files.


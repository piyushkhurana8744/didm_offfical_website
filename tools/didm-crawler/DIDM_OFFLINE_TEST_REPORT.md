# DIDM offline test report

**Date:** 4 November 2026  
**Result:** 23 tests passed  
**Network access:** None

## Priority scheduling regressions

- Priority order is deterministic regardless of input order.
- Every unique pending URL is preserved.
- Courses precede centres, people/proof, legal, other, news, and blog.
- News URLs cannot consume a mixed initial window.
- Prioritized checkpoint/resume fetches the course first, then the centre, while
  retaining news for the next batch.
- Already captured pages are not fetched again.

## Safety and state regressions

- Robots-unavailable hosts remain fail-closed.
- Robots failure preserves pending URLs and marks them pending policy check.
- Temporarily stopped hosts require fresh successful robots retrieval and elapsed
  retry delay.
- Queue survives interruption and page limits.
- Validation, coverage, and priority planning do not mutate crawler state.
- Verified backup restoration preserves pages and snapshots.
- Redirect destinations are checked before fetch and delayed per host.
- Transient retries are bounded and `Retry-After` is respected.
- DNS, TLS/certificate, timeout, refused-connection, network-policy, and
  unexpected transport errors are classified without retaining raw messages.
- Network diagnostics issue at most one robots request per approved host.
- Offline and mocked-live diagnostics leave checkpoint, inventory, captured
  pages, and raw snapshots byte-for-byte unchanged.

## Extraction and integrity regressions

- Void and malformed HTML handling
- Nested text order
- Script/style exclusion
- Structured extraction
- Snapshot reprocessing and hash preservation
- URL canonicalization and unsafe-path blocking
- Export validation

The test command was:

```bash
PYTHONDONTWRITEBYTECODE=1 python3 -m unittest discover -s tests -v
```


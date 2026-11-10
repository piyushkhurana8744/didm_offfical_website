# DIDM network diagnostic and live-crawl readiness

**Date:** 4 November 2026  
**Status:** Offline hardening complete; no live diagnostic or crawl executed

## Finding

The earlier robots requests were recorded as transport status `0`, but the old
records did not retain a sufficiently specific exception category. Therefore,
the historical failure cannot be attributed conclusively to DNS, TLS, timeout,
connection refusal, or a network policy from existing evidence alone.

The current execution environment provides these verifiable signals:

- it identifies itself through `CODEX_*` environment-variable names;
- `CODEX_SANDBOX_NETWORK_DISABLED` is present;
- stdin and stdout are not terminals;
- the runtime is macOS/Python 3.13.5;
- no standard proxy environment-variable names are present;
- neither `/.dockerenv` nor container markers in `/proc/1/cgroup` were found.

Values of environment variables were deliberately not recorded. These facts
support a restricted Codex execution context, but do not prove the precise cause
of the earlier transport error. Running from a developer terminal with approved
network access may remove this particular sandbox restriction; it is not a
guarantee because local DNS, TLS, firewall, or remote-host conditions may still
fail.

## Diagnostic implementation

Transport failures are now reported as one of:

- `dns_resolution_failure`
- `tls_certificate_failure`
- `connection_timeout`
- `connection_refused`
- `network_restriction`
- `http_response_failure`
- `unexpected_transport_exception`

Records contain the sanitized exception type, request stage, host, UTC
timestamp, generic detail, and an actionable next step. Raw exception messages,
credentials, cookies, tokens, sensitive headers, and response bodies are not
written by the diagnostic command.

The command remains fail-closed. It performs no request without `--live`; with
`--live`, it performs at most one unauthenticated GET to each approved host's
`robots.txt`, sequentially, and refuses all redirects. It does not modify crawl
state. A failed robots retrieval does not become a robots denial and does not
remove pending URLs.

## Verification evidence

All 23 offline tests passed. The suite covers transport classification,
diagnostic immutability, redirect safety, retry bounds, fresh robots checks,
queue preservation, deterministic scheduling, extraction, and export integrity.

The real output passed export validation with no errors and two expected SEO
warnings for missing `og_image` and `twitter_card` on the two captured pages.
The restored queue remains 65 URLs. The offline diagnostic reported
`approval_required_no_network_attempted` and `protected_state_unchanged: true`.

Protected hashes before and after the offline diagnostic were identical:

| Artifact | SHA-256 |
|---|---|
| `checkpoint.json` | `228676a09f9cedb0b16d5b4a6a32bb1128f979d186bcbdab03f04c0c9605cbf3` |
| `url_inventory.csv` | `87183411d01b6c145b2960ee255b6240829ecf989ce514fba338136688a03fa0` |
| `pages.jsonl` | `d1c7609d972af7fd76c1dc06ce51b5bdec306b8b1c0053505cf51782be7ce115` |
| Homepage snapshot | `dddca36074efc741538913e78c84e792d74ccb24451ba4ee809c0527b322bcc2` |
| News snapshot | `fd0711659fb73e9bfde4534b6e7b4b553234242b905a73900a6b56dc8fec9759` |

## Commands requiring explicit approval

Run the isolated network diagnostic first, from `tools/didm-crawler`, only after
the owner approves network access:

```bash
python3 crawler.py diagnose-network --live --output ../../crawler-output
```

If the diagnostic succeeds, the robots policies are reviewable, hashes remain
unchanged, and the owner separately approves the batch, the exact crawl command
is:

```bash
python3 crawler.py crawl \
  --live \
  --page-limit 25 \
  --delay 3 \
  --output ../../crawler-output
```

## Post-crawl verification checklist

1. Confirm the command exited normally and review host-stop/retry records.
2. Run `python3 crawler.py validate --output ../../crawler-output` offline.
3. Verify every page record references an existing snapshot with matching
   SHA-256.
4. Confirm previously captured snapshot hashes are unchanged.
5. Reconcile checkpoint queued/visited state against `url_inventory.csv`.
6. Confirm robots-unavailable hosts retained pending URLs and were not marked
   robots-disallowed.
7. Confirm no unapproved host, private path, redirect destination, or media body
   was fetched.
8. Review redirects, failures, SEO warnings, extraction confidence, and coverage
   reports before approving another batch.
9. Create a new timestamped backup; do not overwrite existing backups.

## Remaining limitations

- No approved live diagnostic has yet identified the actual transport layer
  failure.
- A robots redirect is intentionally not followed by diagnostics and requires
  review; normal crawling still checks every redirect destination against host,
  private-path, delay, and robots rules.
- Coverage remains incomplete: two pages are captured and 65 URLs are pending.
- Successful connectivity does not establish content completeness or migration
  readiness.

The Next.js application, database, existing snapshots, captured records, queue,
and backups were not modified by this work. No live request was made.

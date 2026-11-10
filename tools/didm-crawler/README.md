# DIDM read-only crawler

An isolated, resumable crawler for `www.didm.in` and `www.blog.didm.in`.
It uses Python's standard library and does not depend on, import, or modify the
Next.js application.

## Safety defaults

- Network access is disabled unless `--live` is supplied.
- Only `GET` is supported.
- Only the two configured public hosts are allowed.
- `robots.txt` is fetched and enforced independently for each host.
- Requests are sequential, enforcing at most one active request per host.
- A minimum three-second delay is enforced between requests to the same host.
- The default and maximum page budget is 25 HTML pages per host.
- Media URLs are recorded but media bodies are never downloaded.
- Authentication, forms, private/admin routes, CAPTCHA handling, proxies, and
  browser automation are not implemented.
- A host is stopped after three consecutive HTTP 429 or 5xx responses.
- Redirects are followed explicitly, with allowlist, private-path, and robots
  checks plus per-host delay enforcement before every hop.
- Transient failures have bounded retries, persistent eligibility timestamps,
  and `Retry-After` enforcement.
- Robots state distinguishes allowed, explicitly disallowed, temporarily
  unavailable, host-stopped, and pending-fresh-check conditions. Policy
  unavailability preserves the queue and never becomes a URL-level denial.

## Offline verification

From this directory:

```bash
python3 -m unittest discover -s tests -v
python3 crawler.py validate --output ./test-output
```

The tests use local fixtures and a local mock HTTP server. They do not contact
either source website.

## Inspect the proposed live plan (no network)

```bash
python3 crawler.py plan
```

## Isolated network diagnostic

The offline form records environment facts and protected-state hashes without
making any request:

```bash
python3 crawler.py diagnose-network --output ../../crawler-output
```

After explicit owner approval and network permission, the live form makes one
unauthenticated `GET` request to each approved host's `robots.txt`. It does not
follow redirects or persist response bodies, headers, cookies, or credentials:

```bash
python3 crawler.py diagnose-network --live --output ../../crawler-output
```

Both forms write `network_diagnostic_report.json`. Neither changes checkpoint,
inventory, captured pages, or raw snapshots.

## Limited live test crawl (run only after approval)

The safest first live run is two pages per host:

```bash
python3 crawler.py crawl \
  --live \
  --page-limit 2 \
  --delay 3 \
  --output ../../crawler-output
```

For a later approved 25-page-per-host crawl:

```bash
python3 crawler.py crawl \
  --live \
  --page-limit 25 \
  --delay 3 \
  --output ../../crawler-output
```

Re-running the same command resumes from `checkpoint.json`. Use a different
output directory for a clean crawl. The crawler never deletes an existing
output directory.

If an output was produced by crawler version 1.0, reconstruct its lost pending
queue offline before resuming:

```bash
python3 crawler.py repair-resume --output ../../crawler-output
```

Generate a before/after extraction report from existing raw snapshots without
network access:

```bash
python3 crawler.py compare-extraction --output ../../crawler-output
```

Re-extract every existing raw snapshot offline, preserving snapshot bytes and
hashes and backing up replaced generated exports:

```bash
python3 crawler.py reprocess-snapshots --output ../../crawler-output
```

Create a complete timestamped backup of checkpoints, exports, reports, and raw
snapshots without overwriting prior backups:

```bash
python3 crawler.py backup-output --output ../../crawler-output --label preflight
```

Restore queue/inventory state only from a verified direct child of the output
backup directory. This command makes its own pre-restore backup, verifies current
and backup snapshot hashes, and never replaces raw snapshots or page records:

```bash
python3 crawler.py restore-state \
  --output ../../crawler-output \
  --backup ../../crawler-output/.backups/<verified-backup>
```

Inspect the deterministic next-batch order without changing crawler state:

```bash
python3 crawler.py priority-plan --output ../../crawler-output --page-limit 25
```

The scheduler orders every pending URL as courses/syllabuses, centres,
trainers/placements, testimonials/certifications, legal, other institutional
content, news/events, then blog. It never relaxes robots, retry, delay, host, or
page-limit controls.

## Exports

The requested exports are written to the selected output directory, along with
`raw_html/`, `checkpoint.json`, and `crawl_config.json` for reproducibility.
`crawl_coverage_report.md` and `validation_report.json` report current coverage,
integrity findings, and migration readiness without asserting a complete crawl.


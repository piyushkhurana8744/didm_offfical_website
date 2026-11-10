# DIDM media importer

The importer discovers image references from the existing crawler artifacts and
creates a deterministic inventory without contacting any website:

```bash
python3 tools/didm-media-import/media_import.py --dry-run
```

Dry-run is also the default. It writes `dry-run-inventory.csv` and
`dry-run-summary.json` beside the script.

Plan a representative batch from the preserved inventory without repeating
discovery or making a network request:

```bash
python3 tools/didm-media-import/media_import.py --plan --scope pilot --batch-size 12
```

Live downloading is deliberately double-gated and must not be run until the
inventory has been reviewed and explicit authorization has been given:

```bash
python3 tools/didm-media-import/media_import.py \
  --download \
  --scope pilot \
  --batch-size 12 \
  --authorization-ack I_APPROVE_PUBLIC_DIDM_MEDIA_DOWNLOADS \
  --rights-ack I_CONFIRM_DIDM_REUSE_AUTHORIZATION
```

Both acknowledgements are mandatory. The first confirms the network run; the
second confirms that the user has reuse authorization. Public visibility alone
is never recorded as proof of reuse rights.

After reviewing a successful pilot, resumable batches can use `--scope remaining`
with a batch size from 1 to 100. Live runs read the preserved CSV rather than
repeating discovery. Only `didm.in` and `www.didm.in` are fetchable; blog and all
third-party hosts are excluded.

Pilot runs are additionally locked to the 12 unique URLs persisted in
`staged-import-plan.json`. On resume, verified completed files are skipped and no
replacement URL can enter that approved pilot set.

Downloads are GET-only, sequential per host, delayed by at least three seconds,
TLS-verified, limited to public IP destinations, and checked against robots.txt
before the initial request and every redirect hop. Responses are capped at 25
MiB, declared MIME must match the detected signature, raster files must decode
with Pillow, and SVGs must be valid static XML without active/external content.
Resume entries are skipped only when the file exists and its size, SHA-256, MIME,
signature, and decoding all verify. Each live run writes downloaded, skipped,
failed, blocked, and invalid-resume totals to `last-run-report.json`.

robots.txt redirects use the same controlled HTTPS, allowlist, public-IP,
per-host throttle, and finite-hop checks as media redirects. The final policy
response must be UTF-8 `text/plain` and cannot be HTML. Unavailable or unresolved
policy still fails closed, and media inventory URLs are never substituted.

Install the decoding dependency when needed with
`python3 -m pip install -r tools/didm-media-import/requirements.txt`.

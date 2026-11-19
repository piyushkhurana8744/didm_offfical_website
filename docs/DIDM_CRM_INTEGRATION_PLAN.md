# CRM integration and admission funnel

Assessment: 17 November 2026, Asia/Kolkata. This report distinguishes implemented code, verified behavior and work still required. No production deployment or database migration performed.

## Actual existing workflow
Public form → POST /api/enquire → Zod validation → recent lead count (5 per IP hash / 15 min) → createWebsiteLead → MongoDB transaction creating Lead + LeadActivity. Existing `leadSource: website_enquiry`, role permissions, assignment/status model and transaction boundaries remain. No external CRM transport or duplicate CRM was added.

## Implemented improvements
- Malformed/invalid input returns 400 before a database query; oversized payload returns 413; database failure returns 503 with human contact, throttling returns 429 with Retry-After.
- Main form never treats success:false as registration. Success requires an actual returned enquiry ID. Failure retains values with retry/call/WhatsApp choices. No synthetic reference ID or implied seat reservation.
- Main form collects explicit contact consent, associated labels, input autocomplete/length bounds and error descriptions. Honeypot field is accepted only when empty. Existing other forms stay compatible because added fields are optional.
- Allowlists bounded utm_source/medium/campaign/term/content and form type; persists them in the existing attribution Mixed field, preserving sourceUrl, preferredBatch, consent and ipHash. Main/shared/homepage forms use a common extractor.
- Batch/program/finder links preserve course/centre IDs and timing preference. Choosing a timing is a preference, not a promised class timetable.

## Known limitations and deployment prerequisites
The existing count-then-write limiter is not atomic; forwarded IP needs a trusted proxy configuration. No new unique index or migration was authorised, so database-level idempotency remains future work. Buttons prevent ordinary repeated submissions, but timeout-after-commit requires support investigation before retry; do not add automatic retries blindly. Lead assignment notifications, duplicate handling and CRM delivery need isolated end-to-end tests. No real lead created by browser QA: successful and failed responses were intercepted; invalid API inputs were tested against the application.

Brochure release remains an approved-content workflow to implement against confirmed lead creation; no fake download response was added. Verify retention/deletion policies, access logs, anti-abuse rules and all inline form variants before launch.



## Observed database access blocker

The local production runtime returned a MongoDB authorisation error on a read of `didm_cms.pages` (`find` permission denied). The public homepage used its static fallback; no credentials, roles or database grants were changed. The batch source also correctly showed its admissions fallback. Published-content and real lead persistence cannot be signed off with the current database access. Correct grants must be supplied by the database owner and verified in an isolated test environment.

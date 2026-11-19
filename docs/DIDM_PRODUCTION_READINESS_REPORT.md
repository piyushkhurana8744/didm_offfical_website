# Phase 2 — current evidence

Assessment: 17 November 2026 (Asia/Kolkata). Local implementation only. No deployment, migration or authenticated database mutation.

## Current decision
**NOT PRODUCTION-READY.** Local visual and functional defects were repaired and verified, but external security, data, integration and release gates remain. This is the authoritative current classification; the earlier checklist is preserved below for traceability.

## Classified launch gates

| ID | Category | Priority | Status | Required action | Owner / dependency | Evidence |
|---|---|---|---|---|---|---|
| S1 | Security | P0 | OPEN — external | Revoke/rotate the previously exposed database credential; review access/history. | Credential owner | Redaction in phase one does not prove revocation; no rotation performed. |
| I1 | Integration | P0 | OPEN — external | Supply correct least-privilege CMS database grants and an isolated test database. | Database owner | Phase-two runtime again denied find on didm_cms.pages; no grants or credentials changed. |
| I2 | Integration | P0 | OPEN — staging | Verify real lead persistence, duplicate/retry behavior, assignment, homepage revision/publish/restore and batch publishing. | Backend/staging owner | Mocks verify public UI/contract only; no valid production lead or authenticated mutation executed. |
| D1 | Data/content | P0 | OPEN — approval | Approve fees, duration, offers, certifications, awards, partners, statistics, faculty, source records and student consent. | DIDM editorial/business owners | Story publication matched; unsupported story salaries and card scores removed. Broader inherited claims remain unapproved. |
| D2 | Data/content | P1 | OPEN — approval | Reconcile centre roster (including Varanasi), contact data, actual branch photos and current future schedules. | Admissions/branch owners | Expired repeated schedules removed; empty authoritative source does not establish availability. |
| F1 | Functional | P1 | OPEN — code + staging | Complete required generic CMS editors in the existing panel. | CMS product/engineering | Foundation modules remain; private workflow expansion is not claimed. |
| F2 | Functional | P1 | PARTIAL | Implement approved lead-to-brochure fulfilment and source-correct standalone module pages. | Admissions/content + engineering | Two broken brochure buttons now reach real brochure-request intake. Automatic asset delivery and module route content remain pending. |
| U1 | UX | P2 | PARTIAL | Converge bespoke course bodies, comparison facts and remaining large archival/legacy sections after content approval. | Design/content | Public shell, heroes, navigation and institutional disclosure improved; every historic section was not rewritten. |
| A1 | Accessibility | P1 | OPEN — manual/staging | Complete manual WCAG 2.2 AA contrast, screen-reader, zoom, touch and all advanced dialog states; review loaded external player. | Accessibility owner | Zero axe violations in 51 initial-state scans is bounded evidence; YouTube internals are externally controlled. |
| P1 | Performance | P1 | OPEN — field/staging | Verify real-device/network loading, field LCP/CLS/INP, image/font caching and budgets with functioning approved data. | Performance/deployment owner | Build bundle and local lab samples are separate. External Google font import and archive payloads remain optimisation debt. |
| S2 | Security | P1 | OPEN — deployment/staging | Confirm trusted forwarded-IP proxy, rate-limit behavior, retention/deletion policies and production security configuration. | Security/deployment owner | Existing enquiry count-then-write limiter/permissions retained; no unverified infrastructure changes. |
| F3 | Functional | P2 | LOCAL BLOCKER FIXED; debt open | Maintain a working noninteractive lint pipeline and clean inherited warnings incrementally. | Engineering | ESLint is installed/configured; zero errors, legacy warnings retained rather than hidden as clean source. |
| X1 | Deployment | P0 | NOT PERFORMED | Complete authorised staging/deployment, backup/rollback, smoke tests and monitoring sign-off. | Release owner | User explicitly prohibited deployment and production writes; no hosting was created or published. |
## Verified local closures
The scrolled mobile/tablet navigation drawer also now occupies the available viewport, verified at 768px and 390px with focus restoration and geometry assertions. This closes the observed 33px-height defect, not the separate manual assistive-device approval gate.

Expired branch batch tables, unlabelled controls, invisible dark-panel copy, nonfunctional reveal behavior, course load scroll jump, unscoped curriculum arrow handling, missing source-attributed story destinations, broken brochure/news links, two broken media artifacts and noninteractive lint setup were addressed. Details and before/after evidence are in the Phase 2 report. Existing APIs, CMS auth, model/repository code and grounded counsellor server files remained byte-identical to the baseline; a unit guard checks those boundaries.

## Approval rules
Do not interpret source publication as editorial approval. Do not interpret a successful UI mock as persisted CRM delivery. Do not interpret a build or local lab sample as field performance. Do not run production writes to obtain a passing report. No Sarvam provider/model/prompt/endpoint/configuration/voice change was made. The local counsellor launcher received only an accessible-name correction.


<!-- END_PHASE_2 -->

## Historical phase-one report (retained)

# Production readiness and acceptance checklist

Assessment: 17 November 2026, Asia/Kolkata. This report distinguishes implemented code, verified behavior and work still required. No production deployment or database migration performed.

## Decision
NOT ready for an unqualified production sign-off. This increment improves real student journeys and fixes confirmed bugs, but the full requested transformation is not complete. Preserve existing working tree and integrations. No deployment performed.

## Delivered implementation
Homepage uses existing studio in an improved composition and reads published CMS heading/media. Added explained course matching, six career learning paths, local quiz and campaign simulator; connected learning exercises and real copyable prompts. Replaced invented public schedule with a source-attributed CMS draft/publish schedule and filters. Fixed enquiry false-success states, validation and campaign/form attribution. Added skip link, admin noindex, discovery metadata/sitemap, core course redirects, and single robots route. Removed database credential from example configuration without changing runtime secrets.

## Acceptance checklist
- [x] Architecture and all source families inventoried; code evidence and limits documented.
- [x] Four required reference pages plus 100 live URLs captured; homepage desktop/tablet/mobile screenshots.
- [x] Existing course IDs, lead workflow, authentication, permissions and assets preserved.
- [x] New optional student tools implemented without provider substitution.
- [x] Enquiry success reflects a confirmed response; failure preserves inputs.
- [x] Batches use the existing CMS rather than invented schedules or a second backend.
- [x] Production build and targeted unit/browser checks recorded in test report.
- [ ] Rotate/revoke the exposed database credential externally and review repository history/access. Redaction cannot invalidate a leaked credential.
- [ ] Run authenticated draft/publish/revision/lead/assignment regression in a distinct test-named database.
- [ ] Obtain approved fees, centre roster (including Varanasi), certification/award/partner evidence, student consent and verified placement records.
- [ ] Review inherited unsupported claims in SITE_DATA, lib/content, counsellor policies, page copy and structured data.
- [ ] Replace remaining admin foundation modules with validated editors in the existing panel.
- [ ] Finish brochure download-to-lead path, standalone module routes and source-correct local schedules.
- [ ] Complete full WCAG 2.2 AA assistive technology/contrast audit, schema validation and internal-link crawl.
- [ ] Measure production Core Web Vitals, media sizing/caching and bundle budgets on realistic devices/network.
- [ ] Repair lint tooling: current script uses deprecated `next lint`; it opens an interactive configuration prompt because no ESLint config/dependency is present.

## Rollback and release
Review only this increment against the pre-existing dirty workspace. Revert individual changed hunks/new files; never reset/clean the repository. Public batch schedules can be replaced by publishing a corrected saved draft. Prior homepage revisions remain restorable using the existing CMS. No destructive migrations, new indices or production record edits were executed. Release should follow isolated integration checks and editorial approvals.



## Observed database access blocker

The local production runtime returned a MongoDB authorisation error on a read of `didm_cms.pages` (`find` permission denied). The public homepage used its static fallback; no credentials, roles or database grants were changed. The batch source also correctly showed its admissions fallback. Published-content and real lead persistence cannot be signed off with the current database access. Correct grants must be supplied by the database owner and verified in an isolated test environment.

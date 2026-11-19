# DIDM final browser QA

Date: November 13, 2026. Target: local production build at `http://localhost:3005`. Browser: installed Google Chrome through Playwright. No deployment, production database writes or real lead submissions.

## Verified outcomes

- `pnpm --filter web exec next build`: passed, including compilation, type validation and 1,094 generated static pages. This is build coverage; it does not mean every generated article was manually reviewed.
- `pnpm --filter web typecheck`: passed.
- Scoped whitespace checks for the changed implementation: passed. Unrelated pre-existing whitespace in the old cinematic report and motion tokens was preserved.
- 34 representative public routes: HTTP 200, exactly one H1, no page errors or mobile horizontal overflow.
- 762 rendered image instances across those routes: no broken images after actual page traversal/loading. This count includes repeated logos and other shared images.
- All 14 centre routes: HTTP 200 with a centre heading. Representative branch screenshots and galleries are in the page-family evidence.
- 5 detail/legacy-route checks: HTTP 200 after navigation/redirects.
- Metadata and canonical tags checked for all 34 routes. Missing family metadata was added; existing source-backed legacy canonical URLs remain preserved.
- Master explorer: all 52 entries rendered; selecting the final entry displays “Assignment Session”. Existing roadmap and curriculum datasets were retained.
- Six program discovery links resolve to six distinct real program routes. The DMI enquiry link preselects `dmi`.
- Hero format controls and replay work. Entrance/creation/settled frames differ visibly.
- Campaign story advances through all five scenes, reverses through campaign to idea, and keeps the desktop visual stage in the viewport.
- Mobile story: all five scenes advance at 390 × 844. Reduced-motion mode stays unpinned and supports manual chapter controls.
- Additional homepage layouts checked at 320 × 700, 768 × 1024 and 1920 × 1080. Mobile navigation opens and closes with Escape.
- Online learning workspace switches to the practice view. Original student quotation controls change the displayed quote.
- With JavaScript disabled, the hero, six program links and narrative fallback remain visible.

## Form verification

15 form submissions were intercepted inside Playwright and answered with a deliberate HTTP 503 test response. Every request contained a valid name, phone, explicit consent and source URL. Every tested form kept the form available and displayed the failure. Invalid payloads: 0. Production writes: 0.

Coverage: homepage, About, Contact, Media, Advanced (two forms), Online, Outcomes (two forms), Rajouri Garden (three forms), Why Choose DIDM, Corporate and College enquiry forms. The unchanged MongoDB transaction remains the live persistence mechanism; it was not exercised with a production test lead. Optional institutional organisation/message fields now reach the existing CRM activity record.

Career enquiries prepare an email and explicitly explain that the visitor must send it. They do not report a fabricated application receipt.

## Image repair

The batch gallery now uses its existing local asset manifest. All 169 original college seminar photographs were downloaded unchanged and mapped to local assets, eliminating live-source gallery fetch timeouts. Import results: `audit_screenshots/creative/college-asset-import.json`.

## Evidence and reproduction

| Check | Script / evidence |
|---|---|
| Before screenshots | `scripts/creative-baseline.cjs`, `audit_screenshots/creative/before/` |
| Static composition | `scripts/creative-preview.cjs`, `audit_screenshots/creative/static/` |
| Hero and story | `scripts/creative-story-qa.cjs`, `audit_screenshots/creative/after/story-results.json` |
| Route/image/form matrix | `scripts/creative-site-qa.cjs`, `audit_screenshots/creative/families/results.json`, `form-results.json` |
| Metadata, centres, redirects, extra viewports | `scripts/creative-final-check.cjs`, `audit_screenshots/creative/families/final-checks.json` |
| Local metrics and progressive enhancement | `scripts/creative-performance-qa.cjs`, `audit_screenshots/creative/after/performance-results.json` |
| Browser recordings | `audit_screenshots/creative/after/recordings/`, `audit_screenshots/creative/families/recordings/` |

The scripts use the existing installed Playwright package and Chrome; no browser package was installed. Use a running local production preview for final QA. Start it with `pnpm --filter web start --port 3005` after building. Development is available through `pnpm --filter web dev --port 3005`.

## Verification limits

Chrome desktop/mobile emulation was checked; physical devices, Safari and Firefox were not tested. No production CRM delivery, external email sending, authentication mutation, CMS publishing or deployment was performed. The local performance figures do not establish production performance. Some original portraits remain limited by source resolution. The owner’s approval of the new creative direction remains a review decision.

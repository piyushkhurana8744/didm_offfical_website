# Phase 2 — current evidence

Assessment: 17 November 2026 (Asia/Kolkata). Local implementation only. No deployment, migration or authenticated database mutation.

## Fresh phase-two results
- Build/typecheck passed. Lint runs noninteractively with zero errors; inherited warnings remain (see `phase-2/lint.txt`).
- 19 student/admissions/provenance/protected-boundary unit tests and 5 migration-core tests passed; no migration executed.
- Original browser suite: 26/26. New journey suite: 15/15; page errors: 0. See `phase-2/journey-qa.json` and `next-generation/browser-qa.json`.
- Axe: 0 violations in 51 scans across 1440/768/390; before had 83 rule findings in 32 desktop/mobile scans. Zero automated findings is not full WCAG certification.
- Visual: 186 before and 201 after viewport captures, plus priority desktop detail views; 67 after routes include all centres/recognition details and five new reflections. All captured views: no document overflow, unnamed visible controls or broken visible images.
- Full expanded sitemap: 1083 read-only route checks; 0 status/H1 failures. Two sample news articles received visual checks; the other 999 generated news variants were not individually visually reviewed or fact-checked.

## New journey evidence
- Homepage → real course detail → course-specific enquiry: PASS
- Homepage → batch directory → filters → enquiry preserves selections: PASS
- Course and branch schedule links preselect published-directory filters: PASS
- Course finder → explained recommendation → real course destination: PASS
- Published learner reflection → attributed detail → relevant curriculum: PASS
- Desktop disclosures open by keyboard and Escape restores focus: PASS
- Navigation at 768px contains focus, supports accordion, closes and restores focus: PASS
- Navigation at 390px contains focus, supports accordion, closes and restores focus: PASS
- Course load preserves top-of-page position and native arrow scrolling: PASS
- Curriculum controls update modules and maintain mobile touch target sizes: PASS
- Scroll entrances activate beyond the homepage and stop for reduced motion: PASS
- Contact form failure is announced, retains entered values and does not claim success: PASS
- Video preview loads the existing player only after a deliberate action: PASS
- Institutional galleries progressively disclose sessions and support keyboard photo dialog: PASS
- Public text and imagery stay visible without JavaScript: PASS

## Test corrections and discovered defects
Scrolled-menu checks revealed a 33px drawer at both tablet and mobile widths. The repaired open-header and overflow geometry yields 925px/929px of available drawer height. The final journey suite asserts this at scrollY 1,600; screenshots and measurements are linked from the visual audit. Build, accessibility and responsive captures were rerun after the repair.

Initial new journey checks asserted navigation before the client transition completed and used two incorrect/ambiguous button names; selectors and awaited URL transitions were corrected. A subsequent desktop keyboard check exposed a focus handoff timing race: it now runs after menu commit, not a guessed animation frame. Initial axe integration required an explicit browser context. Actual defects fixed include course auto-scroll, global arrow interception, low contrast, control naming, mobile target size and third-party iframe loading before user action. Passing final artifacts, not those intermediate runs, support the current status.

## Unperformed / constrained tests
No real persisted lead, authenticated CMS update/publish, migration, production deployment or external credential action was performed. Current CMS grants are denied. Manual screen-reader/device review and loaded external-player accessibility remain open. Contact failure and main form success/failure use intercepted API responses; invalid API payloads and unauthenticated access checks use real routes.

## Performance distinction
Reported home first-load JS stays about 140 kB. Local lab samples in `phase-2/performance-lab.json` are unthrottled, use a warm server cache and cannot establish production Core Web Vitals or INP.

1440px, n=3: median local LCP 280 ms, median CLS 0.00069, median TTFB 41 ms. No field INP measured.

390px, n=3: median local LCP 260 ms, median CLS 0.00119, median TTFB 42 ms. No field INP measured.


<!-- END_PHASE_2 -->

## Historical phase-one report (retained)

# Test and regression report

17 November 2026 · Final verification against Next.js 15.5.29 production output served temporarily on 127.0.0.1:3001. The user's existing development server was not replaced.

## Results

| Check | Result | Evidence / limit |
|---|---|---|
| TypeScript | Passed | `pnpm --filter web typecheck` after final implementation |
| Student/admissions unit tests | 15 passed | `node --test scripts/next-generation-unit.test.cjs`; matching, empty catalog, funnel edge cases, batch validation/expiry and attribution |
| Existing migration tests | 5 passed | `pnpm --filter web test:migration`; tests only, no migration executed |
| Production build | Passed | `pnpm --filter web exec next build`; 1,096 generated pages; `next-generation/production-build.txt` |
| Browser suite | 26 passed; zero uncaught page errors | Installed Chromium; `scripts/next-generation-qa.cjs`; `next-generation/browser-qa.json` |
| Lint command | Not passed / unconfigured | `pnpm --filter web lint` opened interactive ESLint setup; no dependency/config changes made |
| Targeted diff whitespace | Passed | Only changed tracked implementation paths checked |
| Repository-wide diff whitespace | Existing failures | Pre-existing whitespace in motion-tokens.ts and DIDM_CINEMATIC_IMPLEMENTATION_REPORT.md retained |
| Authenticated CMS write/publish | Not run | Configured DB denies page read; isolated test access unavailable |
| Actual CRM lead persistence/assignment | Not run | No valid production submission performed; requires isolated end-to-end test |
| Full WCAG / Lighthouse / field CWV | Not run | Browser semantic/keyboard/responsive smoke checks only |
| Production deploy | Not performed | User prohibited unapproved deployment |

## Browser checks

- Homepage responds, one H1, program CTA, finder CTA: PASS
- Course finder requires a choice then gives explained matches: PASS
- Career explorer switches paths and linked curriculum: PASS
- Skills assessment scores correct answers, explains and resets: PASS
- Campaign simulator reacts to keyboard range input: PASS
- Batch filters operate and preserve enquiry context with honest empty state: PASS
- Invalid lead payload returns client error without database call: PASS
- Enquiry failure stays truthful and preserves entered values: PASS
- Confirmed enquiry displays returned reference and sends attribution: PASS
- Batch admin and mutation route require authentication: PASS
- / at 1440px has one H1 and no horizontal overflow: PASS
- /course-finder at 1440px has one H1 and no horizontal overflow: PASS
- /upcoming-batches at 1440px has one H1 and no horizontal overflow: PASS
- /programs at 1440px has one H1 and no horizontal overflow: PASS
- / at 768px has one H1 and no horizontal overflow: PASS
- /course-finder at 768px has one H1 and no horizontal overflow: PASS
- /upcoming-batches at 768px has one H1 and no horizontal overflow: PASS
- /programs at 768px has one H1 and no horizontal overflow: PASS
- / at 390px has one H1 and no horizontal overflow: PASS
- /course-finder at 390px has one H1 and no horizontal overflow: PASS
- /upcoming-batches at 390px has one H1 and no horizontal overflow: PASS
- /programs at 390px has one H1 and no horizontal overflow: PASS
- Learning resources offer real prompt text, clipboard action and exercises: PASS
- Existing course, centre, trust and contact routes remain accessible: PASS
- Reduced-motion homepage remains visible and usable: PASS
- Sitemap includes discovery and robots has a single valid route: PASS

## Critical journey evidence

- Visitor → course discovery → explained shortlist → existing detail link and course-specific counselling link: verified.
- Visitor → branch/program/day filters → enquiry URL context: verified against the honest unavailable-data state. Nonempty published records have schema validation; authenticated database publication remains unverified.
- Visitor → skill quiz → score/explanations → reset: verified.
- Visitor → campaign slider keyboard action → recalculated funnel: verified.
- Visitor → main form → failed persistence response: intercepted 503; values preserved, failure shown, no fake reference or registration.
- Visitor → main form → successful response: intercepted 201 with an explicit QA-only reference; expected UTMs, course and form type verified in request payload. This is UI/contract evidence, NOT real persistence evidence.
- Unauthenticated visitor → batch admin → login; unauthenticated PUT/POST rejected 401: verified. No authenticated production mutation attempted.
- Existing Master, Advanced, Online, Dwarka, comparison, outcomes, stories, trainer, contact and about routes: HTTP 200 and public H1 smoke checks.
- Desktop/tablet/mobile: home, course finder, schedules and programs captured at 1440/768/390; no horizontal document overflow and one H1 in each.

## Performance evidence

The initial successful build reported homepage first-load JavaScript of 305 kB. Rendering the three latest news cards as a Server Component kept the full news archive out of the homepage client bundle. Final build reports 140 kB, a decrease of about 54%. Finder is 113 kB, programs 117 kB and schedules 108 kB first-load JS. No library upgrades or dependencies added.

Single unthrottled local Chromium homepage sample: LCP 1528 ms, CLS 0.00064, TTFB 1202 ms, DOMContentLoaded 1500 ms. This is one lab observation, not a field Core Web Vitals assessment or a guarantee on mobile networks. The database read fallback contributes to server latency; correct the permissions before profiling normal published-content operation.

## Issues found and resolved during verification

The initial browser suite exposed a filter labeling issue; labels were separated from nested selects and rechecked. Two test selectors initially failed (arrow included in link name; unsupported isFocused helper); the harness was corrected. A transient typecheck reported missing generated `.next-dev/types` during a development-server restart; a subsequent stable typecheck and production builds passed. Initial sandbox restrictions prevented browser launch/local binding, so approved local execution was used. Final suite passed after fixes.

No real database records, roles, provider credentials, production configuration, payments, Sarvam, Zoom or LMS workflows were changed by testing.

# Phase 2 implementation report

Assessment: 17 November 2026 (Asia/Kolkata). Local implementation only. No deployment, migration or authenticated database mutation.

## Outcome and boundaries
This pass delivers a cohesive public visual layer, concrete interaction repairs and fresh evidence. It does not clear external launch gates. Existing private services, database content and runtime credentials remain unchanged. No source files were deleted. Read-only runtime requests reconfirmed that the configured MongoDB account cannot read CMS pages, so the existing public fallbacks remain necessary.

## Change-by-change implementation evidence

| Change | Routes | Sources under apps/web/src unless specified | Final behavior | Verification / limitation |
|---|---|---|---|---|
| Shared public presentation | All public routes | components/public/PublicExperience.tsx; styles/public-excellence.css; app/layout.tsx | Common student navigation, typography, contrast, controls and final next actions. Admin excluded. | All 201 after captures, route smoke checks, axe |
| Editorial and course heroes | About, careers, contact, training, placements, media, gallery, six course routes | components/creative/EditorialHero.tsx; components/course/CourseHero.tsx | Readable HTML hero and real archive imagery; original artwork retained. Course-specific batch and enquiry links. | Before/after captures and journey tests |
| Course progress and native navigation | Master course and reusable roadmap | components/course/CourseLearningStudio.tsx; components/roadmap/InteractiveCourseRoadmap.tsx | No page-level scrollIntoView on mounting; arrow keys scoped; native map scrolling and ≥26px targets; live reduced-motion stop. | Initial scroll, keyboard, target-size and reduced-motion checks |
| Reusable entrances | Courses, institutional, faculty, resources and other sections | components/motion/{useScrollEntrance,RevealOnScroll,MotionSection,StaggeredCardGrid,TextReveal,MaskedImageReveal,ProgressiveTimeline}.tsx or .ts | Visible server content, bounded native animations, per-section entrances, cleanup and live preference handling. Existing complex storytelling retained. | Beyond-homepage reveal test and no-JavaScript test |
| Navigation and dialog semantics | Header, mobile drawer, video dialog and college lightbox | components/Navbar.tsx; components/public/useDialogFocus.ts | Disclosure states, ArrowDown entry, focus containment/restore and Escape. Final focus occurs after committed menu rendering, avoiding a frame-timing race. | Desktop/tablet/mobile keyboard journeys |
| Accessible field names | 16 public form/search source files | phase-2/form-accessibility-changes.json | 77 controls receive meaningful names; context-specific select names reviewed. Existing payloads and APIs unchanged. | Before 690 repeated visible unnamed-control instances; after zero across 201 captures |
| Published learner reflections | /stories and five /stories/[slug] routes | app/stories/*; lib/public/student-stories.ts; homepage/OriginalTestimonialsSection.tsx; app/sitemap.ts | Only five source-matched reflections on this journey, with individual source links and honest curriculum exploration. No salary/enrolment inference. | Four new unit guards; source and story journey tests |
| Published placement directory | /outcomes and /trainers | app/outcomes/page.tsx; app/trainers/page.tsx | Removed unsupported rating/performance bars and decorative stars from learner cards; publication-labelled source links. Names and directory filters retained. | Captures and axe; current outcomes/consent still need approval |
| Schedule consistency | All 14 /centres/[slug] variants and /upcoming-batches | CentreDetailView.tsx; app/upcoming-batches/page.tsx; components/student/BatchDiscovery.tsx | Expired local schedules removed; incoming course/branch query context preselects validated filters. | Two batch journeys, unknown-ID fallback and all-centre screenshots |
| Resource/link repairs | Homepage, about and media coverage | homepage/OriginalCareerClarity.tsx; app/about/page.tsx; app/media-coverage/page.tsx | Broken brochure route becomes an honest request through existing intake; malformed news path corrected. | Initial unmapped link inventory and route checks |
| Media and video | Recognition detail variants and /about | lib/media-coverage.ts; app/media-coverage/[slug]/page.tsx; components/public/VideoPreview.tsx | Exact two local artifact equivalents; published badge; existing YouTube endpoint loaded only after deliberate action. | Zero broken visible images after captures; video interaction test |
| Institutional gallery | /colleges-and-university-session | app/colleges-and-university-session/page.tsx | Six sessions initially, load more/search empty state, keyboard image buttons and modal close/restore. | Progressive gallery browser test |
| Tooling | Repository development checks | apps/web/eslint.config.mjs; apps/web/package.json; pnpm-lock.yaml; ScenePrimitives.tsx | Development-only ESLint/axe tooling; lint command works; three let→const corrections only in an existing 3D helper. No runtime dependency upgrade. | Lint zero errors with inherited warnings; build/typecheck |
| Counsellor launcher semantics | Shared public launcher | components/counsellor/DIDMCourseCounsellor.tsx | Accessible name includes visible launcher text. No prompts, provider, endpoint, credentials or voice behavior modified. | Axe; private server-file hash guard |

For concrete before/after files for each route family, use [the visual matrix](DIDM_VISUAL_EXCELLENCE_AUDIT.md) and [interactive local comparisons](phase-2/visual-comparison.html). Exact source changes and hashes: `phase-2/changed-source.json`; all individual form edits: `phase-2/form-accessibility-changes.json`. Those artifacts supplement the grouped change table rather than hiding per-file edits.

## Current verification
The final scrolled-menu regression exposed a real 33px drawer, beyond the initial keyboard checks. Repairing the public overflow containment and fixing the open header geometry restores 925px of tablet and 929px of mobile drawer height. Both states now have automated assertions and [before/after geometry](phase-2/menu-after.json); screenshot links are in the visual audit. Final build, journeys, accessibility and captures were rerun after this repair.

- Production build and TypeScript: passed; full logs at `phase-2/production-build.txt`.
- Lint: zero errors; legacy warnings remain in `phase-2/lint.txt`.
- Unit tests: 19 student/admissions/provenance/boundary tests plus 5 existing migration-core tests passed; no migration executed.
- Original browser regression: 26/26; new journey suite: 15/15. Read-only or intercepted admission responses only.
- Automated accessibility: 0 violations across 51 scans; baseline had 83 route-rule violations across 32 scans. This is not manual WCAG certification.
- Visual coverage: 201 after captures; no document overflow, visible unnamed control or broken visible image in those captures.
- Generated URL checks: 1083, failures 0. This verifies responses/headings, not every article’s factual accuracy.

## Performance
Median local LCP across three samples per width: 280ms at 1440px and 260ms at 390px; median CLS: 0.00069 and 0.00119 respectively. These small warm-local samples do not establish production performance or a field pass.

The homepage build remains approximately 140 kB first-load JavaScript; this is a bundle measurement, not a Core Web Vitals result. Six separate, unthrottled local Chromium contexts measure LCP/CLS and navigation timing after other suites finish; see `phase-2/performance-lab.json`. They use a warm local server/image cache, and database-denial fallback operation. No field INP, real mobile network or production traffic conclusion is drawn.

## Remaining blockers
The updated production-readiness report classifies every remaining gate by security, data/content, functional, integration, UX, accessibility, performance or deployment. Secret rotation, database grants, isolated authenticated workflows, content/consent approval, full generic CMS editors, approved brochure fulfilment, module pages, manual accessibility, field performance and deployment checks remain open. No external action or approval is represented as complete.

## Reproduce
```sh
pnpm --filter web lint
pnpm --filter web typecheck
node --test scripts/phase2-unit.test.cjs scripts/next-generation-unit.test.cjs
pnpm --filter web test:migration
pnpm --filter web exec next build
pnpm --filter web exec next start -p 3001 --hostname 127.0.0.1
```
Then run `scripts/phase2-qa.cjs`, `scripts/next-generation-qa.cjs`, `scripts/phase2-accessibility.cjs after`, `scripts/phase2-visual-audit.cjs after`, `scripts/phase2-route-check.cjs` and `scripts/phase2-performance.cjs` with Node. Browser tooling uses the installed Chromium runtime. Do not run authenticated production writes or the migration/bootstrap utilities.

## Rollback
Revert only the source hunks/new files listed in `changed-source.json` plus development-tooling changes from this increment. Preserve all pre-existing dirty workspace content. No git reset/clean, data migration or record restoration is required. Do not revert to expired schedules or unsupported public score claims as a normal publication workflow.


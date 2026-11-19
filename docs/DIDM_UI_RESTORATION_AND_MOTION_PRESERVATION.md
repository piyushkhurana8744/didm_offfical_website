# DIDM UI restoration and motion preservation

Date: November 13, 2026. Status: implemented locally and verified in Chrome. No deployment or production database writes.

## Previous design identified

The reference is the project's **November 12 premium full-bleed DIDM presentation**, documented in [the homepage redesign report](DIDM_HOMEPAGE_REDESIGN_REPORT.md), [the reconstruction report](DIDM_PRODUCTION_RECONSTRUCTION_REPORT.md), the retained `OriginalHeroBanner.tsx` / `OriginalCoursePrograms.tsx`, and [the project screenshot](audit_screenshots/cinematic/01_homepage_hero.png).

This reference is recoverable from the project's own source and screenshots. It is not a new copy of the live didm.in site. Its identifying features are crimson `#b52828`, white/neutral backgrounds, Poppins headings, Open Sans body text, Raleway accents, full-width course banners, centered homepage positioning, rounded course cards, prominent original imagery and rounded admission controls.

The working revision at the start was `dce440154eaa38cc8fb847ac945477dd06bd1136`. The selected visual version was not isolated in a separate tagged commit; substantial implementation work was uncommitted. The older committed Instrument Serif / Plus Jakarta appearance was inspected and distinguished from the later premium reference. No whole-site Git rollback was performed.

## Reversible snapshot and user changes

Before changing application code, the current source and approved motion were captured:

- [Source snapshot](ui-restoration/source-before.tar.gz): 380 source, configuration, script and report files, including uncommitted components.
- [Working-tree inventory](ui-restoration/working-tree-before.txt), [revision](ui-restoration/revision-before.txt), [uncommitted patch](ui-restoration/uncommitted-before.patch), [source hashes](ui-restoration/source-hashes-before.json) and [asset hashes](ui-restoration/asset-hashes-before.json).
- [Animation file inventory](ui-restoration/animation-files-before.json): 24 files containing animation machinery or CSS.
- Current desktop/mobile page screenshots in `ui-restoration/before/pages/`, with real hero/story recordings in `ui-restoration/before/recordings/`.

All pre-existing modifications were treated as user-owned. Current changes to `LiveAgencySim`, the trained AI counsellor, navigation and other existing work were preserved. The archive excludes secrets, environment files, node_modules, Git internals and generated build outputs. Original assets were protected by hashes and were not overwritten.

## Visual elements restored

| Area | Restored presentation | Current functionality retained |
|---|---|---|
| Global identity | Crimson/white/neutral palette; Poppins/Open Sans/Raleway; familiar radii, borders, shadows and typography | Existing theme, navigation, footer, responsive controls and accessibility hooks |
| Homepage hero | Original full-bleed MIDM billboard; centered headline/body; red counselling CTA before program discovery | Three headline reveal targets, creative studio, prompt/canvas/social/storyboard/cursor sequence, format controls and replay |
| Program directory | Original DIDM artwork, rounded white cards, featured crimson border; previous four primary programs first | All six real courses, correct routes, callback preselection and current card choreography |
| Homepage sections | Program discovery immediately after the hero; previous rounded learning/trust/admission surfaces; crimson student section | Campaign story, source-backed student selector, existing sections and real enquiry handling |
| Course pages | Original course artwork; full-width Advanced/Online banners; previous centered introduction where appropriate | Master 52-checkpoint roadmap, six distinct course explorers, all syllabus data and forms |
| Institutional/editorial pages | Recovered full-width banners on About, Trainers, Placements, Media, Contact, Life, Galleries, Certifications, Careers and institutional programs | Existing mask reveals, heading reveals, scroll-linked image motion, galleries and enquiry controls |
| Supporting public pages | Previous typography, neutral surfaces, rounded controls and card appearance | Existing directory/search/filter, legal, article, redirect and conversion behaviour |

`premium-restoration.css` is an additive presentation layer. Existing motion stylesheets remain present. No animation timelines were copied from an older version. The static Playground photo tilt was removed from restored full-width banners; this does not remove their GSAP mask or scroll motion.

The final homepage keeps the approved studio directly below the recovered centered positioning. Its animated content remains AI-focused. It does not replace the recovered billboard or introduce a new visual system. The current six programs remain available even though the older primary grid presented four.

## Approved motion preserved

[The preservation check](ui-restoration/animation-preservation-check.json) verifies:

- **21 of 24 animation-bearing files remain byte-for-byte unchanged.** This includes `CampaignJourney`, `ProgramSignature`, shared motion components, 3D implementation files and the quote selector.
- The approved `useEffect` timeline bodies in `CreativeStudioHero` and `EditorialHero` are byte-for-byte identical to the snapshot. Their GSAP sequences, selectors, refs, durations and cleanup remain intact.
- Existing global animation CSS is unchanged; only the font import changed in `globals.css`.
- The one integration trigger reuses the existing hero replay when at least 60% of the studio enters the viewport and the entrance had already finished below the restored billboard. It adds no new animation sequence. Mobile, tablet and desktop entry checks passed.
- The campaign's sticky geometry, native-scroll synchronization, timeline, reverse behaviour and reduced-motion manual controls are unchanged.
- All 778 original public assets match their pre-restoration hashes. The current API, MongoDB, authentication, CMS, curriculum/data, main enquiry component, navbar/footer logic, AI counsellor and user-edited simulation code are unchanged.

There was no active WebGL canvas on the baseline homepage/program checks. Existing 3D source and assets remain intact; previously removed scenes were not reintroduced. Current CSS/GSAP perspective transformations remain visible.

## Browser and build verification

- Production build: passed, including type validation and generation of 1,094 static pages. This is build coverage, not a claim that all generated articles were individually reviewed.
- `pnpm --filter web typecheck`: passed.
- 34 representative public page routes: HTTP 200, exactly one H1, no page errors or mobile horizontal overflow.
- 769 rendered image instances across those routes: no broken images after actual browser traversal/loading. Shared logos are included in this count.
- All 14 centre routes: passed.
- 12 supporting/detail/redirect checks, including the resource hub, legal pages and article families: passed.
- Viewports: 320 × 700, 390 × 844, 768 × 1024, 1440 × 1000 and 1920 × 1080.
- Original homepage billboard spans the viewport at all five sizes. Eleven restored page banners have zero left inset, full viewport width and contain sizing in the desktop boundary checks.
- Hero formats/replay: passed. Scroll story: `0 → 1 → 2 → 3 → 4 → 2 → 0`. Mobile: all five scenes. Reduced-motion manual discovery: passed.
- The studio's existing entrance visibly replays below the recovered banner at 390 × 700, 768 × 1024 and 1440 × 1000.
- Master explorer: all 52 entries retained, with final “Assignment Session” selection verified. Other course explorers remain interactive; the online workspace switches to Practice.
- Mobile navigation opens and closes with Escape. The DMI enquiry preselection remains `dmi`.
- With JavaScript disabled, the hero, six program links and narrative fallback remain readable.
- Fifteen form requests were intercepted in Playwright and given a deliberate HTTP 503 response. All payloads contained required name, phone, consent and source URL fields; forms displayed the failure and remained usable. No request reached the production lead API.

### Local performance observations

| Viewport | LCP | CLS | 95th percentile scroll frame |
|---|---|---|---|
| 1440x1000 | 2600 ms | 0.0000 | 16.8 ms |
| 390x844 | 540 ms | 0.0008 | 16.7 ms |

These are local, unthrottled headless Chrome observations. They are not deployed/field Core Web Vitals. No new dependencies were added.

## A / B / C evidence

- **A — previous premium UI:** [recovered screenshot](audit_screenshots/cinematic/01_homepage_hero.png).
- **B — current approved motion, before UI restoration:** [settled Playground hero](ui-restoration/before/hero-settled.png), [page-family captures](ui-restoration/before/pages/).
- **C — restored UI + current motion:** [desktop homepage](ui-restoration/final/visual/home-1440.png), [mobile homepage](ui-restoration/final/visual/home-390.png), [About](ui-restoration/final/visual/about-restored.png), [page-family captures](ui-restoration/final/pages/).
- [Side-by-side comparison](ui-restoration/final/visual/comparison.png) and [comparison HTML](ui-restoration/final/comparison.html).
- [Final campaign/hero browser recording](ui-restoration/after/recordings/page@fc5d5fc6a04c1a03466bcc3aebe2f93d.webm), [on-screen studio entry recording](ui-restoration/final/visual/entry-recordings/page@433156d46be0a99c29b4c10c4cb628d8.webm), [page-family browser recording](ui-restoration/final/pages/recordings/page@a0e26c863480b84076191535aa68b28e.webm), [baseline recordings](ui-restoration/before/recordings/).
- Machine-readable results: [routes/images](ui-restoration/final/pages/results.json), [forms](ui-restoration/final/pages/form-results.json), [visual/banners/centres](ui-restoration/final/visual/results.json), [entry replay](ui-restoration/final/visual/entry-replay-results.json), [supporting routes](ui-restoration/final/visual/supporting-route-checks.json), [story](ui-restoration/after/story-results.json), [performance](ui-restoration/final/motion/performance-results.json).

The recordings come from actual running Chrome pages, not offline animation renders.

## Files modified

New presentation layer: `apps/web/src/styles/premium-restoration.css`.

Existing source files changed selectively relative to the snapshot:

- `apps/web/src/app/about/page.tsx`
- `apps/web/src/app/careers/page.tsx`
- `apps/web/src/app/certifications/page.tsx`
- `apps/web/src/app/colleges-and-university-session/page.tsx`
- `apps/web/src/app/contact/page.tsx`
- `apps/web/src/app/corporate-training-program/page.tsx`
- `apps/web/src/app/gallery/page.tsx`
- `apps/web/src/app/layout.tsx`
- `apps/web/src/app/life-at-didm/page.tsx`
- `apps/web/src/app/media-coverage/page.tsx`
- `apps/web/src/app/outcomes/page.tsx`
- `apps/web/src/app/page.tsx`
- `apps/web/src/app/trainers/page.tsx`
- `apps/web/src/components/course/CourseHero.tsx`
- `apps/web/src/components/creative/CreativePrograms.tsx`
- `apps/web/src/components/creative/CreativeStudioHero.tsx`
- `apps/web/src/components/creative/EditorialHero.tsx`
- `apps/web/src/styles/globals.css`
- `apps/web/tailwind.config.ts`

The full [change manifest](ui-restoration/restoration-change-manifest.json) distinguishes this restoration from the large pre-existing working tree. The `scripts/ui-restoration-*.cjs` helpers and this report were added for evidence; they are not application runtime dependencies.

## Page-family routes verified

- `/`
- `/programs`
- `/programs/master-in-digital-marketing-course`
- `/programs/advanced-digital-marketing-course`
- `/programs/customized-digital-marketing-course`
- `/programs/digital-marketing-artificial-intelligence`
- `/programs/gen-ai-knowledge-camp`
- `/programs/online-digital-marketing-course`
- `/about`
- `/centres`
- `/centres/rajouri-garden`
- `/centres/dwarka`
- `/centres/noida`
- `/centres/dehradun`
- `/outcomes`
- `/trainers`
- `/stories`
- `/media-coverage`
- `/news-and-events`
- `/contact`
- `/enquire`
- `/life-at-didm`
- `/gallery`
- `/certifications`
- `/why-choose-didm`
- `/upcoming-batches`
- `/careers`
- `/franchise`
- `/organisations`
- `/corporate-training-program`
- `/colleges-and-university-session`
- `/digital-marketing-course-journal`
- `/faqs`
- `/compare`

All 14 centre slugs and the 12 additional supporting requests are enumerated in their linked result files. The shared restoration stylesheet applies to the remaining public article/detail instances.

## Remaining limits

No blocking defect remains in the tested Chrome layouts or motion flows. Some original portraits and certificates have limited source resolution; they were preserved without synthetic replacements. A few original source images include their own crop/framing. The approved animated-image behaviour remains, and Next correctly serves the retained animated GIF banners without static-image optimization.

The recovered reference is supported by retained source and screenshots rather than an exact tagged commit. Required additional animated workspaces remain in the final flow, so the complete page is not a pixel-identical historical copy. Physical mobile devices, Safari/Firefox and production CRM delivery were not tested. No production writes, migrations, deployment or destructive Git operations occurred.

Local review after building: `pnpm --filter web start --port 3005`. Development: `pnpm --filter web dev --port 3005`.

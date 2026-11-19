> Historical 3D implementation evidence. The 3D experiences were removed from the public website at the owner’s request on 13 November 2026; this document does not describe the current UI.

# DIDM browser verification

The final local production build passed **306 browser assertions** across 18 routes at desktop and emulated-mobile sizes. Development passed **305 assertions**. An additional **27 safe usability checks passed in each mode**. Seven secondary-world interaction cases and an exact comparison of all 52 original Master module titles also passed. The production build generated **1,094 pages** and passed its TypeScript validation. [Build output](audit_screenshots/3d/visibility/production/build.log).

## What was observed

- One nonzero, visible WebGL Canvas on every one of the 18 scene routes, with no uncaught page runtime errors or unexpected context loss during normal rendering.
- The homepage campus is in the initial viewport at 1920×1080, 1440×900, 1280×800, 768×1024, 390×844 and 375×812.
- Student coordinates change during walking. The Master student moves after choosing a checkpoint; all 52 original titles and their sequence match `master-52-modules.json` exactly. DMI stage selection changes the student's position.
- Actual Advertising Lab mesh hover changes its highlight; clicking that mesh selects it and changes measured camera coordinates. The overview button restores the camera. Keyboard selection opens the AI lab and its real curriculum link navigates to `/programs/gen-ai-knowledge-camp`.
- The Advanced and Online curriculum links have actual `#modules` section targets. AI and DMI link to the existing `#syllabus` reference.
- Reduced-motion users get a loaded still preview and working HTML course controls, with zero Canvas elements. A blocked WebGL capability test and an intentionally lost graphics context also produce the still preview. The still assets are screenshots of the real scene.
- Scrolling the Canvas out of view pauses its render counter; returning resumes it. The telemetry clock uses browser monotonic time so R3F clock restarts cannot leave misleading counters.
- The mobile header/menu fits and opens at 375px and 768px. Normal page scroll and sticky CTAs remain usable. No tested scene page has horizontal document overflow.
- Callback navigation reaches `/enquire`. A valid form submission was intercepted inside Playwright **before the API**, and selected course, centre and consent were asserted. The resulting acknowledgement was tested without creating a lead.

## Recordings

- [homepage-interaction](recordings/3d/production/homepage-interaction.webm) — 00:00:16.20, captured from Chrome.
- [program-tour](recordings/3d/production/program-tour.webm) — 00:00:26.36, captured from Chrome.
- [public-page-tour](recordings/3d/production/public-page-tour.webm) — 00:00:26.24, captured from Chrome.
- [mobile-campus](recordings/3d/production/mobile-campus.webm) — 00:00:12.52, captured from Chrome.

The program and public tours have adjacent `*-chapters.json` files containing route timestamps. The homepage recording shows animation, mesh hover/click, camera transition, overview reset, keyboard selection and real navigation. Recordings are browser videos, not Blender/offline renders.

## Screenshot and motion evidence

The [page matrix](DIDM_3D_VISIBILITY_MATRIX.md) links each route's desktop/mobile images. The production evidence directory additionally contains `home-initial`, `home-loaded`, `home-student-moved`, `home-hover`, `home-camera-transition`, `home-selected`, `home-reduced-motion`, `home-context-loss` and `home-webgl-unavailable` captures.

Separate scene frames were captured at a known 1.4-second interval. [Pixel comparison data](audit_screenshots/3d/visibility/frame-comparisons.json) compares the interior rendered scene after excluding the bottom HTML caption and floating launcher area and the surrounding website. This is paired with actual frame counters, character coordinates and camera coordinates; Canvas existence alone is not the motion test. The Master overview remains at its initial checkpoint until interaction; its student translation is verified separately and visible in the program tour.

## Reproduce

```sh
pnpm --filter web dev --port 3005
pnpm --filter web exec next build
pnpm --filter web start --port 3007
BASE_URL=http://localhost:3007 QA_MODE=production node scripts/verify-3d.cjs
BASE_URL=http://localhost:3007 QA_MODE=production node scripts/verify-3d-usability.cjs
node scripts/verify-world-interactions.cjs
node scripts/record-3d-tour.cjs
python3 scripts/compare-3d-frames.py
```

The browser scripts use an installed Playwright package or the existing npx cache. Set `PLAYWRIGHT_MODULE` to an explicit installed package path when necessary. Chrome must be installed. Build and development output are separate; do not run two development servers against the same output directory. Development-only runtime diagnostics: `http://localhost:3005/?sceneDebug=1`.

## Limits and outstanding owner review

No deployment was performed. Physical Android/iOS phones, Safari, cellular networks, long-session thermals and deployed CDN behavior were not tested. The actual reported renderer is ANGLE Metal on Apple M3; the `--enable-unsafe-swiftshader` flag permits fallback and does **not** mean SwiftShader was used. Earlier verbal references to a SwiftShader run were corrected after reading the real renderer.

No production database writes were made. Authentication, CMS writes, Atlas connectivity and counsellor replies were not exercised end-to-end; their source was not changed by this task. Existing Advanced/Online local form handlers were retained; this work does not certify their server persistence. The owner's visual review of the stylized procedural art and its motion remains outstanding. This is local browser verification, not a claim of production verification.

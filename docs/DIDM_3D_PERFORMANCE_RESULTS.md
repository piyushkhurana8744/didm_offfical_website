> Historical 3D implementation evidence. The 3D experiences were removed from the public website at the owner’s request on 13 November 2026; this document does not describe the current UI.

# DIDM measured local 3D performance

Renderer: `ANGLE (Apple, ANGLE Metal Renderer: Apple M3, Unspecified Version)`. Browser: real headless Chrome, WebGL 2. Desktop viewport 1440×900; phone viewport 390×844 is **emulation on the same Mac**, not measured phone hardware. Values come from actual render-loop samples and `WebGLRenderer.info` in [the final production JSON](audit_screenshots/3d/visibility/production/results.json).

Short steady-window samples across the final route captures ranged from **59.9 to 60.2 fps**. These ~0.5-second windows are capped by the browser's display scheduling and are not sustained FPS, percentile frame-time, battery or thermal benchmarks.

## Homepage loading

The final new-browser-context local runs recorded scene-object readiness at **1215 ms desktop** and **1140 ms emulated mobile**, relative to navigation's monotonic browser clock. This includes detecting a scene with more than 20 objects; it is not merely Canvas creation. The sampling monitor can add up to approximately 500 ms to that readiness mark. The server is on localhost, not a production or cellular network. The HTML heading and CTAs are server rendered, and a still preview is present while graphics load. The initial old development run took longer; no public loading-time guarantee is inferred from these local measurements.

## Final production samples

| Route | Desktop fps | Emulated-mobile fps | Draw calls desktop / mobile | Triangles desktop / mobile |
| --- | --- | --- | --- | --- |
| `/` | 60.0 | 60.0 | 327 / 180 | 9322 / 5470 |
| `/programs/master-in-digital-marketing-course` | 60.0 | 60.0 | 354 / 183 | 5910 / 3162 |
| `/programs/advanced-digital-marketing-course` | 59.9 | 60.1 | 120 / 68 | 3062 / 1742 |
| `/programs/digital-marketing-artificial-intelligence` | 60.0 | 60.0 | 73 / 40 | 2588 / 1496 |
| `/programs/gen-ai-knowledge-camp` | 60.1 | 60.0 | 125 / 72 | 3092 / 1760 |
| `/programs/online-digital-marketing-course` | 60.1 | 60.0 | 128 / 74 | 3150 / 1806 |
| `/centres` | 60.0 | 60.1 | 56 / 34 | 2334 / 1374 |
| `/centres/rajouri-garden` | 60.0 | 60.0 | 56 / 34 | 2334 / 1374 |
| `/about` | 60.0 | 60.0 | 57 / 33 | 2376 / 1392 |
| `/outcomes` | 60.0 | 60.2 | 57 / 33 | 2376 / 1392 |
| `/careers` | 60.0 | 60.0 | 57 / 33 | 2376 / 1392 |
| `/trainers` | 60.1 | 60.0 | 128 / 74 | 3150 / 1806 |
| `/stories` | 60.0 | 60.0 | 57 / 33 | 2376 / 1392 |
| `/media-coverage` | 60.0 | 60.1 | 128 / 74 | 3150 / 1806 |
| `/news-and-events` | 59.9 | 60.0 | 128 / 74 | 3150 / 1806 |
| `/gallery` | 60.0 | 60.1 | 128 / 74 | 3150 / 1806 |
| `/life-at-didm` | 60.1 | 60.1 | 128 / 74 | 3150 / 1806 |
| `/digital-marketing-course-journal` | 60.0 | 60.1 | 120 / 68 | 3062 / 1742 |

## Applied resource controls

- One Canvas per integrated page, dynamically loaded only after the host enters view. No global Canvas on form, legal or article-detail routes.
- Desktop DPR 1.35; mobile DPR 1. No mobile shadow rendering or antialiasing. Desktop has one 1024×1024 directional shadow map. A low-FPS quality controller can reduce DPR and disable shadows.
- Around 235 objects in the homepage scene, with original compact geometry and no external GLB/HDR/font dependency. No post-processing or transmission material in the campus. Shared React components reuse modeling rules; this is not a claim that every mesh is GPU-instanced.
- Textures for signs are small local CanvasTextures with disposal. Discovery uses existing local branch photographs. The two fallback WebP posters are compact derivatives of the real browser output.
- Offscreen/hidden-document rendering pauses. Reduced motion and unsupported WebGL mount no Canvas. A graphics-context loss unmounts the Canvas and displays the poster.

## Limits

Physical mobile GPUs, Safari, slow networks, loading on a deployed host, Core Web Vitals and long-session energy/thermal performance remain unmeasured. Do not convert the emulated-mobile samples into a 60-fps phone claim. No production site was deployed or certified. The full build passed, but the owner still needs to judge the final art direction and actual-device experience.

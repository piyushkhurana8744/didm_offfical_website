from pathlib import Path
import json, subprocess, re
root=Path('docs');ev=root/'audit_screenshots/3d/visibility'
prod=json.loads((ev/'production/results.json').read_text());dev=json.loads((ev/'development/results.json').read_text())
assert prod.get('completed') and not prod.get('failure'), 'Production suite is incomplete'
assert dev.get('completed') and not dev.get('failure'), 'Development suite is incomplete'
rows=[]
experience={'home':('Interactive campus','DIDMLearningUniverse → LearningCampusScene'),'master':('52-module learning adventure','CourseLearningStudio → ProgramWorldScene (journey)'),'advanced':('Performance marketing studio','ProgramWorld (performance)'),'dmi':('One-year learning journey','CourseStagesWorld → ProgramWorld (journey)'),'ai':('AI innovation lab','ProgramWorld (ai)'),'online':('Virtual learning studio','ProgramWorld (virtual)'),'centres':('Real campus photograph discovery','ProgramWorld (discovery)'),'rajouri':('Real campus photograph discovery','ProgramWorld (discovery)'),'about':('Institutional milestones','ProgramWorld (timeline)'),'outcomes':('Learning-to-career pathway','ProgramWorld (career → timeline)'),'careers':('Learning-to-career pathway','ProgramWorld (career → timeline)'),'trainers':('Guided learning workspace accent','ProgramWorld compact (virtual)'),'stories':('Learning-to-career pathway accent','ProgramWorld compact (career)'),'media':('Editorial workspace accent','ProgramWorld compact (virtual)'),'news':('Campus bulletin workspace accent','ProgramWorld compact (virtual)'),'gallery':('Classroom/community accent','ProgramWorld compact (virtual)'),'life':('Classroom/community accent','ProgramWorld compact (virtual)'),'resources':('Marketing workspace accent','ProgramWorld compact (performance)')}
fps=[];ready=[]
for page in prod['pages']:
 name=page['name'];desktop,mobile=page['views'];assert desktop['label']=='desktop'
 for v in page['views']:fps.append(float(v['after']['fps']))
 recording='[Homepage](recordings/3d/production/homepage-interaction.webm)' if name=='home' else '[Program tour](recordings/3d/production/program-tour.webm)' if name in ['master','advanced','dmi','ai','online'] else '[Public tour](recordings/3d/production/public-page-tour.webm)' if name in ['centres','about','outcomes','trainers','gallery'] else 'No individual recording; paired frames'
 motion='Yes; walking after selection' if name=='master' else 'Yes; moving student / screens'
 interaction='Yes; mesh + keyboard tested' if name=='home' else 'Yes; checkpoint tested' if name=='master' else 'Yes; keyboard selection tested' if name in ['advanced','online','ai','dmi','centres','about','outcomes'] else 'Shared controls; not individually clicked'
 fallback='Active WebGL; shared home fallback tests passed'
 shots=[f'[Desktop](audit_screenshots/3d/visibility/production/{name}-desktop.png)',f'[Mobile](audit_screenshots/3d/visibility/production/{name}-mobile.png)']
 rows.append(f'| `{page["route"]}` | {experience[name][0]} | `{experience[name][1]}` | Yes, one | {motion} | {interaction} | {fallback} | {shots[0]} | {shots[1]} | {recording} | {desktop["after"]["fps"]} / {mobile["after"]["fps"]} fps | Local Chrome desktop + emulated mobile passed |')
header='''# DIDM 3D page visibility matrix

Observed results from the final local **production-mode** build at `http://localhost:3007`; the development build is available at `http://localhost:3005`. This is not a deployed-production certification. Each route below also passed desktop/mobile rendering checks in development.

Desktop: 1440×900. Mobile: 390×844 browser emulation on the same Apple M3 renderer, **not a physical phone**. FPS is a short sampling window; no mobile hardware performance claim is made. Fallback fault tests were run on the shared homepage host, rather than on every route individually. All page-pair frame comparisons exclude surrounding HTML and the caption.

| Route | Intended experience | Actual component | Canvas | Visible motion | Interaction evidence | Fallback status | Desktop screenshot | Mobile screenshot | Recording | Desktop / emulated-mobile sample | Verification status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
'''
extra='''
## Routes deliberately without an added Canvas, and coverage limits

| Route / family | 3D policy | Browser verification |
| --- | --- | --- |
| `/enquire` | No Canvas; readable form and normal controls | Callback navigation and intercepted POST passed; selected course, centre and consent preserved; no database write |
| `/contact`, `/privacy`, `/terms`, `/admin/login` | No Canvas | GET/browser smoke checks passed |
| `/news-and-events/509` | No Canvas on individual articles | Representative article smoke check passed |
| `/news-and-events/[slug]`, `/media-coverage/[slug]` | No added 3D on long-form detail pages | Full build generated the routes; every article was not individually opened |
| Other `/centres/[slug]` routes | Shared photograph discovery scene and original branch content | Rajouri Garden tested at both sizes; other branches build-generated, not individually visually certified |
| Course aliases (`/programs/midm`, `/programs/dmi`, etc.) | Share the generic course scene selected by course ID | Build-generated; canonical program routes visually tested |
| `/programs/customized-digital-marketing-course` | Shared curriculum journey in source | Build-generated; Canvas visibility not separately browser-tested |
| `/programs`, `/compare`, `/faqs`, `/franchise`, `/upcoming-batches`, `/learn`, `/organisations`, `/certifications`, `/why-choose-didm`, `/corporate-training-program`, `/colleges-and-university-session`, `/refund` | No new Three.js scene; existing content and media retained | Successful production build; not individually visually certified in this task |

The reviews redirect `/trainee-reviews` points to the existing trainers review anchor; `/reviews` points to `/stories`. Both destination pages have a tested scene. No claim is made that CSS-only effects on other pages are Three.js.

Source of assertions: [production JSON](audit_screenshots/3d/visibility/production/results.json), [development JSON](audit_screenshots/3d/visibility/development/results.json), [program interaction checks](audit_screenshots/3d/visibility/production/world-interactions.json), [safe usability checks](audit_screenshots/3d/visibility/production/usability-results.json).
'''
(root/'DIDM_3D_VISIBILITY_MATRIX.md').write_text(header+'\n'.join(rows)+'\n'+extra)
# Probe recording metadata without decoding or altering the recording.
ffmpeg=Path.home()/'Library/Caches/ms-playwright/ffmpeg-1013/ffmpeg-mac'
metadata=[]
for name in ['homepage-interaction','program-tour','public-page-tour','mobile-campus']:
 p=root/f'recordings/3d/production/{name}.webm';r=subprocess.run([str(ffmpeg),'-hide_banner','-i',str(p)],capture_output=True,text=True)
 m=re.search(r'Duration: ([\d:.]+)',r.stderr);metadata.append({'file':str(p),'duration':m.group(1) if m else 'unknown','bytes':p.stat().st_size})
(ev/'recording-metadata.json').write_text(json.dumps(metadata,indent=2))
recordings='\n'.join(f'- [{Path(x["file"]).stem}]({x["file"].removeprefix("docs/")}) — {x["duration"]}, captured from Chrome.' for x in metadata)
(root/'DIDM_3D_BROWSER_VERIFICATION.md').write_text(f'''# DIDM browser verification

The final local production build passed **{len(prod['assertions'])} browser assertions** across 18 routes at desktop and emulated-mobile sizes. Development passed **{len(dev['assertions'])} assertions**. An additional **27 safe usability checks passed in each mode**. Seven secondary-world interaction cases and an exact comparison of all 52 original Master module titles also passed. The production build generated **1,094 pages** and passed its TypeScript validation. [Build output](audit_screenshots/3d/visibility/production/build.log).

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

{recordings}

The program and public tours have adjacent `*-chapters.json` files containing route timestamps. The homepage recording shows animation, mesh hover/click, camera transition, overview reset, keyboard selection and real navigation. Recordings are browser videos, not Blender/offline renders.

## Screenshot and motion evidence

The [page matrix](DIDM_3D_VISIBILITY_MATRIX.md) links each route's desktop/mobile images. The production evidence directory additionally contains `home-initial`, `home-loaded`, `home-student-moved`, `home-hover`, `home-camera-transition`, `home-selected`, `home-reduced-motion`, `home-context-loss` and `home-webgl-unavailable` captures.

Separate scene frames were captured at a known 1.4-second interval. [Pixel comparison data](audit_screenshots/3d/visibility/frame-comparisons.json) compares the interior rendered scene after excluding the bottom HTML caption and the surrounding website. This is paired with actual frame counters, character coordinates and camera coordinates; Canvas existence alone is not the motion test. The Master overview remains at its initial checkpoint until interaction; its student translation is verified separately and visible in the program tour.

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
''')
home=prod['pages'][0]['views'];perflines=[]
for p in prod['pages']:
 d,m=p['views'];perflines.append(f'| `{p["route"]}` | {d["after"]["fps"]} | {m["after"]["fps"]} | {d["after"]["drawCalls"]} / {m["after"]["drawCalls"]} | {d["after"]["triangles"]} / {m["after"]["triangles"]} |')
(root/'DIDM_3D_PERFORMANCE_RESULTS.md').write_text(f'''# DIDM measured local 3D performance

Renderer: `{home[0]['after']['renderer']}`. Browser: real headless Chrome, WebGL 2. Desktop viewport 1440×900; phone viewport 390×844 is **emulation on the same Mac**, not measured phone hardware. Values come from actual render-loop samples and `WebGLRenderer.info` in [the final production JSON](audit_screenshots/3d/visibility/production/results.json).

Short steady-window samples across the final route captures ranged from **{min(fps):.1f} to {max(fps):.1f} fps**. These ~0.5-second windows are capped by the browser's display scheduling and are not sustained FPS, percentile frame-time, battery or thermal benchmarks.

## Homepage loading

The final new-browser-context local runs recorded scene-object readiness at **{home[0]['after']['readyMs']} ms desktop** and **{home[1]['after']['readyMs']} ms emulated mobile**, relative to navigation's monotonic browser clock. This includes detecting a scene with more than 20 objects; it is not merely Canvas creation. The sampling monitor can add up to approximately 500 ms to that readiness mark. The server is on localhost, not a production or cellular network. The HTML heading and CTAs are server rendered, and a still preview is present while graphics load. The initial old development run took longer; no public loading-time guarantee is inferred from these local measurements.

## Final production samples

| Route | Desktop fps | Emulated-mobile fps | Draw calls desktop / mobile | Triangles desktop / mobile |
| --- | --- | --- | --- | --- |
'''+ '\n'.join(perflines)+'''

## Applied resource controls

- One Canvas per integrated page, dynamically loaded only after the host enters view. No global Canvas on form, legal or article-detail routes.
- Desktop DPR 1.35; mobile DPR 1. No mobile shadow rendering or antialiasing. Desktop has one 1024×1024 directional shadow map. A low-FPS quality controller can reduce DPR and disable shadows.
- Around 235 objects in the homepage scene, with original compact geometry and no external GLB/HDR/font dependency. No post-processing or transmission material in the campus. Shared React components reuse modeling rules; this is not a claim that every mesh is GPU-instanced.
- Textures for signs are small local CanvasTextures with disposal. Discovery uses existing local branch photographs. The two fallback WebP posters are compact derivatives of the real browser output.
- Offscreen/hidden-document rendering pauses. Reduced motion and unsupported WebGL mount no Canvas. A graphics-context loss unmounts the Canvas and displays the poster.

## Limits

Physical mobile GPUs, Safari, slow networks, loading on a deployed host, Core Web Vitals and long-session energy/thermal performance remain unmeasured. Do not convert the emulated-mobile samples into a 60-fps phone claim. No production site was deployed or certified. The full build passed, but the owner still needs to judge the final art direction and actual-device experience.
''')
print('Wrote matrix, browser verification and measured performance documents')

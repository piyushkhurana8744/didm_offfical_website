> Historical 3D implementation evidence. The 3D experiences were removed from the public website at the owner’s request on 13 November 2026; this document does not describe the current UI.

# DIDM 3D visibility: observed causes and corrections

Local investigation on 12 November 2026. This report concerns local browser observations; it does not certify a deployed site.

## What actually failed

1. **The requested server was serving broken assets.** On the first Chrome visit to port 3005, the page was unstyled, resource requests returned HTTP 400, and no Canvas mounted. `before-first-viewport.png` and `before-scene.png` preserve that visit under `docs/audit_screenshots/3d/visibility/`. A fresh development server served CSS and mounted a Canvas. The original server was stopped and port 3005 restarted. Development output now uses `.next-dev`, separate from production `.next`, so building production cannot overwrite the live development server's assets.
2. **The complete old scene was suspended by a missing font.** On the fresh server, WebGL 2 was available and one Canvas mounted, but the scene was blank. The old `CampusEnvironment` supplied `/fonts/Inter-Bold.woff` to Drei `Text`; that file does not exist and returned HTTP 404 in Chrome. The entire environment, lights, characters and camera were in one `Suspense fallback={null}` boundary. A mounted Canvas therefore did not establish that anything had rendered. The replacement uses local system-font CanvasTextures, with explicit disposal, and no downloadable font or external model dependency.
3. **The homepage's primary experience was a static billboard.** The old homepage rendered `OriginalHeroBanner` before the learning universe. On the initial broken-server visit, even the section began at y=878.875 in a 900-pixel viewport; its actual Canvas was further below its own heading and navigation. With correctly loaded CSS the large billboard, editorial content and statistics also preceded the scene. The new campus is the first hero. Original DIDM billboard imagery and the other homepage sections remain below it.
4. **Fallback and capability handling were incomplete.** The old detector tested WebGL 1, whereas installed Three 0.187 uses WebGL 2. Reduced motion had only an initial check. There was no scene error boundary, context-loss replacement, or runtime proof that rendered frames contained objects. The replacement checks WebGL 2, listens for motion-preference changes, releases the capability-test context, and provides an actual browser-rendered still preview on failure.

The runtime evidence did **not** establish a React Strict Mode regression, an R3F version conflict, camera frustum failure, or an IntersectionObserver failure as the cause of the old blank scene. Strict Mode remains enabled. Installed versions: Next 15.5.29; React/React DOM 19.3.1; R3F 9.8.2; Three 0.187.0; Drei 10.7.9. The final scene does not use Drei Text or its font loader.

## Pipeline proof before the redesign

A temporary large, lit, rotating Three.js book replaced the environment and was moved above the original hero. Chrome captured separate frames and a browser video before artistic work continued. Pointer hover changed the book's material. Mean absolute RGB differences between captured Canvas frames were 1.48 / 7.08 / 6.37 on the 0–255 channel scale. The temporary object is absent from the final application.

Evidence: `visibility/pipeline-frame-1.png`, `pipeline-frame-2.png`, `pipeline-first-viewport.png`, and `docs/recordings/3d/pipeline/`.

## Runtime instrumentation

`SceneVisibilityMonitor` samples actual renderer state: context loss, object count, Canvas CSS dimensions, frame counter, camera and student coordinates, gait state, draw calls, triangles and sampling-window FPS. DOM `data-*` fields are consumed by browser tests. They are not assertions based on source inspection.

The visible diagnostic panel is available only in development with `?sceneDebug=1`; it displays the live dataset, fallback reason and last error. It is gated out in production. Animation pauses when the scene leaves the viewport or the document is hidden. It resumes when visible. Reduced motion mounts no Canvas. Context loss replaces the Canvas with a still preview and keeps HTML navigation usable.

## Files changed by this task

Existing tracked files: `.gitignore`; `apps/web/next.config.ts`; `apps/web/tsconfig.json` (Next-generated build-type includes); `apps/web/src/styles/globals.css`; `apps/web/src/components/Navbar.tsx` (responsive callback/logo spacing); `apps/web/src/app/page.tsx`; `apps/web/src/app/programs/[slug]/page.tsx`; `apps/web/src/components/course/CourseLearningStudio.tsx`; route integration files below.

Existing working-tree files updated: `apps/web/src/components/homepage/OriginalHeroBanner.tsx`; the seven original files in `apps/web/src/components/3d/` (`DIDMLearningUniverse`, `LearningUniverseCanvas`, `CampusEnvironment`, `StudentExplorer`, `CameraDirector`, `AccessibleSceneNavigation`, `SceneFallback`).

New shared scene files in that directory: `scene-data.ts`, `ScenePrimitives.tsx`, `LearningCampusScene.tsx`, `ProgramWorldScene.tsx`, `SceneRuntime.tsx`, `SceneErrorBoundary.tsx`, `ImmersiveScene.tsx`, `Accessible3DNavigation.tsx`, `ProgramWorld.tsx`.

Route integrations: `about`, `careers`, `centres`, `centres/[slug]/CentreDetailView`, `gallery`, `life-at-didm`, `media-coverage`, `news-and-events`, `outcomes`, `stories`, `trainers`, `digital-marketing-course-journal`, `programs/advanced-digital-marketing-course`, `programs/online-digital-marketing-course` (all relative to `apps/web/src/app`, with `page.tsx` except the specified view).

Supporting artifacts: `apps/web/public/images/3d/{campus,studio}-poster.webp`; browser verification scripts in `scripts/`; the five requested visibility/redesign/verification/performance documents; screenshots, recordings and JSON test results under `docs/`.

The working tree already contained extensive unrelated changes before this task. `git diff --stat` includes those changes and must not be presented as this task's change list. No backend, CMS, authentication, MongoDB or counsellor implementation was changed by this task. No application database writes or deployment were performed.

The three previous implementation, visual-QA and performance reports are retained as historical documents with supersession notices. The runtime monitor also uses monotonic browser time so its frame samples remain correct after R3F restarts its clock when resuming the render loop.

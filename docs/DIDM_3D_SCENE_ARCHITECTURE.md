# DIDM Official Website — 3D Scene Architecture & Technical Design

**Engine:** Three.js (r174+) / React Three Fiber (@react-three/fiber v9)  
**Supporting Libraries:** `@react-three/drei` (v10), `gsap` (v3.15), `lenis` (v1.3)  
**Host Framework:** Next.js 15.5.29 App Router / React 19 / TypeScript 5.7  
**Rendering Target:** WebGL 2.0 with graceful WebGL 1.0 and DOM Fallback  

---

## 1. Component Hierarchy & Module Breakdown

```
apps/web/src/components/3d/
├── DIDMLearningUniverse.tsx       # Flagship Section (dynamic SSR-safe wrapper, scroll tracker)
├── LearningUniverseCanvas.tsx     # WebGL Canvas (adaptive DPR, shadows, lighting, viewport observer)
├── CampusEnvironment.tsx          # 3D Campus Plinth, Central Hub, Circuits, & 5 Lab Stations
├── StudentExplorer.tsx            # Procedurally rigged young adult learner characters (walking & observing)
├── CameraDirector.tsx             # Cinematic camera interpolator (scroll-driven + portal target focus)
├── AccessibleSceneNavigation.tsx  # Accessible DOM overlay with keyboard tabs & screen reader ARIA
├── SceneFallback.tsx              # High-performance zero-WebGL fallback for mobile & low-tier GPUs
└── index.ts                       # Public module exports
```

---

## 2. Technical Implementation Specifications

### A. Dynamic Lazy Loading & SSR Boundary
To guarantee absolute stability and avoid React 19 hydration mismatches:
```tsx
const DynamicLearningCanvas = dynamic(
  () => import("./LearningUniverseCanvas").then((mod) => mod.LearningUniverseCanvas),
  {
    ssr: false,
    loading: () => <SceneFallback />,
  }
);
```
Server-rendered HTML serves semantic heading tags and course descriptions immediately; client mounts the 3D Canvas once DOM is ready.

### B. Adaptive DPR & Performance Safeguards
1. **Adaptive DPR:** `dpr={[1, 1.75]}` automatically lowers resolution on high-density displays during fast motion to preserve a solid 60 FPS.
2. **IntersectionObserver Pause:** `frameloop={isIntersecting ? "always" : "never"}` suspends WebGL loop when the canvas scrolls out of view, reducing GPU consumption to 0%.
3. **Power Preference:** Configured with `powerPreference: "high-performance"` and `antialias: true`.
4. **Context Cleanup:** Meshes, geometries, and materials cleanly dispose on unmount to eliminate memory leaks.

### C. Cinematic Camera Director (Non-Hijacking)
The camera utilizes linear vector interpolation (`Vector3.lerp`) inside `useFrame`:
```tsx
camera.position.lerp(targetCamPosRef.current, factor);
currentLookAtRef.current.lerp(targetLookAtRef.current, factor);
camera.lookAt(currentLookAtRef.current);
```
- Standard scrolling operates naturally with native browser momentum (no scroll hijacking or trapped scroll).
- Clicking any lab portal initiates an easing flight transition directly into that lab's workstation.


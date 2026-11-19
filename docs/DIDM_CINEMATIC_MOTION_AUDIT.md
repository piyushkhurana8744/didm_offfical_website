# DIDM — CINEMATIC 3D SCROLL STORYTELLING AUDIT
**Document ID:** `DOC-DIDM-3D-AUDIT-2026-V2`  
**Date:** November 13, 2026  
**Status:** Approved for Implementation  
**Project:** Delhi Institute of Digital Marketing (DIDM Official Website)  
**Repository:** `/Users/piyushkhurana/didm_official_website`  

---

## 1. Executive Summary & Critical Owner Directive

The initial 3D implementation introduced an abstract procedural campus with floating cubes, geometric cylinders, glowing neon rings, and procedural student mannequins. 

### Owner Evaluation:
The owner has firmly rejected that aesthetic. The Delhi Institute of Digital Marketing is a premier, 10-year-accredited digital marketing training institute with 14+ physical campuses across Delhi NCR and India. It is **not** a gaming company, metaverse startup, or developer tech-demo playground.

### Mandate:
- **Cease Building:** Generic 3D campuses, floating cubes, neon rings, spinning low-poly characters, decorative particle clouds, and ungrounded gaming aesthetics.
- **Adopt Creative Vision:** **"DIDM — EVERY SCROLL UNLOCKS A NEW POSSIBILITY"**.
- **Real Educational Objects:** Physical objects of scholarship and career progression:
  1. **The 3D Digital Marketing Hardcover Book** with realistic curved page turning.
  2. **The 3D Admission Folder** with physical application sheets revealing the real lead intake form.
  3. **The 3D Digital Workspace (Laptop Workstation)** showcasing real digital marketing campaign execution.
  4. **The Student Career Portfolio** presenting authentic alumni success stories.
  5. **The Certificate & Award Reveal Folder** displaying verified ASSOCHAM, WASME, and MSME honors.

---

## 2. Technical Stack Audit

| Library | Installed Version | Compatibility Status | Notes |
|---|---|---|---|
| `next` | `15.1.0` | React 19 App Router | Dynamic client-only rendering (`ssr: false`) required for WebGL canvas |
| `react` / `react-dom` | `19.0.0` | React 19 Standard | Full concurrent mode support |
| `three` | `^0.187.0` | Production Ready | WebGL2 renderer, PBR materials, custom vertex shaders |
| `@react-three/fiber` | `^9.8.2` | Production Ready | Declarative Three.js scene graph |
| `@react-three/drei` | `^10.7.9` | Production Ready | Canvas helpers, HTML overlays, camera controls |
| `gsap` | `^3.15.1` | Production Ready | ScrollTrigger, timeline sequencing, scrub synchronization |
| `lucide-react` | `^0.468.0` | Production Ready | Clean semantic iconography for UI overlays |

---

## 3. Decommissioning Plan for Failed 3D Scene

The previous components (`LearningCampusScene.tsx`, `CampusEnvironment.tsx`, `StudentExplorer.tsx`, `ProgramWorld.tsx`, `DIDMLearningUniverse.tsx`) are disconnected from the primary user flow.

### Transition Rules:
1. Preserve underlying infrastructure helpers (`SceneErrorBoundary.tsx`, Canvas lifecycle, responsive hooks) where beneficial.
2. Introduce a new, dedicated, clean module: `apps/web/src/components/cinematic/` containing:
   - `CinematicBookSection.tsx` (Scroll-pinned container with GSAP ScrollTrigger sync)
   - `CinematicBookCanvas.tsx` (Three.js WebGL canvas with studio lighting and shadow map)
   - `HardcoverBook3D.tsx` (Physical book model with realistic crimson cover, gold foil, paper stack, and curved bending page mesh)
   - `BookPageCurvature.ts` (Mathematical page bending algorithm simulating paper tension and lift)
   - `BookAccessibleOverlay.tsx` (Semantic HTML text, chapter progress, and real CTAs)
   - `CinematicBookFallback.tsx` (Zero-overhead editorial card layout for `prefers-reduced-motion`)
3. Ensure absolute accessibility: The canvas is paired with semantic HTML `<article>` elements and ARIA live regions so search engines and screen readers parse all curriculum content without requiring WebGL execution.

---

## 4. Visual Quality Standards & Acceptance Criteria

A 3D scene is rejected if:
- It looks like a rotating cardboard box or flat quad pretending to be a book.
- The page turn is a rigid rotation without paper curvature.
- The colors look like neon arcade lights rather than DIDM crimson (`#8b1515` to `#b52828`), warm ivory paper (`#fbf8f2`), graphite, and soft gold foil (`#d4af37`).
- Scroll scrubbing jumps abruptly or traps user scroll.
- Mobile devices suffer frame drops or unreadable text.

A 3D scene is accepted only when:
- It looks like an art-directed studio photograph in motion.
- Lighting features soft contact shadows, directional key lighting, and ambient fill.
- The paper curvature follows realistic bending mechanics.
- Forward and backward scrolling smoothly advances and reverses the story.
- All CTAs remain functional native HTML links outside the canvas.


# DIDM Cinematic Motion System Architecture

**Version:** 1.0.0  
**Scope:** Delhi Institute of Digital Marketing (DIDM) Interactive Frontend  
**Inspiration Benchmarks:** Apple Product Storytelling, Wispr Flow Fluid Product Experiences, Kraftshala High-Utility Education  

---

## 1. Design & Motion Philosophy

The DIDM motion system transforms digital education discovery into an engaging, tactile narrative. Instead of decorative gimmicks or heavy WebGL dependencies, our animation model is guided by three principles:

1. **Utility First:** Every animation clarifies information (e.g. progressive syllabus disclosure, live ad budget calculations, interactive keyword analysis).
2. **Apple-Grade Fluidity:** Timing curves utilize smooth deceleration (`cubic-bezier(0.16, 1, 0.3, 1)`) and linear interpolation (`lerp`) for cursor tracking.
3. **Zero Layout Thrashing:** All transforms are strictly GPU-composited (`translate3d`, `rotate3d`, `scale3d`, and `opacity`), maintaining 60fps across mobile and desktop.

---

## 2. Motion Primitives Catalog

All components are located in [`apps/web/src/components/motion/`](file:///Users/piyushkhurana/didm_official_website/apps/web/src/components/motion/):

| Primitive | Purpose | Key Parameters | Accessibility Fallback |
| :--- | :--- | :--- | :--- |
| **`RevealOnScroll`** | Viewport entrance animations with directional offsets (`up`, `down`, `left`, `right`, `zoom`). | `direction`, `delayMs`, `durationMs`, `threshold`, `once` | Renders at full opacity (`1`) immediately when `prefers-reduced-motion` is active. |
| **`TextReveal`** | Word-by-word staggered mask reveals for high-impact headlines and course titles. | `text`, `delayMs`, `staggerMs`, `highlightWords` | Words display statically without translation if reduced-motion is requested. |
| **`MagneticButton`** | Cursor attraction effect that pulls buttons toward the mouse pointer with spring dampening. | `pullFactor` (0.1–0.4), `disabled` | Automatically disabled for coarse pointers (`touch`) and reduced-motion. |
| **`TiltCard`** | 3D perspective card rotation with dynamic specular glare highlight. | `maxTiltDeg`, `glare` | Resets to flat 2D projection on mobile touch viewports. |
| **`ParallaxLayer`** | Multi-plane optical depth that shifts layered marketing elements based on mouse vectors. | `speed` (-0.1 to 0.1), `mouseResponsive` | Automatically freezes at `(0, 0, 0)` under reduced-motion. |
| **`AnimatedGradient`** | Ambient dual-sphere fluid aurora mesh background with subtle floating keyframes. | `className` | Static CSS fallback with soft radial blurs. |

---

## 3. Kinetic Sections Implemented

### A. Cinematic Homepage Hero (`CinematicHero.tsx`)
- **Headline Entrance (Scene A):** Oversized `TextReveal` on the core admissions proposition with distinct brand red and AI indigo accents.
- **Interactive Marketing Universe (Scene B):** 3D layered floating objects:
  - *Google & Meta Live Ad Spend Card* (`₹50,000`, `ROAS 4.8x`)
  - *AI Workflow Copilot Node* (`GPT-4o + Claude 3.5 Sonnet`)
  - *SEO Entity Authority Node* (`Rank #1 Organic`)
  - *Verified Classroom Studio Anchor* (`DIDM_MEDIA.advancedCourseHero`)
- **Interactive Mode Switcher:** Toggle between the 3D Marketing Universe and the Live Student Ad Spend Console (`HeroVisual`).
- **Scroll Prompt (Scene C):** Subtle animated chevron guiding learners into the curriculum.

### B. Interactive Course Discovery & Skill Demonstrations (`InteractiveCourseDiscovery.tsx`)
- **Interactive Course Command Deck:** Instant selection between MIDM, DMI 1-Year Diploma, and Advanced tracks with dynamic fees, durations, hours, and module previews.
- **5 Hands-on Classroom Skill Simulators:**
  1. *Live Paid Ads Budget & ROAS Slider:* Drag ad spends from ₹10,000 to ₹1,00,000 to observe live calculated impressions, CPC, conversion counts, and Meta CAPI telemetry.
  2. *SEO Keyword Intent Lab:* Test seed keywords to inspect monthly Indian volume, entity difficulty, intent classification, and SERP ranking cards.
  3. *AI Multi-Agent Workflow:* Step-by-step pipeline demonstrating ICP Persona Vectors, Claude 3.5 hook generators, and Make.com ad deployment.

### C. 5-Phase Apple-Style Learning Journey (`LearningJourneyStory.tsx`)
- **Structured Chapter Progression:**
  - *Phase 01: Foundations & Conversion UX*
  - *Phase 02: Semantic SEO & AI Search (GEO)*
  - *Phase 03: Performance Ads on Real Budgets*
  - *Phase 04: 2-Month Live Agency Floor*
  - *Phase 05: Placement Drives & Career Launch*
- **Synchronized Visual Proof:** Every stage presents the exact tools mastered, tangible portfolio deliverables, and authentic verified DIDM lab photography.

---

## 4. Performance & Cross-Device Engineering

- **Viewport Scalability:**
  - `375px–428px` (Mobile): Complex 3D tilt and floating parallax nodes gracefully tuck into touch-friendly swipeable cards. No horizontal overflow.
  - `768px–1024px` (Tablet): Two-column adaptive grids with touch-optimized padding.
  - `1280px–1536px+` (Desktop): Full 3D perspective layers, magnetic cursor physics, and ambient aurora depth.
- **Frame Budget:** Runs consistently at 60fps utilizing native `requestAnimationFrame` loops and passive event listeners.
- **Zero Hydration Mismatches:** All motion components safely guard browser globals (`window.matchMedia`, `window.requestAnimationFrame`) behind `useEffect` mount cycles.


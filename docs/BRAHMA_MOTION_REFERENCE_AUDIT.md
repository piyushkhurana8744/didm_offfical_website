# BRAHMA.IO Visual Motion Reference Audit

**Audit Date:** 2026-11-10  
**Target URL:** `https://www.brahma.io/`  
**Captured Evidence:**  
- Desktop Hero: `docs/brahma_hero_desktop.png` (1440x900)  
- Mobile Viewport: `docs/brahma_hero_mobile.png` (390x844)  
- Full Page Narrative: `docs/brahma_fullpage.png` (1440xFull)  

---

## 1. Core Technology Stack Observed

Through direct DOM and script inspection of `https://www.brahma.io/`, the underlying motion and rendering stack consists of:
1. **Smooth Scrolling Engine:** Studio Freight **Lenis** (`v0.2.28`), configured with `lerp: 0.2`, `wheelMultiplier: 0.05`, and `smoothTouch: false` (touch fallback to native scroll).
2. **Choreography Engine:** **GSAP** (`v3.12.5`) with **ScrollTrigger** for pinned sequences and navigation transitions.
3. **Typography Splitting:** **SplitType** (`v0.3.4`) for line/word based stagger masks.
4. **Slider / Carousel:** **Swiper** (`v8`) for horizontal card interactions.
5. **No Heavy 3D WebGL Canvas:** The site does **not** load Three.js or heavy WebGL canvases; instead, it achieves cinematic depth using high-bitrate compressed HTML5 video loops, SVG masking, CSS backdrop filters, and hardware-accelerated CSS transforms.

---

## 2. Motion Pattern Inventory

### 1. Initial Page Loading & Ambient Canvas
- **Trigger:** `DOMContentLoaded` / window load.
- **Duration:** 800ms – 1200ms.
- **Easing:** `cubic-bezier(0.16, 1, 0.3, 1)` (Power4.out equivalent).
- **Layering:** Deep dark background (`#08080C` / `#000000`) with ambient gradient blur orbs and a dark vignette overlay (`hero-overlay-dark`).
- **Visual Behavior:** Subtle fade-in of background ambient light followed by immediate readability of main elements. No blocking preloader or faux loader bars.
- **Accessibility:** Immediate text availability prevents screen reader stalling.

### 2. Hero Headline Entrance (Split-Line Reveal)
- **Trigger:** Immediate on page load (100ms delay).
- **Duration:** 700ms per word/line.
- **Easing:** `cubic-bezier(0.16, 1, 0.3, 1)`.
- **Scroll Relationship:** Static entry; switches to subtle parallax upon scrolling.
- **Visual Behavior:** Words rise from behind an overflow-hidden mask (`translate3d(0, 110%, 0)` to `translate3d(0, 0, 0)`) with a 50ms stagger per word.
- **Likely Implementation:** `overflow: hidden` line wrappers with transform animations or GSAP SplitType.

### 3. Hero Video & Media Canvas
- **Trigger:** Auto-play muted loop.
- **Visual Behavior:** Cinematic loop showing UI interface elements and volumetric light. Video sits behind an SVG/CSS gradient mask so edges dissolve into page background.
- **Performance:** Hardware-accelerated H.264/WebM video with `playsinline muted loop preload="auto"`.

### 4. Continuous Marquee Ticker (Brand Logos)
- **Trigger:** Continuous infinite animation.
- **Duration:** 35s – 45s linear loop.
- **Easing:** `linear`.
- **Visual Behavior:** Dual duplicated tracks translating with `-100%` `translateX`. Monochromatic opacity (50% resting, 100% on hover).
- **Accessibility:** Pauses on `:hover` and `:focus-within`. Respects `prefers-reduced-motion` by disabling translation.

### 5. Pinned / Sticky Story Progression
- **Trigger:** Scroll trigger entered at `top top` or `center center`.
- **Duration:** Scroll-linked (scrubbed over 200vh–300vh).
- **Visual Behavior:** Left column pins with sticky stage description and active progress dots (`slider_dot_line`), while right visual cards sequence smoothly from step 1 to step 4.
- **Implementation:** GSAP ScrollTrigger `pin: true` or CSS `sticky` with intersection-driven state synchronization.

### 6. Interactive Card Elevators & Tilt
- **Trigger:** Mouse movement over card bounding rect.
- **Duration:** 300ms transition back to center.
- **Easing:** `ease-out`.
- **Visual Behavior:** Subtle 3D perspective tilt (`rotateX`, `rotateY`, max 6deg) with internal radial gradient shine highlighting mouse coordinates.

### 7. Navigation Micro-Interactions
- **Trigger:** Scroll position > 50px & cursor hover.
- **Visual Behavior:** Sticky header gains frosted backdrop blur (`backdrop-blur-md` with `border-neutral-800/80`). Menu items feature smooth pill reveals and subtle arrow translations.
- **Mobile Drawer:** Coordinated staggered slide-down drawer with full focus trap and Esc key dismissal.

---

## 3. Adaptation Strategy for DIDM

| BRAHMA Pattern | DIDM Adaptation | Why / Educational Fit |
|---|---|---|
| Dark AI media canvas | Dark/Light adaptive canvas (`#FBFAF7` light / `#0A0A0E` dark) with crimson brand radiance | Preserves official DIDM brand identity while elevating visual prestige |
| Abstract AI workflow video | Authentic DIDM classroom, convocation, live agency training imagery | Builds authentic trust; shows real student outcomes and campuses |
| Sticky feature scrubber | 5-stage **Learning Transformation Story** (Foundations → SEO → Performance Ads → Agency Sim → Placement) | Visually explains the 500-hour learning path before prospective students inquire |
| Split-text line reveal | Headline reveal on Homepage Hero & Program Titles | Creates crisp, high-impact editorial entry without layout shift |
| Interactive tilt cards | Program cards & Campus gallery spotlights | Enhances engagement on desktop without cluttering mobile |
| Lenis smooth scroll | Lenis smooth scrolling with strict reduced-motion guard | Silky, cinematic momentum on trackpads and wheels |

---

## 4. Patterns Intentionally Excluded

1. **Forced full-screen scrolljacking:** Avoided. Content must remain naturally scrollable with keyboard and screen readers.
2. **Excessive 3D WebGL assets:** Avoided to keep mobile bundle sizes under control and initial load under 2 seconds.
3. **Blocking intro loaders:** Avoided. DIDM is a high-converting admissions platform; visitors must see course options and contact details immediately.


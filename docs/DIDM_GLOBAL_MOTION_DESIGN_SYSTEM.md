# DIDM — GLOBAL MOTION DESIGN SYSTEM & COMPONENT REGISTRY
**Document ID:** `DOC-DIDM-GLOBAL-MOTION-2026-V1`  
**Date:** November 13, 2026  
**Status:** Approved for Full Production Integration  
**Project:** Delhi Institute of Digital Marketing (DIDM Official Website)  

---

## 1. Motion Philosophy & Aesthetic Framework

The Delhi Institute of Digital Marketing motion design language balances **scholarly institutional credibility** with **high-end creative technology execution**:
- **Natural Acceleration & Long Deceleration:** Utilizes `cubic-bezier(0.16, 1, 0.3, 1)` for an organic, luxurious settling curve without abrupt stops.
- **Content-Driven Choreography:** Animations clarify the narrative structure: headings introduce the topic, images reveal through subtle masks, and course cards cascade into view.
- **Fail-Safe Accessibility:** Motion enhances the experience but is never required to access critical academic information, syllabus modules, or lead intake forms.

---

## 2. Centralized Motion Tokens

Defined in `apps/web/src/components/motion/motion-tokens.ts`:

```ts
export const MOTION_TOKENS = {
  easings: {
    cinematic: "cubic-bezier(0.16, 1, 0.3, 1)", // Primary easing
    fluid: "cubic-bezier(0.25, 0.1, 0.25, 1)",     // Navigation & micro-interactions
    spring: "cubic-bezier(0.34, 1.4, 0.64, 1)",    // Badges & milestone nodes
  },
  durations: {
    micro: 180,      // Hover states & icons
    standard: 540,   // Quick UI cards
    deliberate: 780, // Section headlines & content
    cinematic: 1100, // 3D object transforms & page curls
  },
  stagger: {
    tight: 40,       // Badges & pills
    standard: 80,    // Course cards & benefit grids
    generous: 120,   // Large testimonials & gallery items
  },
  offsets: {
    subtle: 16,      // Eyebrows & micro-copy
    standard: 32,    // Cards & headings
    dramatic: 56,    // Split section images
  },
};
```

---

## 3. Motion Primitives Registry

| Primitive Component | Source File | Purpose & Behavior | Example Use Cases |
|---|---|---|---|
| `<MotionSection>` | `components/motion/MotionSection.tsx` | Viewport entrance with presets (`editorial`, `depth`, `scale`, `split`, `slideLeft`) | Section wrapper across all pages |
| `<MotionHeading>` | `components/motion/MotionHeading.tsx` | Masked reveal for eyebrow, H2 title, and descriptive subtitle | Section introductory headers |
| `<StaggeredCardGrid>` | `components/motion/StaggeredCardGrid.tsx` | Auto-cascading grid with 80ms stagger delay per card | Programs, Value Pillars, Mentors, Centers |
| `<SplitContentReveal>` | `components/motion/SplitContentReveal.tsx` | Synchronized entrance for 2-column image/copy layouts | Real Student Experience, Corporate Approach |
| `<ProgressiveTimeline>` | `components/motion/ProgressiveTimeline.tsx` | Scroll-drawn progress line with illuminating milestone nodes | Master 52-Module Roadmap, About Us Timeline |
| `<MotionAccordion>` | `components/motion/MotionAccordion.tsx` | Smooth height expansion and chevron rotation | FAQs, Module Syllabus breakdowns |
| `<MaskedImageReveal>` | `components/motion/MaskedImageReveal.tsx` | Shutter clip-path reveal + subtle zoom settling ($1.06 \to 1.0$) | Authentic campus life photos, Convocations |
| `<CinematicBookSection>` | `components/cinematic/CinematicBookSection.tsx` | 3D Hardcover Book with physics curved page-turning | Homepage & Master Curriculum signature |
| `<CinematicLaptopSection>`| `components/cinematic/CinematicLaptopSection.tsx` | 3D Workstation Laptop with live agency dashboard | Agency Floor & Practical Workstations |
| `<CinematicFolderSection>`| `components/cinematic/CinematicFolderSection.tsx` | 3D Admission Dossier with physical application sheet | Admissions & Quick Counselling |


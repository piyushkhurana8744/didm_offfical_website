# DIDM Public Website — All Pages Motion & Interaction Report

**Date:** November 5, 2026  
**Status:** Complete  

---

## Page-by-Page Motion Inventory

| Route | Key Motion & Interactive Enhancements | Purpose & Educational Benefit |
| :--- | :--- | :--- |
| **Homepage (`/`)** | • TextReveal editorial headline reveal<br>• Interactive Course Discovery with miniature roadmaps<br>• 5-phase learning journey with tangible portfolio proof<br>• Minimal floating AI Course Counsellor | Sets an academic tone without decorative SaaS cards or fake ROAS dashboards. |
| **Programs (`/programs`)** | • Staggered entrance reveals (`RevealOnScroll`) on all course cards<br>• Interactive "Explore Roadmap" buttons linking directly to module checkpoints | Allows prospective students to compare program depths at a glance. |
| **Program Details (`/programs/[slug]`)** | • **InteractiveCourseRoadmap** with moving student character<br>• Synchronized module checkpoint switching<br>• Expandable syllabus and tools showcase<br>• Campus availability directory | Transforms course reading into an engaging visual learning journey. |
| **Centres (`/centres`)** | • Fluid search and filter animations (`CenterFinder`)<br>• City/region tabs<br>• Entrance transitions on visit guidelines | Helps students find their nearest branch in Delhi, Noida, Gurgaon, or UP. |
| **Centre Details (`/centres/[slug]`)** | • Verified campus banner reveal<br>• Direction link transitions<br>• Interactive branch FAQ accordion | Gives a tangible feel for classroom infrastructure before visiting. |
| **About (`/about`)** | • Scroll-triggered 10-year growth timeline (2014–2026)<br>• 3-pillar philosophy cards with micro-elevation | Conveys decade-long institutional credibility. |
| **Outcomes (`/outcomes`)** | • 3-phase placement cell methodology reveals<br>• Career trajectory tiers with skill progression | Transparent career pathways without inflated salary claims. |
| **Stories (`/stories`)** | • Filter transitions for career tracks (Entrepreneurs, Corporate, Freshers)<br>• Review card hover states with provenance disclaimers | Authentic alumni evidence. |
| **Knowledge Hub (`/learn`)** | • Smooth tab switching between in-depth guides, prompt templates, and lessons | Fast resource discovery. |
| **Article (`/article`)** | • Clean reading typography with JSON-LD schema | Editorial readability. |
| **Organisations (`/organisations`)** | • Institutional corporate and university training format cards | Enterprise partnership exploration. |
| **Contact (`/contact`)** | • Interactive 14-branch directory selector with phone dialing | Frictionless counseling contact. |
| **Privacy (`/privacy`)** | • Structured DPDP Act 2023 legal notice | Compliance transparency. |

---

## Performance & Accessibility Validation

- **No Third-Party Bundle Bloat:** Zero heavy animation dependencies added. All motion uses native React hooks and GPU transforms.
- **`prefers-reduced-motion`:** Universally respected across all primitives.
- **Touch-Friendly:** Coarse pointer devices automatically bypass magnetic/tilt calculations.
- **Production Compilation:** 69 routes generated with zero build errors.


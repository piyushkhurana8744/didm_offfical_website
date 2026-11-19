# DIDM Official Website — 3D Website Audit & Feasibility Matrix

**Date:** November 12, 2026  
**Auditor:** Senior Creative Developer & Three.js Engineer  
**Reference Domain:** `https://www.didm.in/`  
**Active Production Server:** `http://localhost:3005` (Next.js 15.5.29 App Router)

---

## 1. Executive Feasibility & Route-by-Route Evaluation

To avoid performance degradation, memory leaks, and cluttered visual noise, 3D Canvas elements must only be placed where they **meaningfully elevate interactive learning discovery**, and never on top of document-heavy reading pages (e.g. Terms, Privacy, News articles).

| Route | Route Name | Existing Layout State | 3D Feasibility & Role | Decision |
|---|---|---|---|---|
| `/` | **Homepage** | Premium institutional redesign with full-bleed hero and 17 sections. | **Flagship 3D Learning Universe:** Interactive 3D campus with 5 specialized labs (SEO, Social, Ads, AI, Analytics) and stylized young adult learner characters. | **IMPLEMENTED (PRIMARY CANVAS)** |
| `/programs/master-in-digital-marketing-course` | **Master MIDM Course** | 52-module curriculum with custom walking-student learning roadmap. | **Enhance 52-Module Roadmap:** Preserve original 52 modules, order, and keyboard controls. Augment with dimensional milestone cards and checkpoint progression. | **ENHANCED (PRESERVED 52)** |
| `/programs/advanced-digital-marketing-course` | **Advanced AIDM Course** | Full-bleed hero with fast-track module tabs and live project ad budgets. | **PPC & Search 3D Visualizer:** High-impact dimensional module cards with micro-interactions. No full-canvas overhead. | **MICRO-3D & MOTION** |
| `/programs/online-digital-marketing-course` | **Online Digital Course** | Full-bleed hero with Pan-India placement highlights and live batch times. | **Virtual Classroom Gateway:** Subtle 3D perspective depth for live lecture workstations. | **MOTION & PARALLAX** |
| `/about` | **About DIDM** | Annual team meet full-bleed hero, leadership portraits, and IFA awards. | **Institutional Heritage Timeline:** Dimensional milestones (2014–2026). Preserve real photography without fake 3D avatars. | **EDITORIAL MOTION** |
| `/centres` & `/centres/[slug]` | **14 Physical Campuses** | Interactive regional filter, addresses, metro proximity, Google Maps links. | **Interactive Campus Discovery:** Spatial map perspective cards and campus photo galleries. | **SPATIAL CARDS** |
| `/trainers` | **Faculty & Trainees** | White T-shirt faculty hero, 11 leads, 54+ trainee placement cards. | **DO NOT 3D-ize Portraits:** Keep genuine photography readable and respectful. Smooth micro-interaction reveals on hover. | **SAFE IMAGE & HOVER** |
| `/gallery` | **Batch Convocation Photos** | Full-bleed hero with campus-filtered batch closing galleries and lightbox. | **3D Lightbox Orbit:** Keep high-resolution photos intact; augment with smooth transition layers. | **LIGHTBOX ENHANCED** |
| `/news-and-events` | **Latest News & Masterclasses** | Editorial grid pulling 1000+ authentic articles with local covers. | **Editorial Reading First:** No intrusive canvas movement blocking article text. Smooth image hover and reading progression. | **EDITORIAL MOTION** |
| `/media-coverage` | **Awards & Press Coverage** | ASSOCHAM, IFA by Sonu Sood, HT, Outlook, Zee News articles. | **Dimensional Award Plaque Display:** Authentic certificates remain 100% readable with `object-contain`. | **CERTIFICATE SAFE** |
| `/outcomes` & `/why-choose-didm` | **Placements & 150 Reasons** | Salary packages, recruiter logos, and comprehensive value matrices. | **Career Trajectory Pathway:** Dimensional placement salary growth visualization. | **MOTION GRAPHICS** |
| `/contact` & `/enquire` | **Conversion & Lead Desk** | Dual conversion forms with branch phone numbers and Google Map links. | **ZERO 3D OVERHEAD:** Forms and CTAs must load instantaneously without GPU competition. | **STRICT DOM CONVERSION** |

---

## 2. Identified Visual & Technical Issues (Fixed in Architecture)

1. **Previous Layout Clamping:** Trapped billboards with 320px–640px side margins resolved with `FullBleedSection`.
2. **Subject-Safe Cropping:** Implemented `SafeImage` display modes (`banner`, `portrait`, `certificate`, `logo`, `group`, `editorial`) ensuring no sliced faces or cropped fee charts.
3. **Hydration Mismatches:** Dynamic client-only lazy loading via `next/dynamic` with `ssr: false` ensures the 3D Canvas never causes SSR hydration errors.
4. **Mobile & Reduced Motion:** Automatic fallback to `SceneFallback` when `prefers-reduced-motion` is active or WebGL is unsupported.


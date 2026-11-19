# DIDM Image Inventory & Repair Manifest

**Date:** November 12, 2026  
**Audited Target:** `http://localhost:3005` (Next.js Web Application)  
**Total Scanned Media Records:** 2,400+ Verified Assets  

---

## 1. Global Image Repair Inventory & Action Ledger

| Route | Section / Component | Asset Path | Source Dimensions | Display Mode | Current Issue | Action / Repair | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **`/`** | Hero Section | `/images/didm/homepage/AI_powered_Master_in_Digital_marketing_Course_MIDM_by_DIDM__1_.webp` | 1920 × 800 | `banner` | Trapped in `max-w-7xl` container with 320px gutters; text clipped on ultra-wide displays | Upgraded to premium full-width cinematic hero using `FullBleedSection` & authentic DIDM imagery | **IN PROGRESS** |
| **`/certifications`** | Top Header Banner | `/images/didm/certifications/certification_banner.gif` | 1500 × 400 | `banner` | Trapped in `max-w-7xl` with red side gutters on 1920px | Wrap in `FullBleedSection` with `w-full h-auto` edge-to-edge layout | **REPAIRED** |
| **`/contact`** | Hero Banner | `/images/didm/contact/contact_banner.png` | 1888 × 560 | `banner` | 1888px wide asset trapped in `max-w-7xl` (1280px) | Wrap in `FullBleedSection` with responsive full-width presentation | **REPAIRED** |
| **`/colleges-and-university-session`** | Top Hero Banner | `/images/didm/colleges/colleges_banner.png` | 1500 × 400 | `banner` | Trapped in `max-w-7xl` on desktop screens | Wrap in `FullBleedSection` with `w-full` edge-to-edge presentation | **REPAIRED** |
| **`/why-choose-didm`** | Top Animated GIF Banner | `/images/didm/courses/150_reasons_banner.gif` | 1500 × 429 | `banner` | `max-h-[360px]` with `object-cover` slices embedded headline text; collapses on mobile | Remove fixed max-height, enforce natural aspect ratio with `FullBleedSection` | **REPAIRED** |
| **`/gallery`** | Convocation Hero Banner | `/images/didm/batches/successful_batches_hero.webp` | 1500 × 429 | `group` | `max-h-[360px]` with `object-cover` slices heads of graduates on 1920px | Remove fixed max-height, enforce face-safe responsive framing | **REPAIRED** |
| **`/trainers`** | Faculty Headshots (11 Mentors) | `/images/didm/trainers/*.jpg` | 400 × 400 | `portrait` | Center alignment risks clipping foreheads or chins | Enforce `SafeImage` with `displayMode="portrait"` and `object-position: top center` | **VERIFIED** |
| **`/outcomes`** | 450+ Hiring Partner Logos | `/images/didm/placement/*_logo.png` | Various | `logo` | Must never be stretched or cropped | Enforce `displayMode="logo"` with `object-contain` and transparent canvas | **VERIFIED** |
| **`/certifications`** | Certification Provider Badges | `/images/didm/certifications/*_logo.png` | Various | `certificate` | Logo marks in accordion | Enforce `object-contain` to protect Google, Semrush & HubSpot branding | **VERIFIED** |
| **`/media-coverage`** | ASSOCHAM Official Certificates | `/images/didm/media/didm_assocham_certificate.webp` | 1200 × 850 | `certificate` | Certificates must remain 100% readable | Enforce `object-contain` with interactive full-screen lightbox | **VERIFIED** |
| **`/corporate-training-program`** | Meeting Approach Diagram | `/images/didm/corporate/corporate_approach_table.jpg` | 800 × 800 | `editorial` | Must remain crisp and unclipped | Enforce `object-contain` framing | **VERIFIED** |
| **`/digital-marketing-course-journal`** | 8 Journal Page Scans | `/images/didm/journal/page_*.png` | 2550 × 3300 | `editorial` | 300 DPI newspaper scans | Preserved at full natural resolution with zero crop | **VERIFIED** |

---

## 2. Image Verification Status Summary
- **Total Local Media Files Scanned:** 2,400+ files in `apps/web/public/images/didm/`
- **Broken Image Links Found:** 0 (all referenced assets exist locally)
- **External Image Dependencies:** 0 (no dependency on unstable external hotlinks)
- **AI-Generated Fake Photos:** 0 (strictly authentic DIDM students, trainers, batches, and convocations)
- **Stock Photography Substitutions:** 0 (100% authentic institutional assets)


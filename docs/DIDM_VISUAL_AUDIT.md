# DIDM Full Website Visual Audit Report

**Date:** November 12, 2026  
**Audited Target:** `http://localhost:3005` (Next.js Web Application)  
**Reference Source:** `https://www.didm.in/`  
**Inspected Viewports:**  
- **1920 × 1080** (Full-width Desktop / Ultra-wide)
- **1440 × 900** (Standard Desktop)
- **1280 × 800** (Compact Desktop)
- **768 × 1024** (Tablet Portrait)
- **390 × 844** (Modern Mobile — iPhone 14/15/16)
- **375 × 812** (Compact Mobile — iPhone Mini/X)

---

## 1. Executive Summary & Root Cause Analysis

Following a browser-based audit across all public routes, five primary visual and architectural defects were identified:

1. **Banner Side Gaps (Lack of Full-Bleed Execution):**  
   - Multiple top hero banners (`Homepage`, `Certifications`, `Contact`, `Colleges`) were constrained inside `<div className="max-w-7xl mx-auto px-4 ...">`.
   - On viewports wider than 1280px (e.g. 1440px and 1920px), these banners floated with up to 320px of blank white/crimson gutters on both sides instead of extending 100% edge-to-edge from the left viewport edge to the right viewport edge.

2. **Severe Image Slicing & Subject Cropping:**  
   - Fixed height constraints (e.g. `max-h-[360px]` or `aspect-[21/6]` with `object-cover`) forced wide panoramic images to crop critical visual subjects:
     - On `/gallery`, graduate student faces in convocation ceremonies were sliced horizontally at 1920px width.
     - On `/why-choose-didm`, the animated headline banner text was sliced off at the top and bottom.
     - On mobile screens (390px), banners using `aspect-[21/6]` collapsed to ~111px height, creating unreadable letterbox strips.

3. **Homepage Aesthetic & Design Deficiencies:**  
   - The homepage utilized an artificial container-boxed billboard with duplicate heading blocks, dark card sections mixed with stark white containers, and lacked the cinematic, high-credibility institutional visual hierarchy expected of India’s top digital marketing institute.

4. **Certificate & Partner Logo Display Rules:**  
   - Certain certificates and accreditation badges used `object-cover`, risking clipped seals or unreadable authority signatures. All certificates, accreditation badges, and corporate logos must strictly render with `object-fit: contain`.

5. **Trainer & Student Portrait Framing:**  
   - Trainer portraits and student alumni avatars required top-weighted subject centering (`object-position: top center`) to prevent forehead and chin clipping across responsive cards.

---

## 2. Route-by-Route Detailed Visual Audit Findings

| Route | Viewports Audited | Issue Identified | Affected Component / Asset | Severity | Proposed Fix |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`/` (Homepage)** | 1920, 1440, 1280, 768, 390 | Hero banner trapped in `max-w-7xl` container with 320px side margins; dark/light theme fragmentation; lacks authentic cinematic editorial polish | `OriginalHeroBanner.tsx`, `OriginalCoursePrograms.tsx` | **CRITICAL** | Complete premium redesign using `FullBleedSection`, full-width cinematic hero, authentic student photography, refined typography, and cohesive section rhythm. |
| **`/certifications`** | 1920, 1440, 390 | Top GIF banner (`certification_banner.gif`) trapped inside `max-w-7xl` with red side gaps on 1920px | Line 199 in `certifications/page.tsx` | **HIGH** | Replace boxed container with `FullBleedSection` so the banner spans 100% viewport width edge-to-edge. |
| **`/contact`** | 1920, 1440, 390 | 1888px wide official banner (`contact_banner.png`) boxed in `max-w-7xl` with blank gutters | Line 78 in `contact/page.tsx` | **HIGH** | Wrap banner in `FullBleedSection` with `w-full h-auto` responsive display. |
| **`/colleges-and-university-session`** | 1920, 1440, 390 | 1500px hero banner (`colleges_banner.png`) constrained in `max-w-7xl` | Line 140 in `colleges-and-university-session/page.tsx` | **HIGH** | Upgrade to full-bleed hero layout with `FullBleedSection`. |
| **`/why-choose-didm`** | 1920, 1440, 390 | `max-h-[360px]` with `object-cover` slices embedded banner text at 1920px; collapses to 111px on mobile | Line 135 in `why-choose-didm/page.tsx` | **HIGH** | Remove fixed max-height; apply `FullBleedSection` with safe responsive aspect ratio preserving embedded text. |
| **`/gallery`** | 1920, 1440, 390 | `aspect-[21/6] max-h-[360px]` with `object-cover` cuts off heads of graduates in convocation hero | Line 169 in `gallery/page.tsx` | **HIGH** | Upgrade to responsive uncropped container preserving all students' faces. |
| **`/programs/advanced-digital-marketing-course`** | 1920, 1440, 390 | Top banner and diploma graphics require edge-to-edge presentation without horizontal stretch | `advanced-digital-marketing-course/page.tsx` | **MEDIUM** | Standardize hero banner to full bleed; ensure fee comparison cards use contain. |
| **`/programs/online-digital-marketing-course`** | 1920, 1440, 390 | Hero banner and batch schedule table spacing on 1920px | `online-digital-marketing-course/page.tsx` | **MEDIUM** | Ensure edge-to-edge hero with centered readable content container. |
| **`/centres/[slug]`** | 1920, 1440, 390 | Dark crimson campus hero banner constrained inside boxed grid on ultra-wide screens | `CentreDetailView.tsx` | **MEDIUM** | Convert crimson hero section into full-bleed background with max-width content container. |
| **`/corporate-training-program`** | 1920, 1440, 390 | Meeting table approach graphic (`corporate_approach_table.jpg`) requires uncropped contain framing | `corporate-training-program/page.tsx` | **MEDIUM** | Use `SafeImage` with `displayMode="editorial"` to ensure table and text are crisp. |
| **`/digital-marketing-course-journal`** | 1920, 1440, 390 | High-res 300 DPI newspaper scans must remain fully legible without vertical slice | `digital-marketing-course-journal/page.tsx` | **LOW** | Verified pristine; retain current high-res uncropped display. |
| **`/about`** | 1920, 1440, 390 | Co-founder image and classroom photos require top-weighted face-safe positioning | `about/page.tsx` | **MEDIUM** | Use `SafeImage` with `displayMode="portrait"` for leadership and faculty photos. |
| **`/trainers`** | 1920, 1440, 390 | 11 faculty cards require consistent 1:1 square portrait ratios with `object-position: top` | `trainers/page.tsx` | **MEDIUM** | Enforce face-safe top framing so headshots are never clipped at chin/forehead. |
| **`/outcomes`** | 1920, 1440, 390 | 450+ partner logo carousel and 54 trainee cards require strict `object-contain` for logos | `outcomes/page.tsx` | **MEDIUM** | Apply `displayMode="logo"` for all hiring partner brand marks. |
| **`/life-at-didm`** | 1920, 1440, 390 | Hero collage banner (`LifeofDIDM-2.webp`) edge gutters | `life-at-didm/page.tsx` | **MEDIUM** | Upgrade hero banner to full-bleed layout. |
| **`/careers`** | 1920, 1440, 390 | 4-row alternating photo/crimson cards must maintain equal 50/50 desktop split | `careers/page.tsx` | **LOW** | Verified pristine 50/50 desktop split; responsive stack on mobile. |
| **`/news-and-events`** | 1920, 1440, 390 | 18 news cards require consistent 270px editorial cover ratio with center subject focus | `news-and-events/page.tsx` | **LOW** | Verified pristine; pagination active across 503-article archive. |
| **`/media-coverage`** | 1920, 1440, 390 | Top banner (`trending_news_coverage.jpg`) and ASSOCHAM certificate require uncropped display | `media-coverage/page.tsx` | **LOW** | Verified pristine with full-width banner and contain certificate view. |

---

## 3. Image Display Rules Specification

To eliminate image cropping and stretching throughout the website, the following display rules are codified in `SafeImage.tsx`:

1. **Rule A — Hero & Promotional Banners:**
   - Must extend edge-to-edge from viewport left to right (`w-full`).
   - If the banner contains embedded text, `object-fit: cover` with strict vertical constraints is banned; natural height or responsive aspect ratio must be used.
2. **Rule B — Student Group & Convocation Photos:**
   - Must maintain `object-cover` with `object-position: center center` and sufficient container height, or `object-contain` when all individuals in wide group shots must remain visible.
3. **Rule C — Trainer & Student Portraits:**
   - Fixed portrait ratios (e.g. 1:1 square or 3:4 portrait) must use `object-position: top center` to ensure faces are centered and never clipped.
4. **Rule D — Certificates & Awards:**
   - Mandatory `object-fit: contain` with padding. No certificate may be cropped.
5. **Rule E — Corporate & Partner Logos:**
   - Mandatory `object-fit: contain` with background isolation. Logos must never be stretched or cropped.


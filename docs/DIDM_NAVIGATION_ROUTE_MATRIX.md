# DIDM Complete Navigation Route Matrix: Legacy vs New Architecture

## Executive Summary
This document provides the definitive route mapping between the legacy Delhi Institute of Digital Marketing website (`https://www.didm.in/`) and the new Next.js 15+ production architecture in `/Users/piyushkhurana/didm_official_website`.

Every audited navigation entry from the desktop utility bar, primary mega-menus, footer directories, and mobile drawer is mapped, classified, and verified with zero dead links or unhandled redirects.

---

## 1. Master Route Mapping Matrix

| Category | Legacy URL (`didm.in`) | New Canonical Route | Classification | Legacy HTTP | New HTTP | Implementation Component / File | Verification Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Utility** | `https://www.blog.didm.in` | `https://www.blog.didm.in` | External (Subdomain) | 200 OK | 200 OK | `apps/web/src/config/site-navigation.ts` | Verified (external rel="noopener") |
| **Utility** | `/news-and-events` | `/media-coverage` | Internal | 200 OK | 200 OK | `apps/web/src/app/media-coverage/page.tsx` | Verified (Prerendered Static) |
| **Utility** | `/franchise` | `/franchise` | Internal | 200 OK | 200 OK | `apps/web/src/app/franchise/page.tsx` | Verified (Prerendered Static) |
| **Utility** | `/careers` | `/careers` | Internal | 200 OK | 200 OK | `apps/web/src/app/careers/page.tsx` | Verified (Prerendered Static) |
| **Primary** | `/` (Home) | `/` | Internal | 200 OK | 200 OK | `apps/web/src/app/page.tsx` | Verified (Hero, Courses, Testimonials) |
| **About** | `/about-us` | `/about` | Internal | 200 OK | 200 OK | `apps/web/src/app/about/page.tsx` | Verified (10-section flagship page) |
| **About** | `/trainer` | `/about#team` | Anchor / Deep Link | 200 OK | 200 OK | `apps/web/src/app/about/page.tsx` | Verified (Faculty & Mentors grid) |
| **About** | `/trainee-reviews` | `/stories` | Internal | 200 OK | 200 OK | `apps/web/src/app/stories/page.tsx` | Verified (Case studies & reviews) |
| **About** | `/placement` | `/outcomes` | Internal | 200 OK | 200 OK | `apps/web/src/app/outcomes/page.tsx` | Verified (Salary bands & partner marquee) |
| **About** | `/150-reasons-to-join-digital-marketing-course-didm` | `/about#story` | Anchor / Deep Link | 200 OK | 200 OK | `apps/web/src/app/about/page.tsx` | Verified (150+ Reasons & Key Milestones) |
| **Training** | `/programs` (or empty `#`) | `/programs` | Hub / Landing | `#` (Broken) | 200 OK | `apps/web/src/app/programs/page.tsx` | Verified (All 5 program pathways) |
| **Training** | `/master-in-digital-marketing-course` | `/programs/master-in-digital-marketing-course` | Core Program | 200 OK | 200 OK | `apps/web/src/app/programs/[slug]/page.tsx` | Verified (52-checkpoint learning journey) |
| **Training** | `/advanced-digital-marketing-course` | `/programs/advanced-digital-marketing-course` | Core Program | 200 OK | 200 OK | `apps/web/src/app/programs/[slug]/page.tsx` | Verified (Prerendered dynamic slug) |
| **Training** | `/digital-marketing-artificial-intelligence` | `/programs/digital-marketing-artificial-intelligence` | Diploma Program | 200 OK | 200 OK | `apps/web/src/app/programs/[slug]/page.tsx` | Verified (AI Prompting & Automation) |
| **Training** | `/customized-digital-marketing-course` | `/programs/customized-digital-marketing-course` | Tailored Program | 200 OK | 200 OK | `apps/web/src/app/programs/[slug]/page.tsx` | Verified (Business owner modular tract) |
| **Training** | `/online-digital-marketing-course` | `/programs/online-digital-marketing-course` | Core Program | 200 OK | 200 OK | `apps/web/src/app/programs/[slug]/page.tsx` | Verified (Live weekend/evening virtual cohorts) |
| **Training** | `/gen-ai-knowledge-camp` | `/programs/gen-ai-knowledge-camp` | Specialized Camp | 200 OK | 200 OK | `apps/web/src/app/programs/[slug]/page.tsx` | Verified (Prompt Engineering, Agentic AI) |
| **Training** | `/upcoming-batches` | `/upcoming-batches` | Admissions Schedule | 200 OK | 200 OK | `apps/web/src/app/upcoming-batches/page.tsx` | Verified (Interactive cohort filter) |
| **Training** | `/enrollnow` | `/enquire` | Conversion / Lead | 200 OK | 200 OK | `apps/web/src/app/enquire/page.tsx` | Verified (Direct CRM lead registration) |
| **Centers** | `/select-centers` (or empty `#`) | `/centres` | Hub / Directory | `#` (Broken) | 200 OK | `apps/web/src/app/centres/page.tsx` | Verified (14-campus interactive locator) |
| **Centers** | `/digital-marketing-course-in-dwarka` | `/centres/dwarka` | Campus Route | 200 OK | 200 OK | `apps/web/src/app/centres/[slug]/page.tsx` | Verified (Sector 7, Ramphal Chowk) |
| **Centers** | `/digital-marketing-course-in-gurgaon` | `/centres/gurgaon` | Campus Route | 200 OK | 200 OK | `apps/web/src/app/centres/[slug]/page.tsx` | Verified (Sector 14, Old Judicial Complex) |
| **Centers** | `/digital-marketing-course-in-kalkaji` | `/centres/kalkaji` | Campus Route | 200 OK | 200 OK | `apps/web/src/app/centres/[slug]/page.tsx` | Verified (Nehru Place metro hub) |
| **Centers** | `/digital-marketing-course-in-noida` | `/centres/noida` | Campus Route | 200 OK | 200 OK | `apps/web/src/app/centres/[slug]/page.tsx` | Verified (Sector 62 IT Park corridor) |
| **Centers** | `/digital-marketing-course-in-pitampura` | `/centres/pitampura` | Campus Route | 200 OK | 200 OK | `apps/web/src/app/centres/[slug]/page.tsx` | Verified (Netaji Subhash Place - NSP) |
| **Centers** | `/digital-marketing-course-in-preet-vihar` | `/centres/preet-vihar` | Campus Route | 200 OK | 200 OK | `apps/web/src/app/centres/[slug]/page.tsx` | Verified (Vikas Marg East Delhi) |
| **Centers** | `/digital-marketing-course-in-rajouri-garden` | `/centres/rajouri-garden` | Campus Route | 200 OK | 200 OK | `apps/web/src/app/centres/[slug]/page.tsx` | Verified (Ring Road West Delhi) |
| **Centers** | `/digital-marketing-course-in-south-extension` | `/centres/satya-niketan` | Campus Route | 200 OK | 200 OK | `apps/web/src/app/centres/[slug]/page.tsx` | Verified (Central HQ / South Campus) |
| **Centers** | `/digital-marketing-course-in-dehradun` | `/centres/dehradun` | Campus Route | 200 OK | 200 OK | `apps/web/src/app/centres/[slug]/page.tsx` | Verified (Rajpur Road Uttarakhand hub) |
| **Centers** | `/digital-marketing-course-in-mumbai` | `/centres/mumbai` | Campus Route | 200 OK | 200 OK | `apps/web/src/app/centres/[slug]/page.tsx` | Verified (Andheri West financial corridor) |
| **Centers** | `/digital-marketing-course-in-haldwani-rudarpur` | `/centres/haldwani-rudarpur` | Campus Route | 200 OK | 200 OK | `apps/web/src/app/centres/[slug]/page.tsx` | Verified (Nainital Road Kumaon center) |
| **Centers** | `/digital-marketing-course-in-meerut` | `/centres/meerut` | Campus Route | 200 OK | 200 OK | `apps/web/src/app/centres/[slug]/page.tsx` | Verified (Western UP regional hub) |
| **Centers** | `/digital-marketing-course-in-jaipur` | `/centres/jaipur` | Campus Route | 200 OK | 200 OK | `apps/web/src/app/centres/[slug]/page.tsx` | Verified (Tonk Road Rajasthan hub) |
| **Centers** | `/online-digital-marketing-course` | `/centres/online` | Campus Route | 200 OK | 200 OK | `apps/web/src/app/centres/[slug]/page.tsx` | Verified (Global Virtual Classroom) |
| **Resources** | `/corporate-training-program` | `/organisations` | Enterprise | 200 OK | 200 OK | `apps/web/src/app/organisations/page.tsx` | Verified (B2B corporate upskilling) |
| **Resources** | `/colleges-and-university-session` | `/organisations#colleges` | Academic | 200 OK | 200 OK | `apps/web/src/app/organisations/page.tsx` | Verified (University MoU & workshops) |
| **Resources** | `/didm-certifications` | `/certifications` | Credentials | 200 OK | 200 OK | `apps/web/src/app/certifications/page.tsx` | Verified (30+ Industry exams catalog) |
| **Resources** | `/didm-media-coverage` | `/media-coverage` | Media / PR | 200 OK | 200 OK | `apps/web/src/app/media-coverage/page.tsx` | Verified (ASSOCHAM, Noida Conclave) |
| **Resources** | `/digital-marketing-course-journal` | `/learn` | Education Hub | 200 OK | 200 OK | `apps/web/src/app/learn/page.tsx` | Verified (LMS notes & free modules) |
| **Resources** | `/digital-marketing-course-successful-batch-images` | `/stories` | Community | 200 OK | 200 OK | `apps/web/src/app/stories/page.tsx` | Verified (Batch photos & outcomes) |
| **Resources** | `/life-didm` | `/about#story` | Culture | 200 OK | 200 OK | `apps/web/src/app/about/page.tsx` | Verified (Culture narrative in About) |
| **Footer** | `/terms-and-conditions` | `/privacy` | Legal | 200 OK | 200 OK | `apps/web/src/app/privacy/page.tsx` | Verified (Terms & Privacy Policy) |
| **Footer** | `/contact-us` | `/contact` | Contact | 200 OK | 200 OK | `apps/web/src/app/contact/page.tsx` | Verified (Contact details & enquiry form) |

---

## 2. Structural Fixes & Behavioral Differences

### 1. Elimination of Dead Anchor Links
On the legacy site, parent items in desktop navigation had unclickable or broken behaviors:
- `Diploma Program` had `href=""` which triggered browser reload to current URL.
- `Select Centers` had `href="#"` causing browser window jump to top.
In the new architecture:
- Every parent element is a fully qualified, keyboard-accessible Link pointing to its canonical overview page (`/programs`, `/centres`, `/about`).

### 2. Elimination of Unresponsive Flat Lists on Mobile
On the legacy site, mobile viewport rendered a single flat, unorganized DOM list of 40+ anchor items without accordion grouping or distinction between Delhi NCR and Regional branches.
In the new architecture:
- Mobile drawer uses accessible accordion sections (`Training`, `Centres`, `About Us`, `Resources`).
- Campuses are divided into `Delhi NCR Hubs (8)` and `Regional Campuses (6)`.
- Full telephone contact (`tel:+918800505151`), WhatsApp advisory, and quick action buttons are pinned for thumb reach.

### 3. SEO & Canonical Consistency
All routes use Next.js App Router metadata conventions with canonical URLs matching the root domain, ensuring search engines crawl the clean paths without redundant redirects.


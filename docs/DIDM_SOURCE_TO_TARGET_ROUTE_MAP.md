# DIDM Source-to-Target Canonical Route Mapping Matrix

**Generated:** November 12, 2026  
**Source Domain:** `https://www.didm.in/`  
**Target Architecture:** Next.js 15 App Router (`apps/web/src/app`)  
**Production Host:** `http://localhost:3005`  

---

## 1. Route Mapping Rules & Handlers

1. **Exact Canonical Preservation:** Core flagship routes (`/about`, `/trainers`, `/stories`, `/outcomes`, `/why-choose-didm`, `/centres/[slug]`, `/programs/[slug]`) resolve directly to server-rendered/SSG routes.
2. **Permanent 301 Aliases:** Legacy flat URLs from the original PHP/custom CMS (e.g. `/contact-us`, `/enrollnow`, `/about-us`, `/trainer`, `/trainee-reviews`, `/placement`, `/150-reasons-to-join-digital-marketing-course-didm`, `/digital-marketing-course-in-[campus]`) are registered in `apps/web/next.config.ts` with permanent 301 redirects to maintain 100% SEO link equity.
3. **No Dead Links:** All internal links resolve to working routes.

---

## 2. Comprehensive Route Mapping Matrix

| Source URL (`didm.in`) | New Canonical Route | HTTP Status | Handling Type | Implementation Status | Content Status | Image Status | Form / CTAs |
|:---|:---|:---:|:---|:---:|:---:|:---:|:---|
| `/` | `/` | 200 | App Router Page | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | Free Session Form, Demo CTA |
| `/about-us` | `/about` | 301 Redirect | next.config.ts -> `/about` | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | Enquiry Form, Syllabus |
| `/about` | `/about` | 200 | App Router Page | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | Enquiry Form, Syllabus |
| `/trainer` | `/trainers` | 301 Redirect | next.config.ts -> `/trainers` | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | Book Free Demo Class |
| `/trainers` | `/trainers` | 200 | App Router Page | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | Book Free Demo Class |
| `/trainee-reviews` | `/stories` | 301 Redirect | next.config.ts -> `/stories` | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | Free Demo Class Trigger |
| `/reviews` | `/stories` | 301 Redirect | next.config.ts -> `/stories` | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | Free Demo Class Trigger |
| `/stories` | `/stories` | 200 | App Router Page | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | Video & Alumni Reviews Filter |
| `/placement` | `/outcomes` | 301 Redirect | next.config.ts -> `/outcomes` | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | Placement Brochure, Helpline |
| `/placements` | `/outcomes` | 301 Redirect | next.config.ts -> `/outcomes` | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | Placement Brochure, Helpline |
| `/outcomes` | `/outcomes` | 200 | App Router Page | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | Placement Brochure, Helpline |
| `/150-reasons-to-join-digital-marketing-course-didm` | `/why-choose-didm` | 301 Redirect | next.config.ts -> `/why-choose-didm` | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | Demo Booking, Searchable Filter |
| `/why-choose-didm` | `/why-choose-didm` | 200 | App Router Page | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | Demo Booking, Searchable Filter |
| `/life-didm` | `/life-at-didm` | 301 Redirect | next.config.ts -> `/life-at-didm` | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | Campus Tour Request |
| `/life-at-didm` | `/life-at-didm` | 200 | App Router Page | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | Campus Tour Request |
| `/master-in-digital-marketing-course` | `/programs/master-in-digital-marketing-course` | 200 | App Router Page | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | 52-Module Roadmap, Syllabus Form |
| `/advanced-digital-marketing-course` | `/programs/advanced-digital-marketing-course` | 200 | App Router Page | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | Syllabus Download, Apply Now |
| `/digital-marketing-artificial-intelligence` | `/programs/digital-marketing-artificial-intelligence` | 200 | App Router Page | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | Dual Diploma Syllabus |
| `/customized-digital-marketing-course` | `/programs/customized-digital-marketing-course` | 200 | App Router Page | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | Custom Curriculum Consultation |
| `/online-digital-marketing-course` | `/programs/online-digital-marketing-course` | 200 | App Router Page | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | Live Interactive Demo |
| `/gen-ai-knowledge-camp` | `/programs/gen-ai-knowledge-camp` | 200 | App Router Page | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | Bootcamp Registration |
| `/digital-marketing-course` | `/programs/master-in-digital-marketing-course` | 301 Redirect | next.config.ts -> MIDM | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | Canonical Route Redirect |
| `/upcoming-batches` | `/upcoming-batches` | 200 | App Router Page | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | Batch Seat Reservation |
| `/didm-certifications` | `/certifications` | 301 Redirect | next.config.ts -> `/certifications` | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | Credential Exam Syllabus |
| `/certifications` | `/certifications` | 200 | App Router Page | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | Credential Exam Syllabus |
| `/enrollnow` | `/enquire` | 301 Redirect | next.config.ts -> `/enquire` | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | Lead Enrolment Form |
| `/enquire` | `/enquire` | 200 | App Router Page | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | Lead Enrolment Form |
| `/centres` | `/centres` | 200 | App Router Page | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | 14 Campuses Locator & Filter |
| `/digital-marketing-course-in-satya-niketan` | `/centres/satya-niketan` | 301 Redirect | next.config.ts -> Campus | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | Centre Enquiry & Directions |
| `/centres/satya-niketan` | `/centres/satya-niketan` | 200 | App Router Page | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | Centre Enquiry & Directions |
| `/digital-marketing-course-in-dwarka` | `/centres/dwarka` | 301 Redirect | next.config.ts -> Campus | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | Centre Enquiry & Directions |
| `/centres/dwarka` | `/centres/dwarka` | 200 | App Router Page | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | Centre Enquiry & Directions |
| `/digital-marketing-course-in-gurgaon` | `/centres/gurgaon` | 301 Redirect | next.config.ts -> Campus | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | Centre Enquiry & Directions |
| `/centres/gurgaon` | `/centres/gurgaon` | 200 | App Router Page | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | Centre Enquiry & Directions |
| `/digital-marketing-course-in-kalkaji` | `/centres/kalkaji` | 301 Redirect | next.config.ts -> Campus | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | Centre Enquiry & Directions |
| `/centres/kalkaji` | `/centres/kalkaji` | 200 | App Router Page | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | Centre Enquiry & Directions |
| `/digital-marketing-course-in-noida` | `/centres/noida` | 301 Redirect | next.config.ts -> Campus | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | Centre Enquiry & Directions |
| `/centres/noida` | `/centres/noida` | 200 | App Router Page | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | Centre Enquiry & Directions |
| `/digital-marketing-course-in-pitampura` | `/centres/pitampura` | 301 Redirect | next.config.ts -> Campus | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | Centre Enquiry & Directions |
| `/centres/pitampura` | `/centres/pitampura` | 200 | App Router Page | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | Centre Enquiry & Directions |
| `/digital-marketing-course-in-preet-vihar` | `/centres/preet-vihar` | 301 Redirect | next.config.ts -> Campus | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | Centre Enquiry & Directions |
| `/centres/preet-vihar` | `/centres/preet-vihar` | 200 | App Router Page | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | Centre Enquiry & Directions |
| `/digital-marketing-course-in-rajouri-garden` | `/centres/rajouri-garden` | 301 Redirect | next.config.ts -> Campus | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | Centre Enquiry & Directions |
| `/centres/rajouri-garden` | `/centres/rajouri-garden` | 200 | App Router Page | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | Centre Enquiry & Directions |
| `/digital-marketing-course-in-dehradun` | `/centres/dehradun` | 301 Redirect | next.config.ts -> Campus | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | Centre Enquiry & Directions |
| `/centres/dehradun` | `/centres/dehradun` | 200 | App Router Page | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | Centre Enquiry & Directions |
| `/digital-marketing-course-in-mumbai` | `/centres/mumbai` | 301 Redirect | next.config.ts -> Campus | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | Centre Enquiry & Directions |
| `/centres/mumbai` | `/centres/mumbai` | 200 | App Router Page | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | Centre Enquiry & Directions |
| `/digital-marketing-course-in-haldwani-rudarpur` | `/centres/haldwani-rudarpur` | 301 Redirect | next.config.ts -> Campus | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | Centre Enquiry & Directions |
| `/centres/haldwani-rudarpur` | `/centres/haldwani-rudarpur` | 200 | App Router Page | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | Centre Enquiry & Directions |
| `/digital-marketing-course-in-meerut` | `/centres/meerut` | 301 Redirect | next.config.ts -> Campus | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | Centre Enquiry & Directions |
| `/centres/meerut` | `/centres/meerut` | 200 | App Router Page | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | Centre Enquiry & Directions |
| `/digital-marketing-course-in-jaipur` | `/centres/jaipur` | 301 Redirect | next.config.ts -> Campus | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | Centre Enquiry & Directions |
| `/centres/jaipur` | `/centres/jaipur` | 200 | App Router Page | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | Centre Enquiry & Directions |
| `/corporate-training-program` | `/organisations` | 301 Redirect | next.config.ts -> `/organisations` | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | Corporate RFP Form |
| `/colleges-and-university-session` | `/organisations` | 301 Redirect | next.config.ts -> `/organisations` | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | University Workshop Request |
| `/organisations` | `/organisations` | 200 | App Router Page | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | Corporate & Academic Portal |
| `/franchise` | `/franchise` | 200 | App Router Page | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | Franchise Partner Application |
| `/careers` | `/careers` | 200 | App Router Page | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | Job Application Form |
| `/didm-media-coverage` | `/media-coverage` | 301 Redirect | next.config.ts -> `/media-coverage` | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | Press Inquiries, Award Gallery |
| `/media-coverage` | `/media-coverage` | 200 | App Router Page | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | Press Inquiries, Award Gallery |
| `/media-coverage/[slug]` | `/media-coverage/[slug]` | 200 | App Router Page | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | Award Article & Certificate |
| `/digital-marketing-course-successful-batch-images` | `/gallery` | 301 Redirect | next.config.ts -> `/gallery` | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | High-Res Convocation Photos |
| `/gallery` | `/gallery` | 200 | App Router Page | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | High-Res Convocation Photos |
| `/digital-marketing-course-journal` | `/learn` | 301 Redirect | next.config.ts -> `/learn` | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | Research & Study Guides |
| `/learn` | `/learn` | 200 | App Router Page | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | Research & Study Guides |
| `/news-and-events` | `/news-and-events` | 200 | App Router Page | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | Paginated Article Archive |
| `/news-and-events/[slug]` | `/news-and-events/[slug]` | 200 | App Router Page | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | Full Source Body & Original Photos |
| `/contact-us` | `/contact` | 301 Redirect | next.config.ts -> `/contact` | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | Central Contact Desk |
| `/contact` | `/contact` | 200 | App Router Page | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | Central Contact Desk |
| `/faqs` | `/faqs` | 200 | App Router Page | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | Accordion Search & Ask Form |
| `/privacy-policy` | `/privacy` | 301 Redirect | next.config.ts -> `/privacy` | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | Legal Compliance |
| `/privacy` | `/privacy` | 200 | App Router Page | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | Legal Compliance |
| `/terms-and-conditions` | `/terms` | 301 Redirect | next.config.ts -> `/terms` | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | Legal Terms |
| `/terms` | `/terms` | 200 | App Router Page | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | Legal Terms |
| `/refund` | `/refund` | 200 | App Router Page | **COMPLETE_VERIFIED** | COMPLETE | VERIFIED | Legal Refund Policy |


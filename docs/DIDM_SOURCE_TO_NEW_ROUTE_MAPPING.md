# DIDM Source-to-New Route Mapping Matrix

## Executive Summary
This document defines the 1-to-1 canonical route mapping from the legacy `https://www.didm.in/` website to the Next.js App Router structure in `/Users/piyushkhurana/didm_official_website`.

---

## 1. Mapping Matrix

| Source URL (`didm.in`) | New Canonical Route | HTTP Status | Handling Type | Target File / Component | Notes |
| :--- | :--- | :-: | :--- | :--- | :--- |
| `/` | `/` | 200 | App Router Page | `apps/web/src/app/page.tsx` | Flagship Hero, Curriculum Preview, Interactive Tools |
| `/master-in-digital-marketing-course` | `/programs/master-in-digital-marketing-course` | 200 | App Router Page | `apps/web/src/app/programs/[slug]/page.tsx` | Flagship 52-stop Learning Journey |
| `/digital-marketing-course` | `/programs/master-in-digital-marketing-course` | 301 Redirect | next.config.ts redirect | Redirect to MIDM | Canonical redirect for generic query |
| `/advanced-digital-marketing-course` | `/programs/advanced-digital-marketing-course` | 200 | App Router Page | `apps/web/src/app/programs/[slug]/page.tsx` | Performance marketing focus |
| `/digital-marketing-artificial-intelligence` | `/programs/digital-marketing-artificial-intelligence` | 200 | App Router Page | `apps/web/src/app/programs/[slug]/page.tsx` | Dual Diploma in AI + Marketing |
| `/customized-digital-marketing-course` | `/programs/customized-digital-marketing-course` | 200 | App Router Page | `apps/web/src/app/programs/[slug]/page.tsx` | Business owners custom curriculum |
| `/online-digital-marketing-course` | `/programs/online-digital-marketing-course` | 200 | App Router Page | `apps/web/src/app/programs/[slug]/page.tsx` | Global 2-way live streaming |
| `/gen-ai-knowledge-camp` | `/programs/gen-ai-knowledge-camp` | 200 | App Router Page | `apps/web/src/app/programs/[slug]/page.tsx` | Prompting and agentic tools camp |
| `/upcoming-batches` | `/upcoming-batches` | 200 | App Router Page | `apps/web/src/app/upcoming-batches/page.tsx` | Interactive batch timings & campus filter |
| `/enrollnow` | `/enquire` | 301 Redirect | next.config.ts redirect | `apps/web/src/app/enquire/page.tsx` | Canonical admissions lead form |
| `/contact-us` | `/contact` | 301 Redirect | next.config.ts redirect | `apps/web/src/app/contact/page.tsx` | Canonical contact route |
| `/about-us` | `/about` | 301 Redirect | next.config.ts redirect | `apps/web/src/app/about/page.tsx` | 10-section institute about |
| `/trainer` | `/trainers` | 200 | App Router Page | `apps/web/src/app/trainers/page.tsx` | Dedicated 11+ faculty & mentor directory |
| `/trainee-reviews` | `/stories` | 200 | App Router Page | `apps/web/src/app/stories/page.tsx` | Video reviews, filters by profile |
| `/placement` | `/outcomes` | 200 | App Router Page | `apps/web/src/app/outcomes/page.tsx` | Placement salary packages & hiring partners |
| `/150-reasons-to-join-digital-marketing-course-didm` | `/why-choose-didm` | 200 | App Router Page | `apps/web/src/app/why-choose-didm/page.tsx` | 150 operational reasons & differentiators |
| `/life-didm` | `/life-at-didm` | 200 | App Router Page | `apps/web/src/app/life-at-didm/page.tsx` | Campus culture, events & celebrations |
| `/digital-marketing-course-successful-batch-images` | `/gallery` | 200 | App Router Page | `apps/web/src/app/gallery/page.tsx` | Batch graduation photos & convocation |
| `/gallery` | `/gallery` | 200 | App Router Page | `apps/web/src/app/gallery/page.tsx` | Photo gallery archive |
| `/digital-marketing-course-in-satya-niketan` | `/centres/satya-niketan` | 200 | App Router Page | `apps/web/src/app/centres/[slug]/page.tsx` | Central HQ campus |
| `/digital-marketing-course-in-dwarka` | `/centres/dwarka` | 200 | App Router Page | `apps/web/src/app/centres/[slug]/page.tsx` | Sector 7 campus |
| `/digital-marketing-course-in-gurgaon` | `/centres/gurgaon` | 200 | App Router Page | `apps/web/src/app/centres/[slug]/page.tsx` | Sector 14 campus |
| `/digital-marketing-course-in-kalkaji` | `/centres/kalkaji` | 200 | App Router Page | `apps/web/src/app/centres/[slug]/page.tsx` | Nehru Place hub |
| `/digital-marketing-course-in-noida` | `/centres/noida` | 200 | App Router Page | `apps/web/src/app/centres/[slug]/page.tsx` | Sector 62 campus |
| `/digital-marketing-course-in-pitampura` | `/centres/pitampura` | 200 | App Router Page | `apps/web/src/app/centres/[slug]/page.tsx` | Netaji Subhash Place (NSP) |
| `/digital-marketing-course-in-preet-vihar` | `/centres/preet-vihar` | 200 | App Router Page | `apps/web/src/app/centres/[slug]/page.tsx` | Vikas Marg campus |
| `/digital-marketing-course-in-rajouri-garden` | `/centres/rajouri-garden` | 200 | App Router Page | `apps/web/src/app/centres/[slug]/page.tsx` | Ring Road interchange |
| `/digital-marketing-course-in-dehradun` | `/centres/dehradun` | 200 | App Router Page | `apps/web/src/app/centres/[slug]/page.tsx` | Rajpur Road campus |
| `/digital-marketing-course-in-mumbai` | `/centres/mumbai` | 200 | App Router Page | `apps/web/src/app/centres/[slug]/page.tsx` | Andheri West News 24 campus |
| `/digital-marketing-course-in-haldwani-rudarpur` | `/centres/haldwani-rudarpur` | 200 | App Router Page | `apps/web/src/app/centres/[slug]/page.tsx` | Kumaon regional hub |
| `/digital-marketing-course-in-meerut` | `/centres/meerut` | 200 | App Router Page | `apps/web/src/app/centres/[slug]/page.tsx` | Western UP regional hub |
| `/digital-marketing-course-in-jaipur` | `/centres/jaipur` | 200 | App Router Page | `apps/web/src/app/centres/[slug]/page.tsx` | Tonk Road Rajasthan hub |
| `/corporate-training-program` | `/organisations` | 200 | App Router Page | `apps/web/src/app/organisations/page.tsx` | Enterprise workforce training |
| `/colleges-and-university-session` | `/organisations#colleges` | 200 | Anchor in Page | `apps/web/src/app/organisations/page.tsx` | University workshops & MoU |
| `/didm-certifications` | `/certifications` | 200 | App Router Page | `apps/web/src/app/certifications/page.tsx` | 30+ Credentials catalog |
| `/didm-media-coverage` | `/media-coverage` | 200 | App Router Page | `apps/web/src/app/media-coverage/page.tsx` | Press, ASSOCHAM awards |
| `/digital-marketing-course-journal` | `/learn` | 200 | App Router Page | `apps/web/src/app/learn/page.tsx` | Knowledge hub & LMS notes |
| `/news-and-events` | `/news-and-events` | 200 | App Router Page | `apps/web/src/app/news-and-events/page.tsx` | News articles & convocation hub |
| `/news-and-events/:id` | `/news-and-events/:id` | 200 | App Router Page | `apps/web/src/app/news-and-events/[id]/page.tsx` | Individual news & conclave articles |
| `/franchise` | `/franchise` | 200 | App Router Page | `apps/web/src/app/franchise/page.tsx` | Turnkey franchise partnership |
| `/careers` | `/careers` | 200 | App Router Page | `apps/web/src/app/careers/page.tsx` | Faculty & relationship manager jobs |
| `/privacy-policy` | `/privacy` | 301 Redirect | next.config.ts redirect | `apps/web/src/app/privacy/page.tsx` | Canonical privacy route |
| `/terms-and-conditions` | `/terms` | 200 | App Router Page | `apps/web/src/app/terms/page.tsx` | Student terms, code of conduct |
| `/refund` | `/refund` | 200 | App Router Page | `apps/web/src/app/refund/page.tsx` | Clear admissions fee & refund policy |
| `/search-engine-optimization-seo-course` | `/programs/master-in-digital-marketing-course#checkpoint-seo` | 301 Redirect | Redirect | Deep link to 52-stop roadmap |
| `/social-media-marketing-course` | `/programs/master-in-digital-marketing-course#checkpoint-smm` | 301 Redirect | Redirect | Deep link to 52-stop roadmap |
| `/google-adwords-course` | `/programs/master-in-digital-marketing-course#checkpoint-ads` | 301 Redirect | Redirect | Deep link to 52-stop roadmap |


# DIDM Live Navigation Audit: Information Architecture & Source Analysis

## Executive Summary
This document records the comprehensive audit of the official live navigation system of the Delhi Institute of Digital Marketing (DIDM) website (`https://www.didm.in/`), performed to establish an exhaustive information architecture inventory for the new Next.js web application.

- **Primary Source**: `https://www.didm.in/` (Homepage rendered DOM and server HTML)
- **Snapshot Size**: 156,001 bytes (SHA256: `dddca36074efc741538913e78c84e792d74ccb24451ba4ee809c0527b322bcc2`)
- **Audit Date**: 2026-11-06

---

## 1. Complete Original Navigation Inventory

### A. Top Utility Navigation Bar
| Source Label | Original Source URL | Target Type | HTTP Status | Assessment & Handling |
| :--- | :--- | :--- | :--- | :--- |
| **Blogs** | `https://www.blog.didm.in` | External Subdomain | 200 (Live) | Approved external industry content hub. Preserved as secure outbound link (`rel="noopener noreferrer"`). |
| **News & Events** | `https://www.didm.in/news-and-events` | Internal Page | 200 (Live) | Archived releases and conclaves. Mapped to canonical `/media-coverage`. |
| **Franchise** | `https://www.didm.in/franchise` | Internal Page | 200 (Live) | High-intent business partnership page. Implemented as dedicated `/franchise` route with turnkey model specs. |
| **Careers** | `https://www.didm.in/careers` | Internal Page | 200 (Live) | Institutional hiring portal. Implemented as dedicated `/careers` route with faculty openings. |

---

### B. "About Us" Navigation Dropdown
| Source Label | Original Source URL | Parent | Target Route | Operational Status |
| :--- | :--- | :--- | :--- | :--- |
| **About Us** | `https://www.didm.in/` | Root | `/about` | Primary institute route. Rebuilt as 10-section flagship page. |
| **Who we are** | `https://www.didm.in/about-us` | About Us | `/about` | Full mission, vision, values, 10-yr legacy narrative. |
| **Trainee Reviews** | `https://www.didm.in/trainee-reviews` | About Us | `/stories` | Video testimonials, category filters (job switchers, entrepreneurs). |
| **Our Trainers** | `https://www.didm.in/trainer` | About Us | `/about#team` | 11 verified leadership department heads and faculty members. |
| **Placement Records** | `https://www.didm.in/placement` | About Us | `/outcomes` | Verified salary bands, hiring partner marquee, and placement cell support. |

---

### C. "Training" Mega-Menu & Course Programs
| Source Label | Original Source URL | Category | Target Route | Scope & Verification |
| :--- | :--- | :--- | :--- | :--- |
| **Digital Marketing Intelligence (DMI)** | `/digital-marketing-artificial-intelligence` | Diploma | `/programs/digital-marketing-artificial-intelligence` | Verified dual-domain diploma with AI workflow specialization. |
| **Master in Digital Marketing (MIDM)** | `/master-in-digital-marketing-course` | Certification | `/programs/master-in-digital-marketing-course` | Flagship 52-stop interactive learning studio with agency capstone. |
| **Advanced in Digital Marketing (AIDM)** | `/advanced-digital-marketing-course` | Certification | `/programs/advanced-digital-marketing-course` | Core performance marketing, SEO, and paid ad channels. |
| **Professional in Digital Marketing** | `/customized-digital-marketing-course` | Certification | `/programs/customized-digital-marketing-course` | Accelerated customized curriculum for business owners. |
| **Online Digital Marketing Course** | `/online-digital-marketing-course` | Certification | `/programs/online-digital-marketing-course` | Global 2-way interactive live Zoom batches + LMS video recordings. |
| **Gen AI Tools Training** | `/gen-ai-knowledge-camp` | Specialized | `/programs/gen-ai-knowledge-camp` | Specialized prompting camp (ChatGPT, Midjourney, Make.com). |
| **Upcoming Batches** | `/upcoming-batches` | Admissions | `/upcoming-batches` | Real-time cohort calendar with weekday/weekend/evening slots. |
| **Enrollment** | `/enrollnow` | Admissions | `/enquire` | High-conversion advisory and demo reservation gateway. |

---

### D. "Select Centers" Campus Directory (14 Campuses)
| Source Label | Original Source URL | Region | Target Route | Facilities & Highlights |
| :--- | :--- | :--- | :--- | :--- |
| **Dwarka** | `/digital-marketing-course-in-dwarka` | Delhi NCR | `/centres/dwarka` | Sector 7 hub, Ramphal Chowk metro access. |
| **Gurgaon** | `/digital-marketing-course-in-gurgaon` | Delhi NCR | `/centres/gurgaon` | Sector 14 prime hub, modern student terminals. |
| **Kalkaji** | `/digital-marketing-course-in-kalkaji` | Delhi NCR | `/centres/kalkaji` | South Delhi hub, Kalkaji Mandir / Nehru Place metro. |
| **Noida** | `/digital-marketing-course-in-noida` | Delhi NCR | `/centres/noida` | Sector 62 corporate and institutional center. |
| **Pitampura** | `/digital-marketing-course-in-pitampura` | Delhi NCR | `/centres/pitampura` | Netaji Subhash Place (NSP) metro corridor. |
| **Preet Vihar** | `/digital-marketing-course-in-preet-vihar` | Delhi NCR | `/centres/preet-vihar` | Vikas Marg East Delhi hub. |
| **Rajouri Garden** | `/digital-marketing-course-in-rajouri-garden` | Delhi NCR | `/centres/rajouri-garden` | Ring Road West Delhi interchange. |
| **South Extension / Campus** | `/digital-marketing-course-in-south-extension` | Delhi NCR | `/centres/satya-niketan` | Central Institutional Headquarters (Satya Niketan). |
| **Dehradun** | `/digital-marketing-course-in-dehradun` | Regional | `/centres/dehradun` | Rajpur Road Uttarakhand capital center. |
| **Mumbai** | `/digital-marketing-course-in-mumbai` | Regional | `/centres/mumbai` | Andheri West financial capital presence. |
| **Haldwani / Rudrapur** | `/digital-marketing-course-in-haldwani-rudarpur` | Regional | `/centres/haldwani-rudarpur` | 2024 new campus expansion in Kumaon region. |
| **Meerut** | `/digital-marketing-course-in-meerut` | Regional | `/centres/meerut` | Western UP regional training campus. |
| **Jaipur** | `/digital-marketing-course-in-jaipur` | Regional | `/centres/jaipur` | Tonk Road Rajasthan learning hub. |
| **Online Center** | `/online-digital-marketing-course` | Global | `/centres/online` | 2-way live streaming interactive classroom. |

---

### E. "Resources" Dropdown
| Source Label | Original Source URL | Category | Target Route | Content Alignment |
| :--- | :--- | :--- | :--- | :--- |
| **Corporate Training Program** | `/corporate-training-program` | Enterprise | `/organisations` | Tailored enterprise workforce enablement and executive coaching. |
| **Educational Institution Program** | `/colleges-and-university-session` | Academic | `/organisations#colleges` | Credit-aligned university semester workshops and guest conclaves. |
| **Certification** | `/didm-certifications` | Credentials | `/certifications` | Complete matrix of 30+ Google, Meta, HubSpot, SEMrush exams. |
| **DIDM Media Coverage** | `/didm-media-coverage` | PR | `/media-coverage` | ASSOCHAM awards, Zee News, Dainik Jagran press archive. |
| **DIDM Journal** | `/digital-marketing-course-journal` | Content | `/learn` | Free marketing guides, case studies, and LMS notes. |
| **Students Happy Faces** | `/digital-marketing-course-successful-batch-images` | Community | `/stories` | Convocation gallery, graduation batch photos. |
| **Life@DIDM** | `/life-didm` | Culture | `/about#story` | Internal events, festive celebrations, and agency workshops. |
| **Why Choose DIDM** | `/150-reasons-to-join-digital-marketing-course-didm` | Differentiation | `/about#story` | 150+ institutional reasons, ASSOCHAM brand honor, ISO certification. |

---

## 2. Key Audit Discoveries & Improvements

1. **Dead Links & Fragmented Destinations on Old Site**:
   - Several dropdown anchors (e.g., `Diploma Program`, `Select Centers`) had empty `href=""` or `#` tags causing page reloads. In the new architecture, every dropdown header links to its canonical parent landing page (`/programs`, `/centres`).
2. **Missing Standalone Pages**:
   - `Upcoming Batches`, `Certifications`, `Franchise`, `Careers`, and `Media Coverage` were prominent menu items but lacked modern dedicated Next.js routes. All 5 have now been implemented as rich, responsive routes.
3. **Responsive Degradation on Old Site**:
   - The legacy mobile menu was a single 40+ item unorganized list that caused severe vertical scroll fatigue. It has been replaced with clean, categorized collapsible accordions.


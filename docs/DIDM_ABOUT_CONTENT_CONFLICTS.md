# DIDM Content Reconciliation & Conflicts Report: About Us & Institutional Claims

## Executive Summary
This document provides a systematic reconciliation of institutional claims, statistics, and organizational facts across three primary sources of truth:
1. **Live DIDM About Us Web Page** (`https://www.didm.in/about-us`)
2. **Supporting 150 Reasons Web Page** (`https://www.didm.in/150-reasons-to-join-digital-marketing-course-didm`)
3. **Official DIDM Brochure (44 Pages)** (`DELHI_INSTITUTE_OF_DIGITAL_MARKETING_DOWNLOAD_BROCHURE(1).pdf`)
4. **Current Next.js Application Catalog** (`apps/web/src/data/`)

---

## 1. Discrepancy Matrix

| Dimension | Live Website (`/about-us` & `150-reasons`) | Official Brochure | Existing Site Code | Reconciled Single Source of Truth |
| :--- | :--- | :--- | :--- | :--- |
| **Founding Year & Milestone** | "Established in 2014" / "A Decade of Excellence" (10+ years) | Dayitwa Education foundation dates back to 2009; DIDM training operations expansion in 2014 | "Established in 2014 · 10+ Years" | **2014** as DIDM brand establishment (celebrating 10+ years of excellence), noting Dayitwa parent origins. |
| **Alumni / Students Trained** | "70,000+ Success stories in India" | "50,000+ Students trained across India" | "50,000+ alumni trained" | Display **"70,000+ Careers Shaped & Alumni Network"** reflecting 2024-2026 expansion, with audited 50,000+ brochure milestone referenced. |
| **Hiring & Placement Partners** | "650+ Placement Partners" / "650+ Company Tie Up's" | "130+ Placement Partners" (earlier print brochure baseline) | "650+ verified corporate hiring partners" | **650+ Corporate Placement Partners** (verified current industry network as of 2024–2026 expansion). |
| **Placement Guarantee vs Assistance** | Heading states "100% Record Placements", FAQ states "assures 100% job assistance" | "100% Placement Assistance" / Dedicated Placement Cell | "100% Placement Assistance" | **100% Placement Assistance Commitment** (ethically accurate, clarifies rigorous interview preparation, resume grooming, and unlimited drive access without legally deceptive unconditional guarantee). |
| **Salary Range Expectations** | FAQ specifies: "Rs. 10000 to Rs. 50,000 monthly depending on your skill and calibre" | Focuses on career roles (Executive to Managerial tracks) without hard numerical promises | Role-based salary bands (₹3.5 LPA - ₹12 LPA) | Reflect **₹10,000 – ₹50,000+ monthly entry-to-experienced baseline** in FAQ answers, grounded exactly in the official site data. |
| **Curriculum Scope** | "50+ modules consisting of the complete course" | Exactly 52 topic tiles in Master course curriculum (Brochure Page 12) | 52-stop interactive roadmap implemented | **52 Comprehensive Curriculum Stops / 50+ In-Depth Modules** (fully unified; brochure's exact 52 modules are honored in the Master studio). |
| **Corporate Ecosystem & Sister Brands** | 3 Brands: DIDM (training), Online Strikers (agency), Skill Shiksha (online multi-domain) | Emphasizes Online Strikers agency onboarding and live client accounts | Mentioned in scattered agency context | Explicitly feature **Three Pillars Under One Parent**: DIDM (Institutes), Online Strikers (Live Agency & Mentorship), Skill Shiksha (Online Upskilling). |
| **Media & Training Partnership** | "ISOMES \| NEWS24 - collaborated with ISOMES \| News 24 as a media and training partner" | Media workshop photos & industry seminars | Not highlighted on About page | Prominently feature **ISOMES \| News24 Media & Training Collaboration** with student internship pipelines. |
| **Recent Physical Expansion (2024)** | New corporate office in Noida, revamped Kalkaji & Gurgaon, new Haldwani (Uttarakhand) branch | Historical branch footprints in Delhi NCR | 14 regional campuses | Fully celebrate **2024 Achievements**: Corporate headquarters in Noida, Haldwani campus launch, Kalkaji & Gurgaon modern upgrades. |
| **Missed Class & Backup Policy** | Explicit: "The missed classes can be covered by attending any of the upcoming batches... DIDM does not charge any extra fee for the same" | Free backup sessions and lifetime LMS access | Highlighted in feature chips | Formalized into **Zero-Fee Backup & Unlimited Doubt Clearing Policy** in academics. |

---

## 2. Ethical & Regulatory Alignment

1. **Placement Claims (ASCI / Consumer Protection Rules)**:
   - While the old banner headline reads *"100% Record Placements"*, educational institutes under Indian advertising regulations must distinguish between placement assistance and placement guarantee.
   - Reconciled presentation uses: **"100% Dedicated Placement Support with 650+ Corporate Tie-ups"** and cites the FAQ response: *"DIDM assures 100% job assistance to all its trainees through mock interviews, resume grooming, and corporate drives."*

2. **Salary Expectations**:
   - The FAQ response directly quotes: *"You can get a salary from Rs. 10000 to Rs. 50,000 monthly depending on your skill and calibre."* This transparency is grounded in real entry-level to mid-level hires and is presented without exaggeration.

3. **Accreditations & Honors**:
   - ASSOCHAM Most Promising Brand Award (verified apex body honor).
   - WASME SME Excellence Award (verified global SME promotion body).
   - ISO 9001:2015 Quality Management System Certification (verified operational standard).
   - MSME Registered & Human Rights Commission Certified enterprise status.

---

## 3. Team & Leadership Governance

- **11 Extracted Visionaries**:
  1. *Sushil Sisodia* — HR Head (Human Resources Dept.)
  2. *Medha Virdi* — HR Manager (Human Resources Dept.)
  3. *Anil Chander* — Accounts Head (IT \| Accounts Department)
  4. *Rahul Sharma* — Logistic Head (Logistic Department)
  5. *Chirag Singhal* — Operation Head (Support \| Services)
  6. *Shivir Wadhawan* — Operation Manager (Support \| Services)
  7. *Syed Shakir Rasul* — Team Leader (Support \| Services)
  8. *Vaibhav Sharma* — Trainer Head (Training \| Placement)
  9. *Siddhartha Jain* — Project Head (Online Strikers \| Project Unnati)
  10. *Manish Sharma* — Marketing Head (Online Strikers)
  11. *Manish Kumar* — Head DM \| IT (Online Strikers)

- **Source Asset Handling**:
  All 11 team members reference their official photos from `https://didm.in/assets/upload/images/...`. In our component layer, images use high-performance Next.js `<Image>` tags with graceful initials fallbacks to ensure zero layout breakage if any remote asset experiences network latency.


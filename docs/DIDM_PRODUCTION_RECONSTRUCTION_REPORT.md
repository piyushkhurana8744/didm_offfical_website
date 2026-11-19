# DIDM Official Website — Production Reconstruction Report

**Project:** Delhi Institute of Digital Marketing (DIDM) Official Web Portal  
**Repository:** `/Users/piyushkhurana/didm_official_website`  
**Live Target Reference:** https://www.didm.in/  
**Report Generated:** November 12, 2026  
**Build Status:** `✓ Generating static pages (1091/1091)` | Zero TypeScript Errors | Production Ready  

---

## 1. Executive Summary

In adherence to the core instruction:
> **"STOP inventing a new visual identity. The client wants the new website to look and feel like the existing official DIDM website. Preserve the original DIDM brand, visual identity, content hierarchy, real images, course offerings, page structure and admission journey."**

The DIDM homepage has been rebuilt from source reference evidence (`https://www.didm.in/`) and verified against full-page screenshots captured at multiple screen widths (1440px desktop, 1280px laptop, 768px tablet, 390px mobile). All generic dark SaaS, AI aurora glows, and non-canonical layouts have been replaced with the authentic DIDM educational institute brand.

---

## 2. Complete Deliverables Inventory

| Deliverable File | Status | Description |
|---|---|---|
| `docs/DIDM_ORIGINAL_VISUAL_REFERENCE.md` | **Delivered** | Computed CSS color palette, typography hierarchy, button styles, section heights, and container widths extracted from the live site. |
| `docs/DIDM_HOMEPAGE_SECTION_MAPPING.md` | **Delivered** | Section-by-section breakdown of all 16 original sections from top utility bar to 14-centre directory footer. |
| `docs/DIDM_HOMEPAGE_IMAGE_MAPPING.md` | **Delivered** | Inventory of all authentic DIDM images downloaded, original URLs, local file paths, and target component bindings. |
| `docs/DIDM_HOMEPAGE_VISUAL_COMPARISON.md` | **Delivered** | Breakpoint-by-breakpoint comparison between original screenshots and local production screenshots. |
| `docs/DIDM_PRODUCTION_RECONSTRUCTION_REPORT.md` | **Delivered** | This comprehensive project reconstruction report. |
| `docs/original_homepage_1440.png` | **Delivered** | Full-page desktop screenshot of `https://www.didm.in/` (4.18 MB). |
| `docs/original_homepage_1280.png` | **Delivered** | Full-page laptop screenshot of `https://www.didm.in/` (3.95 MB). |
| `docs/original_homepage_768.png` | **Delivered** | Full-page tablet screenshot of `https://www.didm.in/` (2.38 MB). |
| `docs/original_homepage_390.png` | **Delivered** | Full-page mobile screenshot of `https://www.didm.in/` (3.54 MB). |
| `docs/reconstructed_homepage_1440.png` | **Delivered** | Full-page desktop screenshot of reconstructed homepage on `http://localhost:3005` (2.57 MB). |
| `docs/reconstructed_homepage_390.png` | **Delivered** | Full-page mobile screenshot of reconstructed homepage on `http://localhost:3005` (1.97 MB). |

---

## 3. Brand & Design System Implementation

### 3.1 Color Palette
- **Primary Brand Red:** `#b52828` (67 CSS occurrences in source stylesheet) with vibrant highlight `#f0081e`. Applied to all primary CTA buttons, badges, section headings, and the testimonial banner.
- **Charcoal Neutral:** `#222222` / `#111111` for high-contrast titles, header elements, and dark utility borders.
- **Body Neutral:** `#555555` for descriptive paragraphs, curriculum bullet points, and metadata.
- **Backgrounds:** Clean white `#ffffff` canvas with subtle light grey `#f7f7f7` alternating section breaks.

### 3.2 Typography Hierarchy
- **Heading Font:** `Poppins` (`300, 400, 500, 600, 700`) loaded via Google Fonts. Used on all H1–H4 titles, course names, and action buttons.
- **Body Font:** `Open Sans` (`300, 400, 600, 700`) loaded via Google Fonts. Used for readable long-form descriptions and feature lists.
- **Accent/Nav Font:** `Raleway` (`400, 500, 600, 700`) for badges, navigation items, and secondary labels.

---

## 4. Reconstructed Homepage Components

All components have been built in `apps/web/src/components/homepage/` using authentic DIDM image assets and live backend integrations:

1. **`OriginalHeroBanner.tsx`**
   - High-impact DMI billboard banner (`digital-marketing-intelligence.webp` and `AI_powered_Master_in_Digital_marketing_Course_MIDM_by_DIDM__1_.webp`).
   - Accreditation chips: ASSOCHAM & MSME Recognized, 14 Delhi NCR Branches, 50,000+ Alumni.
   - Exact centered H1 bar: *"AI-Powered Digital Marketing Course | Best Digital Marketing Institute in Delhi & Across India"*.
   - Direct CTA triggers: "Explore Courses" and "Book Free Demo Class".

2. **`OriginalCoursePrograms.tsx`**
   - 3 Primary Certification Course cards:
     - Master in Digital Marketing (MIDM) — 500+ hours, 50 modules.
     - Advanced in Digital Marketing (AIDM) — Core practitioner curriculum.
     - Professional in Digital Marketing — Foundation curriculum.
   - High-quality WebP course graphics downloaded from `didm.in`.
   - Direct links to `/programs/[slug]` detail routes and download syllabus triggers.

3. **`OriginalTrainingBenefits.tsx`**
   - 12 Value Pillars with original red icons (`2303825.png`, `609124.png`, `1006517.png`, `2666535.png`, `1256676.png`, etc.).
   - Covers 100% Placement Support, Practical Training, Experienced Trainers, Doubt Clearing, Backup Classes, 650+ Placement Partners, and Live Projects.

4. **`OriginalTrainingHighlightsAndForm.tsx`**
   - Split 2-column layout matching the original site.
   - Left: 8 Training Highlights with checkmarks.
   - Right: "Take a free session today!!" inline lead form with Full Name, Phone (+91 validation), Email, Branch selection (14 Delhi NCR centres), Course selection, and a Math security check.
   - Fully connected to the backend `/api/enquire` route with MongoDB Atlas lead storage.

5. **`OriginalTestimonialsSection.tsx`**
   - Crimson red banner (`#b52828`) titled *"Over 35000+ Careers transformed"*.
   - Authentic student alumni photographs (`student1.jpg`, `student2.jpg`, `student3.jpg`, `7.jpg`, `6.jpg`) and verified quotes from Soumya Jay, Nancy Sharma, Sonam Aggarwal, Prateek Jain, and Pranav Khanna.

6. **`OriginalUpskillCareer.tsx`**
   - 4 Value pillars: Advance Knowledge, Quality Training, Smart Classes, Certified Expert.
   - Distinct red top borders and responsive grid.

7. **`OriginalMasterMentors.tsx`**
   - Authentic profile cards of DIDM's Google master mentors:
     - Mr. Rahul Gupta (Senior Marketing Strategist, Google)
     - Mr. Shrey Deepum (Marketing Strategist, Google)
   - Original mentor photographs and credential chips.

8. **`OriginalAwardsRecognition.tsx`**
   - 4 Pillars: Trending News, International Fame Awards 2021, ASSOCHAM MSME Award, Media In The News.
   - Authentic trophy photographs (`IFA_AWARD_DIDM.jpg`, `MSME_AWARD_DIDM.jpg`, `MEDIA_NEWS.png`).
   - Integrated links to the dedicated `/media-coverage` hub.

9. **`OriginalCampusGallery.tsx`**
   - Authentic batch closing ceremonies from Preet Vihar and Satya Niketan campuses.
   - 6 photographs (`DIDM_June_Batch_Closing_by-Mr-Siddhartha-sir-in_Preet-Vihar-1.jpg` to `6.jpg`).

10. **`OriginalHiringPartners.tsx`**
    - "Companies That Love Our Students" placement partner logo strip.
    - Verified hiring brands: Amazon, Accenture, Flipkart, Dentsu, GroupM, Cognizant, etc.

11. **`OriginalInstitutionalPrograms.tsx`**
    - 3 Program pathways:
      1. Digital Marketing Course (Individual Learners)
      2. Educational Institution Program (Colleges & Universities)
      3. Corporate Training Program (Corporate Enterprises)
    - Authentic imagery (`corporate_training_program.jpg`, `college_program_by_didm.jpg`).

12. **`OriginalCareerClarity.tsx`**
    - "Still Confused...... ?? GET INSTANT CAREER CLARITY" high-contrast CTA section.
    - Triggers for Download Brochure, Start Free Demo, and Course Details.

---

## 5. Technical & Production Verification

- **Compilation & Type Safety:** `pnpm --filter web typecheck` passed with 0 errors.
- **Production Static Generation:** `pnpm --filter web build` generated all **1,091 pages** without errors.
- **Runtime Performance:** Production Next.js server operational at `http://localhost:3005`.
- **Database & Leads:** `/api/enquire` operational with MongoDB Atlas schema validation.
- **Hydration:** Zero React hydration warnings or mismatch issues.

---

## 6. Next Steps & Recommended Actions
1. **Homepage Client Review:** Share the local production build or staging preview with the client for final homepage sign-off.
2. **Sub-Page Alignment:** With the authentic DIDM design system now solidified on the homepage, apply the matching `Poppins` / `Open Sans` / `#b52828` design tokens across the remaining inner pages (About Us, Courses, Centres, Reviews, and Contact).



---

## 7. Reconstructed: Trainers & Trainee Reviews (`/trainers`)

**Source URL:** `https://www.didm.in/trainer`  
**Local Route:** `/trainers` (with 301 redirects for `/trainer` and `/trainee-reviews#trainee-reviews`)  
**Visual Reference Uploaded:** `media_1794482798890_f217dc00.jpg`  
**Desktop Parity Screenshot:** [reconstructed_trainers_1440.png](file:///Users/piyushkhurana/didm_official_website/docs/reconstructed_trainers_1440.png) (1440 x 12,617 px)  
**Mobile Parity Screenshot:** [reconstructed_trainers_390.png](file:///Users/piyushkhurana/didm_official_website/docs/reconstructed_trainers_390.png) (585 x 42,768 px)  

### 7.1 Sections Built & Implemented
1. **Hero Banner:** Full-width team photo in DIDM white t-shirts (`Digital Marketing Trainer in DIDM.jpg`) with breadcrumbs and badge.
2. **Pedagogy & Classroom Graphic:** Authentic classroom photo (`Digital Marketing Training in DIDM(1).jpg`) + `DIDM Trainers` original text + 3 stat highlights (8-15 yrs exp, 61.5k students, 100% practical spends).
3. **11 Verified Faculty Leads Grid:** All 11 trainer portraits (`Vaibhav Sharma`, `Anil Chander`, `Shoaib Ali`, `Kamal Mahanwal`, `Shivam Kumar Rai`, `Keshav Vatsa`, `Sourabh Chandra`, `Pankaj Sehgal`, `Divyansh Thakral`, `Mr Punit Agarwal`, `Sushant Yadav`) with branch tags, experience badges, domains, and individual enquiry CTAs.
4. **Red Wave Header & Ratings Scorecard:** Curved crimson banner with 4.9/5 stars, 1,450+ verified ratings, 92% 5-star breakdown, 61,500+ trained, 2,445+ batches.
5. **Testimonial Quotes Carousel:** Real alumni quotes (`Soumya Jay`, `Nancy Sharma`, `Sonam Aggarwal`, `Prateek Jain`, `Pranav Khanna`) with photo badges and star ratings.
6. **ALL 54 Authentic Placed Trainees (4-Column Grid):**
   - Downloaded all 54 authentic placement portrait images to `apps/web/public/images/didm/trainees/`.
   - Reconstructed exact source card structure: Photo + Student Name + Company Name + Designation Title + DIDM Student Rating Progress Bar (blue) + Student Performance Progress Bar (green) + 5 Gold Stars.
   - Real-time search by student, company, or designation.
   - Quick category filter tabs (All 54, SEO Specialists, Paid Ads, Social Media, Growth).
7. **Companies That Love Our Students:** 8 placement partner logos strip (`Amazon`, `Flipkart`, `Goibibo`, etc.).
8. **Attend Live Demo Class:** Red CTA banner with demo booking and direct helpline (`88005 05151`).

### 7.2 Site-Wide Bidirectional Cross-Linking
- **Navbar & Mega-Menu:** `ABOUT_DROPDOWN` links directly to `Our Trainers & Mentors` (`/trainers`) and `Trainee Reviews & Ratings` (`/trainers#trainee-reviews`).
- **About Us Page (`/about`):** Direct CTA buttons beneath the Visionaries & Leadership section leading to `/trainers` and `/trainers#trainee-reviews`.
- **Homepage (`/`):** `OriginalMasterMentors` section features a direct link to `/trainers`.
- **Stories Page (`/stories`):** Header and bottom CTA linking to `/trainers` ("Meet Faculty & Mentors").
- **Footer:** Directory links for `Faculty & Mentors Directory` and `Trainee Reviews & Ratings`.
- **Redirects:** 301 permanent redirects configured in `next.config.ts` for `/trainer` -> `/trainers` and `/trainee-reviews` -> `/trainers#trainee-reviews`.


---

## 8. Reconstructed: Advanced Digital Marketing Course (`/programs/advanced-digital-marketing-course`)

**Source URL:** `https://www.didm.in/advanced-digital-marketing-course`  
**Local Route:** `/programs/advanced-digital-marketing-course` (with 301 redirect from `/advanced-digital-marketing-course`)  
**Visual Reference Uploaded:** `media_1794484156083_ca46ebf5.png`  
**Desktop Parity Screenshot:** [reconstructed_advanced_course_1440.png](file:///Users/piyushkhurana/didm_official_website/docs/reconstructed_advanced_course_1440.png) (1440 x 9,946 px)  
**Mobile Parity Screenshot:** [reconstructed_advanced_course_390.png](file:///Users/piyushkhurana/didm_official_website/docs/reconstructed_advanced_course_390.png) (585 x 17,002 px)  
**Live Source Benchmark:** [original_advanced_course_1440.png](file:///Users/piyushkhurana/didm_official_website/docs/original_advanced_course_1440.png) (1440 x 11,568 px)  

### 8.1 Reconstructed Sections & Authentic Assets
1. **AI-Powered Top Banner:** Authentic source banner (`AI-Powered-Advanced-digital-marketing-course.png`) featuring real students holding DIDM diplomas.
2. **Page Header & Intro:** `<span style="color:#b52828;">Advanced </span>Digital Marketing Course` with original lead paragraph.
3. **Program Highlights (Interactive Tabs & Form):**
   - 6 Tabs: Overview, Core Modules, Program Duration, Live Projects, Certifications, Placement Cell.
   - Inline `Attend FREE Workshop` lead capture form with branch selection and validation.
4. **4 Feature Cards ("Advanced In Digital Marketing"):** Practical Live Training, Agency Floor Experience, 100% Placement Support, Recognized Certifications.
5. **15 Checkpoints Grid:** Key skills covered (SEO, PPC, SMM, GA4, Email, E-Commerce, Affiliate, ORM, Adsense, Video, Gen AI, Agency Capstone).
6. **Digital Marketing Course Comparison (3 Cards):**
   - MIDM (Master) Card: `Master Course Fees MIDM DIDM.webp` &bull; INR 58,410/-*
   - AIDM (Advanced - Featured) Card: `Advanced Course Fees AIMTP DIDM.webp` &bull; INR 52,250/-*
   - Customized Card: `Professional Course Fees Customized DIDM.webp` &bull; INR 22,125/-*
7. **Reasons To Choose DIDM & Student Feedback:**
   - 10+ Years Legacy, 61,500+ Students, ISO 9001:2015 Certified.
   - Authentic Graphic: `Student Feedback.jpg` (4.9 Stars & 7,000+ Google Reviews).
   - Red Form: `Take a free session today!!` with live lead submission.
8. **Who Can Join Us? (4 Cards):** College Freshers, Career Switchers, Business Owners, Freelancers.
9. **Interactive Training Course Module Viewer:** Interactive tabs covering Search, Paid PPC, Social Media, Analytics GA4, Email Automation, ORM, Affiliate & Adsense.
10. **Others Add-on Course Benefits (6 Cards):** Placement Support, Career Counselling, Interview Preparation, Free Tools & Software (Rs. 45,000/- value), Led By Industry Experts, Networking.
11. **Awards & Associations:** Media Associates (`media partner(1).jpg`), Education Associates (`education partner logo.jpg`), Agency Associates (`agency Logo.jpg`), ASSOCHAM & Justdial Banner (`assocham and justdial.jpg`).
12. **Hiring Partners & Course Fees Card:** Top recruiters logo grid (`student-logo.jpg`) + Program Course Fee box (`didm-course-fees.jpg` with INR 52,250/-* and 2-installment plan).
13. **Student Testimonial Quotes:** Soumya Jay, Nancy Sharma, Sonam Aggarwal quotes & 5 gold stars.
14. **DIDM Happy Faces:** 8 Convocation batch graduation photos (`DIDM_June_Batch_Closing_...`).
15. **Hiring Partner Logos Strip:** Amazon, Flipkart, Goibibo, Paytm, Zomato, etc.
16. **Comprehensive Course FAQ Accordion:** 13 authentic questions and detailed answers extracted from source DOM.
17. **Admissions Open Bottom CTA:** Free demo booking & phone helpline (`88005 05151`).


---

## 9. Reconstructed: Placement & Career Options (`/outcomes` & `/placement`)

**Source URL:** `https://www.didm.in/placement`  
**Local Route:** `/outcomes` (with 301 permanent redirect from `/placement` and `/placements`)  
**Visual Reference Uploaded:** `media_1794485034225_fb1a8a9b.jpg`  
**Desktop Parity Screenshot:** [reconstructed_placement_1440.png](file:///Users/piyushkhurana/didm_official_website/docs/reconstructed_placement_1440.png) (1440 x 13,257 px)  
**Mobile Parity Screenshot:** [reconstructed_placement_390.png](file:///Users/piyushkhurana/didm_official_website/docs/reconstructed_placement_390.png) (585 x 38,296 px)  
**Live Source Benchmark:** [original_placement_1440.png](file:///Users/piyushkhurana/didm_official_website/docs/original_placement_1440.png) (1440 x 13,170 px)  

### 9.1 Reconstructed Sections & Authentic Assets
1. **Hero Top Banner (15+ Career Options):** Authentic source banner (`DIGITAL MARKETING CAREER PLACEMENT IN DIDM.jpg`) featuring all 15 career option badges.
2. **Page Header & Stats:** `DIDM Digital Marketing Career` with `70,000+ Success Stories and 2500+ Batches Closed`.
3. **4 Steps Placement Process:**
   - Graphic: `PLACEMENT.png` (Steps 1, 2, 3, 4 circular flow).
   - 4 Explanatory Cards: Core Skill Mastery, Agency Internship, Portfolio & Mock Drills, Direct Corporate Placement.
4. **Placement Comparison Section (Market vs DIDM):**
   - Left Card: `Market Trends` (Missing placement cells, theoretical training, outdated syllabus).
   - Right Card (Featured Red): `DIDM Approach` (Dedicated HR cell, 650+ corporate tie-ups, live ad spends, INR 3.5 - 6.5 LPA packages).
5. **Training Approach Flow & Counselling Form:**
   - Flowchart: `trainingapproach.jpg` (visualizing student journey to placement).
   - Form: `Book Seat For Free Counselling` with instant validation.
6. **Trend Job Prospects:** Authentic infographic (`focused trainiign job(1).jpg`) showing salary progression and market demand.
7. **Who All Can Join (4 Cards):** For Fresher Students, For Working Professionals, For Business Owners, For Job Seekers.
8. **Why Join DIDM ? & Student Feedback:**
   - Graphic: `Student Feedback.jpg` (4.9 Stars, 7000+ Google Reviews).
   - Red Form: `Take a free session today!!`.
9. **Our Placed Students (ALL 54 AUTHENTIC CARDS):**
   - 4-Column responsive grid containing all 54 authentic placed alumni downloaded from source.
   - Search & category filter pills (All 54, SEO, Paid Ads, Social, Growth).
10. **450+ Placement Partners Strip:** Top hiring partners logo strip (Amazon, Flipkart, Goibibo, Paytm, Zomato, etc.).
11. **14 Physical Learning Centres Directory:** Direct links to all 14 campus pages across Delhi NCR, Mumbai, Dehradun & Online.
12. **Bottom CTA Banner:** Guaranteed interview drives & helpline (`88005 05151`).


---

## 10. Reconstructed: Online Digital Marketing Course (/programs/online-digital-marketing-course)

**Source URL:** https://www.didm.in/online-digital-marketing-course  
**Local Route:** /programs/online-digital-marketing-course (with 301 permanent redirect from /online-digital-marketing-course)  
**Visual Reference Uploaded:** media_1794485404031_31846281.jpg  
**Desktop Parity Screenshot:** [reconstructed_online_course_1440.png](file:///Users/piyushkhurana/didm_official_website/docs/reconstructed_online_course_1440.png) (1440 x 7,098 px)  
**Mobile Parity Screenshot:** [reconstructed_online_course_390.png](file:///Users/piyushkhurana/didm_official_website/docs/reconstructed_online_course_390.png) (585 x 12,467 px)  
**Live Source Benchmark:** [original_online_course_1440.png](file:///Users/piyushkhurana/didm_official_website/docs/original_online_course_1440.png) (1440 x 9,906 px)  

### 10.1 Reconstructed Sections & Authentic Assets
1. **Hero Top Banner:** Authentic source banner (Online Digital Marketing Course by DIDM.png) featuring online learning student with headphones + "Learn Anytime, Anywhere with India Best Online Digital Marketing Training!".
2. **Page Header & Intro:** Online Digital Marketing Course - DIDM with lead description.
3. **4 Feature Cards ("Online Training Advantages"):** Live Interactive Online, Virtual Agency Floor, 100% Placement Support, Global Certifications.
4. **15 Checkpoints Grid:** Key skills covered (SEO, PPC, SMM, GA4, Email, E-Commerce, Affiliate, ORM, Adsense, Video, Gen AI, Agency Capstone).
5. **Course Comparison - ONLINE (3 Pricing Cards):**
   - Online Advanced Course: didm online advanced course fees.webp - INR 33,630/-*
   - Online Master Course (Featured Red Border): didm online master course fees.webp - INR 57,230/-*
   - Online Customized Course: didm online professional course fees.webp - INR 20,650/-*
6. **Reasons To Choose DIDM Online & Red Form:**
   - Why Join DIDM? points + Authentic 4.9/5 Ratings & 7000+ Google Reviews graphic (Student Feedback.jpg).
   - Red Form: Take a free session today!! with live slot reservation.
7. **Who Can Join Us? (4 Cards):** College Students, Career Changers, Entrepreneurs, Remote Freelancers.
8. **Digital Marketing Training Course Module in Online:** Deep-dive interactive syllabus browser (SEO, Google Ads PPC, Meta Ads, GA4, Email, ORM, Affiliate, Adsense).
9. **Red Questions Banner:** "Still have questions? Call @7832-08-0808 for answers" & "GET 100% ASSURED PLACEMENT WITH TOP COMPANIES".
10. **DIDM Online Course Fees 3-Card Summary:**
    - Advanced Course: Rs 45,418/- (2 Instalments: Rs 48,958/-)
    - Master Course: Rs 57,218/- (2 Instalments: Rs 60,758/-)
    - Professional Course: Rs 20,671/- (2 Instalments: Rs 24,211/-)
11. **Online Upcoming Batches Details Table:**
    - Weekday Evening & Weekend Intensive schedules with hours, dates, timings, fees, and instant enrollment CTAs.
12. **Online Training FAQs:** Dedicated accordion addressing virtual lectures, LMS recordings, practical ad spends, and placements.
13. **Bottom CTA Banner:** Free live online demo booking & helpline (88005 05151).


---

## 11. Reconstructed: Campus Landing Pages & Rajouri Garden Branch Hub (`/centres/[slug]`)

**Source URL:** `https://www.didm.in/digital-marketing-course-in-rajouri-garden`  
**Local Route:** `/centres/rajouri-garden` (with 301 permanent redirect from `/digital-marketing-course-in-rajouri-garden`)  
**Visual Reference Uploaded:** `media_1794485904545_6e1f705e.png`  
**Desktop Parity Screenshot:** [reconstructed_rajouri_garden_1440.png](file:///Users/piyushkhurana/didm_official_website/docs/reconstructed_rajouri_garden_1440.png) (1440 x 9,292 px)  
**Mobile Parity Screenshot:** [reconstructed_rajouri_garden_390.png](file:///Users/piyushkhurana/didm_official_website/docs/reconstructed_rajouri_garden_390.png) (585 x 17,415 px)  
**Live Source Benchmark:** [original_rajouri_garden_1440.png](file:///Users/piyushkhurana/didm_official_website/docs/original_rajouri_garden_1440.png) (1440 x 13,184 px)  

### 11.1 Reconstructed Sections & Authentic Assets
1. **Top Crimson Hero Box:**
   - Deep DIDM Crimson background (`#800b0b` to `#a01616`) with golden `NOW IN DELHI` / region badge.
   - Massive uppercase heading (`RAJOURI GARDEN`), subtitle *"Best Digital Marketing Institute in Rajouri Garden Delhi with 100% Placement Support"*.
   - 3 verified bullet checkmarks: *100% Practical Course*, *100% Placement Assistance*, *50+ Modules & 30+ Certifications*.
   - Direct Call (`88005 05151`) & WhatsApp buttons.
   - Right-side white card: **"Get In Touch"** with Name, Email, Phone (10 digits), Campus Selector, Terms checkbox, and **"Book Seat For Free Counselling"** button.
2. **Course Overview Section:**
   - Heading: *Digital Marketing Course In Rajouri Garden* with red underline and authentic copy.
3. **Program Highlights (Left Tabs + Right Form):**
   - 6 Interactive Tabs: Overview, Core Modules, Duration, Live Projects, Certifications, Placement Cell.
   - Right-side card: **"Attend FREE Workshop"** with direct registration form.
4. **4 Feature Cards:**
   - Digital Marketing Course (50+ Modules, 500+ Hrs Training)
   - Special Session (Case Study Discussion, Dropshipping Concepts)
   - Tools & Software / LMS (Premium Tools/Themes, 24/7 LMS Access)
   - Live Projects Exposure (2 Months Live Internship, Practical Client Campaigns)
5. **Reasons To Join Digital Marketing Institute in Rajouri Garden (8 Cards):**
   - 100% Placement Assistance, Tool Based Learning, Proven Placement Record, Practical Learning, Industry Top Trainers, High-Quality Training, Live Practical Session, Flexible Batch Timings.
6. **Red Banner:** *100% Practical Training with Live Ad Spends*
7. **Digital Marketing Course Comparison (3 Pricing Cards):**
   - Advanced in Digital Marketing (AIDM): INR 52,250/-*
   - Master in Digital Marketing (MIDM - Featured Red Border): INR 58,410/-* (500+ Hours, 2 Months Internship, 100% Placement)
   - Customized Digital Marketing: INR 22,125/-*
8. **Reasons To Choose Master in Digital Marketing & Free Session Red Box:**
   - Breakdown of In-Class (140 hrs), LMS (Lifetime), and On-board (360 hrs) modules + target personas (Working Professionals, Business Owners, Job Seekers, Freelancers).
   - Right-side red lead form: *"Take a free session today!!"*.
9. **Student Ratings & Review Scorecard:**
   - 4.9 / 5 Stars based on 7,000+ Verified Google Reviews across all branches.
10. **Who Can Join Us? (4 Cards):**
    - Students & Job Seekers, Working Professionals, Entrepreneurs & Owners, Freelancers & Homemakers.
11. **Training Course Module in Rajouri Garden (Interactive Tabs):**
    - Email Marketing, Google AdWords / PPC, Online Reputation Management (ORM), Affiliate Marketing, Social Media Marketing, Search Engine Optimization (SEO), and Google AdSense.
    - Important course objectives and "Download Syllabus" CTA.
12. **Others add-on Course Benefits (6 Cards):**
    - Placement Support, LMS Access, Live Project & Internship, Backup Classes, Case Studies, Certification Prep.
13. **Awards & Associations Bar:**
    - ASSOCHAM Award for Best Digital Marketing Institute, Justdial 4.9/5 Rating, MSME Govt. Registered & ISO 9001:2015 Certification.
14. **Campus Location & Program Course Fee Box:**
    - Left side: Full Address (`A-13, 1st Floor, Near Metro Station Pillar 388, Rajouri Garden`), Nearest Metro (`Rajouri Garden Metro - Blue & Pink Line`), Phones, Email, and Google Map embed.
    - Right side: Fee card featuring `didm-course-fees.jpg`, Program Course Fee (`INR 68,661/-*`), 2 Easy Installments (`INR 72,201/-*`), and "Enroll Now" CTA.
15. **Upcoming Batches Table:**
    - Weekday & Weekend Cohort schedules with training hours, next batch dates, durations, fee details, and instant seat booking CTAs.
16. **Still Thinking!! Red Call Banner:** Direct helpline (`+91 - 88005 05151`).
17. **Students Happy Faces (Photo Gallery):**
    - 8 authentic downloaded graduation / batch closing photos from Rajouri Garden campus (`batch_closing_8.png` to `batch_closing_15.png`).
18. **450+ Placement Partners Logo Strip:** Amazon, Flipkart, Zomato, Swiggy, Paytm, MakeMyTrip, Accenture, Dentsu, GroupM, Ogilvy.
19. **Campus-Specific FAQs:** 10 comprehensive accordions addressing location, metro transit, fees, syllabus, batch timings, and job prospects.


---

## 12. Reconstructed: LIFE@DIDM (`/life-at-didm`)

**Source URL:** `https://www.didm.in/life-didm`  
**Local Route:** `/life-at-didm` (with 301 permanent redirect from `/life-didm`)  
**Visual Reference Uploaded:** `media_1794487127057_f2596388.jpg`  
**Desktop Parity Screenshot:** [reconstructed_life_didm_1440.png](file:///Users/piyushkhurana/didm_official_website/docs/reconstructed_life_didm_1440.png) (1440 x 5,212 px)  
**Mobile Parity Screenshot:** [reconstructed_life_didm_390.png](file:///Users/piyushkhurana/didm_official_website/docs/reconstructed_life_didm_390.png) (585 x 7,463 px)  
**Live Source Benchmark:** [original_life_didm_1440.png](file:///Users/piyushkhurana/didm_official_website/docs/original_life_didm_1440.png) (1440 x 3,014 px)  

### 12.1 Reconstructed Sections & Authentic Assets
1. **Top Hero Collage Banner:**
   - Full-width crimson collage image (`LifeofDIDM-2.webp`) showcasing authentic celebration moments of DIDM students, founders, and trainers.
2. **Page Title:**
   - `LIFE@DIDM` centered with authentic brand accent underline.
3. **Gallery 1: Campus Infrastructure & Branch Launches (8 Photos):**
   - High-resolution images of ribbon cuttings, executive boardrooms, student counseling desks, and computer training labs (`preet-vihar-1.jpg` through `preet-vihar-8.jpg`) + interactive "View More" expander.
4. **Gallery 2: Milestones & Institutional Honors (3 Featured Cards):**
   - Large format showcase of industry awards, educational conclaves, and graduation honors (`Life@DIDM-4.webp`, `Life@DIDM-3.webp`, `Life@DIDM-2.webp`).
5. **Gallery 3: Campus Events, Celebrations & Convocation (16 Photos):**
   - 4x4 responsive grid of festive events, cultural evenings, Diwali celebrations, farewell ceremonies, and alumni conclaves (`Life@DIDM39.jpg` down to `Life@DIDM24.jpg`).
6. **Gallery 4: Annual Trips, Vacations & Beach Outings (24 Photos):**
   - Goa beach tours, student resort pool parties, outbounds, and vacation moments (`491.jpg` to `421.jpg`, `391.jpg` to `351.jpg`, and `Life@DIDM20.jpg` to `Life@DIDM23.jpg`).
7. **Interactive Lightbox Feature:**
   - Click on any image to open full-screen lightbox with previous/next navigation, photo captions, and counters.
8. **Trending Blogs:**
   - 3 authentic career and training insights linking to DIDM knowledge base.
9. **Full Production Footer:**
   - Standard DIDM red footer with complete campus directories and social channels.


---

## 13. Reconstructed: 150+ Reasons to Join DIDM (`/why-choose-didm`)

**Source URL:** `https://www.didm.in/150-reasons-to-join-digital-marketing-course-didm`  
**Local Route:** `/why-choose-didm` (with 301 permanent redirects from `/150-reasons-to-join-digital-marketing-course-didm` and `/100-reasons-to-join-digital-marketing-course-didm`)  
**Visual References Uploaded:** `media_1794487758677_ca72d0c5.png` (Top half: 150 reasons list, lead form, stats) & `media_1794487758373_60bff412.jpg` (Bottom half: comparison cards, 9 centre cards, trending blogs)  
**Desktop Parity Screenshot:** [reconstructed_why_choose_didm_1440.png](file:///Users/piyushkhurana/didm_official_website/docs/reconstructed_why_choose_didm_1440.png) (1440 x 11,388 px)  
**Mobile Parity Screenshot:** [reconstructed_why_choose_didm_390.png](file:///Users/piyushkhurana/didm_official_website/docs/reconstructed_why_choose_didm_390.png) (585 x 19,338 px)  
**Live Source Benchmark:** [original_150_reasons_1440.png](file:///Users/piyushkhurana/didm_official_website/docs/original_150_reasons_1440.png) (1440 x 17,175 px)  

### 13.1 Reconstructed Sections & Authentic Assets
1. **Top Banner:**
   - Authentic GIF animation banner (`150_reasons_banner.gif`) with "150+ REASONS TO CHOOSE DIDM" branding.
2. **Page Heading & Subtitle:**
   - `JOIN OUR DIGITAL MARKETING TRAINING INSTITUTE FOR DIGITAL MARKETING COURSE`
   - `150+ Reasons to Join Digital Marketing Course - DIDM`
   - Subtitle: *"Don't work for money, Make it work for you" Join us !!!*
3. **All 151 Authentic Reasons Extracted & Searchable:**
   - Extracted directly from source HTML into `apps/web/src/data/didm-150-reasons.json`.
   - Real-time search filter and paginated "Load More" button.
4. **Sticky Lead Form & Promotional Sidebar:**
   - *Take a Free Class / Book Free Counselling* lead card with campus selector and instant callback reservation.
   - Quick Helpline card (`+91 88005 05151`).
   - Flagship *Master in Digital Marketing (MIDM)* showcase card.
5. **4 Performance Stats Circles:**
   - 95% Practical Training, 92% Placement Success, 98% Learner Satisfaction, 100% Placement Support.
6. **Curriculum Core 15 Checkpoints:**
   - SEO, Google Ads, SMM, Meta Ads, GA4 & GTM, Content Marketing, E-Commerce, Email Automation, Affiliate, ORM, Graphic Design, AdSense, Generative AI, Influencer, Capstone Defense.
7. **DIDM - Hybrid Digital Marketing Course (4 Course Cards):**
   - Master in Digital Marketing, Advanced in Digital Marketing, Professional in Digital Marketing, Online in Digital Marketing.
8. **Comparison Between All Courses (3 Pricing Cards):**
   - AIDM: INR 52,250/-* | MIDM: INR 58,410/-* | Customized: INR 22,125/-*.
9. **"From where you will get best Digital Marketing Course?" (9 Centre Cards Grid):**
   - Exact replica of the 3x3 directory from `media_1794487758373_60bff412.jpg`:
     - DIDM Dwarka (`#didmdwarka`)
     - DIDM Gurugram (`#didmgurugram`)
     - DIDM Kalkaji (`#didmkalkaji`)
     - DIDM Meerut (`#didmmeerut`)
     - DIDM Noida (`#didmnoida`)
     - DIDM Pitampura (`#didmpitampura`)
     - DIDM Preet Vihar (`#didmpreetvihar`)
     - DIDM South Campus (`#didmsouthcampus`)
     - DIDM Mumbai (`#didmmumbai`)
   - Each card contains verified branch address, direct helpline, official email, and a red "View More Details" button linking to the campus hub.
10. **Trending Blogs & Production Footer:**
    - 3 authentic blog articles and standard DIDM red footer with full site links.


---

## 14. Reconstructed: Students Happy Faces & Batch Images (\`/gallery\`)

**Source URL:** \`https://www.didm.in/digital-marketing-course-successful-batch-images\`  
**Local Route:** \`/gallery\` (with 301 permanent redirect from \`/digital-marketing-course-successful-batch-images\`)  
**Visual Reference Uploaded:** \`media_1794488361023_a98dc6cc.jpg\`  
**Desktop Parity Screenshot:** [reconstructed_batch_images_1440.png](file:///Users/piyushkhurana/didm_official_website/docs/reconstructed_batch_images_1440.png) (1440 x 10,242 px)  
**Mobile Parity Screenshot:** [reconstructed_batch_images_390.png](file:///Users/piyushkhurana/didm_official_website/docs/reconstructed_batch_images_390.png) (585 x 12,231 px)  
**Live Source Benchmark:** [original_batch_images_1440.png](file:///Users/piyushkhurana/didm_official_website/docs/original_batch_images_1440.png) (1440 x 7,679 px)  

### 14.1 Reconstructed Sections & Authentic Assets
1. **Top Convocation Hero Banner:**
   - Full-width hero collage image (\`successful_batches_hero.webp\`) featuring DIDM student convocation ceremonies across Delhi NCR.
2. **Page Header:**
   - \`Students Happy Faces\` centered with red accent underline.
   - Lead subtitle: *\"Our students are creating their paths of success and getting rewarded with successful job opportunities at prestigious platforms. Look at what our students have to say about their experience at DIDM\"*.
3. **Campus-Wise Filter Pills:**
   - One-click filter pills: *All Campuses*, *Dwarka*, *Gurugram*, *Kalkaji*, *Noida*, *Pitampura*, *Preet Vihar*, *Rajouri Garden*, and *Online Batches*.
4. **13 Sequential Batch Closing Galleries (8 Verified Photos Each):**
   - **Gallery 51:** Preet Vihar & Satya Niketan Batches (Closing by Siddhartha sir & Rakesh sir)
   - **Gallery 39:** Dwarka Campus Batches (Closing by Manmohan sir, Shashank sir & Ravi sir)
   - **Gallery 40:** Gurugram Campus Batches (Closing by Yogender sir)
   - **Gallery 41:** Kalkaji Campus Batches
   - **Gallery 45:** Noida Campus Batches
   - **Gallery 42:** Pitampura Campus Batches (Closing by Mukul sir)
   - **Gallery 44:** Meerut Campus Batches
   - **Gallery 46:** Rajouri Garden Campus Batches (Closing by Shivam sir)
   - **Gallery 47:** South Campus (Satya Niketan) Batches
   - **Gallery 48:** Online Live Interactive Cohorts
   - **Gallery 31:** Annual Convocation & Graduation Ceremony
   - **Gallery 30:** Corporate Executive Training Batches
   - **Gallery 32:** Campus Hackathons & Cultural Celebrations
   - Each group features an interactive red **\"View More\"** expander button!
5. **Interactive Fullscreen Lightbox:**
   - Clicking any photo opens a high-res lightbox with previous/next navigation and photo index counter.
6. **\"Let's Get Started\" CTA Section:**
   - *\"Are you ready to grow your business & enhance your skill set with DIDM?\"* with **`Book Seat For Free Counselling`** and direct helpline button (\`88005 05151\`).
7. **DIDM Review & Media Video Showcase:**
   - Embedded video review showcase with direct link to all 54+ verified trainee review profiles.
8. **Companies That Love Our Students (Placement Partners):**
   - Micromax, Flipkart, MakeMyTrip, Droom, Dentsu, GroupM, Ogilvy, Amazon, Zomato, Swiggy.
9. **Production Footer:**
   - Full DIDM red footer with all physical campus contact details.


---

## 15. Reconstructed: DIDM Official Journal / Newspaper Publication (`/digital-marketing-course-journal`)
- **Target URL:** `https://www.didm.in/digital-marketing-course-journal`
- **Implemented Route:** `apps/web/src/app/digital-marketing-course-journal/page.tsx`
- **SEO & Canonical Layout:** `apps/web/src/app/digital-marketing-course-journal/layout.tsx`
- **User Reference Image:** [media_1794489008858_0140b975.jpg](file:///Users/piyushkhurana/.gemini/antigravity/brain/4444d53b-8706-4e43-b68e-7efc61319117/.user_uploaded/media_1794489008858_0140b975.jpg)
- **Reconstructed Screenshot (Desktop 1440px):** [reconstructed_journal_1440.png](file:///Users/piyushkhurana/didm_official_website/docs/reconstructed_journal_1440.png) (1440 x 14,731 px)
- **Reconstructed Screenshot (Mobile 390px):** [reconstructed_journal_390.png](file:///Users/piyushkhurana/didm_official_website/docs/reconstructed_journal_390.png) (390 x 13,842 px)
- **Live Source Benchmark:** [original_journal_1440.png](file:///Users/piyushkhurana/didm_official_website/docs/original_journal_1440.png) (1440 x 12,963 px)

### 15.1 Reconstructed Sections & Authentic Assets
1. **Top Breadcrumb & Helpline Bar:**
   - `Home > Resources > DIDM Journal` with live indicator `Official Print Edition` and clickable call trigger (`+91 8800-505-151`).
2. **Page Headline matching Original:**
   - `<h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-[#2c3e50] tracking-tight">`
   - `India's 1st HYBRID Master Program in Digital Marketing`
   - Subtitle: *"Digital Marketing Course Journal will provide every detail that DIDM offers including its vision, mission, PAN-India campus network, conversion frameworks, trainee reviews, awards, and industry placement partners."*
3. **Interactive Quick Jump Bar:**
   - Fast navigation buttons: `Page 1`, `Page 2`, `Page 3`, `Page 4`, `Page 5`, `Page 6`, `Page 7`, `Page 8`.
4. **All 8 High-Resolution Newspaper Pages (300 DPI, 2550 x 3300 px each):**
   - **Page 1 (`newpaper1.jpg`):** India's 1st HYBRID Master Program in Digital Marketing — What is in the Store for You at Delhi Institute of Digital Marketing, Why DIDM? Infographic, Practical Learning Pedagogy.
   - **Page 2 (`newpaper_2.jpg`):** DIDM Across PAN India Branches — 10+ Branches Across PAN India (Satya Niketan HQ, Kalkaji, Pitampura, Preet Vihar, Dwarka, Noida, Gurgaon, Meerut), Vision & Mission statements.
   - **Page 3 (`didm_newspaper_3.jpg`):** Top 10 Digital Marketing Skills Most Valued by Recruiters — DIDM will guide you how to be the best at Digital Marketing (SEO, PPC, Content Marketing, Analytics, CRO, Strategy).
   - **Page 4 (`didm_newspaper_4.jpg`):** The Path Of Conversion Framework — Comprehensive conversion roadmap from impression capture to lead nurture and high-converting acquisition.
   - **Page 5 (`didm_newspaper_5.jpg`):** DIDM Success Stories & Reviews — Trainee quotes, salary hikes, and real agency testimonials.
   - **Page 6 (`didm_newspaper_6.jpg`):** Delhi Institute of Digital Marketing - Trainee Reviews — Trainee graduation mosaic with verified placements.
   - **Page 7 (`didm_newspaper_7.jpg`):** Top Digital Marketing Institute in Delhi-NCR — ASSOCHAM award recognition and Life at DIDM campus moments.
   - **Page 8 (`newspaper_8.jpg`):** Choose Your Master in Digital Marketing — 16+ Certifications (Google, Meta, Bing, HubSpot), "Companies That Love Our Students", and career pathways.
5. **Interactive Lightbox with Zoom Controls:**
   - Click any newspaper page to open full-resolution inspection modal with Zoom In (`+`), Zoom Out (`-`), Reset, Keyboard Navigation (`Left`/`Right` arrow keys, `Esc` to close), and High-Res Download.
6. **Editorial Summary Cards:**
   - Under each newspaper page, an editorial breakdown highlights key insights with red checkmarks.
7. **Trending Blogs Section:**
   - 3 authentic high-intent marketing articles with tags and read links matching DIDM's blog architecture.
8. **"Let Your Digital Career Begins Now...." Section:**
   - Exactly matches original section 5 of `digital-marketing-course-journal.html` with 3 prominent action cards:
     - **Talk to a Career Advisor** (Chat icon, "Talk to Advisor" modal trigger)
     - **Attend a Free Demo Session** (Laptop icon, "Registered for Free Demo" modal trigger)
     - **Apply Now** (Sparkle icon, "Enroll Now" direct link)
9. **Production Footer & Navigation:**
   - Updated `apps/web/src/config/site-navigation.ts` to include `DIDM Official Journal` in `RESOURCES_MEGA_MENU` and `FOOTER_COLUMNS`.


---

## 16. Reconstructed: 30+ Digital Marketing Certifications (`/certifications` / `/didm-certifications`)
- **Target URL:** `https://www.didm.in/didm-certifications`
- **Implemented Route:** `apps/web/src/app/certifications/page.tsx`
- **SEO & Canonical Layout:** `apps/web/src/app/certifications/layout.tsx`
- **User Reference Image:** [media_1794490010862_2bdc1082.jpg](file:///Users/piyushkhurana/.gemini/antigravity/brain/4444d53b-8706-4e43-b68e-7efc61319117/.user_uploaded/media_1794490010862_2bdc1082.jpg)
- **Reconstructed Screenshot (Desktop 1440px):** [reconstructed_certifications_1440.png](file:///Users/piyushkhurana/didm_official_website/docs/reconstructed_certifications_1440.png) (1440 x 4,371 px)
- **Reconstructed Screenshot (Mobile 390px):** [reconstructed_certifications_390.png](file:///Users/piyushkhurana/didm_official_website/docs/reconstructed_certifications_390.png) (390 x 4,210 px)
- **Live Source Benchmark:** [original_certifications_1440.png](file:///Users/piyushkhurana/didm_official_website/docs/original_certifications_1440.png) (1440 x 2,037 px)

### 16.1 Reconstructed Sections & Authentic Assets
1. **Top Breadcrumb & Helpline Bar:**
   - `Home > Resources > 30+ Certifications` with helpline `+91 8800-505-151`.
2. **Authentic Top Banner (GIF Animation):**
   - Source: `https://didm.in/assets/uploads/images/Digital_Marketing_Certification_DIDM.gif` (Local: `/images/didm/certifications/certification_banner.gif`).
   - "30+ DIGITAL MARKETING CERTIFICATIONS" with yellow stats ribbon (*70,000+ Success Stories*, *2,500+ Successful Batches*, *13,750+ Career Transitions*, *650+ Placement Partners*) and convocation graduation robes photo.
3. **Page Headline matching Original:**
   - `<h1 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">`
   - `<span class="text-[#c0392b]">30+ </span><span class="text-[#222222]">Digital Marketing Certification - </span><span class="text-[#c0392b]">DIDM</span>`
   - Subtitle: *"Earn globally recognized credentials from Google, Meta, SEMrush, HubSpot, and the DIDM Master Diploma to accelerate your digital career."*
   - Interactive *Expand All* / *Collapse All* controls.
4. **All 6 Certification Accordion Groups (32 Recognized Credentials):**
   - **Group 1: DIDM Certification (As per Course)** (DIDM Logo: `/images/didm/certifications/didm_logo.png`)
     1. Professional Course Diploma
     2. Advanced Course Diploma
     3. Master Course Diploma
   - **Group 2: 09 Google Certification** (Google Logo: `/images/didm/certifications/google_certificate.png`)
     1. Google Ads Measurement Certification
     2. AI-Powered Performance Ads Certification
     3. Google Ads Creative Certification
     4. Google Ads Search Certification
     5. Google Ads Display Certification
     6. AI-Powered Shopping Ads Certification
     7. Google Ads Video Certification
     8. Google Ads Apps Certification
     9. Google Analytics Certification
   - **Group 3: 04SEMrush Certification** (SEMrush Logo: `/images/didm/certifications/semrush_logo.png`)
     1. SEMrush SEO Fundamental
     2. SEMrush Local SEO
     3. SEMrush Mobile SEO
     4. SEMrush On-Page & Technical SEO
   - **Group 4: 11 Hubspot Certification** (HubSpot Logo: `/images/didm/certifications/hubspot_logo.png`)
     1. Hubspot SMO
     2. Hubspot SEO II
     3. Hubspot SEO
     4. Hubspot Digital Advertising
     5. Hubspot Ads
     6. Hubspot Email Marketing
     7. Hubspot Content Marketing
     8. Hubspot Inbound Marketing
     9. Hubspot Social Media Marketing
     10. Hubspot Digital Marketing
     11. Hubspot Social Media Marketing II
   - **Group 5: 02 Other Certification** (Ribbon Logo: `/images/didm/certifications/other_certification_logo.png`)
     1. Google Digital Unlocked
     2. Digital Garage
   - **Group 6: 03 Additional Certificates with Master Course** (Ribbon Logo: `/images/didm/certifications/other_certification_logo.png`)
     1. Experience Certificate - Online Strikers
     2. Creative Content Writing
     3. Graphic Designing
5. **"Still Confused...... ??" Section:**
   - Source-faithful replica of Section 5 in `didm-certifications.html`:
     - Left: `Still Confused...... ??` in prominent `#c0392b` and `GET INSTANT CAREER CLARITY` in bold dark typography.
     - Right: Two action buttons `Download Brochure` (with download icon) and `Start With Demo` (with play icon) opening the enquiry modal.
     - Bottom: `TRAINING DETAILS` button linking directly to `/programs/master-in-digital-marketing-course`.
6. **#Trending Blog Section:**
   - 3 high-intent marketing and certification career guides.
7. **Production Footer:**
   - Complete authentic red DIDM footer with all physical campus contact details.


---

## 17. Reconstructed: Corporate Training Program (`/corporate-training-program`)
- **Target URL:** `https://www.didm.in/corporate-training-program`
- **Implemented Route:** `apps/web/src/app/corporate-training-program/page.tsx`
- **SEO & Canonical Layout:** `apps/web/src/app/corporate-training-program/layout.tsx`
- **User Reference Image:** [media_1794490532977_cecea0f0.jpg](file:///Users/piyushkhurana/.gemini/antigravity/brain/4444d53b-8706-4e43-b68e-7efc61319117/.user_uploaded/media_1794490532977_cecea0f0.jpg)
- **Reconstructed Screenshot (Desktop 1440px):** [reconstructed_corporate_1440.png](file:///Users/piyushkhurana/didm_official_website/docs/reconstructed_corporate_1440.png) (1440 x 6,340 px)
- **Reconstructed Screenshot (Mobile 390px):** [reconstructed_corporate_390.png](file:///Users/piyushkhurana/didm_official_website/docs/reconstructed_corporate_390.png) (390 x 6,012 px)
- **Live Source Benchmark:** [original_corporate_1440.png](file:///Users/piyushkhurana/didm_official_website/docs/original_corporate_1440.png) (1440 x 5,390 px)

### 17.1 Reconstructed Sections & Authentic Assets
1. **Top Breadcrumb & Helpline Bar:**
   - `Home > Enterprise > Corporate Training Program` with phone `+91 8800-505-151`.
2. **Hero Section (`id="bannertextinner"`):**
   - Background image: `/images/didm/corporate/corporate_banner.jpg` with crimson gradient overlay.
   - Title: `CORPORATE TRAINING PROGRAM` (bold, white uppercase).
   - Subtitle: *"Learn how to build digital capabilities to scale and accelerate your business in this digital era."*
3. **DIDM Training Approach (Section 2):**
   - Central meeting table illustration (`/images/didm/corporate/corporate_approach_table.jpg`) with 6 people.
   - Surrounding 6 approach cards:
     - 1. **Assessment** — Requirements identification and skill gap analysis.
     - 2. **Customized Training** — Tailored around company ad budgets, stack, and niche.
     - 3. **Analyze & Final Assessment** — Pre-and-post cohort evaluations and ROI tracking.
     - 4. **Practical Approach** — 80% hands-on learning on live campaigns.
     - 5. **Branding & Marketing Support** — Direct brand uplift during training.
     - 6. **Target Goal** — Achieving in-house marketing self-sufficiency.
4. **Why Choose Us For Corporate Digital Training (Section 3):**
   - 8 Feature cards with circular red icons:
     - 1. Tailored Training Program
     - 2. Flextime Training Schedule
     - 3. 1:1 Mentor Training
     - 4. Result-Oriented Training
     - 5. Live Project & Case Studies
     - 6. Industry Experts Mentors
     - 7. Offline & Online Hybrid
     - 8. 30+ Certifications
5. **For Corporate & Startup (Section 4):**
   - *Left Card:* `corporate_talent.jpg` ("For Corporate - UP SKILL YOUR TALENT FORCE • Most Promising Brand Trusted by ASSOCHAM", with "Download Brochure" button).
   - *Right Card:* `association.jpg` ("For Business Associates - ADD OUR SKILL COURSES TO YOUR PORTFOLIO", links to `/organisations`).
   - *Right Bottom:* `entrepreneur_program.jpg` ("Digital Marketing Entrepreneur Training Program").
6. **Learning Expertise & Corporate Goal Lead Capture (Section 5):**
   - *Left Column:* `learn_outcome.jpg` with 6 detailed training outcome checkpoints.
   - *Right Column:* Prominent `CORPORATE GOAL !!!` crimson card with interactive enterprise lead capture form (Full Name, Phone, Work Email, Company, Team Size selector, and Specific Requirements).
7. **Partnership & Training Models (Section 6 & 7):**
   - 3 Delivery Models: **New-Hire Training**, **On-Boarding**, and **Continuous Skilling**.
8. **Trending Blogs (Section 8):**
   - 3 high-intent enterprise marketing and AI automation articles.
9. **FAQ Accordion (Section 9):**
   - All 10 authentic corporate training questions and answers with collapsible accordion functionality.
10. **Production Red Footer:**
    - Complete official DIDM footer with all 14 physical campus hubs.


---

## 18. Reconstructed: Colleges & University Sessions (`/colleges-and-university-session`)
- **Target URL:** `https://www.didm.in/colleges-and-university-session`
- **Implemented Route:** `apps/web/src/app/colleges-and-university-session/page.tsx`
- **SEO & Canonical Layout:** `apps/web/src/app/colleges-and-university-session/layout.tsx`
- **Structured Data:** `apps/web/src/data/didm-college-sessions.json` (36 Colleges & 169 verified session images)
- **User Reference Images:** [media_1794491078136_e3af9890.jpg](file:///Users/piyushkhurana/.gemini/antigravity/brain/4444d53b-8706-4e43-b68e-7efc61319117/.user_uploaded/media_1794491078136_e3af9890.jpg) & [media_1794491078898_cc86c33a.jpg](file:///Users/piyushkhurana/.gemini/antigravity/brain/4444d53b-8706-4e43-b68e-7efc61319117/.user_uploaded/media_1794491078898_cc86c33a.jpg)
- **Reconstructed Screenshot (Desktop 1440px):** [reconstructed_colleges_1440.png](file:///Users/piyushkhurana/didm_official_website/docs/reconstructed_colleges_1440.png) (1440 x 23,280 px)
- **Reconstructed Screenshot (Mobile 390px):** [reconstructed_colleges_390.png](file:///Users/piyushkhurana/didm_official_website/docs/reconstructed_colleges_390.png) (390 x 22,410 px)

### 18.1 Reconstructed Sections & Authentic Assets
1. **Top Breadcrumb & Helpline Bar:**
   - `Home > Enterprise > Colleges & Universities` with phone `+91 8800-505-151`.
2. **Hero Banner:**
   - Source: `https://didm.in/assets/upload/images/DIGITAL%20MARKETING%20COLLEGES%20AND%20UNIVERSITY%20SESSION%20BY%20DIDM.png` (Local: `/images/didm/colleges/colleges_banner.png`).
3. **5 Years Career Projection Section:**
   - Graph graphic: `growth_chart_2030.webp` showing Digital Marketing vs Conventional Media demand through 2030.
   - Strategic breakdown of digital labs, guest masterclasses, and convocation certifications.
4. **Interactive Search & Filter Toolbar:**
   - Live real-time filter across all 36 premier university campuses and college descriptions.
5. **36 Sequential College Seminar Galleries (169 Photos):**
   - Including *Thakur Jagdev Chand Memorial Govt. Degree College*, *IDEAL Institute of Management and Technology*, *Subharti University Meerut*, *MERI College Janakpuri*, *GL Bajaj Institute of Technology*, *VIPS College (IP University)*, *Banarsidas Chandiwala (BCIHMCT)*, *Rajiv Academy*, *TIEM Delhi*, *SGTBIMIT*, *LLDIMS*, *BFIT Dehradun*, *Uttaranchal University*, *JIMS Kalkaji*, *CVS College (Delhi University)*, *Jesus & Mary College*, etc.
   - Each college session features a red **"View More"** pill button, comprehensive event report, 4-to-8 photo mosaic, and full-screen lightbox zoom!
6. **DIDM Approach & Advantages:**
   - Photo: `curriculum_approach.jpg` detailing classroom and lab methodologies.
7. **Why DIDM ? (8 Feature Cards):**
   - Customized Training, Experienced Mentors, Practical Live Projects, 30+ Certifications, LMS Portal, 100% Placement, AI Prompting, and 14+ PAN India Hubs.
8. **For Educational Institution (2 Feature Banners):**
   - High-res partnership graphics `education_1.jpg` and `education_2.jpg`.
9. **Lets Start Work Together..... (Institutional Partnership Form):**
   - Left side: `didm_college_seminar.png`.
   - Right side: College collaboration form with College Name, Coordinator Name, Phone, Email, City, Session Type selector (Digital Udaan, Bootcamp, MOU), and Expected Student Strength.
10. **FAQ Accordion:**
    - 5 Official university collaboration questions regarding stream eligibility, course duration, modules, and career pathways.
11. **Production Red Footer:**
    - Full official DIDM footer with all 14 physical campus hubs.


---

## 19. Reconstructed: Contact Us & Campus Directory (`/contact` / `/contact-us`)
- **Target URL:** `https://www.didm.in/contact-us`
- **Implemented Route:** `apps/web/src/app/contact/page.tsx`
- **SEO & Canonical Layout:** `apps/web/src/app/contact/layout.tsx`
- **Campus Data JSON:** `apps/web/src/data/didm-campuses-contact.json` (14 Campuses with verified addresses, phone numbers, and maps)
- **User Reference Image:** [media_1794499367443_ac73fb31.jpg](file:///Users/piyushkhurana/.gemini/antigravity/brain/4444d53b-8706-4e43-b68e-7efc61319117/.user_uploaded/media_1794499367443_ac73fb31.jpg)
- **Reconstructed Screenshot (Desktop 1440px):** [reconstructed_contact_1440.png](file:///Users/piyushkhurana/didm_official_website/docs/reconstructed_contact_1440.png) (1440 x 3,868 px)
- **Reconstructed Screenshot (Mobile 390px):** [reconstructed_contact_390.png](file:///Users/piyushkhurana/didm_official_website/docs/reconstructed_contact_390.png) (390 x 5,745 px)
- **Live Source Benchmark:** [original_contact_1440.png](file:///Users/piyushkhurana/didm_official_website/docs/original_contact_1440.png) (1440 x 3,749 px)

### 19.1 Reconstructed Sections & Authentic Assets
1. **Top Breadcrumb & Helpline Bar:**
   - `Home > Contact Us` with direct email link `info@didm.in` and phone `+91 8800-505-151`.
2. **Authentic Hero Banner:**
   - Downloaded from source: `https://didm.in/assets/uploads/images/Content-us-banner.png` (Local: `/images/didm/contact/contact_banner.png`).
   - 1888 x 560 px high-res graphic featuring `CONTACT US`, 4 contact method pills (*CALL US*, *EMAIL US*, *WHATSAPP*, *VISIT US*), *GET IN TOUCH WITH US* button, branch pins map, customer care representative with headset, and 4 bottom trust badges (*Dedicated Support*, *Quick Response*, *Expert Team*, *Always Free Advice*).
3. **More Segment Section:**
   - 3 White quick-navigation cards:
     - 1. **Corporate Training** (Icon: Presentation, links to `/corporate-training-program`)
     - 2. **College | University** (Icon: GraduationCap, links to `/colleges-and-university-session`)
     - 3. **150+ Reasons to Choose DIDM** (Icon: Lightbulb, links to `/why-choose-didm`)
4. **Map Your Career with DIDM Section:**
   - *Left Column:* Embedded interactive Google Map of DIDM National Head Office (Plot No-12, 3rd Floor, Satya Niketan, South Delhi).
   - *Right Column:* Crimson lead capture card `Book Seat For Free Counselling (Speak To Our Specialist: +91 - 8800505151)` with Full Name, Phone, Email, Choose Center Near You dropdown (14 campuses), Terms of Use agreement, and *Submit Your Request* button.
5. **Campus Directory Cards (All 14 Verified Hubs):**
   - 4-Column responsive grid matching `media_1794499367443_ac73fb31.jpg`:
     1. **Dwarka:** E-557, 2nd Floor, Opp. Goyal sons, Near Ramphal Chawk, Sector-7, New Delhi-110077 | Call @ 08383883621
     2. **Gurugram:** M-41, 2nd floor, Old DLF Colony, Sector-14, Opp. Krishna Mandir, Gurgaon | Call @ 08882366802
     3. **Kalkaji:** B-49ab, 1st floor Kalkaji Hansraj Sethi Marg, Near Nehru Enclave Metro | Call @ 08383884348
     4. **Noida:** S-2, 2nd Floor, Savitri Market, Sector-18, Noida, UP-201301 | Call @ 08447222054
     5. **Pitampura:** FD-3, 3rd Floor, Near Pitampura Metro Station, North Delhi-110034 | Call @ 08700848059
     6. **Preet Vihar:** Plot No. 4, 1st Floor, Above Prince Diamond, Vikas Marg (Metro Pillar 100) | Call @ 09355678822
     7. **Rajouri Garden:** A-13, 1st Floor, Near Metro Station (Metro Pillar 388) | Call @ 09910881009
     8. **South Campus:** Plot No-12, 3rd Floor, Satya Niketan, Opp. Venkateshwara College | Call @ 08287517947
     9. **South Extension:** K-16, 2nd Floor South Extension - I, New Delhi-110049 | Call @ 09266159115
     10. **Haldwani:** 1st Floor, Sanwal Plaza, Durga City centre, Above Reliance Trends Footwear | Call @ +91-7500028400
     11. **Mumbai:** C/o B.A.G Films & Media Ltd, 3rd Floor, Anjani Complex, Andheri East | Helpline: +91-08800505151
     12. **Dehradun:** Khasra no. 1019, Shiv Kripa Tower, 2nd Floor GMS Road, Kanwali | Call @ 09266159113
     13. **Varanasi:** 2nd Floor, Sri Sai Complex, Near Spencer, Sigra, Varanasi | Helpline: +91-9956660029
     14. **DIDM Online:** Satya Niketan HQ | Helpline: +91-07832080808
   - Every card includes address, Call number, Central Helpline (`+91 8800505151`), Email (`info@didm.in`), and a red **"Get Direction"** button opening Google Maps directions.
6. **Production Red Footer:**
   - Complete official DIDM footer with all physical campus contact details.

---

## 20. Reconstructed: Careers Page (`/careers`)
- **Reference Image:** `media_1794500077029_6faa208e.jpg`
- **Target URL:** `https://www.didm.in/careers`
- **Reconstruction Target:** `apps/web/src/app/careers/page.tsx` & `apps/web/src/app/careers/layout.tsx`
- **Verified Production Screenshots:**
  - Desktop (1440 x 3,456 px): `docs/reconstructed_careers_1440.png`
  - Mobile (585 x 5,363 px): `docs/reconstructed_careers_390.png`

### 20.1 Reconstructed Sections & Authentic Assets
1. **Top Hero Header:**
   - Heading: `It's Not Just A Team - It's a Family` (black text with crimson `#c0392b` highlights)
   - Subheading: `TRANSFORM YOUR WORLD`
   - Motto: `"Go Digital | Go Global"`
2. **Row 1 — Culture Photo & Career Opportunities:**
   - *Left Column (Image):* Authentic downloaded celebration photo `/images/didm/careers/career_global_1.jpg` (274 KB, team birthday cake cutting).
   - *Right Column (Crimson Card `#b52828`):*
     - Subtitle: `DIDM`
     - Heading: `Career Opportunities`
     - Authentic copy: *"Do you feel yourself dragging into your workplace everyday and hate being at some boring office with same 9 to 5 schedule? Do you feel that you were probably born to be some sort of big names at digital marketing industry? Here is a chance to believe in your dreams and to achieve it by applying for the post which suits you the most. DIDM is probably one of the best workplaces where human talents are valued more than anything and everything else. Apply Now !"*
     - Overlapping White Badge: `12 Years of Experienced` (with `#b52828` bold text and shadow).
3. **Row 2 — Talent Philosophy & Campus Team:**
   - *Left Column (Crimson Card `#b52828`):*
     - Heading: `WHAT WE ARE LOOKING FOR....`
     - Authentic copy: *"WE HAVE AN INCREDIBLY HIGH BAR FOR TALENT. WE ARE LOOKING FOR NOTHING SHORT OF AN INCREDIBLY TALENTED, SELF MOTIVATED AND WHO IS PASSIONATE ABOUT THEIR WORK & HELPING US CONTINUE TO BUILD AND FOLLOW DIDM COMMUNITY."*
   - *Right Column (Image):* Authentic downloaded group photo `/images/didm/careers/looking.jpg` (117 KB, employees outside building).
4. **Row 3 — Evening Event & Opening Positions:**
   - *Left Column (Image):* Authentic downloaded evening party photo `/images/didm/careers/career_world.jpg` (328 KB, team celebration event).
   - *Right Column (Crimson Card `#b52828`):*
     - Subtitle: `DIDM`
     - Heading: `Opening Position`
     - Authentic Position Bullets:
       - Branch Manager
       - Team Leader
       - Sales Consultant
       - Admin Support
       - Digital Marketing Trainers
5. **Row 4 — Job Application Lead Form & Female Faculty:**
   - *Left Column (Crimson Card `#b52828`):*
     - Subtitle: `Apply For Joining DIDM Here`
     - Heading: `Fill The Application`
     - Interactive form fields:
       - Full Name (with User icon)
       - Phone (with Phone icon)
       - Email (with Mail icon)
       - Campus selector dropdown with 16 options (`Dwarka`, `Gurgaon`, `Kalkaji`, `Noida`, `Preet Vihar`, `Rajouri Garden`, `Satya Niketan`, `Pitampura`, `South Ex`, `Dehradun`, `Haldwani`, `Mumbai`, `Meerut`, `Jaipur`, `Varanasi`, `Online`)
       - Checkbox agreeing to DIDM Terms of Use & Privacy Policy
       - Submit button: `Submit Your Request`
       - Instant visual submission feedback confirmation.
   - *Right Column (Image):* Authentic downloaded group photo `/images/didm/careers/applyform.jpg` (254 KB, female faculty and staff team).
6. **Bottom Clarity Action Bar:**
   - Left:
     - `Excited Now......` (46px bold crimson `#c0392b` font)
     - `GET INSTANT CAREER OPPORTUNITIES....` (bold dark font)
   - Right: 3 Action Buttons:
     - `ABOUT US` (links to `/about`)
     - `CURRICULUM` (links to `/programs/master-in-digital-marketing-course`)
     - `APPLY NOW` (smoothly scrolls to application form)
7. **Production Red Footer:**
   - Authentic DIDM crimson footer with campus directories, business hours, important links, and head office coordinates.

---

## 21. Reconstructed: News and Events (`/news-and-events`)
- **Reference Image:** `media_1794500758841_39fb0aef.jpg`
- **Target URL:** `https://www.didm.in/news-and-events`
- **Reconstruction Target:** `apps/web/src/app/news-and-events/page.tsx` & `apps/web/src/app/news-and-events/layout.tsx`
- **Verified Production Screenshots:**
  - Desktop (1440 x 4,306 px): `docs/reconstructed_news_events_1440.png`
  - Mobile (585 x 11,370 px): `docs/reconstructed_news_events_390.png`
  - Live Source Benchmark: `docs/original_news_events_1440.png`

### 21.1 Reconstructed Sections & Authentic Assets
1. **Header & Context:**
   - Centered Title: `News and` `<span style="color: #c0392b;"> Event</span>`
   - Top Breadcrumb on Right: `Home > News & Events`
2. **Dual Pagination Bar (Top & Bottom):**
   - Exact replica of live site pagination: `1 2 3 > Last ›`
   - Active page highlighted in bold `#b52828` with direct client-side state switching across the complete 503-article institutional archive.
3. **3-Column Article Card Grid (18 Authentic Articles per Page):**
   - High-fidelity card elevation (`shadow-[0_2px_15px_rgba(0,0,0,0.08)]`), rounded corners, clean white card surface on `#f7f7f7` background.
   - 270px cover image container with hover zoom animation.
   - 18 authentic downloaded news cover photos in `apps/web/public/images/didm/news/`:
     1. *Ganesh Chaturthi: Celebrating Faith, New Beginnings and the Spirit of Togetherness* (`500x4005.jpg`)
     2. *Mastering E-Commerce Growth: Inside DIDM’s* (`500x4004.jpg`)
     3. *Exclusive Masterclass on BEYOND DIGITAL – AI Mastery Session* (`5004.jpg`)
     4. *Teachers’ Day: Celebrating the People Who Help Us Find Our Way* (`5003.jpg`)
     5. *Janmashtami: Celebrating the Birth of Lord Krishna with Love, Faith and Joy* (`500-400.jpg`)
     6. *Raksha Bandhan: A Celebration of the Bond That Grows Stronger with Time* (`500x4003.jpg`)
     7. *Happy Independence Day 2026: Celebrating 80 Years of Freedom, Unity & the Spirit of a New India* (`500x4002.jpg`)
     8. *DIDM Earns Prestigious Recognition in The Economic Times Changemakers for Driving AI-Powered Digital Education* (`500x4001.jpg`)
     9. *DIDM Convocation Ceremony – July 2026: Celebrating Every Dream That Turned Into Reality* (`5007.png`)
     10. *DIDM’s Diploma in Digital Marketing Intelligence (DMI) Earns National Media Recognition* (`DIDM-in-google-news-5003.jpg`)
     11. *DIDM Extends Warm Wishes on Eid al-Adha* (`500-400.png`)
     12. *8 Years Strong – Preet Vihar 2.0 Begins a New Chapter* (`5006.png`)
     13. *DIDM & Rajiv Academy for Technology & Management Join Hands for Future-Ready Digital Education* (`5005.png`)
     14. *Happy Baisakhi 2026: Celebrating Harvest, Hope & New Beginnings* (`baisakhi-500.png`)
     15. *Celebrating the Legacy of Dr. B.R. Ambedkar – Ambedkar Jayanti 2026* (`Ambedkar-Jayanti--500.png`)
     16. *DIDM Convocation Ceremony 2026: A Day That Marked New Beginnings* (`5004.png`)
     17. *Highlights from the DIDM Convocation Ceremony 2026* (`5003.png`)
     18. *DIDM Wins “Best Digital Marketing Training Company”* (`Final500.png`)
   - Bold 2-line title linking to `/news-and-events/[slug]`.
   - 3-line excerpt summary with proper truncation.
   - Solid crimson `#b52828` `Read more` button linking directly to the full press release.
4. **Production Footer:**
   - Official DIDM crimson footer with campus directories, business hours, important links, and head office coordinates.

---

## 22. Reconstructed: DIDM Media Coverage & Achievements (`/media-coverage` / `/didm-media-coverage`)
- **Reference Image:** `media_1794501496971_748a0990.jpg`
- **Target URL:** `https://www.didm.in/didm-media-coverage`
- **Reconstruction Target:** `apps/web/src/app/media-coverage/page.tsx` & `apps/web/src/app/media-coverage/layout.tsx`
- **Verified Production Screenshots:**
  - Desktop (1440 x 7,552 px): `docs/reconstructed_media_coverage_1440.png`
  - Mobile (585 x 11,985 px): `docs/reconstructed_media_coverage_390.png`
  - Live Source Benchmark (1440 x 7,849 px): `docs/original_media_coverage_1440.png`

### 22.1 Reconstructed Sections & Authentic Assets
1. **Top Banner:**
   - Authentic downloaded full-width header graphic `/images/didm/media/trending_news_coverage.jpg` (423 KB) featuring *MASTER IN DIGITAL MARKETING COURSE* credentials and vibrant *TRENDING NEWS* world map gradient.
2. **Main Page Title:**
   - Heading: `"Delhi Institute of Digital Marketing - DIDM Media Coverage & Achievements"` (with `DIDM` in brand crimson `#c0392b`).
3. **Section 1: Trending News — Noida Education Conclave Award 2026:**
   - Heading: `Noida Education Conclave Award 2026` (with `Trending News` red tag).
   - Official felicitation by Shri Yogendra Upadhyay, Minister for Higher Education, Uttar Pradesh, recognizing DIDM as the "Best Digital Marketing Training Company".
   - Left Main Card: Large stage photo `/images/didm/media/noida_education_conclave_award_2026..webp` with title, subtitle, and `More About News ›` button.
   - Right Grid: 4 high-res event photos in a 2x2 grid.
4. **Section 2: For the 3rd Time, DIDM Wins the ASSOCHAM Award!:**
   - Subtitle: `9th MSME Excellence Award by ASSOCHAM`.
   - Authentic narrative celebrating DIDM's 3rd consecutive ASSOCHAM honour.
   - Left Main Card: `/images/didm/media/didm_receives_assocham_award_for_third_time.webp` (`9th MSME EXCELLENCE AWARDS BY ASSOCHAM`).
   - Right Grid: 3 high-res award ceremony photos.
5. **Section 3: Fair Business Practices Award by ASSOCHAM:**
   - Subtitle: `8th MSME Excellence Awards by ASSOCHAM`.
   - Conclave ceremony at Taj Mahal Hotel, New Delhi, presented by Minister of State, Ministry of MSME, Govt. of India.
   - Left Main Card: `/images/didm/media/msme_award_didm.jpg` (`8th MSME FAIR BUSINESS PRACTICES BY ASSOCHAM`).
   - Right Grid: 3 high-res ceremony photos.
6. **Section 4: National Press Coverage Cards (4-Column Responsive Row):**
   - 4 authentic newspaper clippings showcasing Business Standard and national daily coverage.
7. **Section 5: International Fame Awards 2021 & WASME Awards:**
   - **IFA Awards:** Presented by Bollywood actor Sonu Sood celebrating DIDM as the Best Digital Marketing Training Company. Main card: `/images/didm/media/ifa_award_sonu_sood_2021.jpg` + 3 photo gallery.
   - **WASME SME Excellence Awards:** Scope Convention Complex, Lodhi Road, New Delhi. Main card: `/images/didm/media/didm_wasme_seme_excellence_award_2021.jpg` + 3 photo gallery.
8. **Section 6: Most Promising Brand Award by ASSOCHAM (6th SME Awards 2018):**
   - Recognition competing against 200+ digital companies.
   - Main card: `/images/didm/media/didm_receives_most_promising_brand_award.webp` + 3 photo gallery.
9. **Section 7: Media News Highlights + Free Session Lead Capture:**
   - *Left Column:* `MEDIA NEWS` card (`/images/didm/media/media_news.png`) listing features in Business Standard, The Economic Times, Dainik Jagran, and Zee News with a `View More Press Releases` button.
   - *Right Column:* Crimson lead capture card (`Take a free session today!!`) with Full Name, Phone, Email, 16-campus dropdown selector, and `Submit Your Request` button with live submission confirmation.
10. **Section 8: OTHER AWARDS & RECOGNITIONS Showcase:**
    - Left Column: Large official ASSOCHAM Certificate `/images/didm/media/didm_assocham_certificate.webp` (`'Most Promising Digital Marketing Institute of 2018' - ASSOCHAM`).
    - Right Column (2x2 Grid): JustDial Top Rated Award, JIMS Excellence Certificate, Franchise Batao Award, and SSB News Recognition.
11. **Interactive Fullscreen Lightbox Modal:**
    - Clicking any photo or certificate opens an enlarged high-resolution view with smooth backdrop dismissal.
12. **Production Red Footer:**
    - Official DIDM crimson footer with campus directories, business hours, important links, and head office coordinates.




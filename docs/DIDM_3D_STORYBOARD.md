# DIDM — 3D SCROLL STORYBOARD & NARRATIVE ARCHITECTURE
**Document ID:** `DOC-DIDM-3D-STORYBOARD-2026-V1`  
**Date:** November 13, 2026  
**Status:** Approved for Implementation  
**Theme:** "DIDM — Every Scroll Unlocks a New Possibility"  

---

## 1. Primary Signature Experience: The 3D Digital Marketing Book

**Section:** Homepage — Immediately following the Hero Billboard.  
**Concept:** A student opens the comprehensive DIDM Master curriculum. With each scroll increment, the physical book transforms, turning pages with lifelike curvature and revealing verified training disciplines.

```
       SCROLL PROGRESS (0.00 to 1.00)
┌────────────────────────────────────────────────────────────────────────┐
│ 0.00 - 0.20 : Scene 1 — Discover (Book Closed, Elegant 3D Angle)       │
│ 0.20 - 0.45 : Scene 2 — The Book Opens (Front Cover Hinge -180°)       │
│ 0.45 - 0.70 : Scene 3 — First Page Turn (Curved Paper Lift & Peel)     │
│ 0.70 - 0.90 : Scene 4 — Second Page Turn (AI & Analytics Spread)       │
│ 0.90 - 1.00 : Scene 5 — From Theory to Practice (Settle & Real CTAs)   │
└────────────────────────────────────────────────────────────────────────┘
```

### Detailed Frame Breakdown

#### Frame 1: Discover (Scroll 0.00 – 0.20)
- **3D Visual State:**
  - Hardcover book rests closed on a warm studio surface at a dynamic 25° yaw and 15° pitch.
  - Deep crimson buckram/leather material (`#871717`) with beveled edges and visible paper stack thickness (24mm).
  - Embossed gold foil typography on front cover:
    - DIDM Crest with Laurel Wreath
    - "DELHI INSTITUTE OF DIGITAL MARKETING"
    - "EST. 2014 • 10 YEARS OF ACADEMIC EXCELLENCE"
    - "MASTER IN DIGITAL MARKETING — 52 MODULE ROADMAP"
  - Key studio light creates a soft gradient sheen across the crimson cover with realistic contact shadow beneath the spine.
- **Accompanying Semantic HTML:**
  - Eyebrow: `ACADEMIC EXCELLENCE • EST. 2014`
  - Headline: `Your Journey Into Digital Marketing Starts Here`
  - Body: *"Scroll to open the official curriculum handbook. Discover 52 in-depth practical modules, Google & MSME certifications, and live agency campaign simulations."*
  - Interaction Hint: *"Scroll to Open the Book"* with subtle downward animated chevron.

#### Frame 2: The Book Opens (Scroll 0.20 – 0.45)
- **3D Visual State:**
  - Front cover rotates on its left spine hinge from $0^\circ$ to $-180^\circ$ flat to the left.
  - The left inside cover features the DIDM institutional seal and ISO 9001:2015 / MSME / ASSOCHAM credentials.
  - The right page displays Spread 1:
    - **Chapter 1: The Foundations of Modern Digital Strategy**
    - Overview of Digital Marketing architecture, consumer journey funnels, market research, and audience segmentation.
- **Accompanying Semantic HTML:**
  - Eyebrow: `CHAPTER 01 • FOUNDATIONAL STRATEGY`
  - Headline: `Master the Complete Digital Ecosystem`
  - Body: *"Understand the architecture of digital business: from organic search discovery to paid acquisition funnels and brand building."*
  - Live Module Counter: `Modules 01 - 12 • 100% Practical Exposure`

#### Frame 3: First Page Turn (Scroll 0.45 – 0.70)
- **3D Visual State:**
  - A realistic ivory paper page lifts dynamically from the right side of the book.
  - The page bends along an authentic parabolic curve ($S$-curve curvature), peeling upward and rotating across the center spine axis.
  - As the page settles onto the left stack, Spread 2 is revealed:
    - **Chapter 2: Performance Marketing & Search Engine Excellence**
    - High-fidelity diagrams: Google Ads Search Architecture, Keyword Planner Matrix, Meta Ads Manager Campaign Structure, and Organic SEO On-Page/Off-Page algorithms.
- **Accompanying Semantic HTML:**
  - Eyebrow: `CHAPTER 02 • PERFORMANCE & SEARCH`
  - Headline: `Scale Campaigns with Live Ad Budgets`
  - Body: *"Manage live Google Ads and Meta budgets directly on agency floors. Learn bidding strategies, Quality Score optimization, conversion tracking, and remarketing funnels."*
  - Key Certifications: Google Ads Search, Display, Video, Meta Certified Media Buying Professional.

#### Frame 4: Second Page Turn (Scroll 0.70 – 0.90)
- **3D Visual State:**
  - A second ivory page lifts from the right, flexing gracefully across the spine to the left stack.
  - Spread 3 is revealed:
    - **Chapter 3: Generative AI Automation & Web Analytics**
    - High-fidelity diagrams: GA4 Event-Driven Measurement Model, Google Tag Manager dataLayer pipelines, AI Prompt Engineering frameworks, and Automated Creative Workflows.
- **Accompanying Semantic HTML:**
  - Eyebrow: `CHAPTER 03 • AI & MARKETING ANALYTICS`
  - Headline: `The Future of Marketing is AI-Driven & Data-Backed`
  - Body: *"Harness AI tools to 10x your campaign output. Master Google Analytics 4, heatmaps, cohort analysis, and automated attribution modeling."*
  - Key Tools: ChatGPT Plus, Midjourney, Claude 3.5 Sonnet, GA4, Looker Studio.

#### Frame 5: From Learning to Practice & CTA (Scroll 0.90 – 1.00)
- **3D Visual State:**
  - The book settles at an inviting reading perspective with soft warm studio rim lighting.
  - Realistic bookmark ribbon rests naturally across the page spread.
- **Accompanying Semantic HTML:**
  - Eyebrow: `ACADEMIC DIPLOMA • 100% PLACEMENT ASSISTANCE`
  - Headline: `Step From Learning Into Your Professional Career`
  - Body: *"Join 70,000+ successful alumni across 14+ campuses in Delhi NCR and India. 500+ hiring partners actively recruiting DIDM graduates."*
  - Primary Action Button: `Explore 52-Module Master Program` (Links to `/programs/master-in-digital-marketing-course`)
  - Secondary Action Button: `Book Free Trial Class` (Opens immediate admission enquiry modal)

---

## 2. Supporting Signature Experience: The 3D Admission Folder

**Section:** Homepage — Immediately preceding Career Clarity / FAQ.  
**Concept:** A student admissions folder in crimson buckram with gold tab. Opens gracefully on scroll, gently raising the application checklist sheet, while revealing the fully functional HTML lead enquiry form.

```
       ADMISSION FOLDER STORYBOARD
┌────────────────────────────────────────────────────────────────────────┐
│ Stage A: Closed crimson folder with "DIDM ADMISSION DOSSIER 2026"       │
│ Stage B: Cover hinge opens upward/left (-120°)                         │
│ Stage C: Official Application Sheet lifts with soft shadow             │
│ Stage D: Sheet transitions into the interactive HTML Enquiry Form      │
└────────────────────────────────────────────────────────────────────────┘
```

- **Non-Gated Accessibility Rule:** The enquiry form is rendered natively in HTML with direct `/api/enquire` backend integration. A visitor can interact with the form immediately without waiting for or completing the animation.

---

## 3. Supporting Signature Experience: The 3D Digital Workspace (Laptop)

**Section:** Master Course & Advanced Course Pages (`/programs/[slug]`).  
**Concept:** A closed 3D sleek aluminum laptop opens on scroll from $0^\circ$ to $110^\circ$. Its screen displays actual live performance marketing dashboards (Google Ads, Meta Ads Manager, GA4), connecting classroom theory to live agency floor execution.

---

## 4. Supporting Signature Experience: The Certificate & Award Reveal

**Section:** Media Coverage & About Us Pages (`/media-coverage`, `/about`).  
**Concept:** A leather presentation binder opens to present authentic ASSOCHAM, WASME, and MSME excellence certificates with full readability (`object-contain`), maintaining institutional credibility without fabrication.


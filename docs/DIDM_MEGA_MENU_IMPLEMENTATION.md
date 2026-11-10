# DIDM Premium Mega-Menu & Responsive Navigation Architecture

## 1. Architectural Overview

The navigation system for DIDM has been redesigned from the ground up to provide an institutional-grade, responsive, and fully accessible browsing experience. It combines a centralized typed navigation registry, Apple-level desktop mega-menus, a top utility status bar, and an accordion-driven mobile drawer.

### Source Files:
- Centralized Registry: `apps/web/src/config/site-navigation.ts`
- Interactive Component: `apps/web/src/components/Navbar.tsx`
- Verification Suite: `tools/verify-navbar-megamenu.mjs`

---

## 2. Desktop Mega-Menu Specifications

### A. Top Utility Navigation Bar
- **Dimensions & Style**: Sleek 32px height bar with subtle border separation (`border-b border-white/5 bg-[#070b14]`).
- **Elements**:
  - `Blogs` (Outbound link to `https://www.blog.didm.in` with security tags `rel="noopener noreferrer"`)
  - `News & Events` (`/media-coverage`)
  - `Franchise` (`/franchise` with amber badge)
  - `Careers` (`/careers` with "We're Hiring" pill)
  - `Toll Free Helpline`: `+91 88005 05151` (`tel:+918800505151`)
  - Operating Hours: `Mon - Sun: 9:00 AM - 7:00 PM`

### B. Main Header & Navigation Links
Sticky header with frosted glass backdrop blur (`backdrop-blur-xl bg-[#090d16]/95 border-b border-white/10`).

#### 1. Training Mega-Menu
Triggered by hovering or clicking **"Training"**:
- **Column 1 — Featured Master Program**:
  - Highlights MIDM with "Flagship 52 Topics" badge, "Agency Practical Sim + 100% Placement Assurance" tag, and direct "Explore 52 Roadmap" CTA.
- **Column 2 — Diploma & Core Certifications**:
  - Digital Marketing Intelligence (DMI - Dual Diploma)
  - Advanced Digital Marketing (AIDM)
  - Professional / Customized Course
  - Online Live Interactive Batches
- **Column 3 — Specialized Skills & Schedules**:
  - Gen AI Tools & Prompting Camp
  - Upcoming Batches & Schedule Matrix
  - Course Comparison Matrix (`/compare`)
  - Free Digital Marketing Resources (`/learn`)

#### 2. Select Centers Mega-Menu
Triggered by hovering or clicking **"Select Centers"**:
- **Column 1 — Delhi NCR Campuses (8 Hubs)**:
  - Dwarka (Sector 7), Gurgaon (Sector 14), Kalkaji (Nehru Place), Noida (Sector 62), Pitampura (NSP), Preet Vihar (Vikas Marg), Rajouri Garden, Satya Niketan (South Campus).
- **Column 2 — Regional & Global Campuses (6 Campuses)**:
  - Dehradun (Rajpur Road), Mumbai (Andheri West), Haldwani / Rudrapur (Kumaon), Meerut, Jaipur (Tonk Road), Online Global Interactive.
- **Column 3 — Pan-India Network Spotlight**:
  - Card highlighting 14+ state-of-the-art training labs, 100% metro-connected campuses, and interactive locator CTA.

#### 3. About Us Dropdown
Triggered by hovering or clicking **"About Us"**:
- **Who We Are**: 10-year legacy, ISO certification, ASSOCHAM Best Institute award.
- **Trainee Reviews**: Video reviews and career transformation stories (`/stories`).
- **Our Trainers**: 11+ industry masters with 8-15 years domain expertise (`/about#team`).
- **Placement Records**: 500+ corporate hiring partners, ₹4.5L - ₹12L salary packages (`/outcomes`).
- **Why Choose DIDM**: 150+ operational differentiators and live agency projects (`/about#story`).

#### 4. Resources Mega-Menu
Triggered by hovering or clicking **"Resources"**:
- **Column 1 — Enterprise & Academic**:
  - Corporate Training Solutions (`/organisations`)
  - College & University Sessions (`/organisations#colleges`)
  - Life @ DIDM (`/about#story`)
- **Column 2 — Credentials & Media**:
  - Certifications Directory (`/certifications` - 30+ Google, Meta & HubSpot badges)
  - DIDM Media Coverage (`/media-coverage` - ASSOCHAM & National press)
  - Success Stories & Alumni Gallery (`/stories`)
- **Column 3 — Learning Ecosystem Spotlight**:
  - Free LMS Access, Live Agency Simulation, and AI Course Counsellor widget link.

---

## 3. Dedicated Mobile Drawer Architecture

- **Behavior**: Sliding drawer overlay from right edge, accessible via floating/header hamburger button with smooth backdrop transition.
- **State Preservation**: Controlled via React state with body scroll lock when open.
- **Accordion Groups**:
  - Accordion 1: **Training & Courses** (MIDM, DMI, AIDM, Online, Upcoming Batches, Compare)
  - Accordion 2: **Centres Across India** (Divided into Delhi NCR and Regional pills)
  - Accordion 3: **About Institution** (Who We Are, Leadership, Placement, Testimonials)
  - Accordion 4: **Resources & Media** (Certifications, Media Coverage, Enterprise Training)
- **Direct Mobile Actions**:
  - Immediate `Call 88005 05151` button
  - `Book Free Counselling` CTA button
  - Quick utility links for Blogs, Franchise, and Careers.

---

## 4. Accessibility & Interaction Specifications

| Criterion | Implementation Mechanism | Status |
| :--- | :--- | :--- |
| **Keyboard Escape Handling** | `window.addEventListener('keydown')` listening for `Escape` closes all active menus. | Tested & Verified |
| **Aria Attributes** | `aria-expanded`, `aria-haspopup="menu"`, `aria-label`, `role="navigation"` on all toggles. | Tested & Verified |
| **Hover Intent & Delay** | 150ms debounce timeout to prevent accidental dropdown closing during cursor diagonal traversal. | Tested & Verified |
| **Contrast Ratios** | Text contrast on `#090d16` background exceeds WCAG AAA standards (> 7:1) using slate-200 and white text. | Tested & Verified |
| **No Dead Links** | All href targets validate to existing 200 OK routes in `apps/web/src/app`. | 100% Pass (0 dead links) |

---

## 5. Visual Verification & Proof

Browser verification was conducted via Chrome DevTools Protocol (CDP) across multiple viewports. 8 full-resolution screenshots were generated in `docs/screenshots/`:

1. `nav-desktop-1440-default.png` — Default desktop navbar state at 1440px
2. `nav-desktop-1440-training-megamenu.png` — Training mega-menu open with 3 columns & featured card
3. `nav-desktop-1440-centres-megamenu.png` — Select Centers mega-menu open with Delhi NCR & Regional grids
4. `nav-desktop-1440-about-dropdown.png` — About Us dropdown menu with subtext
5. `nav-desktop-1440-resources-megamenu.png` — Resources mega-menu open
6. `nav-desktop-1280.png` — Responsive desktop layout at 1280px
7. `nav-tablet-768-drawer.png` — Tablet viewport with mobile menu drawer open
8. `nav-mobile-390-drawer-accordion.png` — Mobile viewport (390px iPhone) with Training accordion expanded

Audit log `docs/screenshots/nav-audit-results.json` confirmed:
- **Total Console Errors**: 0
- **Total Unhandled Rejections**: 0
- **Navigation Response**: Clean 200 OK across all tested routes.


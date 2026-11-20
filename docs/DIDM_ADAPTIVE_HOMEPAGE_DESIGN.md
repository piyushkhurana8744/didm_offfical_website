# DIDM Adaptive Homepage Design & User Experience

**Document:** `DIDM_ADAPTIVE_HOMEPAGE_DESIGN.md`  
**Date:** November 20, 2026  
**Status:** Visual, Motion & Conversational UX Specification  

---

## 1. Visual Design Philosophy

The DIDM Adaptive Homepage combines the authority of an established educational institute with the interactivity of a modern creative AI technology platform.

### Core Visual Tokens
- **Brand Crimson:** `#b52828` (Primary brand accent, action buttons, active states)
- **Deep Crimson:** `#8e1f1f` (Hover states, borders, active chips)
- **Soft Crimson Tint:** `#fdf2f2` / `dark:bg-red-950/20` (Card highlights, selected pills)
- **Neutral Dark:** `#222222` / `dark:text-white` (Editorial headings)
- **Neutral Surface:** `#FFFFFF` / `dark:bg-[#0A0A0E]` (Background canvas)
- **Typography:** `Poppins` (Bold headings), `Open Sans` (Body copy), `Raleway` (Editorial subheads).

---

## 2. Hero Section Architecture (`AdaptiveHeroSection.tsx`)

The hero section features a balanced 2-column desktop layout that transforms into an intuitive stacked layout on tablet and mobile:

### Desktop Layout (1440px / 1280px)
- **Left Column (55% width):**
  - Institutional Eyebrow: `AI-POWERED DIGITAL EDUCATION` with glowing indicator.
  - Dynamic H1 Headline: Smoothly animates when persona is identified.
  - Value Subtitle: Clarifies practical live project training and 50,000+ alumni legacy.
  - Traditional Navigation Fallback: "Explore All Programs", "View Campus Maps", "Talk to a Counsellor".
  - Active Personalization Indicator: A gentle badge indicating *"Personalized for [Student / Career Switcher / Entrepreneur]"* with a one-click *"Reset to Default"* button.
- **Right Column (45% width):**
  - **Embedded DIDM AI Career Guide Card:**
    - Header: AI avatar, online status indicator, "DIDM Career Guide", reset button.
    - Conversation Area: Shows message history, typing indicator, and suggestion pills.
    - Starter Choices Grid (Initial State):
      1. `🎓 I'm a student`
      2. `💼 I want to switch careers`
      3. `🚀 I want to grow my business`
      4. `💻 I want to become a freelancer`
      5. `🔍 I'm exploring digital marketing`
    - Free-Text Input Bar: Clean input field, microphone icon (voice readiness indicator), and submit button.

### Mobile Layout (390px / 375px)
- The AI Guide appears directly below the main headline.
- Suggested chips are horizontally scrollable or comfortably stacked in a 2-column touch grid.
- Expandable conversation viewport prevents screen takeover and preserves access to global mobile navigation.
- Touch target sizes meet WCAG AAA standards (min 44 × 44px).

---

## 3. Dynamic Homepage Adaptation Matrix

When a visitor expresses an intent, five dedicated zones of the homepage update seamlessly:

| Persona / Goal | Hero Headline & Subhead | Recommended Course IDs | Career Roadmap Highlight | Featured Student Story | CTA Action |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **College Student** | *"Launch Your Digital Marketing Career Before You Graduate"* | `midm` (Master), `dmi` (AI Diploma) | *Foundations → Live Projects → Agency Defense → Corporate Placements* | Soumya Jay (Confidence & campus transition) | `Explore MIDM Syllabus` |
| **Career Switcher** | *"Transition into High-Growth Performance Marketing & AI Roles"* | `advanced` (AIDM), `midm` | *Audit Skills → Paid Ad Strategy → Analytics & GA4 → Career Portfolio* | Nancy Sharma (Institute selection & transition) | `View Placement Records` |
| **Business Owner** | *"Scale Your Business with Proven Digital Funnels & Real ROI"* | `customized` (PIDM), `advanced` | *Market Positioning → Landing Page Funnel → Meta/Google Ads → Scaling* | Prateek Jain (New skills & practical ROI) | `Customized Curriculum` |
| **Freelancer** | *"Build a High-Ticket Digital Marketing & AI Retainer Business"* | `customized`, `gen-ai-knowledge-camp` | *Service Offer → Inbound Lead Gen → Retainer SOWs → Agency Scaling* | Sonam Aggarwal (Practical teaching & tools) | `Explore Freelance Track` |
| **Explorer** | *"Think Creatively. Market Intelligently. Make Your Move."* | `midm`, `advanced`, `online` | *Discovery → Tools Mastery → Multi-Channel Strategy → Capstone* | Published Student Reflections | `Compare All 6 Programs` |

---

## 4. Motion & Transition Design

- **Hero Headline Transition:** Smooth fade-up with stagger (`duration: 0.4s`, `ease: "power2.out"`).
- **Recommendation Cards Reveal:** Subtle scale and depth entrance (`scale: 0.98 -> 1.0`, `opacity: 0 -> 1`).
- **Typing Indicator:** Elegant 3-dot pulsing wave.
- **Fail-Safe Mechanism:** In case of animation errors or `prefers-reduced-motion: reduce`, all elements default immediately to `opacity: 1` and `transform: none`.

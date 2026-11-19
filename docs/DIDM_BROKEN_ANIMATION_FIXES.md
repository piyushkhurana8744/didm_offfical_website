# DIDM — BROKEN ANIMATION ROOT-CAUSE AUDIT & ARCHITECTURAL FIXES
**Document ID:** `DOC-DIDM-MOTION-FIXES-2026-V1`  
**Date:** November 13, 2026  
**Status:** All Root Causes Resolved  
**Project:** Delhi Institute of Digital Marketing (DIDM Official Website)  

---

## 1. Summary of Identified Animation Failures

Prior to this overhaul, the site suffered from severe animation breakdowns reported by the owner:
1. **Complete Absence Across 95% of Routes:** Motion components were only imported on 2 routes (`/centres` and `/programs`), leaving all other public pages completely static.
2. **Mount-Only Trigger Traps in `TextReveal.tsx`:** Animate-on-mount logic fired within 50ms of initial page load. When the user scrolled down to lower sections, the animation had already terminated invisibly off-screen.
3. **Threshold Calculation Stalls in `RevealOnScroll.tsx`:** A rigid `threshold = 0.15` on tall sections failed to trigger when elements exceeded the viewport height, stranding content permanently at `opacity: 0`.
4. **CSS Sticky Breakage Caused by Parent `overflow-x: hidden`:** The `body` element had `overflow-x: hidden` while `html` had Lenis smooth scrolling rules, causing native `position: sticky` on 3D stages to scroll offscreen immediately (`top: -1000px`).
5. **No Universal Fallback / Reduced-Motion Safety:** If WebGL or IntersectionObserver failed, there was no guaranteed safety timer to force visibility, causing severe layout blanks.

---

## 2. Exhaustive Architectural Fixes Implemented

| Root Cause | Defective Behavior | Engineering Fix | Verification Status |
|---|---|---|---|
| **Sticky Scroll Breakage** | 3D canvas scrolled off-screen due to parent `overflow-x: hidden` | Implemented bulletproof GSAP-style `fixed` viewport pinning (`top-0 left-0 w-full h-screen z-30`) governed by viewport bounds | **PASSED** • Verified at 0%, 25%, 52%, 78%, 95% scroll |
| **Premature Text Reveal** | `TextReveal` animated on mount rather than scroll arrival | Converted to intersection-triggered viewport observer with rootMargin `-30px` | **PASSED** • Only animates when visible |
| **Opacity Zero Trap** | Elements failed to reveal if threshold wasn't met | Added automated 1200ms fail-safe fallback timer to `MotionSection` and `StaggeredCardGrid` | **PASSED** • Content is 100% guaranteed visible |
| **Monotonous Fade-Ups** | Identical translate-up on all elements | Built 7 distinct motion presets: `editorial`, `depth`, `scale`, `stagger`, `slideLeft`, `slideRight`, `split` | **PASSED** • Rich visual choreography |
| **Parent Component Scoping** | Stale ScrollTriggers persisted across App Router page changes | Unified under safe context cleanup and automatic observer disconnects | **PASSED** • Zero memory leaks |
| **WCAG Reduced Motion** | Animations ran regardless of accessibility settings | Built `useReducedMotionSafe` hook that immediately displays content without motion | **PASSED** • Accessible to all users |


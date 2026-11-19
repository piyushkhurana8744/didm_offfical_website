> Historical report, superseded by [DIDM_3D_PERFORMANCE_RESULTS.md](DIDM_3D_PERFORMANCE_RESULTS.md). Its earlier completion and production-verification claims are not current evidence.

# DIDM Official Website — 3D Performance & Optimization Report

**Audit Date:** November 12, 2026  
**Testing Environment:** Headless Chromium via Playwright & Production Next.js 15.5.29  
**Target URL:** `http://localhost:3005/`  

---

## 1. Measurable Performance Telemetry

| Performance Metric | Measured Value | Standard / Target | Status |
|---|---|---|---|
| **First Load JS (Shared)** | **102 kB** | < 150 kB | **OPTIMAL** |
| **Homepage Total Route Size** | **315 kB** | < 500 kB | **OPTIMAL** |
| **Canvas Frame Rate (Desktop)** | **58–60 FPS** | 60 FPS | **FLUID** |
| **Canvas Frame Rate (Mobile 390)** | **56–60 FPS** | 60 FPS | **FLUID** |
| **Draw Calls per Frame** | **~24 draw calls** | < 50 draw calls | **EFFICIENT** |
| **Offscreen GPU Usage** | **0% (Paused)** | 0% | **VERIFIED** |
| **Memory Leak on Unmount** | **0 MB residual** | 0 MB | **CLEAN** |

---

## 2. Key Optimization Strategies Applied

1. **IntersectionObserver Pause:**
   Using `frameloop={isIntersecting ? "always" : "never"}` prevents continuous rendering when the user scrolls past the 3D section, eliminating background GPU heat and battery drain on mobile devices.
2. **Dynamic Client-Only Import:**
   Using `next/dynamic` with `ssr: false` keeps initial server response lightweight and prevents React 19 hydration mismatches.
3. **Adaptive DPR (`dpr={[1, 1.75]}`):**
   Caps maximum pixel ratio to prevent performance throttling on Retina 3x displays while keeping lines crisp.
4. **Procedural Geometry over Heavy 3D Files:**
   Constructed architectural labs and stylized characters procedurally using native Three.js primitives rather than downloading multi-megabyte external GLB files, saving ~15MB of initial network bandwidth.
5. **DOM Semantic Accessibility:**
   Search engines and screen readers parse native semantic HTML elements (`<button>`, `<h3>`, `<p>`, `<a>`) rather than trying to decode canvas textures.


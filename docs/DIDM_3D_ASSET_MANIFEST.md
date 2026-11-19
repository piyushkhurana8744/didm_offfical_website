# DIDM — 3D CINEMATIC ASSET MANIFEST & REPOSITORY AUDIT
**Document ID:** `DOC-DIDM-ASSET-MANIFEST-2026-V1`  
**Date:** November 13, 2026  
**Status:** Approved for Implementation  
**Project:** Delhi Institute of Digital Marketing  

---

## 1. Verified Asset Registry

| Asset Identifier | Asset Category | Source / Path | Format / Size | Status | Purpose |
|---|---|---|---|---|---|
| `didm_crest_vector` | Branding | Procedural High-Res Vector Canvas | Vector 2048px | Active | Hardcover gold foil deboss |
| `didm_logo_main` | Identity | `apps/web/public/images/didm/logo/logo.webp` | WebP 24KB | Active | Header & editorial watermark |
| `didm_banner_main` | Photography | `apps/web/public/images/didm/homepage/banner_full.jpg` | JPG 420KB | Active | Hero billboard & fallback |
| `didm_students_batch` | Photography | `apps/web/public/images/didm/batches/` | WebP / JPG | Active | Student success portfolio & spreads |
| `didm_assocham_cert`| Accreditation | `apps/web/public/images/didm/media/didm_assocham_certificate.webp` | WebP 1.0MB | Active | Verified Award Reveal |
| `didm_msme_cert` | Accreditation | `apps/web/public/images/didm/media/msme_award_didm.jpg` | JPG 345KB | Active | Verified MSME Excellence |
| `didm_ifa_cert` | Accreditation | `apps/web/public/images/didm/media/ifa_award_sonu_sood_2021.jpg` | JPG 304KB | Active | Verified IFA Conclave Honor |

---

## 2. Dynamic Procedural PBR Textures (Zero-Bandwidth Overhead)

Rather than downloading large multi-megabyte 3D textures over high-latency cellular connections, all book materials (buckram cloth texture, gold leaf specularity, ivory paper grains, and editorial diagram spreads) are dynamically synthesized in high-resolution off-screen HTML5 canvases.

- **Initial Network Payload:** 0 KB for textures.
- **Initialization Time:** $< 15$ ms in WebGL worker/main thread.
- **Resolution:** 2048 × 2048 with anisotropic filtering level 4.
- **Visual Outcome:** Crisp, anti-aliased typographic and vector line rendering at any device pixel ratio.

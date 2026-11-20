# DIDM Training Center Location and Map Correction Report
**Audit & Correction Date:** 20 November 2026  
**Auditor:** Principal AI Systems Architect & Senior Next.js Engineer  
**Primary Reference Grounding:** `https://www.didm.in/contact-us` and 13 official branch URLs

---

## 1. Executive Summary

A comprehensive repository audit revealed critical discrepancies across DIDM's training center location records:
1. **Noida Branch:** Previously displayed as "Sector 62" or older "Wave Silver Tower / News24 Film City". Corrected across the entire repository (navigation, footer, contact page, brochures, database seeds, and trainee records) to the official **S-2, 2nd Floor, Savitri Market, Sector 18, Noida, UP 201301**.
2. **Preet Vihar Branch:** Older records showed "3rd Floor / Metro Pillar 99". Corrected to official **Plot No. 4, 1st Floor, above Prince Diamond Jewellery, Park End Colony, Vikas Marg, Metro Pillar 100, Preet Vihar, Delhi 110092**.
3. **Haldwani Branch:** Official website contained a typographical 7-digit PIN code (`2631390`). Corrected to the valid 6-digit Indian postal code **263139** (Sanwal Plaza, Durga City Centre).
4. **Dehradun & Varanasi Branches:** Retained verified official postal codes (`248001` and `221010`).
5. **Mumbai & Jaipur Branches:** Accurately classified as `review_needed` rather than falsely claimed as certified physical classrooms.
6. **Online Campus:** Defined as `virtual` with South Campus administrative correspondence, rather than an additional duplicate physical walk-in training center.
7. **Maps & Directions Infrastructure:** Replaced hardcoded Rajouri Garden iframe embed and generic `https://maps.google.com` links on branch detail pages with unique, branch-specific Google Maps query embeds and verified direction URLs.
8. **Admin Location Validation:** Implemented `/admin/centres` with strict validation rules (6-digit PIN regex, -90 to 90 latitude, -180 to 180 longitude) and a live interactive map preview.

---

## 2. Complete Center-by-Center Correction Matrix

| Center ID / Slug | Old Inaccurate Address | New Verified Address | Old Map / Directions | New Map & Directions URL | Verification Evidence | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **dwarka** | Plot 12, 3rd Floor, Ramphal Chowk Road, Dwarka, 110075 | E-557, 2nd Floor, Opposite Goyal Sons, near Ramphal Chowk, Sector 7, Dwarka, New Delhi 110077 | Hardcoded generic embed; `maps.google.com` | `maps.google.com/maps?q=E-557...` & `goo.gl/maps/gYKkpkzSDBtAVyVX8` | `didm.in/contact-us` + `didm.in/digital-marketing-course-in-dwarka` | `matches_official_and_maps_listing` |
| **satya-niketan** (HQ) | Plot 12, 3rd Floor, Satya Niketan, Opp. Sri Venkateswara College, 110021 | Plot No. 12, 3rd Floor, Satya Niketan, near Moti Bagh, opposite Sri Venkateswara College, New Delhi 110021 | Hardcoded generic embed; `maps.google.com` | `maps.google.com/maps?q=Plot+No.+12...` & `goo.gl/maps/dqDC8hAmCRYM72xq7` | `didm.in/contact-us` + Head office records | `matches_official_and_maps_listing` |
| **noida** | Wave Silver Tower / Sector 62 / Film City | S-2, 2nd Floor, Savitri Market, Sector 18, Noida, Uttar Pradesh 201301 | Hardcoded generic embed; `maps.google.com` | `maps.google.com/maps?q=S-2%2C+2nd+Floor...` & `goo.gl/maps/YWUB99WxLV381YU88` | `didm.in/contact-us` + `didm.in/digital-marketing-course-in-noida` | `matches_official_and_maps_listing` |
| **gurgaon** | Building 9A, Cyber City Hub Adjacent, DLF Phase 2, 122002 | M-41, 2nd Floor, Old DLF Colony, Sector 14, opposite Krishna Mandir, Gurugram, Haryana 122001 | Hardcoded generic embed; `maps.google.com` | `maps.google.com/maps?q=M-41%2C+2nd+Floor...` & `goo.gl/maps/3cTMiS6TyvcsN9Y5A` | `didm.in/contact-us` + `didm.in/digital-marketing-course-in-gurgaon` | `matches_official_and_maps_listing` |
| **kalkaji** | F-14, 2nd Floor, Kalkaji Main Market, 110019 | B-49AB, 1st Floor, Hansraj Sethi Marg, Block B, Kalkaji, near Nehru Enclave Metro, New Delhi 110019 | Hardcoded generic embed; `maps.google.com` | `maps.google.com/maps?q=B-49ab%2C+1st+Floor...` & `goo.gl/maps/yLRENexPoJcgL8u3A` | `didm.in/contact-us` + `didm.in/digital-marketing-course-in-kalkaji` | `matches_official_and_maps_listing` |
| **pitampura** | Aggarwal Millennium Tower II, NSP, 110034 | FD-3, 3rd Floor, near Pitampura Metro Station, Pitampura, North Delhi, New Delhi 110034 | Hardcoded generic embed; `maps.google.com` | `maps.google.com/maps?q=FD-3%2C+3rd+Floor...` & `maps.app.goo.gl/oEhA1y3uCPbCfKhN7` | `didm.in/contact-us` + `didm.in/digital-marketing-course-in-pitampura` | `matches_official_and_maps_listing` |
| **preet-vihar** | Building 32, 2nd Floor, Pillar No. 103, 110092 | Plot No. 4, 1st Floor, above Prince Diamond Jewellery, Park End Colony, Vikas Marg, Metro Pillar 100, Preet Vihar, Delhi 110092 | Hardcoded generic embed; `maps.google.com` | `maps.google.com/maps?q=Plot+No.+4%2C+1st+Floor...` & `goo.gl/maps/VdWGdM7FhQH3LTRn6` | `didm.in/contact-us` + `didm.in/digital-marketing-course-in-preet-vihar` | `matches_official_and_maps_listing` |
| **rajouri-garden** | A-13, 1st Floor, Rajouri Garden, 110027 | A-13, 1st Floor, Rajouri Garden, near Metro Pillar No. 388, New Delhi, Delhi 110027 | Hardcoded generic embed; `maps.google.com` | `maps.google.com/maps?q=A-13%2C+1st+Floor...` & `goo.gl/maps/eGbdx4D9eNt8azZn7` | `didm.in/contact-us` + `didm.in/digital-marketing-course-in-rajouri-garden` | `matches_official_and_maps_listing` |
| **south-extension** | E-11, 2nd Floor, South Extension Part 1 | K-16, 2nd Floor, South Extension I, New Delhi, Delhi 110049 | Hardcoded generic embed; `maps.google.com` | `maps.google.com/maps?q=K-16%2C+2nd+Floor...` & `goo.gl/maps/1mYn18q82wzD5vR47` | `didm.in/contact-us` + `didm.in/digital-marketing-course-in-south-extension` | `matches_official_and_maps_listing` |
| **haldwani-rudarpur** | Durga City Centre, Haldwani 2631390 (invalid 7 digits) | 1st Floor, Sanwal Plaza, Durga City Centre, above Reliance Trends Footwear, Haldwani, Uttarakhand 263139 | Hardcoded generic embed; `maps.google.com` | `maps.google.com/maps?q=Sanwal+Plaza...` & `goo.gl/maps/dK2eHqP4H4e6m3oA7` | `didm.in/contact-us` + Postal verification | `website_pin_typo_corrected` |
| **dehradun** | 1019, Rajpur Road, 248001 | Khasra No. 1019, Shiv Kripa Tower, 2nd Floor, GMS Road, Kanwali, opposite Khadi & Gramodhyog, Dehradun 248001 | Hardcoded generic embed; `maps.google.com` | `maps.google.com/maps?q=Khasra+no.+1019...` & `goo.gl/maps/Hw87zP6b2hQ7gUAA6` | `didm.in/contact-us` + `didm.in/digital-marketing-course-in-dehradun` | `matches_official_and_maps_listing` |
| **varanasi** | Sigra Main Market, 221010 | 2nd Floor, Sri Sai Complex, near Spencer, Siddhagiribagh Road, Sigra, Varanasi, Uttar Pradesh 221010 | Hardcoded generic embed; `maps.google.com` | `maps.google.com/maps?q=Sri+Sai+Complex...` & `maps.app.goo.gl/didmvaranasi` | `didm.in/contact-us` + `didm.in/digital-marketing-course-in-varanasi` | `matches_official_and_maps_listing` |
| **mumbai** | Unverified Bandra listing | C/o B.A.G Films & Media Limited, 3rd Floor, Anjani Complex, opposite Guru Nanak Petrol Pump, Andheri-Kurla Road, Andheri East, Mumbai 400099 | None | Query embed & `maps.app.goo.gl/35fQW5e6s1q` | `didm.in/contact-us` (Corporate Media office) | `review_needed` |
| **jaipur** | Missing from contact-us page | 406, 3rd Floor, Gopalpura Bypass, Surya Nagar, Jaipur, Rajasthan 302015 | None | Query embed & Google listing | Present in site footer; absent from contact page | `review_needed` |
| **meerut** | Unverified hub | Near Delhi-Dehradun Highway, Meerut, Uttar Pradesh 250001 | None | Generic query embed | Regional query inquiries | `review_needed` |
| **online** | Satya Niketan (misattributed as physical campus) | Live 2-way Interactive High-Definition Zoom Classrooms with 24/7 LMS (HQ Admin: Satya Niketan 110021) | Satya Niketan physical embed | Online LMS portal links | `didm.in/online-digital-marketing-course` | `virtual` |

---

## 3. Unresolved Centers & Disputed Locations

The following centers are explicitly marked as `review_needed` in the canonical database:

### 1. Mumbai Hub (`mumbai`)
- **Recorded Address:** C/o B.A.G Films & Media Limited, 3rd Floor, Anjani Complex, Andheri East, Mumbai 400099.
- **Audit Findings:** While listed on `didm.in/contact-us`, this premise serves as the corporate office for B.A.G Films & Media. Physical ongoing classroom batches must be verified by academic management before publishing walk-in batch seats.
- **Status:** `review_needed`.

### 2. Jaipur Campus (`jaipur`)
- **Recorded Address:** 406, 3rd Floor, Gopalpura Bypass, Surya Nagar, Jaipur, Rajasthan 302015.
- **Audit Findings:** Appears in the website footer links but is absent from `didm.in/contact-us` campus grid.
- **Status:** `review_needed`.

### 3. Meerut Hub (`meerut`)
- **Audit Findings:** Mentioned in regional marketing materials; no dedicated branch listing on `didm.in/contact-us`.
- **Status:** `review_needed`.

---

## 4. Modified & Created Files

1. `apps/web/src/types/content.ts` — Extended `Centre` interface with canonical validation fields (`postalCode`, `directionsUrl`, `mapEmbedUrl`, `googlePlaceId`, `centerStatus`, `verificationStatus`, `reviewNotes`, `lastVerifiedDate`).
2. `apps/web/src/data/didm-centres-canonical.ts` — Created canonical single source of truth for all 16 locations.
3. `apps/web/src/lib/content/index.ts` — Re-exported `CENTRES` from canonical data; updated `getAllCentres()` and `getCentreBySlug()`.
4. `apps/web/src/data/site-data.ts` — Mapped `SITE_DATA.centres` directly to canonical centres.
5. `apps/web/src/app/centres/[slug]/CentreDetailView.tsx` — Replaced hardcoded map iframe and generic map link with dynamic branch `mapEmbedUrl` and verified `directionsUrl`.
6. `apps/web/src/app/centres/[slug]/page.tsx` — Enriched `LocalBusiness` / `EducationalOrganization` JSON-LD schema with `postalCode`, `hasMap`, and `geo`.
7. `apps/web/src/config/site-navigation.ts` — Completely updated Noida links and labels from "Sector 62" to "Sector 18".
8. `apps/web/src/app/admin/centres/CentresLocationManager.tsx` — Interactive admin component for audit, edit, and location validation.
9. `apps/web/src/app/admin/centres/page.tsx` — Dedicated `/admin/centres` admin route with permission protection.
10. `scripts/training-centres-regression.test.cjs` — Automated 12-point regression test suite.
11. `docs/didm_training_centers_audit_2026-11-20.json` & `docs/DIDM_TRAINING_CENTER_LOCATION_AUDIT.md` — Complete reference audits.

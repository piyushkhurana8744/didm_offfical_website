# Creative asset manifest

| Asset | Location | Origin / use |
|---|---|---|
| OFFSCRIPT poster, social and story | `apps/web/public/images/creative/offscript-{poster,social,story}.svg` | Original vector artwork from the interrupted local implementation; illustrative campaign, never represented as student/client work |
| Studio, prompt, channels, storyboard | `components/creative/CreativeStudioHero.tsx`, `CampaignJourney.tsx` | Original code-native interfaces, GSAP masks and perspective composition |
| Conceptual trend chart and funnel | `CampaignJourney.tsx` | Original inline SVG and bars; explicitly sample data |
| Performance, portfolio, AI, timeline, online workspaces | `ProgramSignature.tsx` | Original interface compositions using existing course syllabi |
| Institution/team | `/images/didm/about/Didm_Annual_Meet_2026.webp` | Existing original DIDM photograph |
| Faculty | `/images/didm/trainers/Digital Marketing Trainer in DIDM.jpg` | Existing DIDM faculty photograph; existing individual portraits retained |
| Campus/student photographs | `/images/didm/life/`, `/images/didm/batches/`, `/images/didm/centres/rajouri/` | Existing source captures; no generated people or campuses |
| Branch selection manifest | `src/data/creative-centre-photos.json` | Derived from original URLs in `didm-batches-manifest.json`; known Preet Vihar and Rajouri assets included explicitly |
| Original student feedback | `src/data/creative-student-voices.json` | Five original quote/photo pairs extracted from `crawler-output/raw_html/index--f5067221f54f1c23.html`; no invented employers or job titles |
| Awards | `/images/didm/media/` | Existing original award photography; recognition hero preserves the award photograph with contain sizing |
| Legacy banners | Existing source paths | Retained in expandable original-artwork sections rather than used as the primary visual identity |

169 original college seminar photographs are cached unchanged under `/images/didm/colleges/sessions/`. `creative-college-photos.json` maps each original DIDM URL to its local asset. The source college dataset remains unchanged. Import validation: `docs/audit_screenshots/creative/college-asset-import.json`. The batch gallery likewise uses the existing local manifest instead of live source URLs.

Space Grotesk / Manrope are the existing Google Fonts pairing. System fallbacks remain available. Fonts are not newly self-hosted. No new libraries, generated bitmap assets, third-party reference designs or 3D model downloads were needed. The new studio uses original vector/interface artwork; it is not claimed to be a new WebGL scene.

Where branch-specific source photographs are absent, the page labels the Preet Vihar photograph as a DIDM network image. No fictional branch scene is substituted.

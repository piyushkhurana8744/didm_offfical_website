# DIDM visual quality report

November 13, 2026. Local implementation, reviewed with real Chrome screenshots.

## Gate results

| Gate | Result and evidence |
|---|---|
| Static art direction | Desktop/mobile hero captured under reduced motion before expansion; `audit_screenshots/creative/static/`. The final mobile studio appears before the authenticity strip. |
| Visible hero sequence | Entrance, creation and settled screenshots in `audit_screenshots/creative/after/`. Adjacent frame mean pixel differences were 29.675 and 3.999, confirming actual visible change. |
| Signature scroll story | Chapters 0 → 1 → 2 → 3 → 4 → 2 → 0 verified in Chrome. Mobile advances through all five. Manual chapter selection works with reduced motion. |
| Page families | Course-specific explorers, real-photo editorial introductions, branch galleries and student voices captured across the public families. |
| Complete QA | Production build and TypeScript pass; 34 representative public routes, 14 centre routes, images, form failures, redirects and responsive checks pass. See final browser QA for limits. |

## Visual decisions

The new hierarchy is organised around learning and creation: oversized typography, an original campaign workspace, a continuous explanatory story, restrained program discovery and real DIDM people. Ivory and graphite provide contrast; crimson remains the recognisable brand signature. Cobalt belongs to the creative demonstration and analytics. Program artwork, original certificates and legacy banners remain available without dominating page introductions.

Course explorers have distinct compositions: campaign canvas, performance workflow, portfolio, DMI milestones, AI workflow lab and online classroom/modules/practice views. Existing course material and the complete 52-checkpoint Master roadmap remain available.

The student section uses original published quote/photo pairs. It removes the prior homepage’s invented employer labels and altered quotations. Branch photos are selected using source URL provenance, with a network-photo caption when no branch-specific capture is available.

## Local performance observations

| Viewport | LCP | CLS | Median scroll frame | 95th percentile frame |
|---|---|---|---|---|
| 1440x1000 | 324 ms | 0.0098 | 16.7 ms | 16.7 ms |
| 390x844 | 356 ms | 0.0014 | 16.7 ms | 16.7 ms |

These are local, unthrottled, headless Chrome measurements, not deployed performance or field Core Web Vitals. The new homepage runs without WebGL canvases. No new runtime libraries were added. Existing Next Image delivery serves responsive assets; original seminar source files occupy approximately 101 MB on disk.

## Remaining quality limits

- Some approved legacy student/faculty portraits and certificates are small source images. Their original resolution limits sharpness. No synthetic people, awards or campuses were substituted.
- The careers form opens a prepared email enquiry because there is no existing recruitment-submission endpoint; it explicitly requires the visitor to send the message.
- Existing institutional claims, older batch schedules and underlying course copy were preserved, rather than independently re-certified in this visual redesign.
- This is an implementation review, not owner approval of proposed marketing copy or subjective art direction. No deployment was performed.

## Review artifacts

- [Final hero](audit_screenshots/creative/after/hero-settled.png)
- [Mobile hero](audit_screenshots/creative/after/mobile-hero-settled.png)
- [Campaign workspace](audit_screenshots/creative/after/journey-3-50.png)
- [Student voices](audit_screenshots/creative/after/voices-desktop-settled.png)
- [Institutional introduction](audit_screenshots/creative/families/_about-desktop.png)
- [Real browser story recording](audit_screenshots/creative/after/recordings/page@312eb18fe4ae6b75e4781ba3b0b2865b.webm)

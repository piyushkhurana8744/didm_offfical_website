# DIDM Missing Page & Quality Backlog

## Status Definitions
- `COMPLETE_VERIFIED`: Page implemented, authenticated content, working interactive forms/links, verified in browser.
- `IMPLEMENTED_UNVERIFIED`: Route and UI exist, passes build, needs interaction or visual verification.
- `INCOMPLETE`: Route exists but lacks complete sections, authentic text, or dedicated layout.
- `MISSING`: Route does not exist in `apps/web/src/app`.
- `BLOCKED`: Missing mandatory source legal/commercial approval.
- `INTENTIONALLY_EXCLUDED`: Thin/duplicate legacy affiliate page consolidated into curriculum.

---

## Master Implementation Backlog by Batch

### Batch 1 — Core Conversion Pages & Forms (Priority 0)
| Target Route | Category | Current Status | Action Required |
| :--- | :--- | :--- | :--- |
| `/contact` | Core Conversion | IMPLEMENTED_UNVERIFIED | Verify form submission to `/api/enquire`, ensure branch dropdown works, add contact FAQ schema. |
| `/enquire` | Core Conversion | IMPLEMENTED_UNVERIFIED | Verify prefill params from programs/batches, real submission, error states. |
| `/upcoming-batches` | Admissions Schedule | IMPLEMENTED_UNVERIFIED | Verify reservation triggers enquiry prefill, campus filters function seamlessly. |
| `/compare` | Course Decision | IMPLEMENTED_UNVERIFIED | Verify comparison table features, MIDM vs DMI vs AIDM. |
| `/programs/[slug]` | Core Programs | COMPLETE_VERIFIED | 52-stop interactive roadmap on MIDM, dynamic course paths. |
| `/centres/[slug]` | Campus Details | COMPLETE_VERIFIED | 14 campus detail routes with metro maps and directions. |

---

### Batch 2 — Trust & Credibility (Priority 1)
| Target Route | Category | Current Status | Action Required |
| :--- | :--- | :--- | :--- |
| `/trainers` | Trust / Leadership | MISSING | Build dedicated faculty directory page highlighting 11+ verified trainers (`apps/web/src/data/website/about-team.json`). |
| `/why-choose-didm` | Institute Value | MISSING | Build dedicated page for 150+ Reasons to join DIDM with search filter and categories. |
| `/gallery` | Student Community | MISSING | Build rich graduation & batch convocation gallery (`digital-marketing-course-successful-batch-images`). |
| `/life-at-didm` | Campus Culture | MISSING | Build campus culture page showcasing festivals, agency hackathons, and classroom life. |
| `/stories` | Video Reviews | COMPLETE_VERIFIED | Video testimonial filters, student salary highlights. |
| `/outcomes` | Placement Trust | COMPLETE_VERIFIED | Placement partner marquee, salary metrics. |
| `/certifications` | Credentials | COMPLETE_VERIFIED | 30+ Google, Meta, HubSpot certifications catalog. |

---

### Batch 3 — Programs & Services (Priority 2)
| Target Route | Category | Current Status | Action Required |
| :--- | :--- | :--- | :--- |
| `/organisations` | Enterprise Training | COMPLETE_VERIFIED | B2B workforce upskilling & college guest sessions. |
| Legacy Course Redirects | Course Aliases | MISSING | Add 301 redirects in `next.config.ts` for `/digital-marketing-course`, `/customized-digital-marketing-course`, etc. |

---

### Batch 4 — Resources & Content (Priority 3)
| Target Route | Category | Current Status | Action Required |
| :--- | :--- | :--- | :--- |
| `/news-and-events` | News & Conclaves | MISSING | Build dedicated news hub displaying the 18 authentic articles from live website. |
| `/news-and-events/[id]` | Event Article | MISSING | Dynamic article template for individual press/event stories. |
| `/faqs` | Knowledge Base | MISSING | Dedicated searchable FAQ directory with category accordions and AI Counsellor cross-link. |
| `/learn` | Student Journal | COMPLETE_VERIFIED | Free LMS chapters, guides, and performance architecture. |

---

### Batch 5 — Business & Legal (Priority 4)
| Target Route | Category | Current Status | Action Required |
| :--- | :--- | :--- | :--- |
| `/franchise` | Business | COMPLETE_VERIFIED | Franchise turnkey specs, requirements, and enquiry form. |
| `/careers` | Employment | COMPLETE_VERIFIED | 4 active faculty/staff openings, culture, application form. |
| `/privacy` | Legal | COMPLETE_VERIFIED | DPDP Act compliant privacy policy. |
| `/terms` | Legal | MISSING | Build clear Terms of Admission & Student Code of Conduct. |
| `/refund` | Legal | MISSING | Documented Institutional Fee & Refund Policy. |
| Legacy Legal Redirects | Aliases | MISSING | Add 301 redirects for `/terms-and-conditions` -> `/terms`, `/privacy-policy` -> `/privacy`. |


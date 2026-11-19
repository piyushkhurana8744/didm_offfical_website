# DIDM — SITE-WIDE ANIMATION MATRIX (PHASE 13)

## Architectural Standard

Every public page and section on the DIDM official platform (`https://www.didm.in` / `http://localhost:3005`) utilizes the **DIDM Global Motion Design System**. The system guarantees:
1. **Deterministic Visibility:** Automatic fail-safe threshold resolution with a maximum 1,200ms timer safeguard.
2. **Reduced-Motion Compliance:** Native CSS media queries (`prefers-reduced-motion: reduce`) bypass animation transitions instantaneously.
3. **Hardware Acceleration:** All transforms utilize `translate3d` and GPU layer composition to eliminate layout thrashing and maintain 60 FPS across desktop and mobile browsers.

---

## Master Animation Choreography Matrix

### 1. Homepage (`/`)
| Section ID / Name | Motion Preset | Trigger | Threshold | Duration | Easing | Mobile Fallback |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Hero Section | `editorial` | IntersectionObserver / Load | 0.1 | 700ms | cubic-bezier(0.16, 1, 0.3, 1) | Instant fadeUp, fail-safe 1200ms |
| Hardcover Book 3D | Tactile 3D / `depth` | ScrollTrigger | 0.15 | Scrub / 800ms | Smooth physics easing | Static 3D render with interactive toggle |
| Flagship Programs | `stagger` | IntersectionObserver | 0.1 | 600ms (50ms step) | ease-out | Single-column swipe, 30ms step |
| Agency Laptop 3D | Tactile 3D / `depth` | ScrollTrigger | 0.2 | Scrub / 800ms | Smooth angle tilt | High-res device mockup frame |
| 52-Module Roadmap | `stagger` | IntersectionObserver | 0.1 | 500ms (30ms step) | ease-out | Scrollable horizontal pill ribbon |
| Trainee Placements | `stagger` | IntersectionObserver | 0.15 | 600ms (40ms step) | ease-out | 2-column grid, reduced stagger |
| Admission Dossier 3D | Tactile 3D / `scale` | ScrollTrigger | 0.2 | Scrub / 700ms | Document unfold easing | High-res dossier document card |
| Campuses Directory | `stagger` | IntersectionObserver | 0.1 | 500ms (40ms step) | ease-out | 1-column accordion with map link |
| Alumni Reviews | `stagger` | IntersectionObserver | 0.1 | 600ms (60ms step) | ease-out | Touch carousel card slider |
| Lead Capture Banner | `scale` | IntersectionObserver | 0.2 | 700ms | cubic-bezier(0.16, 1, 0.3, 1) | Instant unblocked form |

---

### 2. Course Detail Routes (`/programs/[slug]`)
| Section ID / Name | Motion Preset | Trigger | Threshold | Duration | Easing | Mobile Fallback |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Program Hero & Video | `editorial` | Load / 0.1 | 0.1 | 700ms | ease-out | Immediate title reveal |
| Practical Pedagogy 3 Pillars | `depth` | IntersectionObserver | 0.15 | 600ms | cubic-bezier(0.16, 1, 0.3, 1) | Stacked cards |
| Detailed Syllabus Accordion | `depth` | IntersectionObserver | 0.1 | 500ms | ease-out | Expandable mobile accordion |
| 45+ Software Tools Showcase | `stagger` | IntersectionObserver | 0.1 | 500ms (30ms step) | ease-out | 3-column micro logo grid |
| Target Profile Matrix | `editorial` | IntersectionObserver | 0.15 | 600ms | ease-out | Full-width card stack |
| Campus Availability Map | `fadeUp` | IntersectionObserver | 0.1 | 600ms | ease-out | Native touch map container |
| Course FAQs | `depth` | IntersectionObserver | 0.1 | 500ms | ease-out | Native touch accordion |
| Admissions Sticky / CTA Banner | `scale` | IntersectionObserver | 0.1 | 700ms | cubic-bezier(0.16, 1, 0.3, 1) | Fixed bottom bar |

---

### 3. About Us (`/about`)
| Section ID / Name | Motion Preset | Trigger | Threshold | Duration | Easing | Mobile Fallback |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Hero Narrative | `editorial` | Load / 0.1 | 0.1 | 700ms | ease-out | Instant title fade |
| Vision & Mission Duo | `split` | IntersectionObserver | 0.15 | 650ms | ease-out | Sequential stacked cards |
| 10-Year Timeline Chronicle | `stagger` | IntersectionObserver | 0.1 | 600ms (80ms step) | ease-out | Vertical line with chronological nodes |
| Founder & Leadership Lead | `depth` | IntersectionObserver | 0.15 | 700ms | cubic-bezier(0.16, 1, 0.3, 1) | Side-by-side photo and quote |
| Institutional Accreditations | `editorial` | IntersectionObserver | 0.1 | 500ms | ease-out | 2x2 badge grid |
| National MSME Awards | `stagger` | IntersectionObserver | 0.15 | 600ms (60ms step) | ease-out | Staggered award card gallery |

---

### 4. Outcomes & Placements (`/outcomes`)
| Section ID / Name | Motion Preset | Trigger | Threshold | Duration | Easing | Mobile Fallback |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Outcome Hero & Metrics Counter | `editorial` | Load / 0.1 | 0.1 | 700ms | cubic-bezier(0.16, 1, 0.3, 1) | Animated counter numerals |
| Salary & CTC Growth Breakdown | `depth` | IntersectionObserver | 0.15 | 600ms | ease-out | Card comparison stack |
| 450+ Corporate Recruiter Logos | `stagger` | IntersectionObserver | 0.1 | 500ms (30ms step) | ease-out | Infinite marquee + grid fallback |
| Placed Trainees Grid | `stagger` | IntersectionObserver | 0.1 | 600ms (40ms step) | ease-out | 2-column photo cards with salary badge |
| Placement Cell SOP 4-Steps | `editorial` | IntersectionObserver | 0.15 | 600ms | ease-out | Step 1–4 sequential workflow |
| Corporate Hiring Portal CTA | `scale` | IntersectionObserver | 0.2 | 700ms | cubic-bezier(0.16, 1, 0.3, 1) | Direct recruiter phone & email links |

---

### 5. Faculty & Trainers (`/trainers`)
| Section ID / Name | Motion Preset | Trigger | Threshold | Duration | Easing | Mobile Fallback |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Faculty Master Hero | `editorial` | Load / 0.1 | 0.1 | 700ms | ease-out | Direct headline reveal |
| Practical Mentorship Philosophy | `fadeUp` | IntersectionObserver | 0.15 | 600ms | ease-out | Centered editorial card |
| 11 Faculty Leads Grid | `stagger` | IntersectionObserver | 0.1 | 600ms (50ms step) | ease-out | 2-column cards with bio & expertise |
| 54+ Verified Trainee Stories | `stagger` | IntersectionObserver | 0.1 | 500ms (40ms step) | ease-out | Paginated reviews grid |
| Demo Class Request Strip | `scale` | IntersectionObserver | 0.2 | 700ms | cubic-bezier(0.16, 1, 0.3, 1) | Instant demo reservation form |

---

### 6. Corporate Training (`/corporate-training-program`)
| Section ID / Name | Motion Preset | Trigger | Threshold | Duration | Easing | Mobile Fallback |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Corporate Hero & Value Prop | `editorial` | Load / 0.1 | 0.1 | 700ms | ease-out | Immediate title reveal |
| 6-Step Corporate Roadmap | `stagger` | IntersectionObserver | 0.1 | 600ms (40ms step) | ease-out | 2-column numbered process cards |
| Why Choose Us 8-Card Grid | `stagger` | IntersectionObserver | 0.1 | 500ms (40ms step) | ease-out | 2x4 card grid |
| Corporate & Startup Solutions | `depth` | IntersectionObserver | 0.15 | 650ms | ease-out | Alternating graphic banners |
| Enterprise Goal Lead Form | `scale` | IntersectionObserver | 0.2 | 700ms | cubic-bezier(0.16, 1, 0.3, 1) | Instant unblocked inquiry form |
| 3 Partnership Models | `editorial` | IntersectionObserver | 0.15 | 600ms (60ms step) | ease-out | 3-column service cards |
| Trending Corporate Blogs | `editorial` | IntersectionObserver | 0.1 | 500ms (60ms step) | ease-out | 3-column articles |
| Enterprise Training FAQs | `depth` | IntersectionObserver | 0.1 | 500ms | ease-out | Native touch accordions |

---

### 7. Certifications (`/certifications`)
| Section ID / Name | Motion Preset | Trigger | Threshold | Duration | Easing | Mobile Fallback |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Hero Banner Strip | `editorial` | Load / 0.1 | 0.1 | 700ms | ease-out | Direct image render |
| Page Title & Subtitle | `editorial` | IntersectionObserver | 0.1 | 600ms | ease-out | Expand/collapse buttons active |
| 30+ Credentials Accordion | `depth` | IntersectionObserver | 0.1 | 500ms | ease-out | Brand logo + cert count tags |
| Career Clarity Action Box | `scale` | IntersectionObserver | 0.15 | 700ms | cubic-bezier(0.16, 1, 0.3, 1) | 1-click brochure download |
| Trending Certification Blogs | `editorial` | IntersectionObserver | 0.1 | 500ms (60ms step) | ease-out | 3-column article previews |

---

### 8. 150+ Reasons to Choose DIDM (`/why-choose-didm`)
| Section ID / Name | Motion Preset | Trigger | Threshold | Duration | Easing | Mobile Fallback |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Hero Banner & Title | `editorial` | Load / 0.1 | 0.1 | 700ms | ease-out | Immediate title display |
| 150 Reasons & Sticky Form | `fadeUp` | IntersectionObserver | 0.1 | 600ms | ease-out | Search bar active, 50-item batches |
| Performance Stats (4 Circles) | `stagger` | IntersectionObserver | 0.15 | 600ms (60ms step) | ease-out | 2x2 circular badge grid |
| 15 Checkpoint Core Curriculum | `depth` | IntersectionObserver | 0.1 | 500ms | ease-out | 3-column checklist tags |
| Hybrid Courses (4 Cards) | `stagger` | IntersectionObserver | 0.1 | 600ms (50ms step) | ease-out | 2x2 course cards |
| Course Comparison Matrix | `editorial` | IntersectionObserver | 0.15 | 650ms (60ms step) | ease-out | Featured MIDM card highlighted |
| 9 Centre Location Cards | `stagger` | IntersectionObserver | 0.1 | 500ms (40ms step) | ease-out | 1-column address cards |
| Trending Editorial Blogs | `editorial` | IntersectionObserver | 0.1 | 500ms (60ms step) | ease-out | 3-column articles |

---

### 9. Gallery & Life@DIDM (`/gallery` & `/life-at-didm`)
| Section ID / Name | Motion Preset | Trigger | Threshold | Duration | Easing | Mobile Fallback |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Hero Banner & Headings | `editorial` | Load / 0.1 | 0.1 | 700ms | ease-out | Interactive campus filters |
| Batch / Life Photo Groups | `stagger` | IntersectionObserver | 0.1 | 500ms (30ms step) | ease-out | 2x4 image grid + modal viewer |
| CTA Action Section | `scale` | IntersectionObserver | 0.2 | 700ms | cubic-bezier(0.16, 1, 0.3, 1) | Direct call & demo buttons |
| Media & Trainee Video Reviews | `depth` | IntersectionObserver | 0.15 | 650ms | ease-out | Responsive embedded video player |
| 450+ Partner Brands Ribbon | `editorial` | IntersectionObserver | 0.1 | 500ms | ease-out | Recruiter logo badges |

---

### 10. Franchise & Batches (`/franchise` & `/upcoming-batches`)
| Section ID / Name | Motion Preset | Trigger | Threshold | Duration | Easing | Mobile Fallback |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Partnership / Schedule Hero | `editorial` | Load / 0.1 | 0.1 | 700ms | ease-out | Immediate title display |
| Turnkey Advantages / Active Cohorts | `stagger` | IntersectionObserver | 0.1 | 600ms (60ms step) | ease-out | 1-column responsive cards |
| Campus Specs / Assurance Features | `depth` | IntersectionObserver | 0.15 | 600ms | ease-out | 2-column specification cards |
| Direct Partner Inquiry Form | `scale` | IntersectionObserver | 0.2 | 700ms | cubic-bezier(0.16, 1, 0.3, 1) | Instant unblocked inquiry form |


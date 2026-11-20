# DIDM AI-First Adaptive Homepage — Repository & Capability Audit

**Document:** `DIDM_AI_AGENT_REPOSITORY_AUDIT.md`  
**Date:** November 20, 2026  
**Status:** Approved Architectural Audit & Reuse Assessment  
**Author:** Principal AI Systems Architect & Senior Next.js Engineer  

---

## 1. Executive Summary

This audit assesses the existing DIDM official website repository (`/Users/piyushkhurana/didm_official_website`) to establish the architectural foundation for an **AI-First Adaptive Homepage**. The mission is to transform the DIDM homepage into an intelligent, student-centric career discovery experience where an embedded conversational AI agent personalizes the homepage content (Hero copy, Course suggestions, Learning roadmap, Student testimonials, and Batch schedules) in real time.

The audit confirms:
- **No rebuild from scratch** is required.
- All core business entities (Courses, Syllabi, Campuses, Hiring Partners, FAQs, Student Stories) are already modeled and verified.
- Existing deterministic course-matching logic (`apps/web/src/lib/student/discovery.ts`) provides a rock-solid, zero-hallucination baseline.
- Existing brochure and catalogue data (`apps/web/src/lib/counsellor/knowledge-base.ts`) provides exhaustive institutional grounding.
- Standard SSR and SEO are fully intact; initial HTML delivers complete static indexable metadata and markup.

---

## 2. Inventory of Reusable Repository Assets

| Component / Subsystem | Location | Current Capability | Reuse Strategy in Adaptive Homepage |
| :--- | :--- | :--- | :--- |
| **Course Catalog & Specs** | `apps/web/src/lib/content/index.ts` | 6 published programs (`midm`, `advanced`, `dmi`, `customized`, `online`, `gen-ai-knowledge-camp`) with full module counts, formats, toolstacks. | Direct reuse as single source of truth for course recommendations. |
| **52-Module Master Syllabus** | `apps/web/src/lib/brochure/index.ts` | Complete 52-stop checkpoint roadmap with practical project mappings and tools. | Reused to power adaptive learning roadmaps and module previews. |
| **Deterministic Recommendation Engine** | `apps/web/src/lib/student/discovery.ts` | `recommendCourses()`, `LearnerProfile`, `CAREER_PATHS`, `SKILL_QUESTIONS`, `simulateFunnel()`. | Reused as the factual scoring engine for personalized course rankings. |
| **Grounding Knowledge Base** | `apps/web/src/lib/counsellor/knowledge-base.ts` | Token-matching retrieval across courses, campuses, fees, placements, trainer leadership, and FAQs. | Reused by server-side agent tools to answer factual user questions. |
| **Trained Counsellor Q&A** | `apps/web/src/lib/counsellor/trained-counsellor.ts` | Domain-specific answers for salary packages, placement drives, batch timings, and metro routes. | Grounding knowledge for conversational responses in English, Hindi, and Hinglish. |
| **Batch Scheduling Subsystem** | `apps/web/src/lib/admissions/batches.ts` | MongoDB / static fallback upcoming batch dates, weekday/weekend slots, and centre attribution. | Reused to display personalized upcoming batches matching preferred format/location. |
| **Published Student Stories** | `apps/web/src/lib/public/student-stories.ts` | Verified learner reflections and feedback with photos. | Categorized and dynamically highlighted based on visitor persona. |
| **Campus Directory (14 Hubs)** | `apps/web/src/lib/content/index.ts` | 14 metro-connected campuses across Delhi NCR, UP, Uttarakhand, Rajasthan, and Mumbai. | Reused for location preference matching. |
| **Lead & CRM Integration** | `apps/web/src/app/api/enquire/route.ts` | Validated lead ingestion with attribution, UTM preservation, and fraud prevention. | Reused for consent-based counselling handoff. |
| **Motion & Design Tokens** | `apps/web/src/components/motion/` | `MotionSection`, `MotionHeading`, `StaggeredCardGrid`, `SplitContentReveal`, reduced-motion safety. | Reused for smooth UI transitions without layout shifts. |

---

## 3. Gap Analysis for AI-First Adaptive Experience

| Requirement | Existing State | Gap to Address | Implementation Plan |
| :--- | :--- | :--- | :--- |
| **Embedded AI Assistant** | Floating widget in bottom-right corner (`DIDMCourseCounsellor.tsx`) and static hero (`CreativeStudioHero.tsx`). | Assistant is disconnected from page content; no live homepage adaptation. | Build `AdaptiveHeroSection.tsx` with an embedded, first-class conversational AI Guide in the hero layout. |
| **Live Homepage Personalization** | Homepage sections render fixed content. | Visitors with different goals (student vs business owner) see identical copy. | Create `AdaptiveHomepageContext` to drive real-time personalization of Hero, Courses, Roadmap, Stories, and Batches. |
| **Conversational NLU & Intent Engine** | Basic keyword/token search in `/api/counsellor`. | Limited multi-turn context; cannot output structured homepage update directives. | Create `/api/ai-guide` with structured JSON output, multi-turn state, and conversational Hindi/English/Hinglish understanding. |
| **Grounded Agent Tool Execution** | Monolithic query function. | No modular, sandboxed tool definitions for model invocation. | Implement typed read-only tool functions (`searchPublishedCourses`, `getCourseDetails`, `getBatches`, `getRoadmap`, `getFaqs`). |
| **Consent-Based CRM Handoff** | Generic `/enquire` page. | No context-aware transition from AI chat to admissions counsellor. | Create inline counselling handoff card passing recommended course, goal, and conversation context to `/api/enquire`. |

---

## 4. Architecture Decision Records (ADRs)

### ADR-01: Embedded AI Guide over Floating Chatbot
- **Decision:** The AI Career Guide is embedded directly into the homepage hero section as a primary product interaction, with an expandable conversational canvas.
- **Rationale:** A floating bot in the bottom corner feels like customer support. Embedding it into the hero establishes DIDM as a modern, forward-thinking digital academy.

### ADR-02: Deterministic Business Truth with AI Explanation
- **Decision:** All factual matching (which courses exist, which batches are available, which campuses are open) is governed by deterministic repository data (`discovery.ts`, `content/index.ts`). The AI layer explains and contextualizes; it never invents courses or fees.
- **Rationale:** Prevents hallucinated fees, false placement guarantees, or phantom courses while retaining the natural warmth of conversational guidance.

### ADR-03: Zero SEO & SSR Regressions
- **Decision:** The server-rendered page (`page.tsx`) renders the full, complete, indexable DIDM homepage. Personalization is applied as an interactive client enhancement over SSR.
- **Rationale:** Ensures search engines (Google, Bing) crawl 100% of the course catalogue, accreditation, and campus data, while users enjoy dynamic adaptation.

### ADR-04: Graceful Degradation & Provider Fallback
- **Decision:** If no external LLM API key is present or if an API call fails/times out, the system automatically falls back to an internal deterministic NLU intent classifier that produces the exact same structured JSON schema.
- **Rationale:** The website will never crash, stall, or display broken UI during network or provider outages.

# DIDM AI Course Counsellor — Architecture & Implementation

**Feature:** Conversational Academic Advisor for Course Discovery & Admissions  
**Implementation Date:** November 5, 2026  
**Status:** **Implemented, Grounded in Verified Data & Integrated Globally**  

---

## 1. Safety & Grounding Principles

To prevent hallucinations, fabricated salary claims, or unapproved admissions promises, the **DIDM AI Course Counsellor** operates under strict grounding:

1. **Truthful & Documented Answers Only:** All responses are derived directly from the verified course repository (`apps/web/src/lib/content/index.ts`).
2. **Honest Provider Notice:** Since no external LLM API key (`GEMINI_API_KEY` or `OPENAI_API_KEY`) is configured in `.env.local`, the system truthfully identifies verified catalog responses and routes open-ended queries directly to human academic counseling rather than faking AI generation.
3. **Zero Hallucinated Guarantees:** Explicitly distinguishes between dedicated placement support (mock interviews, 650+ hiring partner drives) and false job guarantees.

---

## 2. Technical Components

1. **Knowledge Retrieval Engine ([`knowledge-base.ts`](file:///Users/piyushkhurana/didm_official_website/apps/web/src/lib/counsellor/knowledge-base.ts)):**
   - Indexes all 6 course programs, syllabi topics, 14 campus addresses, metro connectivity, published tuition fees, and cohort timings.
   - Categorizes queries into Fee/EMI, Course Details, Centre Locations, Placement Support, and Batch Timings.
   - Attaches clickable navigation shortcuts (`suggestedActions`) and relevant follow-up questions (`suggestions`).

2. **Server-Side API Route ([`/api/counsellor`](file:///Users/piyushkhurana/didm_official_website/apps/web/src/app/api/counsellor/route.ts)):**
   - Sanitizes and enforces length limits (max 500 characters).
   - Keeps any future API keys strictly server-side.
   - Gracefully traps errors and returns official phone/WhatsApp counseling fallbacks.

3. **Client UI Island ([`DIDMCourseCounsellor.tsx`](file:///Users/piyushkhurana/didm_official_website/apps/web/src/components/counsellor/DIDMCourseCounsellor.tsx)):**
   - Floating launcher in the bottom-right corner with a subtle glowing pulse.
   - Opens an accessible, slide-up conversational modal with suggested prompts.
   - Formatted markdown bubbles with verified source tags, external links, and reset controls.
   - Automatically adapts to a full-screen drawer on mobile screens.


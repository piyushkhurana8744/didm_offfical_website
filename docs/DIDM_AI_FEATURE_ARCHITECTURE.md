# AI and student feature architecture

Assessment: 17 November 2026, Asia/Kolkata. This report distinguishes implemented code, verified behavior and work still required. No production deployment or database migration performed.

## Findings and decision
No Sarvam code, endpoint, model configuration or voice flow was found in the inventoried checkout. No Sarvam configuration or provider was modified. Existing counsellor is deterministic brochure/website retrieval, not a generative model call. Its hardcoded refund, employment and placement statements require approval; existing integration remains intact.

The new course finder uses local explicit rules against existing course identities. A rule engine is sufficient for six programs, has no inference charge and provides reproducible reasons. It is clearly labeled as catalog matching, not generative AI. Career paths are suggested guidance, quizzes are educational self-checks and funnel figures are illustrations. No salary/outcome forecast or automatic admissions decision.

## Data and privacy
Profile = goal + experience + interest + mode + time preference. Stored only in React state, never sent to an API or persisted. Course data sent to the client is a lightweight projection, excluding fees and full curriculum payloads. No model key, prompt secret or personal data is introduced. Normal program and enquiry journeys work independently. Human handoff uses actual /enquire with course context.

## Existing counsellor risks / future work
Review approved knowledge and remove unsupported promises under a dedicated content change. If an external provider is later connected, retain Sarvam boundaries, use server-only credentials, approved retrieval with provenance, request length caps, rate/cost limits, timeout/circuit breaker, verified fee/batch source, redacted logs, privacy consent and human fallback. This is proposed work, not implemented provider infrastructure. Current endpoint has bounds on message/history but lacks a distributed abuse limiter. No replacement provider is justified or added.


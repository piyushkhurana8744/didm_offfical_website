# Phase 2 — current evidence

Assessment: 17 November 2026 (Asia/Kolkata). Local implementation only. No deployment, migration or authenticated database mutation.

## Current implementation
General reveal, section, word, image and card primitives now use the shared `useScrollEntrance` hook: native IntersectionObserver/Web Animations, server-visible content, no pre-hiding, at most sixteen targets per group, bounded delays, cancellation/cleanup and live reduced-motion support. ProgressiveTimeline uses observed milestones rather than a global per-scroll listener and shows all content when reduced motion is requested. The established GSAP hero and campaign storytelling remain; no new animation library or WebGL scene was introduced.

Course progress retains its existing student/path illustration while changing the copy toward learning, constraining horizontal scrolling to the map/selector, enlarging targets and scoping arrow handling to controls. Mounting no longer scrolls the page. A live reduced-motion change stops travel. Off-homepage entrance, mobile target size, native scroll and reduced-motion checks are in `phase-2/journey-qa.json`.

Use transforms/opacity for transient entrances, never layout-affecting scroll-jacking or invisible essential content. Treat motion as hierarchy and educational explanation. Full low-end device profiling remains a gate.


<!-- END_PHASE_2 -->

## Historical phase-one report (retained)

# Animation design system

Assessment: 17 November 2026, Asia/Kolkata. This report distinguishes implemented code, verified behavior and work still required. No production deployment or database migration performed.

## Existing system retained
Reuse components/motion rather than introduce another library. MotionSection observes sections and dynamically imports GSAP. Text/images remain in server HTML; native scrolling stays available. Existing campaign storytelling and studio format controls remain. New pages compose MotionSection around career, assessment and lab sections.

| Inventory | Meaning | Safeguards |
|---|---|---|
| Hero headline / studio entrance | Idea → creation → campaign format | GSAP context cleanup, reduced-motion fallback |
| MotionSection / MotionHeading | Section hierarchy and meaningful image entrances | IntersectionObserver, bounded targets, no form hiding |
| RevealOnScroll / SplitContentReveal / MaskedImageReveal | Reveal educational content | Existing source retained |
| ProgressiveTimeline / InteractiveCourseRoadmap | Learning progression | Existing keyboard/content controls retained |
| StaggeredCardGrid / TiltCard / MagneticButton | Explore course actions | Existing components retained; no extra effect library |
| Career path switching | Skills and projects update together | aria-pressed + polite live region; no forced scrolling |
| Finder steps/results | Make choices and understand recommendations | Heading focus after action; native radios, stable panel |
| Funnel bars | Conversion rate changes output proportions | Short CSS width transition; disabled under reduced motion |
| Quiz feedback | Explain correctness after submission | Live score, readable explanations, no celebratory distraction |
| Batch filter results | Show current matches | Live count, stable layout, no urgency animation |

## Rules
Use transforms/opacity where practical, avoid scroll-jacking and global timers, reserve image dimensions, leave essential copy visible without animation. New student styles disable transitions/animation under prefers-reduced-motion. No new autoplay video, WebGL scene or motion package. Existing Three.js features remain isolated. Browser reduced-motion and width smoke checks are evidence of those paths only, not a sitewide GPU performance certification.


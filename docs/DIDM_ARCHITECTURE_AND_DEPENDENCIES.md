# DIDM next-generation assessment

Assessment date: 17 November 2026 (Asia/Kolkata). Status: implementation in progress. Existing uncommitted work retained. Source inventory is not proof of functional completeness. No production database writes or deployment authorized.

## Architecture
Browser → Next.js 15 App Router → server route handlers → Mongoose → existing MongoDB CMS collections. Static course/centre catalog and source-provenance JSON feed server pages and client discovery. Counsellor → deterministic brochure/website retrieval; no external model call found. Admin → currentAdmin → Role permissions → mutation APIs → transactional revisions/audit.

## Dependency map
- Marketing pages: lib/content/index.ts → lib/brochure/index.ts → JSON; no Mongo dependency for course discovery.
- Admissions: EnquiryForm/EnquirySubmission and page forms → POST /api/enquire → countRecentWebsiteLeads → createWebsiteLead → Lead + LeadActivity transaction.
- CMS homepage: editor → PUT /api/admin/pages/homepage → saveHomepageDraft; publish/restore APIs → Page + PageRevision + AuditLog. Public integration missing at baseline.
- Security: cookies/headers → Session → User → Role → hasPermission; eight-hour sessions.
- Media: didm-media registry + local public/images + next/image; provenance JSON and Python import tooling.
- Motion: GSAP dynamically imported by motion components; Three/Fiber/Drei exist for optional 3D, not necessary for new features.
- Storage migration: tools/didm-cms handles SQLite → MongoDB; never run as part of website redesign.

No separate LMS, payment service, Zoom service, Sarvam integration, deployment pipeline or external CRM API discovered. These absences are repository observations, not conclusions about the wider business. Environment values were not needed for this implementation.

# DIDM next-generation assessment

Assessment date: 17 November 2026 (Asia/Kolkata). Status: implementation in progress. Existing uncommitted work retained. Source inventory is not proof of functional completeness. No production database writes or deployment authorized.

## Scope and method
315 source/config/tool files inventoried, 81,356 lines; 46 page files and 7 API handlers at baseline. Machine-readable exports, fetch targets, environment key names and file sizes: `DIDM_REPOSITORY_EVIDENCE.json`. Source review focused on all architecture boundaries, public route families, data, API handlers, CMS authentication, permissions, persistence, motion and existing QA. This is not a claim of exhaustive line-by-line review of 81k lines. Prior reports are historical evidence, not current passing tests.

## Findings with evidence
| Area | Evidence | Finding | Action |
|---|---|---|---|
| Workspace | root package.json, pnpm-workspace.yaml, turbo.json | pnpm/Turbo monorepo; one Next.js application; Python and Node tools | Retain stack |
| Rendering | apps/web/src/app/layout.tsx, page.tsx | App Router, server/client mix, homepage force-dynamic | Keep indexable server content |
| Design | src/styles/{globals,creative,campaign,editorial,premium-restoration}.css | Five cascading style layers, external Google fonts, multiple historical overrides | Scope new styles; avoid global rewrite |
| Homepage | src/app/page.tsx, components/creative/CreativeStudioHero.tsx | Existing animated studio and storytelling; promotional billboard dominates first screen | Elevate existing composition |
| Data | src/lib/content/index.ts, src/data/brochure/* | Six typed courses, fourteen centres; static records conflict with live claims | Reuse identities; require content approval |
| CRM | src/app/api/enquire/route.ts → lib/mongodb/repositories.ts → Lead + LeadActivity | Real transactional lead persistence; database required; no external CRM transport found | Retain lead workflow |
| Form | components/EnquiryForm.tsx | Any response renders success including success:false; labels unassociated | Fix truthful states and accessibility |
| Attribution | types/backend.ts vs enquiry route/repositories | utmParams declared but ignored; sourceUrl saved | Add bounded attribution without migration |
| Batches | src/app/upcoming-batches/page.tsx | Six invented relative dates, remaining seats and weekly-update claims | Replace with published source and honest empty state |
| Admin | src/app/admin/[module]/page.tsx | Most editors explicitly say Foundation ready | Mark partial, never claim complete CMS |
| Homepage CMS | lib/mongodb/pages.ts vs app/page.tsx | Draft/publish/revisions exist; public page does not call getHomepage | Connect published content |
| Authentication | lib/cms/auth.ts, permissions.ts | scrypt passwords, hashed sessions, TTL, role permissions, login throttling | Preserve; validate in isolated DB before release |
| Database | lib/mongodb/models.ts, lib/cms/schema.sql | MongoDB authoritative; SQLite legacy schema and migration tools | No migrations or index changes |
| AI | api/counsellor, lib/counsellor/* | Deterministic retrieval; broad hardcoded policy claims need review | Preserve; no provider replacement |
| Sarvam/Zoom/payments/LMS | inventory envKeys/fetches and source search | No Sarvam implementation found in this checkout; Zoom/LMS content mentions, no integration handlers | Do not alter assumed external systems |
| SEO | app/{sitemap,robots}.ts, layout.tsx, public/robots.txt | Conflicting robots routes; canonical inheritance risk; unsupported root metadata statistics | Fix targeted metadata/route conflicts |
| Motion | components/motion/*, creative/CampaignJourney.tsx | GSAP reuse; native scrolling; reduced motion support | Reuse; no new motion dependency |
| Security | .env.example | Database credential committed in example | Redact example, rotation required externally; never print secret |
| QA | scripts/*, tools/didm-cms/migration-core.test.mjs | Existing browser scripts, migration tests; lint uses deprecated next lint command without an ESLint configuration | Establish current evidence |

## Baseline verification
`pnpm --filter web typecheck` passed. Running application on localhost:3000 returned HTTP 200. Browser baseline at 1440×1000 captured to `next-generation/home-before.png`, one H1 and no document overflow. No lead submission to a real database performed. No admin account or production credentials used.

## Compatibility and rollback
Keep all pre-existing working tree changes. New student tools are additive. Preserve course IDs, centre IDs, CRM leadSource, auth and session contracts. Homepage presentation change reuses the existing studio. Roll back only this increment's targeted edits/new files, never git reset/clean. No production-ready classification without runtime evidence.


## Observed database access blocker

The local production runtime returned a MongoDB authorisation error on a read of `didm_cms.pages` (`find` permission denied). The public homepage used its static fallback; no credentials, roles or database grants were changed. The batch source also correctly showed its admissions fallback. Published-content and real lead persistence cannot be signed off with the current database access. Correct grants must be supplied by the database owner and verified in an isolated test environment.

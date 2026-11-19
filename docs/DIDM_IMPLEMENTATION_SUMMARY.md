# DIDM next-generation implementation index

17 November 2026 · Local repository changes; no deployment.

This is a verified implementation increment, not a claim that every phase in the master brief is complete. Start with the readiness report for outstanding launch requirements.

## Phase-two review

The current pass is documented in [the visual excellence audit](DIDM_VISUAL_EXCELLENCE_AUDIT.md) and [Phase 2 implementation report](DIDM_PHASE_2_IMPLEMENTATION_REPORT.md). Review [side-by-side screenshots](phase-2/visual-comparison.html), [current regression evidence](DIDM_TEST_AND_REGRESSION_REPORT.md) and [classified launch gates](DIDM_PRODUCTION_READINESS_REPORT.md). Production remains unapproved.

## Delivered

- Improved existing homepage composition, retained studio interactions and authentic imagery; connected the existing published homepage heading/media.
- Added `/course-finder` and embedded discovery in `/programs`: explained matching, career exploration, a scored skill exercise and interactive funnel arithmetic.
- Replaced invented upcoming dates and remaining seats with published, attributed, future-only schedules; filters preserve enquiry context.
- Extended the existing admin at `/admin/batches`, using existing course permissions, SiteSetting, transactions and audit logs.
- Corrected false enquiry success, preserved failed entries, added form semantics, bounded validation and UTM/form attribution through the original lead workflow.
- Made learning prompts actually copyable, provided manual-copy fallbacks and linked interactive exercises to real destinations.
- Added discovery metadata/sitemap, four exact legacy course redirects, admin noindex and a keyboard skip link. Moved duplicate public robots file into documentation; the Next metadata route remains authoritative.
- Kept the full news JSON on the server for the homepage's three-card selection: reported homepage first-load JavaScript decreased from 305 kB to 140 kB (approximately 54%). This is a build report, not a field speed score.
- Removed credential content from `.env.example`; runtime secrets were not changed. External revocation/rotation remains required.

## Reports

1. [Repository audit](DIDM_COMPLETE_REPOSITORY_AUDIT.md)
2. [Architecture and dependency map](DIDM_ARCHITECTURE_AND_DEPENDENCIES.md)
3. [Existing feature matrix](DIDM_EXISTING_FEATURE_MATRIX.md)
4. [Live reference audit](DIDM_REFERENCE_WEBSITE_AUDIT.md)
5. [Reference comparison matrix](DIDM_REFERENCE_VS_REPOSITORY_GAP_MATRIX.md)
6. [Canonical feature gap matrix](DIDM_FEATURE_GAP_MATRIX.md)
7. [Information architecture](DIDM_INFORMATION_ARCHITECTURE.md)
8. [UI/UX direction and component inventory](DIDM_UI_UX_TRANSFORMATION_PLAN.md)
9. [Animation inventory and rules](DIDM_ANIMATION_DESIGN_SYSTEM.md)
10. [AI/student feature architecture](DIDM_AI_FEATURE_ARCHITECTURE.md)
11. [CRM integration and limitations](DIDM_CRM_INTEGRATION_PLAN.md)
12. [Phased roadmap](DIDM_IMPLEMENTATION_ROADMAP.md)
13. [Testing and regression report](DIDM_TEST_AND_REGRESSION_REPORT.md)
14. [Production readiness and acceptance checklist](DIDM_PRODUCTION_READINESS_REPORT.md)

## Evidence

- `DIDM_REPOSITORY_EVIDENCE.json`: baseline source inventory, exports, fetch targets and environment key names; no credential values.
- `next-generation/reference-inventory.json`: bounded 100-URL live reference crawl, including soft 404 observations.
- `next-generation/reference-home-{1440,768,390}.png`: reference homepage viewports.
- `next-generation/home-before.png`, `home-after-1440.png`, `home-{1440,768,390}.png`: implementation before/after views.
- `next-generation/course-finder-{1440,768,390}.png`, `finder-results.png`, `upcoming-batches-*.png`, `programs-*.png`: student journey captures.
- `next-generation/browser-qa.json`: actual browser results and verification limits.
- `next-generation/production-build.txt`: successful build with route and JavaScript size report.

## Reproduce without creating production leads

```sh
pnpm --filter web typecheck
node --test scripts/next-generation-unit.test.cjs
pnpm --filter web test:migration
pnpm --filter web exec next build
pnpm --filter web exec next start -p 3001 --hostname 127.0.0.1
```

In another terminal:

```sh
node scripts/next-generation-qa.cjs
```

Browser QA defaults to port 3001 and intercepts valid enquiry responses. Override the preview with `DIDM_QA_URL` if necessary. It submits only invalid enquiry input and unauthenticated admin requests to the actual APIs. No valid production leads, authenticated writes, migrations or deployments are performed by the suite.

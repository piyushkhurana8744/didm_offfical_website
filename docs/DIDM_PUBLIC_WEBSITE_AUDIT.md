# DIDM public website audit

Audit date: 2026-11-05. This is a source/build audit; no browser screenshots or visual regression runner were available.

## Route inventory

Public routes include the homepage, about, programs listing and dynamic program details, centres listing and dynamic centre details, comparison, enquiry, outcomes, stories, learning hub, article, organisations and legacy redirects for `/program` and `/centre/dwarka`. Sitemap and robots handlers exist. There are no dedicated contact, privacy, placements, college-training or paginated blog routes; related content currently lives under enquiry, outcomes, organisations and learn.

## Findings

- The homepage already had substantial course, tools, career, campus, certification, placement, FAQ and conversion content, but lacked a clear institute introduction, transparent methodology, concise centre discovery and an embedded persistent enquiry workflow.
- A simulated campaign console displayed outcome-like metrics without a data source. It was inappropriate for an evidence-led public homepage and has been removed from the rendered page.
- Campus presentation mixed remote DIDM URLs and generic stock imagery. It now uses only the verified local media registry.
- Institutional counts varied between 13+ and 14. Shared public copy now uses repository-backed counts or neutral wording; remaining route-specific claims require a content provenance review.
- The learning-hub newsletter reported success only in client state and had no backend. The fake subscription form was removed and replaced with an honest link to request learning updates.
- Student-story records exist in static data, but the repository does not record source URLs or verification evidence for each quotation. They require editorial provenance review before being described as independently verified.
- Some centre review counts, placement wording, certification support wording and course claims are embedded in static content. The most prominent shared claims were softened; a full fact-by-fact editorial review remains necessary.
- Navigation is responsive and route-aware, but desktop dropdowns depend heavily on hover. Keyboard focus styles are now globally visible; full keyboard interaction testing remains outstanding.
- Enquiries truthfully fail when MongoDB persistence is unavailable. The current Atlas identity can ping but is not authorized to read `didm_cms`, so live submission persistence is blocked.
- Root metadata, organization JSON-LD, sitemap and robots exist. Canonical base, Open Graph image, Twitter metadata and admin crawling exclusion were added. Per-route canonical/structured-data consistency still needs review.
- Google Fonts are imported through CSS and therefore depend on a third-party request. A future performance pass should self-host approved font files if licensing permits.

## Responsive and accessibility risks

Source styles use responsive grids and horizontal overflow protection. Touch targets generally meet 44px in shared buttons. Remaining risks requiring real browser inspection at 375, 768, 1024 and 1440px include mega-menu keyboard behavior, long course names, centre filter chips, comparison-table overflow and dynamic form error announcements. `prefers-reduced-motion` is respected globally.

## Priority backlog

1. Browser and keyboard verification of the shared shell and completed homepage.
2. Add a real newsletter provider only after consent, retention and delivery requirements are approved.
3. Editorial provenance review for testimonials, awards, reviews, fees and outcome claims.
4. Purpose-built passes for program details, centre details, outcomes, stories, learn/article, organisations and about.
5. Add missing contact/privacy content and decide canonical URLs with stakeholders.

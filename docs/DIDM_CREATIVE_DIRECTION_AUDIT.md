# DIDM creative direction audit

Scope: local repository, November 13, 2026. No publication or database testing.

Installed stack verified with `pnpm --filter web list --depth 0`: Next 15.5.29, React 19.3.1, TypeScript 5.9.3, Tailwind 3.4.19, GSAP 3.15.1 and Three 0.187.0. Existing React Three Fiber/Drei remain installed; no dependencies were added.

## Observed baseline

Chrome/Playwright baseline screenshots and route responses: `docs/audit_screenshots/creative/before/`.

- An interrupted implementation already contained a Space Grotesk / Manrope studio hero and three original OFFSCRIPT SVG campaign assets. These are working-tree changes, not the committed baseline; they were retained and developed.
- The hero linked to `#campaign-journey`, but that section did not exist.
- The homepage course list duplicated the curriculum source and linked DMI to Master.
- Advanced and Online course pages led with dense, wide bitmap course banners. Their explicit routes inherited homepage metadata.
- Stories and Contact had no H1 in the baseline browser run.
- Multiple forms used timers or unconditional state changes to announce success. About ignored API failure; the homepage sent field names that did not match the lead API.
- Shared section/card reveals used page-load timers, so below-fold motion could finish before the visitor arrived. Several wrappers also hid server-rendered content.
- Branch pages reused Rajouri Garden photographs under other branch names.

## Design judgments

The early studio hero had a coherent ivory/crimson/cobalt composition worth developing. Its mobile visual appeared too low. The old banners, crowded text, repeated cards and unrelated campus/book/folder presentation did not explain contemporary creative marketing clearly.

The chosen system uses Space Grotesk display typography, Manrope body text, warm ivory, graphite and DIDM crimson, with cobalt confined mainly to illustrative artwork and analytics. Desktop/mobile browser comparisons informed headline scale, tighter mobile spacing and the studio’s position before the authenticity strip. No owner design approval is implied.

## Changes selected

A native-scroll campaign story; six correctly routed program entries; distinct curriculum explorers; photo-led institutional/editorial introductions; original student feedback with matching source photos; visible, honest enquiry status; source-derived branch galleries. Retired 3D components remain in the repository for compatibility and are absent from the homepage composition.

Official reference: https://www.didm.in/ . Existing source captures and datasets remain the content authority; this redesign does not independently re-certify all legacy institutional claims.

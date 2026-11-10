# DIDM Media Migration Report

Last updated: 5 November 2026 (Asia/Kolkata)

## Current status

Offline discovery and the guarded import pipeline are complete. No network
request or live media download was performed. The requested approval gate is
therefore still intact: downloading, local media integration, and visual browser
verification are pending explicit approval of this inventory.

## Offline inventory

The importer inspected `crawler-output/media_manifest.csv`, `pages.jsonl`,
`page_content.json`, and all 22 saved files in `crawler-output/raw_html/`. It
discovers `img` sources, responsive/lazy attributes, `picture`/`source` entries,
inline and embedded CSS URLs, Open Graph/Twitter metadata, icons, and normalized
crawler image fields. Relative URLs are resolved against their referring page.

- Unique original image URLs discovered: **375**
- Eligible DIDM-host image assets: **355**
- Eligible media hosts: **2** (`didm.in`, `www.didm.in`)
- Third-party assets pending authorization: **20**
- Blog-host assets found: **0**
- Existing files under `apps/web/public` that are images: **0**
- Existing broken local image references in frontend source: **0**
- Network requests made during discovery: **0**

The exhaustive URL-to-referrer mapping is in
`tools/didm-media-import/dry-run-inventory.csv`. It is the canonical list of all
375 discovered URLs, including intended category, discovery mechanism, alt text,
authorization status, and planned local destination.

### Host counts

| Host | Discovered | Decision |
|---|---:|---|
| `www.didm.in` | 286 | Eligible |
| `didm.in` | 69 | Eligible |
| `cdn-icons-png.flaticon.com` | 17 | Pending authorization |
| `q.quora.com` | 2 | Pending authorization; tracking URLs are not suitable media |
| `www.gstatic.com` | 1 | Pending authorization |

### Preliminary section mapping

| Category | Assets |
|---|---:|
| Courses | 134 |
| Centres | 74 |
| Students | 72 |
| Trainers | 35 |
| Logo | 26 |
| Blog/news context | 20 |
| Placements | 7 |
| Certifications/awards | 6 |
| Homepage-only | 1 |

These categories are deterministic routing suggestions based on URL, referring
page, and source alt text. Each asset must still pass download validation and be
matched to the exact course, branch, trainer, student, or section before frontend
use. Nothing will be assigned merely to fill space.

## Expected approved live run

An approved run would make **355 media GET requests**, plus **2 robots.txt GET
requests**, for a minimum of **357 GET requests**. Redirects cannot be counted
exactly offline; every redirect will be revalidated. The script makes one request
at a time per host and maintains at least a three-second interval per host.

The blog host is hard-blocked while its reported TLS issue remains unresolved.
The live path fails closed if robots.txt cannot be verified, keeps TLS certificate
verification enabled, rejects private/non-global destinations, checks redirects,
caps responses at 25 MiB, restricts image MIME types, validates file signatures,
deduplicates by SHA-256, refuses conflicting overwrites, and appends resumable
download records containing source/referrer, hash, size, MIME, authorization, and
destination. HTTP errors such as 403, 404, 406, 429, and 5xx are recorded without
bypass behavior.

## Frontend status

The current frontend has no local image assets or local image references to
repair. Its authentic DIDM references are currently remote: the DIDM logo is
served from an existing Cloudinary URL, and two campus-gallery entries point to
`www.didm.in`. Four decorative images are from Unsplash. Those references were
preserved because the task prohibits replacing them with unrelated imagery and
the authentic files cannot be stored locally before approval.

- Images successfully downloaded: **0** (approval pending)
- Images integrated as verified local files: **0** (approval pending)
- Failed/unavailable downloads: **0** (no live attempt made)
- Images pending authorization: **20 third-party assets**
- Pages visually verified with migrated local media: **0** (migration not yet downloaded)

After approval, the integration order will be logo, homepage, programs, centres,
about/trainers/students, placement and certification material, then blog/news.
Local assets will use `next/image` with stable dimensions or aspect ratios,
responsive `sizes`, meaningful alt text, hero-only priority loading, lazy loading
elsewhere, appropriate cropping, and non-broken fallbacks.

## Verification performed

- Offline dry run completed and produced 375 unique records.
- Importer unit tests cover relative URLs, `srcset`, CSS, Open Graph images,
  unsafe URL exclusion, signature validation, blog blocking, and third-party hold.
- Python syntax compilation passed.
- Next.js TypeScript validation (`tsc --noEmit`) passed.
- The configured `next lint` command did not run non-interactively because this
  repository has no ESLint configuration and Next.js opened its first-time setup
  prompt. No configuration was selected or changed.
- Frontend source scan found no broken local image path to fix.

The machine-readable aggregate is
`tools/didm-media-import/dry-run-summary.json`; importer usage and the explicit
download gate are documented in `tools/didm-media-import/README.md`.

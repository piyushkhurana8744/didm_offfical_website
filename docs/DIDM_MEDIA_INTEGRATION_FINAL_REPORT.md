# DIDM Media Integration Final Report

Last updated: 5 November 2026 (Asia/Kolkata)

## Final pilot outcome

The approved 12-image pilot is complete. The initial run downloaded two images;
the policy-corrected retry selected exactly the ten outstanding approved URLs,
skipped the two SHA-256-verified files, and downloaded all ten. No URL outside the
persisted pilot was selected.

| Outcome | Initial run | Corrected retry | Final total |
|---|---:|---:|---:|
| Downloaded | 2 | 10 | 12 |
| Resume-skipped | 0 | 2 | 2 verified skips on retry |
| Blocked | 10 | 0 | 0 remaining |
| Failed | 0 | 0 | 0 |
| Invalid resume entries | 0 | 0 | 0 |

No production system was modified, no TLS or robots restriction was bypassed,
and no third-party, blog, or non-pilot asset was requested.

## Robots verification diagnosis and fix

The original importer disabled automatic redirects for safety but its robots
loader treated every robots.txt redirect as a terminal failure. Diagnostics with
the importer's actual User-Agent established:

- DNS: `didm.in` resolved publicly to `103.50.160.23`.
- TLS: Python's default trust store successfully validated the `didm.in`
  Let's Encrypt certificate using TLS 1.3 (`TLS_AES_256_GCM_SHA384`).
- Initial GET: `https://didm.in/robots.txt` returned HTTP 301 with
  `Location: https://www.didm.in/robots.txt`.
- Redirect GET: the allowlisted HTTPS destination returned HTTP 200,
  `Content-Type: text/plain`, and 86 bytes of valid robots rules.
- Rules: `User-agent: *`, empty general `Disallow`, and `Disallow: /cgi-bin/`.
  The approved media paths are permitted.
- The importer User-Agent was not rejected. DNS, TLS, trust store, and server
  policy were healthy; controlled robots redirect handling was the missing case.

The corrected loader explicitly validates HTTPS, allowlisted host, public IP,
per-host delay, loop/redirect limit, status, `text/plain` content, non-HTML body,
UTF-8 validity, and the resulting rules. Cross-host robots content is cached as
the original host's policy without substituting or rewriting media URLs. Media
redirects continue to receive their own per-hop policy and rate checks.

## Verified assets

Every file exists locally and independently passed recorded byte-size, SHA-256,
MIME/signature, full Pillow decode, and dimension checks. All were visually
inspected against source/referrer context.

| Identity | Final local path | Dimensions | SHA-256 |
|---|---|---:|---|
| Official DIDM logo | `apps/web/public/images/didm/logo/didm-logo-reg-d147db09a041.png` | 400×125 | `d147db09a0416369e134c24d2a222d678f299c534cc96ec12d57c442896a30d2` |
| General course banner | `apps/web/public/images/didm/courses/digital-marketing-banner-2-f1bfa6ba7d26.jpg` | 1280×379 | `f1bfa6ba7d2651085fc586bfcf9f37e32e30150f311235c8f4eed39461fa0568` |
| MIDM course artwork | `apps/web/public/images/didm/courses/master-in-digital-marketing-course-midm-didm-0e3cbe9c3dd3.webp` | 500×400 | `0e3cbe9c3dd3ccd3abd8c1a7a90cf87ecda8626359032cb4f55a94d23a3ca32c` |
| Noida branch banner | `apps/web/public/images/didm/centres/ai-powered-digital-marketing-course-noida-didm-branch-9e326f9f636c.webp` | 1500×400 | `9e326f9f636cd4c9ed7417cdbc157eb6b22c471e87c384fad0461a16261a32dc` |
| Advanced course card | `apps/web/public/images/didm/courses/advanced-in-digital-marketing-course-aimtp-course-didm-1cdd1ada7c96.webp` | 500×400 | `1cdd1ada7c96d77ce5fe9bafafb16f918559c80463b1160b3b6288fe7abd5a1d` |
| Advanced course hero | `apps/web/public/images/didm/courses/ai-powered-advanced-digital-marketing-course-f9f127558aac.png` | 1500×400 | `f9f127558aac0cc3dc60d1cf35ee1ce3ec52496b1cda1ca0cdc1065a58e455df` |
| Meerut branch banner | `apps/web/public/images/didm/centres/digital-marketing-course-in-meerut-garden-branch-by-didm-cdf90dffffbc.jpg` | 1500×400 | `cdf90dffffbc5b7fc03b362eca2a47752ac331b91f4bd0c4736efbe030922f5a` |
| College training photo | `apps/web/public/images/didm/courses/college-program-by-didm-b67088073004.jpg` | 1500×1000 | `b67088073004e32fa344a8b4ae1139843e97777ab9024fa54445bd76de9b0556` |
| Corporate training photo | `apps/web/public/images/didm/courses/corporate-training-program-b2b28b0d9008.jpg` | 1500×1000 | `b2b28b0d9008174f8e25f054430448edb0e0c5510a1584b97eff05067b6ef32c` |
| Haldwani branch banner | `apps/web/public/images/didm/centres/didm-in-haldwani-branch-a78266e244a3.webp` | 1500×400 | `a78266e244a3ef8d84faa69bbe67488f68b62b55514d10fbc79ca885519b779c` |
| Media/news strip | `apps/web/public/images/didm/blog/media-news-d13077c0380c.png` | 1796×250 | `d13077c0380c1998c2a8047de16e3ef4cef7e768c993824b17b028d2911c10bc` |
| Historical online Advanced fee graphic | `apps/web/public/images/didm/courses/didm-online-advanced-course-fees-bc5606fa52dd.webp` | 312×770 | `bc5606fa52ddc410c9fec92389b608dec4cb85cb08777e04aa6cbd071e01b2a8` |

Source URL and referring-page provenance for each download remain in
`tools/didm-media-import/import-state.jsonl`. The retry summary is in
`tools/didm-media-import/last-run-report.json`.

## Frontend integrations

The typed registry `apps/web/src/data/didm-media.ts` contains stable IDs, actual
paths, source URLs, intended use, alt text, dimensions, hashes, and verification
status for all 12 assets.

- Navbar, Footer, organization JSON-LD, and article publisher JSON-LD: official
  local DIDM logo.
- Homepage: MIDM and Advanced program cards plus exact college and corporate
  training sections.
- Programs directory: general course banner; MIDM and Advanced card artwork.
- MIDM detail page: MIDM artwork only.
- Advanced detail page: AI-powered Advanced hero only.
- Centres directory: exact Noida, Meerut, and Haldwani banners on their cards.
- Noida, Meerut, and Haldwani detail pages: only the corresponding branch banner.
- Organizations: verified corporate training photo.
- Knowledge hub: verified media/news strip.

The historical fee graphic is intentionally not rendered because it may show
stale pricing. It is registered as archive-only. No branch image is reused for a
different centre, and no generic image is assigned as a course-specific identity.

## Verification results

- `pnpm --filter web exec tsc --noEmit`: passed.
- `pnpm --filter web build`: passed; all 56 pages generated.
- Importer regression suite: 24 tests passed.
- `git diff --check`: passed.
- All 12 original local asset URLs returned HTTP 200 with their expected MIME and
  decoded successfully.
- All 12 tested Next.js optimized image requests returned HTTP 200 and decoded.
- Homepage, programs directory, MIDM, Advanced, centres directory, Noida,
  Meerut, Haldwani, organizations, and knowledge hub returned HTTP 200.
- Rendered route HTML contained every expected exact local mapping, including
  Haldwani in both listing and detail pages.

Browser screenshot/interaction automation was unavailable because no Chromium or
Playwright runtime is installed. No screenshot, console, or exact viewport claim
is made. Production build output, local HTTP rendering, route HTML, original
assets, optimized assets, and source-level responsive `sizes`/aspect ratios were
verified instead.

The configured `next lint` remains non-runnable without interactive first-time
ESLint setup. No ESLint configuration was silently created or changed.

## Remaining gaps

- No pilot asset remains blocked.
- The historical fee image remains intentionally unused.
- The other 343 inventory URLs were not started and still require a separate,
  exact selection and explicit authorization.
- Full visual QA at 375px and 1440px with console/network capture remains
  recommended in a browser-enabled environment before any deployment.

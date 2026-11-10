# DIDM 25-page content audit

**Audit date:** 4 November 2026  
**Mode:** Offline analysis only  
**Network requests during audit:** None

## Executive finding

The designated output does **not** contain a completed 25-page crawl. It still
contains the controlled two-page baseline:

- 68 unique discovered URLs
- 2 successfully captured HTML pages on `www.didm.in`
- 0 captured pages on `www.blog.didm.in`
- 65 pending URLs
- 1 legacy URL-level robots block
- 1 separate robots-policy-unavailable record

This audit therefore distinguishes captured content evidence from URLs that were
only discovered. It does not claim that pending pages or the source website have
been fully inspected.

## 1. State and snapshot integrity

Checkpoint verification:

- Queued: 65
- Visited: 3
- Page counts: `www.didm.in = 2`
- Stopped hosts: none
- Active retries: none
- Queued URLs missing from inventory: none
- Captured pages missing from visited: none
- Inventory rows: 68
- Unique inventory URLs: 68
- Duplicate inventory URLs: 0

Snapshot verification:

| Source URL | Snapshot | SHA-256 | Result |
|---|---|---|---|
| `https://www.didm.in/` | `raw_html/index--f5067221f54f1c23.html` | `dddca36074efc741538913e78c84e792d74ccb24451ba4ee809c0527b322bcc2` | Match |
| `https://www.didm.in/news-and-events` | `raw_html/news-and-events--29840d3ca97de6b8.html` | `fd0711659fb73e9bfde4534b6e7b4b553234242b905a73900a6b56dc8fec9759` | Match |

## 2. Successfully captured pages

### Homepage

- URL: `https://www.didm.in/`
- HTTP status: 200
- Title: `Best Digital Marketing Course Institute in Delhi NCR & India - DIDM`
- Canonical: `https://www.didm.in/`
- Extraction confidence: medium
- Structured blocks: 332
- Excluded chrome blocks: 79
- Links: 264 total / 200 unique
- Media references in page record: 63
- JSON-LD blocks: 3

### News and events index

- URL: `https://www.didm.in/news-and-events`
- HTTP status: 200
- Title: `DIDM - News and Events`
- Canonical: `https://www.didm.in/news-and-events`
- Extraction confidence: medium
- Structured blocks: 136
- Excluded chrome blocks: 79
- Links: 147 total / 75 unique
- Media references in page record: 7
- JSON-LD blocks: 3
- Heading issue: no H1; the page begins with an H2

No new pages beyond these two are present in the output.

## 3. Content coverage inventory

The status column below is important:

- **Captured** means text exists in a verified raw snapshot.
- **Discovery-only** means a link exists in captured HTML, but the target page was
  not fetched and its contents are unknown.
- **Candidate** means a relationship or content type was inferred conservatively
  from page structure or URL naming and requires review.

### Course pages

Dedicated course URLs discovered but still pending:

| Candidate course | Source URL | Evidence |
|---|---|---|
| General digital marketing course | `https://www.didm.in/digital-marketing-course` | Discovery-only link |
| Digital Marketing Intelligence diploma | `https://www.didm.in/digital-marketing-artificial-intelligence` | Discovery-only link; homepage summary captured |
| Master in Digital Marketing | `https://www.didm.in/master-in-digital-marketing-course` | Discovery-only link; homepage summary captured |
| Advanced Digital Marketing | `https://www.didm.in/advanced-digital-marketing-course` | Discovery-only link; homepage summary captured |
| Professional/customized course | `https://www.didm.in/customized-digital-marketing-course` | Discovery-only link; homepage summary captured |
| Online course | `https://www.didm.in/online-digital-marketing-course` | Discovery-only link |
| Gen AI knowledge camp | `https://www.didm.in/gen-ai-knowledge-camp` | Discovery-only link |
| Corporate training | `https://www.didm.in/corporate-training-program` | Discovery-only; service/program classification candidate |
| College/university sessions | `https://www.didm.in/colleges-and-university-session` | Discovery-only; institutional-program candidate |

### Trainers

- Dedicated trainer page: `https://www.didm.in/trainer` — discovery-only.
- Captured homepage headings name `Mr. Rahul Gupta` and `Mr. Shrey Deepum` under
  “Meet Our Master Mentors.”
- Their associated biography text is source-verified homepage content.
- Employment, current role, credentials, and trainer-course relationships remain
  unverified migration fields and require human review.

### Placements and hiring

- Placement page: `https://www.didm.in/placement` — discovery-only.
- Homepage contains captured headings/claims including `100% Placement
  Assistance`, `650+ Placement Partners`, internship offers, and “Companies That
  Love Our Students.”
- These are source-page claims, not independently verified facts. No normalized
  placement record, employer list, salary evidence, or student-employer
  relationship was captured.

### Testimonials

- Review page: `https://www.didm.in/trainee-reviews` — discovery-only.
- Captured homepage contains five name/quote pairs:
  - Soumya Jay
  - Nancy Sharma
  - Sonam Aggarwal
  - Prateek Jain
  - Pranav Khanna
- The text is source-verified homepage content. Identity, consent, course, centre,
  date, rating, and external source remain unverified.

### Certifications and awards

- Certification page: `https://www.didm.in/didm-certifications` — discovery-only.
- Captured homepage references 30+ certifications, 27+ certifications for AIDM,
  Google + DIDM certification, IFA, ASSOCHAM, and WASME.
- Three award-detail news URLs were discovered, but remain pending.
- Award and certification assertions require evidence review before CMS import.

### Legal content

All legal pages are discovery-only and pending:

- `https://www.didm.in/privacy-policy`
- `https://www.didm.in/refund`
- `https://www.didm.in/terms-and-conditions`

### News and events

- News index captured: 1.
- News detail URLs discovered: 21.
- News detail pages captured: 0.
- Numeric pagination-like URLs discovered: 3 (`/18`, `/36`, `/504`).
- Pagination-like URLs captured: 0.
- The three numeric URLs require validation; they may be pagination, malformed
  relative links, or another route convention.

### Blog and journal

- `https://www.blog.didm.in/` remains a legacy blocked/policy-unavailable case;
  no blog content was captured.
- `https://www.didm.in/digital-marketing-course-journal` is discovery-only.
- No blog post, category, author, publication date, tag, or blog pagination data
  is available.

### Galleries and media pages

Discovery-only URLs:

- `https://www.didm.in/didm-media-coverage`
- `https://www.didm.in/digital-marketing-course-successful-batch-images`
- `https://www.didm.in/gallery`
- `https://www.didm.in/life-didm`

The media manifest contains 61 URL references; no media binary was downloaded or
validated.

## 4. Course syllabus and module candidate inventory

No dedicated course page was captured, and the extractor found zero explicit
syllabus/module headings. Therefore there is no source-verified syllabus inventory
yet.

The homepage provides the following review candidates. These are offering
features, not confirmed syllabus modules:

### Digital Marketing Intelligence diploma

Source: captured homepage.

- Diploma from UGC Approved University
- PPO / pre-placement offer
- Generative AI integration
- Three-month real-time agency-floor experience certificate

Classification: **heuristic course-feature candidates**.

### Master in Digital Marketing

Source: captured homepage.

- Classroom and online training
- 500+ hours practical training
- Two-month internship program
- LMS recording and live-session access
- Hands-on live projects
- E-notes and e-books
- 30+ industry certifications

Classification: **source-verified homepage feature list**, not modules.

### Advanced Digital Marketing

Source: captured homepage.

- Classroom and online delivery
- 140+ training hours
- LMS recordings and live sessions
- Live projects
- E-notes and e-books
- 27+ certifications

Classification: **source-verified homepage feature list**, not modules.

### Professional Digital Marketing

Source: captured homepage.

- Classroom and online delivery
- Customized module
- Live projects
- E-notes
- Google + DIDM certification

Classification: **source-verified homepage feature list**. The singular phrase
“Customized Module” supplies no module title or syllabus detail.

### General curriculum signals

Captured homepage text mentions:

- 50+ modules
- Practical sessions
- LMS learning and mentorship
- Website creation
- Live marketing campaigns and projects
- Case studies
- Drop-shipping session

Classification: **heuristic curriculum signals**. These must not become CMS
module records until confirmed against dedicated course pages or an official
course export.

## 5. Centre-wise discovery inventory

All 13 centre URLs below were found in navigation/footer chrome on both captured
pages. This verifies link provenance, not the contents or operational status of
the centre.

| Centre label | Source URL | Provenance | Capture status |
|---|---|---|---|
| Dwarka | `https://www.didm.in/digital-marketing-course-in-dwarka` | Homepage and news-page chrome link | Pending |
| Gurgaon | `https://www.didm.in/digital-marketing-course-in-gurgaon` | Homepage and news-page chrome link | Pending |
| Kalkaji | `https://www.didm.in/digital-marketing-course-in-kalkaji` | Homepage and news-page chrome link | Pending |
| Noida | `https://www.didm.in/digital-marketing-course-in-noida` | Homepage and news-page chrome link | Pending |
| Pitampura | `https://www.didm.in/digital-marketing-course-in-pitampura` | Homepage and news-page chrome link | Pending |
| Preet Vihar | `https://www.didm.in/digital-marketing-course-in-preet-vihar` | Homepage and news-page chrome link | Pending |
| Rajouri Garden | `https://www.didm.in/digital-marketing-course-in-rajouri-garden` | Homepage and news-page chrome link | Pending |
| South Extension | `https://www.didm.in/digital-marketing-course-in-south-extension` | Homepage and news-page chrome link | Pending |
| South Campus / Satya Niketan | `https://www.didm.in/digital-marketing-course-in-satya-niketan` | Homepage and news-page chrome link | Pending |
| Dehradun | `https://www.didm.in/digital-marketing-course-in-dehradun` | Homepage and news-page chrome link | Pending |
| Mumbai | `https://www.didm.in/digital-marketing-course-in-mumbai` | Homepage and news-page chrome link | Pending |
| Haldwani/Rudrapur | `https://www.didm.in/digital-marketing-course-in-haldwani-rudarpur` | Homepage and news-page chrome link | Pending |
| Varanasi | `https://www.didm.in/digital-marketing-course-in-varanasi` | Homepage and news-page chrome link | Pending |

The homepage footer text also mentions Jaipur, but no Jaipur URL was discovered.
This is an unresolved content/route discrepancy.

## 6. Missing content and extraction gaps

### Missing dedicated captures

- All course details and syllabuses
- All centre landing-page bodies
- Trainer directory/details
- Placement records and partner entities
- Dedicated testimonial/review page
- Certification details
- Legal text
- News detail bodies
- Blog index/posts
- Gallery/media page bodies
- FAQ content

### Extraction limitations

- Both captured pages are medium confidence because neither exposes a reliable
  semantic `main`/`article` container.
- Homepage category classification is influenced by broad page content and does
  not prove dedicated entity coverage.
- The news page lacks an H1.
- No tables or explicit FAQ/module candidates were extracted.
- Media references exceed unique manifest rows because repeated assets are
  deduplicated in the manifest.
- JavaScript-rendered content was not executed.

### Duplicates

- Inventory URL duplicates: 0.
- Homepage link occurrences: 264 total / 200 unique, giving 64 repeated
  occurrences.
- News page link occurrences: 147 total / 75 unique, giving 72 repeated
  occurrences.
- Repetition is primarily shared navigation/footer chrome and is not duplicate
  inventory content.

## 7. SEO and internal-link review

### Metadata

Both captured pages have:

- Non-empty title
- Meta description
- Self-referencing canonical
- Open Graph title
- Open Graph description
- Three JSON-LD blocks

Both lack:

- Open Graph image
- Twitter Card value

Additional issues:

- No robots meta value is present in the export.
- The declared `/sitemap.xml` returned HTML rather than valid XML in the earlier
  controlled request.
- The news index lacks an H1.

### Internal links

Homepage:

- 118 internal link occurrences / 56 unique internal URLs
- 79 chrome links
- 18 links with empty extracted anchor text

News index:

- 135 internal link occurrences / 65 unique internal URLs
- 79 chrome links
- 27 links with empty extracted anchor text

No target-status check can be made for pending links without another approved
crawl batch. The three numeric news URLs and the missing Jaipur route deserve
specific review.

### Redirects and failures

- Redirect inventory: no captured redirect hops.
- Failure records: 3 baseline records.
- Main-site sitemap: HTTP 200 but non-XML body.
- Blog robots retrieval: unavailable.
- Blog root: legacy blocked record.

## 8. Fact-confidence rules for migration

### Source-verified page content

May be stored as raw migration evidence, not automatically published:

- Exact text present in the two verified snapshots
- Page titles, descriptions, canonicals, headings, links, and JSON-LD
- Homepage course feature lists
- Five homepage testimonial excerpts
- Two homepage mentor names and biographies
- Centre labels and target URLs as navigation evidence
- News-index titles and target URLs

### Heuristic candidates requiring review

- Treating homepage feature bullets as syllabus modules
- Treating every `course-in-*` route as an active operational centre
- Mapping testimonial names to students or alumni entities
- Mapping mentor names to current trainers/employees
- Treating hiring/placement marketing claims as verified outcomes
- Treating numeric news URLs as pagination
- Treating awards/certifications as validated credentials

### Not available

- Dedicated page facts for the 65 pending URLs
- Blog content
- Media binary evidence
- Consent, ownership, licensing, or claim-verification records

## 9. Exact pending URL appendix

The checkpoint contains these 65 URLs:

- `https://www.didm.in/150-reasons-to-join-digital-marketing-course-didm`
- `https://www.didm.in/about-us`
- `https://www.didm.in/advanced-digital-marketing-course`
- `https://www.didm.in/careers`
- `https://www.didm.in/colleges-and-university-session`
- `https://www.didm.in/contact-us`
- `https://www.didm.in/corporate-training-program`
- `https://www.didm.in/customized-digital-marketing-course`
- `https://www.didm.in/didm-certifications`
- `https://www.didm.in/didm-media-coverage`
- `https://www.didm.in/digital-marketing-artificial-intelligence`
- `https://www.didm.in/digital-marketing-course`
- `https://www.didm.in/digital-marketing-course-in-dehradun`
- `https://www.didm.in/digital-marketing-course-in-dwarka`
- `https://www.didm.in/digital-marketing-course-in-gurgaon`
- `https://www.didm.in/digital-marketing-course-in-haldwani-rudarpur`
- `https://www.didm.in/digital-marketing-course-in-kalkaji`
- `https://www.didm.in/digital-marketing-course-in-mumbai`
- `https://www.didm.in/digital-marketing-course-in-noida`
- `https://www.didm.in/digital-marketing-course-in-pitampura`
- `https://www.didm.in/digital-marketing-course-in-preet-vihar`
- `https://www.didm.in/digital-marketing-course-in-rajouri-garden`
- `https://www.didm.in/digital-marketing-course-in-satya-niketan`
- `https://www.didm.in/digital-marketing-course-in-south-extension`
- `https://www.didm.in/digital-marketing-course-in-varanasi`
- `https://www.didm.in/digital-marketing-course-journal`
- `https://www.didm.in/digital-marketing-course-successful-batch-images`
- `https://www.didm.in/enrollnow`
- `https://www.didm.in/franchise`
- `https://www.didm.in/gallery`
- `https://www.didm.in/gen-ai-knowledge-camp`
- `https://www.didm.in/life-didm`
- `https://www.didm.in/master-in-digital-marketing-course`
- `https://www.didm.in/news-and-event/8-Years-Strong-Preet-Vihar-20-Begins-a-New-Chapter/498`
- `https://www.didm.in/news-and-event/Celebrating-the-Legacy-of-Dr-BR-Ambedkar-Ambedkar-Jayanti-2026/495`
- `https://www.didm.in/news-and-event/DIDM-Convocation-Ceremony-2026-A-Day-That-Marked-New-Beginnings/494`
- `https://www.didm.in/news-and-event/DIDM-Convocation-Ceremony-July-2026-Celebrating-Every-Dream-That-Turned-Into-Reality/501`
- `https://www.didm.in/news-and-event/DIDM-Earns-Prestigious-Recognition-in-The-Economic-Times-Changemakers-for-Driving-AI-Powered-Digital-Education/502`
- `https://www.didm.in/news-and-event/DIDM-Extends-Warm-Wishes-on-Eid-al-Adha/499`
- `https://www.didm.in/news-and-event/DIDM-Grabs-the-Prestigious-International-Fame-Awards-2021/123`
- `https://www.didm.in/news-and-event/DIDM-Rajiv-Academy-for-Technology-Management-Join-Hands-for-Future-Ready-Digital-Education/497`
- `https://www.didm.in/news-and-event/DIDM-Wins-Best-Digital-Marketing-Training-Company/492`
- `https://www.didm.in/news-and-event/DIDM-received-WASME-SME-Excellence-Awards-2021/126`
- `https://www.didm.in/news-and-event/DIDM-receives-the-eminent-Fair-Business-Practices-Award-by-ASSOCHAM/130`
- `https://www.didm.in/news-and-event/DIDMs-Diploma-in-Digital-Marketing-Intelligence-DMI-Earns-National-Media-Recognition/500`
- `https://www.didm.in/news-and-event/Exclusive-Masterclass-on-BEYOND-DIGITAL-AI-Mastery-Session/507`
- `https://www.didm.in/news-and-event/Ganesh-Chaturthi-Celebrating-Faith-New-Beginnings-and-the-Spirit-of-Togetherness/509`
- `https://www.didm.in/news-and-event/Happy-Baisakhi-2026-Celebrating-Harvest-Hope-New-Beginnings/496`
- `https://www.didm.in/news-and-event/Happy-Independence-Day-2026-Celebrating-80-Years-of-Freedom-Unity-the-Spirit-of-a-New-India/503`
- `https://www.didm.in/news-and-event/Highlights-from-the-DIDM-Convocation-Ceremony-2026/493`
- `https://www.didm.in/news-and-event/Janmashtami-Celebrating-the-Birth-of-Lord-Krishna-with-Love-Faith-and-Joy/505`
- `https://www.didm.in/news-and-event/Mastering-E-Commerce-Growth-Inside-DIDMs/508`
- `https://www.didm.in/news-and-event/Raksha-Bandhan-A-Celebration-of-the-Bond-That-Grows-Stronger-with-Time/504`
- `https://www.didm.in/news-and-event/Teachers-Day-Celebrating-the-People-Who-Help-Us-Find-Our-Way/506`
- `https://www.didm.in/news-and-events/18`
- `https://www.didm.in/news-and-events/36`
- `https://www.didm.in/news-and-events/504`
- `https://www.didm.in/online-digital-marketing-course`
- `https://www.didm.in/placement`
- `https://www.didm.in/privacy-policy`
- `https://www.didm.in/refund`
- `https://www.didm.in/terms-and-conditions`
- `https://www.didm.in/trainee-reviews`
- `https://www.didm.in/trainer`
- `https://www.didm.in/upcoming-batches`

## 10. Recommended next phases

### Next controlled batch

Do not run a generic breadth-first batch until the discrepancy between the
expected 25-page run and the two-page output is resolved.

For a later explicitly approved batch:

1. Create a full output backup and record state hashes.
2. Fetch fresh robots policies; if unavailable, preserve queues and stop.
3. Prioritize a balanced set rather than allowing news pages to consume the
   batch:
   - flagship course details;
   - several centre pages;
   - trainer, placement, reviews, certifications, and legal pages;
   - news details and pagination in a separate capped slice.
4. Keep the blog host separate until its robots policy is accessible.
5. Validate state hashes, snapshots, redirects, failures, and category coverage
   immediately after the batch.
6. Review extracted facts before scheduling another batch.

### CMS migration preparation

After sufficient capture and human review:

1. Freeze a source URL manifest and redirect plan.
2. Define normalized course, module, centre, trainer, testimonial, placement,
   certification, article, legal, media, and SEO schemas.
3. Preserve source URL, snapshot hash, retrieval time, extraction confidence,
   reviewer, and verification status on every imported record.
4. Import into staging through idempotent dry runs.
5. Quarantine conflicts and unverified marketing claims.
6. Publish nothing automatically.

Database migration, CMS implementation, production deployment, and DNS changes
remain out of scope.


# Information architecture

Assessment: 17 November 2026, Asia/Kolkata. This report distinguishes implemented code, verified behavior and work still required. No production deployment or database migration performed.

## Core journeys
1. Home → programs → common/specific course detail → counselling with course ID.
2. Home/centres → upcoming batches → program/centre/day filters → enquiry with context.
3. Course finder → explained shortlist → curriculum or human discussion.
4. Career explorer → suggested skills/projects → existing course; skill quiz → explanations → course finder.
5. Learn → actual copyable prompt / guide / interactive exercise.
6. Admin → authenticated batches → save draft → authorised publish → public future schedule.

## Existing sitemap (route families)
- `/`
- `/about`
- `/article`
- `/careers`
- `/centre/dwarka`
- `/centres`
- `/centres/[slug]`
- `/certifications`
- `/colleges-and-university-session`
- `/compare`
- `/contact`
- `/corporate-training-program`
- `/digital-marketing-course-journal`
- `/enquire`
- `/faqs`
- `/franchise`
- `/gallery`
- `/learn`
- `/life-at-didm`
- `/media-coverage`
- `/media-coverage/[slug]`
- `/news-and-events`
- `/news-and-events/[slug]`
- `/organisations`
- `/outcomes`
- `/privacy`
- `/program`
- `/programs`
- `/programs/[slug]`
- `/programs/advanced-digital-marketing-course`
- `/programs/online-digital-marketing-course`
- `/refund`
- `/stories`
- `/terms`
- `/trainers`
- `/upcoming-batches`
- `/why-choose-didm`

## Added sitemap
- `/course-finder`: five-step explained matcher + six career paths + quiz + funnel lab.
- `/admin/batches` and `/api/admin/batches`: permissions-enforced schedule draft/publish; excluded from indexing.
- Homepage and programs link the finder; footer carries discoverable entry; XML sitemap includes public discovery.

## Legacy URL policy
Retain existing redirects and add exact course redirects for Master, DMI, Professional and Gen AI. Do not redirect a missing branch/module to an unrelated page. Varanasi and standalone module pages stay explicit backlog items. No payment/enrollment backend replacement.

## Shared content and sources
Courses/centres: existing typed catalog and brochure JSON. Schedules: existing MongoDB SiteSetting record `admissions-batches`, `draft.batches` and `published.batches`; sourceUrl and verification date required. Homepage: existing Page published revision. Do not seed these records from unapproved reference claims.


# DIDM priority crawl plan

**Status:** Implemented and verified offline; live execution awaiting approval

## Scheduling policy

Pending URLs are selected deterministically in this order:

1. Flagship courses, curricula, and syllabus routes
2. Centre landing pages
3. Trainers and placements
4. Testimonials and certifications
5. Legal pages
6. Other institutional/resource pages
7. News and event routes
8. Blog host

Within a category, canonical URL order is deterministic. Flagship course routes
have an explicit stable order beginning with DMI, MIDM, Advanced, Customized,
Online, Gen AI, and the general course page.

The scheduler:

- reorders but does not discard pending URLs;
- excludes visited/captured URLs;
- preserves queue state across checkpoints;
- applies priority again to newly discovered links;
- leaves robots, host allowlists, retries, redirects, delays, and page limits
  unchanged;
- keeps news behind every higher-priority pending category.

## Current pending composition

| Category | Pending URLs |
|---|---:|
| Flagship courses | 7 |
| Centres | 13 |
| Trainers and placements | 2 |
| Testimonials and certifications | 2 |
| Legal | 3 |
| Other institutional/resources | 14 |
| News and events | 24 |
| **Total** | **65** |

## Planned cumulative 25-page window

Two main-site pages are already captured, leaving 23 available slots before the
cumulative limit of 25 is reached:

1. DMI diploma
2. Master in Digital Marketing
3. Advanced Digital Marketing
4. Customized/Professional Digital Marketing
5. Online Digital Marketing
6. Gen AI Knowledge Camp
7. General Digital Marketing Course
8. Dehradun centre
9. Dwarka centre
10. Gurgaon centre
11. Haldwani/Rudrapur centre
12. Kalkaji centre
13. Mumbai centre
14. Noida centre
15. Pitampura centre
16. Preet Vihar centre
17. Rajouri Garden centre
18. Satya Niketan/South Campus centre
19. South Extension centre
20. Varanasi centre
21. Placement page
22. Trainer page
23. Certifications page

No news URL enters this window. The remaining 42 URLs stay checkpointed for later
approved batches.

## Offline inspection command

```bash
cd /Users/piyushkhurana/didm_official_website/tools/didm-crawler
python3 crawler.py priority-plan --output ../../crawler-output --page-limit 25
```

This command is read-only and does not enable network access.

## Exact command for the next approved live crawl

```bash
cd /Users/piyushkhurana/didm_official_website/tools/didm-crawler

python3 crawler.py crawl \
  --live \
  --page-limit 25 \
  --delay 3 \
  --output ../../crawler-output
```

Before running it, create a timestamped output backup and obtain explicit owner
approval plus the required network permission. If either robots policy is
unavailable, the host remains fail-closed and its queue is preserved.


# DIDM Official Brochure — Complete Data Extraction Report

**Source Document:** `DELHI_INSTITUTE_OF_DIGITAL_MARKETING_DOWNLOAD_BROCHURE.pdf`  
**Location:** `/Users/piyushkhurana/didm_official_website/DELHI_INSTITUTE_OF_DIGITAL_MARKETING_DOWNLOAD_BROCHURE.pdf`  
**Page Count:** 44 Pages  
**Extraction Status:** Complete (100% Page Coverage & Visual Verification)  
**Output Location:** `apps/web/src/data/brochure/`  
**Access Layer:** `apps/web/src/lib/brochure/index.ts`  

---

## 1. Executive Summary

This report documents the exhaustive, high-fidelity extraction of the official 44-page Delhi Institute of Digital Marketing (DIDM) brochure. 

Because the PDF consists entirely of rasterized graphic spreads with zero selectable text streams, all 44 pages were converted into high-resolution PNG images (`crawler-output/brochure_pages/page_01.png` through `page_44.png`) and visually audited across every section, table, curriculum grid, and partner logo.

### Key Milestones Extracted:
1. **52 Modules Sequence:** Exact visual extraction of all 52 module tiles from Brochure Page 12 in their authentic row-by-row and column-by-column order without omissions or generic placeholders.
2. **Master vs Advanced vs Customized Matrix:** Exhaustive 16-feature comparison derived from Pages 14–16.
3. **Tools & Automation Ecosystem:** 22 practical industry tools + 8 proprietary Veblika automation tools (valued at Rs. 1,00,000/-) from Page 18.
4. **Certifications:** 30+ globally recognized credentials classified into Google, Meta, HubSpot, Semrush, and Institutional categories.
5. **Institutional Authority:** 2009–2023 evolution timeline, Director Priyanka Singhal's vision, 6 national awards (ASSOCHAM, Sonu Sood International Fame Award, MSME, WASME), 16 active training campuses, and 32 verified hiring partner brands.

---

## 2. Dataset Architecture

The extracted information has been structured into modular, JSON files with an associated TypeScript data access layer:

| File Name | Description | Key Source Pages |
|:---|:---|:---|
| `apps/web/src/data/brochure/master-52-modules.json` | Complete sequence of 52 modules with titles, IDs, categories, chapters, and descriptions | Page 12 |
| `apps/web/src/data/brochure/course-comparison.json` | 16-feature comparison between Master, Advanced, and Customized tracks | Pages 14, 15, 16 |
| `apps/web/src/data/brochure/tools-and-certifications.json` | 22 hands-on tools + 8 Veblika automation tools + 30+ certifications | Pages 17, 18 |
| `apps/web/src/data/brochure/institute-information.json` | Milestones (2009–2023), leadership, awards, methodology, campuses, partners | Pages 3, 4, 5, 20, 22, 40, 41, 44 |
| `apps/web/src/data/brochure/faq-knowledge.json` | Grounded Q&A repository for AI Counsellor citations | Pages 1–44 |
| `apps/web/src/data/brochure/didm-brochure.json` | Master brochure metadata and structural directory index | Full Document |

---

## 3. The 52 Curriculum Modules (Exact Visual Order from Page 12)

Every single module tile from the 8 rows on Page 12 was extracted and assigned a permanent sequence number:

| Seq # | Original Brochure Title | Normalized Title | Curriculum Chapter | Category |
|:---:|:---|:---|:---|:---|
| 01 | Introduction to Digital Marketing | Introduction to Digital Marketing | Digital Marketing Foundations & Strategy | Foundations |
| 02 | Basics of Marketing & Branding | Basics of Marketing & Branding | Digital Marketing Foundations & Strategy | Foundations |
| 03 | Content Planning | Content Planning | Digital Marketing Foundations & Strategy | Content & Creative |
| 04 | Content Creation / Canva | Content Creation & Canva Design | Digital Marketing Foundations & Strategy | Content & Creative |
| 05 | Professional Blogging | Professional Blogging | Digital Marketing Foundations & Strategy | Content & Creative |
| 06 | Logo Creation | Logo Creation & Brand Identity | Digital Marketing Foundations & Strategy | Content & Creative |
| 07 | Domain + Hosting Integration | Domain & Hosting Integration | Web Infrastructure & Development | Web & Technical |
| 08 | Website Creation without Codes | No-Code Website Creation (WordPress) | Web Infrastructure & Development | Web & Technical |
| 09 | Chat Bots | Conversational AI & Chatbots | Web Infrastructure & Development | Automation & AI |
| 10 | Search Engine Algorithms | Search Engine Algorithms & Ranking Systems | Search Engine Mastery & Technical SEO | SEO |
| 11 | Search Engine Optimization | Comprehensive Search Engine Optimization | Search Engine Mastery & Technical SEO | SEO |
| 12 | Google Search Console | Google Search Console (GSC) | Search Engine Mastery & Technical SEO | Search & Analytics |
| 13 | Bing Webmaster | Bing Webmaster Tools | Search Engine Mastery & Technical SEO | Search & Analytics |
| 14 | Google Analytics | Google Analytics 4 (GA4) | Search Engine Mastery & Technical SEO | Search & Analytics |
| 15 | Local Business Listing | Google Business Profile & Local SEO | Search Engine Mastery & Technical SEO | Local & Lead Gen |
| 16 | Competitors Analysis | Competitive Intelligence & Market Analysis | Search Engine Mastery & Technical SEO | Strategy & Research |
| 17 | Voice Search Optimization | Voice Search Optimization (VSO) | Search Engine Mastery & Technical SEO | SEO |
| 18 | Google Adwords | Google Ads (Search & PPC Mastery) | Performance Advertising & Paid Media | Paid Advertising |
| 19 | Online Display Advertising | Google Display Network (GDN) Advertising | Performance Advertising & Paid Media | Paid Advertising |
| 20 | Remarketing Concepts | Dynamic Remarketing & Retargeting Architecture | Performance Advertising & Paid Media | Paid Advertising |
| 21 | Gmail Ads | Gmail Sponsored Promotions | Performance Advertising & Paid Media | Paid Advertising |
| 22 | Optimization Conversion Rate | Conversion Rate Optimization (CRO) | Performance Advertising & Paid Media | Analytics & CRO |
| 23 | Lead Generation for Business | B2B & B2C High-Ticket Lead Generation | Performance Advertising & Paid Media | Lead Generation |
| 24 | Mobile Marketing | Mobile Marketing & App Promotion | Performance Advertising & Paid Media | Mobile & Omni-channel |
| 25 | Google Tag Manager | Google Tag Manager (GTM) | Performance Advertising & Paid Media | Technical & Tracking |
| 26 | Bing Ads | Microsoft Advertising (Bing Ads) | Performance Advertising & Paid Media | Paid Advertising |
| 27 | Social Media Optimization | Social Media Optimization (SMO) | Social Media Ecosystem & Community Building | Social Media |
| 28 | Social Media Marketing | Paid Social Media Marketing (SMM) | Social Media Ecosystem & Community Building | Social Media |
| 29 | Meta Business Suite | Meta Business Suite & Ads Manager | Social Media Ecosystem & Community Building | Social Media |
| 30 | Social Media Parameters | Social Media Metrics & Parameters | Social Media Ecosystem & Community Building | Social Media |
| 31 | Youtube Marketing | YouTube Marketing & Video SEO | Social Media Ecosystem & Community Building | Video Marketing |
| 32 | Email Marketing | Email Marketing & Drip Automations | Social Media Ecosystem & Community Building | Direct Marketing |
| 33 | E-Commerce Store Creation | E-Commerce Store Setup (Shopify/WooCommerce) | E-Commerce, Monetization & Scale | E-Commerce |
| 34 | E-Commerce Marketing | E-Commerce Marketing & Shopping Ads | E-Commerce, Monetization & Scale | E-Commerce |
| 35 | Affiliate Marketing | Affiliate Marketing Mastery | E-Commerce, Monetization & Scale | Monetization |
| 36 | Drop Shipping | Drop Shipping Business Models | E-Commerce, Monetization & Scale | E-Commerce |
| 37 | Google Adsense | Google AdSense & Web Monetization | E-Commerce, Monetization & Scale | Monetization |
| 38 | Tools of Digital Marketing | Digital Marketing Toolstack Mastery | E-Commerce, Monetization & Scale | Tools & Infrastructure |
| 39 | Influence Marketing & Personal Branding | Influencer Marketing & Personal Branding | Advanced Strategy, PR & Specialized Channels | Brand & Influencer |
| 40 | Online Reputation Management | Online Reputation Management (ORM) | Advanced Strategy, PR & Specialized Channels | PR & Reputation |
| 41 | Funnel Marketing | Sales Funnel Architecture & Automation | Advanced Strategy, PR & Specialized Channels | Growth Funnels |
| 42 | Content Marketing | Advanced Content Marketing Strategy | Advanced Strategy, PR & Specialized Channels | Content Strategy |
| 43 | Inbound Marketing | Inbound Marketing Methodology | Advanced Strategy, PR & Specialized Channels | Inbound Strategy |
| 44 | Podcast Marketing | Podcast Marketing & Audio Distribution | Advanced Strategy, PR & Specialized Channels | Emerging Channels |
| 45 | Case Study Discussion | Real-World Brand Case Studies | Industry Capstone & Career Launchpad | Applied Practice |
| 46 | Creating Marketing Strategy | Executive Marketing Strategy Blueprint | Industry Capstone & Career Launchpad | Executive Strategy |
| 47 | Freelancing as a Career / Earn as Freelancer | Freelancing Career & Client Acquisition | Industry Capstone & Career Launchpad | Career & Freelance |
| 48 | Agency Skills | Digital Agency Operations & Scaling | Industry Capstone & Career Launchpad | Agency Operations |
| 49 | Resume Building | Digital Marketer Resume & Portfolio Crafting | Industry Capstone & Career Launchpad | Career & Placement |
| 50 | Digital Marketing Interview Preparation | Technical Interview Preparation & Mocks | Industry Capstone & Career Launchpad | Career & Placement |
| 51 | Placement Session | Campus Placement Drive & Floor Residency | Industry Capstone & Career Launchpad | Career & Placement |
| 52 | Assignment Session | Capstone Project & Practical Defense | Industry Capstone & Career Launchpad | Applied Practice |

---

## 4. Course Comparison Matrix (Brochure Pages 14–16)

| Feature | Master Course (MIDM) | Advanced Course | Customized Course |
|:---|:---:|:---:|:---:|
| **Training Duration** | 500+ Hours (140h Class + 360h Floor) | 140 Hours | Cohort Specific |
| **Modules Covered** | 50+ Full Modules | 50+ Modules | Selected Track Only |
| **E-Notes Provided** | Yes | Yes | Yes |
| **Internship / Placement Support** | Yes (100% Dedicated Cell) | Yes | Yes |
| **Capstone Projects** | Yes | Yes | Yes |
| **Industry Certifications** | 30+ Globally Certified | 30+ Globally Certified | Google + DIDM |
| **Experience Certification** | **Yes (Agency Letter)** | No | No |
| **On-Board Training (2 Months)** | **Yes (360 Hours @ Online Strikers)** | No | No |
| **Hykoon Themes Membership** | **Yes** | No | No |
| **Tools & Software Suite** | Yes (22 Tools) | Yes (22 Tools) | No |
| **LMS Recorded Access** | **LMS Recorded (Advance)** | LMS Recorded (Basic) | No |
| **Automation Tools Suite** | **Yes (8 Veblika Tools - Rs. 1L)** | **Yes** | No |
| **E-Books** | **Yes** | No | No |
| **Case Studies** | Yes | Yes | Yes |
| **Skill Shiksha Certification** | **Yes** | No | No |
| **Creative Content Writing Module** | **Yes (Elementary Live/Rec)** | No | No |
| **Graphic Design Course Module** | **Yes (Elementary Live/Rec)** | No | No |

---

## 5. Tools & Automation Ecosystem (Brochure Page 18)

### 22 Hands-on Practice Tools
1. **WordPress Theme** — Theme configuration and site architecture
2. **Kart Rocket** — E-commerce store engine
3. **WooRank** — SEO site audits and scorecard evaluation
4. **GetResponse** — Email sequences and marketing automation
5. **Unbounce** — Conversion-focused landing pages
6. **Mailchimp** — Email list management and automations
7. **Spinbot** — Content variation and copywriting experimentation
8. **Semrush** — Domain analytics, keyword research, backlink audits
9. **Moz Open Site** — Domain authority and backlink explorer
10. **Canva** — Visual creatives and banners
11. **BuzzSumo** — Content trend discovery and influencer mapping
12. **SpyFu** — Competitor PPC ad copy and organic research
13. **Animoto** — Motion slideshow and video marketing
14. **PicMonkey** — Graphic design and visual retouching
15. **WordAI** — AI-powered natural language copy generation
16. **KWFinder** — Long-tail search query analysis
17. **Treehouse** — Front-end and technical web foundations
18. **Skillshare** — Creative and business development masterclasses
19. **LinkedIn Learning** — Professional marketing leadership courses
20. **Semscoop** — Keyword difficulty and SERP competitor scoring
21. **Crello** — Animated social graphics and motion banners
22. **Grammarly** — Editorial style, conciseness, and tone governance

### 8 Veblika Marketing Automation Tools (Valued at Rs. 1,00,000/-)
1. **Veblika Email Marketing**
2. **Veblika Connect**
3. **Veblika Google Map Extractor**
4. **Veblika WhatsApp Marketing Via Chrome Extension**
5. **Veblika WhatsApp Marketing Via Desktop Application**
6. **Veblika WhatsApp Marketing Cloud-Based System**
7. **Veblika Digital Visiting Card (Smart NFC/URL Profile)**
8. **Veblika Appointment Scheduler**

---

## 6. Institutional Information & Recognition

- **Co-Founder & Director:** Priyanka Singhal
- **Historical Milestones:**
  - 2009: Dayitwa Education founded
  - 2012: Dayitwa Consultancy established
  - 2014: Full-service agency Online Strikers founded
  - 2015: First DIDM campus launched at South Campus (Satya Niketan)
  - 2016: Dwarka flagship center opened
  - 2018: ASSOCHAM Most Promising Digital Marketing Institute of 2018
  - 2019: Noida center & News24 media collaboration
  - 2020: Melbourne international academic branch
  - 2022: Rajouri Garden and Jaipur campuses
  - 2023: Dehradun, Haldwani, and South Extension expansions (16+ centres)
- **Key National Awards (Brochure Page 22):**
  - ASSOCHAM Most Promising Institute 2018
  - JustDial Users' Choice Award 2018–2021
  - International Fame Award 2021 presented by actor Sonu Sood
  - WASME SME Excellence Award 2021
  - MSME Excellence & Fair Business Practices 2022
  - ASSOCHAM Fair Business Practices 2023 (3rd time)
- **Head Office:** Plot No. 12, 3rd Floor, Satya Niketan, South Campus Metro Station, Opp. Venketeshwar College, New Delhi 110021. Phone: +91 8800 50 5151.


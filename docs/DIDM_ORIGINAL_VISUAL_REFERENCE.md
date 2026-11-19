# DIDM Original Visual Reference & Design Audit

**Source Website:** https://www.didm.in/  
**Audit Date:** November 2026  
**Audited Artifacts:**
- Desktop Screenshot (1440px): `docs/original_homepage_1440.png`
- Laptop Screenshot (1280px): `docs/original_homepage_1280.png`
- Tablet Screenshot (768px): `docs/original_homepage_768.png`
- Mobile Screenshot (390px): `docs/original_homepage_390.png`
- Original Stylesheet Source: `docs/original_style.css` & `docs/original_temp.css`

---

## 1. Brand Color Palette (Extracted from Original CSS)

| Token | Hex Value | Usage on Original DIDM |
|---|---|---|
| **Primary Brand Red** | `#b52828` / `#f0081e` | Main buttons, badges, highlights, active nav, primary CTAs |
| **Secondary Accent Red** | `#e03a3c` / `#dc3545` | Hover states, tab active borders, form button gradients |
| **Dark Neutral / Charcoal** | `#222222` / `#111111` | Headings (h1–h3), footer background, top bar background |
| **Body Text Neutral** | `#555555` / `#666666` | Paragraphs, summary descriptions, list items |
| **Muted Border** | `#e5e5e5` / `#eeeeee` | Card borders, table dividers, form input borders |
| **Light Grey Background** | `#f7f7f7` / `#f8f9fa` | Alternating section backgrounds, form container, highlights |
| **Clean White** | `#ffffff` | Primary page canvas, card backgrounds, white buttons |
| **Accent Gold/Warm** | `#e5a83b` / `#f39c12` | Star ratings, accreditation highlights |

---

## 2. Typography Hierarchy

The original DIDM site loads Google Fonts:
1. **Poppins** (`300, 400, 500, 600, 700`) — Primary heading & button font.
2. **Open Sans** (`300, 400, 600, 700`) — Body copy, paragraphs, list text.
3. **Raleway** (`400, 500, 600, 700`) — Navigation bar, subtitles, and badges.

### Scale & Weight Rules:
- **H1 (Main Hero Title):** 36px–42px (Desktop), 26px–30px (Mobile), font-weight: 700 (`Poppins`), color: `#222` / `#b52828`.
- **H2 (Section Headings):** 28px–34px (Desktop), 22px–26px (Mobile), font-weight: 700 (`Poppins`), center-aligned with subtle red underline bar or highlight badge.
- **H3 (Card / Sub-headings):** 18px–22px, font-weight: 600 (`Poppins`), color: `#222`.
- **H4 (Feature / Profile Titles):** 15px–17px, font-weight: 600 (`Poppins`).
- **Body Text:** 14px–15px (Desktop), 13px–14px (Mobile), line-height: 1.65, font-family: `Open Sans` / system-ui, color: `#555`.
- **Button Text:** 14px–15px, uppercase/semibold, letter-spacing: 0.5px.

---

## 3. Layout, Container & Grid Spacing

- **Max Container Width:** 1140px – 1200px (Bootstrap container standard) with balanced `px-4` to `px-6` gutters.
- **Section Vertical Padding:** `py-12 md:py-16` (60px to 80px) on desktop, `py-8 md:py-10` on mobile.
- **Card Border Radii:** 12px to 16px rounded corners (never sharp brutalist boxes, never oversized capsule pills).
- **Shadows:** Soft subtle elevation `box-shadow: 0 4px 15px rgba(0,0,0,0.06)`, never harsh dark neon glows.

---

## 4. Header & Top Navigation Structure

- **Utility Top Bar:** Dark charcoal / `#1f1f1f` bar displaying:
  - Admissions Announcement
  - Working Hours: `Mon–Fri: 9am–9pm | Sat–Sun: 9am–7pm`
  - Toll Free Helpline: `88005 05151`
- **Main White Header:**
  - Official DIDM Logo on the left (`didm-logo-reg.png`)
  - Navigation links:
    - `Home`
    - `About Us` (Dropdown: Who we are, Trainee Reviews, Our Trainers, Placement Records)
    - `Training` (DMI Diploma, MIDM Master Course, AIDM Advanced Course, Professional Course)
    - `Select Centers` (Satya Niketan, Dwarka, Noida, Kalkaji, Pitampura, Preet Vihar, Gurgaon, etc.)
    - `Media`
    - `Blog`
    - `Contact`
  - Red CTA Button: `Request Callback` / `Book Free Class` on the right.

---

## 5. Verified Original Section Sequence (Top to Bottom)

1. **Top Utility Bar & Brand Navigation**
2. **Hero Billboard Banner:** DMI Diploma & AI Powered Digital Marketing Course
3. **Primary Headline (H1):** *"AI-Powered Digital Marketing Course | Best Digital Marketing Institute in Delhi & Across India"*
4. **Choose Certification Course for Your Career:**
   - Master in Digital Marketing (MIDM)
   - Advanced Digital Marketing (AIDM)
   - Professional in Digital Marketing
5. **12 Practical Training Benefits:** 100% Placement Assistance, Focus on Practical Learning, Experienced Trainers, High Quality Training, Free Doubt Clearing, Free Backup, 650+ Placement Partners, Freelance & Live Projects, Proven Track Record, Internship Offers, 24x7 Support, 30+ Certifications.
6. **Training Highlights & Free Session Booking Form:** Master Course details + Direct Enquiry Form (Name, Phone, Email, Center, Course).
7. **Testimonial Carousel (Over 35,000+ Careers Transformed):** Real alumni reviews on red background banner.
8. **Upskill Your Career (4 Feature Columns):** Advance Knowledge, Quality Training, Smart Classes, Certified Expert.
9. **Meet Our Master Mentors:** Google Marketing Strategists Mr. Rahul Gupta & Mr. Shrey Deepum.
10. **Awards & Media Recognition Hub:** International Fame Award 2021, ASSOCHAM MSME Award, Media In The News.
11. **Campus Life & Student Experience Gallery:** Real batch photos from Preet Vihar, Satya Niketan, Noida, etc.
12. **Hiring Partners Marquee / Grid:** 650+ hiring brands (Amazon, Accenture, Flipkart, Dentsu, etc.).
13. **Institutional & Corporate Programs:** Educational Institution Program & Corporate Training Program.
14. **Still Confused? Get Instant Career Clarity:** Dual CTA for Brochure Download & Demo Class.
15. **Institutional Comprehensive Footer:** Centers directory, business hours, about DIDM, legal accreditation & Google Partner badge.


# DIDM Page-by-Page Source Capture & Machine-Readable Snapshots

**Snapshot Baseline:** Crawled live from `https://www.didm.in/`  
**Capture Engine:** Headless Playwright Chromium & Python Extractor  
**Audit Date:** November 12, 2026  

---

## 1. Homepage (`/`)

```json
{
  "source_url": "https://www.didm.in/",
  "final_url": "https://www.didm.in/",
  "http_status": 200,
  "title": "Best Digital Marketing Course Institute in Delhi NCR & India",
  "meta_description": "Join DIDM for the best digital marketing course in Delhi NCR. Offering Master in Digital Marketing (MIDM), Advanced and Professional courses with 100% placement support.",
  "h1": "AI-Powered Digital Marketing Course | Best Digital Marketing Institute in Delhi & Across India",
  "headings": [
    { "level": "h2", "text": "Choose the Certification Course for Your Career!" },
    { "level": "h2", "text": "Digital Marketing Course For Transforming Your Career" },
    { "level": "h2", "text": "Digital Marketing Course/Training Highlights" },
    { "level": "h2", "text": "Over 35000+ Careers transformed" },
    { "level": "h2", "text": "Upskill Your Career with Digital Marketing Course" },
    { "level": "h2", "text": "Meet Our Master Mentors" },
    { "level": "h2", "text": "Delhi Institute of Digital Marketing - DIDM" },
    { "level": "h2", "text": "Smiling Faces, Successful Futures: Discover the DIDM Experience!" },
    { "level": "h2", "text": "Companies That Love Our Students" },
    { "level": "h2", "text": "Still Confused...... ?? GET INSTANT CAREER CLARITY" }
  ],
  "forms": [
    {
      "form_id": "take_free_session_today",
      "fields": ["name", "phone", "email", "centre", "course", "captcha"],
      "action": "/api/enquire",
      "method": "POST"
    }
  ],
  "ctas": [
    { "label": "Explore Courses", "target": "#courses" },
    { "label": "Book Free Demo Class", "target": "/enquire" },
    { "label": "Take a free session today!!", "target": "submit" },
    { "label": "Download Brochure", "target": "/brochure" }
  ],
  "screenshots": {
    "desktop": "docs/original_homepage_1440.png",
    "mobile": "docs/original_homepage_390.png"
  }
}
```

---

## 2. Master in Digital Marketing Course (MIDM) (`/programs/master-in-digital-marketing-course`)

```json
{
  "source_url": "https://www.didm.in/master-in-digital-marketing-course",
  "final_url": "https://www.didm.in/master-in-digital-marketing-course",
  "http_status": 200,
  "title": "DIDM - AI Powered Master in Digital Marketing Course (MIDM)",
  "meta_description": "Master in Digital Marketing Course (MIDM) by DIDM offers in-depth 500+ hours practical learning, 50 modules, live projects, Google & MSME certifications with 100% placement assistance.",
  "h1": "Master in Digital Marketing Course (MIDM)",
  "headings": [
    { "level": "h2", "text": "Course Overview & Learning Objectives" },
    { "level": "h2", "text": "Interactive 52-Stop Curriculum Roadmap" },
    { "level": "h2", "text": "How learning is structured at DIDM" },
    { "level": "h2", "text": "Comprehensive Syllabus for MIDM" },
    { "level": "h2", "text": "Software & Platforms Mastered in MIDM" },
    { "level": "h2", "text": "Who is this program designed for?" }
  ],
  "forms": [
    {
      "form_id": "course_enquiry",
      "fields": ["name", "phone", "email", "preferred_campus", "preferred_batch"],
      "action": "/api/enquire",
      "method": "POST"
    }
  ],
  "ctas": [
    { "label": "Download Full Syllabus PDF", "target": "/enquire?p=midm" },
    { "label": "Book Free Demo Class", "target": "/enquire?p=midm" },
    { "label": "Request Placement Brochure", "target": "/enquire" }
  ],
  "screenshots": {
    "desktop": "docs/original_midm_1440.png",
    "mobile": "docs/original_midm_390.png"
  }
}
```

---

## 3. About Us (`/about`)

```json
{
  "source_url": "https://www.didm.in/about-us",
  "final_url": "https://www.didm.in/about-us",
  "http_status": 200,
  "title": "About DIDM | India's Leading Digital Marketing Institute (10+ Years)",
  "meta_description": "Explore Delhi Institute of Digital Marketing (DIDM). Established in 2014, over 70,000+ alumni, 14 physical campuses across India, accredited by ASSOCHAM and ISO 9001:2015 certified.",
  "h1": "Educating India's next generation of growth architects.",
  "headings": [
    { "level": "h2", "text": "Institutional Heritage" },
    { "level": "h2", "text": "Evolution of an Educational Pioneer (Timeline)" },
    { "level": "h2", "text": "Three Distinct Brands Under One Parent Company" },
    { "level": "h2", "text": "Awards, Honors & Industry Recognition" },
    { "level": "h2", "text": "Faculty Heads, Mentors & Department Leaders" },
    { "level": "h2", "text": "Frequently Asked Questions About DIDM" }
  ],
  "forms": [
    {
      "form_id": "about_enquiry",
      "fields": ["name", "phone", "email", "campus", "course"],
      "action": "/api/enquire",
      "method": "POST"
    }
  ],
  "ctas": [
    { "label": "Request Session", "target": "/enquire" },
    { "label": "Visit South Delhi Campus", "target": "/centres/satya-niketan" }
  ],
  "screenshots": {
    "desktop": "docs/about_1440.png",
    "mobile": "docs/about_390.png"
  }
}
```

---

## 4. Faculty & Mentors (`/trainers`)

```json
{
  "source_url": "https://www.didm.in/trainer",
  "final_url": "https://www.didm.in/trainer",
  "http_status": 200,
  "title": "Our Trainers & Digital Mentors | DIDM Faculty Directory",
  "meta_description": "Meet DIDM's experienced faculty, industry mentors, and department heads with 8+ to 15+ years of live agency and digital advertising execution experience.",
  "h1": "Learn directly from agency veterans and technical leaders.",
  "headings": [
    { "level": "h2", "text": "Faculty Heads, Mentors & Department Leaders" },
    { "level": "h2", "text": "Attend a live mentoring class with our faculty before enrolling." }
  ],
  "ctas": [
    { "label": "Book Free Demo Class", "target": "/enquire" },
    { "label": "Call Helpline: 88005 05151", "target": "tel:+918800505151" }
  ],
  "screenshots": {
    "desktop": "docs/trainers_1440.png",
    "mobile": "docs/trainers_390.png"
  }
}
```

---

## 5. Trainee Reviews & Stories (`/stories`)

```json
{
  "source_url": "https://www.didm.in/trainee-reviews",
  "final_url": "https://www.didm.in/trainee-reviews",
  "http_status": 200,
  "title": "Student Stories & Career Transitions | DIDM Reviews",
  "meta_description": "Explore career journey narratives from fresh graduates, career switchers, entrepreneurs, and freelancers who trained at Delhi Institute of Digital Marketing (DIDM).",
  "h1": "Real people. Verified career trajectories.",
  "headings": [
    { "level": "h2", "text": "Want to meet current learners before enrolling?" }
  ],
  "ctas": [
    { "label": "Book Free Demo Class", "target": "/enquire" },
    { "label": "Speak with Admissions", "target": "/contact" }
  ],
  "screenshots": {
    "desktop": "docs/stories_1440.png",
    "mobile": "docs/stories_390.png"
  }
}
```

---

## 6. Placement Outcomes (`/outcomes`)

```json
{
  "source_url": "https://www.didm.in/placement",
  "final_url": "https://www.didm.in/placement",
  "http_status": 200,
  "title": "Career Placement Support & Outcomes | DIDM Official",
  "meta_description": "Explore DIDM's dedicated placement assistance process, 650+ corporate hiring partners, student portfolio preparation, and transparent career transition pathways.",
  "h1": "Transparent career results. No inflated claims.",
  "headings": [
    { "level": "h2", "text": "The DIDM Placement Cell Workflow" },
    { "level": "h2", "text": "Digital Marketing Career Trajectories" },
    { "level": "h2", "text": "Where DIDM Graduates Are Placed" }
  ],
  "ctas": [
    { "label": "Request Placement Brochure", "target": "/enquire" },
    { "label": "Speak to a Career Counselor", "target": "/enquire" },
    { "label": "Call Helpline: 88005 05151", "target": "tel:+918800505151" }
  ],
  "screenshots": {
    "desktop": "docs/outcomes_1440.png",
    "mobile": "docs/outcomes_390.png"
  }
}
```

---

## 7. Why Choose DIDM (`/why-choose-didm`)

```json
{
  "source_url": "https://www.didm.in/150-reasons-to-join-digital-marketing-course-didm",
  "final_url": "https://www.didm.in/150-reasons-to-join-digital-marketing-course-didm",
  "http_status": 200,
  "title": "150 Reasons to Choose DIDM | Institutional Excellence Matrix",
  "meta_description": "Discover 150 concrete operational reasons why Delhi Institute of Digital Marketing (DIDM) is India's most trusted digital skills academy.",
  "h1": "150 Reasons Why DIDM Is India's Premier Digital Academy.",
  "headings": [
    { "level": "h2", "text": "Experience the DIDM standard before enrolling." }
  ],
  "ctas": [
    { "label": "Book Free Demo Session", "target": "/enquire" },
    { "label": "Toll-Free Helpline: 88005 05151", "target": "tel:+918800505151" }
  ],
  "screenshots": {
    "desktop": "docs/why_choose_didm_1440.png",
    "mobile": "docs/why_choose_didm_390.png"
  }
}
```


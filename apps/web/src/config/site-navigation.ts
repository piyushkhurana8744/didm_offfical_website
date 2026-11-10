/**
 * Central Typed Navigation Registry for DIDM Official Website.
 * Single source of truth for:
 * - Desktop Header & Mega-Menus
 * - Mobile Drawer & Accordion Groups
 * - Footer Links & Groupings
 * - Breadcrumbs & Route Integrity
 */

export type NavItemStatus = "active" | "pending_editorial" | "external";
export type NavVisibility = "all" | "desktop" | "mobile" | "footer" | "utility";

export interface NavItem {
  id: string;
  label: string;
  href: string;
  description?: string;
  parentId?: string;
  group?: string;
  order: number;
  external?: boolean;
  visibility: NavVisibility[];
  status: NavItemStatus;
  badge?: string;
  sourceUrl?: string;
  iconName?: string;
}

export interface MegaMenuColumn {
  id: string;
  title: string;
  subtitle?: string;
  items: NavItem[];
}

export interface MegaMenuConfig {
  id: string;
  triggerLabel: string;
  href: string;
  columns: MegaMenuColumn[];
  featuredCard?: {
    title: string;
    description: string;
    badge: string;
    ctaLabel: string;
    ctaHref: string;
    imagePath?: string;
  };
}

/* ===================================================================== */
/* 1. TOP UTILITY BAR NAVIGATION                                         */
/* ===================================================================== */
export const UTILITY_NAVIGATION: NavItem[] = [
  {
    id: "util-blog",
    label: "Blogs",
    href: "https://www.blog.didm.in",
    description: "Industry trends, SEO guides, and practical digital growth articles.",
    order: 1,
    external: true,
    visibility: ["utility", "mobile", "footer"],
    status: "external",
    sourceUrl: "https://www.blog.didm.in",
  },
  {
    id: "util-news",
    label: "News & Events",
    href: "/media-coverage",
    description: "Conclaves, convocation ceremonies, and media press announcements.",
    order: 2,
    visibility: ["utility", "mobile", "footer"],
    status: "active",
    sourceUrl: "https://www.didm.in/news-and-events",
  },
  {
    id: "util-franchise",
    label: "Franchise",
    href: "/franchise",
    description: "Partner with India's most promising brand in digital marketing education.",
    order: 3,
    badge: "Partner",
    visibility: ["utility", "mobile", "footer"],
    status: "active",
    sourceUrl: "https://www.didm.in/franchise",
  },
  {
    id: "util-careers",
    label: "Careers",
    href: "/careers",
    description: "Join DIDM as a mentor, trainer, counselor, or digital specialist.",
    order: 4,
    badge: "Hiring",
    visibility: ["utility", "mobile", "footer"],
    status: "active",
    sourceUrl: "https://www.didm.in/careers",
  },
];

/* ===================================================================== */
/* 2. TRAINING MEGA-MENU CONFIGURATION                                   */
/* ===================================================================== */
export const TRAINING_MEGA_MENU: MegaMenuConfig = {
  id: "menu-training",
  triggerLabel: "Training",
  href: "/programs",
  columns: [
    {
      id: "col-diploma",
      title: "Diploma Program",
      subtitle: "Comprehensive AI & Marketing Intelligence",
      items: [
        {
          id: "prog-dmi",
          label: "Digital Marketing Intelligence (DMI)",
          href: "/programs/digital-marketing-artificial-intelligence",
          description: "Dual-domain diploma infusing data intelligence and Generative AI workflows.",
          order: 1,
          badge: "AI-Powered",
          visibility: ["desktop", "mobile"],
          status: "active",
          sourceUrl: "https://www.didm.in/digital-marketing-artificial-intelligence",
        },
      ],
    },
    {
      id: "col-certifications",
      title: "Certification Programs",
      subtitle: "In-Depth Practical Curriculum",
      items: [
        {
          id: "prog-midm",
          label: "Master in Digital Marketing (MIDM)",
          href: "/programs/master-in-digital-marketing-course",
          description: "Our signature 52-stop learning roadmap with live agency capstone.",
          order: 1,
          badge: "Signature · 52 Stops",
          visibility: ["desktop", "mobile"],
          status: "active",
          sourceUrl: "https://www.didm.in/master-in-digital-marketing-course",
        },
        {
          id: "prog-aidm",
          label: "Advanced in Digital Marketing (AIDM)",
          href: "/programs/advanced-digital-marketing-course",
          description: "Performance media, SEO architecture, and paid search campaigns.",
          order: 2,
          badge: "Popular",
          visibility: ["desktop", "mobile"],
          status: "active",
          sourceUrl: "https://www.didm.in/advanced-digital-marketing-course",
        },
        {
          id: "prog-pidm",
          label: "Professional in Digital Marketing",
          href: "/programs/customized-digital-marketing-course",
          description: "Accelerated customized track for entrepreneurs and busy professionals.",
          order: 3,
          visibility: ["desktop", "mobile"],
          status: "active",
          sourceUrl: "https://www.didm.in/customized-digital-marketing-course",
        },
        {
          id: "prog-online",
          label: "Online Digital Marketing Course",
          href: "/programs/online-digital-marketing-course",
          description: "Interactive live Zoom batches with lifetime recorded LMS video access.",
          order: 4,
          badge: "Global",
          visibility: ["desktop", "mobile"],
          status: "active",
          sourceUrl: "https://www.didm.in/online-digital-marketing-course",
        },
        {
          id: "prog-genai",
          label: "Gen AI Tools & Prompting Camp",
          href: "/programs/gen-ai-knowledge-camp",
          description: "ChatGPT, Midjourney, Claude, Make.com, and AI automation for marketers.",
          order: 5,
          badge: "New 2026",
          visibility: ["desktop", "mobile"],
          status: "active",
          sourceUrl: "https://www.didm.in/gen-ai-knowledge-camp",
        },
      ],
    },
    {
      id: "col-schedules",
      title: "Admissions & Schedules",
      subtitle: "Plan Your Batch Enrolment",
      items: [
        {
          id: "nav-upcoming-batches",
          label: "Upcoming Batches",
          href: "/upcoming-batches",
          description: "View immediate weekday and weekend batch timings across all campuses.",
          order: 1,
          badge: "Live Schedule",
          visibility: ["desktop", "mobile"],
          status: "active",
          sourceUrl: "https://www.didm.in/upcoming-batches",
        },
        {
          id: "nav-compare-courses",
          label: "Compare All Courses",
          href: "/compare",
          description: "Side-by-side curriculum, hours, and certification comparison matrix.",
          order: 2,
          visibility: ["desktop", "mobile"],
          status: "active",
          sourceUrl: "https://www.didm.in/compare",
        },
        {
          id: "nav-direct-enrollment",
          label: "Direct Enrollment",
          href: "/enquire",
          description: "Reserve your seat online or apply for merit fee instalment options.",
          order: 3,
          visibility: ["desktop", "mobile"],
          status: "active",
          sourceUrl: "https://www.didm.in/enrollnow",
        },
      ],
    },
  ],
  featuredCard: {
    title: "Master in Digital Marketing (MIDM)",
    description: "52 curated stops, live agency onboarding under Online Strikers, and 100% placement support.",
    badge: "Flagship Program",
    ctaLabel: "Explore 52-Stop Studio",
    ctaHref: "/programs/master-in-digital-marketing-course",
  },
};

/* ===================================================================== */
/* 3. SELECT CENTRES MEGA-MENU CONFIGURATION                             */
/* ===================================================================== */
export const CENTRES_MEGA_MENU: MegaMenuConfig = {
  id: "menu-centres",
  triggerLabel: "Select Centers",
  href: "/centres",
  columns: [
    {
      id: "col-delhi-ncr",
      title: "Delhi NCR Campuses",
      subtitle: "Metro-Connected Modern Learning Hubs",
      items: [
        { id: "ctr-dwarka", label: "Dwarka Campus", href: "/centres/dwarka", order: 1, visibility: ["desktop", "mobile"], status: "active" },
        { id: "ctr-gurgaon", label: "Gurugram Hub", href: "/centres/gurgaon", order: 2, visibility: ["desktop", "mobile"], status: "active" },
        { id: "ctr-kalkaji", label: "Kalkaji South Delhi", href: "/centres/kalkaji", order: 3, visibility: ["desktop", "mobile"], status: "active" },
        { id: "ctr-noida", label: "Noida Sector 62", href: "/centres/noida", order: 4, visibility: ["desktop", "mobile"], status: "active" },
        { id: "ctr-pitampura", label: "Pitampura Campus", href: "/centres/pitampura", order: 5, visibility: ["desktop", "mobile"], status: "active" },
        { id: "ctr-preet-vihar", label: "Preet Vihar East Delhi", href: "/centres/preet-vihar", order: 6, visibility: ["desktop", "mobile"], status: "active" },
        { id: "ctr-rajouri-garden", label: "Rajouri Garden West Delhi", href: "/centres/rajouri-garden", order: 7, visibility: ["desktop", "mobile"], status: "active" },
        { id: "ctr-satya-niketan", label: "South Campus / Satya Niketan (HQ)", href: "/centres/satya-niketan", order: 8, badge: "HQ", visibility: ["desktop", "mobile"], status: "active" },
      ],
    },
    {
      id: "col-regional",
      title: "Regional & North India Campuses",
      subtitle: "State-of-the-Art Classroom Networks",
      items: [
        { id: "ctr-dehradun", label: "Dehradun Campus", href: "/centres/dehradun", order: 1, visibility: ["desktop", "mobile"], status: "active" },
        { id: "ctr-mumbai", label: "Mumbai Hub", href: "/centres/mumbai", order: 2, visibility: ["desktop", "mobile"], status: "active" },
        { id: "ctr-haldwani", label: "Haldwani / Rudrapur", href: "/centres/haldwani-rudarpur", order: 3, badge: "New 2024", visibility: ["desktop", "mobile"], status: "active" },
        { id: "ctr-meerut", label: "Meerut Hub", href: "/centres/meerut", order: 4, visibility: ["desktop", "mobile"], status: "active" },
        { id: "ctr-jaipur", label: "Jaipur Campus", href: "/centres/jaipur", order: 5, visibility: ["desktop", "mobile"], status: "active" },
        { id: "ctr-online", label: "Global Online Campus", href: "/centres/online", order: 6, badge: "Live 2-Way", visibility: ["desktop", "mobile"], status: "active" },
      ],
    },
  ],
  featuredCard: {
    title: "14 Campuses Across India",
    description: "Equipped with high-speed student terminals, doubt labs, and live client campaign simulation boards.",
    badge: "Classroom Network",
    ctaLabel: "View All 14 Campus Maps",
    ctaHref: "/centres",
  },
};

/* ===================================================================== */
/* 4. ABOUT US DROPDOWN CONFIGURATION                                    */
/* ===================================================================== */
export const ABOUT_DROPDOWN: MegaMenuColumn = {
  id: "dropdown-about",
  title: "About DIDM",
  items: [
    {
      id: "about-who-we-are",
      label: "Who We Are (10+ Years Legacy)",
      href: "/about",
      description: "Founded in 2014, shaping over 61,500+ digital marketing careers.",
      order: 1,
      badge: "Established 2014",
      visibility: ["desktop", "mobile"],
      status: "active",
      sourceUrl: "https://www.didm.in/about-us",
    },
    {
      id: "about-trainers",
      label: "Our Trainers & Mentors",
      href: "/trainers",
      description: "11 verified faculty heads and agency practitioners with 8+ to 15+ years experience.",
      order: 2,
      visibility: ["desktop", "mobile"],
      status: "active",
      sourceUrl: "https://www.didm.in/trainer",
    },
    {
      id: "about-trainee-reviews",
      label: "Trainee Reviews & Video Stories",
      href: "/stories",
      description: "Real reviews from college freshers, career switchers, and business owners.",
      order: 3,
      badge: "4.8/5 Rating",
      visibility: ["desktop", "mobile"],
      status: "active",
      sourceUrl: "https://www.didm.in/trainee-reviews",
    },
    {
      id: "about-placement-records",
      label: "100% Record Placements & Packages",
      href: "/outcomes",
      description: "500+ corporate tie-ups, salary insights, and dedicated placement cell.",
      order: 4,
      badge: "500+ Partners",
      visibility: ["desktop", "mobile"],
      status: "active",
      sourceUrl: "https://www.didm.in/placement",
    },
    {
      id: "about-why-choose",
      label: "Why Choose DIDM (150+ Reasons)",
      href: "/why-choose-didm",
      description: "ASSOCHAM Most Promising Brand award, ISO 9001:2015, and News24 partner.",
      order: 5,
      visibility: ["desktop", "mobile"],
      status: "active",
      sourceUrl: "https://www.didm.in/150-reasons-to-join-digital-marketing-course-didm",
    },
    {
      id: "about-life-didm",
      label: "Life @ DIDM & Culture",
      href: "/life-at-didm",
      description: "Campus celebrations, ad hackathons, and collaborative student energy.",
      order: 6,
      visibility: ["desktop", "mobile"],
      status: "active",
      sourceUrl: "https://www.didm.in/life-didm",
    },
  ],
};

/* ===================================================================== */
/* 5. RESOURCES MEGA-MENU CONFIGURATION                                  */
/* ===================================================================== */
export const RESOURCES_MEGA_MENU: MegaMenuConfig = {
  id: "menu-resources",
  triggerLabel: "Resources",
  href: "/learn",
  columns: [
    {
      id: "col-enterprise",
      title: "Enterprise & Institutional",
      subtitle: "Tailored Corporate Upskilling",
      items: [
        {
          id: "res-corporate",
          label: "Corporate Training Program",
          href: "/organisations",
          description: "Custom enterprise marketing and AI enablement workshops for teams.",
          order: 1,
          visibility: ["desktop", "mobile"],
          status: "active",
          sourceUrl: "https://www.didm.in/corporate-training-program",
        },
        {
          id: "res-colleges",
          label: "Educational Institution Program",
          href: "/organisations#colleges",
          description: "University semester modules, credit workshops, and campus conclaves.",
          order: 2,
          visibility: ["desktop", "mobile"],
          status: "active",
          sourceUrl: "https://www.didm.in/colleges-and-university-session",
        },
        {
          id: "res-faqs",
          label: "Frequently Asked Questions",
          href: "/faqs",
          description: "Official answers on backup classes, doubt desks, and policies.",
          order: 3,
          visibility: ["desktop", "mobile"],
          status: "active",
          sourceUrl: "https://www.didm.in/about-us",
        },
      ],
    },
    {
      id: "col-credentials",
      title: "Credentials & Media",
      subtitle: "Validations and Press Highlights",
      items: [
        {
          id: "res-certifications",
          label: "30+ Global Certifications",
          href: "/certifications",
          description: "Google Ads, GA4, Meta Certified, HubSpot, SEMrush & DIDM Diploma.",
          order: 1,
          badge: "30+ Certificates",
          visibility: ["desktop", "mobile"],
          status: "active",
          sourceUrl: "https://www.didm.in/didm-certifications",
        },
        {
          id: "res-media-coverage",
          label: "DIDM Media Coverage & Press",
          href: "/media-coverage",
          description: "ASSOCHAM awards, Zee News, The Hindu coverage, and news conclaves.",
          order: 2,
          badge: "Press",
          visibility: ["desktop", "mobile"],
          status: "active",
          sourceUrl: "https://www.didm.in/didm-media-coverage",
        },
        {
          id: "res-news-events",
          label: "News & Academic Conclaves",
          href: "/news-and-events",
          description: "Economic Times Changemakers feature, convocation ceremonies, and masterclasses.",
          order: 3,
          badge: "New",
          visibility: ["desktop", "mobile"],
          status: "active",
          sourceUrl: "https://www.didm.in/news-and-events",
        },
        {
          id: "res-happy-faces",
          label: "Student Gallery & Convocations",
          href: "/gallery",
          description: "Graduation photos, convocation moments, and campus memories.",
          order: 4,
          visibility: ["desktop", "mobile"],
          status: "active",
          sourceUrl: "https://www.didm.in/digital-marketing-course-successful-batch-images",
        },
      ],
    },
  ],
  featuredCard: {
    title: "Free E-Notes & LMS Video Hub",
    description: "Access curated study notes, ad budget templates, and practical project files.",
    badge: "Student Hub",
    ctaLabel: "Open Learning Hub",
    ctaHref: "/learn",
  },
};

/* ===================================================================== */
/* 6. COMPLETE SITE FOOTER GROUPINGS                                     */
/* ===================================================================== */
export const FOOTER_COLUMNS = [
  {
    title: "Flagship Programs",
    items: [
      { label: "Master in Digital Marketing (MIDM)", href: "/programs/master-in-digital-marketing-course" },
      { label: "Digital Marketing Intelligence (DMI)", href: "/programs/digital-marketing-artificial-intelligence" },
      { label: "Advanced Digital Marketing (AIDM)", href: "/programs/advanced-digital-marketing-course" },
      { label: "Professional Customized Course", href: "/programs/customized-digital-marketing-course" },
      { label: "Online Live Interactive Course", href: "/programs/online-digital-marketing-course" },
      { label: "Gen AI Tools & Prompting Camp", href: "/programs/gen-ai-knowledge-camp" },
      { label: "Upcoming Batches & Timings", href: "/upcoming-batches" },
      { label: "Curriculum Comparison Matrix", href: "/compare" },
    ],
  },
  {
    title: "Delhi NCR Campuses",
    items: [
      { label: "Dwarka Campus", href: "/centres/dwarka" },
      { label: "Gurugram Sector 14 Hub", href: "/centres/gurgaon" },
      { label: "Kalkaji South Delhi", href: "/centres/kalkaji" },
      { label: "Noida Sector 62", href: "/centres/noida" },
      { label: "Pitampura North Delhi", href: "/centres/pitampura" },
      { label: "Preet Vihar East Delhi", href: "/centres/preet-vihar" },
      { label: "Rajouri Garden West Delhi", href: "/centres/rajouri-garden" },
      { label: "Satya Niketan Head Office", href: "/centres/satya-niketan" },
    ],
  },
  {
    title: "Regional & Online",
    items: [
      { label: "Dehradun Campus", href: "/centres/dehradun" },
      { label: "Mumbai Andheri Hub", href: "/centres/mumbai" },
      { label: "Haldwani / Rudrapur", href: "/centres/haldwani-rudarpur" },
      { label: "Meerut Campus", href: "/centres/meerut" },
      { label: "Jaipur Campus", href: "/centres/jaipur" },
      { label: "Live Global Online Campus", href: "/centres/online" },
      { label: "All 14 Campus Maps", href: "/centres" },
    ],
  },
  {
    title: "Institute & Resources",
    items: [
      { label: "About DIDM (10+ Years)", href: "/about" },
      { label: "Faculty & Mentors Directory", href: "/trainers" },
      { label: "Why Choose DIDM (150+ Reasons)", href: "/why-choose-didm" },
      { label: "Student Convocation Gallery", href: "/gallery" },
      { label: "Life at DIDM & Culture", href: "/life-at-didm" },
      { label: "Placement Outcomes & Packages", href: "/outcomes" },
      { label: "Student Reviews & Testimonials", href: "/stories" },
      { label: "30+ Recognized Certifications", href: "/certifications" },
      { label: "News & Academic Conclaves", href: "/news-and-events" },
      { label: "DIDM Media Coverage & Press", href: "/media-coverage" },
      { label: "Student FAQs & Policies", href: "/faqs" },
      { label: "Franchise Partnerships", href: "/franchise" },
      { label: "Careers @ DIDM", href: "/careers" },
      { label: "Contact & Helplines", href: "/contact" },
      { label: "Terms of Admission", href: "/terms" },
      { label: "Refund & Fee Policy", href: "/refund" },
    ],
  },
];


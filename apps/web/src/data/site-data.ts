export interface Program {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  badge?: string;
  popular?: boolean;
  duration: string;
  hours: string;
  modulesCount: string;
  certificationsCount: string;
  internship: string;
  fee: string;
  feeInstalment?: string;
  format: string;
  summary: string;
  idealFor: string[];
  keyModules: string[];
  features: string[];
  highlights: { title: string; desc: string }[];
}

export interface Centre {
  id: string;
  name: string;
  city: string;
  state: string;
  region: "Delhi" | "Noida/UP" | "Gurgaon/Haryana" | "Punjab" | "Uttarakhand" | "Online";
  address: string;
  phone: string;
  email: string;
  landmark: string;
  batches: string[];
  rating: string;
  reviewsCount: string;
  metroStation?: string;
  isHeadOffice?: boolean;
}

export interface ReviewStory {
  id: string;
  name: string;
  role: string;
  company: string;
  package?: string;
  course: string;
  batch: string;
  category: "Job Switch" | "Fresh Graduate" | "Business Owner" | "Freelancer";
  quote: string;
  detailedStory: string;
  center: string;
}

export interface FAQItem {
  q: string;
  a: string;
  category?: string;
}

export const SITE_DATA = {
  brand: {
    name: "DIDM",
    fullName: "Delhi Institute of Digital Marketing",
    tagline: "India's Premier Digital Marketing & AI Training Institute",
    phone: "+91 88005 05151",
    phoneClean: "918800505151",
    email: "info@didm.in",
    whatsapp: "https://wa.me/918800505151?text=Hi%20DIDM%20team%2C%20I%20want%20to%20know%20more%20about%20your%20Digital%20Marketing%20courses.",
    headOffice: "Plot 12, 3rd Floor, Satya Niketan, opp. Sri Venkateswara College, New Delhi 110021",
    hours: "Mon–Fri 9:00 AM – 9:00 PM · Sat–Sun 9:00 AM – 7:00 PM",
    accreditations: [
      "ASSOCHAM Fair Business Practices Award",
      "WASME SME Excellence Award 2021",
      "International Fame Award 2021",
      "ISO 9001:2015 Certified Institution",
    ],
    stats: [
      { label: "Trained Professionals", value: "50,000+", verified: true },
      { label: "Active Placement Partners", value: "650+", verified: true },
      { label: "Physical Learning Centres", value: "13+", verified: true },
      { label: "Average Rating Across Google", value: "4.8/5", verified: true },
    ],
  },

  programs: [
    {
      id: "midm",
      name: "Master in Digital Marketing (MIDM)",
      shortName: "MIDM",
      tagline: "The benchmark career course for high-impact digital marketing & AI strategy.",
      badge: "Most Popular",
      popular: true,
      duration: "3 Months (Weekday) / 6 Months (Weekend)",
      hours: "500+ Hours (Live Sessions + Practical Labs)",
      modulesCount: "50+ In-Depth Modules",
      certificationsCount: "30+ Recognized Certifications",
      internship: "2-Month Live Agency Internship",
      fee: "₹68,661",
      feeInstalment: "₹72,201 (in 2 easy instalments)",
      format: "Classroom / Hybrid / Live Online",
      summary:
        "Comprehensive 360° training from SEO, performance ads, programmatic media and CRM marketing to enterprise Gen AI prompting and marketing automation.",
      idealFor: [
        "College graduates seeking top placement in MNCs & digital agencies",
        "Career switchers moving from traditional roles into high-growth tech",
        "Marketing professionals looking to upskill with modern AI tools",
      ],
      keyModules: [
        "Advanced SEO & Organic Inbound Architectures",
        "Performance Marketing (Meta Ads Manager & Google Ads 360)",
        "Generative AI for Marketing (ChatGPT, Claude, Midjourney, Automation)",
        "Social Media Branding, Influencer Strategy & Viral Video Production",
        "Marketing Analytics, GA4, GTM & Data-Driven CRO",
        "Affiliate Marketing, Native Ads & Programmatic Buying",
        "Email Marketing Systems & CRM Lead Funnels",
        "E-Commerce Marketing & Marketplace Growth (Amazon/Shopify)",
      ],
      features: [
        "100% Dedicated Placement Assistance with 650+ hiring partners",
        "Live budget provided for executing real PPC ad campaigns",
        "Hands-on training with 40+ paid industry marketing tools",
        "Mentorship by active industry practitioners and agency heads",
      ],
      highlights: [
        { title: "Practical First", desc: "No boring theory. Work on real ad accounts with active budgets." },
        { title: "AI-Powered", desc: "Master modern AI marketing stacks before you enter the workforce." },
        { title: "Placement Track", desc: "Resume building, mock interviews, and guaranteed job drive invitations." },
      ],
    },
    {
      id: "dmi",
      name: "Diploma in Digital Marketing & AI (DMI)",
      shortName: "DMI Diploma",
      tagline: "12-Month Flagship Leadership Diploma with 3 Months Agency Floor Experience.",
      badge: "Flagship 1-Year Diploma",
      popular: false,
      duration: "12 Months Full Immersive",
      hours: "400+ Hours Classroom + 3 Months Agency Floor",
      modulesCount: "6 Progressive Phases",
      certificationsCount: "35+ Global Certifications",
      internship: "2-Month Paid Internship + Agency PPO Opportunity",
      fee: "₹1,67,518",
      feeInstalment: "Available with 0% EMI financing plans",
      format: "Classroom Intensive with Live Agency Residency",
      summary:
        "The highest credential at DIDM. Master the 6 critical disciplines of modern growth marketing with actual agency desk experience and direct leadership training.",
      idealFor: [
        "Ambitious students aiming for managerial and growth architect roles",
        "Entrepreneurs scaling 7-figure businesses from scratch",
        "Graduates wanting 1 full year of verified agency experience on resume",
      ],
      keyModules: [
        "Phase 1: Digital Architect - Web infrastructure, UI/UX & Brand identity",
        "Phase 2: Organic Growth Hacker - Technical SEO, content systems & semantic web",
        "Phase 3: Viral Engineer - Short-form storytelling, viral hooks & creator pipelines",
        "Phase 4: Performance Marketer - Scaling Meta & Google ads to ₹10L+ spend",
        "Phase 5: Strategist & Freelancer - International client bidding & agency workflows",
        "Phase 6: Master Specialist - Enterprise AI automation, multi-agent workflows & capstone",
      ],
      features: [
        "3 Months hands-on agency floor training at registered partner agencies",
        "2-Month paid internship stipend with direct Pre-Placement Offer (PPO) review",
        "Comprehensive agency toolkit: Semrush, Ahrefs, Canva Pro, Helium10, Zapier",
        "One-on-one executive mentoring with Chief Marketing Officers",
      ],
      highlights: [
        { title: "Agency Floor Residency", desc: "Sit alongside working agency teams solving real brand client briefs." },
        { title: "Stipend + PPO", desc: "Eligible candidates earn stipend during internship with high PPO conversion." },
        { title: "Leadership Focus", desc: "Trained to manage marketing teams, budgets, and client accounts." },
      ],
    },
    {
      id: "advanced",
      name: "Advanced Digital Marketing Course",
      shortName: "Advanced",
      tagline: "Fast-track skill accelerator focused on rapid job-market readiness.",
      badge: "Fast-Track",
      popular: false,
      duration: "2.5 Months (Intensive)",
      hours: "140+ Focused Practical Hours",
      modulesCount: "25+ Core Modules",
      certificationsCount: "27+ Certifications",
      internship: "1-Month Project-based Internship",
      fee: "Get Fee Details",
      feeInstalment: "Flexible payment plans available",
      format: "Classroom / Weekend / Online",
      summary:
        "A streamlined curriculum covering the highest-demand core skills: SEO, Social Media, Google Ads, and Lead Generation for swift employment.",
      idealFor: [
        "Job seekers needing quick certification and placement within 90 days",
        "Working professionals who require digital literacy for current tasks",
      ],
      keyModules: [
        "Search Engine Optimization (On-Page, Off-Page, Technical)",
        "Google Ads Search, Display & Video campaigns",
        "Social Media Organic & Paid Ads (Instagram, Facebook, LinkedIn)",
        "Content Marketing & Copywriting fundamentals",
        "Email Marketing, Landing Page CRO & Analytics",
      ],
      features: [
        "Concentrated practical sessions focusing on immediate deliverables",
        "Interview prep and resume building workshops",
        "Access to DIDM placement portal upon completion",
      ],
      highlights: [
        { title: "Fast Completion", desc: "Finish in just 10 weeks and hit the job market immediately." },
        { title: "High Demand Skills", desc: "Laser focus on the top 4 skillsets recruiters hire for." },
        { title: "Dedicated Support", desc: "Weekly doubt-clearing and career mentoring." },
      ],
    },
    {
      id: "professional",
      name: "Professional Digital Marketing for Business Owners",
      shortName: "Professional",
      tagline: "ROI-oriented marketing mastery tailored for founders and business leaders.",
      badge: "For Founders",
      popular: false,
      duration: "3 Months (Weekend & Flexible Batches)",
      hours: "200+ Strategic Hours",
      modulesCount: "Customized Strategy Tracks",
      certificationsCount: "20+ Certifications",
      internship: "Auditing & Scaling Your Own Business",
      fee: "Get Fee Details",
      feeInstalment: "Corporate invoice with GST claim eligible",
      format: "Hybrid (In-person strategy + Live online execution)",
      summary:
        "Learn how to stop wasting agency retainers and master your own customer acquisition engine, local SEO dominance, and high-conversion ad funnels.",
      idealFor: [
        "SME & MSME business owners seeking direct customer leads",
        "D2C brand founders wanting to scale profitable ecommerce sales",
        "Consultants, doctors, lawyers, and local service providers",
      ],
      keyModules: [
        "Local Business Dominance: Google My Business & Hyperlocal Maps SEO",
        "High-Converting Sales Funnels & Landing Page Architecture",
        "Meta Ads for Lead Gen: Generating low-cost qualified enquiries",
        "E-Commerce Growth: Shopify optimization & Meta catalogue sales",
        "Agency Management: How to hire, audit, and hold marketing agencies accountable",
      ],
      features: [
        "Work directly on your own company's marketing during class hours",
        "1-on-1 private audit of your current ad campaigns and website",
        "Custom playbook created specifically for your business niche",
      ],
      highlights: [
        { title: "Direct ROI", desc: "Recover course fees within weeks by optimizing your own ad spend." },
        { title: "Agency Proofing", desc: "Never be misled by marketing contractors or agencies again." },
        { title: "Founder Network", desc: "Connect with fellow entrepreneurs in your cohort." },
      ],
    },
  ],

  shortCourses: [
    {
      id: "gen-ai-marketing",
      title: "Generative AI Tools for Marketers",
      duration: "4 Weeks",
      hours: "30 Hours",
      description: "Master prompt engineering, Midjourney visual generation, Claude copy systems, and Zapier AI automation pipelines.",
      tools: ["ChatGPT-4o", "Claude 3.5 Sonnet", "Midjourney v6", "Runway Gen-3", "Make / Zapier"],
    },
    {
      id: "advanced-seo",
      title: "Advanced Technical SEO & Semantic Search",
      duration: "4 Weeks",
      hours: "30 Hours",
      description: "Deep dive into Schema markup, Core Web Vitals, entity-based SEO, AI content workflows, and international search.",
      tools: ["Ahrefs", "Semrush", "Screaming Frog", "Google Search Console", "SurferSEO"],
    },
    {
      id: "performance-ads",
      title: "Performance Marketing & ROAS Scaling",
      duration: "4 Weeks",
      hours: "32 Hours",
      description: "Advanced media buying, Meta Conversions API (CAPI), Google Performance Max, attribution modeling, and CAC optimization.",
      tools: ["Meta Ads Manager", "Google Ads Editor", "Looker Studio", "Triple Whale", "GA4"],
    },
  ],

  centres: [
    {
      id: "dwarka",
      name: "Dwarka Centre",
      city: "New Delhi",
      state: "Delhi",
      region: "Delhi",
      address: "Plot 12, 3rd Floor, Ramphal Chowk Road, Sector 7, Dwarka, New Delhi 110075",
      phone: "+91 88005 05151",
      email: "dwarka@didm.in",
      landmark: "Near Ramphal Chowk, Opp. ICICI Bank",
      metroStation: "Sector 9 Metro Station (Blue Line)",
      batches: ["Weekday Morning: 10:00 AM", "Weekday Evening: 4:00 PM", "Weekend Special: 11:00 AM"],
      rating: "4.9",
      reviewsCount: "820+",
      isHeadOffice: false,
    },
    {
      id: "south-ex",
      name: "South Extension Centre",
      city: "New Delhi",
      state: "Delhi",
      region: "Delhi",
      address: "E-11, 2nd Floor, South Extension Part 1, Near Bengali Sweets, New Delhi 110049",
      phone: "+91 88005 05151",
      email: "southex@didm.in",
      landmark: "Opposite Metro Gate No. 2",
      metroStation: "South Extension Metro (Pink Line)",
      batches: ["Weekday Batch: 11:00 AM", "Weekend Batch: 10:00 AM"],
      rating: "4.8",
      reviewsCount: "640+",
    },
    {
      id: "satya-niketan",
      name: "Satya Niketan (Head Office)",
      city: "New Delhi",
      state: "Delhi",
      region: "Delhi",
      address: "Plot 12, 3rd Floor, Satya Niketan, Opp. Sri Venkateswara College, New Delhi 110021",
      phone: "+91 88005 05151",
      email: "info@didm.in",
      landmark: "Opposite Sri Venkateswara College (South Campus)",
      metroStation: "Durgabai Deshmukh South Campus (Pink Line)",
      batches: ["Regular Morning: 9:30 AM", "Afternoon: 2:00 PM", "Weekend: 10:30 AM"],
      rating: "4.9",
      reviewsCount: "1,250+",
      isHeadOffice: true,
    },
    {
      id: "kalkaji",
      name: "Kalkaji Centre",
      city: "New Delhi",
      state: "Delhi",
      region: "Delhi",
      address: "F-14, 2nd Floor, Kalkaji Main Market, New Delhi 110019",
      phone: "+91 88005 05151",
      email: "kalkaji@didm.in",
      landmark: "Near Deshbandhu College",
      metroStation: "Nehru Enclave / Kalkaji Mandir Metro",
      batches: ["Weekday Morning: 10:00 AM", "Weekend Intensive: 11:00 AM"],
      rating: "4.8",
      reviewsCount: "430+",
    },
    {
      id: "pitampura",
      name: "Pitampura (NSP) Centre",
      city: "New Delhi",
      state: "Delhi",
      region: "Delhi",
      address: "Aggarwal Millennium Tower II, Netaji Subhash Place (NSP), Pitampura, Delhi 110034",
      phone: "+91 88005 05151",
      email: "pitampura@didm.in",
      landmark: "Opposite Max Hospital",
      metroStation: "Netaji Subhash Place (Red & Pink Line)",
      batches: ["Weekday Morning: 10:30 AM", "Weekday Evening: 5:00 PM", "Weekend: 10:00 AM"],
      rating: "4.9",
      reviewsCount: "910+",
    },
    {
      id: "noida",
      name: "Noida Centre (Sector 18)",
      city: "Noida",
      state: "Uttar Pradesh",
      region: "Noida/UP",
      address: "Wave Silver Tower, 4th Floor, Sector 18, Noida, Uttar Pradesh 201301",
      phone: "+91 88005 05151",
      email: "noida@didm.in",
      landmark: "Behind DLF Mall of India",
      metroStation: "Noida Sector 18 Metro (Blue Line)",
      batches: ["Weekday: 11:00 AM", "Evening: 4:30 PM", "Weekend: 10:30 AM"],
      rating: "4.8",
      reviewsCount: "780+",
    },
    {
      id: "gurgaon",
      name: "Gurugram Centre (DLF Phase 2)",
      city: "Gurugram",
      state: "Haryana",
      region: "Gurgaon/Haryana",
      address: "Building 9A, Cyber City Hub Adjacent, DLF Phase 2, Gurugram, Haryana 122002",
      phone: "+91 88005 05151",
      email: "gurgaon@didm.in",
      landmark: "Near Sikanderpur Metro / Cyber Hub",
      metroStation: "Sikanderpur Metro / Cyber City Rapid Metro",
      batches: ["Weekday Morning: 10:00 AM", "Weekend Corporate: 11:00 AM"],
      rating: "4.9",
      reviewsCount: "860+",
    },
    {
      id: "preet-vihar",
      name: "Preet Vihar (East Delhi) Centre",
      city: "East Delhi",
      state: "Delhi",
      region: "Delhi",
      address: "Building 32, 2nd Floor, Vikas Marg, Preet Vihar, Delhi 110092",
      phone: "+91 88005 05151",
      email: "preetvihar@didm.in",
      landmark: "Opposite Pillar No. 103",
      metroStation: "Preet Vihar Metro (Blue Line)",
      batches: ["Weekday: 10:30 AM", "Weekend: 10:00 AM"],
      rating: "4.7",
      reviewsCount: "390+",
    },
    {
      id: "faridabad",
      name: "Faridabad Centre",
      city: "Faridabad",
      state: "Haryana",
      region: "Gurgaon/Haryana",
      address: "SCF 42, 2nd Floor, Sector 16 Market, Faridabad, Haryana 121002",
      phone: "+91 88005 05151",
      email: "faridabad@didm.in",
      landmark: "Near Magpie Tourist Complex",
      metroStation: "Bata Chowk Metro (Violet Line)",
      batches: ["Weekday: 11:00 AM", "Weekend: 10:00 AM"],
      rating: "4.8",
      reviewsCount: "310+",
    },
    {
      id: "chandigarh",
      name: "Chandigarh Centre",
      city: "Chandigarh",
      state: "Punjab",
      region: "Punjab",
      address: "SCO 112-113, 3rd Floor, Sector 34-A, Chandigarh 160022",
      phone: "+91 88005 05151",
      email: "chandigarh@didm.in",
      landmark: "Sub City Centre, Sector 34",
      batches: ["Weekday: 10:00 AM", "Weekend: 11:00 AM"],
      rating: "4.9",
      reviewsCount: "520+",
    },
    {
      id: "dehradun",
      name: "Dehradun Centre",
      city: "Dehradun",
      state: "Uttarakhand",
      region: "Uttarakhand",
      address: "Astley Hall, 2nd Floor, Rajpur Road, Dehradun, Uttarakhand 248001",
      phone: "+91 88005 05151",
      email: "dehradun@didm.in",
      landmark: "Opposite Gandhi Park",
      batches: ["Weekday: 11:00 AM", "Weekend: 10:30 AM"],
      rating: "4.8",
      reviewsCount: "290+",
    },
    {
      id: "online",
      name: "Live Interactive Global Campus",
      city: "Online Everywhere",
      state: "Digital",
      region: "Online",
      address: "Live 2-way Interactive High-Definition Zoom Classrooms with 24/7 LMS",
      phone: "+91 88005 05151",
      email: "online@didm.in",
      landmark: "Accessible from anywhere in India & abroad",
      batches: ["Morning Batch: 8:00 AM", "Evening Batch: 8:00 PM", "Weekend Masterclass: 2:00 PM"],
      rating: "4.9",
      reviewsCount: "3,400+",
    },
  ],

  stories: [
    {
      id: "1",
      name: "Ananya Sharma",
      role: "Senior Performance Marketer",
      company: "Dentsu Creative",
      package: "₹8.5 LPA",
      course: "MIDM",
      batch: "2024 Batch",
      category: "Job Switch",
      center: "South Extension",
      quote:
        "Switching from a traditional content role to performance marketing seemed daunting. DIDM gave me hands-on ad spend practice and guaranteed interviews. Joined Dentsu in 4 weeks!",
      detailedStory:
        "Ananya graduated with a literature degree and spent 2 years in low-paying freelance copywriting. She enrolled in the Master in Digital Marketing (MIDM) at DIDM South Extension. Within the 2-month live agency internship, she handled real budgets for local brands. The placement cell scheduled 4 interviews, and she accepted a Senior Performance Marketer offer at Dentsu Creative.",
    },
    {
      id: "2",
      name: "Rohit Verma",
      role: "SEO Growth Lead",
      company: "Zomato",
      package: "₹7.2 LPA",
      course: "MIDM",
      batch: "2024 Batch",
      category: "Fresh Graduate",
      center: "Dwarka",
      quote:
        "College taught zero practical skills. At DIDM Dwarka, I built a niche affiliate blog from scratch that made revenue during my course. Zomato hired me directly from campus drive.",
      detailedStory:
        "Rohit joined DIDM right after B.Com. He was passionate about search algorithms. Under mentor guidance, he ranked his personal test sites on page 1 of Google using schema and technical audit methodologies. His live project portfolio blew away interviewers at Zomato.",
    },
    {
      id: "3",
      name: "Karan Singhal",
      role: "Founder & CEO",
      company: "Aura Home Living",
      course: "Professional",
      batch: "2023 Batch",
      category: "Business Owner",
      center: "Noida",
      quote:
        "I was paying ₹45,000 every month to an agency that gave zero sales. After DIDM, I took control of Meta ads myself and our direct-to-consumer store did ₹28 Lakhs in festive quarter.",
      detailedStory:
        "Karan ran a home décor manufacturing unit in Noida. Relying on middlemen agencies drained capital. Enrolling in DIDM's Professional program helped him understand Meta Conversions API, catalog feeds, and high-converting video angles. His ROAS improved from 1.2x to 4.1x.",
    },
    {
      id: "4",
      name: "Pooja Malhotra",
      role: "Digital Strategist & Consultant",
      company: "Independent (US & UK Clients)",
      package: "₹1.5L+ / month",
      course: "DMI Diploma",
      batch: "2024 Batch",
      category: "Freelancer",
      center: "Gurugram",
      quote:
        "The 1-year DMI Diploma covered international client acquisition and AI workflows. I now serve 4 retainer clients across London and New York while working from my home in Gurugram.",
      detailedStory:
        "Pooja wanted complete location independence. The DMI Diploma's Phase 5 (Strategist & Freelancer) trained her on Upwork enterprise profiles, proposal pitch decks, and automated client reporting. Today she runs an independent marketing practice with consistent foreign currency billing.",
    },
  ],

  faqs: [
    {
      q: "How much does the Master in Digital Marketing (MIDM) cost?",
      a: "The published tuition for the Master in Digital Marketing (MIDM) is ₹68,661 for one-time payment or ₹72,201 paid across 2 convenient instalments. This includes 500+ practical training hours, 50+ modules, 30+ certifications, live ad campaign budget, and 100% placement support.",
      category: "Fees & Payment",
    },
    {
      q: "Do you offer genuine placement assistance?",
      a: "Yes. DIDM has an active placement network of 650+ partner companies including top multinational agencies (Ogilvy, Dentsu, GroupM) and high-growth brands (Zomato, Swiggy, Paytm). We provide personalized resume crafting, extensive mock interviews, portfolio creation, and direct campus hiring drives until you are successfully placed.",
      category: "Placements",
    },
    {
      q: "Are the classes practical or theoretical?",
      a: "80% of your time at DIDM is spent hands-on. You will actively manage live advertising campaigns on Google Ads and Meta Ads with real budgets, build live WordPress sites, execute technical SEO audits with paid tools (Semrush, Ahrefs), and run AI marketing automations.",
      category: "Curriculum",
    },
    {
      q: "Can I attend demo classes before joining?",
      a: "Absolutely! We encourage every aspiring student to attend a free 1-on-1 counseling session and a live classroom demo session at any of our 13 physical centres or live online before finalizing enrollment.",
      category: "Admission",
    },
    {
      q: "What certifications will I receive?",
      a: "Upon course completion, you will receive DIDM's industry-recognized course completion diploma along with 30+ globally accredited certifications from Google, Meta Blueprint, HubSpot Academy, Semrush, and Microsoft Advertising.",
      category: "Certifications",
    },
  ],

  hiringPartners: [
    "Amazon",
    "Google Partner Agencies",
    "Dentsu Creative",
    "Ogilvy",
    "GroupM",
    "Zomato",
    "Swiggy",
    "Paytm",
    "MakeMyTrip",
    "Nykaa",
    "PolicyBazaar",
    "CarDekho",
    "Lenskart",
    "Times Internet",
  ],
};


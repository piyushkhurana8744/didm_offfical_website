"use client";

import { useEnquirySubmission, EnquiryFeedback } from "@/components/creative/EnquirySubmission";
import { CourseHero } from "@/components/course/CourseHero";
import { ProgramSignature } from "@/components/creative/ProgramSignature";
import { getCourseBySlug } from "@/lib/content";
import { COURSE_DETAIL_MEDIA } from "@/data/didm-media";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Award,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Star,
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  ShieldCheck,
  Laptop,
  Building,
  Briefcase,
  Users,
  Check,
  Download,
  ChevronDown,
} from "lucide-react";
import { SITE_BRAND } from "@/lib/content";

export default function OnlineDigitalMarketingCoursePage() {
  const enquiry = useEnquirySubmission();
  const [activeModuleIdx, setActiveModuleIdx] = useState<number>(0);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    course: "Master Online Course",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => enquiry.submit(e, {name:formData.name, phone:formData.phone, email:formData.email, centreId:"online", courseId:"online"}, () => setFormSubmitted(true));

  const checkpoints = [
    "Search Engine Optimization (SEO)",
    "Social Media Marketing (SMM)",
    "Google Ads (Search, Display & Video PPC)",
    "Content & Inbound Marketing Strategy",
    "Google Analytics 4 (GA4) & Tag Manager",
    "Email Marketing & Drip Automations",
    "E-Commerce Growth & Marketplace Selling",
    "Affiliate Marketing & Commission Funnels",
    "Online Reputation Management (ORM)",
    "Mobile Marketing & App Store Optimization",
    "Video Marketing & YouTube Creator Growth",
    "Google AdSense & Blog Monetization",
    "Lead Generation & Landing Page Conversion",
    "Generative AI Marketing Workflows (ChatGPT/Canva)",
    "Live Agency Floor Capstone with Online Strikers",
  ];

  const modulesData = [
    {
      title: "Search Engine Optimization (SEO)",
      description:
        "Master On-Page, Off-Page, and Technical SEO. Rank websites on Google's first page with keyword research, crawl budget optimization, and backlink strategies.",
      topics: [
        "Keyword Research with SEMrush & Ahrefs",
        "Meta Tags, URL Architecture & Schema Markup",
        "Technical SEO, Robots.txt & XML Sitemaps",
        "Link Building & High Authority Guest Posting",
        "Google Search Console & Algorithm Updates",
      ],
    },
    {
      title: "Google Ads (PPC - Pay Per Click)",
      description:
        "Execute high-converting paid search, display, video, and shopping ad campaigns with real advertising budgets on Google Ads.",
      topics: [
        "Search Network, Quality Score & Ad Extensions",
        "Display Remarketing & Audience Targeting",
        "YouTube Video Advertising & Skippable Ads",
        "Google Shopping Ads & Merchant Center",
        "Conversion Tracking & Smart Bidding Strategies",
      ],
    },
    {
      title: "Social Media Marketing (SMM & Paid Meta Ads)",
      description:
        "Build brand engagement and scale lead generation funnels across Facebook, Instagram, LinkedIn, and X with data-driven paid advertising.",
      topics: [
        "Meta Ads Manager & Pixel Event Setup",
        "Custom Audiences & Lookalike Targeting",
        "Instagram Reels & Carousel Ad Strategies",
        "LinkedIn B2B Advertising & InMail Lead Gen",
        "Social Media Calendar & Copywriting Frameworks",
      ],
    },
    {
      title: "Google Analytics 4 (GA4) & Tag Manager",
      description:
        "Measure user behavior, track multi-channel funnels, and make data-backed growth decisions using modern analytics tools.",
      topics: [
        "GA4 Property Setup & Data Streams",
        "Event Tracking & Custom Conversions",
        "Google Tag Manager (GTM) Container Management",
        "E-Commerce Purchase Funnel Analysis",
        "Looker Studio Interactive Dashboard Building",
      ],
    },
    {
      title: "Email Marketing & Inbound Automations",
      description:
        "Design responsive newsletters, build subscriber lists, and automate customer journeys using industry-standard email marketing platforms.",
      topics: [
        "Mailchimp & ActiveCampaign Setup",
        "Lead Magnet Creation & Opt-in Funnels",
        "Drip Campaigns & Behavioral Trigger Sequences",
        "Email Deliverability & Spam Filter Prevention",
        "A/B Testing Subject Lines & Open Rate Optimization",
      ],
    },
    {
      title: "Online Reputation Management (ORM)",
      description:
        "Protect and elevate corporate and personal brand reputation against negative reviews, press crises, and unfair competitor slander.",
      topics: [
        "Sentiment Analysis & Brand Mentions Tracking",
        "Crisis Communication & Review Response Frameworks",
        "Suppression of Negative Google Search Results",
        "Customer Review Collection Strategies",
        "Corporate Brand Building Best Practices",
      ],
    },
    {
      title: "Affiliate Marketing & Google AdSense",
      description:
        "Monetize websites, blogs, and content channels with performance affiliate networks and Google AdSense revenue sharing.",
      topics: [
        "Top Affiliate Networks (Amazon, ClickBank, CJ)",
        "Niche Selection & Micro-Blog Creation",
        "Commission-Based Lead Generation",
        "Google AdSense Approval Requirements",
        "Passive Income Portfolio Diversification",
      ],
    },
  ];

  const upcomingBatches = [
    {
      type: "Weekday Evening Batch",
      hours: "130 Hrs Training, 10 Hrs Backup",
      startDate: "Starting Next Week",
      schedule: "Tuesday to Friday &bull; 08:30 PM &ndash; 10:00 PM",
      duration: "12 Weeks (3 Months)",
      fee: "INR 57,218/-*",
      instalmentFee: "INR 60,758/-*",
      mode: "100% Live Interactive Online",
    },
    {
      type: "Weekend Intensive Batch",
      hours: "130 Hrs Training, 15 Hrs Backup",
      startDate: "Starting This Saturday",
      schedule: "Saturday &amp; Sunday &bull; 11:00 AM &ndash; 02:00 PM",
      duration: "14 Weeks (3.5 Months)",
      fee: "INR 57,218/-*",
      instalmentFee: "INR 60,758/-*",
      mode: "100% Live Interactive Online",
    },
    {
      type: "Weekday Fast-Track (AIDM)",
      hours: "100 Hrs Training, 10 Hrs Backup",
      startDate: "Upcoming Monday",
      schedule: "Monday to Thursday &bull; 07:00 PM &ndash; 08:30 PM",
      duration: "10 Weeks (2.5 Months)",
      fee: "INR 45,418/-*",
      instalmentFee: "INR 48,958/-*",
      mode: "100% Live Interactive Online",
    },
  ];

  const onlineFaqs = [
    {
      q: "How are the online digital marketing classes conducted?",
      a: "Classes are 100% live and interactive over high-definition video with two-way audio. You can ask questions in real time, share your screen for live troubleshooting, and interact directly with senior industry faculty.",
    },
    {
      q: "What if I miss an online class? Will I get recordings?",
      a: "Yes! Every single live lecture is recorded and uploaded to your personal DIDM LMS portal to discuss your enquiry. You receive lifetime access to class recordings, presentation decks, and study e-notes.",
    },
    {
      q: "Do online students get the same placement support as classroom students?",
      a: "Absolutely. Our dedicated placement cell provides identical placement services to online students, including virtual campus interview drives with 450+ hiring partners, resume reviews, and portfolio prep.",
    },
    {
      q: "How will I work on practical live projects online?",
      a: "You will be provided live ad budget allocations, ad accounts, and WordPress portal hosting credentials. You execute live Google and Meta ad campaigns under the real-time screen-share guidance of your mentor.",
    },
    {
      q: "Can I attend a free demo session before making payment?",
      a: "Yes! You can attend a free live online demo class. Simply submit your contact details on this page or call our counselor at +91 88005 05151.",
    },
  ];

  return (
    <div className="creative-page bg-white dark:bg-[#0B0C10] text-[#222222] dark:text-[#EAEAEA] font-body selection:bg-[#b52828] selection:text-white">
      {/* ========================================================= */}
      {/* SECTION 01: HERO BANNER (ONLINE COURSE - GIRL WITH LAPTOP) */}
      {/* ========================================================= */}
      <CourseHero course={getCourseBySlug("online-digital-marketing-course")!} courseMedia={COURSE_DETAIL_MEDIA["online-digital-marketing-course"]}/>
      <div id="program-explorer"><ProgramSignature course={getCourseBySlug("online-digital-marketing-course")!}/></div>

      {/* ========================================================= */}
      {/* SECTION 03: 4 FEATURE CARDS (ONLINE TRAINING ADVANTAGES)   */}
      {/* ========================================================= */}
      <section className="py-12 bg-gray-50 dark:bg-[#111218] border-b border-gray-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-[#151622] border border-gray-200 dark:border-neutral-800 text-center space-y-3 shadow-sm hover:border-[#b52828]/50 transition">
              <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-950/50 text-[#b52828] flex items-center justify-center mx-auto">
                <Laptop className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold font-heading text-gray-900 dark:text-white">
                Live Interactive Online
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-body leading-relaxed">
                Two-way live audio-video classes with real-time doubt solving and mentor screen sharing.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#151622] border border-gray-200 dark:border-neutral-800 text-center space-y-3 shadow-sm hover:border-[#b52828]/50 transition">
              <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-950/50 text-[#b52828] flex items-center justify-center mx-auto">
                <Building className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold font-heading text-gray-900 dark:text-white">
                Virtual Agency Floor
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-body leading-relaxed">
                Execute campaigns on live client briefs with Online Strikers agency from your home.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#151622] border border-gray-200 dark:border-neutral-800 text-center space-y-3 shadow-sm hover:border-[#b52828]/50 transition">
              <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-950/50 text-[#b52828] flex items-center justify-center mx-auto">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold font-heading text-gray-900 dark:text-white">
                100% Placement Support
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-body leading-relaxed">
                Dedicated placement officer connecting online students with 450+ partner recruiters.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#151622] border border-gray-200 dark:border-neutral-800 text-center space-y-3 shadow-sm hover:border-[#b52828]/50 transition">
              <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-950/50 text-[#b52828] flex items-center justify-center mx-auto">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold font-heading text-gray-900 dark:text-white">
                Global Certifications
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-body leading-relaxed">
                Guided certification workshops for Google, Meta, HubSpot, and DIDM Diploma credentials.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 04: 15 KEY CHECKPOINTS GRID                       */}
      {/* ========================================================= */}
      <section className="py-12 sm:py-16 border-b border-gray-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-[#b52828] font-heading">
              Curriculum Scope
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-gray-900 dark:text-white mt-1">
              Skills You Will Master in Online Course
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {checkpoints.map((point, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white dark:bg-[#13141F] border border-gray-200 dark:border-neutral-800 flex items-center gap-3 shadow-2xs hover:border-[#b52828]/40 transition"
              >
                <div className="w-6 h-6 rounded-full bg-red-50 dark:bg-red-950/50 text-[#b52828] flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <span className="text-xs font-bold font-heading text-gray-800 dark:text-gray-200">
                  {point}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 05: DIGITAL MARKETING COURSE COMPARISON - ONLINE   */}
      {/* ========================================================= */}
      <section className="py-14 sm:py-20 bg-gray-50 dark:bg-[#111218] border-b border-gray-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#b52828] font-heading">
              Flexible Online Options
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-gray-900 dark:text-white">
              DIGITAL MARKETING COURSE COMPARISON &ndash; <span className="text-[#b52828]">ONLINE</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-body">
              Select the optimal online training track matching your career objectives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* Card 1: Online Advanced Course */}
            <div className="rounded-2xl bg-white dark:bg-[#151622] border border-gray-200 dark:border-neutral-800 overflow-hidden shadow-sm flex flex-col justify-between">
              <div>
                <div className="relative aspect-[16/7] w-full overflow-hidden bg-gray-100">
                  <Image
                    src="/images/didm/courses/didm online advanced course fees.webp"
                    alt="DIDM Online Advanced Course Fees"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <div className="text-center pb-3 border-b border-gray-100 dark:border-neutral-800">
                    <h3 className="text-lg font-bold font-heading text-gray-900 dark:text-white">
                      Online Advanced Course
                    </h3>
                    <div className="text-xs text-gray-500 font-mono mt-0.5">(Fast-Track Online)</div>
                    <div className="text-2xl font-extrabold font-heading text-[#b52828] mt-2">
                      INR 33,630/-*
                    </div>
                  </div>
                  <ul className="space-y-2.5 text-xs text-gray-600 dark:text-gray-300 font-body">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>100+ Live Training Hours</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>25+ Essential Modules</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>1-Month Virtual Project</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>27+ Digital Certifications</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="p-6 pt-0">
                <Link
                  href="/enquire"
                  className="w-full py-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-neutral-800 dark:text-white font-heading font-bold text-xs flex items-center justify-center gap-1 transition"
                >
                  <span>Select Advanced Online</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 2: Online Master Course (Featured) */}
            <div className="rounded-2xl bg-white dark:bg-[#151622] border-2 border-[#b52828] overflow-hidden shadow-xl flex flex-col justify-between relative scale-105 z-10">
              <div className="bg-[#b52828] text-white py-1 text-center text-[10px] font-heading font-bold uppercase tracking-wider">
                Most Popular &bull; Comprehensive
              </div>
              <div>
                <div className="relative aspect-[16/7] w-full overflow-hidden bg-gray-100">
                  <Image
                    src="/images/didm/courses/didm online master course fees.webp"
                    alt="DIDM Online Master Course Fees"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <div className="text-center pb-3 border-b border-gray-100 dark:border-neutral-800">
                    <h3 className="text-lg font-bold font-heading text-gray-900 dark:text-white">
                      Online Master in Digital Marketing
                    </h3>
                    <div className="text-xs text-gray-500 font-mono mt-0.5">(MIDM &bull; Flagship Virtual)</div>
                    <div className="text-2xl font-extrabold font-heading text-[#b52828] mt-2">
                      INR 57,230/-*
                    </div>
                  </div>
                  <ul className="space-y-2.5 text-xs text-gray-700 dark:text-gray-200 font-body">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>500+ Comprehensive Hours</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>52 Advanced Modules</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>2-Month Agency Internship</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>34+ Global Certifications</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="p-6 pt-0">
                <Link
                  href="/enquire"
                  className="w-full py-2.5 rounded-lg bg-[#b52828] hover:bg-red-800 text-white font-heading font-bold text-xs flex items-center justify-center gap-1 transition shadow-md"
                >
                  <span>Enroll in Online Master</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 3: Online Professional / Customized */}
            <div className="rounded-2xl bg-white dark:bg-[#151622] border border-gray-200 dark:border-neutral-800 overflow-hidden shadow-sm flex flex-col justify-between">
              <div>
                <div className="relative aspect-[16/7] w-full overflow-hidden bg-gray-100">
                  <Image
                    src="/images/didm/courses/didm online professional course fees.webp"
                    alt="DIDM Online Professional Course Fees"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <div className="text-center pb-3 border-b border-gray-100 dark:border-neutral-800">
                    <h3 className="text-lg font-bold font-heading text-gray-900 dark:text-white">
                      Online Customized Course
                    </h3>
                    <div className="text-xs text-gray-500 font-mono mt-0.5">(Customized Live Training)</div>
                    <div className="text-2xl font-extrabold font-heading text-[#b52828] mt-2">
                      INR 20,650/-*
                    </div>
                  </div>
                  <ul className="space-y-2.5 text-xs text-gray-600 dark:text-gray-300 font-body">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Custom Lab Hours</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Targeted Skill Modules</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>1-on-1 Online Mentoring</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Specialized Certifications</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="p-6 pt-0">
                <Link
                  href="/enquire"
                  className="w-full py-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-neutral-800 dark:text-white font-heading font-bold text-xs flex items-center justify-center gap-1 transition"
                >
                  <span>Select Customized Online</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 06: REASONS TO CHOOSE DIDM & INLINE FORM          */}
      {/* ========================================================= */}
      <section className="py-14 sm:py-20 border-b border-gray-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Why Join DIDM & Graphic */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#b52828] font-heading">
                  Pioneering Online Pedagogy
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-gray-900 dark:text-white">
                  Reasons To Choose <span className="text-[#b52828]">DIDM Online</span>
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-body leading-relaxed">
                  Join India&apos;s most promising digital marketing brand without relocating. Learn from seasoned agency directors from your laptop with live interactive classes and full placement support.
                </p>
              </div>

              {/* Graphic: Student Feedback */}
              <div className="relative aspect-[16/9] w-full max-w-lg rounded-2xl overflow-hidden border border-gray-200 dark:border-neutral-800 shadow-md bg-white">
                <Image
                  src="/images/didm/courses/Student Feedback.jpg"
                  alt="DIDM Student Feedback 4.9 Stars 7000+ Reviews"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain p-2"
                />
              </div>
            </div>

            {/* Right: Red Form (Take a free session today!!) */}
            <div className="lg:col-span-5 rounded-2xl bg-gradient-to-br from-red-800 via-[#b52828] to-red-900 text-white p-6 sm:p-8 shadow-xl space-y-4">
              <div className="text-center pb-2 border-b border-white/20">
                <h3 className="text-xl sm:text-2xl font-extrabold font-heading text-white">
                  Take a free session today!!
                </h3>
                <p className="text-xs text-red-100 font-body mt-1">
                  Attend a live virtual demo class with our lead trainers
                </p>
              </div>

              {formSubmitted ? (
                <div className="p-6 text-center space-y-2 bg-white/10 rounded-xl border border-white/20">
                  <CheckCircle2 className="w-8 h-8 text-yellow-300 mx-auto" />
                  <div className="text-sm font-bold text-white">Enquiry received</div>
                  <p className="text-xs text-red-100 font-body">
                    We will send the Zoom/Google Meet demo link to your WhatsApp and Email.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-red-100 font-semibold mb-1">Your Name *</label>
                    <input aria-label="Full name"
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>

                  <div>
                    <label className="block text-red-100 font-semibold mb-1">Phone Number *</label>
                    <input aria-label="Phone number"
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>

                  <div>
                    <label className="block text-red-100 font-semibold mb-1">Email Address *</label>
                    <input aria-label="Email address"
                      type="email"
                      required
                      placeholder="rahul@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>

                  <div>
                    <label className="block text-red-100 font-semibold mb-1">Preferred Program *</label>
                    <select aria-label="Program of interest"
                      value={formData.course}
                      onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    >
                      <option value="Master Online Course">Master in Digital Marketing (MIDM - 500+ Hrs)</option>
                      <option value="Advanced Online Course">Advanced in Digital Marketing (AIDM - 140+ Hrs)</option>
                      <option value="Customized Online Course">Customized Digital Marketing</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-heading font-extrabold text-xs rounded-md shadow-md transition"
                  >
                    Submit &amp; Attend Free Online Demo &rarr;
                  </button>
                <EnquiryFeedback error={enquiry.error} pending={enquiry.pending} consent={true} />
</form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 07: WHO CAN JOIN US? (4 AUDIENCE CARDS)           */}
      {/* ========================================================= */}
      <section className="py-12 bg-gray-50 dark:bg-[#111218] border-b border-gray-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-gray-900 dark:text-white">
              Who Can <span className="text-[#b52828]">Join Us?</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-body mt-1">
              Live online batches structured for learners from all over India and overseas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-[#151622] border border-gray-200 dark:border-neutral-800 space-y-2 shadow-sm">
              <div className="text-sm font-bold font-heading text-[#b52828]">01. Freshers</div>
              <h3 className="text-base font-bold font-heading text-gray-900 dark:text-white">College Students</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-body leading-relaxed">
                Upskill alongside your degree and enter the corporate world with verified agency credentials.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#151622] border border-gray-200 dark:border-neutral-800 space-y-2 shadow-sm">
              <div className="text-sm font-bold font-heading text-[#b52828]">02. Working Execs</div>
              <h3 className="text-base font-bold font-heading text-gray-900 dark:text-white">Career Changers</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-body leading-relaxed">
                Attend live evening or weekend batches without disrupting your current employment.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#151622] border border-gray-200 dark:border-neutral-800 space-y-2 shadow-sm">
              <div className="text-sm font-bold font-heading text-[#b52828]">03. Founders</div>
              <h3 className="text-base font-bold font-heading text-gray-900 dark:text-white">Entrepreneurs</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-body leading-relaxed">
                Learn to scale your business online, run performance marketing campaigns, and audit agency vendors.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#151622] border border-gray-200 dark:border-neutral-800 space-y-2 shadow-sm">
              <div className="text-sm font-bold font-heading text-[#b52828]">04. Remote Workers</div>
              <h3 className="text-base font-bold font-heading text-gray-900 dark:text-white">Freelancers</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-body leading-relaxed">
                Acquire international freelance clients, master remote project tools, and build freelance retainers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 08: ONLINE TRAINING COURSE MODULES                */}
      {/* ========================================================= */}
      <section id="modules" className="py-14 sm:py-20 border-b border-gray-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#b52828] font-heading">
              Practical Syllabus
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-gray-900 dark:text-white">
              Digital Marketing Training Course Module in Online
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-body">
              Click on each module to view deep-dive topics, practical exercises, and tools taught live.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Module List */}
            <div className="lg:col-span-5 space-y-2">
              {modulesData.map((m, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveModuleIdx(idx)}
                  className={`w-full text-left p-4 rounded-xl text-xs font-heading font-bold transition flex items-center justify-between border ${
                    activeModuleIdx === idx
                      ? "bg-[#b52828] text-white border-[#b52828] shadow-sm"
                      : "bg-white hover:bg-gray-50 text-gray-800 dark:bg-[#13141F] dark:text-neutral-200 border-gray-200 dark:border-neutral-800"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span className="font-mono text-[11px] opacity-75">
                      Module {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span>{m.title}</span>
                  </span>
                  <ArrowRight className={`w-3.5 h-3.5 transition-transform ${activeModuleIdx === idx ? "translate-x-1" : ""}`} />
                </button>
              ))}
            </div>

            {/* Right: Module Details Card */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-gray-50 dark:bg-[#13141F] border border-gray-200 dark:border-neutral-800 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-neutral-700">
                <span className="text-xs font-bold uppercase tracking-wider text-[#b52828] font-heading">
                  Module {String(activeModuleIdx + 1).padStart(2, "0")} Focus Area
                </span>
                <span className="text-xs text-gray-500 font-mono">100% Live Practical</span>
              </div>
              <h3 className="text-xl font-bold font-heading text-gray-900 dark:text-white">
                {modulesData[activeModuleIdx].title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-body leading-relaxed">
                {modulesData[activeModuleIdx].description}
              </p>

              <div className="space-y-2 pt-2">
                <div className="text-xs font-bold text-gray-900 dark:text-white font-heading">
                  Key Practical Learning Competencies:
                </div>
                <div className="space-y-2">
                  {modulesData[activeModuleIdx].topics.map((t, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 p-2.5 rounded-lg bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 text-xs text-gray-700 dark:text-gray-200 font-body"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 09: RED BANNER (STILL HAVE QUESTIONS? CALL)        */}
      {/* ========================================================= */}
      <section className="py-6 bg-gradient-to-r from-red-800 via-[#b52828] to-red-900 text-white text-center shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs sm:text-sm font-heading font-bold uppercase tracking-wider">
            GET 100% ASSURED PLACEMENT WITH TOP COMPANIES
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm font-heading">
            <span>Still have questions? Call</span>
            <a
              href="tel:7832080808"
              className="text-yellow-300 font-extrabold hover:underline flex items-center gap-1"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>@7832-08-0808</span>
            </a>
            <span>for instant answers</span>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 10: ONLINE COURSE FEES SUMMARY (3 CARDS)          */}
      {/* ========================================================= */}
      <section className="py-14 sm:py-20 bg-gray-50 dark:bg-[#111218] border-b border-gray-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#b52828] font-heading">
              Transparent Pricing
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-gray-900 dark:text-white">
              DIDM &ndash; <span className="text-[#b52828]">ONLINE</span> COURSE FEES
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-body">
              Affordable fee structure with flexible 2-installment and zero-cost EMI plans.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-[#151622] border border-gray-200 dark:border-neutral-800 text-center space-y-3 shadow-sm">
              <span className="px-3 py-1 rounded-full bg-red-50 text-[#b52828] text-xs font-heading font-bold uppercase">
                Advanced Course Fee
              </span>
              <div className="text-2xl font-extrabold font-heading text-gray-900 dark:text-white pt-2">
                Program Fee : Rs 45,418/-*
              </div>
              <div className="text-xs text-gray-500 font-body">
                In 2 Easy Instalments : <strong>Rs 48,958/-*</strong>
              </div>
              <Link
                href="/enquire"
                className="w-full py-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-neutral-800 dark:text-white font-heading font-bold text-xs flex items-center justify-center gap-1 transition mt-4"
              >
                <span>Enroll in Advanced Online</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#151622] border-2 border-[#b52828] text-center space-y-3 shadow-xl relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#b52828] text-white text-[10px] font-heading font-bold uppercase tracking-wider">
                Flagship Program
              </div>
              <span className="px-3 py-1 rounded-full bg-red-100 text-[#b52828] text-xs font-heading font-bold uppercase">
                Master Course Fee
              </span>
              <div className="text-2xl font-extrabold font-heading text-[#b52828] pt-2">
                Program Fee : Rs 57,218/-*
              </div>
              <div className="text-xs text-gray-500 font-body">
                In 2 Easy Instalments : <strong>Rs 60,758/-*</strong>
              </div>
              <Link
                href="/enquire"
                className="w-full py-2.5 rounded-lg bg-[#b52828] hover:bg-red-800 text-white font-heading font-bold text-xs flex items-center justify-center gap-1 transition shadow mt-4"
              >
                <span>Enroll in Master Online</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#151622] border border-gray-200 dark:border-neutral-800 text-center space-y-3 shadow-sm">
              <span className="px-3 py-1 rounded-full bg-red-50 text-[#b52828] text-xs font-heading font-bold uppercase">
                Professional Course Fee
              </span>
              <div className="text-2xl font-extrabold font-heading text-gray-900 dark:text-white pt-2">
                Program Fee : Rs 20,671/-*
              </div>
              <div className="text-xs text-gray-500 font-body">
                In 2 Easy Instalments : <strong>Rs 24,211/-*</strong>
              </div>
              <Link
                href="/enquire"
                className="w-full py-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-neutral-800 dark:text-white font-heading font-bold text-xs flex items-center justify-center gap-1 transition mt-4"
              >
                <span>Enroll in Professional Online</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 11: ONLINE UPCOMING BATCHES TABLE                  */}
      {/* ========================================================= */}
      <section className="py-14 sm:py-20 border-b border-gray-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#b52828] font-heading">
              Live Interactive Slots
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-gray-900 dark:text-white">
              Online Upcoming Batches Details
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-body">
              Select your convenient batch time and secure your seat before the batch fills up.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-neutral-800 shadow-sm bg-white dark:bg-[#13141F]">
            <table className="w-full text-left text-xs font-body">
              <thead className="bg-gray-100 dark:bg-neutral-800 font-heading font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-neutral-700">
                <tr>
                  <th className="p-4">BATCH</th>
                  <th className="p-4">TRAINING HOURS</th>
                  <th className="p-4">SCHEDULE &amp; TIMINGS</th>
                  <th className="p-4">DURATION</th>
                  <th className="p-4">FEES</th>
                  <th className="p-4 text-center">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-neutral-800">
                {upcomingBatches.map((b, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 dark:hover:bg-neutral-800/40 transition">
                    <td className="p-4 font-bold font-heading text-gray-900 dark:text-white">
                      <div>{b.type}</div>
                      <div className="text-[10px] text-emerald-600 font-mono mt-0.5">{b.mode}</div>
                    </td>
                    <td className="p-4 text-gray-600 dark:text-gray-300">
                      {b.hours}
                    </td>
                    <td className="p-4 text-gray-800 dark:text-gray-200 font-medium">
                      <div className="text-xs" dangerouslySetInnerHTML={{ __html: b.schedule }} />
                    </td>
                    <td className="p-4 text-gray-600 dark:text-gray-300 font-mono">
                      {b.duration}
                    </td>
                    <td className="p-4 text-gray-900 dark:text-white">
                      <div className="font-bold text-[#b52828]">{b.fee}</div>
                      <div className="text-[11px] text-gray-500 font-body">2 Instalments: {b.instalmentFee}</div>
                    </td>
                    <td className="p-4 text-center space-y-1.5">
                      <Link
                        href="/enquire"
                        className="inline-block px-4 py-2 bg-[#b52828] hover:bg-red-800 text-white font-heading font-bold text-[11px] rounded-md transition shadow-2xs"
                      >
                        Book Seat
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 12: ONLINE COURSE FAQS                            */}
      {/* ========================================================= */}
      <section className="py-14 sm:py-20 border-b border-gray-200 dark:border-neutral-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#b52828] font-heading">
              Frequently Asked
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-gray-900 dark:text-white">
              Online Training FAQs
            </h2>
          </div>

          <div className="space-y-3">
            {onlineFaqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-[#13141F] overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaqIdx(openFaqIdx === idx ? null : idx)}
                  className="w-full text-left p-4.5 flex items-center justify-between gap-4 font-heading font-bold text-xs sm:text-sm text-gray-900 dark:text-white hover:text-[#b52828] transition"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 transition-transform ${openFaqIdx === idx ? "rotate-180 text-[#b52828]" : "text-gray-400"}`}
                  />
                </button>
                {openFaqIdx === idx && (
                  <div className="px-4.5 pb-4.5 pt-0 text-xs text-gray-600 dark:text-gray-300 font-body leading-relaxed border-t border-gray-100 dark:border-neutral-800/60 mt-1">
                    <p className="pt-3">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 13: BOTTOM CTA BANNER                             */}
      {/* ========================================================= */}
      <section className="py-14 bg-gradient-to-br from-neutral-900 via-neutral-900 to-black text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red text-white text-xs font-heading font-bold uppercase tracking-wider">
            <span>Learn From Anywhere</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-white">
            Ready to Master Digital Marketing Online?
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 font-body leading-relaxed max-w-xl mx-auto">
            Experience our interactive live classroom pedagogy. Book a free online session with our lead faculty today.
          </p>
          <div className="pt-2 flex flex-wrap justify-center items-center gap-3">
            <Link
              href="/enquire"
              className="px-6 py-3 bg-[#b52828] hover:bg-red-800 text-white font-heading font-bold text-xs rounded-md shadow-md transition-all hover:scale-105"
            >
              Book Free Online Demo &rarr;
            </Link>
            <a
              href="tel:+918800505151"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-heading font-bold text-xs rounded-md border border-white/20 transition flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-[#b52828]" />
              <span>Helpline: 88005 05151</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}


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
  Award,
  ChevronDown,
  Building,
  GraduationCap,
  Users,
  Download,
  Briefcase,
  Play,
  Layers,
  Laptop,
  Check,
} from "lucide-react";
import { SITE_BRAND } from "@/lib/content";

export default function AdvancedDigitalMarketingCoursePage() {
  const enquiry = useEnquirySubmission();
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [activeModuleIdx, setActiveModuleIdx] = useState<number>(0);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  // Form states
  const [topFormData, setTopFormData] = useState({
    name: "",
    email: "",
    phone: "",
    centre: "Satya Niketan",
  });
  const [topFormSubmitted, setTopFormSubmitted] = useState(false);

  const [bottomFormData, setBottomFormData] = useState({
    name: "",
    email: "",
    phone: "",
    centre: "Satya Niketan",
  });
  const [bottomFormSubmitted, setBottomFormSubmitted] = useState(false);

  const handleTopFormSubmit = (e: React.FormEvent<HTMLFormElement>) => enquiry.submit(e, {name:topFormData.name, phone:topFormData.phone, email:topFormData.email, centreId:topFormData.centre, courseId:"advanced"}, () => setTopFormSubmitted(true));

  const handleBottomFormSubmit = (e: React.FormEvent<HTMLFormElement>) => enquiry.submit(e, {name:bottomFormData.name, phone:bottomFormData.phone, email:bottomFormData.email, centreId:bottomFormData.centre, courseId:"advanced"}, () => setBottomFormSubmitted(true));

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "modules", label: "Core Modules" },
    { id: "duration", label: "Program Duration" },
    { id: "projects", label: "Live Projects" },
    { id: "certifications", label: "Certifications" },
    { id: "placement", label: "Placement Cell" },
  ];

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

  const faqs = [
    {
      q: "I don’t have a website or a blog. How will I gain hands-on experience?",
      a: "You need not have a website or blog before joining. Our digital marketing course includes a dedicated module where we teach you how to create a live website or blog using WordPress. You will implement all course learnings practically on your own live portal.",
    },
    {
      q: "Who can join our digital marketing course?",
      a: "Anyone who has basic computer literacy and knows how to use the internet can learn digital marketing. Our students include college freshers, working professionals, entrepreneurs, and freelancers.",
    },
    {
      q: "Do you provide Internship training for this course?",
      a: "Yes! The Advanced Digital Marketing Course includes project-based practical agency internship training with live client campaigns through Online Strikers Digital Agency.",
    },
    {
      q: "What kind of practical experience will I get during the training?",
      a: "We don’t believe in teaching only theoretical slides. At DIDM, you will execute real Google Ads and Meta campaigns with actual budgets, set up analytics trackers, perform live SEO audits, and complete hands-on practical assignments.",
    },
    {
      q: "How many modules do you cover in this program?",
      a: "The Advanced Digital Marketing Course covers 25+ comprehensive core modules spanning search, paid media, analytics, social, content, and Gen AI marketing workflows.",
    },
    {
      q: "What is the duration of the course?",
      a: "The Advanced program runs for 2.5 to 3 months with intensive classroom sessions (available in weekday morning, weekday evening, or weekend batches).",
    },
    {
      q: "Is Digital Marketing a good career choice in 2026?",
      a: "Digital Marketing is one of the highest-demand skills worldwide. Every brand, startup, and enterprise requires skilled digital media managers, performance marketers, and SEO architects. Average fresher starting salaries range from 3.5 to 6.5 LPA with rapid career progression.",
    },
    {
      q: "Why should I join DIDM instead of another institute?",
      a: "Delhi Institute of Digital Marketing (DIDM) has trained over 61,500+ students over 10+ years. Awarded 'Most Promising Brand' by ASSOCHAM and rated 4.9/5 across 7,000+ Google Reviews. We have 14 physical campuses with modern labs and 100% placement support.",
    },
    {
      q: "Can I pay the program fee in installments (EMI)?",
      a: "Yes, flexible easy EMI options and 2-installment payment plans are available. Talk to our admission counselors for current scholarship offers.",
    },
    {
      q: "When will I get course materials and Google certifications?",
      a: "You receive LMS portal access and study e-notes from day one. Upon module completion, our trainers conduct guided certification exam workshops in class, helping you earn 27+ recognized credentials from Google, Meta, and DIDM.",
    },
  ];

  return (
    <div className="creative-page bg-white dark:bg-[#0B0C10] text-[#222222] dark:text-[#EAEAEA] font-body selection:bg-[#b52828] selection:text-white">
      {/* ========================================================= */}
      {/* SECTION 01: HERO BANNER (AI-POWERED ADVANCED COURSE)       */}
      {/* ========================================================= */}
      <CourseHero course={getCourseBySlug("advanced-digital-marketing-course")!} courseMedia={COURSE_DETAIL_MEDIA["advanced-digital-marketing-course"]}/>
      <div id="program-explorer"><ProgramSignature course={getCourseBySlug("advanced-digital-marketing-course")!}/></div>

      {/* ========================================================= */}
      {/* SECTION 03: PROGRAM HIGHLIGHTS WITH TABS & INLINE FORM     */}
      {/* ========================================================= */}
      <section className="py-12 sm:py-16 border-b border-gray-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-gray-900 dark:text-white">
              Program <span className="text-[#b52828]">Highlights</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-body mt-1">
              Engineered for swift job-readiness, agency confidence, and measurable ROI.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Vertical Tab Buttons */}
            <div className="lg:col-span-3 space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-xs font-heading font-bold transition flex items-center justify-between ${
                    activeTab === tab.id
                      ? "bg-[#b52828] text-white shadow-sm"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-neutral-800 dark:text-neutral-300"
                  }`}
                >
                  <span>{tab.label}</span>
                  <ArrowRight className={`w-3.5 h-3.5 transition-transform ${activeTab === tab.id ? "translate-x-1" : ""}`} />
                </button>
              ))}
            </div>

            {/* Center: Dynamic Tab Content */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-gray-50 dark:bg-[#13141F] border border-gray-200 dark:border-neutral-800 space-y-4">
              {activeTab === "overview" && (
                <div className="space-y-3">
                  <h3 className="text-lg font-bold font-heading text-gray-900 dark:text-white">
                    Fast-Track Career Acceleration Program
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300 font-body leading-relaxed">
                    The Advanced Digital Marketing Course is a specialized 2.5-month curriculum created for individuals who want to build a rewarding career in digital media in minimum time.
                  </p>
                  <ul className="space-y-2 text-xs text-gray-700 dark:text-gray-300 font-body">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>140+ Practical Learning &amp; Lab Hours</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>25+ In-Depth Modules Covering All Channels</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Live Ad Budget Allocations on Meta &amp; Google</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Agency Project Work with Online Strikers</span>
                    </li>
                  </ul>
                </div>
              )}

              {activeTab === "modules" && (
                <div className="space-y-3">
                  <h3 className="text-lg font-bold font-heading text-gray-900 dark:text-white">
                    25+ High-Demand Industry Modules
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300 font-body">
                    Comprehensive coverage of search engine algorithms, programmatic ads, social marketing funnels, and generative AI content workflows.
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-700 dark:text-gray-300 font-body pt-2">
                    <span className="p-2 rounded bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700">&bull; Advanced SEO Audit</span>
                    <span className="p-2 rounded bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700">&bull; Google Ads PPC</span>
                    <span className="p-2 rounded bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700">&bull; Meta Ads Manager</span>
                    <span className="p-2 rounded bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700">&bull; GA4 Analytics</span>
                    <span className="p-2 rounded bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700">&bull; Email Automation</span>
                    <span className="p-2 rounded bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700">&bull; Gen AI Workflows</span>
                  </div>
                </div>
              )}

              {activeTab === "duration" && (
                <div className="space-y-3">
                  <h3 className="text-lg font-bold font-heading text-gray-900 dark:text-white">
                    Flexible Batch Schedules
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300 font-body">
                    Designed to fit college students, working professionals, and business owners across all 14 physical branches or live online.
                  </p>
                  <div className="space-y-2 pt-2 text-xs">
                    <div className="p-3 rounded-lg bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 flex justify-between">
                      <span className="font-bold">Weekday Batches</span>
                      <span className="text-gray-500">Mon &ndash; Fri (2 Hours/Day)</span>
                    </div>
                    <div className="p-3 rounded-lg bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 flex justify-between">
                      <span className="font-bold">Weekend Batches</span>
                      <span className="text-gray-500">Sat &ndash; Sun (3.5 Hours/Day)</span>
                    </div>
                    <div className="p-3 rounded-lg bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 flex justify-between">
                      <span className="font-bold">Live Virtual Batch</span>
                      <span className="text-gray-500">Interactive Evening Slots</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "projects" && (
                <div className="space-y-3">
                  <h3 className="text-lg font-bold font-heading text-gray-900 dark:text-white">
                    Live Agency Projects &amp; Spends
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300 font-body">
                    You do not learn from hypothetical dummy data. You work directly inside active ad accounts with real ad spends and agency deliverables.
                  </p>
                  <ul className="space-y-2 text-xs text-gray-700 dark:text-gray-300 font-body">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Live E-Commerce Sales Funnel Project</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Local Business Lead Generation Campaign</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Technical SEO Audit &amp; Ranking Case Study</span>
                    </li>
                  </ul>
                </div>
              )}

              {activeTab === "certifications" && (
                <div className="space-y-3">
                  <h3 className="text-lg font-bold font-heading text-gray-900 dark:text-white">
                    27+ Globally Recognized Certifications
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300 font-body">
                    Validate your expertise with credentials respected by multinational employers and agencies across India and abroad.
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-700 dark:text-gray-300 font-body pt-2">
                    <span className="p-2 rounded bg-white dark:bg-neutral-800 border border-gray-200">&bull; Google Search Ads</span>
                    <span className="p-2 rounded bg-white dark:bg-neutral-800 border border-gray-200">&bull; Google Display Ads</span>
                    <span className="p-2 rounded bg-white dark:bg-neutral-800 border border-gray-200">&bull; Google Analytics GA4</span>
                    <span className="p-2 rounded bg-white dark:bg-neutral-800 border border-gray-200">&bull; Meta Certified Associate</span>
                    <span className="p-2 rounded bg-white dark:bg-neutral-800 border border-gray-200">&bull; HubSpot Inbound</span>
                    <span className="p-2 rounded bg-white dark:bg-neutral-800 border border-gray-200">&bull; DIDM Course Diploma</span>
                  </div>
                </div>
              )}

              {activeTab === "placement" && (
                <div className="space-y-3">
                  <h3 className="text-lg font-bold font-heading text-gray-900 dark:text-white">
                    100% Dedicated Placement Cell
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300 font-body">
                    Our placement team conducts resume workshops, LinkedIn branding, mock interviews, and direct placement drives with 450+ corporate partners.
                  </p>
                  <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-xs text-emerald-800 dark:text-emerald-300 font-body">
                    <strong>Placement Record:</strong> Over 61,500+ successful alumni placed across top agencies and multinational corporations.
                  </div>
                </div>
              )}
            </div>

            {/* Right: Inline Lead Capture Card */}
            <div className="lg:col-span-4 rounded-2xl bg-white dark:bg-[#13141F] border-2 border-[#b52828] p-5 shadow-lg space-y-4">
              <div className="text-center pb-2 border-b border-gray-100 dark:border-neutral-800">
                <span className="px-3 py-1 rounded-full bg-red-100 dark:bg-red-950/60 text-[#b52828] text-[11px] font-heading font-bold uppercase tracking-wider">
                  Limited Batch Seats
                </span>
                <h3 className="text-lg font-extrabold font-heading text-gray-900 dark:text-white mt-1">
                  Attend FREE Workshop
                </h3>
                <p className="text-[11px] text-gray-500 font-body">
                  Experience a live mentoring class before enrolling
                </p>
              </div>

              {topFormSubmitted ? (
                <div className="p-6 text-center space-y-2 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <div className="text-sm font-bold text-emerald-800 dark:text-emerald-300">
                    Enquiry received
                  </div>
                  <p className="text-xs text-emerald-700 dark:text-emerald-400 font-body">
                    Our senior counselor will call you to discuss your enquiry to share demo class details.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleTopFormSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">
                      Full Name *
                    </label>
                    <input aria-label="Full name"
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={topFormData.name}
                      onChange={(e) => setTopFormData({ ...topFormData, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white focus:outline-none focus:border-[#b52828]"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">
                      Phone Number *
                    </label>
                    <input aria-label="Phone number"
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={topFormData.phone}
                      onChange={(e) => setTopFormData({ ...topFormData, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white focus:outline-none focus:border-[#b52828]"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">
                      Email Address *
                    </label>
                    <input aria-label="Email address"
                      type="email"
                      required
                      placeholder="rahul@example.com"
                      value={topFormData.email}
                      onChange={(e) => setTopFormData({ ...topFormData, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white focus:outline-none focus:border-[#b52828]"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">
                      Select Nearest Campus *
                    </label>
                    <select aria-label="Preferred training centre"
                      value={topFormData.centre}
                      onChange={(e) => setTopFormData({ ...topFormData, centre: e.target.value })}
                      className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white focus:outline-none focus:border-[#b52828]"
                    >
                      <option value="Satya Niketan">Satya Niketan (HQ South Delhi)</option>
                      <option value="Noida">Noida Sector 62</option>
                      <option value="Dwarka">Dwarka Sector 7</option>
                      <option value="Kalkaji">Kalkaji / Nehru Place</option>
                      <option value="Pitampura">Pitampura (NSP)</option>
                      <option value="Preet Vihar">Preet Vihar (East Delhi)</option>
                      <option value="Gurgaon">Gurgaon Sector 14</option>
                      <option value="Dehradun">Dehradun</option>
                      <option value="Mumbai">Mumbai Andheri</option>
                      <option value="Online">Online Interactive Live Campus</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#b52828] hover:bg-red-800 text-white font-heading font-bold text-xs rounded-md shadow transition"
                  >
                    Book Free Workshop Seat &rarr;
                  </button>
                <EnquiryFeedback error={enquiry.error} pending={enquiry.pending} consent={true} />
</form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 04: 4 FEATURE CARDS (ADVANCED IN DIGITAL MARKETING) */}
      {/* ========================================================= */}
      <section className="py-12 bg-gray-50 dark:bg-[#111218] border-b border-gray-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-gray-900 dark:text-white">
              Advanced In <span className="text-[#b52828]">Digital Marketing</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-body mt-1">
              Four fundamental pillars that distinguish DIDM&apos;s training pedagogy.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-[#151622] border border-gray-200 dark:border-neutral-800 text-center space-y-3 shadow-sm hover:border-[#b52828]/50 transition">
              <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-950/50 text-[#b52828] flex items-center justify-center mx-auto">
                <Laptop className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold font-heading text-gray-900 dark:text-white">
                Practical Live Training
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-body leading-relaxed">
                Hands-on campaign execution on real digital advertising channels with active budgets.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#151622] border border-gray-200 dark:border-neutral-800 text-center space-y-3 shadow-sm hover:border-[#b52828]/50 transition">
              <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-950/50 text-[#b52828] flex items-center justify-center mx-auto">
                <Building className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold font-heading text-gray-900 dark:text-white">
                Agency Floor Experience
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-body leading-relaxed">
                Work directly on live client briefs with Online Strikers full-service digital agency.
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
                Dedicated corporate recruitment cell with unlimited interview opportunities.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#151622] border border-gray-200 dark:border-neutral-800 text-center space-y-3 shadow-sm hover:border-[#b52828]/50 transition">
              <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-950/50 text-[#b52828] flex items-center justify-center mx-auto">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold font-heading text-gray-900 dark:text-white">
                Recognized Certifications
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-body leading-relaxed">
                27+ industry credentials including Google, Meta, HubSpot, and DIDM Diploma.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 05: 15 KEY CHECKPOINTS GRID                       */}
      {/* ========================================================= */}
      <section className="py-12 sm:py-16 border-b border-gray-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-[#b52828] font-heading">
              Syllabus Checkpoints
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-gray-900 dark:text-white mt-1">
              Core Skills Covered in Advanced Program
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
      {/* SECTION 06: DIGITAL MARKETING COURSE COMPARISON (3 CARDS)  */}
      {/* ========================================================= */}
      <section className="py-14 sm:py-20 bg-gray-50 dark:bg-[#111218] border-b border-gray-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#b52828] font-heading">
              Curriculum Comparison
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-gray-900 dark:text-white">
              Digital Marketing Course Comparison
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-body">
              Compare our programs to choose the perfect path for your career goals and timeline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* Card 1: Master Course (MIDM) */}
            <div className="rounded-2xl bg-white dark:bg-[#151622] border border-gray-200 dark:border-neutral-800 overflow-hidden shadow-sm flex flex-col justify-between">
              <div>
                <div className="relative aspect-[16/7] w-full overflow-hidden bg-gray-100">
                  <Image
                    src="/images/didm/courses/Master Course Fees MIDM DIDM.webp"
                    alt="Master in Digital Marketing Course (MIDM)"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <div className="text-center pb-3 border-b border-gray-100 dark:border-neutral-800">
                    <h3 className="text-lg font-bold font-heading text-gray-900 dark:text-white">
                      Master in Digital Marketing
                    </h3>
                    <div className="text-xs text-gray-500 font-mono mt-0.5">(MIDM &bull; Flagship)</div>
                    <div className="text-2xl font-extrabold font-heading text-[#b52828] mt-2">
                      INR 58,410/-*
                    </div>
                  </div>
                  <ul className="space-y-2.5 text-xs text-gray-600 dark:text-gray-300 font-body">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>500+ Practical Training Hours</span>
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
                  href="/programs/master-in-digital-marketing-course"
                  className="w-full py-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-neutral-800 dark:text-white font-heading font-bold text-xs flex items-center justify-center gap-1 transition"
                >
                  <span>Explore MIDM Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 2: Advanced Course (AIDM - Featured) */}
            <div className="rounded-2xl bg-white dark:bg-[#151622] border-2 border-[#b52828] overflow-hidden shadow-xl flex flex-col justify-between relative scale-105 z-10">
              <div className="bg-[#b52828] text-white py-1 text-center text-[10px] font-heading font-bold uppercase tracking-wider">
                Current Program &bull; Most Popular
              </div>
              <div>
                <div className="relative aspect-[16/7] w-full overflow-hidden bg-gray-100">
                  <Image
                    src="/images/didm/courses/Advanced Course Fees AIMTP DIDM.webp"
                    alt="Advanced in Digital Marketing Course (AIDM)"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <div className="text-center pb-3 border-b border-gray-100 dark:border-neutral-800">
                    <h3 className="text-lg font-bold font-heading text-gray-900 dark:text-white">
                      Advanced in Digital Marketing
                    </h3>
                    <div className="text-xs text-gray-500 font-mono mt-0.5">(AIMTP &bull; Fast-Track)</div>
                    <div className="text-2xl font-extrabold font-heading text-[#b52828] mt-2">
                      INR 52,250/-*
                    </div>
                  </div>
                  <ul className="space-y-2.5 text-xs text-gray-700 dark:text-gray-200 font-body">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>140+ Practical Hours</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>25+ Core Marketing Modules</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>1-Month Project Internship</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>27+ Industry Certifications</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="p-6 pt-0">
                <Link
                  href="/enquire"
                  className="w-full py-2.5 rounded-lg bg-[#b52828] hover:bg-red-800 text-white font-heading font-bold text-xs flex items-center justify-center gap-1 transition shadow-md"
                >
                  <span>Enroll in Advanced Course</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 3: Customized / Professional */}
            <div className="rounded-2xl bg-white dark:bg-[#151622] border border-gray-200 dark:border-neutral-800 overflow-hidden shadow-sm flex flex-col justify-between">
              <div>
                <div className="relative aspect-[16/7] w-full overflow-hidden bg-gray-100">
                  <Image
                    src="/images/didm/courses/Professional Course Fees Customized DIDM.webp"
                    alt="Customized Digital Marketing Course"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <div className="text-center pb-3 border-b border-gray-100 dark:border-neutral-800">
                    <h3 className="text-lg font-bold font-heading text-gray-900 dark:text-white">
                      Customized Digital Marketing
                    </h3>
                    <div className="text-xs text-gray-500 font-mono mt-0.5">(Skill-Specific)</div>
                    <div className="text-2xl font-extrabold font-heading text-[#b52828] mt-2">
                      INR 22,125/-*
                    </div>
                  </div>
                  <ul className="space-y-2.5 text-xs text-gray-600 dark:text-gray-300 font-body">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Custom Lab Hours</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Select Tailored Modules</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Executive Mentoring</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Skill-Specific Certifications</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="p-6 pt-0">
                <Link
                  href="/programs/customized-digital-marketing-course"
                  className="w-full py-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-neutral-800 dark:text-white font-heading font-bold text-xs flex items-center justify-center gap-1 transition"
                >
                  <span>Explore Customized</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 07: REASONS TO CHOOSE DIDM & INLINE RED FORM      */}
      {/* ========================================================= */}
      <section className="py-14 sm:py-20 border-b border-gray-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Why Join DIDM & Student Feedback */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#b52828] font-heading">
                  Excellence in Digital Education
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-gray-900 dark:text-white">
                  Reasons To Choose <span className="text-[#b52828]">DIDM</span>
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-body leading-relaxed">
                  Founded in 2014, Delhi Institute of Digital Marketing has shaped over 61,500+ successful digital careers with genuine practical exposure and corporate placements.
                </p>
              </div>

              {/* Authentic Graphic: Student Feedback (4.9 Stars, 7000+ Google Reviews) */}
              <div className="relative aspect-[16/9] w-full max-w-lg rounded-2xl overflow-hidden border border-gray-200 dark:border-neutral-800 shadow-md bg-white">
                <Image
                  src="/images/didm/courses/Student Feedback.jpg"
                  alt="DIDM Student Feedback 4.9 Stars 7000+ Google Reviews"
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
                  Fill in your details to book a 1-on-1 demo with our senior trainers
                </p>
              </div>

              {bottomFormSubmitted ? (
                <div className="p-6 text-center space-y-2 bg-white/10 rounded-xl border border-white/20">
                  <CheckCircle2 className="w-8 h-8 text-yellow-300 mx-auto" />
                  <div className="text-sm font-bold text-white">Demo Class Requested!</div>
                  <p className="text-xs text-red-100 font-body">
                    We will call you shortly to confirm your preferred timing and branch.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBottomFormSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-red-100 font-semibold mb-1">Your Name *</label>
                    <input aria-label="Full name"
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={bottomFormData.name}
                      onChange={(e) => setBottomFormData({ ...bottomFormData, name: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>

                  <div>
                    <label className="block text-red-100 font-semibold mb-1">Phone Number *</label>
                    <input aria-label="Phone number"
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={bottomFormData.phone}
                      onChange={(e) => setBottomFormData({ ...bottomFormData, phone: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>

                  <div>
                    <label className="block text-red-100 font-semibold mb-1">Email Address *</label>
                    <input aria-label="Email address"
                      type="email"
                      required
                      placeholder="rahul@example.com"
                      value={bottomFormData.email}
                      onChange={(e) => setBottomFormData({ ...bottomFormData, email: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>

                  <div>
                    <label className="block text-red-100 font-semibold mb-1">Select Nearest Branch *</label>
                    <select aria-label="Preferred training centre"
                      value={bottomFormData.centre}
                      onChange={(e) => setBottomFormData({ ...bottomFormData, centre: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    >
                      <option value="Satya Niketan">Satya Niketan HQ</option>
                      <option value="Noida">Noida Sector 62</option>
                      <option value="Dwarka">Dwarka Sector 7</option>
                      <option value="Kalkaji">Kalkaji</option>
                      <option value="Pitampura">Pitampura NSP</option>
                      <option value="Preet Vihar">Preet Vihar</option>
                      <option value="Gurgaon">Gurgaon</option>
                      <option value="Online">Online Campus</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-heading font-extrabold text-xs rounded-md shadow-md transition"
                  >
                    Submit &amp; Get Free Demo Access &rarr;
                  </button>
                <EnquiryFeedback error={enquiry.error} pending={enquiry.pending} consent={true} />
</form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 08: WHO CAN JOIN US? (4 AUDIENCE CARDS)           */}
      {/* ========================================================= */}
      <section className="py-12 bg-gray-50 dark:bg-[#111218] border-b border-gray-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-gray-900 dark:text-white">
              Who Can <span className="text-[#b52828]">Join Us?</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-body mt-1">
              Curriculum customized for diverse professional aspirations and backgrounds.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-[#151622] border border-gray-200 dark:border-neutral-800 space-y-2 shadow-sm">
              <div className="text-sm font-bold font-heading text-[#b52828]">01. Job Seekers</div>
              <h3 className="text-base font-bold font-heading text-gray-900 dark:text-white">College Freshers</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-body leading-relaxed">
                Build high-demand digital agency skills and land prominent placements right out of college.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#151622] border border-gray-200 dark:border-neutral-800 space-y-2 shadow-sm">
              <div className="text-sm font-bold font-heading text-[#b52828]">02. Professionals</div>
              <h3 className="text-base font-bold font-heading text-gray-900 dark:text-white">Career Switchers</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-body leading-relaxed">
                Transition into high-growth marketing analytics, PPC, or social media management roles.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#151622] border border-gray-200 dark:border-neutral-800 space-y-2 shadow-sm">
              <div className="text-sm font-bold font-heading text-[#b52828]">03. Founders</div>
              <h3 className="text-base font-bold font-heading text-gray-900 dark:text-white">Business Owners</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-body leading-relaxed">
                Eliminate agency dependency, cut ad waste, and generate direct revenue leads independently.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#151622] border border-gray-200 dark:border-neutral-800 space-y-2 shadow-sm">
              <div className="text-sm font-bold font-heading text-[#b52828]">04. Freelancers</div>
              <h3 className="text-base font-bold font-heading text-gray-900 dark:text-white">Consultants</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-body leading-relaxed">
                Work from anywhere, acquire international clients, and build high-ticket freelance retainers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 09: TRAINING COURSE MODULE (INTERACTIVE CURRICULUM)*/}
      {/* ========================================================= */}
      <section id="modules" className="py-14 sm:py-20 border-b border-gray-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#b52828] font-heading">
              Syllabus Architecture
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-gray-900 dark:text-white">
              Training Course Module
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-body">
              Click on each module to view deep-dive topics, practical exercises, and tools taught.
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
                <span className="text-xs text-gray-500 font-mono">100% Practical</span>
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
      {/* SECTION 10: OTHERS ADD-ON COURSE BENEFITS (6 CARDS)        */}
      {/* ========================================================= */}
      <section className="py-12 bg-gray-50 dark:bg-[#111218] border-b border-gray-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-gray-900 dark:text-white">
              Others add-on <span className="text-[#b52828]">Course Benefits</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-body mt-1">
              Included complimentary with every Advanced Digital Marketing Course enrollment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-white dark:bg-[#151622] border border-gray-200 dark:border-neutral-800 space-y-2 shadow-sm">
              <h3 className="text-base font-bold font-heading text-gray-900 dark:text-white">
                Placement Support
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-body leading-relaxed">
                Dedicated placement officer assisting with interview drives, salary negotiations, and agency openings.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#151622] border border-gray-200 dark:border-neutral-800 space-y-2 shadow-sm">
              <h3 className="text-base font-bold font-heading text-gray-900 dark:text-white">
                Career Counselling
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-body leading-relaxed">
                1-on-1 career mapping with senior marketing leaders to identify your specialized domain strength.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#151622] border border-gray-200 dark:border-neutral-800 space-y-2 shadow-sm">
              <h3 className="text-base font-bold font-heading text-gray-900 dark:text-white">
                Interview Preparation
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-body leading-relaxed">
                Mock technical interviews, agency portfolio creation, and case study defense workshops.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#151622] border border-gray-200 dark:border-neutral-800 space-y-2 shadow-sm">
              <h3 className="text-base font-bold font-heading text-gray-900 dark:text-white">
                Free Tools &amp; Software
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-body leading-relaxed">
                Access to premium SEO tools, ad intelligence suites, and hosting infrastructure worth Rs. 45,000/-.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#151622] border border-gray-200 dark:border-neutral-800 space-y-2 shadow-sm">
              <h3 className="text-base font-bold font-heading text-gray-900 dark:text-white">
                Led By Industry Experts
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-body leading-relaxed">
                Learn exclusively from practitioners with 8+ to 15+ years of live campaign management experience.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#151622] border border-gray-200 dark:border-neutral-800 space-y-2 shadow-sm">
              <h3 className="text-base font-bold font-heading text-gray-900 dark:text-white">
                Networking &amp; Community
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-body leading-relaxed">
                Lifelong access to DIDM Alumni portal, masterclasses, annual conclaves, and agency freelancer groups.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 11: AWARDS & ASSOCIATIONS                          */}
      {/* ========================================================= */}
      <section className="py-14 border-b border-gray-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-gray-900 dark:text-white">
              Award <span className="text-[#b52828]">|</span> Association
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-body mt-1">
              Recognized and affiliated with leading media houses, academic institutions, and industry bodies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Media Associates */}
            <div className="p-4 rounded-xl bg-white dark:bg-[#151622] border border-gray-200 dark:border-neutral-800 text-center space-y-2">
              <div className="text-xs font-bold text-gray-500 uppercase font-heading">Media Associates</div>
              <div className="relative h-14 w-full">
                <Image
                  src="/images/didm/courses/media partner(1).jpg"
                  alt="DIDM Media Associates"
                  fill
                  sizes="300px"
                  className="object-contain"
                />
              </div>
            </div>

            {/* Education Associates */}
            <div className="p-4 rounded-xl bg-white dark:bg-[#151622] border border-gray-200 dark:border-neutral-800 text-center space-y-2">
              <div className="text-xs font-bold text-gray-500 uppercase font-heading">Education Associates</div>
              <div className="relative h-14 w-full">
                <Image
                  src="/images/didm/courses/education partner logo.jpg"
                  alt="DIDM Education Associates"
                  fill
                  sizes="300px"
                  className="object-contain"
                />
              </div>
            </div>

            {/* Agency Associates */}
            <div className="p-4 rounded-xl bg-white dark:bg-[#151622] border border-gray-200 dark:border-neutral-800 text-center space-y-2">
              <div className="text-xs font-bold text-gray-500 uppercase font-heading">Agency Associates</div>
              <div className="relative h-14 w-full">
                <Image
                  src="/images/didm/courses/agency Logo.jpg"
                  alt="DIDM Agency Associates"
                  fill
                  sizes="300px"
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Assocham & Justdial Banner */}
          <div className="p-6 rounded-2xl bg-gray-50 dark:bg-[#12131A] border border-gray-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <h3 className="text-lg font-bold font-heading text-gray-900 dark:text-white">
                &ldquo;Most Promising Brand&rdquo; &amp; &ldquo;Reviews&rdquo; Awarded By
              </h3>
              <p className="text-xs text-gray-500 font-body">
                Honored by ASSOCHAM and Justdial for excellence in practical digital marketing education.
              </p>
            </div>
            <div className="relative h-14 w-64 shrink-0">
              <Image
                src="/images/didm/courses/assocham and justdial.jpg"
                alt="Awarded by Assocham and Justdial"
                fill
                sizes="260px"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 12: COMPANIES THAT LOVE OUR STUDENTS & COURSE FEE  */}
      {/* ========================================================= */}
      <section className="py-14 sm:py-20 bg-gray-50 dark:bg-[#111218] border-b border-gray-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Companies That Love Our Students */}
            <div className="lg:col-span-7 space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#b52828] font-heading">
                  100% Placement Record
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-gray-900 dark:text-white mt-1">
                  Companies That Love Our Students
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-body">
                  Our alumni are placed across top digital marketing agencies, unicorn startups, and Fortune 500 multinationals.
                </p>
              </div>

              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-gray-200 dark:border-neutral-800 bg-white p-4">
                <Image
                  src="/images/didm/courses/student-logo.jpg"
                  alt="Companies hiring DIDM Students"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain p-2"
                />
              </div>
            </div>

            {/* Right: Program Course Fee Card */}
            <div className="lg:col-span-5 rounded-2xl bg-white dark:bg-[#151622] border-2 border-[#b52828] p-6 shadow-xl space-y-4 text-center">
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-gray-100">
                <Image
                  src="/images/didm/courses/didm-course-fees.jpg"
                  alt="DIDM Course Fees Convocation"
                  fill
                  sizes="400px"
                  className="object-cover"
                />
              </div>

              <div className="space-y-1">
                <div className="text-xs font-bold uppercase text-gray-500 font-heading">
                  Program Course Fees :
                </div>
                <div className="text-3xl font-extrabold font-heading text-[#b52828]">
                  INR 52,250/-*
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 font-body pt-1">
                  In <span className="text-[#b52828] font-bold">2 Easy</span> Instalments: <strong>INR 55,755/-*</strong>
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <Link
                  href="/enquire"
                  className="w-full py-3 bg-[#b52828] hover:bg-red-800 text-white font-heading font-bold text-xs rounded-md shadow-md transition flex items-center justify-center gap-1.5"
                >
                  <span>Enquire For Scholarships &amp; EMI Plans</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <div className="text-[11px] text-gray-400 font-mono">
                  *Taxes applicable as per government norms
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 13: TESTIMONIAL QUOTES (LEARNERS SAY)             */}
      {/* ========================================================= */}
      <section className="py-14 border-b border-gray-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#b52828] font-heading">
              Student Testimonials
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-gray-900 dark:text-white">
              What Our Learners Have to Say....
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-[#13141F] border border-gray-200 dark:border-neutral-800 shadow-sm space-y-3">
              <div className="flex items-center gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-xs text-gray-700 dark:text-gray-300 font-body italic leading-relaxed">
                &ldquo;It was indeed an enriching experience to learn digital marketing from DIDM which has clearly made me a confident professional today.&rdquo;
              </p>
              <div className="pt-2 border-t border-gray-100 dark:border-neutral-800">
                <h4 className="text-sm font-bold font-heading text-gray-900 dark:text-white">Soumya Jay</h4>
                <div className="text-[11px] text-[#b52828]">Digital Marketing Executive</div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#13141F] border border-gray-200 dark:border-neutral-800 shadow-sm space-y-3">
              <div className="flex items-center gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-xs text-gray-700 dark:text-gray-300 font-body italic leading-relaxed">
                &ldquo;I have researched thoroughly across Delhi-NCR and I found out that DIDM is probably the best institute for practical exposure and placement support.&rdquo;
              </p>
              <div className="pt-2 border-t border-gray-100 dark:border-neutral-800">
                <h4 className="text-sm font-bold font-heading text-gray-900 dark:text-white">Nancy Sharma</h4>
                <div className="text-[11px] text-[#b52828]">Performance Marketer</div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#13141F] border border-gray-200 dark:border-neutral-800 shadow-sm space-y-3">
              <div className="flex items-center gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-xs text-gray-700 dark:text-gray-300 font-body italic leading-relaxed">
                &ldquo;The trainers are extremely patient and the 25+ modules cover every aspect from basic website design to live Meta ads. Highly recommended!&rdquo;
              </p>
              <div className="pt-2 border-t border-gray-100 dark:border-neutral-800">
                <h4 className="text-sm font-bold font-heading text-gray-900 dark:text-white">Sonam Aggarwal</h4>
                <div className="text-[11px] text-[#b52828]">SEO Specialist</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 14: DIDM HAPPY FACES (CONVOCATION GALLERY)         */}
      {/* ========================================================= */}
      <section className="py-14 sm:py-20 bg-gray-50 dark:bg-[#111218] border-b border-gray-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#b52828] font-heading">
              Graduation Moments
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-gray-900 dark:text-white">
              DIDM <span className="text-[#b52828]">HAPPY FACES</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-body">
              Celebrating batch closures, certification distribution ceremonies, and student milestones across Delhi NCR.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[6, 5, 4, 3, 2, 1, 10].map((num) => (
              <div
                key={num}
                className="relative aspect-[4/3] w-full rounded-xl overflow-hidden border border-gray-200 dark:border-neutral-800 bg-neutral-900 shadow-sm group"
              >
                <Image
                  src={`/images/didm/courses/DIDM_June_Batch_Closing_by-Mr-Siddhartha-sir-in_Preet-Vihar-${num}.jpg`}
                  alt={`DIDM Batch Closing Preet Vihar ${num}`}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
            <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden border border-gray-200 dark:border-neutral-800 bg-neutral-900 shadow-sm group">
              <Image
                src="/images/didm/courses/DIDM_June_Batch_Closing_by-Mr-Rakesh-sir-in_Satya-Niketan-9.jpg"
                alt="DIDM Batch Closing Satya Niketan"
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          <div className="text-center pt-2">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-1.5 text-xs font-bold font-heading text-[#b52828] hover:underline"
            >
              <span>Explore All 500+ Batch Convocation Photos</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 15: HIRING PARTNERS LOGO STRIP                    */}
      {/* ========================================================= */}
      <section className="py-12 border-b border-gray-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 font-heading">
              Our Trainees Work At
            </span>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#12131A] border border-gray-200 dark:border-neutral-800 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 items-center">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <div
                key={num}
                className="relative h-10 w-full flex items-center justify-center p-2 bg-white dark:bg-neutral-900 rounded-lg border border-gray-200/60 shadow-2xs"
              >
                <Image
                  src={`/images/didm/homepage/logo${num}.jpg`}
                  alt={`Hiring Partner ${num}`}
                  fill
                  sizes="120px"
                  className="object-contain p-1"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 16: FAQ ACCORDION (10+ AUTHENTIC COURSE FAQS)      */}
      {/* ========================================================= */}
      <section className="py-14 sm:py-20 border-b border-gray-200 dark:border-neutral-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#b52828] font-heading">
              Got Questions?
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-gray-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-body">
              Everything you need to know about course curriculum, eligibility, and placement process.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
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
      {/* SECTION 17: BOTTOM CTA BANNER                             */}
      {/* ========================================================= */}
      <section className="py-14 bg-gradient-to-br from-neutral-900 via-neutral-900 to-black text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red text-white text-xs font-heading font-bold uppercase tracking-wider">
            <span>Admissions Open for New Batches</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-white">
            Kickstart Your Digital Marketing Career Today
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 font-body leading-relaxed max-w-xl mx-auto">
            Book a free counseling session at any of our 14 physical centres across Delhi NCR, Mumbai, Dehradun, or join our live interactive online campus.
          </p>
          <div className="pt-2 flex flex-wrap justify-center items-center gap-3">
            <Link
              href="/enquire"
              className="px-6 py-3 bg-[#b52828] hover:bg-red-800 text-white font-heading font-bold text-xs rounded-md shadow-md transition-all hover:scale-105"
            >
              Enroll Now &bull; Book Free Demo &rarr;
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


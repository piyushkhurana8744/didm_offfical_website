"use client";

import { useEnquirySubmission, EnquiryFeedback } from "@/components/creative/EnquirySubmission";
import CENTRE_PHOTOS from "@/data/creative-centre-photos.json";
import { EditorialHero } from "@/components/creative/EditorialHero";
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
  MessageCircle,
  ExternalLink,
  Navigation,
} from "lucide-react";
import { Centre } from "@/types/content";
import { SITE_BRAND } from "@/lib/content";
import { MotionSection } from "@/components/motion/MotionSection";
import { MotionHeading } from "@/components/motion/MotionHeading";
import { StaggeredCardGrid } from "@/components/motion/StaggeredCardGrid";
import { SplitContentReveal } from "@/components/motion/SplitContentReveal";

interface CentreDetailViewProps {
  centre: Centre;
  allCentres: Centre[];
}

export function CentreDetailView({ centre, allCentres }: CentreDetailViewProps) {
  const enquiry = useEnquirySubmission();
  // State for Highlights tab
  const [activeHighlightTab, setActiveHighlightTab] = useState<string>("overview");
  // State for Course Modules tab
  const [activeModuleTab, setActiveModuleTab] = useState<number>(0);
  // State for FAQ accordion
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  // Forms
  const [heroForm, setHeroForm] = useState({
    name: "",
    email: "",
    phone: "",
    centre: centre.name,
  });
  const [heroSubmitted, setHeroSubmitted] = useState(false);

  const [workshopForm, setWorkshopForm] = useState({
    name: "",
    email: "",
    phone: "",
    centre: centre.name,
  });
  const [workshopSubmitted, setWorkshopSubmitted] = useState(false);

  const [counsellingForm, setCounsellingForm] = useState({
    name: "",
    email: "",
    phone: "",
    centre: centre.name,
  });
  const [counsellingSubmitted, setCounsellingSubmitted] = useState(false);

  const primaryPhone = centre.phones[0] || SITE_BRAND.phone;
  const cleanPhone = primaryPhone.replace(/[^0-9]/g, "");

  // Highlights tabs data
  const highlightsTabs = [
    {
      id: "overview",
      label: "Overview",
      title: `Digital Marketing Course Overview - ${centre.name}`,
      points: [
        "Most comprehensive digital marketing curriculum in Delhi NCR with 50+ modules",
        "100% practical, hands-on training directly on live project ad budgets",
        "Mentorship from Google and industry-certified expert faculty with 10+ years experience",
        "Dedicated placement cell offering 100% placement support with 450+ hiring partners",
        "Flexible batches available: Weekday morning, afternoon, evening, and weekend batches",
        "Hybrid learning advantage: Full access to classroom sessions and 24/7 online LMS portal",
      ],
    },
    {
      id: "core",
      label: "Core Modules",
      title: "Core Curriculum Pillars",
      points: [
        "Search Engine Optimization (SEO) & Google Search Console Masterclass",
        "Performance Marketing: Google Search, Display, Shopping, YouTube & PMax Ads",
        "Social Media Marketing: Meta Ads (Facebook & Instagram), LinkedIn, and Twitter Growth",
        "Content Marketing, Copywriting, AI Writing Assistants, and Inbound Funnels",
        "E-Commerce Growth: Shopify Store Setup, Amazon Seller, and Dropshipping",
        "Web Analytics: Google Analytics 4 (GA4), Google Tag Manager & Looker Studio Dashboards",
      ],
    },
    {
      id: "duration",
      label: "Duration",
      title: "Course Duration & Cohort Timelines",
      points: [
        "Master In Digital Marketing (MIDM): 500+ Hours comprehensive hybrid learning",
        "Weekday Cohorts: 3 to 4 Months (Monday to Friday, 2 hours daily + practical lab)",
        "Weekend Cohorts: 5 to 6 Months (Saturday & Sunday, 3 hours daily + lab)",
        "Self-Paced Portal: Lifetime access to recorded video library and weekly doubt clearings",
        "100+ Hours of mandatory live ad campaign assignments under senior trainer guidance",
      ],
    },
    {
      id: "projects",
      label: "Live Projects",
      title: "Practical Live Industry Projects",
      points: [
        "Live Google Search Ads Campaign: Run actual ads with live budget and measure ROI",
        "E-Commerce Store Setup: Build and launch a complete Shopify dropshipping store",
        "Live SEO Audit & Rank Optimization: Optimize live websites for target keywords",
        "Meta Ads Lead Generation Funnel: Generate verified leads for real business case studies",
        "Online Reputation Management (ORM): Manage live brand perception and crisis response",
      ],
    },
    {
      id: "certifications",
      label: "Certifications",
      title: "Globally Recognized Certifications",
      points: [
        "DIDM Diploma / Master in Digital Marketing Course Completion Certificate",
        "Google Ads Certifications (Search, Display, Video, Shopping, Measurement)",
        "Google Analytics Individual Qualification (GA4 GAIQ)",
        "HubSpot Inbound Marketing & Content Marketing Certifications",
        "Meta Certified Digital Marketing Associate Certification Guidance",
        "SEMrush SEO & Content Marketing Toolkit Certifications",
      ],
    },
    {
      id: "placement",
      label: "Placement Cell",
      title: "100% Placement Assistance Cell",
      points: [
        "Dedicated centralized placement cell coordinating exclusive hiring drives",
        "ATS-compliant professional resume rewriting and LinkedIn profile makeover",
        "Multiple 1-on-1 technical mock interview rounds with senior agency directors",
        "Over 450+ verified placement partners across India: MNCs, Agencies, and Unicorns",
        "Continuous interview scheduling until final successful job offer letter handover",
      ],
    },
  ];

  // Course modules tabs
  const modulesList = [
    {
      id: "email",
      name: "E-Mail Marketing",
      title: "Email Marketing Mastery",
      desc: "Email Marketing has emerged as the most effective marketing tool to reach a number of targeted audiences at the lowest cost. In this course, learn the techniques required to effectively interact and draft emails for the targeted audience, understand deliverability, copywriting, and segmentation.",
      objectives: [
        "Learn tactics to draw more traffic by generating brand awareness and get high visibility",
        "Understand effective tactics of email marketing and high deliverability setups",
        "Learn to build an email list and targeted automated drip campaigns",
        "Understanding the customer marketing lifecycle and conversion triggers",
        "Gain knowledge on generating a large subscriber base using ethical opt-in lead magnets",
        "Learn to use platforms like Mailchimp, GetResponse, and Sendinblue",
      ],
    },
    {
      id: "ppc",
      name: "Google AdWords / PPC",
      title: "PPC (Pay Per Click) & Google Ads",
      desc: "Pay-Per-Click (PPC) marketing is the modern advertising strategy used to target prospective audiences on Google Search and partner networks. Master search campaign architecture, bidding strategies, ad extensions, and ROI maximization.",
      objectives: [
        "Master Google Search Ads, Display Network, Video, and Shopping Ads",
        "Learn Quality Score optimization to reduce CPC and maximize ad rank",
        "Advanced keyword research: exact, phrase, broad match and negative keywords",
        "Conversion tracking setup using Google Tag Manager and GA4",
        "Remarketing campaigns to re-engage past website visitors",
        "A/B split testing of ad copy, headlines, and landing page URLs",
      ],
    },
    {
      id: "orm",
      name: "Online Reputation Management",
      title: "Online Reputation Management (ORM)",
      desc: "Protect and elevate brand reputation across review portals, social channels, and search engines. Learn how to manage negative reviews, cultivate positive user feedback, and execute brand crisis management.",
      objectives: [
        "Understand search engine reputation management and SERP suppression tactics",
        "Managing Google Business Profile reviews, Trustpilot, and mouthshut feedback",
        "Real-time brand listening tools: Google Alerts, Mention, and Brand24",
        "PR strategies for mitigating viral social media complaints",
        "Building authority assets and Wikipedia / Quora thought leadership",
      ],
    },
    {
      id: "affiliate",
      name: "Affiliate Marketing",
      title: "Affiliate Marketing & Passive Income",
      desc: "Learn how to build profitable affiliate web assets, partner with top global affiliate networks, and monetize high-intent organic and paid traffic streams with top commission rates.",
      objectives: [
        "Introduction to Amazon Associates, ClickBank, CJ Affiliate, and vCommission",
        "Choosing profitable affiliate niches with high commercial search intent",
        "Creating authoritative product review and comparison sites",
        "Affiliate link cloaking, tracking IDs, and FTC compliance disclosures",
        "Scaling affiliate earnings using paid search and email newsletters",
      ],
    },
    {
      id: "smm",
      name: "Social Media Marketing",
      title: "Social Media Marketing (SMM & SMO)",
      desc: "Dominate organic engagement and paid acquisition across Facebook, Instagram, LinkedIn, Twitter/X, and YouTube. Learn campaign creation, audience retargeting, and influencer outreach.",
      objectives: [
        "Mastering Meta Ads Manager for lead generation and e-commerce conversions",
        "Lookalike audiences, custom audiences, and Meta Conversions API (CAPI)",
        "LinkedIn B2B lead generation tactics and sponsored content formats",
        "Instagram organic growth, viral reels production, and carousel engagement",
        "Social media scheduling tools: Buffer, Hootsuite, and Meta Business Suite",
      ],
    },
    {
      id: "seo",
      name: "Search Engine Optimization",
      title: "Search Engine Optimization (SEO)",
      desc: "Comprehensive On-page, Off-page, and Technical SEO training. Rank websites on the 1st page of Google search results for competitive commercial queries.",
      objectives: [
        "Keyword research utilizing Semrush, Moz, Ahrefs, and Google Keyword Planner",
        "On-page optimization: Title tags, meta descriptions, H1-H6, and schema markup",
        "Technical SEO: Core Web Vitals, XML sitemaps, robots.txt, and canonical tags",
        "White-hat link building: Guest posting, broken link recovery, and digital PR",
        "Local SEO to rank in Google Maps 3-Pack for local businesses",
      ],
    },
    {
      id: "adsense",
      name: "Adsense",
      title: "Google AdSense & Monetization",
      desc: "Turn website content and blogging traffic into sustainable recurring revenue through Google AdSense. Learn site approval guidelines, high CPC niches, and banner heatmaps.",
      objectives: [
        "AdSense eligibility checklist, privacy policies, and approval guidelines",
        "Ad placement strategies, banner heatmap optimization, and auto ads",
        "High CPC keyword targeting to increase revenue per 1000 impressions (RPM)",
        "Policy compliance to avoid account suspensions and invalid click penalties",
        "Diversifying display revenue with alternative ad exchanges and header bidding",
      ],
    },
  ];

  // Specific FAQs for this campus
  const campusFaqs = [
    {
      q: `Where is DIDM located in ${centre.name}?`,
      a: `The Delhi Institute of Digital Marketing (DIDM) ${centre.name} is located at ${centre.landmark ? `${centre.landmark}, ` : ""}${centre.address}. The nearest metro station from DIDM’s Digital Marketing Institute is ${centre.metroStation || "the nearest central transit station"}.`,
    },
    {
      q: `What are the benefits of doing digital marketing training in ${centre.city}?`,
      a: `After completing your digital marketing training at DIDM ${centre.name}, you will find lots of opportunities in the field of digital marketing. Trained experts with skills such as SEO, SMO, Google Ads, and Performance Marketing are in high demand across corporate firms, tech startups, and marketing agencies in ${centre.city}.`,
    },
    {
      q: `What is the duration of the digital marketing course in ${centre.name}?`,
      a: `The course length of DIDM’s digital marketing course is 3 to 6 months, depending on which batch you enrol in (regular weekday or weekend batch). We also provide practical assignments and have you work on live industry projects.`,
    },
    {
      q: `What is the cost of digital marketing training in ${centre.name}?`,
      a: `The Delhi Institute of Digital Marketing (DIDM) offers three different training programs: Master in Digital Marketing Training Program (INR 58,410/- + GST), Advanced Digital Marketing Training Program (INR 52,250/- + GST), and Customized/Professional Training Program (INR 22,125/- + GST). Flexible installment payment options are available.`,
    },
    {
      q: `Will the digital marketing training in ${centre.name} be conducted online or offline?`,
      a: `Our digital marketing training is available in both offline classroom and online live interactive formats. You can choose the format that best suits your daily schedule. All offline classroom trainees also receive full 24/7 access to our online Learning Management System (LMS).`,
    },
    {
      q: `What are the salary packages for digital marketing jobs in ${centre.city}?`,
      a: `Freshers completing our digital marketing training generally start with annual packages between INR 3.5 Lakhs to INR 5.5 Lakhs per annum. With 2 to 3 years of hands-on agency or performance marketing experience, professionals in ${centre.city} commonly command INR 7 Lakhs to INR 12+ Lakhs annually.`,
    },
    {
      q: "Is Digital Marketing a good career choice in 2026?",
      a: "Digital Marketing is an exceptional career choice. The continuous digital shift of traditional businesses has resulted in an exponential demand for certified digital marketers, and this demand continues to grow. Anyone who develops practical skills in SEO, Ads, and Analytics has a very bright future.",
    },
    {
      q: "Should I take the entire course, or should I opt for modules that I want to specialize in?",
      a: "Our Master in Digital Marketing and Advanced Digital Marketing Courses provide you with complete, end-to-end knowledge across all 50+ modules. However, if you are looking to specialize in specific skills like Google Ads, Social Media, or SEO, our Customized Professional Course allows you to tailor your curriculum.",
    },
    {
      q: `Which is the best digital marketing institute in ${centre.name}?`,
      a: `DIDM ${centre.name} is recognized as the top digital marketing institute due to its 100% practical training methodology, live ad spend budgets, 50+ updated modules, Google-certified senior trainers, 100% placement record, and lifetime LMS support.`,
    },
    {
      q: `What career opportunities will I have after I complete my digital marketing course at ${centre.name}?`,
      a: "Career paths include: SEO Specialist, PPC / Performance Marketing Specialist, Social Media Strategist, Content Marketing Lead, Web Analytics Executive, E-Commerce Growth Manager, Digital Marketing Manager, Freelance Consultant, or Agency Founder.",
    },
  ];

  // Batch closing gallery photos (authentic photos from Rajouri Garden & DIDM campuses)
  const specificPhotos = (CENTRE_PHOTOS as Record<string,Array<{src:string;title:string}>>)[centre.slug] || [];
  const batchPhotos = specificPhotos.length ? specificPhotos : [
    {src:"/images/didm/life/preet-vihar-3.jpg",title:"DIDM Preet Vihar learning community — network photograph"},
  ];

  return (
    <div className="creative-page centre-creative-page bg-white text-[#222222] font-sans antialiased">
      <EditorialHero eyebrow="YOUR DIDM LEARNING CENTRE" title={centre.name} accent="Your next chapter starts here." description={centre.address} image={batchPhotos[0].src} alt={batchPhotos[0].title} caption={specificPhotos.length ? `${centre.name} / Authentic DIDM student photography` : "DIDM network photograph / Preet Vihar"} href="#centre-counselling" action="Talk to this centre" />
      {/* 1. TOP CRIMSON HERO SECTION */}
      <MotionSection as="section" preset="editorial" className="bg-gradient-to-r from-[#800b0b] via-[#a01616] to-[#800b0b] text-white py-10 md:py-14 border-b-4 border-[#ffcc00]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Heading, Badges & Bullets */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-block bg-[#ffcc00] text-[#800b0b] font-bold px-3 py-1 rounded text-xs uppercase tracking-wider shadow">
                NOW IN {centre.region.toUpperCase() === "DELHI" ? "DELHI" : centre.city.toUpperCase()}
              </div>

              <h2 className="centre-details-title text-3xl sm:text-4xl font-medium text-white leading-tight">
                {centre.name.replace(" Centre", "").replace(" (East Delhi)", "")}
              </h2>

              <p className="text-lg sm:text-xl font-medium text-amber-200">
                Best Digital Marketing Institute in {centre.name} with 100% Placement Support
              </p>

              <div className="space-y-2.5 pt-2 text-sm sm:text-base text-neutral-100">
                <div className="flex items-center gap-2.5">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500 text-white shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                  <span><strong>100% Practical Course</strong> with Live Ad Budgets</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500 text-white shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                  <span><strong>100% Placement Assistance</strong> with 450+ Partner Network</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500 text-white shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                  <span><strong>50+ Advanced Modules</strong> & 30+ Industry Certifications</span>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-3">
                <a
                  href={`tel:${cleanPhone}`}
                  className="inline-flex items-center gap-2 bg-[#ffcc00] text-[#800b0b] hover:bg-yellow-400 font-bold px-6 py-3 rounded-md text-sm sm:text-base transition shadow-lg"
                >
                  <Phone className="w-4 h-4 fill-[#800b0b]" />
                  <span>Call: {primaryPhone}</span>
                </a>
                <a
                  href={`https://wa.me/918800505151?text=Hi%20DIDM%2C%20I%20want%20to%20know%20more%20about%20the%20${encodeURIComponent(centre.name)}%20batches.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-3 rounded-md text-sm transition shadow"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right Column: "Get In Touch" White Card Lead Form */}
            <div className="lg:col-span-5 bg-white text-neutral-800 rounded-xl p-6 sm:p-7 shadow-2xl border border-neutral-200">
              <div className="border-b border-neutral-200 pb-3 mb-4 text-center">
                <h3 className="text-xl sm:text-2xl font-black text-[#c0392b] uppercase tracking-wide">
                  Get In Touch
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  Book Seat For Free Counselling & Demo Session
                </p>
              </div>

              {heroSubmitted ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-neutral-900">Thank You!</h4>
                  <p className="text-xs text-neutral-600">
                    Our senior counselor from {centre.name} will call you shortly on your provided contact number.
                  </p>
                </div>
              ) : (
                <form id="centre-counselling"
                  onSubmit={(e) => enquiry.submit(e, { name:heroForm.name, phone:heroForm.phone, email:heroForm.email, centreId:heroForm.centre }, () => setHeroSubmitted(true))}
                  className="space-y-3.5"
                >
                  <div>
                    <input aria-label="Full name"
                      type="text"
                      placeholder="Your Full Name *"
                      required
                      value={heroForm.name}
                      onChange={(e) => setHeroForm({ ...heroForm, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded border border-neutral-300 text-sm focus:outline-none focus:border-[#c0392b]"
                    />
                  </div>
                  <div>
                    <input aria-label="Email address"
                      type="email"
                      placeholder="Email Address *"
                      required
                      value={heroForm.email}
                      onChange={(e) => setHeroForm({ ...heroForm, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded border border-neutral-300 text-sm focus:outline-none focus:border-[#c0392b]"
                    />
                  </div>
                  <div>
                    <input aria-label="Phone number"
                      type="tel"
                      placeholder="Phone Number (10 Digits) *"
                      required
                      pattern="[0-9]{10}"
                      maxLength={10}
                      value={heroForm.phone}
                      onChange={(e) => setHeroForm({ ...heroForm, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded border border-neutral-300 text-sm focus:outline-none focus:border-[#c0392b]"
                    />
                  </div>
                  <div>
                    <select aria-label="Preferred training centre"
                      value={heroForm.centre}
                      onChange={(e) => setHeroForm({ ...heroForm, centre: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded border border-neutral-300 text-sm bg-white focus:outline-none focus:border-[#c0392b]"
                    >
                      <option value={centre.name}>{centre.name} (Selected)</option>
                      {allCentres
                        .filter((c) => c.name !== centre.name)
                        .map((c) => (
                          <option key={c.id} value={c.name}>
                            {c.name} ({c.city})
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="flex items-start gap-2 text-[11px] text-neutral-600 pt-1">
                    <input type="checkbox" required className="mt-0.5" id="hero-terms" />
                    <label htmlFor="hero-terms">
                      I agree to the DIDM{" "}
                      <Link href="/terms" className="text-[#c0392b] underline">
                        Terms of Use
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-[#c0392b] underline">
                        Privacy Policy
                      </Link>.
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#c0392b] hover:bg-[#a01616] text-white font-bold py-3 rounded text-sm sm:text-base uppercase tracking-wider shadow transition"
                  >
                    Book Seat For Free Counselling
                  </button>
                <EnquiryFeedback error={enquiry.error} pending={enquiry.pending} consent={false} />
</form>
              )}
            </div>
          </div>
        </div>
      </MotionSection>

      {/* 2. COURSE OVERVIEW TITLE */}
      <MotionSection as="section" preset="depth" className="py-10 bg-neutral-50 border-b border-neutral-200">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-3">
          <MotionHeading
            eyebrow="Premier Regional Hub"
            title={`Digital Marketing Course In ${centre.name}`}
            subtitle="Learn digital skills to implement them on your website and social media to generate traffic and get maximum ROI."
            align="center"
            as="h2"
            size="lg"
          />
          <p className="text-sm sm:text-base text-neutral-700 max-w-3xl mx-auto leading-relaxed">
            We are providing <strong>50+</strong> modules in our Masters in Digital Marketing Course- an all-in-one digital marketing program for Students, Working Professionals &amp; Entrepreneurs.
          </p>
        </div>
      </MotionSection>

      {/* 3. PROGRAM HIGHLIGHTS (LEFT TABS + RIGHT WORKSHOP FORM) */}
      <MotionSection as="section" preset="split" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 uppercase">
              Program <span className="text-[#c0392b]">Highlights</span>
            </h2>
            <div className="w-16 h-1 bg-[#c0392b] mx-auto mt-2"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Interactive Tab Buttons */}
            <div className="lg:col-span-3 space-y-1.5">
              {highlightsTabs.map((tab) => {
                const isActive = activeHighlightTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveHighlightTab(tab.id)}
                    className={`w-full text-left px-4 py-3 rounded font-bold text-sm transition flex items-center justify-between ${
                      isActive
                        ? "bg-[#c0392b] text-white shadow"
                        : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                    }`}
                  >
                    <span>{tab.label}</span>
                    <ArrowRight className={`w-4 h-4 ${isActive ? "text-white" : "text-neutral-400"}`} />
                  </button>
                );
              })}
            </div>

            {/* Middle: Active Tab Content */}
            <div className="lg:col-span-5 bg-neutral-50 rounded-lg p-6 border border-neutral-200 min-h-[340px]">
              {highlightsTabs
                .filter((t) => t.id === activeHighlightTab)
                .map((tab) => (
                  <div key={tab.id} className="space-y-4">
                    <h3 className="text-lg font-bold text-[#c0392b] border-b border-neutral-200 pb-2">
                      {tab.title}
                    </h3>
                    <ul className="space-y-3">
                      {tab.points.map((pt, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700">
                          <CheckCircle2 className="w-4 h-4 text-[#c0392b] shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>

            {/* Right: Inline Attend Free Workshop Lead Card */}
            <div className="lg:col-span-4 bg-white rounded-lg p-5 border-2 border-[#c0392b] shadow-lg">
              <div className="text-center pb-3 mb-3 border-b border-neutral-200">
                <span className="text-xs font-bold text-[#c0392b] uppercase tracking-wider">
                  Upcoming Free Session
                </span>
                <h4 className="text-lg font-black text-neutral-900 mt-1">
                  Attend FREE Workshop
                </h4>
                <p className="text-[11px] text-neutral-500">
                  Experience live practical demo class at {centre.name}
                </p>
              </div>

              {workshopSubmitted ? (
                <div className="py-6 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <p className="text-sm font-bold text-neutral-900">Request received</p>
                  <p className="text-xs text-neutral-600">
                    Your request has been saved. The DIDM team will contact you about workshop availability.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => enquiry.submit(e, { name:workshopForm.name, phone:workshopForm.phone, email:workshopForm.email, centreId:workshopForm.centre }, () => setWorkshopSubmitted(true))}
                  className="space-y-2.5"
                >
                  <input aria-label="Full name"
                    type="text"
                    placeholder="Name *"
                    required
                    value={workshopForm.name}
                    onChange={(e) => setWorkshopForm({ ...workshopForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded text-xs focus:outline-none focus:border-[#c0392b]"
                  />
                  <input aria-label="Email address"
                    type="email"
                    placeholder="Email *"
                    required
                    value={workshopForm.email}
                    onChange={(e) => setWorkshopForm({ ...workshopForm, email: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded text-xs focus:outline-none focus:border-[#c0392b]"
                  />
                  <input aria-label="Phone number"
                    type="tel"
                    placeholder="Mobile Number *"
                    required
                    pattern="[0-9]{10}"
                    maxLength={10}
                    value={workshopForm.phone}
                    onChange={(e) => setWorkshopForm({ ...workshopForm, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded text-xs focus:outline-none focus:border-[#c0392b]"
                  />
                  <input aria-label="Preferred training centre"
                    type="text"
                    readOnly
                    value={centre.name}
                    className="w-full px-3 py-2 border border-neutral-200 bg-neutral-100 rounded text-xs text-neutral-600"
                  />
                  <button
                    type="submit"
                    className="w-full bg-[#c0392b] hover:bg-[#a01616] text-white font-bold py-2.5 rounded text-xs uppercase tracking-wider transition"
                  >
                    Register For Workshop
                  </button>
                <EnquiryFeedback error={enquiry.error} pending={enquiry.pending} consent={true} />
</form>
              )}
            </div>
          </div>
        </div>
      </MotionSection>

      {/* 4. FOUR FEATURE CARDS */}
      <MotionSection as="section" preset="stagger" className="py-8 bg-neutral-50 border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggeredCardGrid columns={4} stagger={0.08}>
            <div className="bg-white p-5 rounded-lg border border-neutral-200 text-center space-y-2 shadow-sm">
              <div className="w-10 h-10 mx-auto rounded-full bg-red-100 text-[#c0392b] flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-[#c0392b] text-base">Digital Marketing Course</h4>
              <p className="text-xs text-neutral-600">✔ 50+ Advanced Modules</p>
              <p className="text-xs text-neutral-600">✔ 500+ Hours Live Training</p>
            </div>

            <div className="bg-white p-5 rounded-lg border border-neutral-200 text-center space-y-2 shadow-sm">
              <div className="w-10 h-10 mx-auto rounded-full bg-red-100 text-[#c0392b] flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-[#c0392b] text-base">Special Session</h4>
              <p className="text-xs text-neutral-600">✔ Case Study Discussion</p>
              <p className="text-xs text-neutral-600">✔ Dropshipping Concepts</p>
            </div>

            <div className="bg-white p-5 rounded-lg border border-neutral-200 text-center space-y-2 shadow-sm">
              <div className="w-10 h-10 mx-auto rounded-full bg-red-100 text-[#c0392b] flex items-center justify-center">
                <Laptop className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-[#c0392b] text-base">Tools &amp; Software / LMS</h4>
              <p className="text-xs text-neutral-600">✔ Premium Tools &amp; Themes</p>
              <p className="text-xs text-neutral-600">✔ 24/7 Dedicated LMS Access</p>
            </div>

            <div className="bg-white p-5 rounded-lg border border-neutral-200 text-center space-y-2 shadow-sm">
              <div className="w-10 h-10 mx-auto rounded-full bg-red-100 text-[#c0392b] flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-[#c0392b] text-base">Live Projects Exposure</h4>
              <p className="text-xs text-neutral-600">✔ 2 Months Live Internship</p>
              <p className="text-xs text-neutral-600">✔ Practical Client Campaigns</p>
            </div>
          </StaggeredCardGrid>
        </div>
      </MotionSection>

      {/* 5. REASONS TO JOIN MASTER DIGITAL MARKETING COURSE IN CAMPUS */}
      <MotionSection as="section" preset="stagger" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 max-w-3xl mx-auto">
            <MotionHeading as="h2" className="text-2xl sm:text-3xl font-black text-neutral-900">
              Reasons To <span className="text-[#c0392b]">Join Digital Marketing Institute in {centre.name}</span>
            </MotionHeading>
            <div className="w-20 h-1 bg-[#c0392b] mx-auto mt-2 mb-3"></div>
            <p className="text-xs sm:text-sm text-neutral-600">
              The Digital Marketing program will prepare you to become a complete digital marketer. One of the world&apos;s fastest-growing disciplines, this certification will increase your job market value.
            </p>
          </div>

          <StaggeredCardGrid columns={4} stagger={0.05}>
            <div className="p-5 border border-neutral-200 rounded-lg hover:border-[#c0392b] transition shadow-sm space-y-2">
              <div className="w-8 h-8 rounded bg-red-100 text-[#c0392b] flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-neutral-900 text-sm">100% Placement Assistance</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                DIDM understands career priorities; therefore, we provide direct job notifications to all trainees and assist in corporate placements.
              </p>
            </div>

            <div className="p-5 border border-neutral-200 rounded-lg hover:border-[#c0392b] transition shadow-sm space-y-2">
              <div className="w-8 h-8 rounded bg-red-100 text-[#c0392b] flex items-center justify-center font-bold">
                <Laptop className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-neutral-900 text-sm">Tool Based Learning</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                DIDM focuses on providing practical knowledge along with theory. We provide free access to industrial digital marketing tools.
              </p>
            </div>

            <div className="p-5 border border-neutral-200 rounded-lg hover:border-[#c0392b] transition shadow-sm space-y-2">
              <div className="w-8 h-8 rounded bg-red-100 text-[#c0392b] flex items-center justify-center font-bold">
                <Briefcase className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-neutral-900 text-sm">Proven Placement Record</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                DIDM has tie-ups with over 650+ IT and corporate recruitment partners. We have successfully placed over 80% of our active candidates.
              </p>
            </div>

            <div className="p-5 border border-neutral-200 rounded-lg hover:border-[#c0392b] transition shadow-sm space-y-2">
              <div className="w-8 h-8 rounded bg-red-100 text-[#c0392b] flex items-center justify-center font-bold">
                <Layers className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-neutral-900 text-sm">Practical Learning</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Work on live client projects as we emphasize hands-on implementation to gain verifiable real-world marketing experience.
              </p>
            </div>

            <div className="p-5 border border-neutral-200 rounded-lg hover:border-[#c0392b] transition shadow-sm space-y-2">
              <div className="w-8 h-8 rounded bg-red-100 text-[#c0392b] flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-neutral-900 text-sm">Industry Top Trainers</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                DIDM has Google-certified industry experts who possess vast digital marketing experience and agency domain knowledge.
              </p>
            </div>

            <div className="p-5 border border-neutral-200 rounded-lg hover:border-[#c0392b] transition shadow-sm space-y-2">
              <div className="w-8 h-8 rounded bg-red-100 text-[#c0392b] flex items-center justify-center font-bold">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-neutral-900 text-sm">High-Quality Training</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Our trainers share in-depth knowledge and solve all individual queries with personalized one-on-one lab guidance.
              </p>
            </div>

            <div className="p-5 border border-neutral-200 rounded-lg hover:border-[#c0392b] transition shadow-sm space-y-2">
              <div className="w-8 h-8 rounded bg-red-100 text-[#c0392b] flex items-center justify-center font-bold">
                <Play className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-neutral-900 text-sm">Live Practical Session</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                We conduct live practical sessions as we believe it is the most effective way of mastering complex advertising tools.
              </p>
            </div>

            <div className="p-5 border border-neutral-200 rounded-lg hover:border-[#c0392b] transition shadow-sm space-y-2">
              <div className="w-8 h-8 rounded bg-red-100 text-[#c0392b] flex items-center justify-center font-bold">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-neutral-900 text-sm">Flexible Batch Timings</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Trainees can choose batch timings according to their convenience. We conduct morning, evening, and weekend batches.
              </p>
            </div>
          </StaggeredCardGrid>
        </div>
      </MotionSection>

      {/* 6. RED BANNER: 100% PRACTICAL TRAINING WITH LIVE AD SPENDS */}
      <MotionSection as="section" preset="scale" className="bg-[#a01616] text-white py-8 text-center px-4">
        <div className="max-w-4xl mx-auto space-y-2">
          <MotionHeading as="h3" className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-wide">
            100% Practical Training with Live Ad Spends
          </MotionHeading>
          <p className="text-xs sm:text-sm text-neutral-100 max-w-2xl mx-auto">
            Learn directly on live campaign budgets with real ROI metrics. Gain practical exposure through hands-on campaign execution.
          </p>
        </div>
      </MotionSection>

      {/* 7. DIGITAL MARKETING COURSE COMPARISON */}
      <MotionSection as="section" preset="depth" className="py-12 bg-neutral-50 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 max-w-3xl mx-auto">
            <MotionHeading as="h2" className="text-2xl sm:text-3xl font-black text-neutral-900 uppercase">
              Digital Marketing Course Comparison - <span className="text-[#c0392b]">{centre.name}</span>
            </MotionHeading>
            <div className="w-20 h-1 bg-[#c0392b] mx-auto mt-2 mb-3"></div>
            <p className="text-xs sm:text-sm text-neutral-600">
              The Best Digital Marketing Institute in {centre.name}, DIDM provides a detailed evaluation of three diverse digital marketing courses. Compare features, modules, and fees to select the ideal program.
            </p>
            <p className="text-xs font-bold text-neutral-800 mt-2">
              ADVANCED <span className="text-[#c0392b]">|</span> MASTER <span className="text-[#c0392b]">|</span> CUSTOMIZED
            </p>
          </div>

          <StaggeredCardGrid columns={3} stagger={0.08}>
            {/* Card 1: Advanced (AIDM) */}
            <div className="bg-white rounded-lg border border-neutral-300 shadow-md flex flex-col justify-between overflow-hidden">
              <div className="bg-neutral-800 text-white text-center py-3">
                <h4 className="font-bold text-base">Advanced In Digital Marketing</h4>
                <p className="text-xs text-neutral-300">Level 2 - AIMTP</p>
              </div>
              <div className="p-6 space-y-4 flex-1">
                <div className="text-center pb-3 border-b border-neutral-200">
                  <div className="text-2xl font-black text-neutral-900">INR 52,250/-*</div>
                  <span className="text-xs text-neutral-500">+ Applicable Taxes</span>
                </div>
                <ul className="space-y-2 text-xs text-neutral-700">
                  <li className="flex items-center gap-2">✔ <strong>35+ Modules</strong> Covered</li>
                  <li className="flex items-center gap-2">✔ <strong>3 Months</strong> Duration</li>
                  <li className="flex items-center gap-2">✔ In-Class + Live Projects</li>
                  <li className="flex items-center gap-2">✔ 15+ Industry Certifications</li>
                  <li className="flex items-center gap-2">✔ Placement Assistance</li>
                  <li className="flex items-center gap-2">✔ LMS Portal Access</li>
                </ul>
              </div>
              <div className="p-4 bg-neutral-50 border-t border-neutral-200 text-center">
                <Link
                  href="/programs/advanced-digital-marketing-course"
                  className="inline-block w-full bg-neutral-800 hover:bg-neutral-900 text-white font-bold py-2.5 rounded text-xs uppercase"
                >
                  View Details &gt;&gt;
                </Link>
              </div>
            </div>

            {/* Card 2: Master (MIDM) - Featured */}
            <div className="bg-white rounded-lg border-2 border-[#c0392b] shadow-xl flex flex-col justify-between overflow-hidden relative scale-[1.02]">
              <div className="bg-[#c0392b] text-white text-center py-3.5">
                <span className="bg-[#ffcc00] text-[#800b0b] text-[10px] font-black uppercase px-2 py-0.5 rounded absolute top-2 right-2">
                  MOST POPULAR
                </span>
                <h4 className="font-black text-lg">Master In Digital Marketing</h4>
                <p className="text-xs text-amber-200">Level 3 - MIDM Program</p>
              </div>
              <div className="p-6 space-y-4 flex-1">
                <div className="text-center pb-3 border-b border-neutral-200">
                  <div className="text-3xl font-black text-[#c0392b]">INR 58,410/-*</div>
                  <span className="text-xs text-neutral-500">+ Applicable Taxes</span>
                </div>
                <ul className="space-y-2.5 text-xs text-neutral-800">
                  <li className="flex items-center gap-2">✔ <strong>50+ In-Depth Modules</strong></li>
                  <li className="flex items-center gap-2">✔ <strong>500+ Hours</strong> Learning Session</li>
                  <li className="flex items-center gap-2">✔ <strong>2 Months Practical Live Internship</strong></li>
                  <li className="flex items-center gap-2">✔ 30+ Global Certifications</li>
                  <li className="flex items-center gap-2">✔ <strong>100% Placement Guarantee</strong></li>
                  <li className="flex items-center gap-2">✔ Lifetime LMS Access &amp; Toolstack</li>
                  <li className="flex items-center gap-2">✔ Mentorship from Agency Directors</li>
                </ul>
              </div>
              <div className="p-4 bg-red-50 border-t border-red-200 text-center">
                <Link
                  href="/programs/master-in-digital-marketing-course"
                  className="inline-block w-full bg-[#c0392b] hover:bg-[#a01616] text-white font-bold py-2.5 rounded text-xs uppercase shadow"
                >
                  Enroll Now &gt;&gt;
                </Link>
              </div>
            </div>

            {/* Card 3: Customized / Professional */}
            <div className="bg-white rounded-lg border border-neutral-300 shadow-md flex flex-col justify-between overflow-hidden">
              <div className="bg-neutral-800 text-white text-center py-3">
                <h4 className="font-bold text-base">Customized Digital Marketing</h4>
                <p className="text-xs text-neutral-300">Level 1 - Professional Modular</p>
              </div>
              <div className="p-6 space-y-4 flex-1">
                <div className="text-center pb-3 border-b border-neutral-200">
                  <div className="text-2xl font-black text-neutral-900">INR 22,125/-*</div>
                  <span className="text-xs text-neutral-500">+ Applicable Taxes</span>
                </div>
                <ul className="space-y-2 text-xs text-neutral-700">
                  <li className="flex items-center gap-2">✔ <strong>Modular Specialization</strong></li>
                  <li className="flex items-center gap-2">✔ <strong>1.5 to 2 Months</strong> Duration</li>
                  <li className="flex items-center gap-2">✔ Choose SEO, Ads or SMM</li>
                  <li className="flex items-center gap-2">✔ Targeted Practical Training</li>
                  <li className="flex items-center gap-2">✔ Basic Certifications</li>
                  <li className="flex items-center gap-2">✔ Ideal for Freelancers &amp; Owners</li>
                </ul>
              </div>
              <div className="p-4 bg-neutral-50 border-t border-neutral-200 text-center">
                <Link
                  href="/programs/customized-digital-marketing-course"
                  className="inline-block w-full bg-neutral-800 hover:bg-neutral-900 text-white font-bold py-2.5 rounded text-xs uppercase"
                >
                  View Details &gt;&gt;
                </Link>
              </div>
            </div>
          </StaggeredCardGrid>
        </div>
      </MotionSection>

      {/* 8. REASONS TO CHOOSE MASTER IN DIGITAL MARKETING + FREE SESSION LEAD BOX */}
      <MotionSection as="section" preset="split" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Reasons & Profiles */}
            <div className="lg:col-span-7 space-y-4">
              <MotionHeading as="h3" className="text-2xl sm:text-3xl font-black text-neutral-900">
                Reasons To Choose <span className="text-[#c0392b]">Master in Digital Marketing</span>
              </MotionHeading>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Unique type of digital marketing training program designed to suit all market needs. This training program includes three levels of training in a single course fee:
              </p>
              <div className="space-y-2.5 text-xs sm:text-sm text-neutral-700">
                <p>✔ <strong>In-Class Training Program:</strong> 140 Hours intensive hands-on classroom lab.</p>
                <p>✔ <strong>LMS Training Session:</strong> Lifetime multi-expert on-demand video portal.</p>
                <p>✔ <strong>On-board Practical Session:</strong> 360 Hours live project &amp; client portfolio.</p>
              </div>

              <div className="pt-2 space-y-2 text-xs sm:text-sm text-neutral-700">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#c0392b]" />
                  <span><strong>Working &amp; Marketing Professionals:</strong> Upgrading skill development &amp; salary growth.</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#c0392b]" />
                  <span><strong>Business Owners &amp; Entrepreneurs:</strong> Scale business lead generation and ROI.</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#c0392b]" />
                  <span><strong>Students &amp; Job Seekers:</strong> Multiple high-paying job opportunities across India.</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#c0392b]" />
                  <span><strong>Housewives &amp; Freelancers:</strong> Gateway to earn money online and build independent clients.</span>
                </div>
              </div>
            </div>

            {/* Right Column: Red Quick Lead Box */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#c0392b] to-[#800b0b] text-white rounded-xl p-6 shadow-xl">
              <h4 className="text-xl font-bold uppercase tracking-wide text-center">
                Take a Free Session Today!!
              </h4>
              <p className="text-xs text-amber-200 text-center mt-1 mb-4">
                Speak with our master faculty at {centre.name}
              </p>

              {counsellingSubmitted ? (
                <div className="py-6 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-white mx-auto" />
                  <p className="font-bold text-sm">Session Request Received!</p>
                  <p className="text-xs text-amber-100">Our campus team will call you to discuss your enquiry.</p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => enquiry.submit(e, { name:counsellingForm.name, phone:counsellingForm.phone, email:counsellingForm.email, centreId:counsellingForm.centre }, () => setCounsellingSubmitted(true))}
                  className="space-y-3"
                >
                  <input aria-label="Full name"
                    type="text"
                    placeholder="Full Name *"
                    required
                    value={counsellingForm.name}
                    onChange={(e) => setCounsellingForm({ ...counsellingForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded bg-white text-neutral-900 text-xs focus:outline-none"
                  />
                  <input aria-label="Email address"
                    type="email"
                    placeholder="Email Address *"
                    required
                    value={counsellingForm.email}
                    onChange={(e) => setCounsellingForm({ ...counsellingForm, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded bg-white text-neutral-900 text-xs focus:outline-none"
                  />
                  <input aria-label="Phone number"
                    type="tel"
                    placeholder="Mobile Number *"
                    required
                    pattern="[0-9]{10}"
                    maxLength={10}
                    value={counsellingForm.phone}
                    onChange={(e) => setCounsellingForm({ ...counsellingForm, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded bg-white text-neutral-900 text-xs focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="w-full bg-[#ffcc00] hover:bg-yellow-400 text-[#800b0b] font-bold py-2.5 rounded text-xs uppercase tracking-wider transition shadow"
                  >
                    Submit Details &gt;&gt;
                  </button>
                <EnquiryFeedback error={enquiry.error} pending={enquiry.pending} consent={true} />
</form>
              )}
            </div>
          </div>
        </div>
      </MotionSection>

      {/* 9. RATINGS & STUDENT FEEDBACK */}
      <MotionSection as="section" preset="editorial" className="py-8 bg-neutral-50 border-y border-neutral-200">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-around gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-amber-500" />
              ))}
            </div>
            <div className="text-3xl font-black text-neutral-900">4.9 / 5 RATINGS</div>
            <p className="text-xs text-neutral-600 font-semibold">
              Based on 7,000+ Verified Google Reviews across all branches
            </p>
          </div>
          <div className="h-12 w-px bg-neutral-300 hidden sm:block"></div>
          <div className="text-center sm:text-left space-y-1">
            <div className="text-2xl font-black text-[#c0392b]">100% Placement Record</div>
            <p className="text-xs text-neutral-600">
              Placed over 30,000+ digital marketers in leading MNCs and agencies.
            </p>
          </div>
        </div>
      </MotionSection>

      {/* 10. WHO CAN JOIN US */}
      <MotionSection as="section" preset="stagger" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <MotionHeading as="h2" className="text-2xl sm:text-3xl font-black text-neutral-900 uppercase">
              Who Can <span className="text-[#c0392b]">Join Us?</span>
            </MotionHeading>
            <div className="w-16 h-1 bg-[#c0392b] mx-auto mt-2"></div>
          </div>

          <StaggeredCardGrid columns={4} stagger={0.06}>
            <div className="p-5 border border-neutral-200 rounded-lg text-center space-y-2 hover:border-[#c0392b] transition shadow-sm">
              <div className="w-12 h-12 rounded-full bg-red-100 text-[#c0392b] flex items-center justify-center mx-auto">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-neutral-900 text-sm">Students &amp; Job Seekers</h4>
              <p className="text-xs text-neutral-600">
                Kickstart an exciting marketing career with 100% placement support right after graduation.
              </p>
            </div>

            <div className="p-5 border border-neutral-200 rounded-lg text-center space-y-2 hover:border-[#c0392b] transition shadow-sm">
              <div className="w-12 h-12 rounded-full bg-red-100 text-[#c0392b] flex items-center justify-center mx-auto">
                <Briefcase className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-neutral-900 text-sm">Working Professionals</h4>
              <p className="text-xs text-neutral-600">
                Upgrade traditional sales and IT skills to performance marketing for rapid salary promotions.
              </p>
            </div>

            <div className="p-5 border border-neutral-200 rounded-lg text-center space-y-2 hover:border-[#c0392b] transition shadow-sm">
              <div className="w-12 h-12 rounded-full bg-red-100 text-[#c0392b] flex items-center justify-center mx-auto">
                <Building className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-neutral-900 text-sm">Entrepreneurs &amp; Owners</h4>
              <p className="text-xs text-neutral-600">
                Generate high-quality business leads independently and reduce dependency on expensive outside agencies.
              </p>
            </div>

            <div className="p-5 border border-neutral-200 rounded-lg text-center space-y-2 hover:border-[#c0392b] transition shadow-sm">
              <div className="w-12 h-12 rounded-full bg-red-100 text-[#c0392b] flex items-center justify-center mx-auto">
                <Laptop className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-neutral-900 text-sm">Freelancers &amp; Homemakers</h4>
              <p className="text-xs text-neutral-600">
                Earn through remote client projects, affiliate programs, and blogging from the comfort of home.
              </p>
            </div>
          </StaggeredCardGrid>
        </div>
      </MotionSection>

      {/* 11. TRAINING COURSE MODULE IN CAMPUS (INTERACTIVE MODULE TABS) */}
      <MotionSection as="section" preset="depth" className="py-12 bg-neutral-50 border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <MotionHeading as="h2" className="text-2xl sm:text-3xl font-black text-neutral-900">
              Training Course Module in <span className="text-[#c0392b]">{centre.name}</span>
            </MotionHeading>
            <div className="w-16 h-1 bg-[#c0392b] mx-auto mt-2"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Module List Tabs */}
            <div className="lg:col-span-4 space-y-1">
              {modulesList.map((mod, idx) => {
                const isActive = activeModuleTab === idx;
                return (
                  <button
                    key={mod.id}
                    onClick={() => setActiveModuleTab(idx)}
                    className={`w-full text-left px-4 py-3 rounded text-xs sm:text-sm font-bold transition flex items-center justify-between ${
                      isActive
                        ? "bg-[#c0392b] text-white shadow"
                        : "bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-100"
                    }`}
                  >
                    <span>{mod.name}</span>
                    <ArrowRight className={`w-4 h-4 ${isActive ? "text-white" : "text-neutral-400"}`} />
                  </button>
                );
              })}
            </div>

            {/* Right: Module Description & Objectives */}
            <div className="lg:col-span-8 bg-white p-6 sm:p-7 rounded-lg border border-neutral-200 shadow-sm space-y-4">
              <h3 className="text-xl font-black text-[#c0392b]">
                {modulesList[activeModuleTab].title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                {modulesList[activeModuleTab].desc}
              </p>

              <div className="pt-2">
                <h4 className="text-xs sm:text-sm font-bold text-neutral-900 uppercase tracking-wide mb-2">
                  Important Course Objectives:
                </h4>
                <ul className="space-y-2">
                  {modulesList[activeModuleTab].objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-neutral-600">
                      <span className="text-[#c0392b] font-bold">•</span>
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-neutral-200 flex items-center gap-3">
                <Link
                  href="/programs"
                  className="bg-[#c0392b] hover:bg-[#a01616] text-white font-bold px-4 py-2 rounded text-xs uppercase"
                >
                  Learn More
                </Link>
                <Link
                  href="/enquire"
                  className="border border-[#c0392b] text-[#c0392b] hover:bg-red-50 font-bold px-4 py-2 rounded text-xs uppercase"
                >
                  Download Syllabus
                </Link>
              </div>
            </div>
          </div>
        </div>
      </MotionSection>

      {/* 12. OTHERS ADD-ON COURSE BENEFITS */}
      <MotionSection as="section" preset="stagger" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <MotionHeading as="h2" className="text-2xl sm:text-3xl font-black text-neutral-900 uppercase">
              Others add-on <span className="text-[#c0392b]">Course Benefits</span>
            </MotionHeading>
            <div className="w-16 h-1 bg-[#c0392b] mx-auto mt-2"></div>
          </div>

          <StaggeredCardGrid columns={3} stagger={0.06}>
            <div className="p-5 border border-neutral-200 rounded-lg space-y-2 shadow-sm hover:border-[#c0392b] transition">
              <div className="text-base font-bold text-neutral-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#c0392b]" />
                <span>Placement Support</span>
              </div>
              <p className="text-xs text-neutral-600">
                100% placement assistance with dedicated campus interview drives and resume optimization.
              </p>
            </div>

            <div className="p-5 border border-neutral-200 rounded-lg space-y-2 shadow-sm hover:border-[#c0392b] transition">
              <div className="text-base font-bold text-neutral-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#c0392b]" />
                <span>LMS Access</span>
              </div>
              <p className="text-xs text-neutral-600">
                24/7 lifetime access to the online video portal, class presentations, and tool repositories.
              </p>
            </div>

            <div className="p-5 border border-neutral-200 rounded-lg space-y-2 shadow-sm hover:border-[#c0392b] transition">
              <div className="text-base font-bold text-neutral-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#c0392b]" />
                <span>Live Project &amp; Internship</span>
              </div>
              <p className="text-xs text-neutral-600">
                2-month onboard practical project training executing real client advertising accounts.
              </p>
            </div>

            <div className="p-5 border border-neutral-200 rounded-lg space-y-2 shadow-sm hover:border-[#c0392b] transition">
              <div className="text-base font-bold text-neutral-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#c0392b]" />
                <span>Backup Classes</span>
              </div>
              <p className="text-xs text-neutral-600">
                Free backup lectures and repeat class privileges if you miss any scheduled topic.
              </p>
            </div>

            <div className="p-5 border border-neutral-200 rounded-lg space-y-2 shadow-sm hover:border-[#c0392b] transition">
              <div className="text-base font-bold text-neutral-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#c0392b]" />
                <span>Case Studies</span>
              </div>
              <p className="text-xs text-neutral-600">
                In-depth discussions on successful Indian and global digital campaign breakdowns.
              </p>
            </div>

            <div className="p-5 border border-neutral-200 rounded-lg space-y-2 shadow-sm hover:border-[#c0392b] transition">
              <div className="text-base font-bold text-neutral-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#c0392b]" />
                <span>Certification Prep</span>
              </div>
              <p className="text-xs text-neutral-600">
                Step-by-step guidance to clear Google, Meta, HubSpot, and SEMrush official exams.
              </p>
            </div>
          </StaggeredCardGrid>
        </div>
      </MotionSection>

      {/* 13. AWARDS & ASSOCIATIONS BAR */}
      <MotionSection as="section" preset="scale" className="py-8 bg-neutral-100 border-y border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 flex flex-wrap items-center justify-around gap-6 text-center">
          <div className="flex items-center gap-3">
            <Award className="w-8 h-8 text-[#c0392b]" />
            <div className="text-left">
              <div className="text-xs font-bold text-neutral-900">ASSOCHAM Award</div>
              <div className="text-[11px] text-neutral-600">Best Digital Marketing Institute</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Star className="w-8 h-8 text-amber-500 fill-amber-500" />
            <div className="text-left">
              <div className="text-xs font-bold text-neutral-900">Justdial 4.9/5 Rated</div>
              <div className="text-[11px] text-neutral-600">Highest Verified Student Trust</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-emerald-600" />
            <div className="text-left">
              <div className="text-xs font-bold text-neutral-900">MSME Govt. Registered</div>
              <div className="text-[11px] text-neutral-600">ISO 9001:2015 Certified Training</div>
            </div>
          </div>
        </div>
      </MotionSection>

      {/* 14. CAMPUS LOCATION & PROGRAM COURSE FEE BOX */}
      <MotionSection as="section" preset="split" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Location, Metro, Map */}
            <div className="lg:col-span-7 bg-neutral-50 rounded-lg p-6 border border-neutral-200 space-y-4">
              <div className="border-b border-neutral-200 pb-3 text-center sm:text-left">
                <span className="text-xs font-mono font-bold text-[#c0392b] uppercase">
                  Verified Branch Location
                </span>
                <MotionHeading as="h3" className="text-xl font-black text-neutral-900 mt-1">
                  {centre.name} Training Location
                </MotionHeading>
              </div>

              <div className="space-y-2 text-xs sm:text-sm text-neutral-700">
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#c0392b] shrink-0 mt-0.5" />
                  <span><strong>Address:</strong> {centre.address}</span>
                </p>
                {centre.metroStation && (
                  <p className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#c0392b] shrink-0 mt-0.5" />
                    <span><strong>Nearest Metro:</strong> {centre.metroStation}</span>
                  </p>
                )}
                <p className="flex items-start gap-2">
                  <Phone className="w-4 h-4 text-[#c0392b] shrink-0 mt-0.5" />
                  <span><strong>Call / Helpline:</strong> {centre.phones.join(" / ")}</span>
                </p>
                <p className="flex items-start gap-2">
                  <Mail className="w-4 h-4 text-[#c0392b] shrink-0 mt-0.5" />
                  <span><strong>Email:</strong> {centre.email || "info@didm.in"}</span>
                </p>
              </div>

              {/* Google Map Embed with Place Overlay Card */}
              <div className="relative aspect-[16/9] min-h-[340px] w-full rounded-lg overflow-hidden border border-neutral-300 mt-4 shadow-sm bg-neutral-100">
                {/* Floating Google Place Info Card (matches official Google Maps Place card) */}
                <div className="absolute top-3 left-3 z-10 max-w-[270px] sm:max-w-[320px] bg-white/95 backdrop-blur-xs rounded-lg p-3 sm:p-3.5 shadow-lg border border-neutral-200/90 text-left pointer-events-auto">
                  <div className="font-bold text-neutral-900 text-xs sm:text-sm leading-tight tracking-tight">
                    Delhi Institute of Digital Marketing
                  </div>
                  <div className="text-[11px] text-neutral-600 truncate mt-1 leading-snug" title={centre.address}>
                    {centre.address}
                  </div>
                  <div className="flex items-center gap-1.5 mt-1.5 text-xs">
                    <span className="font-bold text-neutral-800">{centre.rating || "4.8"}</span>
                    <span className="text-amber-500 text-xs leading-none">★</span>
                    <a
                      href={
                        centre.directionsUrl ||
                        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Delhi Institute of Digital Marketing " + centre.address)}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-[11px] font-medium"
                    >
                      ({centre.reviewsCount || "500+"})
                    </a>
                    <span className="text-neutral-400 text-[10px] ml-0.5" title="Google Verified Place">ⓘ</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2.5">
                    <a
                      href={
                        centre.directionsUrl ||
                        `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent("Delhi Institute of Digital Marketing " + centre.address)}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-[#1a73e8] hover:bg-[#1557b0] text-white text-[11px] font-medium px-3.5 py-1.5 rounded-full transition shadow-xs"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Open in Maps</span>
                    </a>
                    <a
                      href={
                        centre.directionsUrl ||
                        `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent("Delhi Institute of Digital Marketing " + centre.address)}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-7 h-7 rounded-full bg-[#1a73e8] hover:bg-[#1557b0] text-white flex items-center justify-center transition shadow-xs shrink-0"
                      title="Get Directions"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <iframe
                  src={
                    centre.mapEmbedUrl ||
                    `https://maps.google.com/maps?q=Delhi+Institute+of+Digital+Marketing,+${encodeURIComponent(centre.address)}&t=&z=15&ie=UTF8&output=embed`
                  }
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${centre.name} Google Map Location`}
                ></iframe>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3 text-center sm:text-left">
                <a
                  href={
                    centre.directionsUrl ||
                    `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(centre.address)}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-neutral-800 hover:bg-neutral-900 text-white font-bold px-4 py-2 rounded text-xs uppercase transition shadow-xs"
                >
                  <MapPin className="w-3.5 h-3.5 text-red-400" />
                  <span>Get Directions on Map</span>
                </a>

                {centre.lastVerifiedDate && (
                  <span className="text-[11px] text-neutral-500 font-medium">
                    Verified Location · {centre.lastVerifiedDate}
                  </span>
                )}
              </div>
            </div>

            {/* Right: Program Course Fee Card */}
            <div className="lg:col-span-5 bg-white rounded-lg p-6 border-2 border-[#c0392b] shadow-xl text-center space-y-4">
              <div className="bg-[#c0392b] text-white py-2 px-4 rounded text-sm font-bold uppercase tracking-wide">
                Program Course Fee
              </div>

              <div className="relative aspect-[16/9] w-full rounded overflow-hidden border border-neutral-200 bg-neutral-50 flex items-center justify-center">
                <Image sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  src="/images/didm/courses/didm-course-fees.jpg"
                  alt="DIDM Course Fees"
                  fill
                  className="object-contain p-1.5"
                />
              </div>

              <p className="text-xs text-neutral-600">
                Get in touch with our admissions desk for current cohort offers, student discounts &amp; 0% EMI installments!
              </p>

              <div className="border-y border-neutral-200 py-3 space-y-1">
                <div className="text-xs uppercase text-neutral-500 font-bold">One-Time Program Fee</div>
                <div className="text-3xl font-black text-[#c0392b]">INR 68,661/-*</div>
                <div className="text-xs text-neutral-600 pt-1">
                  In <strong>2 Easy Instalments</strong>: INR <strong>72,201/-*</strong>
                </div>
              </div>

              <Link
                href="/enquire"
                className="inline-block w-full bg-[#c0392b] hover:bg-[#a01616] text-white font-bold py-3 rounded text-sm uppercase tracking-wider shadow transition"
              >
                Enroll Now &gt;&gt;
              </Link>
            </div>
          </div>
        </div>
      </MotionSection>

      <MotionSection className="py-12 bg-white border-t border-neutral-200" id="centre-batches">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="branch-schedule-handoff"><div><p className="public-eyebrow">FIND YOUR LEARNING RHYTHM</p><h3>Plan your next batch at {centre.name}.</h3><p>Explore published schedules with this centre selected. Admissions can confirm current start dates, timings, availability and fees.</p></div><Link className="student-primary" href={`/upcoming-batches?c=${centre.id}`}>Explore centre batches <ArrowRight size={16} /></Link></div></div>
      </MotionSection>

      {/* 16. STILL THINKING CALL BANNER */}
      <MotionSection as="section" preset="scale" className="bg-gradient-to-r from-[#800b0b] to-[#c0392b] text-white py-8 text-center px-4">
        <div className="max-w-3xl mx-auto space-y-3">
          <MotionHeading as="h3" className="text-xl sm:text-2xl font-black uppercase">
            Still Thinking!! Let Us Clear Your Doubts!!
          </MotionHeading>
          <p className="text-xs sm:text-sm text-neutral-100">
            Speak directly with our senior digital marketing course counselor for Batches, fee structures &amp; syllabus queries.
          </p>
          <div className="pt-2">
            <a
              href={`tel:${cleanPhone}`}
              className="inline-flex items-center gap-2 bg-[#ffcc00] text-[#800b0b] hover:bg-yellow-400 font-bold px-6 py-2.5 rounded text-sm sm:text-base shadow-lg transition"
            >
              <Phone className="w-4 h-4 fill-[#800b0b]" />
              <span>Call Helpline: +91 - {primaryPhone}</span>
            </a>
          </div>
        </div>
      </MotionSection>

      {/* 17. STUDENTS HAPPY FACES (BATCH CLOSING PHOTOS GALLERY) */}
      <MotionSection as="section" preset="stagger" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <MotionHeading as="h2" className="text-2xl sm:text-3xl font-black text-neutral-900">
              Student life - <span className="text-[#c0392b]">{specificPhotos.length ? centre.name : "Across the DIDM network"}</span>
            </MotionHeading>
            <div className="w-16 h-1 bg-[#c0392b] mx-auto mt-2 mb-2"></div>
            <p className="text-xs text-neutral-600">
              Recent batch graduation ceremony, project presentations &amp; certificate handover celebrations!
            </p>
          </div>

          <StaggeredCardGrid columns={4} stagger={0.05}>
            {batchPhotos.map((photo, i) => (
              <div
                key={i}
                className="group relative aspect-[4/3] rounded-lg overflow-hidden border border-neutral-200 bg-neutral-100 shadow-sm"
              >
                <Image sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  src={photo.src}
                  alt={photo.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition p-2.5 flex items-end">
                  <span className="text-[11px] text-white font-medium">{photo.title}</span>
                </div>
              </div>
            ))}
          </StaggeredCardGrid>
        </div>
      </MotionSection>

      {/* 18. 450+ PLACEMENT PARTNERS STRIP */}
      <MotionSection as="section" preset="editorial" className="py-8 bg-neutral-50 border-y border-neutral-200 text-center">
        <div className="max-w-6xl mx-auto px-4 space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-500">
            Trusted By Top Brands &amp; 450+ Placement Partners
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-neutral-700 font-bold text-sm sm:text-base">
            <span className="hover:text-[#c0392b] transition">Amazon</span>
            <span className="hover:text-[#c0392b] transition">Flipkart</span>
            <span className="hover:text-[#c0392b] transition">Zomato</span>
            <span className="hover:text-[#c0392b] transition">Swiggy</span>
            <span className="hover:text-[#c0392b] transition">Paytm</span>
            <span className="hover:text-[#c0392b] transition">MakeMyTrip</span>
            <span className="hover:text-[#c0392b] transition">Accenture</span>
            <span className="hover:text-[#c0392b] transition">Dentsu</span>
            <span className="hover:text-[#c0392b] transition">GroupM</span>
            <span className="hover:text-[#c0392b] transition">Ogilvy</span>
          </div>
        </div>
      </MotionSection>

      {/* 19. CAMPUS SPECIFIC FAQS */}
      <MotionSection as="section" preset="depth" className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <MotionHeading as="h2" className="text-2xl sm:text-3xl font-black text-neutral-900">
              Digital Marketing Course in {centre.name} <span className="text-[#c0392b]">FAQ&apos;S</span>
            </MotionHeading>
            <div className="w-16 h-1 bg-[#c0392b] mx-auto mt-2"></div>
          </div>

          <div className="space-y-3">
            {campusFaqs.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className="border border-neutral-200 rounded-lg overflow-hidden transition"
                >
                  <button
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full text-left px-5 py-4 bg-neutral-50 hover:bg-neutral-100 flex items-center justify-between text-xs sm:text-sm font-bold text-neutral-900 transition"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-neutral-500 shrink-0 transition-transform ${
                        isOpen ? "rotate-180 text-[#c0392b]" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 py-4 bg-white text-xs sm:text-sm text-neutral-700 leading-relaxed border-t border-neutral-200">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </MotionSection>
    </div>
  );
}

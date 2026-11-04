import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, Calendar, Award, Briefcase, Sparkles, Building2, Phone, Download, HelpCircle } from "lucide-react";
import { SITE_DATA } from "@/data/site-data";
import { SyllabusAccordion, SyllabusModule } from "@/components/SyllabusAccordion";
import { FAQSection } from "@/components/FAQSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Master in Digital Marketing (MIDM) | 500+ Hours & 2M Internship | DIDM",
  description:
    "India's top practical digital marketing course. 50+ modules, 30+ certifications, live ad budgets, 2-month agency internship & 100% placement assurance.",
};

const MIDM_MODULES: SyllabusModule[] = [
  {
    number: "01",
    title: "Web Infrastructure, UX & Conversion Architecture",
    duration: "40 Hours · 4 Weeks",
    summary:
      "Master how modern digital marketing assets are engineered. Learn domain management, DNS protocols, WordPress setup, mobile-first responsive UX, and high-converting landing page frameworks.",
    topics: [
      "Domain DNS, hosting configurations, CDN integration & SSL",
      "Building responsive business websites with WordPress & Elementor",
      "Landing Page Psychology, UX copywriting & micro-conversion funnels",
      "Technical tracking setup: Google Tag Manager (GTM) data layer & triggers",
    ],
    toolsUsed: ["WordPress", "Elementor Pro", "Google Tag Manager", "Cloudflare", "Hotjar"],
    practicalProject: "Deploy a live e-commerce / lead-gen landing page with active GTM event tracking.",
  },
  {
    number: "02",
    title: "Advanced Search Engine Optimization (SEO) & Semantic Web",
    duration: "60 Hours · 6 Weeks",
    summary:
      "Deep dive into modern search engine algorithms. Move beyond basic meta tags into entity SEO, topic clusters, schema structured data, Core Web Vitals optimization, and enterprise link acquisition.",
    topics: [
      "Keyword research, search intent mapping & competitive gap analysis",
      "On-page optimization, content architecture & entity associations",
      "Technical SEO audits: crawl budget, robots.txt, XML sitemaps & canonicals",
      "Structured data: JSON-LD implementation for rich snippets",
      "White-hat link building, digital PR & local citation authority",
    ],
    toolsUsed: ["Semrush", "Ahrefs", "Screaming Frog", "Google Search Console", "SurferSEO"],
    practicalProject: "Conduct an end-to-end technical SEO audit for a live commercial brand and fix crawl errors.",
  },
  {
    number: "03",
    title: "Performance Marketing: Google Ads & Programmatic Media",
    duration: "70 Hours · 6 Weeks",
    summary:
      "Master high-intent paid search, Google Display Network, Performance Max (PMax), and YouTube video advertising with real company budgets provided during practical class hours.",
    topics: [
      "Google Ads structure: Campaign, Ad Group, Keyword match types & Smart Bidding",
      "Performance Max campaigns: Asset groups, audience signals & value rules",
      "Display Remarketing & programmatic audience retargeting",
      "YouTube Video action campaigns & storytelling hooks",
      "Negative keyword sculpting & Quality Score (QS) optimization",
    ],
    toolsUsed: ["Google Ads Editor", "Keyword Planner", "Looker Studio", "Google Merchant Center"],
    practicalProject: "Set up and manage a live ₹10,000 budget Google Search campaign with real conversions.",
  },
  {
    number: "04",
    title: "Meta Ads Mastery & Social Media Growth Systems",
    duration: "70 Hours · 6 Weeks",
    summary:
      "Dominate Instagram, Facebook, and LinkedIn. Learn advanced Meta Ads Manager tactics, Custom & Lookalike Audiences, Meta Conversions API (CAPI), and viral short-form video creation.",
    topics: [
      "Meta Ads Manager architecture & Advantage+ Shopping Campaigns (ASC)",
      "Setting up Meta Pixel & server-side Conversions API (CAPI)",
      "High-ROAS creative testing: Hook-Story-Offer creative matrix",
      "LinkedIn B2B Account-Based Marketing (ABM) campaigns",
      "Organic Instagram reels production, algorithmic timing & audio virality",
    ],
    toolsUsed: ["Meta Ads Manager", "Meta Business Suite", "CapCut", "Canva Pro", "Triple Whale"],
    practicalProject: "Build an end-to-end Meta ad creative set and execute a live lead-gen campaign.",
  },
  {
    number: "05",
    title: "Generative AI for Modern Marketers & Automation",
    duration: "50 Hours · 4 Weeks",
    summary:
      "Stay ahead of 99% of marketers by integrating modern generative AI models into everyday workflows. Automate copy ideation, image rendering, data analytics, and customer interaction pipelines.",
    topics: [
      "Advanced prompt engineering for ChatGPT-4o and Claude 3.5 Sonnet",
      "Visual content creation using Midjourney v6 and Runway Gen-3",
      "Automating multi-step marketing workflows with Make.com and Zapier",
      "Building custom AI GPT agents for customer support and ad copywriting",
      "AI-assisted coding for custom landing page scripts and schema tags",
    ],
    toolsUsed: ["ChatGPT Plus", "Claude 3.5 Sonnet", "Midjourney", "Make.com", "Zapier"],
    practicalProject: "Build an automated AI pipeline that generates, designs, and schedules 30 social posts in minutes.",
  },
  {
    number: "06",
    title: "E-Commerce Marketing, Amazon & Marketplace Growth",
    duration: "40 Hours · 3 Weeks",
    summary:
      "Learn how direct-to-consumer (D2C) brands scale online revenue. Master Shopify store optimization, Amazon Seller Central, Flipkart ads, and marketplace product rankings.",
    topics: [
      "Shopify store architecture, cart abandonment recovery & app stacks",
      "Amazon Sponsored Products, Brands, and Display ad bidding",
      "Optimizing product listing titles, bullet points, backend search terms & A+ Content",
      "D2C retention funnels: WhatsApp marketing and email flows (Klaviyo)",
    ],
    toolsUsed: ["Shopify", "Amazon Ads", "Helium10", "Klaviyo", "Wati / Interakt"],
    practicalProject: "Optimize a mock D2C product catalogue and execute an automated WhatsApp abandoned cart flow.",
  },
  {
    number: "07",
    title: "Web Analytics, GA4, CRO & Data-Driven Reporting",
    duration: "40 Hours · 3 Weeks",
    summary:
      "Transform messy marketing data into actionable business intelligence. Master Google Analytics 4 (GA4), custom exploration reports, user journey tracking, and Conversion Rate Optimization (CRO).",
    topics: [
      "GA4 events, custom dimensions, metrics, and conversion paths",
      "Attribution modeling: First-click, Last-click vs Data-driven attribution",
      "Building client-ready interactive marketing dashboards in Looker Studio",
      "A/B split testing principles and qualitative UX analysis with heatmaps",
    ],
    toolsUsed: ["Google Analytics 4", "Looker Studio", "Microsoft Clarity", "Optimizely"],
    practicalProject: "Build an interactive automated client reporting dashboard in Looker Studio.",
  },
  {
    number: "08",
    title: "Affiliate Marketing, Freelancing & Agency Operations",
    duration: "40 Hours · 3 Weeks",
    summary:
      "Learn how to monetize your skills independently. Build niche passive income affiliate sites, bid successfully on international freelance portals, or launch your own boutique marketing agency.",
    topics: [
      "High-ticket affiliate marketing networks (ClickBank, CJ, Amazon Associates)",
      "Creating winning proposals on Upwork, Fiverr & LinkedIn outreach",
      "Agency pricing models: Retainers, performance bonuses & percentage of ad spend",
      "Client management, contract agreements & invoicing protocols",
    ],
    toolsUsed: ["Upwork", "LinkedIn Sales Navigator", "Notion Agency OS", "Stripe"],
    practicalProject: "Submit a complete client audit pitch deck and draft an international retainer proposal.",
  },
];

export default function ProgramDetailPage() {
  const midm = SITE_DATA.programs.find((p) => p.id === "midm")!;

  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: midm.name,
    description: midm.summary,
    provider: {
      "@type": "EducationalOrganization",
      name: "Delhi Institute of Digital Marketing",
      sameAs: "https://www.didm.in",
    },
    offers: {
      "@type": "Offer",
      price: "68661",
      priceCurrency: "INR",
      category: "Tuition",
    },
    educationalCredentialAwarded: "DIDM Master in Digital Marketing Diploma + 30 Global Certifications",
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: ["Classroom", "Blended", "Online"],
      duration: "P3M",
    },
  };

  return (
    <div className="py-10 md:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-xs font-mono text-neutral-500 flex items-center gap-2">
          <Link href="/" className="hover:text-brand-red">Home</Link>
          <span>/</span>
          <Link href="/programs" className="hover:text-brand-red">Programs</Link>
          <span>/</span>
          <span className="text-neutral-900 dark:text-white font-semibold">Master in Digital Marketing (MIDM)</span>
        </nav>

        {/* Hero & Key Facts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red-soft dark:bg-brand-red/10 text-brand-red text-xs font-mono font-semibold">
              ⭐ MOST POPULAR CAREER PROGRAM
            </div>

            <h1 className="text-3xl sm:text-5xl font-normal text-neutral-900 dark:text-white leading-[1.08]">
              Master in Digital Marketing (MIDM) with <em>Live Ad Budgets</em>.
            </h1>

            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl">
              The industry-standard curriculum covering full-stack digital marketing from core search
              and programmatic advertising to modern generative AI tools and 2 months of verified agency internship.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link href="/enquire?p=midm" className="btn-red py-3 px-6 text-sm font-bold">
                Book a Free Trial Class <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#syllabus"
                className="btn-ghost py-3 px-5 text-sm font-semibold flex items-center gap-2"
              >
                <Download className="w-4 h-4 text-brand-red" />
                <span>Explore 50-Module Syllabus</span>
              </a>
            </div>
          </div>

          {/* Key Facts Summary Card */}
          <div className="lg:col-span-4 p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 shadow-lg space-y-5">
            <div className="text-xs font-mono uppercase text-brand-red font-bold tracking-wider">
              Program Highlights
            </div>

            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-[#1A1A22] border border-neutral-100 dark:border-neutral-800">
              <div className="text-[10px] font-mono uppercase text-neutral-400">Total Program Fee</div>
              <div className="font-serif text-3xl font-normal text-neutral-900 dark:text-white mt-0.5">
                {midm.fee}
              </div>
              <div className="text-xs text-neutral-500 mt-1">
                Or {midm.feeInstalment} (0% Interest EMI Available)
              </div>
            </div>

            <dl className="space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-100 dark:border-neutral-800">
                <dt className="text-neutral-500">Duration</dt>
                <dd className="font-bold text-neutral-900 dark:text-white">3M (Weekday) / 6M (Weekend)</dd>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-neutral-100 dark:border-neutral-800">
                <dt className="text-neutral-500">Practical Training</dt>
                <dd className="font-bold text-neutral-900 dark:text-white">500+ Live Hours</dd>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-neutral-100 dark:border-neutral-800">
                <dt className="text-neutral-500">Internship</dt>
                <dd className="font-bold text-emerald-600 dark:text-emerald-400">2-Month Agency Internship</dd>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-neutral-100 dark:border-neutral-800">
                <dt className="text-neutral-500">Certifications</dt>
                <dd className="font-bold text-neutral-900 dark:text-white">30+ Global Certifications</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-neutral-500">Placement Assistance</dt>
                <dd className="font-bold text-neutral-900 dark:text-white">100% Dedicated (650+ Partners)</dd>
              </div>
            </dl>

            <Link href="/enquire?p=midm" className="btn-red w-full text-center py-3 text-xs font-bold block">
              Enroll / Check Next Batch Dates
            </Link>
          </div>
        </div>

        {/* Who This Course Is For */}
        <div className="p-8 sm:p-10 rounded-3xl bg-neutral-100/60 dark:bg-[#131319]/40 border border-neutral-200 dark:border-neutral-800 space-y-6">
          <div>
            <div className="text-xs font-mono uppercase text-brand-red font-bold tracking-wider">
              Candidate Profiles
            </div>
            <h2 className="text-2xl sm:text-3xl font-normal text-neutral-900 dark:text-white mt-1">
              Who is this program designed for?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-[#1A1A22] border border-neutral-200 dark:border-neutral-800 space-y-2">
              <div className="font-bold text-neutral-900 dark:text-white text-base">Graduates & Freshers</div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Build a portfolio with real ad results on Google and Meta before stepping into job interviews. Beat standard college degrees with verifiable agency skills.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white dark:bg-[#1A1A22] border border-neutral-200 dark:border-neutral-800 space-y-2">
              <div className="font-bold text-neutral-900 dark:text-white text-base">Career Switchers</div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Transition smoothly from stagnant traditional jobs into high-demand growth marketing roles with weekend and evening flexibility.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white dark:bg-[#1A1A22] border border-neutral-200 dark:border-neutral-800 space-y-2">
              <div className="font-bold text-neutral-900 dark:text-white text-base">Entrepreneurs & Solopreneurs</div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Learn how to generate qualified inbound leads, run profitable ad campaigns, and eliminate expensive agency retainers.
              </p>
            </div>
          </div>
        </div>

        {/* Complete Syllabus Section */}
        <div id="syllabus" className="space-y-8 pt-4">
          <div className="max-w-2xl">
            <div className="text-xs font-mono uppercase text-brand-red font-bold tracking-wider">
              Comprehensive 50+ Module Curriculum
            </div>
            <h2 className="text-3xl sm:text-4xl font-normal text-neutral-900 dark:text-white mt-1">
              Detailed Syllabus Breakdown.
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
              Every module combines theoretical principles, tool mastery, live campaign execution, and a verified capstone project.
            </p>
          </div>

          <SyllabusAccordion modules={MIDM_MODULES} />
        </div>

        {/* 2-Month Agency Internship Block */}
        <div className="p-8 sm:p-12 rounded-3xl bg-neutral-900 text-white relative overflow-hidden space-y-6">
          <div className="max-w-3xl space-y-3 relative z-10">
            <span className="text-xs font-mono uppercase px-3 py-1 rounded-full bg-brand-red text-white font-bold">
              Guaranteed Practical Exposure
            </span>
            <h2 className="text-2xl sm:text-4xl font-normal text-white">
              The 2-Month Live Agency Internship Experience.
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed">
              Upon finishing classroom lectures, every MIDM candidate transitions directly into our
              in-house agency wing or affiliated partner agencies. You will be assigned real brand
              briefs, handle live client communications, and execute campaigns with actual marketing budgets.
            </p>

            <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-neutral-800/80 border border-neutral-700">
                <div className="font-bold text-white mb-1">Live Ad Spend</div>
                <div className="text-neutral-400">Manage real advertising budgets under senior director supervision.</div>
              </div>
              <div className="p-4 rounded-xl bg-neutral-800/80 border border-neutral-700">
                <div className="font-bold text-white mb-1">Experience Letter</div>
                <div className="text-neutral-400">Receive an official agency experience certificate to show on your CV.</div>
              </div>
              <div className="p-4 rounded-xl bg-neutral-800/80 border border-neutral-700">
                <div className="font-bold text-white mb-1">Direct PPO Reviews</div>
                <div className="text-neutral-400">High-performing interns frequently convert to full-time agency hires.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Fees Breakdown & Transparent Options */}
        <div className="p-8 rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 space-y-6">
          <div className="text-xs font-mono uppercase text-brand-red font-bold tracking-wider">
            Transparent Investment
          </div>
          <h2 className="text-2xl sm:text-3xl font-normal text-neutral-900 dark:text-white">
            Tuition Fees & Flexible Financing.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-[#1A1A22] border border-neutral-200 dark:border-neutral-800 space-y-3">
              <div className="text-xs font-mono uppercase text-neutral-400">One-Time Payment</div>
              <div className="font-serif text-3xl font-bold text-neutral-900 dark:text-white">
                ₹68,661 <span className="text-xs font-sans text-neutral-400 font-normal">incl. all taxes</span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Best value option. Includes all 50+ modules, LMS lifetime access, 40+ paid tools, ad budget, 2M internship, and placement assistance.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-[#1A1A22] border border-neutral-200 dark:border-neutral-800 space-y-3">
              <div className="text-xs font-mono uppercase text-neutral-400">2-Part Instalment Plan</div>
              <div className="font-serif text-3xl font-bold text-neutral-900 dark:text-white">
                ₹72,201 <span className="text-xs font-sans text-neutral-400 font-normal">split across 2 months</span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                50% paid upon enrollment, balance 50% paid at the end of month 1. Zero interest EMIs also available through banking partners (starting ₹5,720/month).
              </p>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-1">
            <div className="text-xs font-mono uppercase text-brand-red font-bold tracking-wider">
              MIDM Questions
            </div>
            <h2 className="text-2xl sm:text-3xl font-normal text-neutral-900 dark:text-white">
              Frequently Asked Questions About MIDM.
            </h2>
          </div>

          <FAQSection
            faqs={[
              {
                q: "What is the qualification required for MIDM?",
                a: "Any 10+2, college graduate (B.Tech, BBA, B.Com, BA, BCA), working professional, or entrepreneur can enroll. No prior technical or coding experience is required.",
              },
              {
                q: "Can I attend weekday or weekend batches?",
                a: "Yes! Weekday batches run Monday through Friday (2 hours daily for 3 months), while weekend batches run on Saturdays and Sundays (4 hours daily for 6 months).",
              },
              {
                q: "What if I miss a class?",
                a: "All sessions are recorded in high-definition and uploaded to our 24/7 student LMS portal. You can also attend the missed topic in an parallel batch at any centre.",
              },
            ]}
          />
        </div>

        {/* Final CTA */}
        <div className="p-8 sm:p-12 rounded-3xl bg-neutral-900 text-white text-center space-y-4">
          <h2 className="text-2xl sm:text-4xl font-normal text-white">
            Ready to secure your seat in the next MIDM batch?
          </h2>
          <p className="text-sm text-neutral-400 max-w-xl mx-auto">
            Batches are limited to 15 students per cohort to ensure individualized mentor attention.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link href="/enquire?p=midm" className="btn-red py-3 px-6 text-sm font-bold">
              Book Free Trial Session
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

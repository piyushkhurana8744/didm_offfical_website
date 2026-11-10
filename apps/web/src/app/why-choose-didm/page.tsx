"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Award,
  CheckCircle2,
  Sparkles,
  Briefcase,
  Laptop,
  GraduationCap,
  ShieldCheck,
  Search,
  ArrowRight,
  Phone,
  Layers,
  TrendingUp,
} from "lucide-react";
import { SITE_BRAND } from "@/lib/content";

interface ReasonCategory {
  id: string;
  name: string;
  description: string;
  icon: any;
  items: string[];
}

const REASON_CATEGORIES: ReasonCategory[] = [
  {
    id: "curriculum",
    name: "Curriculum & Agency Learning",
    description: "Built for real commercial performance rather than generic theory.",
    icon: Laptop,
    items: [
      "Master Course features an exhaustive 52-stop hands-on curriculum spanning foundational setup to AI agents.",
      "100% practical live campaign execution directly inside Meta Ads Manager and Google MCC.",
      "Dual-domain Digital Marketing Intelligence (DMI) program integrating Generative AI & Python automation.",
      "Zero simulated fake metrics: students operate with real ad spend and live domain hosting.",
      "Comprehensive e-commerce growth strategies including Shopify setup, ROAS optimization, and CAPI tracking.",
      "In-depth programmatic display advertising, YouTube video marketing, and native advertising modules.",
      "Advanced Technical SEO audits using Screaming Frog, Google Search Console, and Schema markup.",
      "Weekly performance reviews and campaign audits by active agency project directors.",
    ],
  },
  {
    id: "accreditation",
    name: "Accreditations & Industry Honors",
    description: "Recognized by premier trade associations and international bodies.",
    icon: Award,
    items: [
      "Awarded 'Most Promising Brand in Digital Marketing' by ASSOCHAM (100-year-old apex trade body).",
      "ISO 9001:2015 certified training quality management system across all learning centers.",
      "WASME (World Association for Small and Medium Enterprises) recognition for digital skill development.",
      "Academic alliance with ISOMES | News 24 Media School for broadcast and multimedia digital journalism.",
      "Keynote & Institutional Digital Excellence recognition at the Noida Education Conclave 2026.",
      "Featured across premier national daily publications including Zee News, Dainik Jagran, and The Economic Times.",
    ],
  },
  {
    id: "placements",
    name: "Placement Cell & Corporate Access",
    description: "Dedicated placement wing with 100% career guidance commitments.",
    icon: Briefcase,
    items: [
      "Active corporate hiring network with 500+ verified partner agencies, tech firms, and multinationals.",
      "In-house digital agency (Online Strikers) providing guaranteed paid agency internships.",
      "Dedicated corporate placement officers conducting bi-weekly mock interviews and HR rounds.",
      "Portfolio preparation including live campaign ROAS case studies, ad creative teardowns, and SEO audit PDFs.",
      "Salary packages ranging from ₹4.5 LPA up to ₹12 LPA for experienced and high-performing graduates.",
      "Ongoing alumni job switch support and executive promotion mentoring even after course completion.",
    ],
  },
  {
    id: "tools",
    name: "Premium Software & Tool Access",
    description: "Work with the modern tech stack used by Fortune 500 growth teams.",
    icon: Sparkles,
    items: [
      "Complimentary access to professional digital marketing software tools valued at ₹1,00,000+.",
      "Hands-on mastery of SEMrush, Ahrefs, Ubersuggest, and Screaming Frog for competitive intelligence.",
      "Pro access to Canva Pro, Adobe Photoshop basics, and creative ad generators.",
      "Generative AI tools suite training: ChatGPT Plus, Midjourney, Perplexity, and Make.com automation workflows.",
      "Free high-speed staging server and live WordPress website domain for every individual trainee.",
      "Google Tag Manager (GTM) server-side tagging and GA4 event instrumentation credentials.",
    ],
  },
  {
    id: "support",
    name: "Student Support & Backup Policy",
    description: "Zero risk learning environment with lifetime backup protections.",
    icon: ShieldCheck,
    items: [
      "Zero-Fee repeat policy: attend backup sessions or repeat complex modules at no additional cost.",
      "Flexible schedule transitions: seamlessly switch between weekday morning, evening, or weekend batches.",
      "1-on-1 personalized doubt clearing desks available before and after every scheduled class.",
      "Lifetime LMS access with regularly updated high-definition video recordings of all modules.",
      "14 state-of-the-art physical campuses with high-speed fiber internet and individual student terminals.",
      "Central toll-free student helpline (+91 88005 05151) operational 7 days a week.",
    ],
  },
];

export default function WhyChooseDIDMPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredCategories = REASON_CATEGORIES.filter((cat) => {
    if (selectedCategory !== "all" && cat.id !== selectedCategory) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      cat.name.toLowerCase().includes(q) ||
      cat.description.toLowerCase().includes(q) ||
      cat.items.some((item) => item.toLowerCase().includes(q))
    );
  });

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Breadcrumb & Hero */}
        <div className="max-w-3xl space-y-4">
          <nav aria-label="Breadcrumb" className="text-xs font-mono text-neutral-500 flex items-center gap-2">
            <Link href="/" className="hover:text-brand-red">Home</Link>
            <span>/</span>
            <Link href="/about" className="hover:text-brand-red">About Us</Link>
            <span>/</span>
            <span className="text-neutral-900 dark:text-white font-semibold">Why Choose DIDM</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red-soft dark:bg-brand-red/10 text-brand-red text-xs font-mono font-semibold">
            INSTITUTIONAL DIFFERENTIATORS &amp; VALUES
          </div>

          <h1 className="text-3xl sm:text-5xl font-normal text-neutral-900 dark:text-white leading-[1.08]">
            Why choose DIDM? <em>Real proof</em>, live agency execution, and career certainty.
          </h1>

          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Since 2014, Delhi Institute of Digital Marketing has trained over 61,500+ graduates across 14 campuses. Explore the practical factors that differentiate our training from generic video courses and textbook diplomas.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="p-6 rounded-3xl bg-neutral-100/70 dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search reasons or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:border-brand-red"
              />
            </div>

            <div className="flex items-center gap-1.5 flex-wrap w-full sm:w-auto">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`text-xs px-3 py-1.5 rounded-full font-semibold transition ${
                  selectedCategory === "all"
                    ? "bg-brand-red text-white"
                    : "bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                }`}
              >
                All Differentiators
              </button>
              {REASON_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`text-xs px-3 py-1.5 rounded-full font-semibold transition ${
                    selectedCategory === cat.id
                      ? "bg-brand-red text-white"
                      : "bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                  }`}
                >
                  {cat.name.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Reason Sections */}
        <div className="space-y-12">
          {filteredCategories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.id}
                className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-6"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-red/10 text-brand-red flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white">
                      {category.name}
                    </h2>
                    <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
                      {category.description}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {category.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-100 dark:border-neutral-800/80 flex items-start gap-3 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Callout Action */}
        <div className="p-8 sm:p-12 rounded-3xl bg-neutral-900 text-white space-y-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl space-y-2">
            <span className="text-xs font-mono uppercase text-brand-red font-bold">
              Ready to verify for yourself?
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold">
              Sit in on a live session before making your commitment.
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400">
              Speak with current students, test our campus facilities, and inspect live campaign ROAS results.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/enquire"
              className="btn-red text-xs sm:text-sm px-6 py-3 font-bold flex items-center gap-2"
            >
              <span>Book Demo Class</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/programs/master-in-digital-marketing-course"
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-xs sm:text-sm font-semibold transition border border-white/20"
            >
              Explore 52 Roadmap
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


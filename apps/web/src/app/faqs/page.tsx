"use client";

import { useState } from "react";
import Link from "next/link";
import {
  HelpCircle,
  Search,
  ChevronDown,
  Sparkles,
  Phone,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import faqsData from "@/data/website/about-faqs.json";
import { SITE_BRAND } from "@/lib/content";

export default function FAQsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    "faq-01": true,
    "faq-02": true,
  });

  const faqs = faqsData.faqs;

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredFaqs = faqs.filter((faq) => {
    if (selectedCategory !== "all" && faq.normalized_content.category !== selectedCategory) {
      return false;
    }
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      faq.normalized_content.question.toLowerCase().includes(q) ||
      faq.normalized_content.answer.toLowerCase().includes(q)
    );
  });

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.normalized_content.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.normalized_content.answer,
      },
    })),
  };

  return (
    <div className="py-12 md:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Breadcrumb & Header */}
        <div className="max-w-3xl space-y-4">
          <nav aria-label="Breadcrumb" className="text-xs font-mono text-neutral-500 flex items-center gap-2">
            <Link href="/" className="hover:text-brand-red">Home</Link>
            <span>/</span>
            <span className="text-neutral-900 dark:text-white font-semibold">Frequently Asked Questions</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red-soft dark:bg-brand-red/10 text-brand-red text-xs font-mono font-semibold">
            ADMISSIONS, BATCHES &amp; PLACEMENT POLICIES
          </div>

          <h1 className="text-3xl sm:text-5xl font-normal text-neutral-900 dark:text-white leading-[1.08]">
            Frequently asked questions &amp; <em>student policies</em>.
          </h1>

          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Find clear, transparent answers about backup classes, doubt sessions, placement cell commitments, LMS access, and schedule flexibility across all DIDM branches.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="p-6 rounded-3xl bg-neutral-100/70 dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search queries or policies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:border-brand-red"
              />
            </div>

            <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`text-xs px-3.5 py-1.5 rounded-full font-semibold transition ${
                  selectedCategory === "all"
                    ? "bg-brand-red text-white"
                    : "bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                }`}
              >
                All Questions ({faqs.length})
              </button>
              <button
                onClick={() => setSelectedCategory("Admissions & Academics")}
                className={`text-xs px-3.5 py-1.5 rounded-full font-semibold transition ${
                  selectedCategory === "Admissions & Academics"
                    ? "bg-brand-red text-white"
                    : "bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                }`}
              >
                Admissions &amp; Academics
              </button>
              <button
                onClick={() => setSelectedCategory("Career & Placements")}
                className={`text-xs px-3.5 py-1.5 rounded-full font-semibold transition ${
                  selectedCategory === "Career & Placements"
                    ? "bg-brand-red text-white"
                    : "bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                }`}
              >
                Career &amp; Placements
              </button>
            </div>
          </div>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = !!openItems[faq.id];
            return (
              <div
                key={faq.id}
                className="rounded-2xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-neutral-50 dark:hover:bg-neutral-800/40 transition"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-brand-red/10 text-brand-red flex items-center justify-center text-xs font-mono shrink-0">
                      ?
                    </span>
                    <span>{faq.normalized_content.question}</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-brand-red" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed border-t border-neutral-100 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-neutral-900/20">
                    <p>{faq.normalized_content.answer}</p>
                    <div className="mt-3 flex items-center gap-2 text-[11px] font-mono text-neutral-400">
                      <span>Category: {faq.normalized_content.category}</span>
                      <span>·</span>
                      <span>Source: Official DIDM Policy</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* AI Counsellor Cross-Link Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-neutral-900 text-white space-y-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-brand-red font-bold">
              <Sparkles className="w-4 h-4" />
              <span>Brochure-Grounded AI Counsellor</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold">
              Have a specific question not covered here?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400">
              Ask our deterministic AI Course Counsellor about fee plans, 52-stop topics, batch start dates, or campus metro routes.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/#counsellor"
              className="btn-red text-xs sm:text-sm px-6 py-3 font-bold flex items-center gap-2"
            >
              <span>Ask AI Counsellor</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`tel:${SITE_BRAND.phoneClean}`}
              className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-xs sm:text-sm font-semibold transition border border-white/20"
            >
              Call 88005 05151
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}


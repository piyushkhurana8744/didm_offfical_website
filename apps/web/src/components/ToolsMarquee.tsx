"use client";

import { useState } from "react";
import { Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getToolIconComponent } from "@/components/BrandIcons";

interface ToolItem {
  name: string;
  category: "PPC & Ads" | "SEO & Content" | "Gen AI" | "Analytics & CRM" | "Social & Media";
  role: string;
  badge?: string;
  color: string;
}

const TOOLS_DATA: ToolItem[] = [
  // PPC & Ads
  { name: "Google Ads", category: "PPC & Ads", role: "Search, Display, Performance Max, YouTube Ads", badge: "Live Budget", color: "border-blue-500/30 text-blue-600 dark:text-blue-400" },
  { name: "Meta Ads Manager", category: "PPC & Ads", role: "Instagram & Facebook Conversion Funnels & Retargeting", badge: "Live Budget", color: "border-indigo-500/30 text-indigo-600 dark:text-indigo-400" },
  { name: "LinkedIn Campaign Mgr", category: "PPC & Ads", role: "High-Ticket B2B Lead Gen & Account-Based Marketing", color: "border-sky-500/30 text-sky-600 dark:text-sky-400" },
  { name: "Taboola & Outbrain", category: "PPC & Ads", role: "Native Advertising & Arbitrage Funnels", color: "border-cyan-500/30 text-cyan-600 dark:text-cyan-400" },

  // SEO & Content
  { name: "SEMrush", category: "SEO & Content", role: "Competitor Keyword Gap, Backlink Audit & Position Tracking", badge: "Pro Suite", color: "border-amber-500/30 text-amber-600 dark:text-amber-400" },
  { name: "Ahrefs", category: "SEO & Content", role: "Domain Authority, Broken Link Building & Content Explorer", color: "border-orange-500/30 text-orange-600 dark:text-orange-400" },
  { name: "Google Search Console", category: "SEO & Content", role: "Crawl Error Resolution, Core Web Vitals, Indexing", color: "border-blue-500/30 text-blue-600 dark:text-blue-400" },
  { name: "Screaming Frog", category: "SEO & Content", role: "Technical On-Page Audits, Broken Redirects, Schema Crawling", color: "border-emerald-500/30 text-emerald-600 dark:text-emerald-400" },
  { name: "Yoast / RankMath", category: "SEO & Content", role: "WordPress On-Page SEO & XML Sitemap Automation", color: "border-purple-500/30 text-purple-600 dark:text-purple-400" },

  // Gen AI & Automation
  { name: "ChatGPT-4o & Canvas", category: "Gen AI", role: "Marketing Copy, Strategy Frameworks, Ad Script Generation", badge: "AI Core", color: "border-emerald-500/30 text-emerald-600 dark:text-emerald-400" },
  { name: "Claude 3.7 Sonnet", category: "Gen AI", role: "Long-Form Content, Data Extraction & Email Sequences", badge: "AI Core", color: "border-amber-500/30 text-amber-600 dark:text-amber-400" },
  { name: "Midjourney v6", category: "Gen AI", role: "Photorealistic Ad Creatives, Thumbnails & Visual Moodboards", badge: "AI Core", color: "border-violet-500/30 text-violet-600 dark:text-violet-400" },
  { name: "Zapier & Make", category: "Gen AI", role: "Automating Lead Routing from Facebook Ads directly to WhatsApp & CRM", color: "border-orange-500/30 text-orange-600 dark:text-orange-400" },

  // Analytics & CRM
  { name: "Google Analytics 4 (GA4)", category: "Analytics & CRM", role: "Event-Based Tracking, User Journeys, Funnel Explorations", badge: "Core Metric", color: "border-amber-500/30 text-amber-600 dark:text-amber-400" },
  { name: "Looker Studio", category: "Analytics & CRM", role: "Executive Client Dashboards & Automated Automated KPI Reports", color: "border-blue-500/30 text-blue-600 dark:text-blue-400" },
  { name: "Google Tag Manager", category: "Analytics & CRM", role: "Custom Trigger Deployment, Conversion Pixels & DataLayer", color: "border-blue-500/30 text-blue-600 dark:text-blue-400" },
  { name: "HubSpot CRM", category: "Analytics & CRM", role: "Inbound Lead Pipelines, Email Drip Automations, Deal Stages", color: "border-orange-500/30 text-orange-600 dark:text-orange-400" },
  { name: "Hotjar", category: "Analytics & CRM", role: "Heatmaps, Session Recordings & CRO Landing Page Audits", color: "border-rose-500/30 text-rose-600 dark:text-rose-400" },

  // Social & Media
  { name: "Canva Pro", category: "Social & Media", role: "High-Converting Ad Banners, Carousels & Social Assets", color: "border-cyan-500/30 text-cyan-600 dark:text-cyan-400" },
  { name: "Mailchimp / Klaviyo", category: "Social & Media", role: "E-Commerce Abandoned Cart Flows & Newsletter Marketing", color: "border-amber-500/30 text-amber-600 dark:text-amber-400" },
  { name: "Shopify & WooCommerce", category: "Social & Media", role: "Full E-Commerce Store Setup, Payment Gateways & Product SEO", color: "border-emerald-500/30 text-emerald-600 dark:text-emerald-400" },
  { name: "WordPress CMS", category: "Social & Media", role: "Custom Website Architecture, Landing Pages, Elementor Pro", color: "border-blue-500/30 text-blue-600 dark:text-blue-400" },
];

export function ToolsMarquee() {
  const [selectedCat, setSelectedCat] = useState<string>("All");

  const categories = ["All", "PPC & Ads", "SEO & Content", "Gen AI", "Analytics & CRM", "Social & Media"];

  const filtered = selectedCat === "All" ? TOOLS_DATA : TOOLS_DATA.filter((t) => t.category === selectedCat);

  return (
    <section className="py-16 md:py-24 bg-[#FBFAF7] dark:bg-[#0A0A0E] border-t border-neutral-200/80 dark:border-neutral-800/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red-soft dark:bg-brand-red/10 text-brand-red text-xs font-mono font-bold uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>40+ Industry Tools & AI Suites</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-normal text-neutral-900 dark:text-white leading-tight">
              Master the exact software stack used by <em>top advertising agencies</em>.
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
              Zero simulated screenshots. You work inside real active enterprise tools, set up conversion pixels, manage actual ad budgets, and build live client dashboards.
            </p>
          </div>

          <Link
            href="/programs"
            className="text-xs sm:text-sm font-bold text-brand-red hover:underline flex items-center gap-1 shrink-0"
          >
            <span>See how tools are divided across modules</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 touch-scroll">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCat === cat
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-sm"
                  : "bg-white dark:bg-[#131319] text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400"
              }`}
            >
              {cat} {cat === "All" ? `(${TOOLS_DATA.length})` : ""}
            </button>
          ))}
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map((tool, idx) => {
            const ToolIcon = getToolIconComponent(tool.name);
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800/80 hover:border-brand-red/40 dark:hover:border-brand-red/40 transition-all card-hover flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-11 h-11 rounded-xl bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200/80 dark:border-neutral-700/60 p-2 flex items-center justify-center shrink-0 shadow-sm">
                      <ToolIcon className="w-7 h-7 object-contain" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      {tool.badge ? (
                        <span className="text-[9px] font-mono uppercase font-bold px-2 py-0.5 rounded-full bg-brand-red text-white shrink-0">
                          {tool.badge}
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono uppercase font-bold text-neutral-400 tracking-wider">
                          {tool.category}
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                      {tool.name}
                    </h3>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 leading-relaxed">
                      {tool.role}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-[11px] text-neutral-500">
                  <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Full Practical Access</span>
                  </span>
                  <span className="font-mono text-neutral-400">Included</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


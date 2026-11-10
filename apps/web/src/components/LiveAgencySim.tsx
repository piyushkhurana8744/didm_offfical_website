"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MousePointerClick,
  Search,
  Sparkles,
  BarChart,
  CheckCircle2,
  TrendingUp,
  DollarSign,
  ArrowRight,
  ShieldCheck,
  Eye,
  Send,
  Zap,
} from "lucide-react";

export function LiveAgencySim() {
  const [activeTab, setActiveTab] = useState<"google" | "meta" | "ai" | "ga4">("google");

  return (
    <section className="py-20 md:py-28 bg-white dark:bg-[#131319] border-t border-neutral-200/80 dark:border-neutral-800/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red-soft dark:bg-brand-red/10 text-brand-red text-xs font-mono font-bold uppercase">
            <span>THE DIDM AGENCY ADVANTAGE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-normal text-neutral-900 dark:text-white leading-[1.12]">
            Don&apos;t just watch boring slides. <em>Spend real ad budgets</em> in class.
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Other institutes teach marketing using theoretical PPT presentations. At DIDM, every student is backed with real advertising capital to create, target, launch, and optimize live campaigns on Google & Meta.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 touch-scroll border-b border-neutral-200 dark:border-neutral-800">
          {[
            { id: "google", label: "01. Google Search & PPC Ads", icon: Search },
            { id: "meta", label: "02. Instagram & Meta Funnels", icon: MousePointerClick },
            { id: "ai", label: "03. Gen AI Creative Automation", icon: Sparkles },
            { id: "ga4", label: "04. GA4 Analytics & Attribution", icon: BarChart },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 py-3 px-4 sm:px-5 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
                  isSelected
                    ? "border-brand-red text-brand-red"
                    : "border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Tab Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
          {/* Left Explanation Column */}
          <div className="lg:col-span-5 space-y-6">
            {activeTab === "google" && (
              <div className="space-y-4 animate-in fade-in">
                <span className="text-xs font-mono uppercase text-blue-600 dark:text-blue-400 font-bold">
                  GOOGLE ADS & PERFORMANCE MAX
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
                  Rank #1 on Google with high-intent commercial keywords.
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Learn bidding strategies (Target CPA, Target ROAS, Maximize Conversions), negative keyword pruning, and ad copy copywriting that drives 10/10 Quality Scores.
                </p>
                <ul className="space-y-2 text-xs text-neutral-700 dark:text-neutral-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Real Google Ads account setup with actual ad credit</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Search, Display, Performance Max & YouTube Video formats</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Conversion tracking with Google Tag Manager & GA4</span>
                  </li>
                </ul>
              </div>
            )}

            {activeTab === "meta" && (
              <div className="space-y-4 animate-in fade-in">
                <span className="text-xs font-mono uppercase text-indigo-600 dark:text-indigo-400 font-bold">
                  META ADS MANAGER & INSTAGRAM LEADS
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
                  Build scroll-stopping carousel ads and high-converting lead forms.
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Master Meta&apos;s Advantage+ audience targeting, custom lookalike audiences from customer lists, and instant lead generation forms with automated WhatsApp webhook integration.
                </p>
                <ul className="space-y-2 text-xs text-neutral-700 dark:text-neutral-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Instagram Story, Reel, and Feed creative optimization</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Meta Pixel & Conversions API (CAPI) server-side setup</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Reducing Cost-Per-Lead (CPL) through A/B split testing</span>
                  </li>
                </ul>
              </div>
            )}

            {activeTab === "ai" && (
              <div className="space-y-4 animate-in fade-in">
                <span className="text-xs font-mono uppercase text-ai dark:text-ai-dark font-bold">
                  GENERATIVE AI MARKETING WORKFLOWS
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
                  Produce 50 ad variations in minutes with AI prompt engineering.
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Say goodbye to creative burnout. Use Midjourney for striking visual assets, Claude 3.7 for nuanced marketing angles, and ChatGPT to automate competitor research.
                </p>
                <ul className="space-y-2 text-xs text-neutral-700 dark:text-neutral-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Photorealistic Midjourney product ad photography</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Automated Zapier pipelines from ad clicks to CRM updates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>AI SEO keyword clustering & automatic content outlines</span>
                  </li>
                </ul>
              </div>
            )}

            {activeTab === "ga4" && (
              <div className="space-y-4 animate-in fade-in">
                <span className="text-xs font-mono uppercase text-amber-600 dark:text-amber-400 font-bold">
                  GOOGLE ANALYTICS 4 & LOOKER STUDIO
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
                  Know exactly which rupee of ad spend brought revenue.
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Modern marketing managers are judged on data. Master multi-touch attribution, user journey exploration, custom events, and automated Looker Studio executive reports.
                </p>
                <ul className="space-y-2 text-xs text-neutral-700 dark:text-neutral-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Full event-driven data model in Google Analytics 4</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Client-ready real-time executive dashboard generation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>E-commerce revenue tracking & drop-off funnel audits</span>
                  </li>
                </ul>
              </div>
            )}

            <div className="pt-2">
              <Link href="/enquire" className="btn-red text-xs py-3 px-6 font-bold shadow-md shadow-brand-red/25">
                <span>Attend Free Live Ad Class</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>

          {/* Right Visual Simulation Mockup */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-neutral-950 text-white border border-neutral-800 shadow-2xl relative overflow-hidden">
            {/* Window Top Bar Mockup */}
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800 text-xs font-mono text-neutral-400">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-2 text-neutral-300 font-semibold">DIDM Practical Agency Lab // Real Campaign Preview</span>
              </div>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Broadcast
              </span>
            </div>

            {/* Simulated Workspace Content */}
            <div className="py-6 space-y-6">
              {activeTab === "google" && (
                <div className="space-y-4 animate-in zoom-in-95">
                  <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                      <span className="text-blue-400 font-bold uppercase">Google Search Ad Preview</span>
                      <span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full font-bold">Ad Rank #1</span>
                    </div>
                    <div className="text-xs text-neutral-400 font-mono">
                      Sponsored · https://clientbrand.com/summer-sale
                    </div>
                    <h4 className="text-base font-bold text-white hover:underline cursor-pointer">
                      Scale Your E-Commerce Revenue | 100% Guaranteed High-ROAS Agency
                    </h4>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      Stop losing money on generic keywords. Target high-intent buyers with machine-learning smart bidding & dynamic search creatives. Book a strategy call today.
                    </p>
                    <div className="flex items-center gap-4 text-xs font-mono text-neutral-400 pt-2 border-t border-neutral-800/60">
                      <span>Quality Score: <strong className="text-emerald-400">10/10</strong></span>
                      <span>Avg CPC: <strong className="text-white">₹14.20</strong></span>
                      <span>CTR: <strong className="text-white">8.9%</strong></span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800">
                      <div className="text-neutral-400 text-[10px] uppercase font-mono">Total Budget Spent</div>
                      <div className="text-lg font-bold text-white mt-1">₹48,200</div>
                      <div className="text-emerald-400 text-[10px] mt-0.5">₹50,000 Cap Allocated</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800">
                      <div className="text-neutral-400 text-[10px] uppercase font-mono">Total Verified Revenue</div>
                      <div className="text-lg font-bold text-brand-red mt-1">₹2,31,360</div>
                      <div className="text-emerald-400 text-[10px] mt-0.5">ROAS 4.8x Achieved</div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "meta" && (
                <div className="space-y-4 animate-in zoom-in-95">
                  <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col sm:flex-row gap-4 items-center">
                    <div className="relative w-full sm:w-44 aspect-square rounded-xl overflow-hidden bg-neutral-800 shrink-0">
                      <Image
                        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop"
                        alt="Meta Instagram Feed Creative"
                        fill
                        className="object-cover"
                      />
                      <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-sm text-[9px] font-mono text-white">
                        Instagram Sponsored
                      </span>
                    </div>
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
                        <span>Audience: 24-38 Founders (Delhi NCR)</span>
                        <span className="text-emerald-400 font-bold">Active</span>
                      </div>
                      <h4 className="text-sm font-bold text-white">
                        High-Converting Instant Lead Form Campaign
                      </h4>
                      <p className="text-xs text-neutral-300">
                        Zero drop-off form fills natively on Instagram with automated phone verification and direct CRM webhook sync.
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-2 border-t border-neutral-800">
                        <div>Leads: <strong className="text-white">1,420</strong></div>
                        <div>Cost/Lead: <strong className="text-emerald-400">₹42.10</strong></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "ai" && (
                <div className="space-y-4 animate-in zoom-in-95">
                  <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 font-mono text-xs space-y-2.5">
                    <div className="text-ai font-bold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Midjourney v6 Prompt Engineering:</span>
                    </div>
                    <div className="p-3 rounded-xl bg-neutral-950 text-neutral-300 text-[11px] leading-relaxed border border-neutral-800">
                      /imagine prompt: luxury skincare bottle placed on wet marble with morning sun caustic reflections, photorealistic 8k, commercial product ad aesthetic, Hasselblad 80mm --ar 4:5 --v 6.0
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-1">
                      <span className="text-emerald-400">✓ 4 High-Res Ad Variants Generated in 18s</span>
                      <span>Ready for Meta Carousel</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "ga4" && (
                <div className="space-y-4 animate-in zoom-in-95">
                  <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                      <span>GA4 Funnel Exploration (Session to Purchase)</span>
                      <span className="text-amber-400 font-bold">100% Verified</span>
                    </div>
                    <div className="space-y-2">
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-neutral-300 font-mono">
                          <span>1. Landing Page Sessions</span>
                          <span>42,800 (100%)</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-neutral-800 overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full w-full" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-neutral-300 font-mono">
                          <span>2. Product Page View</span>
                          <span>21,400 (50.0%)</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-neutral-800 overflow-hidden">
                          <div className="h-full bg-indigo-500 rounded-full w-1/2" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-neutral-300 font-mono">
                          <span>3. Add to Cart</span>
                          <span>6,848 (16.0%)</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-neutral-800 overflow-hidden">
                          <div className="h-full bg-amber-500 rounded-full w-[16%]" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-neutral-300 font-mono">
                          <span>4. Purchase Completed</span>
                          <span>2,054 (4.8%)</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-neutral-800 overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full w-[4.8%]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Simulation Footer Note */}
            <div className="pt-4 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-500">
              <span>Backed by ₹50,000 ad credit pool for practical classroom batches.</span>
              <span className="font-mono text-neutral-400">DIDM Lab OS 2026</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


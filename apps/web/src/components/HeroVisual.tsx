"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  TrendingUp,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  Users,
  Award,
  Zap,
  BarChart3,
  MousePointerClick,
  Layers,
  HelpCircle,
} from "lucide-react";
import { Advisor } from "./Advisor";
import type { VerifiedDidmMedia } from "@/data/didm-media";

export function HeroVisual({media}:{media?:VerifiedDidmMedia}) {
  const [activeTab, setActiveTab] = useState<"workspace" | "advisor">("workspace");

  return (
    <div className="w-full space-y-3">
      {/* Tab Selector Switcher */}
      <div className="flex items-center justify-between p-1.5 rounded-2xl bg-neutral-100/90 dark:bg-[#1A1A22] border border-neutral-200 dark:border-neutral-800">
        <button
          onClick={() => setActiveTab("workspace")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
            activeTab === "workspace"
              ? "bg-white dark:bg-[#131319] text-brand-red shadow-sm border border-neutral-200/60 dark:border-neutral-700/60"
              : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5 text-brand-red" />
          <span>Live Agency Ad Lab</span>
        </button>

        <button
          onClick={() => setActiveTab("advisor")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
            activeTab === "advisor"
              ? "bg-white dark:bg-[#131319] text-ai shadow-sm border border-neutral-200/60 dark:border-neutral-700/60"
              : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-ai" />
          <span>Find My Course Track</span>
        </button>
      </div>

      {activeTab === "advisor" ? (
        <Advisor />
      ) : (
        /* Live Marketing Workspace Showcase Card */
        <div className="rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 p-5 sm:p-7 shadow-2xl space-y-6 relative overflow-hidden group">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-brand-red/10 dark:bg-brand-red/15 rounded-full blur-3xl pointer-events-none" />

          {/* Top Status Header */}
          <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-4">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-semibold">
                  STUDENT CAMPAIGN CONSOLE
                </div>
                <div className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
                  <span>Google & Meta Live Ad Spend</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono font-bold">
                    Active
                  </span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-[10px] font-mono uppercase text-neutral-400">Live Ad Budget</div>
              <div className="text-xs sm:text-sm font-extrabold text-brand-red">
                ₹50,000 Included
              </div>
            </div>
          </div>

          {/* Live Campaign Metrics Grid */}
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
            {/* Metric 1 */}
            <div className="p-3 sm:p-3.5 rounded-2xl bg-neutral-50 dark:bg-[#1A1A22] border border-neutral-100 dark:border-neutral-800">
              <div className="flex items-center justify-between text-neutral-400 text-[10px] font-mono">
                <span>Google ROAS</span>
                <TrendingUp className="w-3 h-3 text-emerald-500" />
              </div>
              <div className="text-lg sm:text-2xl font-extrabold text-neutral-900 dark:text-white mt-1">
                4.8x
              </div>
              <div className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5 mt-0.5">
                <span>+312% ROI</span>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="p-3 sm:p-3.5 rounded-2xl bg-neutral-50 dark:bg-[#1A1A22] border border-neutral-100 dark:border-neutral-800">
              <div className="flex items-center justify-between text-neutral-400 text-[10px] font-mono">
                <span>Cost / Lead</span>
                <MousePointerClick className="w-3 h-3 text-blue-500" />
              </div>
              <div className="text-lg sm:text-2xl font-extrabold text-neutral-900 dark:text-white mt-1">
                ₹42
              </div>
              <div className="text-[10px] text-neutral-500 font-medium mt-0.5">
                Meta High-Intent
              </div>
            </div>

            {/* Metric 3 */}
            <div className="p-3 sm:p-3.5 rounded-2xl bg-neutral-50 dark:bg-[#1A1A22] border border-neutral-100 dark:border-neutral-800">
              <div className="flex items-center justify-between text-neutral-400 text-[10px] font-mono">
                <span>SEO Rank</span>
                <Award className="w-3 h-3 text-amber-500" />
              </div>
              <div className="text-lg sm:text-2xl font-extrabold text-neutral-900 dark:text-white mt-1">
                #1 Page
              </div>
              <div className="text-[10px] text-amber-600 font-medium mt-0.5">
                Organic Traffic
              </div>
            </div>
          </div>

          {/* Visual Workspace Hero Banner */}
          <div className="relative rounded-2xl overflow-hidden border border-neutral-200/80 dark:border-neutral-700/80 bg-neutral-950 aspect-[16/9] sm:aspect-[16/8]">
            <Image
              src={media?.path||"https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop"}
              alt={media?.alt||"DIDM Agency Digital Marketing Classroom & Live Strategy Workshop"}
              fill
              className="object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full bg-brand-red text-white text-[10px] font-mono font-bold tracking-wider uppercase">
                  DELHI NCR · 14 CAMPUSES
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-medium">
                  Agency Floor Training
                </span>
              </div>
              <h4 className="text-white text-sm sm:text-base font-bold leading-snug">
                You build real PPC campaigns, scale client budgets & get hired.
              </h4>
              <p className="text-neutral-300 text-[11px] sm:text-xs mt-0.5 line-clamp-1">
                Practical in-person learning with guided campaign exercises and faculty support.
              </p>
            </div>
          </div>

          {/* Partner Badges Strip */}
          <div className="space-y-2 pt-1">
            <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-semibold">
              OFFICIAL INDUSTRY CURRICULUM ALIGNMENT
            </div>
            <div className="flex items-center justify-between gap-2 text-xs font-semibold text-neutral-700 dark:text-neutral-300 flex-wrap">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-red" />
                <span>Google Premier Partner</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                <span>Meta Certified Partner</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
                <span>HubSpot Academy</span>
              </span>
            </div>
          </div>

          {/* Quick Bottom Action Button */}
          <div className="pt-2 flex items-center justify-between gap-3 border-t border-neutral-100 dark:border-neutral-800">
            <span className="text-[11px] text-neutral-500">
              Weekend & Weekday Batches starting next Monday.
            </span>
            <Link
              href="/enquire"
              className="btn-red text-xs py-2 px-4 font-bold shrink-0 shadow-md shadow-brand-red/20"
            >
              <span>Book Demo Slot</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}


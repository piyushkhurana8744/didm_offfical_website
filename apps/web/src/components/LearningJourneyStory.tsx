"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Layers,
  ChevronRight,
  ChevronLeft,
  Laptop,
} from "lucide-react";
import { DIDM_MEDIA } from "@/data/didm-media";
import { TiltCard } from "./motion/TiltCard";
import { RevealOnScroll } from "./motion/RevealOnScroll";
import { MaskedImageReveal } from "./motion/MaskedImageReveal";

export function LearningJourneyStory() {
  const [activeStage, setActiveStage] = useState(0);

  const stages = [
    {
      id: "foundations",
      num: "01",
      title: "Foundations & Conversion UX",
      tagline: "Build live web properties before running a single rupee of ads.",
      summary:
        "Master domain DNS, CDN caching, mobile responsiveness, WordPress architectures, and high-converting landing page layouts with Google Tag Manager data-layers configured from scratch.",
      deliverable: "Live responsive brand website with functional GA4 and GTM tracking tags.",
      tools: ["WordPress", "Elementor", "Google Tag Manager", "Cloudflare", "Hotjar"],
      media: DIDM_MEDIA.digitalMarketingCourseBanner,
      badge: "Week 01–04",
    },
    {
      id: "seo",
      num: "02",
      title: "Semantic SEO & AI Search (GEO)",
      tagline: "Master entity authority, topic clusters, and AI Overview citations.",
      summary:
        "Go beyond basic meta tags. Conduct in-depth competitor gap analysis, structure JSON-LD schema, audit crawl budgets with Screaming Frog, and rank for high-intent transactional search queries.",
      deliverable: "Complete technical SEO audit and top-page organic ranking case study.",
      tools: ["Semrush", "Ahrefs", "Screaming Frog", "Google Search Console", "SurferSEO"],
      media: DIDM_MEDIA.midmCourse,
      badge: "Week 05–08",
    },
    {
      id: "performance",
      num: "03",
      title: "Performance Advertising & Media Buying",
      tagline: "Build live advertising campaigns across search and social channels.",
      summary:
        "Learn hands-on campaign architecture across Google Search, Performance Max, and Meta Ads Manager. Configure server-side tracking and evaluate real cost-per-acquisition performance.",
      deliverable: "Live-configured PPC campaign setup with conversion tracking reporting.",
      tools: ["Google Ads", "Meta Ads Manager", "Looker Studio", "CapCut", "Google Analytics 4"],
      media: DIDM_MEDIA.corporateTraining,
      badge: "Week 09–12",
    },
    {
      id: "agency",
      num: "04",
      title: "2-Month Live Agency Floor",
      tagline: "Transition from candidate to practicing agency strategist.",
      summary:
        "Work on practical brand case studies during the 2-month agency floor training. Handle campaign optimization, creative review pipelines, and present professional marketing reports.",
      deliverable: "Verified 2-Month Agency Training Certificate & Practical Portfolio.",
      tools: ["Slack", "Asana", "Canva", "Google Docs", "Spreadsheets"],
      media: DIDM_MEDIA.noidaCentre,
      badge: "Month 04–05",
    },
    {
      id: "career",
      num: "05",
      title: "Placement Drives & Career Preparation",
      tagline: "Connect with our network of 650+ corporate and agency hiring partners.",
      summary:
        "Personalized resume proofing, technical mock interview panels with industry practitioners, salary guidance, and active interview drives across partner digital agencies.",
      deliverable: "Dedicated Placement Assistance & Campus Interview Invitations.",
      tools: ["LinkedIn Career Optimization", "Portfolio Deck", "Interview Prep Modules"],
      media: DIDM_MEDIA.collegeTraining,
      badge: "Graduation & Beyond",
    },
  ];

  const current = stages[activeStage] || stages[0];

  return (
    <section className="py-20 sm:py-28 border-t border-neutral-200/80 dark:border-neutral-800/80 bg-[#FBFAF7] dark:bg-[#08080C] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <RevealOnScroll direction="up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red-soft dark:bg-brand-red/10 text-brand-red text-xs font-mono font-semibold">
              <Layers className="w-3.5 h-3.5" />
              <span>THE 5-PHASE PEDAGOGY</span>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delayMs={100} direction="up">
            <h2 className="text-3xl sm:text-5xl font-normal text-neutral-900 dark:text-white leading-[1.08]">
              From first principle to <em>practicing strategist</em>.
            </h2>
          </RevealOnScroll>

          <RevealOnScroll delayMs={200} direction="up">
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Every DIDM candidate navigates a structured 5-phase practical progression designed to build authentic execution muscle. Explore each stage of your learning journey:
            </p>
          </RevealOnScroll>
        </div>

        {/* Interactive Brahma-Inspired Progress Timeline Bar */}
        <div className="space-y-4">
          {/* Timeline Buttons */}
          <div
            role="tablist"
            className="grid grid-cols-2 sm:grid-cols-5 gap-3 p-2 rounded-2xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 shadow-sm"
          >
            {stages.map((stage, idx) => {
              const isActive = activeStage === idx;
              return (
                <button
                  key={stage.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveStage(idx)}
                  className={`p-3 sm:p-4 rounded-xl text-left transition-all duration-300 relative ${
                    isActive
                      ? "bg-brand-red text-white shadow-lg shadow-brand-red/25 scale-[1.02]"
                      : "hover:bg-neutral-100 dark:hover:bg-neutral-800/60 text-neutral-600 dark:text-neutral-400"
                  }`}
                >
                  <div className="text-[10px] font-mono uppercase tracking-wider opacity-80">
                    Phase {stage.num}
                  </div>
                  <div
                    className={`text-xs sm:text-sm font-bold truncate mt-0.5 ${
                      isActive ? "text-white" : "text-neutral-900 dark:text-white"
                    }`}
                  >
                    {stage.title.split("&")[0]}
                  </div>
                  <div className="text-[10px] font-mono opacity-70 mt-1 truncate">
                    {stage.badge}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Progress Line indicator */}
          <div className="h-1 w-full bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-red transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                width: `${((activeStage + 1) / stages.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Active Stage Showcase Card */}
        <div className="rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200/80 dark:border-neutral-800/80 p-6 sm:p-10 shadow-2xl overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-brand-red font-bold uppercase tracking-wider">
                  <span>Phase {current.num}</span>
                  <span>·</span>
                  <span>{current.badge}</span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-normal text-neutral-900 dark:text-white leading-snug">
                  {current.title}
                </h3>
                <p className="text-base text-neutral-700 dark:text-neutral-300 font-medium leading-relaxed">
                  {current.tagline}
                </p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed pt-1">
                  {current.summary}
                </p>
              </div>

              {/* Tangible Portfolio Deliverable Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-brand-red-soft/30 dark:bg-brand-red/10 border border-brand-red/20 space-y-1">
                <div className="text-[10px] font-mono uppercase text-brand-red font-bold">
                  Tangible Portfolio Proof You Build:
                </div>
                <div className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                  <span>{current.deliverable}</span>
                </div>
              </div>

              {/* Tools Mastered in this Phase */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-neutral-400 uppercase font-semibold">
                  Tools &amp; Protocols Mastered in Phase {current.num}
                </span>
                <div className="flex flex-wrap gap-2">
                  {current.tools.map((tool, i) => (
                    <span
                      key={i}
                      className="text-xs font-mono px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 font-medium"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Phase Quick Switchers */}
              <div className="pt-4 flex items-center justify-between border-t border-neutral-100 dark:border-neutral-800 text-xs">
                <button
                  onClick={() => setActiveStage((prev) => (prev > 0 ? prev - 1 : stages.length - 1))}
                  className="font-mono text-neutral-500 hover:text-neutral-900 dark:hover:text-white flex items-center gap-1 transition"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous Phase</span>
                </button>
                <button
                  onClick={() => setActiveStage((prev) => (prev < stages.length - 1 ? prev + 1 : 0))}
                  className="font-mono text-brand-red font-bold hover:underline inline-flex items-center gap-1 transition"
                >
                  <span>Next: Phase {stages[(activeStage + 1) % stages.length]?.num}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Media Preview with Tilt & Masked Reveal */}
            <div className="lg:col-span-5">
              <TiltCard maxTiltDeg={6} glare={true} className="rounded-3xl shadow-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-900">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    key={current.id}
                    src={current.media.path}
                    alt={current.media.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 450px"
                    className="object-cover transition-opacity duration-500"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-brand-red font-bold block">
                      Authentic DIDM Classroom &amp; Lab
                    </span>
                    <p className="text-xs font-medium text-neutral-200 mt-0.5 truncate">
                      {current.media.alt}
                    </p>
                  </div>
                </div>
              </TiltCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

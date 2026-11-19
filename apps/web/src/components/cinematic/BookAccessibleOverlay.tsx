"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Sparkles, Award, MapPin, ChevronDown } from "lucide-react";

interface BookAccessibleOverlayProps {
  scrollProgress: number;
  onSelectStage: (stageProgress: number) => void;
  onOpenEnquiryModal: () => void;
}

export function BookAccessibleOverlay({
  scrollProgress,
  onSelectStage,
  onOpenEnquiryModal,
}: BookAccessibleOverlayProps) {
  // Determine active storytelling chapter based on scroll progress
  let activeIndex = 0;
  if (scrollProgress >= 0.88) {
    activeIndex = 4;
  } else if (scrollProgress >= 0.68) {
    activeIndex = 3;
  } else if (scrollProgress >= 0.40) {
    activeIndex = 2;
  } else if (scrollProgress >= 0.15) {
    activeIndex = 1;
  } else {
    activeIndex = 0;
  }

  const chapters = [
    {
      id: "discover",
      stageProgress: 0.05,
      tag: "EST. 2014 • 10 YEARS OF EXCELLENCE",
      title: "Your Journey Into Digital Marketing",
      description:
        "Scroll to open the official curriculum handbook. Discover 52 comprehensive modules, Google & MSME certifications, and live agency campaign simulations.",
      hint: "Scroll Down to Open the Book",
    },
    {
      id: "chapter-1",
      stageProgress: 0.28,
      tag: "CHAPTER 01 • FOUNDATIONAL STRATEGY",
      title: "Master the Complete Digital Ecosystem",
      description:
        "Build the strategic foundation: understanding multi-channel funnels, consumer search psychology, market segmentation, and high-converting landing page architecture.",
      metric: "Modules 01 - 12 • 80% Practical Exposure",
    },
    {
      id: "chapter-2",
      stageProgress: 0.55,
      tag: "CHAPTER 02 • PERFORMANCE & SEARCH",
      title: "Scale Campaigns with Live Ad Budgets",
      description:
        "Manage live Google Ads budgets and Meta Ads Manager accounts on the agency floor. Master technical SEO algorithms, Quality Score, and conversion tracking.",
      metric: "Google Ads & Meta Certified Media Buying",
    },
    {
      id: "chapter-3",
      stageProgress: 0.78,
      tag: "CHAPTER 03 • AI & MARKETING ANALYTICS",
      title: "The Future is AI-Driven & Data-Backed",
      description:
        "Accelerate campaign velocity with generative AI prompt engineering. Measure exact ROI with Google Analytics 4 (GA4) and Google Tag Manager dataLayer pipelines.",
      metric: "ChatGPT-4o • Midjourney • GA4 • Looker Studio",
    },
    {
      id: "career-cta",
      stageProgress: 0.95,
      tag: "FROM CLASSROOM TO CAREER",
      title: "Step Into Your Professional Marketing Career",
      description:
        "Join 70,000+ successful alumni across 14+ campuses in Delhi NCR and across India. 500+ placement partners actively recruit DIDM graduates.",
      metric: "100% Placement Support • 14 Physical Campuses",
    },
  ];

  const currentChapter = chapters[activeIndex];

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 sm:p-10 lg:p-16 z-10">
      {/* Top Bar: Chapter Pills & Navigation (Pointer Events Enabled) */}
      <div className="pointer-events-auto flex flex-wrap items-center justify-between gap-4">
        {/* Chapter Steps Navigator */}
        <div className="inline-flex items-center gap-1.5 p-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 shadow-lg text-xs font-semibold text-white/80">
          {chapters.map((ch, idx) => (
            <button
              key={ch.id}
              onClick={() => onSelectStage(ch.stageProgress)}
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                activeIndex === idx
                  ? "bg-[#b52828] text-white shadow-md font-bold scale-105"
                  : "hover:bg-white/10 text-neutral-300"
              }`}
              title={ch.title}
            >
              {idx === 0 ? "Cover" : idx === 4 ? "Career" : `Ch 0${idx}`}
            </button>
          ))}
        </div>

        {/* Live Scroll Progress Pill */}
        <div className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-black/60 backdrop-blur-md border border-neutral-200 dark:border-white/10 text-xs font-mono text-neutral-800 dark:text-neutral-200 shadow-sm">
          <BookOpen className="w-3.5 h-3.5 text-[#b52828]" />
          <span>Curriculum Progress: {Math.round(scrollProgress * 100)}%</span>
        </div>
      </div>

      {/* Screen Reader ARIA Live Region */}
      <div className="sr-only" aria-live="polite">
        Current book stage: {currentChapter.title}. {currentChapter.description}
      </div>

      {/* Bottom Area: Dynamic Narrative Overlay Card & Action CTAs */}
      <div className="pointer-events-auto max-w-xl w-full">
        <div className="bg-white/95 dark:bg-[#12131add]/95 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-neutral-200/80 dark:border-white/10 shadow-2xl space-y-4 transform transition-all duration-300">
          {/* Eyebrow Tag */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#b52828] animate-pulse"></span>
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#b52828]">
              {currentChapter.tag}
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-neutral-900 dark:text-white tracking-tight leading-tight">
            {currentChapter.title}
          </h2>

          {/* Description */}
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
            {currentChapter.description}
          </p>

          {/* Dynamic Metric Pill if present */}
          {currentChapter.metric && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-neutral-100 dark:bg-white/5 text-neutral-700 dark:text-neutral-300 text-xs font-medium">
              <Award className="w-3.5 h-3.5 text-[#b52828]" />
              <span>{currentChapter.metric}</span>
            </div>
          )}

          {/* Hint for Scene 1 */}
          {currentChapter.hint && (
            <div className="flex items-center gap-2 text-xs font-semibold text-[#b52828] pt-1">
              <ChevronDown className="w-4 h-4 animate-bounce" />
              <span>{currentChapter.hint}</span>
            </div>
          )}

          {/* Real CTAs on Stage 5 (or accessible immediately on any stage) */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              href="/programs/master-in-digital-marketing-course"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#b52828] text-white hover:bg-[#9c1f1f] text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <span>Explore 52-Module Master</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={onOpenEnquiryModal}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-100 dark:bg-white/10 text-neutral-800 dark:text-white hover:bg-neutral-200 dark:hover:bg-white/20 text-xs sm:text-sm font-bold transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#b52828]" />
              <span>Book Free Demo</span>
            </button>

            <Link
              href="/centres"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-[#b52828] transition py-1 px-2"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>14 Delhi NCR Campuses</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


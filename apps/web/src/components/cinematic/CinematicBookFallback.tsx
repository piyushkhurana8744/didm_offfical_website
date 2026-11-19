"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, CheckCircle2, Award, Sparkles, MapPin } from "lucide-react";

interface CinematicBookFallbackProps {
  onOpenEnquiryModal: () => void;
}

export function CinematicBookFallback({ onOpenEnquiryModal }: CinematicBookFallbackProps) {
  const chapters = [
    {
      num: "01",
      title: "Foundational Strategy & Digital Ecosystem",
      desc: "Understand modern consumer search intent, multi-channel funnels, competitor research, and high-converting landing page UI/UX.",
      modules: "Modules 01 - 12",
      badge: "80% Practical Exposure",
    },
    {
      num: "02",
      title: "Performance Marketing & Search Excellence",
      desc: "Deploy live Google Ads and Meta budgets directly on agency floors. Master Technical SEO, Bidding Algorithms, and CAPI pipelines.",
      modules: "Modules 13 - 32",
      badge: "Google & Meta Certified",
    },
    {
      num: "03",
      title: "Generative AI Automation & Web Analytics",
      desc: "Accelerate campaign velocity with ChatGPT, Claude & Midjourney. Master Google Analytics 4 (GA4) and GTM custom attribution.",
      modules: "Modules 33 - 52",
      badge: "AI Marketing Stack",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#faf8f5] dark:bg-[#0c0d12] text-[#222222] dark:text-[#EAEAEA] border-y border-neutral-200 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#b52828]/10 text-[#b52828] text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Academic Curriculum • Est. 2014</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-neutral-900 dark:text-white">
            Your Journey Into Digital Marketing
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
            Explore the official 52-module Master curriculum. Designed on live agency workflows with 100% placement support across 14 Delhi NCR campuses.
          </p>
        </div>

        {/* 3 Editorial Spreads Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {chapters.map((ch) => (
            <div
              key={ch.num}
              className="bg-white dark:bg-[#14151e] p-6 sm:p-8 rounded-2xl border border-neutral-200 dark:border-white/10 shadow-sm hover:shadow-lg transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black font-serif text-[#b52828]">
                    {ch.num}
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-white/5 text-neutral-600 dark:text-neutral-400">
                    {ch.modules}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white leading-snug">
                  {ch.title}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {ch.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-100 dark:border-white/5 flex items-center justify-between text-xs font-semibold text-[#b52828]">
                <span>{ch.badge}</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-4 text-center">
          <Link
            href="/programs/master-in-digital-marketing-course"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#b52828] text-white hover:bg-[#9c1f1f] text-sm font-bold shadow-md hover:shadow-lg transition"
          >
            <span>Explore Full 52-Module Master Program</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <button
            onClick={onOpenEnquiryModal}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-white/10 text-neutral-800 dark:text-white border border-neutral-300 dark:border-white/20 hover:bg-neutral-50 text-sm font-bold transition cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#b52828]" />
            <span>Book Free Demo Session</span>
          </button>
        </div>
      </div>
    </section>
  );
}


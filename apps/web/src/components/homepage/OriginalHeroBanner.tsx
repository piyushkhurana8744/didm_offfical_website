"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, ShieldCheck, MapPin, GraduationCap, Award, MessageCircle, Star, Sparkles, Building2, CheckCircle2 } from "lucide-react";
import { FullBleedSection } from "@/components/common/FullBleedSection";
import { MotionSection, StaggeredCardGrid } from "@/components/motion";

export function OriginalHeroBanner() {
  return (
    <section className="relative bg-white dark:bg-[#0B0C10] border-b border-neutral-200 dark:border-neutral-800">
      {/* 1. Institutional Accreditation Top Ribbon */}
      <div className="bg-neutral-900 text-neutral-200 py-2.5 px-4 text-xs border-b border-neutral-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-red text-white text-[11px] font-bold font-heading tracking-wide uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Admissions Open 2026
            </span>
            <span className="hidden sm:inline text-neutral-300 font-medium text-[11px]">
              Delhi NCR&apos;s Premier Digital Marketing Institute · Estd. 2014
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-neutral-400 font-medium">
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Govt. Recognized:</span> ASSOCHAM &amp; MSME
            </span>
            <span className="hidden lg:inline text-neutral-600">|</span>
            <span className="hidden lg:flex items-center gap-1 text-neutral-300">
              <Building2 className="w-3.5 h-3.5 text-brand-red" />
              <span>14 Physical Campuses</span>
            </span>
            <span className="hidden lg:inline text-neutral-600">|</span>
            <span className="flex items-center gap-1 text-amber-400">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>4.9 / 5 Rating (12,000+ Reviews)</span>
            </span>
          </div>
        </div>
      </div>

      {/* 2. Full-Bleed Edge-to-Edge Hero Billboard Artwork */}
      <FullBleedSection className="bg-[#10121A] relative shadow-md">
        <div className="relative w-full aspect-[25/9] sm:aspect-[28/9] md:aspect-[3.75/1] min-h-[180px] sm:min-h-[260px] md:min-h-[340px] max-h-[500px]">
          <Image
            src="/images/didm/homepage/AI_powered_Master_in_Digital_marketing_Course_MIDM_by_DIDM__1_.webp"
            alt="AI-Powered Master in Digital Marketing Course (MIDM) by DIDM"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Subtle vignette gradient for edge polish */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/20 via-transparent to-black/20" />
        </div>
      </FullBleedSection>

      {/* 3. Hero Editorial Positioning, Heading & High-Impact CTAs */}
      <MotionSection preset="editorial" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-red/10 border border-brand-red/20 text-brand-red text-xs font-bold font-heading uppercase tracking-wide">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Practical Training with Live Google &amp; Meta Ad Budgets</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-neutral-900 dark:text-white leading-[1.15] font-heading tracking-tight">
            AI-Powered Digital Marketing Course in Delhi &amp; Across India
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto leading-relaxed">
            Master search engine optimization, performance advertising, social media scale, and generative AI workflows. Learn on live brand accounts with 2-month in-house agency floor experience at Online Strikers and 100% placement assurance across 14 campus locations.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-3">
            <a
              href="#demo-enquiry"
              className="btn-red text-sm sm:text-base py-3.5 px-7 font-bold flex items-center gap-2 rounded-xl shadow-lg shadow-brand-red/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Calendar className="w-4 h-4" />
              <span>Book 1-on-1 Free Demo Class</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <Link
              href="#courses"
              className="inline-flex items-center gap-2 py-3.5 px-6 sm:px-7 rounded-xl font-bold text-sm sm:text-base bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white border border-neutral-300 dark:border-neutral-700 hover:border-brand-red hover:text-brand-red transition shadow-xs"
            >
              <span>Explore 4 Accredited Programs</span>
            </Link>

            <a
              href="https://wa.me/918800505151?text=Hi%20DIDM%2C%20I%20am%20interested%20in%20learning%20more%20about%20your%20digital%20marketing%20courses."
              target="_blank"
              rel="noopener noreferrer"
              className="py-3.5 px-5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition flex items-center gap-2 text-sm font-bold shadow-xs"
              title="Chat on WhatsApp with Admissions Advisor"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Admissions WhatsApp</span>
            </a>
          </div>

          {/* Key Value Micro-Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-4 text-xs text-neutral-600 dark:text-neutral-400">
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>100% Placement Drives</span>
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>2-Month Agency Floor</span>
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>30+ Global Certifications</span>
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>0% Interest EMI Options</span>
            </span>
          </div>
        </div>

        {/* 4. Live Milestone Stats Bar with Staggered Entrance */}
        <StaggeredCardGrid staggerMs={70} className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-4">
          {[
            { metric: "50,000+", label: "Trained & Placed Alumni", sub: "Since 2014 across India" },
            { metric: "650+", label: "Hiring Agency Partners", sub: "MNCs, Startups & Brands" },
            { metric: "14", label: "Physical Training Campuses", sub: "Delhi NCR, Jaipur, Dehradun" },
            { metric: "4.9 ★", label: "Average Student Rating", sub: "Over 12,000+ verified reviews" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-2xl bg-neutral-50 dark:bg-[#14151C] border border-neutral-200 dark:border-neutral-800 text-center space-y-1 hover:border-brand-red/40 transition shadow-xs"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-red font-heading tracking-tight">
                {stat.metric}
              </div>
              <div className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white font-heading">
                {stat.label}
              </div>
              <div className="text-[11px] text-neutral-500 font-body">
                {stat.sub}
              </div>
            </div>
          ))}
        </StaggeredCardGrid>
      </MotionSection>
    </section>
  );
}


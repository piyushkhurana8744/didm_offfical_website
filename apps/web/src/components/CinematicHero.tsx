"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  MapPin,
  GraduationCap,
  Users,
  Award,
  Phone,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { TextReveal } from "./motion/TextReveal";
import { RevealOnScroll } from "./motion/RevealOnScroll";
import { MagneticButton } from "./motion/MagneticButton";
import { AnimatedCounter } from "./motion/AnimatedCounter";
import { DIDM_MEDIA, getVerifiedDidmMedia } from "@/data/didm-media";
import { HeroAIChatWindow } from "./HeroAIChatWindow";

interface CinematicHeroProps {
  heroHeading: string;
  heroMediaId?: string;
}

export function CinematicHero({ heroHeading, heroMediaId }: CinematicHeroProps) {
  const verifiedMedia = heroMediaId ? getVerifiedDidmMedia(heroMediaId) : null;
  const primaryMedia = verifiedMedia || DIDM_MEDIA.advancedCourseHero;

  return (
    <section className="relative pt-6 sm:pt-10 pb-16 sm:pb-24 border-b border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#08080C] overflow-hidden">
      {/* Background Volumetric Radiance inspired by Brahma */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-gradient-to-b from-brand-red/10 via-purple-600/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative">
        {/* Top Admissions Badge with Live Pulse */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-brand-red-soft dark:bg-brand-red/10 border border-brand-red/20 text-brand-red text-xs font-mono font-semibold shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-red" />
            </span>
            <span>DELHI NCR&apos;S PREMIER DIGITAL MARKETING INSTITUTE</span>
            <span className="hidden sm:inline text-neutral-300 dark:text-neutral-700">|</span>
            <span className="hidden sm:inline text-neutral-500 font-normal">Admissions Open 2026–2027</span>
          </div>

          <div className="hidden md:flex items-center gap-4 text-xs font-mono text-neutral-500">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>ASSOCHAM Awarded</span>
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-brand-red" />
              <span>14 Delhi NCR Centres</span>
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-blue-500" />
              <span>50,000+ Alumni</span>
            </span>
          </div>
        </div>

        {/* Hero Grid: Left Content & Right Visual Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Headline, Summary & CTAs */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-5xl lg:text-[3.75rem] font-normal tracking-tight text-neutral-900 dark:text-white leading-[1.08]">
                <TextReveal
                  text={heroHeading || "Master practical marketing with real-world skills and career guidance."}
                  wordClassName="font-normal"
                  highlightWords={{
                    marketing: "text-brand-red font-semibold",
                    skills: "italic font-serif",
                    guidance: "text-neutral-900 dark:text-white font-medium",
                  }}
                />
              </h1>

              <RevealOnScroll delayMs={150} direction="up">
                <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 max-w-xl leading-relaxed">
                  Delhi Institute of Digital Marketing (DIDM) delivers high-impact classroom and hybrid training across 14 campuses. Master live performance campaigns, modern generative AI workflows, and access direct corporate placement drives.
                </p>
              </RevealOnScroll>
            </div>

            {/* Clear Admissions Actions */}
            <RevealOnScroll delayMs={250} direction="up">
              <div className="flex flex-wrap items-center gap-3.5 pt-1">
                <MagneticButton pullFactor={0.15}>
                  <Link
                    href="#course-explorer"
                    className="btn-red text-xs sm:text-sm py-3.5 px-6 font-bold flex items-center gap-2 shadow-xl shadow-brand-red/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span>Explore Courses & Roadmaps</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </MagneticButton>

                <MagneticButton pullFactor={0.1}>
                  <Link
                    href="/enquire"
                    className="btn-secondary text-xs sm:text-sm py-3.5 px-5 font-semibold flex items-center gap-2 border border-neutral-300 dark:border-neutral-700 hover:border-brand-red transition-all"
                  >
                    <Calendar className="w-4 h-4 text-brand-red" />
                    <span>Book 1-on-1 Free Demo</span>
                  </Link>
                </MagneticButton>

                <a
                  href="https://wa.me/918800505151?text=Hi%20DIDM%2C%20I%20am%20interested%20in%20learning%20more%20about%20your%20digital%20marketing%20courses."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20 transition flex items-center justify-center shadow-sm"
                  aria-label="Direct WhatsApp Consultation"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </RevealOnScroll>

            {/* Verified Institutional Credentials Strip with Animated Counters */}
            <RevealOnScroll delayMs={350} direction="up">
              <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="space-y-0.5">
                  <div className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white">
                    <AnimatedCounter value={50000} suffix="+" />
                  </div>
                  <div className="text-[11px] text-neutral-500 font-mono">
                    Trained Alumni
                  </div>
                </div>

                <div className="space-y-0.5">
                  <div className="text-2xl sm:text-3xl font-extrabold text-brand-red">
                    <AnimatedCounter value={650} suffix="+" />
                  </div>
                  <div className="text-[11px] text-neutral-500 font-mono">
                    Placement Partners
                  </div>
                </div>

                <div className="space-y-0.5">
                  <div className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white">
                    <AnimatedCounter value={14} />
                  </div>
                  <div className="text-[11px] text-neutral-500 font-mono">
                    Campus Labs
                  </div>
                </div>

                <div className="space-y-0.5">
                  <div className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white">
                    <AnimatedCounter value={10} suffix="+ Yrs" />
                  </div>
                  <div className="text-[11px] text-neutral-500 font-mono">
                    Institute Journey
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>

          {/* Right Column: Interactive AI Course Advisor Chat Window & Campus Card */}
          <div className="lg:col-span-5">
            <RevealOnScroll delayMs={200} direction="fade">
              <HeroAIChatWindow primaryMedia={primaryMedia} />
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}

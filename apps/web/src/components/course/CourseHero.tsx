"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Clock,
  Award,
  Sparkles,
  Layers,
  Laptop,
  MessageCircle,
  Download,
  Building,
} from "lucide-react";
import type { Course } from "@/types/content";
import type { VerifiedDidmMedia } from "@/data/didm-media";
import { DIDM_MEDIA } from "@/data/didm-media";

interface CourseHeroProps {
  course: Course;
  courseMedia?: VerifiedDidmMedia;
}

export function CourseHero({ course, courseMedia }: CourseHeroProps) {
  // Use specific course media, or fallback to midmCourse or advancedCourse
  const media = courseMedia || DIDM_MEDIA.midmCourse;
  const isWide = media.width / media.height > 1.4;

  return (
    <section className="relative pt-6 sm:pt-8 pb-12 sm:pb-16 border-b border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#0B0B0F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="text-xs font-mono text-neutral-500 flex items-center gap-2 overflow-x-auto whitespace-nowrap touch-scroll pb-1"
        >
          <Link href="/" className="hover:text-brand-red transition">
            Home
          </Link>
          <span className="text-neutral-300 dark:text-neutral-700">/</span>
          <Link href="/programs" className="hover:text-brand-red transition">
            Programs
          </Link>
          <span className="text-neutral-300 dark:text-neutral-700">/</span>
          <span className="text-neutral-900 dark:text-white font-semibold">
            {course.shortName}
          </span>
        </nav>

        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Course Header, Highlights, Dual CTA & Specs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Eyebrow Badge */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red-soft dark:bg-brand-red/10 border border-brand-red/20 text-brand-red text-xs font-mono font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{course.badge ? course.badge.toUpperCase() : "PRACTICAL AI-POWERED CAREER TRACK"}</span>
              </span>
              <span className="text-xs font-mono text-neutral-500 hidden sm:inline">
                ISO 9001:2015 Certified
              </span>
            </div>

            {/* Course Name */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-[1.12]">
              {course.name}
            </h1>

            {/* Value Proposition & Summary */}
            <div className="space-y-2.5">
              <p className="text-base sm:text-lg text-neutral-700 dark:text-neutral-200 font-medium leading-snug">
                {course.tagline}
              </p>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl">
                {course.summary}
              </p>
            </div>

            {/* Verified Key Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-neutral-50 dark:bg-[#14141C] border border-neutral-200/70 dark:border-neutral-800 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                  Live Ad Budgets Provided
                </span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-neutral-50 dark:bg-[#14141C] border border-neutral-200/70 dark:border-neutral-800 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                  {course.internship || "2-Month Live Agency Floor"}
                </span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-neutral-50 dark:bg-[#14141C] border border-neutral-200/70 dark:border-neutral-800 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                  100% Placement Drives
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href={`/enquire?p=${course.id}`}
                className="btn-red py-3.5 px-6 text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg shadow-brand-red/25"
              >
                <span>Book 1-on-1 Free Demo Class</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="#learning-studio"
                className="btn-ghost py-3.5 px-5 text-xs sm:text-sm font-semibold flex items-center gap-2 border border-neutral-300 dark:border-neutral-700 hover:border-brand-red transition"
              >
                <Layers className="w-4 h-4 text-brand-red" />
                <span>Explore Learning Studio ↓</span>
              </a>

              <a
                href={`https://wa.me/918800505151?text=Hi%20DIDM%2C%20I%20want%20to%20know%20more%20about%20the%20${encodeURIComponent(course.name)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20 transition flex items-center justify-center"
                aria-label="Direct WhatsApp Consultation"
                title="Chat with DIDM Counsellor on WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>

            {/* Quick Specs Ribbon */}
            <div className="pt-4 border-t border-neutral-200/80 dark:border-neutral-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="space-y-0.5">
                <div className="text-[10px] font-mono uppercase text-neutral-400">Duration</div>
                <div className="font-bold text-neutral-900 dark:text-white leading-tight">
                  {course.duration.split("(")[0].trim()}
                </div>
              </div>
              <div className="space-y-0.5">
                <div className="text-[10px] font-mono uppercase text-neutral-400">Practical Labs</div>
                <div className="font-bold text-brand-red leading-tight">
                  {course.hours}
                </div>
              </div>
              <div className="space-y-0.5">
                <div className="text-[10px] font-mono uppercase text-neutral-400">Curriculum</div>
                <div className="font-bold text-neutral-900 dark:text-white leading-tight">
                  {course.modulesCount}
                </div>
              </div>
              <div className="space-y-0.5">
                <div className="text-[10px] font-mono uppercase text-neutral-400">Certificates</div>
                <div className="font-bold text-neutral-900 dark:text-white leading-tight">
                  {course.certificationsCount}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Authentic DIDM Course Visual with Integrated Details */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-900 shadow-2xl transition-all">
              {/* Media Container with Adaptive Aspect Ratio */}
              <div
                className={`relative w-full overflow-hidden bg-neutral-950 flex items-center justify-center ${
                  isWide ? "aspect-[16/10] sm:aspect-[16/9]" : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={media.path}
                  alt={media.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 550px"
                  className={isWide ? "object-cover object-center" : "object-cover"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                {/* Top Badge overlay */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between text-white text-xs">
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono border border-white/10">
                    Official Course Media
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-brand-red/90 text-white text-[10px] font-mono font-bold">
                    Classroom & Hybrid
                  </span>
                </div>

                {/* Bottom title inside media */}
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <p className="text-xs font-mono text-brand-red uppercase font-semibold">
                    Verified DIDM Academy
                  </p>
                  <p className="text-sm font-bold truncate">
                    {course.shortName} · {course.hours}
                  </p>
                </div>
              </div>

              {/* Integrated Fees & Fact Strip */}
              <div className="p-4 sm:p-5 bg-neutral-900 text-white border-t border-neutral-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-neutral-400 block">
                      Published Tuition Fee
                    </span>
                    <div className="text-xl sm:text-2xl font-serif font-bold text-white mt-0.5">
                      {course.fee}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono uppercase text-emerald-400 block">
                      Instalment Option
                    </span>
                    <span className="text-xs text-neutral-300">
                      {course.feeInstalment ? course.feeInstalment.replace("(in 2 easy instalments)", "(2 instalments)") : "0% EMI Financing"}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400 font-mono">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>650+ Placement Partners</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Building className="w-4 h-4 text-brand-red" />
                    <span>14 Delhi NCR Centres</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


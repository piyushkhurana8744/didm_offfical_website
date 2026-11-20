"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2, Clock, Award, BookOpen, Layers } from "lucide-react";
import { getAllCourses } from "@/lib/content";
import { useAdaptiveHomepage } from "@/context/AdaptiveHomepageContext";
import { MotionSection, MotionHeading } from "@/components/motion";

export function AdaptiveCourseDiscovery() {
  const { adaptation, isPersonalized, openCounsellingHandoff } = useAdaptiveHomepage();
  const allCourses = useMemo(() => getAllCourses(), []);

  // Compute displayed courses
  const displayedCourses = useMemo(() => {
    if (!isPersonalized || !adaptation?.featuredCourseMatches?.length) {
      // Default institutional order: midm, advanced, customized, online
      return allCourses.slice(0, 4).map((c) => ({
        course: c,
        matchScore: c.id === "midm" ? 95 : 88,
        matchReason: c.tagline,
        highlightTag: c.badge || "Flagship Program",
      }));
    }

    // Match tailored list
    const matched = adaptation.featuredCourseMatches
      .map((match) => {
        const c = allCourses.find((course) => course.id === match.courseId);
        if (!c) return null;
        return {
          course: c,
          matchScore: match.matchScore,
          matchReason: match.matchReason,
          highlightTag: match.highlightTag,
        };
      })
      .filter((item): item is NonNullable<typeof item> => Boolean(item));

    return matched.length > 0 ? matched : allCourses.slice(0, 4).map((c) => ({
      course: c,
      matchScore: 90,
      matchReason: c.tagline,
      highlightTag: c.badge || "Featured",
    }));
  }, [allCourses, isPersonalized, adaptation]);

  return (
    <section id="courses" className="py-14 sm:py-20 bg-white dark:bg-[#0B0C10] border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Dynamic Section Header */}
        <div>
          {isPersonalized ? (
            <div className="text-center space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#b52828]/10 text-[#b52828] dark:bg-[#b52828]/20 dark:text-red-400">
                <Sparkles size={13} />
                Tailored for Your Goals
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
                Recommended Digital Marketing Programs
              </h2>
              <p className="max-w-2xl mx-auto text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
                Based on your profile, these curricula will give you the highest practical ROI, tool mastery, and verified placement support.
              </p>
            </div>
          ) : (
            <MotionHeading
              eyebrow="Industry-Recognized Certifications"
              title="Choose the Certification Course for Your Career"
              description="From complete 52-module career masteries to fast-track digital marketing intelligence and 100% online live training cohorts."
              align="center"
            />
          )}
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayedCourses.map(({ course, matchScore, matchReason, highlightTag }, index) => {
            const isTopMatch = index === 0 && isPersonalized;

            return (
              <div
                key={course.id}
                className={`relative flex flex-col justify-between rounded-2xl sm:rounded-3xl p-6 sm:p-7 transition-all duration-300 border ${
                  isTopMatch
                    ? "bg-gradient-to-b from-white via-red-50/20 to-white dark:from-[#151722] dark:via-[#1c1417] dark:to-[#12131A] border-[#b52828]/60 dark:border-[#b52828]/50 shadow-xl shadow-[#b52828]/10 ring-2 ring-[#b52828]/30"
                    : "bg-white dark:bg-[#12131A] border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 shadow-sm hover:shadow-md"
                }`}
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-[#b52828] text-white">
                      {highlightTag}
                    </span>
                    {isPersonalized && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40">
                        <CheckCircle2 size={12} />
                        {matchScore}% Match
                      </span>
                    )}
                  </div>

                  {/* Course Name & Tagline */}
                  <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white tracking-tight mb-2">
                    {course.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mb-5 leading-relaxed">
                    {matchReason}
                  </p>

                  {/* Quick Meta Stats */}
                  <div className="grid grid-cols-2 gap-2.5 py-3 mb-5 border-y border-neutral-100 dark:border-neutral-800/80 text-xs">
                    <div className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400">
                      <Clock size={14} className="text-[#b52828]" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400">
                      <Layers size={14} className="text-[#b52828]" />
                      <span>{course.modulesCount}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400">
                      <Award size={14} className="text-[#b52828]" />
                      <span>{course.certificationsCount}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400">
                      <BookOpen size={14} className="text-[#b52828]" />
                      <span>{course.internship}</span>
                    </div>
                  </div>

                  {/* Key Modules Bullet List */}
                  <div className="space-y-2 mb-6">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                      Core Topics Covered:
                    </p>
                    <ul className="space-y-1.5 text-xs text-neutral-700 dark:text-neutral-300">
                      {course.keyModules.slice(0, 4).map((mod, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[#b52828] font-bold mt-0.5">•</span>
                          <span className="line-clamp-1">{mod}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800/80 space-y-2.5">
                  <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 pb-1">
                    <span>Course Fee:</span>
                    <span className="font-bold text-neutral-900 dark:text-white text-sm">
                      {course.fee} <span className="text-[10px] font-normal text-neutral-500">(All inclusive)</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href={`/courses/${course.slug}`}
                      className="inline-flex items-center justify-center gap-1 px-3 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white text-xs font-semibold transition"
                    >
                      Curriculum <ArrowRight size={13} />
                    </Link>

                    <button
                      type="button"
                      onClick={() =>
                        openCounsellingHandoff({
                          courseId: course.id,
                          prefillReason: `Enquiring for ${course.name}`,
                        })
                      }
                      className="inline-flex items-center justify-center gap-1 px-3 py-2.5 rounded-xl bg-[#b52828] hover:bg-[#9c2020] text-white text-xs font-semibold transition shadow-sm"
                    >
                      Free Demo
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Courses Footer */}
        <div className="text-center pt-4">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#b52828] hover:text-[#9c2020] dark:text-red-400 dark:hover:text-red-300 transition"
          >
            <span>View All 6 Accredited Digital Marketing Certifications</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

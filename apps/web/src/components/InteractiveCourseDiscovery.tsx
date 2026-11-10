"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  Layers,
  Wrench,
  Award,
  BookOpen,
  Calendar,
  Compass,
} from "lucide-react";
import { getAllCourses } from "@/lib/content";
import { StudentJourneyAvatar } from "./roadmap/StudentJourneyAvatar";
import { RevealOnScroll } from "./motion/RevealOnScroll";

export function InteractiveCourseDiscovery() {
  const courses = getAllCourses();
  const [selectedCourseId, setSelectedCourseId] = useState(courses[0]?.id || "midm");
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);

  const selectedCourse = courses.find((c) => c.id === selectedCourseId) || courses[0];
  const syllabus = selectedCourse?.syllabus || [];
  const activeModule = syllabus[activeModuleIndex] || syllabus[0];

  const handleSelectCourse = (id: string) => {
    setSelectedCourseId(id);
    setActiveModuleIndex(0);
  };

  return (
    <section id="course-explorer" className="py-16 sm:py-24 space-y-12 sm:space-y-16 bg-[#FBFAF7] dark:bg-[#0A0A0E] border-b border-neutral-200 dark:border-neutral-800">
      {/* Section Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-red-soft dark:bg-brand-red/10 text-brand-red text-xs font-mono font-semibold">
          <Compass className="w-3.5 h-3.5" />
          <span>INTERACTIVE COURSE EXPLORER & ROADMAPS</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-normal text-neutral-900 dark:text-white leading-[1.08]">
          Compare programs & explore <em>learning roadmaps</em>.
        </h2>

        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
          Select any course below to inspect its verified module roadmap, hands-on classroom lab assignments, and tools mastered.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Course Selection Horizontal Pill Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2.5 overflow-x-auto pb-2 scrollbar-none touch-scroll">
          {courses.slice(0, 4).map((course) => {
            const isSelected = course.id === selectedCourseId;
            return (
              <button
                key={course.id}
                onClick={() => handleSelectCourse(course.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all border ${
                  isSelected
                    ? "bg-brand-red text-white border-brand-red shadow-lg shadow-brand-red/25"
                    : "bg-white dark:bg-[#131319] text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700"
                }`}
              >
                <span>{course.shortName || course.name}</span>
                {course.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-normal ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-brand-red-soft dark:bg-brand-red/10 text-brand-red"
                    }`}
                  >
                    {course.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Course Deep-Dive Card */}
        {selectedCourse && (
          <div className="rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 p-6 sm:p-10 shadow-xl space-y-8 animate-in fade-in duration-300">
            {/* Course Head Details */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-neutral-100 dark:border-neutral-800">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2 text-xs font-mono text-brand-red font-bold uppercase">
                  <span>{selectedCourse.format}</span>
                  <span>·</span>
                  <span>{selectedCourse.duration}</span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-normal text-neutral-900 dark:text-white">
                  {selectedCourse.name}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {selectedCourse.summary || selectedCourse.tagline}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3 shrink-0">
                <div className="text-left lg:text-right">
                  <span className="text-[10px] font-mono uppercase text-neutral-400 font-semibold">Total Tuition Fee</span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white font-serif">
                    {selectedCourse.fee}
                  </div>
                  {selectedCourse.feeInstalment && (
                    <span className="text-[11px] text-neutral-500 font-mono block">
                      {selectedCourse.feeInstalment}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <Link
                    href={`/programs/${selectedCourse.slug}`}
                    className="btn-red text-xs py-2.5 px-5 font-bold inline-flex items-center gap-1.5 shadow-md shadow-brand-red/20"
                  >
                    <span>Explore Full Interactive Journey</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href={`/enquire?p=${selectedCourse.id}`}
                    className="btn-ghost text-xs py-2.5 px-4 font-semibold"
                  >
                    Book Free Demo
                  </Link>
                </div>
              </div>
            </div>

            {/* Course Key Facts Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-[#1A1A22] border border-neutral-100 dark:border-neutral-800/80">
                <div className="text-xs font-mono text-neutral-400 uppercase">Training Hours</div>
                <div className="text-lg font-bold text-neutral-900 dark:text-white mt-1">
                  {selectedCourse.hours}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-[#1A1A22] border border-neutral-100 dark:border-neutral-800/80">
                <div className="text-xs font-mono text-neutral-400 uppercase">Curriculum Depth</div>
                <div className="text-lg font-bold text-neutral-900 dark:text-white mt-1">
                  {selectedCourse.modulesCount}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-[#1A1A22] border border-neutral-100 dark:border-neutral-800/80">
                <div className="text-xs font-mono text-neutral-400 uppercase">Agency Internship</div>
                <div className="text-lg font-bold text-brand-red mt-1">
                  {selectedCourse.internship}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-[#1A1A22] border border-neutral-100 dark:border-neutral-800/80">
                <div className="text-xs font-mono text-neutral-400 uppercase">Certifications</div>
                <div className="text-lg font-bold text-neutral-900 dark:text-white mt-1">
                  {selectedCourse.certificationsCount}
                </div>
              </div>
            </div>

            {/* Miniature Interactive Learning Roadmap for this Course */}
            {syllabus.length > 0 && (
              <div className="space-y-6 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-0.5">
                    <span className="text-xs font-mono uppercase text-brand-red font-bold tracking-wider">
                      Course Learning Trail
                    </span>
                    <h4 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white">
                      Step-by-step module sequence for {selectedCourse.shortName}
                    </h4>
                  </div>
                  <div className="text-xs font-mono text-neutral-500">
                    Viewing module {activeModuleIndex + 1} of {syllabus.length}
                  </div>
                </div>

                {/* Checkpoint Stepper Bar with Travelling Student Avatar */}
                <div className="relative pt-8 pb-4">
                  {/* Stepper nodes */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 relative z-10">
                    {syllabus.slice(0, 4).map((mod, idx) => {
                      const isActive = idx === activeModuleIndex;
                      return (
                        <button
                          key={idx}
                          onClick={() => setActiveModuleIndex(idx)}
                          className={`p-3.5 rounded-2xl text-left transition-all border relative ${
                            isActive
                              ? "bg-brand-red text-white border-brand-red shadow-lg shadow-brand-red/25"
                              : "bg-neutral-50 dark:bg-[#1A1A22] text-neutral-700 dark:text-neutral-300 border-neutral-200/80 dark:border-neutral-800 hover:border-brand-red/40"
                          }`}
                        >
                          <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                            <span className={isActive ? "text-white/80 font-bold" : "text-brand-red font-bold"}>
                              Module 0{idx + 1}
                            </span>
                            {mod.duration && (
                              <span className={isActive ? "text-white/70" : "text-neutral-400"}>
                                {mod.duration}
                              </span>
                            )}
                          </div>
                          <div className={`text-xs font-bold line-clamp-1 ${isActive ? "text-white" : ""}`}>
                            {mod.title}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Active Module Live Content Panel */}
                {activeModule && (
                  <div className="p-5 sm:p-6 rounded-2xl bg-neutral-50 dark:bg-[#1A1A22] border border-neutral-200/80 dark:border-neutral-800 space-y-4 animate-in fade-in">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-mono uppercase text-brand-red font-bold">
                          Selected Module Focus
                        </span>
                        <h5 className="text-base font-bold text-neutral-900 dark:text-white mt-0.5">
                          {activeModule.title}
                        </h5>
                      </div>
                      <Link
                        href={`/programs/${selectedCourse.slug}#course-roadmap`}
                        className="text-xs font-bold text-brand-red hover:underline inline-flex items-center gap-1 shrink-0"
                      >
                        <span>Open full course roadmap with all modules</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {activeModule.summary}
                    </p>

                    {/* Practical Project Deliverable */}
                    {activeModule.practicalProject && (
                      <div className="p-3.5 rounded-xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 flex items-start gap-2.5 text-xs">
                        <CheckCircle2 className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                        <div>
                          <span className="font-mono text-neutral-400 uppercase text-[10px] block">
                            Hands-On Deliverable:
                          </span>
                          <span className="font-semibold text-neutral-900 dark:text-white">
                            {activeModule.practicalProject}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Tools Mastered */}
                    {activeModule.toolsUsed && activeModule.toolsUsed.length > 0 && (
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <span className="text-[11px] font-mono text-neutral-400">Tools:</span>
                        {activeModule.toolsUsed.map((tool, i) => (
                          <span
                            key={i}
                            className="text-[11px] font-mono px-2 py-0.5 rounded bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import {
  CheckCircle2,
  Wrench,
  Laptop,
  ArrowRight,
  ArrowLeft,
  Calendar,
  Sparkles,
  Award,
} from "lucide-react";
import type { SyllabusTopic } from "@/types/content";

interface RoadmapModulePanelProps {
  module: SyllabusTopic;
  currentIndex: number;
  totalModules: number;
  courseId: string;
  courseName: string;
  onPrev: () => void;
  onNext: () => void;
}

export function RoadmapModulePanel({
  module,
  currentIndex,
  totalModules,
  courseId,
  courseName,
  onPrev,
  onNext,
}: RoadmapModulePanelProps) {
  const stepNumber = currentIndex + 1;

  return (
    <div className="rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 shadow-xl space-y-6 animate-in fade-in duration-300">
      {/* Top Meta Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-100 dark:border-neutral-800 pb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono uppercase px-2.5 py-0.5 rounded-full bg-brand-red text-white font-bold">
            Module {stepNumber < 10 ? `0${stepNumber}` : stepNumber}
          </span>
          {module.duration && (
            <span className="text-xs font-mono text-neutral-500 font-semibold">
              · {module.duration}
            </span>
          )}
        </div>

        <div className="text-xs font-mono text-neutral-400">
          Viewing module <span className="font-bold text-neutral-900 dark:text-white">{stepNumber}</span> of {totalModules}
        </div>
      </div>

      {/* Module Title & Pedagogical Summary */}
      <div className="space-y-2">
        <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white leading-snug">
          {module.title}
        </h3>
        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          {module.summary}
        </p>
      </div>

      {/* Topics Covered */}
      {module.topics && module.topics.length > 0 && (
        <div className="space-y-2.5 pt-1">
          <h4 className="text-xs font-mono uppercase text-brand-red font-bold tracking-wider">
            Key Concepts & Syllabus Topics:
          </h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-700 dark:text-neutral-300">
            {module.topics.map((topic, i) => (
              <li key={i} className="flex items-start gap-2 bg-neutral-50 dark:bg-[#1A1A22] p-2.5 rounded-xl border border-neutral-100 dark:border-neutral-800/80">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-red shrink-0 mt-0.5" />
                <span>{topic}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Hands-On Practical Project Lab */}
      {module.practicalProject && (
        <div className="p-4 sm:p-5 rounded-2xl bg-brand-red-soft/25 dark:bg-brand-red/10 border border-brand-red/20 space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-brand-red font-bold">
            <Laptop className="w-4 h-4" />
            <span>Classroom Lab Deliverable You Build:</span>
          </div>
          <p className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white leading-relaxed">
            {module.practicalProject}
          </p>
        </div>
      )}

      {/* Tools Taught in this Module */}
      {module.toolsUsed && module.toolsUsed.length > 0 && (
        <div className="space-y-2 pt-1">
          <div className="flex items-center gap-1.5 text-xs font-mono uppercase text-neutral-400 font-semibold">
            <Wrench className="w-3.5 h-3.5" />
            <span>Software & Platforms Mastered:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {module.toolsUsed.map((tool, idx) => (
              <span
                key={idx}
                className="text-xs font-mono font-medium px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Navigation Controls & Action Buttons */}
      <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={onPrev}
            disabled={currentIndex === 0}
            className={`btn-ghost text-xs py-2 px-3 font-mono flex items-center gap-1.5 ${
              currentIndex === 0 ? "opacity-30 cursor-not-allowed" : "hover:text-brand-red"
            }`}
            aria-label="Previous Module"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Prev</span>
          </button>

          <button
            onClick={onNext}
            disabled={currentIndex === totalModules - 1}
            className={`btn-ghost text-xs py-2 px-3 font-mono flex items-center gap-1.5 ${
              currentIndex === totalModules - 1 ? "opacity-30 cursor-not-allowed" : "hover:text-brand-red"
            }`}
            aria-label="Next Module"
          >
            <span>Next</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/enquire?p=${courseId}`}
            className="btn-red text-xs py-2.5 px-4 font-bold flex-1 text-center justify-center shadow-md shadow-brand-red/20"
          >
            Book Free Demo Class
          </Link>
        </div>
      </div>
    </div>
  );
}


"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Compass,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  BookOpen,
  Calendar,
  Layers,
  ChevronDown,
} from "lucide-react";
import { RoadmapCheckpoint } from "./RoadmapCheckpoint";
import { RoadmapModulePanel } from "./RoadmapModulePanel";
import { RoadmapPath } from "./RoadmapPath";
import { StudentJourneyAvatar } from "./StudentJourneyAvatar";
import type { Course, SyllabusTopic } from "@/types/content";

interface InteractiveCourseRoadmapProps {
  course: Course;
  className?: string;
}

export function InteractiveCourseRoadmap({
  course,
  className = "",
}: InteractiveCourseRoadmapProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const syllabus = course.syllabus || [];
  const currentModule = syllabus[activeIndex] || syllabus[0];

  // Keyboard navigation support (Arrow keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        setActiveIndex((prev) => (prev < syllabus.length - 1 ? prev + 1 : prev));
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [syllabus.length]);

  if (!syllabus || syllabus.length === 0) {
    return (
      <div className="p-8 rounded-3xl bg-neutral-50 dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 text-center">
        <p className="text-sm text-neutral-500">
          Curriculum roadmap for {course.name} is being updated by the academic council.
        </p>
      </div>
    );
  }

  return (
    <section
      id="course-roadmap"
      className={`space-y-8 sm:space-y-12 ${className}`}
      aria-label={`${course.name} Interactive Learning Roadmap`}
    >
      {/* Header & Progress Indicator */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red-soft dark:bg-brand-red/10 text-brand-red text-xs font-mono font-semibold">
            <Compass className="w-3.5 h-3.5" />
            <span>INTERACTIVE LEARNING ROADMAP</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-normal text-neutral-900 dark:text-white leading-tight">
            Follow the journey through <em>{course.shortName || course.name}</em>.
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
            Click any checkpoint or use the arrows to see our student character travel through the syllabus modules.
          </p>
        </div>

        {/* Progress Tracker */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right">
            <div className="text-[10px] font-mono uppercase text-neutral-400 font-semibold">
              Curriculum Progress
            </div>
            <div className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white font-mono">
              Module {activeIndex + 1} of {syllabus.length}
            </div>
          </div>

          <div className="w-24 sm:w-32 h-2.5 rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden border border-neutral-200 dark:border-neutral-700">
            <div
              className="h-full bg-brand-red transition-all duration-500 rounded-full"
              style={{
                width: `${((activeIndex + 1) / syllabus.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Main Roadmap Grid: Checkpoints Track (Left) & Module Panel (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left Column: Interactive Checkpoints Trail */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-mono uppercase text-neutral-400 font-bold px-1 flex items-center justify-between">
            <span>Syllabus Checkpoints</span>
            <span className="text-[10px] font-normal lowercase text-neutral-500">
              (use ↑ / ↓ arrow keys)
            </span>
          </div>

          {/* Vertical Trail of Checkpoints */}
          <div className="space-y-2 relative">
            {syllabus.map((mod, idx) => (
              <RoadmapCheckpoint
                key={idx}
                index={idx}
                title={mod.title}
                duration={mod.duration}
                isActive={idx === activeIndex}
                isCompleted={idx < activeIndex}
                onClick={() => setActiveIndex(idx)}
              />
            ))}
          </div>

          {/* Desktop Visual Path with Travelling Character */}
          <div className="hidden lg:block pt-4">
            <div className="p-4 rounded-3xl bg-neutral-50 dark:bg-[#1A1A22] border border-neutral-200/80 dark:border-neutral-800">
              <div className="text-[11px] font-mono text-neutral-400 font-semibold mb-2 uppercase">
                Scenic Winding Trail Preview
              </div>
              <RoadmapPath
                syllabus={syllabus}
                activeIndex={activeIndex}
                onSelectModule={setActiveIndex}
              />
            </div>
          </div>
        </div>

        {/* Right Column: Active Module Detail Panel */}
        <div className="lg:col-span-7 lg:sticky lg:top-24">
          {/* Mobile Student Character Indicator */}
          <div className="lg:hidden flex items-center justify-center py-2 mb-2">
            <StudentJourneyAvatar stepNumber={activeIndex + 1} />
          </div>

          {currentModule && (
            <RoadmapModulePanel
              module={currentModule}
              currentIndex={activeIndex}
              totalModules={syllabus.length}
              courseId={course.id}
              courseName={course.name}
              onPrev={() => setActiveIndex((prev) => Math.max(0, prev - 1))}
              onNext={() => setActiveIndex((prev) => Math.min(syllabus.length - 1, prev + 1))}
            />
          )}
        </div>
      </div>
    </section>
  );
}


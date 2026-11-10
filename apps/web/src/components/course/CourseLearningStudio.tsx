"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Link from "next/link";
import {
  Compass,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Laptop,
  CheckCircle2,
  Wrench,
  Layers,
  Calendar,
  Check,
  ChevronRight,
  Flag,
  Trophy,
} from "lucide-react";
import { StudentJourneyAvatar } from "../roadmap/StudentJourneyAvatar";
import type { Course, SyllabusTopic } from "@/types/content";

interface CourseLearningStudioProps {
  course: Course;
  className?: string;
}

interface CheckpointData {
  index: number;
  distance: number;
  x: number;
  y: number;
  module: SyllabusTopic;
}

// Master Adventure Road SVG curve inside viewBox="0 0 800 480"
// Balanced S-winding continuous adventure path with optimal edge padding and vertical breathing room
const ADVENTURE_ROAD_PATH =
  "M 90 92 C 270 76, 510 78, 705 108 C 775 120, 785 205, 705 235 C 510 272, 290 225, 115 292 C 45 324, 55 402, 145 428 C 300 458, 530 428, 715 440";

export function CourseLearningStudio({
  course,
  className = "",
}: CourseLearningStudioProps) {
  const [targetIndex, setTargetIndex] = useState(0);
  const [displayedIndex, setDisplayedIndex] = useState(0);
  const [isWalking, setIsWalking] = useState(false);
  const [facing, setFacing] = useState<"left" | "right">("right");
  const [walkCycle, setWalkCycle] = useState(0);

  // Keep a ref to targetIndex to prevent resize/geometry re-computes from resetting to module 0
  const targetIndexRef = useRef(0);
  targetIndexRef.current = targetIndex;

  // Path coordinates and lengths
  const pathRef = useRef<SVGPathElement>(null);
  const [totalLength, setTotalLength] = useState(1);
  const [currentDistance, setCurrentDistance] = useState(0);
  const [avatarPos, setAvatarPos] = useState<{ x: number; y: number }>({
    x: 90,
    y: 75,
  });
  const [checkpoints, setCheckpoints] = useState<CheckpointData[]>([]);

  // Animation controller refs
  const animFrameRef = useRef<number | null>(null);
  const currentDistRef = useRef(0);
  const walkCycleRef = useRef(0);
  const scrubberRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrubberRef.current && scrubberRef.current.children[targetIndex]) {
      const activeBtn = scrubberRef.current.children[targetIndex] as HTMLElement;
      activeBtn.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, [targetIndex]);

  const syllabus: SyllabusTopic[] = useMemo(() => {
    return course.syllabus && course.syllabus.length > 0
      ? course.syllabus
      : [
          {
            title: `${course.name} Core Modules`,
            duration: course.duration,
            summary: course.summary,
            topics: course.keyModules || [
              "Comprehensive practical curriculum",
              "Live campaign execution with active ad spend",
              "Industry mentor guidance & real-world workflows",
            ],
            toolsUsed: ["Google Ads", "Meta Ads Manager", "Google Analytics 4"],
            practicalProject: "Execute end-to-end campaigns on live ad accounts.",
          },
        ];
  }, [course]);

  const count = syllabus.length;
  const currentModule = syllabus[displayedIndex] || syllabus[0];
  const chapters = useMemo(() => {
    const result: Array<{ name: string; start: number; end: number }> = [];
    syllabus.forEach((module, index) => {
      const name = module.topics?.[1] || "Curriculum";
      const previous = result[result.length - 1];
      if (previous?.name === name) previous.end = index;
      else result.push({ name, start: index, end: index });
    });
    return result;
  }, [syllabus]);

  // Initialize path geometry and compute checkpoint coordinates along the road
  const computeRoadGeometry = useCallback(() => {
    const path = pathRef.current;
    if (!path) return;

    try {
      const len = path.getTotalLength();
      if (!len || isNaN(len)) return;
      setTotalLength(len);

      const computed: CheckpointData[] = [];
      const startMargin = 0.03;
      const endMargin = 0.97;

      for (let i = 0; i < count; i++) {
        const ratio =
          count === 1
            ? 0.5
            : startMargin + (i / (count - 1)) * (endMargin - startMargin);
        const dist = ratio * len;
        const pt = path.getPointAtLength(dist);
        computed.push({
          index: i,
          distance: dist,
          x: pt.x,
          y: pt.y,
          module: syllabus[i],
        });
      }

      setCheckpoints(computed);

      // Preserve currently active index position during resize/recompute!
      const activeIdx = Math.min(count - 1, targetIndexRef.current);
      const activeCp = computed[activeIdx] || computed[0];
      if (activeCp) {
        currentDistRef.current = activeCp.distance;
        setCurrentDistance(activeCp.distance);
        setAvatarPos({ x: activeCp.x, y: activeCp.y });
      }
    } catch {
      // Fallback
    }
  }, [count, syllabus]);

  // Compute road on mount and on window resize
  useEffect(() => {
    computeRoadGeometry();

    const handleResize = () => {
      computeRoadGeometry();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [computeRoadGeometry]);

  // Continuous Game-Style Walking Animation Loop
  const walkToDestination = useCallback(
    (destIndex: number) => {
      const path = pathRef.current;
      if (!path || checkpoints.length === 0) {
        setTargetIndex(destIndex);
        setDisplayedIndex(destIndex);
        return;
      }

      const targetCp = checkpoints[destIndex];
      if (!targetCp) return;

      const destDistance = targetCp.distance;
      const startDist = currentDistRef.current;
      const distDelta = destDistance - startDist;

      // Immediately update target index so UI controls highlight the selection
      setTargetIndex(destIndex);
      setDisplayedIndex(destIndex);

      // Check if already practically at destination
      if (Math.abs(distDelta) < 1.5) {
        setIsWalking(false);
        return;
      }

      // Check for user prefers-reduced-motion
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        currentDistRef.current = destDistance;
        setCurrentDistance(destDistance);
        setAvatarPos({ x: targetCp.x, y: targetCp.y });
        setIsWalking(false);
        return;
      }

      // Cancel any ongoing animation frame
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }

      setIsWalking(true);

      // Determine duration based on distance (speeds up on short moves, smooth on long moves)
      const absDist = Math.abs(distDelta);
      const walkDuration = Math.max(500, Math.min(1200, (absDist / 420) * 1000));
      const startTime = performance.now();

      const animateStep = (now: number) => {
        const elapsed = now - startTime;
        const rawProgress = Math.min(1, elapsed / walkDuration);

        // Smooth easeInOutQuad easing
        const eased =
          rawProgress < 0.5
            ? 2 * rawProgress * rawProgress
            : 1 - Math.pow(-2 * rawProgress + 2, 2) / 2;

        const curD = startDist + distDelta * eased;
        currentDistRef.current = curD;
        setCurrentDistance(curD);

        try {
          const pt = path.getPointAtLength(curD);
          setAvatarPos({ x: pt.x, y: pt.y });

          // Calculate path tangent direction (look ahead or behind)
          const lookDelta = distDelta > 0 ? 3 : -3;
          const lookDist = Math.max(0, Math.min(totalLength, curD + lookDelta));
          const lookPt = path.getPointAtLength(lookDist);
          const dx = lookPt.x - pt.x;

          if (Math.abs(dx) > 0.3) {
            setFacing(dx > 0 ? "right" : "left");
          }

          // Advance walk cycle based on distance travelled
          walkCycleRef.current += (Math.abs(distDelta) / walkDuration) * 0.45;
          setWalkCycle(walkCycleRef.current);
        } catch {
          // ignore
        }

        if (rawProgress < 1) {
          animFrameRef.current = requestAnimationFrame(animateStep);
        } else {
          // Arrived at destination checkpoint!
          currentDistRef.current = destDistance;
          setCurrentDistance(destDistance);
          setAvatarPos({ x: targetCp.x, y: targetCp.y });
          setIsWalking(false);
          animFrameRef.current = null;
        }
      };

      animFrameRef.current = requestAnimationFrame(animateStep);
    },
    [checkpoints, totalLength]
  );

  // Clean up animation on unmount
  useEffect(() => {
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  // Keyboard Navigation: Arrow Left / Arrow Right
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        const next = Math.min(count - 1, targetIndex + 1);
        walkToDestination(next);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        const prev = Math.max(0, targetIndex - 1);
        walkToDestination(prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [count, targetIndex, walkToDestination]);

  return (
    <section
      id="learning-studio"
      className={`scroll-mt-24 space-y-4 sm:space-y-6 relative ${className}`}
      aria-label={`${course.name} Interactive Learning Studio`}
    >
      {/* Anchor for backward-compatible links */}
      <span id="course-roadmap" className="absolute -top-24 pointer-events-none" />

      {/* Top Studio Control Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 sm:p-6 rounded-3xl bg-neutral-900 text-white border border-neutral-800 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-brand-red">
            <Compass className="w-4 h-4 text-brand-red" />
            <span className="uppercase tracking-wider">
              INTERACTIVE ADVENTURE ROADMAP
            </span>
            <span className="text-neutral-500">·</span>
            <span className="text-neutral-300 font-normal hidden sm:inline">
              Walking Student Engine
            </span>
          </div>
          <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-white">
            {course.shortName} Curriculum World Map
          </h2>
          <p className="text-xs text-neutral-400">
            Click any checkpoint or pill to see our student character physically walk along the winding syllabus road.
          </p>
        </div>

        {/* Milestone Tracker & Navigation */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <div className="text-right">
            <div className="text-[10px] font-mono uppercase text-neutral-400 font-semibold">
              Curriculum Milestone
            </div>
            <div className="text-xs sm:text-sm font-bold text-white font-mono">
              Module {targetIndex + 1 < 10 ? `0${targetIndex + 1}` : targetIndex + 1} of{" "}
              {count < 10 ? `0${count}` : count}
            </div>
          </div>

          {/* Smooth Path Progress Bar */}
          <div className="w-20 sm:w-32 h-2.5 rounded-full bg-neutral-800 overflow-hidden border border-neutral-700">
            <div
              className="h-full bg-brand-red transition-all duration-300 rounded-full"
              style={{
                width: `${Math.min(100, Math.max(5, (currentDistance / totalLength) * 100))}%`,
              }}
            />
          </div>

          {/* Prev / Next Buttons */}
          <div className="flex items-center gap-1.5 pl-2 border-l border-neutral-800">
            <button
              type="button"
              onClick={() => walkToDestination(Math.max(0, targetIndex - 1))}
              disabled={targetIndex === 0}
              className={`p-2 sm:p-2.5 rounded-xl border border-neutral-700 text-neutral-300 hover:text-white hover:border-neutral-500 transition ${
                targetIndex === 0 ? "opacity-30 cursor-not-allowed" : ""
              }`}
              title="Walk to Previous Module (←)"
              aria-label="Previous Module"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => walkToDestination(Math.min(count - 1, targetIndex + 1))}
              disabled={targetIndex === count - 1}
              className={`p-2 sm:p-2.5 rounded-xl border border-neutral-700 text-neutral-300 hover:text-white hover:border-neutral-500 transition ${
                targetIndex === count - 1 ? "opacity-30 cursor-not-allowed" : ""
              }`}
              title="Walk to Next Module (→)"
              aria-label="Next Module"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Single-View Learning Studio Container (Desktop Viewport Fit) */}
      <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#131319] p-4 sm:p-6 lg:p-7 shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* LEFT COLUMN: The Adventure Game Road & Physical Walking Student */}
          <div className="lg:col-span-6 xl:col-span-7 flex flex-col space-y-3.5">
            <div className="flex items-center justify-between px-1 text-xs font-mono text-neutral-500">
              <span className="font-bold text-neutral-700 dark:text-neutral-300 uppercase flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-brand-red animate-ping" />
                <span>Adventure Path</span>
              </span>
              <span className="text-[11px] hidden sm:inline text-neutral-400">
                Click any milestone to walk character
              </span>
            </div>

            {/* Adventure Map Canvas with Responsive Aspect Ratio */}
            <div className="relative w-full aspect-[800/480] rounded-2xl bg-gradient-to-br from-[#12131D] to-[#0A0A10] border border-neutral-800 overflow-hidden select-none shadow-inner">
              {/* Subtle Map Topographic Decor Grid */}
              <div
                className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(#ffffff 1px, transparent 1px), radial-gradient(#ffffff 1px, #0D0E15 1px)",
                  backgroundSize: "36px 36px",
                  backgroundPosition: "0 0, 18px 18px",
                }}
              />

              {/* Start & Finish Labels in Map Background */}
              <div className="absolute top-3 left-4 sm:top-4 sm:left-6 flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono text-neutral-400 uppercase tracking-widest pointer-events-none">
                <Flag className="w-3.5 h-3.5 text-emerald-400" />
                <span>Base Camp · M01</span>
              </div>
              <div className="absolute bottom-3 right-4 sm:bottom-4 sm:right-6 flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono text-amber-400 uppercase tracking-widest pointer-events-none">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span>Capstone · Finish</span>
              </div>

              {/* SVG Adventure Road Network */}
              <svg
                viewBox="0 0 800 480"
                className="w-full h-full pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Road drop shadow */}
                  <filter id="road-deep-shadow" x="-10%" y="-10%" width="120%" height="120%">
                    <feDropShadow dx="0" dy="5" stdDeviation="6" floodColor="#000000" floodOpacity="0.55" />
                  </filter>
                  {/* Glowing neon red progress filter */}
                  <filter id="red-trail-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="0" stdDeviation="4.5" floodColor="#C8102E" floodOpacity="0.85" />
                  </filter>
                </defs>

                {/* Hidden Master Calculation Path */}
                <path
                  ref={pathRef}
                  d={ADVENTURE_ROAD_PATH}
                  fill="none"
                  stroke="transparent"
                  strokeWidth="1"
                />

                {/* Road Base Embankment / Foundation */}
                <path
                  d={ADVENTURE_ROAD_PATH}
                  fill="none"
                  stroke="#222538"
                  strokeWidth="38"
                  strokeLinecap="round"
                  filter="url(#road-deep-shadow)"
                />

                {/* Road Surface (Dark Charcoal Stone) */}
                <path
                  d={ADVENTURE_ROAD_PATH}
                  fill="none"
                  stroke="#141520"
                  strokeWidth="28"
                  strokeLinecap="round"
                />

                {/* Road Edge Curb Markings */}
                <path
                  d={ADVENTURE_ROAD_PATH}
                  fill="none"
                  stroke="#33374D"
                  strokeWidth="26"
                  strokeLinecap="round"
                  strokeDasharray="3 8"
                  opacity="0.3"
                />

                {/* Road Dashed Centerline */}
                <path
                  d={ADVENTURE_ROAD_PATH}
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  strokeDasharray="7 9"
                  strokeLinecap="round"
                  opacity="0.35"
                />

                {/* Illuminated Traveled Trail (Length Matches Current Student Distance) */}
                {totalLength > 1 && (
                  <path
                    d={ADVENTURE_ROAD_PATH}
                    fill="none"
                    stroke="#C8102E"
                    strokeWidth="10"
                    strokeLinecap="round"
                    filter="url(#red-trail-glow)"
                    style={{
                      strokeDasharray: `${currentDistance} ${totalLength}`,
                      strokeDashoffset: 0,
                    }}
                  />
                )}
              </svg>

              {/* Checkpoint Nodes along the Road Geometry */}
              {checkpoints.map((cp) => {
                const isActive = cp.index === targetIndex;
                const isCompleted = cp.index < targetIndex;
                const isLargeSet = count > 15;
                // For 52-stop Master journey, major chapter hubs are prominent nodes, intermediate are sleek stepping stones
                const isMajorMilestone =
                  cp.index === 0 ||
                  cp.index === count - 1 ||
                  cp.index === 9 ||
                  cp.index === 17 ||
                  cp.index === 26 ||
                  cp.index === 32 ||
                  cp.index === 44;

                const leftPercent = (cp.x / 800) * 100;
                const topPercent = (cp.y / 480) * 100;

                return (
                  <div
                    key={cp.index}
                    className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${leftPercent}%`,
                      top: `${topPercent}%`,
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => walkToDestination(cp.index)}
                      className={`group relative flex items-center justify-center transition-all duration-300 focus:outline-none ${
                        isActive
                          ? "w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-brand-red text-white font-mono font-bold text-[9px] ring-2 ring-brand-red/40 scale-110 shadow-xl shadow-brand-red/50 z-30"
                          : isLargeSet && !isMajorMilestone
                          ? isCompleted
                            ? "w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-400 hover:scale-150 shadow-[0_0_6px_rgba(52,211,153,0.8)]"
                            : "w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#1C1E2B] border border-neutral-600 hover:border-brand-red hover:scale-150 shadow-xs"
                          : isCompleted
                          ? "w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-500 text-white font-mono font-bold text-[8px] hover:scale-125 shadow-md"
                          : "w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#1C1E2B] text-neutral-300 border border-neutral-600 font-mono font-bold text-[8px] hover:border-brand-red hover:text-white hover:scale-125 shadow-sm"
                      }`}
                      title={`Walk to Module ${cp.index + 1}: ${cp.module.title}`}
                      aria-label={`Select Module ${cp.index + 1}: ${cp.module.title}`}
                    >
                      {isActive ? (
                        <span>{cp.index + 1 < 10 ? `0${cp.index + 1}` : cp.index + 1}</span>
                      ) : isLargeSet && !isMajorMilestone ? (
                        null
                      ) : isCompleted ? (
                        <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3]" />
                      ) : (
                        <span>{cp.index + 1 < 10 ? `0${cp.index + 1}` : cp.index + 1}</span>
                      )}

                      {/* Tooltip on Hover */}
                      <span className="absolute bottom-full mb-2 hidden group-hover:block z-40 px-2.5 py-1 rounded-lg bg-neutral-900 text-white text-[10px] font-sans font-medium whitespace-nowrap shadow-xl border border-neutral-700 pointer-events-none">
                        Module {cp.index + 1}: {cp.module.title}
                      </span>
                    </button>
                  </div>
                );
              })}

              {/* Animated Walking Student Character (Physically Follows the SVG Path) */}
              <div
                className="absolute z-30 pointer-events-none"
                style={{
                  left: `${(avatarPos.x / 800) * 100}%`,
                  top: `${(avatarPos.y / 480) * 100}%`,
                  transform: "translate(-50%, -96%)",
                }}
              >
                <StudentJourneyAvatar
                  stepNumber={targetIndex + 1}
                  isMoving={isWalking}
                  facing={facing}
                  walkCycle={walkCycle}
                  badgeText={isWalking ? "Travelling..." : `Module ${targetIndex + 1 < 10 ? `0${targetIndex + 1}` : targetIndex + 1}`}
                />
              </div>
            </div>

            {/* Quick Milestone Scrubber Pills (Clean, Non-Squished Responsive Grid) */}
            <div className="space-y-1.5 pt-0.5">
              <div className="text-[11px] font-mono text-neutral-400 font-semibold uppercase flex items-center justify-between">
                <span>Direct Checkpoint Selector:</span>
                <span className="text-[10px] lowercase text-neutral-500 hidden sm:inline">
                  (character walks to selection)
                </span>
              </div>
              <div
                ref={scrubberRef}
                className="flex gap-1.5 overflow-x-auto pb-2 snap-x scroll-smooth"
                aria-label="All curriculum checkpoints"
              >
                {syllabus.map((mod, i) => {
                  const isActive = i === targetIndex;
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => walkToDestination(i)}
                      className={`shrink-0 snap-start w-10 h-9 rounded-lg text-[10px] font-mono transition flex items-center justify-center border ${
                        isActive
                          ? "bg-brand-red text-white font-bold border-brand-red shadow-sm"
                          : "bg-neutral-50 dark:bg-[#1A1A22] text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-800 hover:border-brand-red hover:text-brand-red"
                      }`}
                    >
                      <span>{String(i + 1).padStart(2, "0")}</span>
                    </button>
                  );
                })}
              </div>
              {chapters.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1" aria-label="Curriculum chapters">
                  {chapters.map((chapter, index) => (
                    <button key={chapter.name} type="button" onClick={() => walkToDestination(chapter.start)}
                      className={`shrink-0 rounded-full border px-3 py-1.5 text-[10px] font-semibold ${targetIndex >= chapter.start && targetIndex <= chapter.end ? "border-brand-red bg-brand-red-soft text-brand-red" : "border-neutral-200 dark:border-neutral-700 text-neutral-500"}`}>
                      Chapter {index + 1} · {chapter.start + 1}–{chapter.end + 1}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Active Module Deep Dive Studio Card */}
          <div className="lg:col-span-6 xl:col-span-5 rounded-2xl bg-neutral-50 dark:bg-[#15151D] border border-neutral-200/90 dark:border-neutral-800 p-4 sm:p-6 shadow-sm space-y-4 sm:space-y-5">
            {/* Top Meta Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase px-3 py-1 rounded-full bg-brand-red text-white font-bold shadow-sm">
                  Module {targetIndex + 1 < 10 ? `0${targetIndex + 1}` : targetIndex + 1}
                </span>
                {currentModule.duration && (
                  <span className="text-xs font-mono font-semibold text-neutral-600 dark:text-neutral-400 px-2.5 py-1 rounded-full bg-white dark:bg-[#1E1E28] border border-neutral-200 dark:border-neutral-700">
                    ⏱ {currentModule.duration}
                  </span>
                )}
                {isWalking && (
                  <span className="text-[11px] font-mono text-brand-red font-semibold animate-pulse">
                    ● Walking...
                  </span>
                )}
              </div>

              <div className="text-xs font-mono text-neutral-400">
                Milestone {targetIndex + 1} of {count}
              </div>
            </div>

            {/* Title & Pedagogical Summary */}
            <div className="space-y-1.5">
              <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-neutral-900 dark:text-white leading-tight">
                {currentModule.title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {currentModule.summary}
              </p>
            </div>

            {/* Classroom Lab Deliverable (What the Student Actually Builds) */}
            {currentModule.practicalProject && (
              <div className="p-3.5 sm:p-4 rounded-xl bg-brand-red-soft/30 dark:bg-brand-red/10 border border-brand-red/25 space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-brand-red font-bold">
                  <Laptop className="w-4 h-4" />
                  <span>Classroom Lab Deliverable (What You Build):</span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white leading-relaxed">
                  {currentModule.practicalProject}
                </p>
              </div>
            )}

            {/* Key Topics Grid */}
            {currentModule.topics && currentModule.topics.length > 0 && (
              <div className="space-y-2 pt-0.5">
                <div className="text-xs font-mono uppercase text-brand-red font-bold tracking-wider">
                  Key Concepts & Modules Covered:
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-800 dark:text-neutral-200">
                  {currentModule.topics.map((t, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 bg-white dark:bg-[#1E1E28] p-2 sm:p-2.5 rounded-xl border border-neutral-200/70 dark:border-neutral-800 shadow-2xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-red shrink-0 mt-0.5" />
                      <span className="font-medium leading-snug">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tools Mastered */}
            {currentModule.toolsUsed && currentModule.toolsUsed.length > 0 && (
              <div className="space-y-1.5 pt-0.5">
                <div className="flex items-center gap-1.5 text-xs font-mono uppercase text-neutral-500 font-semibold">
                  <Wrench className="w-3.5 h-3.5" />
                  <span>Software & Platforms Mastered:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {currentModule.toolsUsed.map((tool, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-mono font-medium px-2.5 py-1 rounded-lg bg-white dark:bg-[#1E1E28] text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 shadow-2xs"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Actions & Prev/Next Bar (Responsive Wrap & No Cut-offs) */}
            <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-2.5">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => walkToDestination(Math.max(0, targetIndex - 1))}
                  disabled={targetIndex === 0}
                  className={`btn-ghost text-xs py-2 px-3 font-mono flex items-center gap-1.5 border border-neutral-300 dark:border-neutral-700 ${
                    targetIndex === 0 ? "opacity-30 cursor-not-allowed" : "hover:text-brand-red"
                  }`}
                  aria-label="Previous Module"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>

                <button
                  type="button"
                  onClick={() => walkToDestination(Math.min(count - 1, targetIndex + 1))}
                  disabled={targetIndex === count - 1}
                  className={`btn-ghost text-xs py-2 px-3 font-mono flex items-center gap-1.5 border border-neutral-300 dark:border-neutral-700 ${
                    targetIndex === count - 1 ? "opacity-30 cursor-not-allowed" : "hover:text-brand-red"
                  }`}
                  aria-label="Next Module"
                >
                  <span>Next</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <Link
                href={`/enquire?p=${course.id}`}
                className="btn-red py-2.5 px-4 text-xs font-bold whitespace-nowrap flex items-center justify-center gap-1.5 shadow-md shadow-brand-red/20 shrink-0"
              >
                <span>Book Demo for this Module</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

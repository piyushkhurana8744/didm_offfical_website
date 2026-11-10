"use client";

import { useMemo } from "react";
import { StudentJourneyAvatar } from "./StudentJourneyAvatar";
import type { SyllabusTopic } from "@/types/content";

interface RoadmapPathProps {
  syllabus: SyllabusTopic[];
  activeIndex: number;
  onSelectModule: (index: number) => void;
}

export function RoadmapPath({
  syllabus,
  activeIndex,
  onSelectModule,
}: RoadmapPathProps) {
  const count = syllabus.length;

  // Calculate coordinates for checkpoints along a winding S-curve
  const points = useMemo(() => {
    const width = 100; // percentage
    const stepHeight = 90; // px per node row
    return syllabus.map((_, i) => {
      // Winding snake pattern: alternate left and right
      const isEven = i % 2 === 0;
      const x = isEven ? 20 : 80;
      const y = 50 + i * stepHeight;
      return { x, y, index: i };
    });
  }, [syllabus]);

  const totalHeight = Math.max(380, points[points.length - 1]?.y + 60 || 400);

  // SVG curved path connecting all points
  const pathD = useMemo(() => {
    if (points.length < 2) return "";
    let d = `M ${points[0].x}% ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];
      const midY = (p1.y + p2.y) / 2;
      // Cubic bezier curve between p1 and p2
      d += ` C ${p1.x}% ${midY}, ${p2.x}% ${midY}, ${p2.x}% ${p2.y}`;
    }
    return d;
  }, [points]);

  const currentPoint = points[activeIndex] || points[0];

  return (
    <div className="relative w-full overflow-hidden select-none" style={{ height: `${totalHeight}px` }}>
      {/* Background SVG Path */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Base Track */}
        <path
          d={pathD}
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="6 6"
          className="text-neutral-200 dark:text-neutral-800"
        />

        {/* Highlighted Traveled Track */}
        {points.length > 1 && (
          <path
            d={pathD}
            fill="none"
            stroke="#C8102E"
            strokeWidth="4"
            strokeLinecap="round"
            style={{
              transition: "stroke-dashoffset 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
        )}
      </svg>

      {/* Moving Student Avatar (Smoothly transitions to the active checkpoint) */}
      {currentPoint && (
        <div
          className="absolute z-30 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none"
          style={{
            left: `${currentPoint.x}%`,
            top: `${currentPoint.y - 58}px`,
            transform: "translate(-50%, 0)",
          }}
        >
          <StudentJourneyAvatar stepNumber={activeIndex + 1} />
        </div>
      )}

      {/* Checkpoint Nodes along the path */}
      {points.map((pt, idx) => {
        const isActive = idx === activeIndex;
        const isCompleted = idx < activeIndex;
        const mod = syllabus[idx];

        return (
          <div
            key={idx}
            className="absolute z-20 transition-transform duration-300 -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${pt.x}%`,
              top: `${pt.y}px`,
            }}
          >
            <button
              onClick={() => onSelectModule(idx)}
              className={`w-11 h-11 rounded-2xl flex items-center justify-center font-mono font-bold text-xs shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-red ${
                isActive
                  ? "bg-brand-red text-white ring-4 ring-brand-red/30 scale-110 shadow-brand-red/40"
                  : isCompleted
                  ? "bg-emerald-500 text-white hover:scale-105"
                  : "bg-white dark:bg-[#1A1A22] text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 hover:border-brand-red hover:text-brand-red hover:scale-105"
              }`}
              title={`Module ${idx + 1}: ${mod?.title || ""}`}
              aria-label={`Jump to Module ${idx + 1}: ${mod?.title || ""}`}
            >
              <span>{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}</span>
            </button>
          </div>
        );
      })}
    </div>
  );
}


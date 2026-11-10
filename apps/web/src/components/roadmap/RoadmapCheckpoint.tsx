"use client";

import { Check, BookOpen } from "lucide-react";

interface RoadmapCheckpointProps {
  index: number;
  title: string;
  duration?: string;
  isActive: boolean;
  isCompleted: boolean;
  onClick: () => void;
}

export function RoadmapCheckpoint({
  index,
  title,
  duration,
  isActive,
  isCompleted,
  onClick,
}: RoadmapCheckpointProps) {
  const stepNumber = index + 1;

  return (
    <button
      onClick={onClick}
      role="tab"
      aria-selected={isActive}
      aria-label={`Module ${stepNumber}: ${title}`}
      className={`group relative flex items-center gap-3.5 p-3 rounded-2xl text-left transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red ${
        isActive
          ? "bg-brand-red text-white shadow-xl shadow-brand-red/25 scale-[1.02]"
          : isCompleted
          ? "bg-neutral-100 dark:bg-[#1A1A22] text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200/80 dark:hover:bg-[#22222D]"
          : "bg-white/60 dark:bg-[#131319]/60 text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-[#1A1A22]"
      }`}
    >
      {/* Node Circle */}
      <div
        className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono font-bold text-xs shrink-0 transition-colors duration-300 ${
          isActive
            ? "bg-white text-brand-red shadow-inner"
            : isCompleted
            ? "bg-emerald-500 text-white"
            : "bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 group-hover:bg-brand-red group-hover:text-white"
        }`}
      >
        {isCompleted && !isActive ? (
          <Check className="w-4 h-4 stroke-[2.5]" />
        ) : (
          <span>{stepNumber < 10 ? `0${stepNumber}` : stepNumber}</span>
        )}
      </div>

      {/* Module Title & Duration */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span
            className={`text-[10px] font-mono uppercase font-bold tracking-wider ${
              isActive
                ? "text-white/80"
                : isCompleted
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-neutral-400"
            }`}
          >
            Module {stepNumber}
          </span>
          {duration && (
            <span
              className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                isActive ? "bg-white/20 text-white" : "text-neutral-400 bg-neutral-200/50 dark:bg-neutral-800"
              }`}
            >
              {duration}
            </span>
          )}
        </div>
        <div
          className={`text-xs font-bold truncate mt-0.5 ${
            isActive ? "text-white" : "text-neutral-900 dark:text-white"
          }`}
        >
          {title}
        </div>
      </div>
    </button>
  );
}


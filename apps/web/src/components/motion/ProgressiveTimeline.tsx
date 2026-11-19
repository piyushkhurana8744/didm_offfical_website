"use client";

import { useRef, useState, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";

interface TimelineMilestone {
  yearOrStage: string;
  title: string;
  description: string;
  badge?: string;
}

interface ProgressiveTimelineProps {
  milestones: TimelineMilestone[];
  className?: string;
}

export function ProgressiveTimeline({
  milestones,
  className = "",
}: ProgressiveTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | undefined;
    const observe = () => {
      observer?.disconnect();
      if (media.matches || !("IntersectionObserver" in window)) {
        setActiveStep(milestones.length);
        return;
      }
      setActiveStep(0);
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = Number((entry.target as HTMLElement).dataset.timelineItem);
            setActiveStep(previous => Math.max(previous, index + 1));
            observer?.unobserve(entry.target);
          }
        });
      }, { threshold: .25 });
      element.querySelectorAll("[data-timeline-item]").forEach(item => observer?.observe(item));
    };
    observe();
    media.addEventListener("change", observe);
    return () => { observer?.disconnect(); media.removeEventListener("change", observe); };
  }, [milestones.length]);

  return (
    <div ref={containerRef} className={`relative max-w-4xl mx-auto ${className}`}>
      {/* Central Progress Line */}
      <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-1 bg-neutral-200 dark:bg-white/10 -translate-x-1/2 rounded-full overflow-hidden">
        <div
          className="w-full bg-[#b52828] transition-all duration-500 rounded-full"
          style={{
            height: `${Math.min(100, (activeStep / Math.max(1, milestones.length)) * 100)}%`,
          }}
        />
      </div>

      {/* Milestones */}
      <div className="space-y-12">
        {milestones.map((m, idx) => {
          const isPassed = idx < activeStep;
          const isLeft = idx % 2 === 0;

          return (
            <div
              key={idx}
              data-timeline-item={idx}
              className={`relative flex items-center gap-6 md:gap-0 ${
                isLeft ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Timeline Marker Node */}
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center border-4 border-white dark:border-[#0B0C10] transition-all duration-300 shadow-md z-10"
                style={{
                  backgroundColor: isPassed ? "#b52828" : "#e5e7eb",
                  color: isPassed ? "#ffffff" : "#6b7280",
                  transform: isPassed ? "translate(-50%, 0) scale(1.1)" : "translate(-50%, 0) scale(1)",
                }}
              >
                {isPassed ? (
                  <CheckCircle2 className="w-5 h-5 text-white" />
                ) : (
                  <span className="text-xs font-bold">{idx + 1}</span>
                )}
              </div>

              {/* Content Card */}
              <div
                className={`ml-14 md:ml-0 md:w-1/2 ${
                  isLeft ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"
                }`}
              >
                <div
                  className="p-6 rounded-2xl bg-white dark:bg-[#14151e] border border-neutral-200 dark:border-white/10 shadow-sm hover:shadow-md transition-all duration-500"
                  style={{
                    opacity: 1,
                    transform: isPassed ? "translate3d(0, 0, 0)" : "translate3d(0, 16px, 0)",
                  }}
                >
                  <div className={`flex items-center gap-2 mb-2 ${isLeft ? "md:justify-end" : "md:justify-start"}`}>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#b52828]/10 text-[#b52828]">
                      {m.yearOrStage}
                    </span>
                    {m.badge && (
                      <span className="text-xs font-medium text-neutral-500">
                        {m.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-1.5">
                    {m.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
                    {m.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


"use client";

import { useState } from "react";
import { ChevronDown, CheckCircle, Sparkles, Laptop, ShieldCheck } from "lucide-react";

export interface SyllabusModule {
  number: string;
  title: string;
  duration: string;
  summary: string;
  topics: string[];
  toolsUsed: string[];
  practicalProject: string;
}

export function SyllabusAccordion({ modules }: { modules: SyllabusModule[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-3">
      {modules.map((m, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={m.number}
            className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
              isOpen
                ? "border-brand-red/40 bg-white dark:bg-[#131319] shadow-sm"
                : "border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-[#131319]/70 hover:border-neutral-300 dark:hover:border-neutral-700"
            }`}
          >
            <button
              onClick={() => toggle(idx)}
              className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
                  {m.number}
                </span>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white">
                    {m.title}
                  </h4>
                  <div className="text-xs text-neutral-500 mt-0.5">{m.duration}</div>
                </div>
              </div>

              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform shrink-0 ${
                  isOpen ? "rotate-180 bg-brand-red text-white" : "bg-neutral-100 dark:bg-neutral-800 text-neutral-500"
                }`}
              >
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>

            {isOpen && (
              <div className="px-4 pb-5 sm:px-5 sm:pb-6 border-t border-neutral-100 dark:border-neutral-800/80 pt-4 space-y-4 animate-in fade-in">
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {m.summary}
                </p>

                {/* Topics covered */}
                <div className="space-y-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-semibold">
                    Key Topics Covered:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-700 dark:text-neutral-300">
                    {m.topics.map((t, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-brand-red shrink-0 mt-0.5" />
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Practical assignment and tools */}
                <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-[#1A1A22] border border-neutral-200/60 dark:border-neutral-800 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="font-semibold text-neutral-900 dark:text-white block mb-1">
                      🛠️ Tools Mastered:
                    </span>
                    <span className="text-neutral-600 dark:text-neutral-400">
                      {m.toolsUsed.join(" · ")}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-neutral-900 dark:text-white block mb-1">
                      💼 Capstone Assignment:
                    </span>
                    <span className="text-neutral-600 dark:text-neutral-400">
                      {m.practicalProject}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

"use client";

import React, { useState, ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { MOTION_TOKENS } from "./motion-tokens";

interface MotionAccordionItem {
  id: string;
  title: string;
  subtitle?: string;
  content: ReactNode;
  badge?: string;
}

interface MotionAccordionProps {
  items: MotionAccordionItem[];
  defaultOpenId?: string;
  className?: string;
}

export function MotionAccordion({
  items,
  defaultOpenId,
  className = "space-y-3",
}: MotionAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId || null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className={className}>
      {items.map((item) => {
        const isOpen = openId === item.id;

        return (
          <div
            key={item.id}
            className="rounded-xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-[#14151e] overflow-hidden transition-all duration-300 shadow-sm"
          >
            <button
              onClick={() => toggle(item.id)}
              className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-neutral-50/80 dark:hover:bg-white/5 transition"
              aria-expanded={isOpen}
            >
              <div className="space-y-1">
                {item.subtitle && (
                  <span className="text-xs font-bold uppercase tracking-wider text-[#b52828] block">
                    {item.subtitle}
                  </span>
                )}
                <span className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white block leading-snug">
                  {item.title}
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {item.badge && (
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-white/10 text-neutral-600 dark:text-neutral-400">
                    {item.badge}
                  </span>
                )}
                <div
                  className="w-7 h-7 rounded-full bg-neutral-100 dark:bg-white/10 flex items-center justify-center transition-transform duration-300"
                  style={{
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                >
                  <ChevronDown className="w-4 h-4 text-neutral-600 dark:text-neutral-300" />
                </div>
              </div>
            </button>

            <div
              style={{
                maxHeight: isOpen ? "800px" : "0px",
                opacity: isOpen ? 1 : 0,
                transition: `max-height 450ms ${MOTION_TOKENS.easings.cinematic}, opacity 350ms ${MOTION_TOKENS.easings.cinematic}`,
              }}
              className="overflow-hidden"
            >
              <div className="p-5 sm:p-6 pt-0 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 border-t border-neutral-100 dark:border-white/5 leading-relaxed">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}


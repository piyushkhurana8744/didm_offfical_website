"use client";

import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { FAQItem } from "@/data/site-data";

export function FAQSection({ faqs }: { faqs: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-3">
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#131319] overflow-hidden transition-all"
          >
            <button
              onClick={() => toggle(idx)}
              className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left"
              aria-expanded={isOpen}
            >
              <span className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white">
                {faq.q}
              </span>
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                  isOpen ? "bg-brand-red text-white" : "bg-neutral-100 dark:bg-neutral-800 text-neutral-500"
                }`}
              >
                {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
              </div>
            </button>

            {isOpen && (
              <div className="px-4 pb-5 sm:px-5 sm:pb-5 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed border-t border-neutral-100 dark:border-neutral-800/80 pt-3 animate-in fade-in">
                {faq.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

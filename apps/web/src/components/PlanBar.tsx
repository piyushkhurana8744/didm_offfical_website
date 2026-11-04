"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, X } from "lucide-react";

export function PlanBar() {
  const [savedPlan, setSavedPlan] = useState<{
    id: string;
    name: string;
    shortName: string;
    ts: number;
  } | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("didm-plan");
      if (stored) {
        setSavedPlan(JSON.parse(stored));
      }
    } catch {
      // ignore
    }

    const handleStorage = () => {
      try {
        const stored = localStorage.getItem("didm-plan");
        setSavedPlan(stored ? JSON.parse(stored) : null);
      } catch {
        // ignore
      }
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("didm-plan-updated", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("didm-plan-updated", handleStorage);
    };
  }, []);

  if (!savedPlan) return null;

  const handleClear = () => {
    localStorage.removeItem("didm-plan");
    setSavedPlan(null);
    window.dispatchEvent(new Event("didm-plan-updated"));
  };

  return (
    <aside aria-label="Saved plan reminder" className="bg-[#EEF0FF] dark:bg-[#1B1C35] border-b border-[#C7D2FE] dark:border-[#312E81] text-xs md:text-sm text-[#4338CA] dark:text-[#C7D2FE] px-4 py-2.5 transition-all">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 font-medium">
          <Sparkles className="w-4 h-4 text-[#4F46E5] dark:text-[#818CF8] shrink-0" />
          <span>
            Welcome back! Your saved course plan: <strong className="font-semibold text-neutral-900 dark:text-white">{savedPlan.name}</strong>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={`/program?p=${savedPlan.id}`}
            className="inline-flex items-center gap-1 font-semibold text-[#4338CA] dark:text-[#A5B4FC] hover:underline"
          >
            View Details <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <span className="text-neutral-300 dark:text-neutral-600">|</span>
          <Link
            href={`/enquire?p=${savedPlan.id}`}
            className="font-semibold text-brand-red hover:underline"
          >
            Book Free Demo
          </Link>
          <button
            onClick={handleClear}
            className="p-1 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition"
            title="Clear saved plan"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}


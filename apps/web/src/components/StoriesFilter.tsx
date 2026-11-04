"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, Building2, MapPin, Quote, ArrowRight, ExternalLink } from "lucide-react";
import { SITE_DATA, ReviewStory } from "@/data/site-data";

export function StoriesFilter() {
  const [filter, setFilter] = useState<string>("All");

  const categories = ["All", "Job Switch", "Fresh Graduate", "Business Owner", "Freelancer"];

  const filtered = filter === "All"
    ? SITE_DATA.stories
    : SITE_DATA.stories.filter((s) => s.category === filter);

  return (
    <div className="space-y-8">
      {/* Category Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-neutral-200 dark:border-neutral-800">
        {categories.map((cat) => {
          const isActive = filter === cat;
          return (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? "bg-brand-red text-white shadow-sm"
                  : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((story) => (
          <div
            key={story.id}
            className="rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 flex flex-col justify-between card-hover relative"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-brand-red-soft text-brand-red font-bold">
                  {story.category}
                </span>
                <span className="text-xs text-neutral-400 font-mono">
                  {story.course} · {story.center}
                </span>
              </div>

              {/* Quote */}
              <blockquote className="text-sm sm:text-base font-medium text-neutral-800 dark:text-neutral-200 italic leading-relaxed">
                &ldquo;{story.quote}&rdquo;
              </blockquote>

              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed border-t border-neutral-100 dark:border-neutral-800/80 pt-3">
                {story.detailedStory}
              </p>
            </div>

            {/* Profile footer */}
            <div className="pt-6 mt-6 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between gap-3">
              <div>
                <div className="text-sm font-bold text-neutral-900 dark:text-white">
                  {story.name}
                </div>
                <div className="text-xs text-neutral-500 flex items-center gap-1.5 mt-0.5">
                  <Building2 className="w-3.5 h-3.5 text-neutral-400" />
                  <span>{story.role} at <strong className="text-neutral-700 dark:text-neutral-300">{story.company}</strong></span>
                </div>
              </div>

              {story.package && (
                <div className="text-right">
                  <div className="text-[10px] font-mono uppercase text-neutral-400">Package</div>
                  <div className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
                    {story.package}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

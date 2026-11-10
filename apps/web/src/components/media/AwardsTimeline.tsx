"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Award, Calendar, ArrowRight, UserCheck, CheckCircle2, ChevronRight, ExternalLink } from "lucide-react";
import type { AwardRecord } from "@/lib/media-coverage";

interface Props {
  awards: AwardRecord[];
}

export function AwardsTimeline({ awards }: Props) {
  const years = Array.from(new Set(awards.map((a) => a.awardYear))).sort((a, b) => b - a);
  const [activeYear, setActiveYear] = useState<number>(years[0] || 2026);

  const currentAwards = awards.filter((a) => a.awardYear === activeYear);

  return (
    <div className="space-y-8">
      {/* Year Selection Tabs */}
      <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase text-brand-red tracking-wider">
            Verified Milestone Timeline
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white mt-0.5">
            10+ Years of Institutional Recognition
          </h2>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto touch-scroll">
          {years.map((yr) => (
            <button
              key={yr}
              onClick={() => setActiveYear(yr)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold font-mono transition-all ${
                activeYear === yr
                  ? "bg-brand-red text-white shadow-md shadow-brand-red/20 scale-105"
                  : "bg-white dark:bg-[#131319] text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400"
              }`}
            >
              {yr}
            </button>
          ))}
        </div>
      </div>

      {/* Active Year Awards Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {currentAwards.map((award) => (
          <div
            key={award.id}
            className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group space-y-6"
          >
            <div className="space-y-4">
              {/* Image Preview */}
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-800">
                <Image
                  src={award.heroImage}
                  alt={award.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-103"
                />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-black/75 text-white font-mono text-[11px] font-bold backdrop-blur-sm">
                    {award.awardYear}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-brand-red text-white font-mono text-[11px] font-bold">
                    {award.organization.split(" ")[0]}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[11px] font-mono text-brand-red uppercase font-bold tracking-wider">
                  {award.conclaveTitle}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white mt-1 leading-snug">
                  {award.title}
                </h3>
              </div>

              <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-100 dark:border-neutral-800/80 flex items-start gap-2.5 text-xs text-neutral-700 dark:text-neutral-300">
                <UserCheck className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-neutral-900 dark:text-white">Conferred by: </span>
                  <span>{award.presentedBy}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-3">
                {award.description}
              </p>
            </div>

            <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified by Apex Record</span>
              </div>

              <Link
                href={`/media-coverage/${award.slug}`}
                className="text-xs font-bold text-brand-red hover:underline flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
              >
                <span>Read Full Story & Gallery</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


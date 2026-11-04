import Link from "next/link";
import { Star, Building2, Quote, ArrowRight, ExternalLink } from "lucide-react";
import { StoriesFilter } from "@/components/StoriesFilter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Stories & Career Transitions | DIDM Reviews",
  description:
    "Real career stories from fresh graduates, switchers, founders, and freelancers who transformed their trajectories at Delhi Institute of Digital Marketing.",
};

export default function StoriesPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red-soft dark:bg-brand-red/10 text-brand-red text-xs font-mono font-semibold">
            ALUMNI VOICES
          </div>
          <h1 className="text-3xl sm:text-5xl font-normal text-neutral-900 dark:text-white leading-[1.08]">
            Real people. <em>Verified career trajectories</em>.
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Read authentic experiences from learners who built careers at top MNC agencies, scaled
            profitable e-commerce brands, or established remote consulting practices after training at DIDM.
          </p>
        </div>

        {/* External Ratings Strip */}
        <div className="p-6 rounded-3xl bg-neutral-50 dark:bg-[#1A1A22] border border-neutral-200 dark:border-neutral-800 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1 text-amber-500 font-bold">
              <Star className="w-5 h-5 fill-amber-500" />
              <span className="text-2xl text-neutral-900 dark:text-white font-serif">4.8 / 5</span>
            </div>
            <div className="text-xs font-bold text-neutral-800 dark:text-neutral-200">Google Reviews</div>
            <div className="text-[11px] text-neutral-500">Across 13 Delhi NCR branch listings</div>
          </div>
          <div className="space-y-1 border-y sm:border-y-0 sm:border-x border-neutral-200 dark:border-neutral-800 py-3 sm:py-0">
            <div className="flex items-center justify-center gap-1 text-amber-500 font-bold">
              <Star className="w-5 h-5 fill-amber-500" />
              <span className="text-2xl text-neutral-900 dark:text-white font-serif">4.9 / 5</span>
            </div>
            <div className="text-xs font-bold text-neutral-800 dark:text-neutral-200">Justdial Verified</div>
            <div className="text-[11px] text-neutral-500">1,400+ Verified Student Ratings</div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1 text-amber-500 font-bold">
              <Star className="w-5 h-5 fill-amber-500" />
              <span className="text-2xl text-neutral-900 dark:text-white font-serif">4.8 / 5</span>
            </div>
            <div className="text-xs font-bold text-neutral-800 dark:text-neutral-200">Shiksha & Collegedunia</div>
            <div className="text-[11px] text-neutral-500">Top Rated Digital Marketing Institute</div>
          </div>
        </div>

        {/* Interactive Filterable Stories */}
        <StoriesFilter />

        {/* Bottom CTA */}
        <div className="p-8 sm:p-12 rounded-3xl bg-neutral-900 text-white text-center space-y-4">
          <h2 className="text-2xl sm:text-4xl font-normal text-white">
            Want to write your own success story with DIDM?
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto">
            Book a free trial class at your nearest centre and speak directly to current students and mentors.
          </p>
          <div className="pt-2">
            <Link href="/enquire" className="btn-red text-xs py-3 px-6 font-bold">
              Book a Free Trial Session
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


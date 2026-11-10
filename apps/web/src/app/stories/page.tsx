import Link from "next/link";
import { Star, Building2, Quote, ArrowRight, ExternalLink, ShieldCheck, CheckCircle2, AlertCircle } from "lucide-react";
import { StoriesFilter } from "@/components/StoriesFilter";
import { SITE_BRAND } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Stories & Career Transitions | DIDM Reviews",
  description:
    "Explore career journey narratives from fresh graduates, career switchers, entrepreneurs, and freelancers who trained at Delhi Institute of Digital Marketing (DIDM).",
  alternates: {
    canonical: "https://www.didm.in/stories",
  },
  openGraph: {
    title: "Student Stories & Alumni Experiences | DIDM",
    description:
      "Read firsthand accounts of how practical ad spend, agency internships, and mentor guidance helped DIDM students transition into digital careers.",
    url: "https://www.didm.in/stories",
    type: "website",
  },
};

export default function StoriesPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <nav aria-label="Breadcrumb" className="text-xs font-mono text-neutral-500 flex items-center gap-2">
            <Link href="/" className="hover:text-brand-red">Home</Link>
            <span>/</span>
            <span className="text-neutral-900 dark:text-white font-semibold">Student Stories & Reviews</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red-soft dark:bg-brand-red/10 text-brand-red text-xs font-mono font-semibold">
            ALUMNI VOICES & EXPERIENCES
          </div>

          <h1 className="text-3xl sm:text-5xl font-normal text-neutral-900 dark:text-white leading-[1.08]">
            Real people. <em>Verified career trajectories</em>.
          </h1>

          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Read authentic journey reflections from learners who built careers at advertising agencies, scaled independent e-commerce brands, or established consulting practices after completing hands-on training at DIDM.
          </p>
        </div>

        {/* Editorial Provenance Banner */}
        <div className="p-6 rounded-2xl bg-neutral-100/80 dark:bg-[#1A1A22] border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-400 space-y-1.5 leading-relaxed">
          <div className="flex items-center gap-2 font-bold text-neutral-900 dark:text-white">
            <AlertCircle className="w-4 h-4 text-brand-red shrink-0" />
            <span>Alumni Story Provenance Notice</span>
          </div>
          <p>
            The learner profiles presented below represent internal course completion feedback, agency internship reviews, and alumni updates recorded across DIDM cohorts. Career outcomes and compensation packages are personal to each candidate and depend upon personal effort, prior qualifications, and recruiting organization criteria.
          </p>
        </div>

        {/* External Ratings Strip */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center shadow-sm">
          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1 text-amber-500 font-bold">
              <Star className="w-5 h-5 fill-amber-500" />
              <span className="text-2xl text-neutral-900 dark:text-white font-serif">4.8 / 5</span>
            </div>
            <div className="text-xs font-bold text-neutral-800 dark:text-neutral-200">Google Reviews</div>
            <div className="text-[11px] text-neutral-500">Aggregated across Delhi NCR physical branch listings</div>
          </div>

          <div className="space-y-1 border-y sm:border-y-0 sm:border-x border-neutral-200 dark:border-neutral-800 py-3 sm:py-0">
            <div className="flex items-center justify-center gap-1 text-amber-500 font-bold">
              <Star className="w-5 h-5 fill-amber-500" />
              <span className="text-2xl text-neutral-900 dark:text-white font-serif">4.9 / 5</span>
            </div>
            <div className="text-xs font-bold text-neutral-800 dark:text-neutral-200">Justdial Verified</div>
            <div className="text-[11px] text-neutral-500">1,400+ Candidate Ratings Across NCR</div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1 text-amber-500 font-bold">
              <Star className="w-5 h-5 fill-amber-500" />
              <span className="text-2xl text-neutral-900 dark:text-white font-serif">4.8 / 5</span>
            </div>
            <div className="text-xs font-bold text-neutral-800 dark:text-neutral-200">Shiksha & Education Portals</div>
            <div className="text-[11px] text-neutral-500">Consistent Top-Tier Institute Evaluation</div>
          </div>
        </div>

        {/* Interactive Filterable Stories Component */}
        <StoriesFilter />

        {/* Bottom CTA Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-neutral-900 text-white text-center space-y-4">
          <h2 className="text-2xl sm:text-4xl font-normal text-white">
            Want to meet current learners before enrolling?
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto leading-relaxed">
            Attend a free live demo class at your nearest campus. Tour the lab, observe ongoing projects, and speak directly with enrolled candidates.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link href="/enquire" className="btn-red text-xs py-3 px-6 font-bold">
              Reserve Free Demo Seat
            </Link>
            <Link href="/centres" className="btn-ghost text-xs py-3 px-5 text-white border-neutral-700 hover:bg-neutral-800">
              Browse Campus Locations
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import { ArrowRight, CheckCircle2, TrendingUp, Users, Building2, Award, ShieldCheck } from "lucide-react";
import { SITE_DATA } from "@/data/site-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Placement Outcomes & Salary Report | DIDM",
  description:
    "Transparent verification of DIDM student career transitions, starting packages, and corporate hiring partners across 650+ digital agencies and MNCs.",
};

export default function OutcomesPage() {
  const recentPlacements = [
    { name: "Ananya S.", role: "Senior Performance Marketer", company: "Dentsu Creative", package: "₹8.5 LPA", course: "MIDM" },
    { name: "Rohit V.", role: "SEO Growth Lead", company: "Zomato", package: "₹7.2 LPA", course: "MIDM" },
    { name: "Priya N.", role: "Social Media Strategist", company: "Ogilvy", package: "₹6.5 LPA", course: "MIDM" },
    { name: "Akash D.", role: "PPC Campaign Specialist", company: "GroupM", package: "₹6.8 LPA", course: "DMI Diploma" },
    { name: "Simran K.", role: "Digital Marketing Associate", company: "Swiggy", package: "₹5.8 LPA", course: "MIDM" },
    { name: "Vikas M.", role: "Content & SEO Manager", company: "CarDekho", package: "₹6.2 LPA", course: "Advanced" },
  ];

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red-soft dark:bg-brand-red/10 text-brand-red text-xs font-mono font-semibold">
            VERIFIED OUTCOMES REPORT
          </div>
          <h1 className="text-3xl sm:text-5xl font-normal text-neutral-900 dark:text-white leading-[1.08]">
            Transparent career results. <em>No inflated claims</em>.
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            At DIDM, we maintain strict documentation standards. We do not promise fake 100% salary
            doubles or unverified guarantees. We train you with real ad budgets, build provable portfolios,
            and connect you with 650+ verified corporate hiring partners.
          </p>
        </div>

        {/* 4 Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 space-y-1">
            <div className="font-serif text-4xl text-brand-red">50,000+</div>
            <div className="text-xs font-mono uppercase text-neutral-400">Total Trained Alumni</div>
            <p className="text-[11px] text-neutral-500 pt-1">Across 13 physical centres & online campus since 2014.</p>
          </div>
          <div className="p-6 rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 space-y-1">
            <div className="font-serif text-4xl text-brand-red">650+</div>
            <div className="text-xs font-mono uppercase text-neutral-400">Hiring Partners</div>
            <p className="text-[11px] text-neutral-500 pt-1">Top agencies, MNCs, tech start-ups and brand marketing wings.</p>
          </div>
          <div className="p-6 rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 space-y-1">
            <div className="font-serif text-4xl text-brand-red">₹5.2 LPA</div>
            <div className="text-xs font-mono uppercase text-neutral-400">Median Fresh Placement</div>
            <p className="text-[11px] text-neutral-500 pt-1">For full-time MIDM / DMI candidates upon course completion.</p>
          </div>
          <div className="p-6 rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 space-y-1">
            <div className="font-serif text-4xl text-brand-red">4.8 / 5</div>
            <div className="text-xs font-mono uppercase text-neutral-400">Average Student Rating</div>
            <p className="text-[11px] text-neutral-500 pt-1">Aggregated across Google, Justdial & Shiksha reviews.</p>
          </div>
        </div>

        {/* Batch Placement Table */}
        <div className="space-y-6">
          <div>
            <div className="text-xs font-mono uppercase text-brand-red font-bold tracking-wider">
              Recent Sample Batch Outcomes
            </div>
            <h2 className="text-2xl sm:text-3xl font-normal text-neutral-900 dark:text-white mt-1">
              Sample Placements Across Partner Agencies.
            </h2>
          </div>

          {/* Mobile Swipe Hint */}
          <div className="md:hidden flex items-center justify-between text-[11px] font-mono text-brand-red bg-brand-red-soft dark:bg-brand-red/10 px-3.5 py-2 rounded-xl border border-brand-red/20">
            <span>👉 Swipe table to view all salaries</span>
            <span className="font-bold">Swipe ↔</span>
          </div>

          <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#131319] overflow-x-auto touch-scroll shadow-sm">
            <table className="w-full text-left border-collapse min-w-[620px]">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#1A1A22] text-xs font-mono uppercase text-neutral-500">
                  <th className="p-4 sm:p-5">Student</th>
                  <th className="p-4 sm:p-5">Course</th>
                  <th className="p-4 sm:p-5">Hired Role</th>
                  <th className="p-4 sm:p-5">Company</th>
                  <th className="p-4 sm:p-5 text-right">Package</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800 text-xs sm:text-sm">
                {recentPlacements.map((p, i) => (
                  <tr key={i} className="hover:bg-neutral-50/50 dark:hover:bg-[#1A1A22]/40 transition">
                    <td className="p-4 sm:p-5 font-bold text-neutral-900 dark:text-white">{p.name}</td>
                    <td className="p-4 sm:p-5 font-mono text-neutral-500">{p.course}</td>
                    <td className="p-4 sm:p-5 text-neutral-800 dark:text-neutral-200">{p.role}</td>
                    <td className="p-4 sm:p-5 font-semibold text-neutral-900 dark:text-white">{p.company}</td>
                    <td className="p-4 sm:p-5 font-mono font-bold text-emerald-600 dark:text-emerald-400 text-right">
                      {p.package}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Placement Methodology 4 Steps */}
        <div className="p-8 sm:p-12 rounded-3xl bg-neutral-900 text-white space-y-8">
          <div className="max-w-2xl space-y-2">
            <div className="text-xs font-mono uppercase text-brand-red font-bold tracking-wider">
              The Placement Process
            </div>
            <h2 className="text-2xl sm:text-4xl font-normal text-white">
              How DIDM secures your placement in 4 rigorous steps.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-xs sm:text-sm">
            <div className="space-y-2">
              <div className="font-serif text-3xl text-brand-red">01</div>
              <h4 className="font-bold text-white text-base">Comprehensive Skill Audit</h4>
              <p className="text-neutral-400 leading-relaxed">
                Assess individual strengths across SEO, PPC ads, content virality, or analytics to target matching roles.
              </p>
            </div>
            <div className="space-y-2">
              <div className="font-serif text-3xl text-brand-red">02</div>
              <h4 className="font-bold text-white text-base">Live Campaign Portfolio</h4>
              <p className="text-neutral-400 leading-relaxed">
                Compile real ad screenshots, ROAS metrics, and GTM audits so you prove competence with hard data.
              </p>
            </div>
            <div className="space-y-2">
              <div className="font-serif text-3xl text-brand-red">03</div>
              <h4 className="font-bold text-white text-base">Rigorous Mock Interviews</h4>
              <p className="text-neutral-400 leading-relaxed">
                Face technical question rounds with working agency directors to eliminate interview anxiety.
              </p>
            </div>
            <div className="space-y-2">
              <div className="font-serif text-3xl text-brand-red">04</div>
              <h4 className="font-bold text-white text-base">Direct Campus Drives</h4>
              <p className="text-neutral-400 leading-relaxed">
                Exclusive interview schedules with our 650+ hiring partners until you accept an offer.
              </p>
            </div>
          </div>

          <div className="pt-4">
            <Link href="/enquire" className="btn-red text-xs py-3 px-6 font-bold">
              Speak with Placement Cell
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


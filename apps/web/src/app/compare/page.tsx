import Link from "next/link";
import { Check, X, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { SITE_DATA } from "@/data/site-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compare All Digital Marketing Programs | Side-by-Side Matrix | DIDM",
  description:
    "Compare DIDM's courses side-by-side: MIDM vs DMI 1-Year Diploma vs Advanced vs Professional. Review hours, modules, fees, internship, and placement support.",
};

export default function ComparePage() {
  const comparisonData = [
    {
      feature: "Duration",
      midm: "3M (Weekday) / 6M (Weekend)",
      dmi: "12 Months Comprehensive",
      advanced: "2.5 Months (Fast-Track)",
      professional: "3 Months (Flexible/Weekend)",
    },
    {
      feature: "Practical Training Hours",
      midm: "500+ Hours",
      dmi: "400+ Classroom + 3M Agency Floor",
      advanced: "140+ Hours",
      professional: "200+ Strategy Hours",
    },
    {
      feature: "Modules Covered",
      midm: "50+ Modules",
      dmi: "6 Progressive Phases",
      advanced: "25+ Modules",
      professional: "Customized Strategy Tracks",
    },
    {
      feature: "Live Ad Spend Budget",
      midm: "Included (Google & Meta)",
      dmi: "Included (High-Budget Spend)",
      advanced: "Practice Budgets",
      professional: "Audit & Scale Own Business",
    },
    {
      feature: "Internship",
      midm: "2-Month Live Agency Internship",
      dmi: "2-Month Paid Internship + Agency Floor",
      advanced: "Project-Based Internship",
      professional: "Practical Business Execution",
    },
    {
      feature: "Certifications",
      midm: "30+ Global Certifications",
      dmi: "35+ Global Certifications",
      advanced: "27+ Certifications",
      professional: "20+ Certifications",
    },
    {
      feature: "Modern Generative AI Tools",
      midm: "Full Generative AI Stack",
      dmi: "Enterprise Multi-Agent AI",
      advanced: "AI Fundamentals",
      professional: "AI for Business Automation",
    },
    {
      feature: "Placement Support",
      midm: "100% Dedicated (650+ Partners)",
      dmi: "100% + Leadership PPO",
      advanced: "Placement Portal Access",
      professional: "Founder Mentorship",
    },
    {
      feature: "Total Published Fee",
      midm: "₹68,661 (or ₹72,201 instalment)",
      dmi: "₹1,67,518 (0% EMI Available)",
      advanced: "Enquire for Fee",
      professional: "Enquire for Fee",
    },
  ];

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red-soft dark:bg-brand-red/10 text-brand-red text-xs font-mono font-semibold">
            COURSE COMPARISON MATRIX
          </div>
          <h1 className="text-3xl sm:text-5xl font-normal text-neutral-900 dark:text-white leading-[1.08]">
            Side-by-side comparison of <em>all DIDM programs</em>.
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Every learner has different career objectives. Use this matrix to compare syllabus depths,
            internship frameworks, live campaign budgets, and tuition fees.
          </p>
        </div>

        {/* Mobile Swipe Hint */}
        <div className="md:hidden flex items-center justify-between text-[11px] font-mono text-brand-red bg-brand-red-soft dark:bg-brand-red/10 px-3.5 py-2 rounded-xl border border-brand-red/20 -mb-10">
          <span>👉 Swipe horizontally to compare courses</span>
          <span className="font-bold">Swipe ↔</span>
        </div>

        {/* Comparison Table */}
        <div
          role="region"
          aria-label="DIDM Course Comparison Table"
          tabIndex={0}
          className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#131319] overflow-x-auto shadow-sm focus:outline-none focus:ring-2 focus:ring-ai touch-scroll"
        >
          <table className="w-full text-left border-collapse min-w-[760px]">
            <caption className="sr-only">Detailed comparison of DIDM courses</caption>
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#1A1A22]">
                <th scope="col" className="p-4 sm:p-5 text-xs font-mono uppercase text-neutral-500 font-bold w-1/4">
                  Feature / Parameter
                </th>
                <th scope="col" className="p-4 sm:p-5 text-xs font-mono uppercase text-brand-red font-bold w-1/4">
                  MIDM (Benchmark)
                </th>
                <th scope="col" className="p-4 sm:p-5 text-xs font-mono uppercase text-neutral-900 dark:text-white font-bold w-1/4">
                  DMI Diploma (1 Year)
                </th>
                <th scope="col" className="p-4 sm:p-5 text-xs font-mono uppercase text-neutral-900 dark:text-white font-bold w-1/4">
                  Advanced Course
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800 text-xs sm:text-sm">
              {comparisonData.map((row, i) => (
                <tr
                  key={i}
                  className={i % 2 === 0 ? "bg-white dark:bg-[#131319]" : "bg-neutral-50/50 dark:bg-[#1A1A22]/30"}
                >
                  <th scope="row" className="p-4 sm:p-5 font-bold text-neutral-900 dark:text-white">
                    {row.feature}
                  </th>
                  <td className="p-4 sm:p-5 font-semibold text-brand-red bg-brand-red-soft/20 dark:bg-brand-red/5">
                    {row.midm}
                  </td>
                  <td className="p-4 sm:p-5 text-neutral-700 dark:text-neutral-300">
                    {row.dmi}
                  </td>
                  <td className="p-4 sm:p-5 text-neutral-600 dark:text-neutral-400">
                    {row.advanced}
                  </td>
                </tr>
              ))}
              <tr>
                <td className="p-4 sm:p-5 text-xs font-mono uppercase text-neutral-400">Next Step</td>
                <td className="p-4 sm:p-5 bg-brand-red-soft/20 dark:bg-brand-red/5">
                  <Link href="/programs/master-in-digital-marketing" className="btn-red text-xs py-2 px-3 block text-center">
                    View MIDM
                  </Link>
                </td>
                <td className="p-4 sm:p-5">
                  <Link href="#dmi" className="btn-ghost text-xs py-2 px-3 block text-center">
                    Explore DMI
                  </Link>
                </td>
                <td className="p-4 sm:p-5">
                  <Link href="/enquire?p=advanced" className="btn-ghost text-xs py-2 px-3 block text-center">
                    Enquire Advanced
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Deep Dive: DMI 6 Progressive Phases */}
        <div id="dmi" className="space-y-8 pt-8 border-t border-neutral-200 dark:border-neutral-800">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase px-2.5 py-0.5 rounded-full bg-ai-soft dark:bg-ai-soft-dark text-ai dark:text-ai-dark font-bold">
              1-Year Flagship Leadership Track
            </span>
            <h2 className="text-2xl sm:text-4xl font-normal text-neutral-900 dark:text-white mt-2">
              The 6 Phases of the DMI Diploma.
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-2">
              Our most comprehensive credential, structured into 6 mastery phases with 3 months of agency floor residency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                num: "Phase 01",
                title: "Digital Architect",
                focus: "Web infrastructure, UI/UX psychology, and brand foundation engineering.",
              },
              {
                num: "Phase 02",
                title: "Organic Growth Hacker",
                focus: "Entity SEO, topical authority clusters, semantic web, and programmatic content systems.",
              },
              {
                num: "Phase 03",
                title: "Viral Engineer",
                focus: "Short-form video hooks, creator pipelines, social virality, and influencer management.",
              },
              {
                num: "Phase 04",
                title: "Performance Marketer",
                focus: "Scaling Google Ads, Meta Advantage+, CAPI, programmatic DSPs, and CAC optimization.",
              },
              {
                num: "Phase 05",
                title: "Strategist & Freelancer",
                focus: "Upwork enterprise bidding, international client retainer decks, and contract law.",
              },
              {
                num: "Phase 06",
                title: "Master Specialist",
                focus: "Enterprise multi-agent AI automation, custom GPT workflows, and executive capstone.",
              },
            ].map((p, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 space-y-3"
              >
                <div className="font-mono text-xs uppercase font-bold text-brand-red">{p.num}</div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white">{p.title}</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">{p.focus}</p>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-2xl bg-neutral-100 dark:bg-[#1A1A22] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-sm font-bold text-neutral-900 dark:text-white">
                Interested in the 1-Year DMI Diploma?
              </div>
              <div className="text-xs text-neutral-500">
                Tuition: ₹1,67,518 (0% EMI financing starting ₹13,950/mo) · 2-Month Paid Internship
              </div>
            </div>
            <Link href="/enquire?p=dmi" className="btn-red text-xs py-2.5 px-5">
              Apply for DMI Batch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


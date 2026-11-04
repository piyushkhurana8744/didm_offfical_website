import Link from "next/link";
import { Building2, Users, Sparkles, Award, CheckCircle2, ArrowRight, ShieldCheck, Mail, Phone } from "lucide-react";
import { SITE_DATA } from "@/data/site-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Corporate Digital Marketing & AI Training | Hire Talent | DIDM",
  description:
    "Custom corporate marketing upskilling and AI transformation for enterprises. Hire job-ready digital marketing graduates from DIDM with zero recruitment fees.",
};

export default function OrganisationsPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red-soft dark:bg-brand-red/10 text-brand-red text-xs font-mono font-semibold">
            ENTERPRISE & HIRING SOLUTIONS
          </div>
          <h1 className="text-3xl sm:text-5xl font-normal text-neutral-900 dark:text-white leading-[1.08]">
            Empower your marketing team with <em>practical AI capabilities</em>.
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            DIDM delivers bespoke corporate workshops, enterprise marketing transformation bootcamps,
            and provides direct access to hire pre-trained, certified digital marketing talent.
          </p>
        </div>

        {/* 3 Corporate Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-red/10 text-brand-red flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white">Corporate Team Upskilling</h3>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Customized 2-to-6 week cohort workshops for internal marketing departments. Upskill teams in GA4, Meta CAPI, programmatic ads, and CAC reduction.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-ai/10 text-ai flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white">Generative AI Transformation</h3>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Transition traditional marketing workflows into automated AI pipelines. Train content and creative teams on Claude, Midjourney, and Make.com automation.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white">Hire Pre-Vetted Talent</h3>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Access 500+ job-ready graduates every quarter. Every candidate has managed live ad spend and completed a 2-month practical internship. Zero recruitment fees.
            </p>
          </div>
        </div>

        {/* Corporate Hiring Partners showcase */}
        <div className="p-8 sm:p-12 rounded-3xl bg-neutral-100/70 dark:bg-[#1A1A22] border border-neutral-200 dark:border-neutral-800 space-y-6">
          <div className="text-xs font-mono uppercase text-brand-red font-bold tracking-wider">
            Trusted By 650+ Employers Across India
          </div>
          <h2 className="text-2xl sm:text-3xl font-normal text-neutral-900 dark:text-white">
            Where our graduates make an immediate impact.
          </h2>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2">
            {SITE_DATA.hiringPartners.map((partner, i) => (
              <span
                key={i}
                className="px-4 py-2 rounded-xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 text-xs sm:text-sm font-bold text-neutral-800 dark:text-neutral-200"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>

        {/* Contact Corporate Team */}
        <div className="p-8 sm:p-12 rounded-3xl bg-neutral-900 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-mono uppercase px-3 py-1 rounded-full bg-brand-red text-white font-bold">
              Direct Corporate Desk
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Request a Custom Corporate Training Proposal
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300">
              Speak with our Corporate Partnerships Director to tailor a syllabus or conduct an exclusive on-campus recruitment drive.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <a
              href="mailto:corporate@didm.in"
              className="btn-red text-xs py-3 px-5 font-bold flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              <span>Email corporate@didm.in</span>
            </a>
            <a
              href={`tel:${SITE_DATA.brand.phoneClean}`}
              className="btn-ghost text-white border-neutral-700 hover:border-white text-xs py-3 px-5 font-semibold"
            >
              Call 88005 05151
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

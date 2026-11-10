"use client";

import Link from "next/link";
import { Award, CheckCircle2, ShieldCheck, ArrowRight, ExternalLink } from "lucide-react";

const CERTIFICATES = [
  {
    title: "Google Ads Search Certification",
    issuer: "Google Skillshop",
    category: "PPC & Performance",
    badge: "Official Google Credential",
    desc: "Validates mastery in building, managing, and optimizing Google Search ad campaigns.",
    color: "from-blue-500/10 to-transparent border-blue-500/20 text-blue-600 dark:text-blue-400",
  },
  {
    title: "Meta Certified Media Buyer",
    issuer: "Meta Blueprint",
    category: "Social Advertising",
    badge: "Official Meta Credential",
    desc: "Covers campaign planning, Advantage+ machine targeting, pixel setup, and ROAS scaling.",
    color: "from-indigo-500/10 to-transparent border-indigo-500/20 text-indigo-600 dark:text-indigo-400",
  },
  {
    title: "HubSpot Inbound Marketing",
    issuer: "HubSpot Academy",
    category: "Inbound & Funnels",
    badge: "Global Industry Standard",
    desc: "Comprehensive certification covering content funnels, lead nurturing, and email marketing.",
    color: "from-orange-500/10 to-transparent border-orange-500/20 text-orange-600 dark:text-orange-400",
  },
  {
    title: "Google Analytics 4 (GA4) Certification",
    issuer: "Google Analytics Academy",
    category: "Data & Attribution",
    badge: "Data Analytics",
    desc: "Demonstrates capability to set up web/app event tracking, explore funnels, and attribute revenue.",
    color: "from-amber-500/10 to-transparent border-amber-500/20 text-amber-600 dark:text-amber-400",
  },
  {
    title: "DIDM Master In Digital Marketing Diploma",
    issuer: "Delhi Institute of Digital Marketing",
    category: "Full-Stack Diploma",
    badge: "ISO 9001:2015 Accredited",
    desc: "Our gold-standard institutional credential endorsed by ASSOCHAM and WASME SME awards.",
    color: "from-brand-red/10 to-transparent border-brand-red/30 text-brand-red",
  },
  {
    title: "Generative AI Marketing Specialist",
    issuer: "DIDM AI Labs",
    category: "Next-Gen AI Skills",
    badge: "AI 2026 Curriculum",
    desc: "Hands-on proof of mastery in Midjourney ad visuals, Claude copywriting, and automated Zapier funnels.",
    color: "from-purple-500/10 to-transparent border-purple-500/20 text-purple-600 dark:text-purple-400",
  },
];

export function CertificationShowcase() {
  return (
    <section className="py-20 md:py-28 bg-white dark:bg-[#131319] border-t border-neutral-200/80 dark:border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red-soft dark:bg-brand-red/10 text-brand-red text-xs font-mono font-bold uppercase">
              <Award className="w-3.5 h-3.5" />
              <span>INDUSTRY-RECOGNIZED CREDENTIALS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-normal text-neutral-900 dark:text-white leading-tight">
              Graduate with certifications that <em>recruiters respect</em>.
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
              Each student is systematically trained and prepped to clear global certification exams directly from Google, Meta, and HubSpot, in addition to DIDM&apos;s accredited Master Diploma.
            </p>
          </div>

          <Link
            href="/enquire"
            className="btn-red text-xs sm:text-sm py-3 px-6 font-bold shrink-0 shadow-md shadow-brand-red/20"
          >
            Download Certification Guide
          </Link>
        </div>

        {/* Certificate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CERTIFICATES.map((cert, idx) => (
            <div
              key={idx}
              className={`p-6 sm:p-7 rounded-3xl bg-gradient-to-br ${cert.color} bg-white dark:bg-[#131319] border card-hover flex flex-col justify-between`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-neutral-400">
                    {cert.category}
                  </span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
                    {cert.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                    {cert.title}
                  </h3>
                  <div className="text-xs font-semibold text-neutral-500 mt-0.5">
                    Issued by: <strong className="text-neutral-700 dark:text-neutral-300">{cert.issuer}</strong>
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed">
                    {cert.desc}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Exam Prep Included</span>
                </span>
                <span className="text-[11px] font-mono text-neutral-400">Certification preparation support</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


import Link from "next/link";
import { Award, ShieldCheck, CheckCircle2, Building2, MapPin, Phone, Mail, Users } from "lucide-react";
import { SITE_DATA } from "@/data/site-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About DIDM | India's Leading Digital Marketing & AI Institute",
  description:
    "Learn about Delhi Institute of Digital Marketing (DIDM). Established in 2014, over 50,000 alumni, 13 branches, accredited by ASSOCHAM and WASME.",
};

export default function AboutPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red-soft dark:bg-brand-red/10 text-brand-red text-xs font-mono font-semibold">
            ABOUT DELHI INSTITUTE OF DIGITAL MARKETING
          </div>
          <h1 className="text-3xl sm:text-5xl font-normal text-neutral-900 dark:text-white leading-[1.08]">
            Educating India&apos;s next generation of <em>growth architects</em>.
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Founded with a singular mission: to eliminate the vast chasm between outdated college
            theory and the rapid realities of high-growth digital agencies. Over 10+ years, DIDM has
            grown into a recognized national benchmark for hands-on digital marketing education.
          </p>
        </div>

        {/* Core Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-red/10 text-brand-red flex items-center justify-center font-bold">
              01
            </div>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white">Live Ad Budgets Only</h3>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              We never ask students to simulate campaigns on slides. Every cohort receives actual financial budget to execute live Google Ads, Meta Ads, and test creative conversion funnels.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-ai/10 text-ai flex items-center justify-center font-bold">
              02
            </div>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white">AI-First Marketing Stack</h3>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Digital marketing has fundamentally changed. We train students to master prompt engineering, Midjourney, Claude copy systems, and multi-agent Make/Zapier automations.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
              03
            </div>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white">Zero Inflated Claims</h3>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              We uphold complete transparency. We do not use countdown timers, false seat scarcity, or fake salary guarantees. Real career success comes from documented portfolio proof.
            </p>
          </div>
        </div>

        {/* National Accreditations */}
        <div className="p-8 sm:p-12 rounded-3xl bg-neutral-100/70 dark:bg-[#1A1A22] border border-neutral-200 dark:border-neutral-800 space-y-8">
          <div className="max-w-2xl space-y-2">
            <div className="text-xs font-mono uppercase text-brand-red font-bold tracking-wider">
              Accreditations & Honors
            </div>
            <h2 className="text-2xl sm:text-4xl font-normal text-neutral-900 dark:text-white">
              Recognized by premier industry bodies.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 space-y-2">
              <Award className="w-8 h-8 text-brand-red" />
              <div className="font-bold text-sm text-neutral-900 dark:text-white">ASSOCHAM Award</div>
              <p className="text-xs text-neutral-500">Fair Business Practices Award for transparent institutional integrity.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 space-y-2">
              <ShieldCheck className="w-8 h-8 text-brand-red" />
              <div className="font-bold text-sm text-neutral-900 dark:text-white">WASME Award 2021</div>
              <p className="text-xs text-neutral-500">SME Excellence Award for empowering small businesses with digital talent.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 space-y-2">
              <Award className="w-8 h-8 text-brand-red" />
              <div className="font-bold text-sm text-neutral-900 dark:text-white">International Fame 2021</div>
              <p className="text-xs text-neutral-500">Honored as the Most Promising Digital Marketing Institute.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 space-y-2">
              <CheckCircle2 className="w-8 h-8 text-brand-red" />
              <div className="font-bold text-sm text-neutral-900 dark:text-white">ISO 9001:2015</div>
              <p className="text-xs text-neutral-500">Internationally certified Quality Management System in training operations.</p>
            </div>
          </div>
        </div>

        {/* Head Office & Leadership NAP block */}
        <div className="p-8 rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase text-brand-red font-bold">
              Central Institutional Headquarters
            </div>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
              Delhi Institute of Digital Marketing (DIDM)
            </h3>
            <div className="text-xs text-neutral-600 dark:text-neutral-400 space-y-1">
              <div>Plot 12, 3rd Floor, Satya Niketan, opp. Sri Venkateswara College, New Delhi 110021</div>
              <div>Telephone: +91 88005 05151 · Email: info@didm.in</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/centres" className="btn-ghost text-xs py-2.5 px-4">
              All 13 Centres
            </Link>
            <Link href="/enquire" className="btn-red text-xs py-2.5 px-4 font-bold">
              Visit Head Office
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


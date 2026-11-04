import { Suspense } from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Calendar, Clock, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { EnquiryForm } from "@/components/EnquiryForm";
import { SITE_DATA } from "@/data/site-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Free Counseling & Demo Class | DIDM Official",
  description:
    "Schedule a free 1-on-1 counseling session and live classroom demo at any of our 13 physical centres or live online campus. Toll-free: 88005 05151.",
};

export default function EnquirePage() {
  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red-soft dark:bg-brand-red/10 text-brand-red text-xs font-mono font-semibold">
            ADMISSION COUNSELING & DEMO
          </div>
          <h1 className="text-3xl sm:text-5xl font-normal text-neutral-900 dark:text-white leading-[1.08]">
            Experience DIDM firsthand with a <em>free trial demo</em>.
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Reserve a 45-minute 1-on-1 session with an experienced digital marketing mentor. Inspect
            our live ad accounts, review current student portfolios, and receive customized career advice.
          </p>
        </div>

        {/* 2-Column Layout: Benefits & Phone Card (Left), Interactive Form (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: What to expect in demo & direct helpline */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-7 rounded-3xl bg-neutral-100/70 dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 space-y-5">
              <div className="text-xs font-mono uppercase text-brand-red font-bold tracking-wider">
                What to expect during your demo
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-neutral-900 dark:text-white block">Sit in on a Live Class:</strong>
                    Observe actual students running SEO audits or creating Meta ad creatives in real-time.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-neutral-900 dark:text-white block">1-on-1 Career Evaluation:</strong>
                    A senior counselor will assess your background and recommend the highest ROI program for your goals.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-neutral-900 dark:text-white block">Inspect Placement Portfolios:</strong>
                    Examine verified student resumes, live campaign ROAS screenshots, and partner hiring letters.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-neutral-900 dark:text-white block">No Pressure Guarantee:</strong>
                    Zero aggressive sales calls or false scarcity tactics. Make your decision with total clarity.
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Phone Helpline Card */}
            <div className="p-7 rounded-3xl bg-white dark:bg-[#1A1A22] border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
              <div className="text-xs font-mono uppercase text-neutral-400">Prefer speaking directly right now?</div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-brand-red text-white flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-neutral-500">Central Admission Helpline</div>
                  <a
                    href={`tel:${SITE_DATA.brand.phoneClean}`}
                    className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white hover:text-brand-red transition font-mono"
                  >
                    +91 88005 05151
                  </a>
                </div>
              </div>
              <div className="text-xs text-neutral-500 pt-1">
                Mon–Fri 9:00 AM – 9:00 PM · Sat–Sun 9:00 AM – 7:00 PM
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <Suspense fallback={<div className="p-12 text-center text-sm">Loading counseling desk...</div>}>
              <EnquiryForm />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

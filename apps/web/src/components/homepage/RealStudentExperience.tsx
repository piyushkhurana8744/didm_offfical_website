"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, TrendingUp, DollarSign, Laptop, Users, ShieldAlert, Award } from "lucide-react";
import { SafeImage } from "@/components/common/SafeImage";
import { MotionSection, MotionHeading, SplitContentReveal } from "@/components/motion";

export function RealStudentExperience() {
  const pillars = [
    {
      title: "Real Ad Spend Budgets Provided",
      desc: "Unlike institutes teaching on mock paper accounts, DIDM allocates real live advertising budgets on Google Ads and Meta Ads Manager for every student batch.",
      icon: DollarSign,
    },
    {
      title: "2-Month Live Agency Floor Training",
      desc: "Work on live client deliverables inside Online Strikers — DIDM's dedicated in-house digital marketing agency — handling client briefs and performance targets.",
      icon: Laptop,
    },
    {
      title: "1-on-1 Portfolio & Campaign Reviews",
      desc: "Senior strategists dissect your live ROAS, keyword bidding architecture, and conversion tracking to ensure you graduate with enterprise-grade competence.",
      icon: TrendingUp,
    },
    {
      title: "Guaranteed Corporate Interview Drives",
      desc: "Direct access to our dedicated recruitment team connecting you to placement drives across 650+ verified agency and corporate partners.",
      icon: Award,
    },
  ];

  return (
    <MotionSection preset="editorial" className="py-14 sm:py-20 bg-white dark:bg-[#0B0C10] border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header with Masked Reveal */}
        <MotionHeading
          eyebrow="Authentic Classroom & Agency Experience"
          title="Learn Digital Marketing By Doing — Not By Watching Slides"
          description="From Day 1, you operate in simulated and live agency environments. You build landing pages, write ad copy, analyze real heatmaps, and optimize live budgets."
          align="center"
        />

        {/* Split Editorial Layout with Synchronized Motion */}
        <SplitContentReveal
          left={
            <div className="space-y-4">
              <div className="relative aspect-[16/10] w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-lg bg-neutral-900 group">
                <Image
                  src="/images/didm/life/preet-vihar-3.jpg"
                  alt="DIDM Students during hands-on digital marketing classroom workshop"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-brand-red px-2.5 py-0.5 rounded-full font-heading">
                    Agency Floor
                  </span>
                  <p className="text-xs sm:text-sm font-semibold mt-1">
                    Live interactive workstation training across 14 physical campus labs.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-sm bg-neutral-900 group">
                  <Image
                    src="/images/didm/life/Life@DIDM20.jpg"
                    alt="DIDM students presenting campaign ROI analytics"
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-sm bg-neutral-900 group">
                  <Image
                    src="/images/didm/life/preet-vihar-1.jpg"
                    alt="DIDM batch celebration and certificate distribution"
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
          }
          right={
            <div className="space-y-6">
              <div className="space-y-4">
                {pillars.map((p, idx) => {
                  const Icon = p.icon;
                  return (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-neutral-50 dark:bg-[#14151C] border border-neutral-200 dark:border-neutral-800 hover:border-brand-red/40 transition-all flex items-start gap-4 shadow-xs"
                    >
                      <div className="w-10 h-10 rounded-xl bg-brand-red/10 text-brand-red shrink-0 flex items-center justify-center mt-0.5">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-base font-bold text-neutral-900 dark:text-white font-heading">
                          {p.title}
                        </h3>
                        <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                          {p.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href="#demo-enquiry"
                  className="btn-red text-xs sm:text-sm py-3 px-6 font-bold rounded-xl flex items-center gap-2 shadow-sm"
                >
                  <span>Experience a Live Class Free</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <Link
                  href="/gallery"
                  className="text-xs sm:text-sm font-bold text-brand-red hover:underline transition flex items-center gap-1.5"
                >
                  <span>Browse Student Batch Gallery</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          }
        />

      </div>
    </MotionSection>
  );
}

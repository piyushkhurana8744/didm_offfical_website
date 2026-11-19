"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { MotionSection, MotionHeading, StaggeredCardGrid } from "@/components/motion";

export function OriginalMasterMentors() {
  const mentors = [
    {
      name: "Mr. Rahul Gupta",
      designation: "Senior Marketing Strategist",
      company: "Google",
      experience: "12+ Years Industry Experience",
      image: "/images/didm/homepage/Mr_Rahul_Gupta_Senior_Marketing_Strategist_Google.jpeg",
      alt: "Mr. Rahul Gupta - Senior Marketing Strategist at Google & Master Mentor at DIDM",
      expertise: [
        "Search Advertising & Programmatic Bidding",
        "Enterprise Attribution & Performance Max",
        "Large-Scale Growth Funnel Architecture",
      ],
    },
    {
      name: "Mr. Shrey Deepum",
      designation: "Marketing Strategist",
      company: "Google",
      experience: "10+ Years Industry Experience",
      image: "/images/didm/homepage/Shrey_Deepum_Marketing_Strategist_Google.png",
      alt: "Mr. Shrey Deepum - Marketing Strategist at Google & Master Mentor at DIDM",
      expertise: [
        "Conversion Rate Optimization (CRO)",
        "Advanced Analytics & GA4 Instrumentation",
        "Multi-Channel Campaign Scaling",
      ],
    },
  ];

  return (
    <MotionSection preset="depth" className="py-14 sm:py-20 bg-white dark:bg-[#0C0D12] border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        
        {/* Section Heading with Masked Reveal */}
        <MotionHeading
          eyebrow="Learn From Industry Leaders"
          title="Meet Our Master Mentors"
          description="Get started on your journey to digital marketing excellence with the guidance of our master mentors holding real leadership positions at global tech giants."
          align="center"
        />

        {/* Mentors Dual Cards Grid with Staggered Motion */}
        <StaggeredCardGrid className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {mentors.map((m, idx) => (
            <div
              key={idx}
              className="bg-neutral-50 dark:bg-[#14151C] rounded-3xl border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-sm hover:shadow-xl hover:border-brand-red/40 transition-all duration-300 group"
            >
              {/* Mentor Avatar */}
              <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden shrink-0 border-2 border-neutral-200 dark:border-neutral-700 bg-neutral-200 dark:bg-neutral-800 shadow-md">
                <Image sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  src={m.image}
                  alt={m.alt}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Mentor Details */}
              <div className="space-y-3 text-center sm:text-left flex-1">
                <div>
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white font-heading group-hover:text-brand-red transition">
                    {m.name}
                  </h3>
                  <div className="text-xs sm:text-sm font-semibold text-brand-red mt-0.5">
                    {m.designation} · {m.company}
                  </div>
                  <div className="text-[11px] text-neutral-500 font-mono mt-0.5">
                    {m.experience}
                  </div>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-neutral-200 dark:border-neutral-800">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 font-heading">
                    Core Specializations:
                  </div>
                  {m.expertise.map((exp, i) => (
                    <div key={i} className="text-xs text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5 justify-center sm:justify-start">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{exp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </StaggeredCardGrid>

        {/* View All Trainers Link */}
        <div className="text-center pt-2">
          <Link
            href="/trainers"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-red hover:underline transition"
          >
            <span>Meet All 25+ Full-Time Faculty &amp; Industry Practitioners</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </MotionSection>
  );
}


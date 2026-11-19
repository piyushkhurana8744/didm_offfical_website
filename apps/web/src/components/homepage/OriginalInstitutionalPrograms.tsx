"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, GraduationCap, Building2, BookOpen } from "lucide-react";
import { MotionSection, MotionHeading, StaggeredCardGrid } from "@/components/motion";

export function OriginalInstitutionalPrograms() {
  const programs = [
    {
      title: "DIGITAL MARKETING PROGRAM",
      subtitle: "For Students, Graduates & Job Seekers",
      image: "/images/didm/homepage/Master_in_digital_marketing_course_MIDM_DIDM.webp",
      alt: "Digital Marketing Program for Individual Students",
      desc: "Master course, Advanced course, and customized certification programs designed to build high-paying digital skills with guaranteed placement assistance.",
      cta: "Explore Student Programs",
      href: "/programs",
    },
    {
      title: "Educational Institution Program",
      subtitle: "For Colleges, Universities & Campuses",
      image: "/images/didm/homepage/college_program_by_didm.jpg",
      alt: "College and University Digital Marketing Workshops by DIDM",
      desc: "DIDM has conducted faculty development programs, credit-based digital marketing electives, and career bootcamps across 50+ leading universities.",
      cta: "Partner With Your Campus",
      href: "/enquire",
    },
    {
      title: "Corporate Training Program",
      subtitle: "For Enterprises, SMEs & Agency Teams",
      image: "/images/didm/homepage/corporate_training_program.jpg",
      alt: "Corporate Team Upskilling and Training by DIDM",
      desc: "Tailored executive workshops on ROI performance marketing, lead funnels, and generative AI automation to scale internal marketing team output.",
      cta: "Corporate Upskilling Solutions",
      href: "/organisations",
    },
  ];

  return (
    <MotionSection preset="stagger" className="py-14 sm:py-20 bg-white dark:bg-[#0C0D12] border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        
        {/* Section Heading with Masked Reveal */}
        <MotionHeading
          eyebrow="Tailored Training Offerings"
          title="Comprehensive Training Solutions"
          description="Whether you are an individual learner launching your career, a university dean looking for credit electives, or a corporate VP seeking team performance training."
          align="center"
        />

        {/* 3 Program Cards with Staggered Motion */}
        <StaggeredCardGrid className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {programs.map((p, idx) => (
            <div
              key={idx}
              className="bg-neutral-50 dark:bg-[#14151C] rounded-2xl sm:rounded-3xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm hover:shadow-xl hover:border-brand-red/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                  <Image
                    src={p.image}
                    alt={p.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-5 sm:p-6 space-y-3">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white font-heading group-hover:text-brand-red transition">
                      {p.title}
                    </h3>
                    <div className="text-xs font-semibold text-brand-red mt-0.5">
                      {p.subtitle}
                    </div>
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>

              <div className="p-5 sm:p-6 pt-0">
                <Link
                  href={p.href}
                  className="btn-red w-full text-xs py-2.5 px-4 font-bold rounded-xl flex items-center justify-center gap-2 shadow-xs transition-all hover:scale-[1.01]"
                >
                  <span>{p.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </StaggeredCardGrid>

      </div>
    </MotionSection>
  );
}


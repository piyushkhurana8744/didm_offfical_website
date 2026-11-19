"use client";

import { BookOpen, Award, Monitor, CheckCircle } from "lucide-react";
import { MotionSection, MotionHeading, StaggeredCardGrid } from "@/components/motion";

export function OriginalUpskillCareer() {
  const pillars = [
    {
      title: "Advance Knowledge",
      icon: BookOpen,
      desc: "Gain deep, up-to-date domain expertise in AI-driven search, multi-channel performance advertising, and attribution modeling.",
    },
    {
      title: "Quality Training",
      icon: Award,
      desc: "100% practical, hands-on syllabus designed in consultation with corporate hiring managers and leading marketing directors.",
    },
    {
      title: "Smart Classes",
      icon: Monitor,
      desc: "Modern high-tech lab workstations, live campaign screen shares, and continuous doubt-clearing sessions.",
    },
    {
      title: "Certified Expert",
      icon: CheckCircle,
      desc: "Earn 30+ globally accredited certifications from Google, Meta, HubSpot, SEMrush, and government-recognized DIDM credentials.",
    },
  ];

  return (
    <MotionSection preset="stagger" className="py-14 sm:py-20 bg-neutral-50 dark:bg-[#0F1017] border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        
        {/* Section Heading with Masked Reveal */}
        <MotionHeading
          eyebrow="Professional Upskilling"
          title="Upskill Your Career with Digital Marketing Course"
          description="You can become a high-earning digital marketer and growth specialist without leaving your current job. Fast-track your career trajectory with our weekend, weekday, and hybrid batches."
          align="center"
        />

        {/* 4 Cards Grid with Staggered Motion */}
        <StaggeredCardGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-[#151620] border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md hover:border-brand-red/40 transition-all space-y-3 text-center sm:text-left group"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-red/10 text-brand-red flex items-center justify-center mx-auto sm:mx-0 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white font-heading group-hover:text-brand-red transition">
                  {p.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            );
          })}
        </StaggeredCardGrid>

      </div>
    </MotionSection>
  );
}


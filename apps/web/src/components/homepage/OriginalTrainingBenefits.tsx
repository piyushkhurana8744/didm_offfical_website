"use client";

import Image from "next/image";
import { MotionSection, MotionHeading, StaggeredCardGrid } from "@/components/motion";

export function OriginalTrainingBenefits() {
  const benefits = [
    {
      title: "100% Placement Assistance",
      icon: "/images/didm/homepage/2303825.png",
      desc: "Dedicated placement cell connecting trainees to direct interview drives across 650+ hiring partner companies.",
    },
    {
      title: "Focus On Practical Learning",
      icon: "/images/didm/homepage/609124.png",
      desc: "Learn by doing with real campaign executions, keyword bidding, SEO audits, and active ad spend budgets.",
    },
    {
      title: "Experienced Trainers",
      icon: "/images/didm/homepage/1006517.png",
      desc: "Mentors with 8–15+ years of real industry and agency backgrounds guiding you through real corporate challenges.",
    },
    {
      title: "High Quality Training",
      icon: "/images/didm/homepage/2666535.png",
      desc: "Structured up-to-date curriculum aligned with modern search algorithms, AI automation, and performance marketing.",
    },
    {
      title: "Free Doubt Clearing Session",
      icon: "/images/didm/homepage/1256676.png",
      desc: "Special dedicated 1-on-1 mentor support hours to clarify campaign questions and technical roadmaps.",
    },
    {
      title: "Free Backup Session",
      icon: "/images/didm/homepage/2303896.png",
      desc: "Never miss a concept with flexible batch transfers, classroom revision sessions, and full LMS recording archives.",
    },
    {
      title: "650+ Placement Partners",
      icon: "/images/didm/homepage/2303804.png",
      desc: "Established recruiter network spanning top MNCs, performance advertising agencies, and high-growth brands.",
    },
    {
      title: "Freelance & Live Projects",
      icon: "/images/didm/homepage/2303830.png",
      desc: "Build a tangible portfolio by executing client case studies, landing page optimization, and freelance pitch frameworks.",
    },
    {
      title: "Proven Track Record",
      icon: "/images/didm/homepage/2303932.png",
      desc: "Over a decade of leadership (since 2014) with 50,000+ certified alumni building successful digital careers.",
    },
    {
      title: "Internship Offers In Companies",
      icon: "/images/didm/homepage/2303932.png",
      desc: "Practical on-the-job training opportunities and live agency floor internships to bridge the fresher gap.",
    },
    {
      title: "24x7 Customer Support",
      icon: "/images/didm/homepage/1256652.png",
      desc: "Prompt student support portal and coordinator assistance across all 14 physical branches and online batches.",
    },
    {
      title: "30+ Certifications",
      icon: "/images/didm/homepage/2303934.png",
      desc: "Global certifications from Google Ads, Meta Blueprint, HubSpot, SEMrush, and government-recognized DIDM diplomas.",
    },
  ];

  return (
    <MotionSection preset="stagger" className="py-14 sm:py-20 bg-white dark:bg-[#0C0D12] border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        
        {/* Section Heading with Masked Reveal */}
        <MotionHeading
          eyebrow="The DIDM Advantage"
          title="Digital Marketing Course For Transforming Your Career"
          description="Do you lack the practical skills you need to move ahead? Now, you can become an in-demand digital marketing specialist with our industry-recognized practical methodology."
          align="center"
        />

        {/* 12 Feature Blocks Grid with Staggered Cascading Reveal */}
        <StaggeredCardGrid
          staggerMs={60}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6"
        >
          {benefits.map((b, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-2xl bg-neutral-50 dark:bg-[#14151C] border border-neutral-200/80 dark:border-neutral-800 hover:border-brand-red/40 hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center p-2.5 shadow-xs group-hover:scale-105 transition-transform">
                  <Image
                    src={b.icon}
                    alt={b.title}
                    width={40}
                    height={40}
                    className="w-auto h-auto max-h-7 object-contain"
                  />
                </div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-white font-heading group-hover:text-brand-red transition">
                  {b.title}
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {b.desc}
                </p>
              </div>
            </div>
          ))}
        </StaggeredCardGrid>

      </div>
    </MotionSection>
  );
}


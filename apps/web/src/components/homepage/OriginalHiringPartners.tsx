"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";
import { MotionSection, MotionHeading, StaggeredCardGrid } from "@/components/motion";

export function OriginalHiringPartners() {
  const logos = [
    { src: "/images/didm/homepage/logo1.jpg", alt: "Amazon - DIDM Placement Partner" },
    { src: "/images/didm/homepage/logo2.jpg", alt: "Accenture - DIDM Placement Partner" },
    { src: "/images/didm/homepage/logo3.jpg", alt: "Flipkart - DIDM Placement Partner" },
    { src: "/images/didm/homepage/logo4.jpg", alt: "Dentsu - DIDM Placement Partner" },
    { src: "/images/didm/homepage/logo5.jpg", alt: "GroupM - DIDM Placement Partner" },
    { src: "/images/didm/homepage/logo6.jpg", alt: "Cognizant - DIDM Placement Partner" },
    { src: "/images/didm/homepage/logo7.jpg", alt: "Wipro - DIDM Placement Partner" },
    { src: "/images/didm/homepage/logo8.jpg", alt: "Genpact - DIDM Placement Partner" },
  ];

  return (
    <MotionSection preset="stagger" className="py-14 sm:py-20 bg-neutral-50 dark:bg-[#0F1017] border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        
        {/* Section Heading with Masked Reveal */}
        <MotionHeading
          eyebrow="Placement Network"
          title="Companies That Love Our Students"
          description="More than 650+ advertising agencies, direct-to-consumer enterprises, and multinational corporations hire digital talent directly through DIDM campus placement drives."
          align="center"
        />

        {/* Brand Logos Grid with Staggered Cascading Reveal */}
        <StaggeredCardGrid staggerMs={40} className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-6 items-center">
          {logos.map((logo, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white dark:bg-[#151620] border border-neutral-200 dark:border-neutral-800 flex items-center justify-center aspect-[3/2] shadow-xs hover:border-brand-red/40 hover:shadow-md transition-all group"
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <Image sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  className="object-contain p-2 grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
            </div>
          ))}
        </StaggeredCardGrid>

        {/* Outcomes Link */}
        <div className="text-center pt-2">
          <Link
            href="/outcomes"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-red hover:underline transition"
          >
            <span>View Recent Batch Placement Salary Packages &amp; Hiring Records</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </MotionSection>
  );
}


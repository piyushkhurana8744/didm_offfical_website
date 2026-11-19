"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, Trophy, Newspaper } from "lucide-react";
import { MotionSection, MotionHeading, StaggeredCardGrid } from "@/components/motion";

export function OriginalAwardsRecognition() {
  const awards = [
    {
      id: "ifa",
      title: "International Fame Awards (IFA) 2021",
      category: "Best Digital Marketing Institute in India",
      image: "/images/didm/homepage/IFA_AWARD_DIDM.jpg",
      alt: "DIDM awarded at International Fame Awards 2021",
      desc: "Conferred to Delhi Institute of Digital Marketing in recognition of superior training delivery, student career transformation, and decade-long leadership.",
      href: "/media-coverage",
    },
    {
      id: "msme",
      title: "ASSOCHAM MSME Excellence Award",
      category: "Fair Business Practices & Educational Leadership",
      image: "/images/didm/homepage/MSME_AWARD_DIDM.jpg",
      alt: "DIDM receiving ASSOCHAM National MSME Excellence Award",
      desc: "Honored at national summit by the Associated Chambers of Commerce and Industry of India (ASSOCHAM) for ethical training standards.",
      href: "/media-coverage",
    },
    {
      id: "media",
      title: "DIDM In The National News",
      category: "Press & Media Endorsements",
      image: "/images/didm/homepage/MEDIA_NEWS.png",
      alt: "DIDM featured across Hindustan Times, Zee News, ANI, and Outlook",
      desc: "Extensive editorial coverage by leading print and digital national media houses praising DIDM's AI-powered curriculum and agency floor initiatives.",
      href: "/media-coverage",
    },
  ];

  return (
    <MotionSection preset="stagger" className="py-14 sm:py-20 bg-neutral-50 dark:bg-[#0F1017] border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        
        {/* Section Heading with Masked Reveal */}
        <MotionHeading
          eyebrow="Accreditation & Honors"
          title="Delhi Institute of Digital Marketing - DIDM"
          description="HT News, Outlook, Zee News, and apex national chambers have consistently recognized DIDM for setting benchmark standards in modern digital marketing education."
          align="center"
        />

        {/* 3 Awards Cards Grid with Staggered Cascading Reveal */}
        <StaggeredCardGrid className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {awards.map((award) => (
            <div
              key={award.id}
              className="bg-white dark:bg-[#151620] rounded-2xl sm:rounded-3xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm hover:shadow-xl hover:border-brand-red/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                  <Image
                    src={award.image}
                    alt={award.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-brand-red text-white text-[10px] font-bold px-3 py-1 rounded-full font-heading shadow-md">
                    Verified Award
                  </div>
                </div>

                <div className="p-5 sm:p-6 space-y-3">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-red font-heading block">
                      {award.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white font-heading mt-1 group-hover:text-brand-red transition">
                      {award.title}
                    </h3>
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {award.desc}
                  </p>
                </div>
              </div>

              <div className="p-5 sm:p-6 pt-0">
                <Link
                  href={award.href}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-red hover:underline transition"
                >
                  <span>Read Full Award Coverage</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </StaggeredCardGrid>

        {/* Media Coverage Hub Button */}
        <div className="text-center pt-2">
          <Link
            href="/media-coverage"
            className="btn-red text-xs sm:text-sm py-3 px-6 sm:px-8 font-bold inline-flex items-center gap-2 rounded-xl shadow-md shadow-brand-red/20 transition-all hover:scale-[1.02]"
          >
            <span>Explore Complete Awards &amp; Press Archive</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </MotionSection>
  );
}


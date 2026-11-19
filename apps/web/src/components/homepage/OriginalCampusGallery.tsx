"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Camera, Users, MapPin } from "lucide-react";
import { MotionSection, MotionHeading, StaggeredCardGrid } from "@/components/motion";

export function OriginalCampusGallery() {
  const photos = [
    {
      src: "/images/didm/homepage/DIDM_June_Batch_Closing_by-Mr-Siddhartha-sir-in_Preet-Vihar-6.jpg",
      title: "Batch Closing Ceremony",
      location: "Preet Vihar Campus, East Delhi",
      alt: "DIDM June Batch Closing by Mr. Siddhartha at Preet Vihar Campus",
    },
    {
      src: "/images/didm/homepage/DIDM_June_Batch_Closing_by-Mr-Siddhartha-sir-in_Preet-Vihar-5.jpg",
      title: "Certificate Distribution & Celebration",
      location: "Preet Vihar Campus, East Delhi",
      alt: "Students receiving certifications at DIDM Preet Vihar",
    },
    {
      src: "/images/didm/homepage/DIDM_June_Batch_Closing_by-Mr-Siddhartha-sir-in_Preet-Vihar-4.jpg",
      title: "Practical Campaign Review Session",
      location: "Classroom Lab Workstation",
      alt: "DIDM students during practical campaign presentations",
    },
    {
      src: "/images/didm/homepage/DIDM_June_Batch_Closing_by-Mr-Siddhartha-sir-in_Preet-Vihar-3.jpg",
      title: "Student Alumni Group & Mentors",
      location: "Preet Vihar Campus",
      alt: "Graduating batch with DIDM master mentors",
    },
    {
      src: "/images/didm/homepage/DIDM_June_Batch_Closing_by-Mr-Siddhartha-sir-in_Preet-Vihar-2.jpg",
      title: "Agency Floor Project Showcase",
      location: "Satya Niketan HQ Campus",
      alt: "Live agency floor project presentations",
    },
    {
      src: "/images/didm/homepage/DIDM_June_Batch_Closing_by-Mr-Siddhartha-sir-in_Preet-Vihar-1.jpg",
      title: "Trainee Success Milestones",
      location: "Noida Campus",
      alt: "DIDM students celebrating placement selections",
    },
  ];

  return (
    <MotionSection preset="stagger" className="py-14 sm:py-20 bg-white dark:bg-[#0C0D12] border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        
        {/* Section Heading with Masked Reveal */}
        <MotionHeading
          eyebrow="Authentic Life At DIDM"
          title="Smiling Faces, Successful Futures: Discover the DIDM Experience!"
          description="At DIDM, we believe in more than just education—we nurture success, cultivate agency friendships, and celebrate every student milestone across our 14 physical campuses."
          align="center"
        />

        {/* 6 Photo Grid with captions & Staggered Reveal */}
        <StaggeredCardGrid staggerMs={60} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-xl transition-all duration-300 bg-neutral-900"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/20 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                <div className="flex items-center gap-1.5 text-[11px] text-white/80 font-mono">
                  <MapPin className="w-3.5 h-3.5 text-brand-red" />
                  <span>{photo.location}</span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white font-heading truncate">
                  {photo.title}
                </h3>
              </div>
            </div>
          ))}
        </StaggeredCardGrid>

        {/* Explore All Centers Link */}
        <div className="text-center pt-2">
          <Link
            href="/centres"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-red hover:underline transition"
          >
            <span>Locate All 14 Physical Training Centers Across Delhi NCR &amp; India</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </MotionSection>
  );
}


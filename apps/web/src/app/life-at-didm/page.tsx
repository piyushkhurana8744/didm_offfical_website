"use client";

import { EditorialHero } from "@/components/creative/EditorialHero";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Eye,
  Camera,
  Calendar,
  Sparkles,
  ArrowRight,
  MapPin,
  Building,
  Heart,
  Users,
} from "lucide-react";
import { MotionSection } from "@/components/motion/MotionSection";
import { MotionHeading } from "@/components/motion/MotionHeading";
import { StaggeredCardGrid } from "@/components/motion/StaggeredCardGrid";

interface GalleryPhoto {
  src: string;
  alt: string;
  caption?: string;
}

export default function LifeAtDIDMPage() {
  // Lightbox modal state
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number>(0);
  const [currentGalleryList, setCurrentGalleryList] = useState<GalleryPhoto[]>([]);

  // Expand states for galleries
  const [showAllGallery1, setShowAllGallery1] = useState(false);
  const [showAllGallery2, setShowAllGallery2] = useState(false);
  const [showAllGallery3, setShowAllGallery3] = useState(false);
  const [showAllGallery4, setShowAllGallery4] = useState(false);

  // Gallery 1: Campus Infrastructure & Branch Openings (8 photos)
  const gallery1Photos: GalleryPhoto[] = [
    { src: "/images/didm/life/preet-vihar-1.jpg", alt: "DIDM Preet Vihar Branch Ribbon Cutting Inauguration", caption: "Branch Ribbon Cutting Inauguration Ceremony" },
    { src: "/images/didm/life/preet-vihar-2.jpg", alt: "DIDM Founders and Faculty at Campus Launch", caption: "Founders and Faculty at Campus Launch" },
    { src: "/images/didm/life/preet-vihar-3.jpg", alt: "Traditional Lamp Lighting Ceremony at DIDM", caption: "Traditional Lamp Lighting Ceremony" },
    { src: "/images/didm/life/preet-vihar-4.jpg", alt: "Admissions and Student Counseling Office", caption: "Admissions and Student Counseling Office" },
    { src: "/images/didm/life/preet-vihar-5.jpg", alt: "DIDM Executive Boardroom and Conference Facility", caption: "Executive Boardroom and Conference Facility" },
    { src: "/images/didm/life/preet-vihar-6.jpg", alt: "Reception and Visitor Welcome Lounge", caption: "Reception and Visitor Welcome Lounge" },
    { src: "/images/didm/life/preet-vihar-7.jpg", alt: "Campus Corridors and Learning Floor", caption: "Campus Corridors and Learning Floor" },
    { src: "/images/didm/life/preet-vihar-8.jpg", alt: "High-Tech Practical Computer Training Lab", caption: "High-Tech Practical Computer Training Lab" },
  ];

  // Gallery 2: Milestones & Recognitions (3 photos)
  const gallery2Photos: GalleryPhoto[] = [
    { src: "/images/didm/life/Life@DIDM-4.webp", alt: "DIDM Leadership Recognition and Awards", caption: "DIDM Leadership Recognition and Honors" },
    { src: "/images/didm/life/Life@DIDM-3.webp", alt: "Educational Conclave Felicitation by Industry Leaders", caption: "Educational Conclave Felicitation" },
    { src: "/images/didm/life/Life@DIDM-2.webp", alt: "Student Milestone Convocation Ceremony", caption: "Student Milestone Convocation Ceremony" },
  ];

  // Gallery 3: Campus Events, Celebrations & Convocations (16 photos)
  const gallery3Photos: GalleryPhoto[] = [
    { src: "/images/didm/life/Life@DIDM39.jpg", alt: "DIDM Annual Day Celebration and Student Gathering", caption: "Annual Day Celebration & Student Gathering" },
    { src: "/images/didm/life/Life@DIDM38.jpg", alt: "Faculty and Trainee Festive Gathering", caption: "Faculty & Trainee Festive Gathering" },
    { src: "/images/didm/life/Life@DIDM37.jpg", alt: "Cultural Evening and Performance Night", caption: "Cultural Evening and Performance Night" },
    { src: "/images/didm/life/Life@DIDM36.jpg", alt: "Interactive Classroom Workshop Celebration", caption: "Interactive Classroom Workshop Celebration" },
    { src: "/images/didm/life/Life@DIDM35.jpg", alt: "Student Batch Meetup and Networking", caption: "Student Batch Meetup and Networking" },
    { src: "/images/didm/life/Life@DIDM34.jpg", alt: "Diwali Celebration at DIDM Campus", caption: "Diwali Celebration at DIDM Campus" },
    { src: "/images/didm/life/Life@DIDM33.jpg", alt: "Campus Presentation and Milestone Defense", caption: "Campus Presentation and Milestone Defense" },
    { src: "/images/didm/life/Life@DIDM32.jpg", alt: "Classroom Farewell and Certificate Handover", caption: "Classroom Farewell & Certificate Handover" },
    { src: "/images/didm/life/Life@DIDM31.jpg", alt: "Trainee Group Graduation Photo", caption: "Trainee Group Graduation Photo" },
    { src: "/images/didm/life/Life@DIDM30.jpg", alt: "DIDM Conclave and Alumni Reunion", caption: "DIDM Conclave & Alumni Reunion" },
    { src: "/images/didm/life/Life@DIDM29.jpg", alt: "Campus Awards Night and Recognition", caption: "Campus Awards Night & Recognition" },
    { src: "/images/didm/life/Life@DIDM28.jpg", alt: "Student Farewell Party and Dinner", caption: "Student Farewell Party & Dinner" },
    { src: "/images/didm/life/Life@DIDM27.jpg", alt: "Faculty Induction and Mentorship Session", caption: "Faculty Induction & Mentorship Session" },
    { src: "/images/didm/life/Life@DIDM26.jpg", alt: "Batch Anniversary Celebration", caption: "Batch Anniversary Celebration" },
    { src: "/images/didm/life/Life@DIDM25.jpg", alt: "Certificate Distribution Ceremony", caption: "Certificate Distribution Ceremony" },
    { src: "/images/didm/life/Life@DIDM24.jpg", alt: "DIDM Trainee Cohort Commemoration", caption: "DIDM Trainee Cohort Commemoration" },
  ];

  // Gallery 4: Annual Trips, Vacations, Beach Tours & Team Outings (24 photos)
  const gallery4Photos: GalleryPhoto[] = [
    { src: "/images/didm/life/491.jpg", alt: "DIDM Team Outing and Travel Group", caption: "Team Outing & Travel Group" },
    { src: "/images/didm/life/481.jpg", alt: "Faculty and Students Celebration", caption: "Faculty and Students Celebration" },
    { src: "/images/didm/life/471.jpg", alt: "DIDM Team Vacation in Goa", caption: "DIDM Team Vacation in Goa" },
    { src: "/images/didm/life/461.jpg", alt: "Goa Beach Walk and Leisure Tour", caption: "Goa Beach Walk & Leisure Tour" },
    { src: "/images/didm/life/451.jpg", alt: "Beachside Friendship and Team Bonding", caption: "Beachside Friendship & Team Bonding" },
    { src: "/images/didm/life/441.jpg", alt: "Students Resort Pool Party", caption: "Students Resort Pool Party" },
    { src: "/images/didm/life/431.jpg", alt: "Sun and Sand Group Vacation", caption: "Sun & Sand Group Vacation" },
    { src: "/images/didm/life/421.jpg", alt: "Resort Gathering and Evening Social", caption: "Resort Gathering & Evening Social" },
    { src: "/images/didm/life/411.jpg", alt: "Casual Campus Outing and Team Fun", caption: "Casual Campus Outing & Team Fun" },
    { src: "/images/didm/life/401.jpg", alt: "Students Fun Friday Activity", caption: "Students Fun Friday Activity" },
    { src: "/images/didm/life/391.jpg", alt: "Outbound Adventure Camp Experience", caption: "Outbound Adventure Camp Experience" },
    { src: "/images/didm/life/381.jpg", alt: "Annual Retreat Leisure Moments", caption: "Annual Retreat Leisure Moments" },
    { src: "/images/didm/life/371.jpg", alt: "Faculty Recreation and Pool Games", caption: "Faculty Recreation & Pool Games" },
    { src: "/images/didm/life/361.jpg", alt: "Celebration Dinner and Group Cheers", caption: "Celebration Dinner & Group Cheers" },
    { src: "/images/didm/life/351.jpg", alt: "Holiday Tour and Landmark Sightseeing", caption: "Holiday Tour & Landmark Sightseeing" },
    { src: "/images/didm/life/511.jpg", alt: "DIDM Team Gala Evening Celebration", caption: "DIDM Team Gala Evening Celebration" },
    { src: "/images/didm/life/521.jpg", alt: "Corporate Retreat and Team Fellowship", caption: "Corporate Retreat & Team Fellowship" },
    { src: "/images/didm/life/541.jpg", alt: "Festival Gathering and Sweet Distribution", caption: "Festival Gathering & Sweet Distribution" },
    { src: "/images/didm/life/551.jpg", alt: "Group Photo at Sunset Beach", caption: "Group Photo at Sunset Beach" },
    { src: "/images/didm/life/Life@DIDM20.jpg", alt: "Student Festive Dress Day", caption: "Student Festive Dress Day" },
    { src: "/images/didm/life/Life@DIDM21.jpg", alt: "Trainees Cultural Reunion", caption: "Trainees Cultural Reunion" },
    { src: "/images/didm/life/Life@DIDM22.jpg", alt: "DIDM Annual Conclave Dinner", caption: "DIDM Annual Conclave Dinner" },
    { src: "/images/didm/life/Life@DIDM23.jpg", alt: "Team Smiles and Memories", caption: "Team Smiles & Memories" },
  ];

  const openLightbox = (photo: GalleryPhoto, index: number, list: GalleryPhoto[]) => {
    setSelectedPhoto(photo);
    setActiveGalleryIndex(index);
    setCurrentGalleryList(list);
  };

  const nextPhoto = () => {
    if (!currentGalleryList.length) return;
    const nextIdx = (activeGalleryIndex + 1) % currentGalleryList.length;
    setActiveGalleryIndex(nextIdx);
    setSelectedPhoto(currentGalleryList[nextIdx]);
  };

  const prevPhoto = () => {
    if (!currentGalleryList.length) return;
    const prevIdx = (activeGalleryIndex - 1 + currentGalleryList.length) % currentGalleryList.length;
    setActiveGalleryIndex(prevIdx);
    setSelectedPhoto(currentGalleryList[prevIdx]);
  };

  return (
    <div className="creative-page bg-white text-[#222222] font-sans antialiased">
      <EditorialHero bannerRatio={3.75} eyebrow="LIFE AT DIDM" title="Life at DIDM" description="Explore DIDM’s learning spaces, community moments, celebrations and campus life through original photography." image="/images/didm/life/LifeofDIDM-2.webp" alt="Life at DIDM — original community collage" caption="Life at DIDM — original community collage" variant="stories" href="#community-gallery" action="Explore the galleries" />
      <div id="community-gallery" />
      {/* 1. TOP HERO COLLAGE BANNER */}
      <details className="creative-source-art"><summary>Original DIDM community artwork</summary>      <section className="w-full bg-[#8b0000] border-b-4 border-[#ffcc00] overflow-hidden">
        <div className="w-full">
          <Image
            src="/images/didm/life/LifeofDIDM-2.webp"
            alt="Life at DIDM Banner Collage"
            width={1500}
            height={400}
            priority
            sizes="100vw"
            className="w-full h-auto object-cover object-center"
          />
        </div>
      </section></details>


      {/* 2. TITLE SECTION */}
      <MotionSection preset="editorial" className="py-8 sm:py-10 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-2">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-neutral-900">
            LIFE<span className="text-[#c0392b]">@</span>DIDM
          </h2>
          <div className="w-20 h-1 bg-[#c0392b] mx-auto rounded"></div>
          <p className="text-xs sm:text-sm text-neutral-600 max-w-2xl mx-auto pt-1">
            Explore the vibrant life, state-of-the-art campus infrastructure, milestone celebrations, festive events, and unforgettable annual trips across Delhi Institute of Digital Marketing.
          </p>
        </div>
      </MotionSection>

      {/* 3. GALLERY 1: CAMPUS INFRASTRUCTURE & BRANCH LAUNCHES */}
      <MotionSection preset="stagger" className="py-6 sm:py-8 bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {(showAllGallery1 ? gallery1Photos : gallery1Photos.slice(0, 8)).map((photo, i) => (
              <div
                key={i}
                onClick={() => openLightbox(photo, i, gallery1Photos)}
                className="group relative aspect-[4/3] rounded overflow-hidden border border-neutral-200 bg-neutral-100 cursor-pointer shadow-sm hover:shadow-md transition"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 300px"
                  className="object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <div className="w-9 h-9 rounded-full bg-white/90 text-[#c0392b] flex items-center justify-center shadow">
                    <Eye className="w-5 h-5" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-6">
            <button
              onClick={() => setShowAllGallery1(!showAllGallery1)}
              className="inline-flex items-center gap-2 bg-[#b52828] hover:bg-[#8b0000] text-white font-bold px-6 py-2 rounded text-xs uppercase tracking-wider shadow transition"
            >
              <span>{showAllGallery1 ? "View Less" : "View More"}</span>
              <Eye className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </MotionSection>

      {/* 4. GALLERY 2: MILESTONES & RECOGNITION CARDS */}
      <MotionSection preset="depth" className="py-6 sm:py-8 bg-neutral-50 border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {gallery2Photos.map((photo, i) => (
              <div
                key={i}
                onClick={() => openLightbox(photo, i, gallery2Photos)}
                className="group relative aspect-[16/10] rounded-lg overflow-hidden border-2 border-neutral-300 bg-white cursor-pointer shadow hover:shadow-lg transition"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/90 text-[#c0392b] flex items-center justify-center shadow">
                    <Eye className="w-5 h-5" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-6">
            <button
              onClick={() => setShowAllGallery2(!showAllGallery2)}
              className="inline-flex items-center gap-2 bg-[#b52828] hover:bg-[#8b0000] text-white font-bold px-6 py-2 rounded text-xs uppercase tracking-wider shadow transition"
            >
              <span>{showAllGallery2 ? "View Less" : "View More"}</span>
              <Eye className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </MotionSection>

      {/* 5. GALLERY 3: CAMPUS EVENTS & CELEBRATIONS */}
      <MotionSection preset="stagger" className="py-8 sm:py-10 bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {(showAllGallery3 ? gallery3Photos : gallery3Photos.slice(0, 16)).map((photo, i) => (
              <div
                key={i}
                onClick={() => openLightbox(photo, i, gallery3Photos)}
                className="group relative aspect-[4/3] rounded overflow-hidden border border-neutral-200 bg-neutral-100 cursor-pointer shadow-sm hover:shadow-md transition"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 300px"
                  className="object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <div className="w-9 h-9 rounded-full bg-white/90 text-[#c0392b] flex items-center justify-center shadow">
                    <Eye className="w-5 h-5" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-6">
            <button
              onClick={() => setShowAllGallery3(!showAllGallery3)}
              className="inline-flex items-center gap-2 bg-[#b52828] hover:bg-[#8b0000] text-white font-bold px-6 py-2 rounded text-xs uppercase tracking-wider shadow transition"
            >
              <span>{showAllGallery3 ? "View Less" : "View More"}</span>
              <Eye className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </MotionSection>

      {/* 6. GALLERY 4: ANNUAL TRIPS, OUTINGS & BEACH VACATIONS */}
      <MotionSection preset="stagger" className="py-8 sm:py-10 bg-neutral-50 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {(showAllGallery4 ? gallery4Photos : gallery4Photos.slice(0, 20)).map((photo, i) => (
              <div
                key={i}
                onClick={() => openLightbox(photo, i, gallery4Photos)}
                className="group relative aspect-[4/3] rounded overflow-hidden border border-neutral-200 bg-neutral-100 cursor-pointer shadow-sm hover:shadow-md transition"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 300px"
                  className="object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <div className="w-9 h-9 rounded-full bg-white/90 text-[#c0392b] flex items-center justify-center shadow">
                    <Eye className="w-5 h-5" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-6">
            <button
              onClick={() => setShowAllGallery4(!showAllGallery4)}
              className="inline-flex items-center gap-2 bg-[#b52828] hover:bg-[#8b0000] text-white font-bold px-6 py-2 rounded text-xs uppercase tracking-wider shadow transition"
            >
              <span>{showAllGallery4 ? "View Less" : "View More"}</span>
              <Eye className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </MotionSection>

      {/* 7. TRENDING BLOGS SECTION */}
      <MotionSection preset="editorial" className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-900">
              Trending <span className="text-[#c0392b]">Blogs</span>
            </h2>
            <div className="w-16 h-1 bg-[#c0392b] mx-auto mt-2"></div>
          </div>

          <StaggeredCardGrid columns={3} stagger={0.06}>
            <Link
              href="/news-and-events"
              className="group p-5 rounded-lg border border-neutral-200 hover:border-[#c0392b] shadow-sm hover:shadow transition space-y-3"
            >
              <span className="text-[11px] font-bold text-[#c0392b] uppercase tracking-wider">
                Career Guidance
              </span>
              <h3 className="font-bold text-neutral-900 group-hover:text-[#c0392b] transition text-sm sm:text-base leading-snug">
                Top 15 High-Paying Career Opportunities in Digital Marketing in 2026
              </h3>
              <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed">
                Explore in-demand roles like SEO Specialist, PPC Performance Marketer, Social Media Strategist, and AI Content Specialist with average entry packages.
              </p>
              <div className="text-xs font-bold text-[#c0392b] flex items-center gap-1">
                <span>Read More</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
              </div>
            </Link>

            <Link
              href="/news-and-events"
              className="group p-5 rounded-lg border border-neutral-200 hover:border-[#c0392b] shadow-sm hover:shadow transition space-y-3"
            >
              <span className="text-[11px] font-bold text-[#c0392b] uppercase tracking-wider">
                Agency Insights
              </span>
              <h3 className="font-bold text-neutral-900 group-hover:text-[#c0392b] transition text-sm sm:text-base leading-snug">
                Why 100% Practical Training with Live Ad Budgets Outperforms Theory
              </h3>
              <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed">
                Discover why running actual ad spend on Google and Meta transforms student confidence, prepares you for real client audits, and secures job offers.
              </p>
              <div className="text-xs font-bold text-[#c0392b] flex items-center gap-1">
                <span>Read More</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
              </div>
            </Link>

            <Link
              href="/news-and-events"
              className="group p-5 rounded-lg border border-neutral-200 hover:border-[#c0392b] shadow-sm hover:shadow transition space-y-3"
            >
              <span className="text-[11px] font-bold text-[#c0392b] uppercase tracking-wider">
                Campus Highlights
              </span>
              <h3 className="font-bold text-neutral-900 group-hover:text-[#c0392b] transition text-sm sm:text-base leading-snug">
                DIDM Trainees Bag Highest Placement Packages in Q1 2026 Drives
              </h3>
              <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed">
                Our recent graduates from Preet Vihar, Rajouri Garden, and Satya Niketan branches share their journey from classroom learning to MNC appointments.
              </p>
              <div className="text-xs font-bold text-[#c0392b] flex items-center gap-1">
                <span>Read More</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
              </div>
            </Link>
          </StaggeredCardGrid>
        </div>
      </MotionSection>

      {/* 8. LIGHTBOX MODAL */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-10 right-0 text-white hover:text-[#ffcc00] p-1 transition"
              aria-label="Close Modal"
            >
              <X className="w-7 h-7" />
            </button>

            {/* Prev Button */}
            <button
              onClick={prevPhoto}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/90 text-white p-2.5 rounded-full transition z-10"
              aria-label="Previous Photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={nextPhoto}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/90 text-white p-2.5 rounded-full transition z-10"
              aria-label="Next Photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image Container */}
            <div className="relative w-full aspect-[4/3] max-h-[75vh] rounded-lg overflow-hidden border border-neutral-700 bg-neutral-900">
              <Image
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 900px"
                className="object-contain"
              />
            </div>

            {/* Caption & Counter */}
            <div className="w-full text-center mt-3 text-white space-y-1">
              <p className="text-sm font-semibold text-neutral-200">
                {selectedPhoto.caption || selectedPhoto.alt}
              </p>
              <p className="text-xs text-neutral-400 font-mono">
                {activeGalleryIndex + 1} of {currentGalleryList.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

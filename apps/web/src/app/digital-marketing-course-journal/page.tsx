"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Download,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  X,
  ChevronLeft,
  MessageSquare,
  Laptop,
  Sparkles,
  Phone,
  BookOpen,
  ArrowRight,
  Maximize2,
  Calendar,
  Share2,
  CheckCircle2,
  Eye,
  FileText,
} from "lucide-react";
import { EnquiryForm } from "@/components/EnquiryForm";

interface JournalPage {
  pageNumber: number;
  title: string;
  subtitle: string;
  alt: string;
  src: string;
  badge: string;
  highlights: string[];
}

const JOURNAL_PAGES: JournalPage[] = [
  {
    pageNumber: 1,
    title: "India's 1st HYBRID Master Program in Digital Marketing",
    subtitle: "What is in the store for you at Delhi Institute of Digital Marketing",
    alt: "India's 1st HYBRID Master Program in Digital Marketing",
    src: "/images/didm/journal/newpaper1.jpg",
    badge: "Cover Story",
    highlights: [
      "India's 1st Hybrid Program combining classroom mentorship and live agency immersion",
      "Why DIDM? 100% placement assurance, LMS access, and real ad campaign spends",
      "Comprehensive digital marketing foundations and industry curriculum overview",
    ],
  },
  {
    pageNumber: 2,
    title: "DIDM Across PAN India Branches",
    subtitle: "10+ Branches across Delhi-NCR and North India with centralized excellence",
    alt: "DIDM across PAN India Branches",
    src: "/images/didm/journal/newpaper_2.jpg",
    badge: "Campus Network",
    highlights: [
      "10+ Branches across PAN India: Satya Niketan (HQ), Kalkaji, Pitampura, Preet Vihar, Dwarka, Noida, Gurgaon, Meerut",
      "Institutional Vision: Empowering 1,00,000+ youth with digital skills by 2026",
      "Mission: Delivering world-class practical digital education with live project capstones",
    ],
  },
  {
    pageNumber: 3,
    title: "Top 10 Digital Marketing Skills Valued by Recruiters",
    subtitle: "DIDM will guide you how to be the best at Digital Marketing",
    alt: "work skills marketers must have by 2020",
    src: "/images/didm/journal/didm_newspaper_3.jpg",
    badge: "Industry Skills",
    highlights: [
      "Search Engine Optimization (SEO) & Technical Auditing",
      "Pay-Per-Click (PPC) Advertising across Google Ads & Meta Ads",
      "Content Strategy, Social Media Marketing, Analytics & Conversion Rate Optimization",
    ],
  },
  {
    pageNumber: 4,
    title: "The Path Of Conversion Framework",
    subtitle: "Step-by-step roadmap from audience awareness to profitable sales conversion",
    alt: "Digital Marketing Course",
    src: "/images/didm/journal/didm_newspaper_4.jpg",
    badge: "Growth Engine",
    highlights: [
      "Awareness & Traffic Capture through organic and paid channels",
      "Lead Qualification, Retargeting Loops & Value Nurturing",
      "Closing the Conversion Loop with CRO and post-purchase loyalty systems",
    ],
  },
  {
    pageNumber: 5,
    title: "DIDM Success Stories & Reviews",
    subtitle: "Trainee transformations, salary hikes, and real agency testimonials",
    alt: "DIDM Students reviews",
    src: "/images/didm/journal/didm_newspaper_5.jpg",
    badge: "Trainee Voices",
    highlights: [
      "Direct quotes and real experiences from placed alumni across leading digital agencies",
      "Insights on practical classroom assignments and live portfolio building",
      "From fresh graduates to high-earning performance marketers and agency founders",
    ],
  },
  {
    pageNumber: 6,
    title: "Delhi Institute of Digital Marketing - Trainee Reviews",
    subtitle: "Authentic trainee graduation portraits and verified placements",
    alt: "DIDM Students success story",
    src: "/images/didm/journal/didm_newspaper_6.jpg",
    badge: "Hall of Fame",
    highlights: [
      "Graduation photo gallery of successful batch candidates across all centers",
      "Placement verification at top MNCs, startups, and creative digital studios",
      "Student feedback on mentor support, interview preparation, and placement drives",
    ],
  },
  {
    pageNumber: 7,
    title: "Top Digital Marketing Institute in Delhi-NCR",
    subtitle: "DIDM awarded by ASSOCHAM for outstanding educational contribution",
    alt: "Didm awarded by assocham",
    src: "/images/didm/journal/didm_newspaper_7.jpg",
    badge: "Awards & Life",
    highlights: [
      "Prestigious ASSOCHAM recognition as the Most Promising Digital Marketing Institute",
      "Convocation ceremonies, leadership summits, and academic conferences",
      "Vibrant campus life, festival celebrations, and co-working creative culture",
    ],
  },
  {
    pageNumber: 8,
    title: "Choose Your Master in Digital Marketing",
    subtitle: "16+ Global Certifications, Placement Partners, and Career Next Steps",
    alt: "digital marketing career option",
    src: "/images/didm/journal/newspaper_8.jpg",
    badge: "Certifications",
    highlights: [
      "16+ Globally recognized certification badges from Google, Meta, Bing, and HubSpot",
      "Companies that love our students: 450+ hiring partners recruiting continuously",
      "Clear career paths: Digital Marketer, SEO Specialist, Media Buyer, Agency Owner",
    ],
  },
];

export default function DigitalMarketingCourseJournalPage() {
  const [activePageIndex, setActivePageIndex] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [enquiryModalTitle, setEnquiryModalTitle] = useState("Talk to a Career Advisor");

  // Handle keyboard navigation inside lightbox
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (activePageIndex === null) return;
      if (e.key === "Escape") {
        setActivePageIndex(null);
        setZoomLevel(1);
      } else if (e.key === "ArrowLeft") {
        setActivePageIndex((prev) =>
          prev !== null && prev > 0 ? prev - 1 : JOURNAL_PAGES.length - 1
        );
        setZoomLevel(1);
      } else if (e.key === "ArrowRight") {
        setActivePageIndex((prev) =>
          prev !== null && prev < JOURNAL_PAGES.length - 1 ? prev + 1 : 0
        );
        setZoomLevel(1);
      }
    },
    [activePageIndex]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const openLightbox = (index: number) => {
    setActivePageIndex(index);
    setZoomLevel(1);
  };

  const closeLightbox = () => {
    setActivePageIndex(null);
    setZoomLevel(1);
  };

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel((prev) => Math.min(prev + 0.3, 2.5));
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel((prev) => Math.max(prev - 0.3, 0.7));
  };

  const handleResetZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel(1);
  };

  const openEnquiry = (title: string) => {
    setEnquiryModalTitle(title);
    setIsEnquiryModalOpen(true);
  };

  return (
    <div className="creative-page creative-directory min-h-screen bg-[#fafbfc] text-[#222222]">
      {/* 1. TOP BREADCRUMB & ANNOUNCEMENT BAR */}
      <section className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm">
          <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-neutral-500">
            <Link href="/" className="hover:text-[#c0392b] transition">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
            <Link href="/learn" className="hover:text-[#c0392b] transition">
              Resources
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
            <span className="font-semibold text-[#c0392b]">DIDM Journal</span>
          </nav>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 text-[#c0392b] font-medium text-xs border border-red-200">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c0392b] animate-pulse"></span>
              Official Print Edition
            </span>
            <a
              href="tel:+918800505151"
              className="inline-flex items-center gap-1.5 text-neutral-700 hover:text-[#c0392b] font-bold transition text-xs sm:text-sm"
            >
              <Phone className="w-3.5 h-3.5 text-[#c0392b]" />
              <span>+91 8800-505-151</span>
            </a>
          </div>
        </div>
      </section>


      {/* 2. AUTHENTIC HERO HEADLINE SECTION */}
      <section className="py-10 sm:py-14 bg-white border-b border-neutral-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c0392b]/10 text-[#c0392b] text-xs font-bold uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5" />
            DELHI INSTITUTE OF DIGITAL MARKETING • SPECIAL EDITION
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#2c3e50] tracking-tight leading-tight">
            India&apos;s <span className="text-[#2c3e50]">1st </span>
            <span className="text-[#c0392b]">HYBRID </span>
            <span className="text-[#2c3e50]">Master Program in </span>
            <span className="text-[#c0392b]">Digital Marketing</span>
          </h1>

          <p className="max-w-3xl mx-auto text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
            Digital Marketing Course Journal will provide every detail that DIDM offers including its vision,
            mission, PAN-India campus network, conversion frameworks, trainee reviews, awards, and industry placement partners.
          </p>

          {/* Quick Jump Strip */}
          <div className="pt-4 flex flex-wrap justify-center items-center gap-2 sm:gap-3 text-xs sm:text-sm">
            <span className="text-neutral-500 font-semibold mr-1">Jump to Page:</span>
            {JOURNAL_PAGES.map((page, idx) => (
              <a
                key={page.pageNumber}
                href={`#page-${page.pageNumber}`}
                className="px-3 py-1.5 rounded-md bg-neutral-100 hover:bg-[#c0392b] hover:text-white text-neutral-700 font-bold transition border border-neutral-200"
              >
                Page {page.pageNumber}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 3. NEWSPAPER PAGES CONTAINER (Authentic Sequential Render) */}
      <section className="py-8 sm:py-12 bg-neutral-50/70">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {JOURNAL_PAGES.map((page, idx) => (
            <article
              id={`page-${page.pageNumber}`}
              key={page.pageNumber}
              className="bg-white rounded-xl shadow-md hover:shadow-xl border border-neutral-200 overflow-hidden transition-all duration-300 scroll-mt-20"
            >
              {/* Page Header Bar */}
              <div className="bg-[#2c3e50] text-white px-5 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3 border-b-2 border-[#c0392b]">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-0.5 rounded bg-[#c0392b] text-white font-extrabold text-xs uppercase tracking-wide">
                    Page {page.pageNumber} of {JOURNAL_PAGES.length}
                  </span>
                  <h2 className="text-sm sm:text-base font-bold text-white tracking-wide">
                    {page.title}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openLightbox(idx)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition cursor-pointer"
                    title="Click to view full-resolution zoom"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Zoom In</span>
                  </button>
                  <a
                    href={page.src}
                    download={`DIDM_Journal_Page_${page.pageNumber}.jpg`}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#c0392b] hover:bg-[#a92323] text-xs font-semibold text-white transition"
                    title="Download this page"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </a>
                </div>
              </div>

              {/* Newspaper Full Resolution Image */}
              <div
                onClick={() => openLightbox(idx)}
                className="relative w-full cursor-zoom-in bg-neutral-100 group overflow-hidden"
              >
                <Image
                  src={page.src}
                  alt={page.alt}
                  width={2550}
                  height={3300}
                  priority={page.pageNumber <= 2}
                  className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-[1.01]"
                  sizes="(max-width: 1024px) 100vw, 1024px"
                />

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-neutral-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <span className="px-4 py-2 rounded-full bg-neutral-900/80 text-white text-xs font-bold backdrop-blur flex items-center gap-2 shadow-lg">
                    <Maximize2 className="w-4 h-4 text-[#c0392b]" />
                    Click to Open Fullscreen & Zoom (300 DPI)
                  </span>
                </div>
              </div>

              {/* Page Editorial Highlights Card */}
              <div className="p-5 sm:p-6 bg-gradient-to-r from-neutral-50 to-white border-t border-neutral-100">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <span className="text-xs font-extrabold uppercase text-[#c0392b] tracking-wider">
                      {page.badge} • Editorial Summary
                    </span>
                    <p className="text-xs sm:text-sm text-neutral-600 font-medium">
                      {page.subtitle}
                    </p>
                    <ul className="pt-2 grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-neutral-700">
                      {page.highlights.map((item, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#c0392b] flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex-shrink-0 flex items-center gap-2 pt-2 sm:pt-0">
                    <button
                      onClick={() => openLightbox(idx)}
                      className="px-4 py-2 rounded-md bg-neutral-900 hover:bg-[#c0392b] text-white text-xs font-bold transition flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect Details</span>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. FULLSCREEN LIGHTBOX & ZOOM VIEWER */}
      {activePageIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-neutral-950/95 backdrop-blur-md flex flex-col"
          onClick={closeLightbox}
        >
          {/* Lightbox Toolbar */}
          <div
            className="flex items-center justify-between px-4 sm:px-6 py-3 bg-neutral-900/90 border-b border-neutral-800 text-white z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded bg-[#c0392b] text-white font-extrabold text-xs">
                Page {JOURNAL_PAGES[activePageIndex].pageNumber} of {JOURNAL_PAGES.length}
              </span>
              <span className="text-xs sm:text-sm font-semibold truncate max-w-xs sm:max-w-md text-neutral-200">
                {JOURNAL_PAGES[activePageIndex].title}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleZoomOut}
                className="p-1.5 rounded hover:bg-neutral-800 text-neutral-300 hover:text-white transition"
                title="Zoom Out"
              >
                <ZoomOut className="w-5 h-5" />
              </button>
              <span className="text-xs font-mono text-neutral-400 px-1">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                className="p-1.5 rounded hover:bg-neutral-800 text-neutral-300 hover:text-white transition"
                title="Zoom In"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
              <button
                onClick={handleResetZoom}
                className="p-1.5 rounded hover:bg-neutral-800 text-neutral-300 hover:text-white transition"
                title="Reset Zoom"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <div className="h-5 w-px bg-neutral-800 mx-1"></div>

              <a
                href={JOURNAL_PAGES[activePageIndex].src}
                download={`DIDM_Journal_Page_${JOURNAL_PAGES[activePageIndex].pageNumber}.jpg`}
                className="p-1.5 rounded hover:bg-neutral-800 text-neutral-300 hover:text-white transition"
                title="Download High-Res"
              >
                <Download className="w-5 h-5" />
              </a>

              <button
                onClick={closeLightbox}
                className="p-1.5 rounded bg-neutral-800 hover:bg-[#c0392b] text-white transition ml-2"
                title="Close (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Lightbox Body with Interactive Pan & Zoom */}
          <div className="flex-1 relative overflow-auto flex items-center justify-center p-4">
            {/* Prev Navigation Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActivePageIndex((prev) =>
                  prev !== null && prev > 0 ? prev - 1 : JOURNAL_PAGES.length - 1
                );
                setZoomLevel(1);
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-neutral-900/80 hover:bg-[#c0392b] text-white transition shadow-lg cursor-pointer"
              title="Previous Page (Left Arrow)"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Navigation Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActivePageIndex((prev) =>
                  prev !== null && prev < JOURNAL_PAGES.length - 1 ? prev + 1 : 0
                );
                setZoomLevel(1);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-neutral-900/80 hover:bg-[#c0392b] text-white transition shadow-lg cursor-pointer"
              title="Next Page (Right Arrow)"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image Canvas with Scale */}
            <div
              className="transition-transform duration-200 flex items-center justify-center"
              style={{
                transform: `scale(${zoomLevel})`,
                transformOrigin: "center center",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={JOURNAL_PAGES[activePageIndex].src}
                alt={JOURNAL_PAGES[activePageIndex].alt}
                width={2550}
                height={3300}
                className="max-h-[82vh] w-auto object-contain rounded shadow-2xl"
                priority
              />
            </div>
          </div>

          {/* Lightbox Thumbnails Strip */}
          <div
            className="py-3 px-4 bg-neutral-900/90 border-t border-neutral-800 flex justify-center items-center gap-2 overflow-x-auto z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {JOURNAL_PAGES.map((page, idx) => (
              <button
                key={page.pageNumber}
                onClick={() => {
                  setActivePageIndex(idx);
                  setZoomLevel(1);
                }}
                className={`px-3 py-1 rounded text-xs font-bold transition flex items-center gap-1 ${
                  activePageIndex === idx
                    ? "bg-[#c0392b] text-white ring-2 ring-white/50"
                    : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                }`}
              >
                P{page.pageNumber}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 5. SECTION: TRENDING BLOGS (Source-faithful to section 4) */}
      <section className="py-12 bg-white border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-[#2c3e50] tracking-tight">
              Trending <span className="text-[#c0392b]">Blogs</span>
            </h2>
            <div className="w-16 h-1 bg-[#c0392b] mx-auto mt-2"></div>
            <p className="text-xs sm:text-sm text-neutral-600 mt-2">
              Stay ahead with practical insights, performance blueprints, and career guides from DIDM faculty.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/news-and-events"
              className="group p-6 rounded-xl border border-neutral-200 hover:border-[#c0392b] shadow-sm hover:shadow-md transition bg-white space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-[#c0392b] uppercase tracking-wider bg-red-50 px-2.5 py-0.5 rounded">
                  Career Blueprint
                </span>
                <h3 className="font-bold text-neutral-900 group-hover:text-[#c0392b] transition text-base leading-snug">
                  Top 15 High-Paying Career Opportunities in Digital Marketing in 2026
                </h3>
                <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed">
                  Understand how roles in Performance Marketing, AI Search Engineering, and Content Strategy command packages ranging from ₹4.5 LPA to ₹18+ LPA.
                </p>
              </div>
              <div className="text-xs font-bold text-[#c0392b] flex items-center gap-1 pt-2">
                <span>Read Full Article</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
              </div>
            </Link>

            <Link
              href="/news-and-events"
              className="group p-6 rounded-xl border border-neutral-200 hover:border-[#c0392b] shadow-sm hover:shadow-md transition bg-white space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-[#c0392b] uppercase tracking-wider bg-red-50 px-2.5 py-0.5 rounded">
                  AI & Marketing Tech
                </span>
                <h3 className="font-bold text-neutral-900 group-hover:text-[#c0392b] transition text-base leading-snug">
                  How Generative AI Tools are Revolutionizing SEO, Meta Ads & Automation
                </h3>
                <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed">
                  A hands-on breakdown of prompt engineering frameworks, automated ad variations, and GA4 intelligence models taught across DIDM classrooms.
                </p>
              </div>
              <div className="text-xs font-bold text-[#c0392b] flex items-center gap-1 pt-2">
                <span>Read Full Article</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
              </div>
            </Link>

            <Link
              href="/news-and-events"
              className="group p-6 rounded-xl border border-neutral-200 hover:border-[#c0392b] shadow-sm hover:shadow-md transition bg-white space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-[#c0392b] uppercase tracking-wider bg-red-50 px-2.5 py-0.5 rounded">
                  Agency Case Study
                </span>
                <h3 className="font-bold text-neutral-900 group-hover:text-[#c0392b] transition text-base leading-snug">
                  The Path of Conversion: How to Build 5x ROAS Funnels From Scratch
                </h3>
                <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed">
                  Step-by-step walkthrough of the exact conversion architecture published on Page 4 of the official DIDM Journal.
                </p>
              </div>
              <div className="text-xs font-bold text-[#c0392b] flex items-center gap-1 pt-2">
                <span>Read Full Article</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. SECTION 5: LET YOUR DIGITAL CAREER BEGINS NOW.... (Exact source match) */}
      <section className="py-14 sm:py-16 bg-[#fafbfc] border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-900 tracking-tight">
              Let Your Digital Career Begins Now....
            </h2>
            <div className="w-20 h-1 bg-[#c0392b] mx-auto mt-3"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Talk to a Career Advisor */}
            <div className="bg-white rounded-2xl p-8 border border-neutral-200 shadow-sm hover:shadow-lg transition-all duration-300 text-center flex flex-col items-center justify-between space-y-6 group">
              <div className="space-y-4 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-red-50 text-[#c0392b] flex items-center justify-center group-hover:bg-[#c0392b] group-hover:text-white transition duration-300 shadow-inner">
                  <MessageSquare className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-black text-[#c0392b]">
                  Talk to a Career Advisor
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-xs">
                  Get to understand what to learn &amp; how it will help you build a high-growth career in digital marketing.
                </p>
              </div>

              <button
                onClick={() => openEnquiry("Talk to a Career Advisor")}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#c0392b] hover:bg-[#a92323] text-white font-bold text-xs sm:text-sm tracking-wide shadow hover:shadow-md transition cursor-pointer"
              >
                Talk to Advisor
              </button>
            </div>

            {/* Card 2: Attend a Free Demo Session */}
            <div className="bg-white rounded-2xl p-8 border border-neutral-200 shadow-sm hover:shadow-lg transition-all duration-300 text-center flex flex-col items-center justify-between space-y-6 group">
              <div className="space-y-4 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-red-50 text-[#c0392b] flex items-center justify-center group-hover:bg-[#c0392b] group-hover:text-white transition duration-300 shadow-inner">
                  <Laptop className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-black text-[#c0392b]">
                  Attend a Free Demo Session
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-xs">
                  Experience our practical classroom methodology firsthand with an interactive live mentor demo.
                </p>
              </div>

              <button
                onClick={() => openEnquiry("Registered for Free Demo Session")}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#c0392b] hover:bg-[#a92323] text-white font-bold text-xs sm:text-sm tracking-wide shadow hover:shadow-md transition cursor-pointer"
              >
                Registered for Free Demo
              </button>
            </div>

            {/* Card 3: Apply Now */}
            <div className="bg-white rounded-2xl p-8 border border-neutral-200 shadow-sm hover:shadow-lg transition-all duration-300 text-center flex flex-col items-center justify-between space-y-6 group">
              <div className="space-y-4 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-red-50 text-[#c0392b] flex items-center justify-center group-hover:bg-[#c0392b] group-hover:text-white transition duration-300 shadow-inner">
                  <Sparkles className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-black text-[#c0392b]">
                  Apply Now
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-xs">
                  Reserve your seat for the upcoming weekend or weekday batch with merit instalment support.
                </p>
              </div>

              <Link
                href="/enquire"
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#c0392b] hover:bg-[#a92323] text-white font-bold text-xs sm:text-sm tracking-wide shadow hover:shadow-md transition text-center"
              >
                Enroll Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. ENQUIRY MODAL POPUP */}
      {isEnquiryModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setIsEnquiryModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative border border-neutral-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsEnquiryModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 transition"
              title="Close Dialog"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center mb-6 space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#c0392b] bg-red-50 px-2.5 py-0.5 rounded-full">
                DIDM Admissions Helpline
              </span>
              <h3 className="text-xl font-black text-neutral-900">
                {enquiryModalTitle}
              </h3>
              <p className="text-xs text-neutral-600">
                Fill in your details below. Our senior academic counsellor will reach out within 15 minutes.
              </p>
            </div>

            <EnquiryForm />
          </div>
        </div>
      )}
    </div>
  );
}


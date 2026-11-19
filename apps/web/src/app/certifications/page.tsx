"use client";

import { EditorialHero } from "@/components/creative/EditorialHero";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  ChevronUp,
  Download,
  Play,
  ArrowRight,
  Phone,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Award,
  Layers,
  X,
} from "lucide-react";
import { EnquiryForm } from "@/components/EnquiryForm";
import { MotionSection } from "@/components/motion/MotionSection";
import { MotionHeading } from "@/components/motion/MotionHeading";
import { StaggeredCardGrid } from "@/components/motion/StaggeredCardGrid";

interface CertificationItem {
  name: string;
}

interface CertificationGroup {
  id: string;
  title: string;
  logo: string;
  logoAlt: string;
  logoWidth: number;
  logoHeight: number;
  items: CertificationItem[];
}

const CERTIFICATION_GROUPS: CertificationGroup[] = [
  {
    id: "didm-cert",
    title: "DIDM Certification (As per Course)",
    logo: "/images/didm/certifications/didm_logo.png",
    logoAlt: "DIDM Certifications",
    logoWidth: 90,
    logoHeight: 30,
    items: [
      { name: "1. Professional Course" },
      { name: "2. Advanced Course" },
      { name: "3. Master Course" },
    ],
  },
  {
    id: "google-cert",
    title: "09 Google Certification",
    logo: "/images/didm/certifications/google_certificate.png",
    logoAlt: "Google Certifications",
    logoWidth: 80,
    logoHeight: 30,
    items: [
      { name: "1. Google Ads Measurement Certification" },
      { name: "2. AI-Powered Performance Ads Certification" },
      { name: "3. Google Ads Creative Certification" },
      { name: "4. Google Ads Search Certification" },
      { name: "5. Google Ads Display Certification" },
      { name: "6. AI-Powered Shopping Ads Certification" },
      { name: "7. Google Ads Video Certification" },
      { name: "8. Google Ads Apps Certification" },
      { name: "9. Google Analytics Certification" },
    ],
  },
  {
    id: "semrush-cert",
    title: "04SEMrush Certification",
    logo: "/images/didm/certifications/semrush_logo.png",
    logoAlt: "Semrush Certification",
    logoWidth: 80,
    logoHeight: 30,
    items: [
      { name: "1. SEMrush SEO Fundamental" },
      { name: "2. SEMrush Local SEO" },
      { name: "3. SEMrush Mobile SEO" },
      { name: "4. SEMrush On-Page & Technical SEO" },
    ],
  },
  {
    id: "hubspot-cert",
    title: "11 Hubspot Certification",
    logo: "/images/didm/certifications/hubspot_logo.png",
    logoAlt: "Hubspot Certification",
    logoWidth: 80,
    logoHeight: 30,
    items: [
      { name: "1. Hubspot SMO" },
      { name: "2. Hubspot SEO II" },
      { name: "3. Hubspot SEO" },
      { name: "4. Hubspot Digital Advertising" },
      { name: "5. Hubspot Ads" },
      { name: "6. Hubspot Email Marketing" },
      { name: "7. Hubspot Content Marketing" },
      { name: "8. Hubspot Inbound Marketing" },
      { name: "9. Hubspot Social Media Marketing" },
      { name: "10. Hubspot Digital Marketing" },
      { name: "11. Hubspot Social Media Marketing II" },
    ],
  },
  {
    id: "other-cert",
    title: "02 Other Certification",
    logo: "/images/didm/certifications/other_certification_logo.png",
    logoAlt: "Other Certification",
    logoWidth: 70,
    logoHeight: 25,
    items: [
      { name: "1. Google Digital Unlocked" },
      { name: "2. Digital Garage" },
    ],
  },
  {
    id: "master-cert",
    title: "03 Additional Certificates with Master Course",
    logo: "/images/didm/certifications/other_certification_logo.png",
    logoAlt: "Additional Master Certification",
    logoWidth: 70,
    logoHeight: 25,
    items: [
      { name: "1. Experience Certificate - Online Strikers" },
      { name: "2. Creative Content Writing" },
      { name: "3. Graphic Designing" },
    ],
  },
];

export default function CertificationsPage() {
  // Default all groups open as displayed in official HTML
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    "didm-cert": true,
    "google-cert": true,
    "semrush-cert": true,
    "hubspot-cert": true,
    "other-cert": true,
    "master-cert": true,
  });

  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("Get Instant Career Clarity");

  const toggleGroup = (id: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const allOpen: Record<string, boolean> = {};
    CERTIFICATION_GROUPS.forEach((g) => {
      allOpen[g.id] = true;
    });
    setOpenGroups(allOpen);
  };

  const collapseAll = () => {
    setOpenGroups({});
  };

  const openEnquiry = (title: string) => {
    setModalTitle(title);
    setIsEnquiryModalOpen(true);
  };

  return (
    <div className="creative-page min-h-screen bg-[#f8f9fa] text-[#222222]">
      <EditorialHero bannerRatio={3.75} eyebrow="LEARNING & CREDENTIALS" title="Digital Marketing Certifications — DIDM" description="Discover the certifications listed by DIDM, with course-specific learning and industry certification pathways." image="/images/didm/certifications/certification_banner.gif" alt="DIDM certification pathways" caption="DIDM certification pathways" variant="recognition" href="#certification-pathways" action="Explore certifications" />
      <div id="certification-pathways" />
      {/* 1. TOP BREADCRUMB BAR */}
      <section className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm">
          <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-neutral-500">
            <Link href="/" className="hover:text-[#c0392b] transition">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
            <Link href="/learn" className="hover:text-[#c0392b] transition">
              Resources
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
            <span className="font-semibold text-[#c0392b]">30+ Certifications</span>
          </nav>

          <a
            href="tel:+918800505151"
            className="inline-flex items-center gap-1.5 text-neutral-700 hover:text-[#c0392b] font-bold transition text-xs sm:text-sm"
          >
            <Phone className="w-3.5 h-3.5 text-[#c0392b]" />
            <span>+91 8800-505-151</span>
          </a>
        </div>
      </section>

      {/* 2. AUTHENTIC TOP BANNER (GIF) */}
      <details className="creative-source-art"><summary>Original DIDM certification artwork</summary>      <section className="bg-[#b52828] w-full overflow-hidden">
        <div className="w-full">
          <Image
            src="/images/didm/certifications/certification_banner.gif"
            alt="DIDM Provide 30 Plus Certifications"
            width={1500}
            height={400}
            priority
            className="w-full h-auto object-cover"
            sizes="100vw"
          />
        </div>
      </section></details>

      {/* 3. PAGE TITLE */}
      <MotionSection preset="editorial" className="pt-10 pb-6 bg-white border-b border-neutral-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
            <span className="text-[#c0392b]">30+ </span>
            <span className="text-[#222222]">Digital Marketing Certification - </span>
            <span className="text-[#c0392b]">DIDM</span>
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 max-w-2xl mx-auto">
            Earn globally recognized credentials from Google, Meta, SEMrush, HubSpot, and the DIDM Master Diploma to accelerate your digital career.
          </p>
          <div className="pt-2 flex justify-center gap-3 text-xs">
            <button
              onClick={expandAll}
              className="text-[#c0392b] font-bold hover:underline cursor-pointer"
            >
              Expand All
            </button>
            <span className="text-neutral-300">|</span>
            <button
              onClick={collapseAll}
              className="text-neutral-500 font-bold hover:underline cursor-pointer"
            >
              Collapse All
            </button>
          </div>
        </div>
      </MotionSection>

      {/* 4. MAIN ACCORDION / CERTIFICATION TABLE */}
      <MotionSection preset="depth" className="py-8 sm:py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg border border-neutral-300 shadow-sm overflow-hidden divide-y divide-neutral-200">
            {CERTIFICATION_GROUPS.map((group) => {
              const isOpen = !!openGroups[group.id];
              return (
                <div key={group.id} className="transition-colors">
                  {/* Accordion Header */}
                  <button
                    onClick={() => toggleGroup(group.id)}
                    aria-expanded={isOpen}
                    className="w-full px-5 py-4 flex items-center justify-between text-left bg-[#f8f9fa] hover:bg-[#f1f3f5] transition cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-8 flex items-center justify-start flex-shrink-0">
                        <Image
                          src={group.logo}
                          alt={group.logoAlt}
                          width={group.logoWidth}
                          height={group.logoHeight}
                          className="max-h-8 w-auto object-contain"
                        />
                      </div>
                      <span className="text-sm sm:text-base font-bold text-neutral-800">
                        {group.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-red-50 text-[#c0392b] border border-red-200">
                        {group.items.length} {group.items.length === 1 ? "Cert" : "Certs"}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-neutral-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-neutral-500" />
                      )}
                    </div>
                  </button>

                  {/* Accordion Body */}
                  {isOpen && (
                    <div className="bg-white divide-y divide-neutral-100 px-5 sm:px-8 py-2">
                      {group.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="py-3 flex items-center justify-between gap-3 text-xs sm:text-sm text-neutral-700 hover:text-neutral-900"
                        >
                          <div className="flex items-center gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-[#c0392b] flex-shrink-0" />
                            <span className="font-medium">{item.name}</span>
                          </div>
                          <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                            Verified
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </MotionSection>

      {/* 5. STILL CONFUSED...... ?? GET INSTANT CAREER CLARITY */}
      <MotionSection preset="scale" className="py-12 sm:py-16 bg-white border-t border-neutral-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl p-6 sm:p-10 border border-neutral-200 bg-gradient-to-br from-neutral-50 via-white to-red-50/30 shadow-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Title */}
              <div className="lg:col-span-7 space-y-1 text-center lg:text-left">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#c0392b] tracking-tight leading-none">
                  Still Confused...... ??
                </h2>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-neutral-900 tracking-tight pt-1">
                  GET INSTANT CAREER CLARITY
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 pt-2 max-w-md">
                  Not sure which digital marketing certification best aligns with your background? Talk with our senior advisors for 1-on-1 guidance.
                </p>
              </div>

              {/* Right Action Buttons */}
              <div className="lg:col-span-5 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Download Brochure Button */}
                  <button
                    onClick={() => openEnquiry("Download Official Course Brochure")}
                    className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-lg bg-white border border-neutral-200 text-[#b52828] font-bold text-xs sm:text-sm shadow-sm hover:shadow-md hover:scale-[1.02] transition cursor-pointer"
                  >
                    <span>Download Brochure</span>
                    <Download className="w-4 h-4 text-[#b52828]" />
                  </button>

                  {/* Start With Demo Button */}
                  <button
                    onClick={() => openEnquiry("Book Free Live Demo Session")}
                    className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-lg bg-white border border-neutral-200 text-[#b52828] font-bold text-xs sm:text-sm shadow-sm hover:shadow-md hover:scale-[1.02] transition cursor-pointer"
                  >
                    <span>Start With Demo</span>
                    <Play className="w-4 h-4 text-[#b52828] fill-current" />
                  </button>
                </div>

                {/* Training Details Button */}
                <Link
                  href="/programs/master-in-digital-marketing-course"
                  className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-lg bg-white border-2 border-[#b52828] text-[#b52828] hover:bg-[#b52828] hover:text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-sm hover:shadow-md transition text-center"
                >
                  <span>TRAINING DETAILS</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </MotionSection>

      {/* 6. #TRENDING BLOG SECTION */}
      <MotionSection preset="editorial" className="py-12 bg-neutral-50 border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-900">
              #Trending <span className="text-[#c0392b]">Blog</span>
            </h2>
            <div className="w-16 h-1 bg-[#c0392b] mx-auto mt-2"></div>
          </div>

          <StaggeredCardGrid columns={3} stagger={0.06}>
            <Link
              href="/news-and-events"
              className="group p-5 rounded-lg border border-neutral-200 hover:border-[#c0392b] shadow-sm hover:shadow transition bg-white space-y-3"
            >
              <span className="text-[11px] font-bold text-[#c0392b] uppercase tracking-wider">
                Certifications Guide
              </span>
              <h3 className="font-bold text-neutral-900 group-hover:text-[#c0392b] transition text-sm sm:text-base leading-snug">
                Why Google Ads & GA4 Certifications Are Essential for High-Paying Agency Roles
              </h3>
              <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed">
                Discover why Fortune 500 agencies and top e-commerce brands prioritize candidates with hands-on Google Skillshop credentials.
              </p>
              <div className="text-xs font-bold text-[#c0392b] flex items-center gap-1 pt-1">
                <span>Read More</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
              </div>
            </Link>

            <Link
              href="/news-and-events"
              className="group p-5 rounded-lg border border-neutral-200 hover:border-[#c0392b] shadow-sm hover:shadow transition bg-white space-y-3"
            >
              <span className="text-[11px] font-bold text-[#c0392b] uppercase tracking-wider">
                Industry Insights
              </span>
              <h3 className="font-bold text-neutral-900 group-hover:text-[#c0392b] transition text-sm sm:text-base leading-snug">
                HubSpot Inbound & Social Media Certifications: Building B2B Authority in 2026
              </h3>
              <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed">
                How HubSpot&apos;s inbound methodology empowers marketers to generate qualified leads and design automated email drip workflows.
              </p>
              <div className="text-xs font-bold text-[#c0392b] flex items-center gap-1 pt-1">
                <span>Read More</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
              </div>
            </Link>

            <Link
              href="/news-and-events"
              className="group p-5 rounded-lg border border-neutral-200 hover:border-[#c0392b] shadow-sm hover:shadow transition bg-white space-y-3"
            >
              <span className="text-[11px] font-bold text-[#c0392b] uppercase tracking-wider">
                SEO Credentials
              </span>
              <h3 className="font-bold text-neutral-900 group-hover:text-[#c0392b] transition text-sm sm:text-base leading-snug">
                SEMrush Technical & Local SEO Certifications: Mastering Modern Search Rankings
              </h3>
              <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed">
                Master keyword gap analysis, backlink auditing, and on-page technical optimization with SEMrush certification frameworks.
              </p>
              <div className="text-xs font-bold text-[#c0392b] flex items-center gap-1 pt-1">
                <span>Read More</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
              </div>
            </Link>
          </StaggeredCardGrid>
        </div>
      </MotionSection>

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
                {modalTitle}
              </h3>
              <p className="text-xs text-neutral-600">
                Enter your contact info below. Our senior counsellor will connect with you within 15 minutes.
              </p>
            </div>

            <EnquiryForm />
          </div>
        </div>
      )}
    </div>
  );
}

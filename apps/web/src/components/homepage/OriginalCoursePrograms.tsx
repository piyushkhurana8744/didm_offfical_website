"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, Award, BookOpen, Download, Users, Sparkles } from "lucide-react";
import { MotionSection, MotionHeading, StaggeredCardGrid } from "@/components/motion";

export function OriginalCoursePrograms() {
  const courses = [
    {
      id: "midm",
      title: "Master in Digital Marketing (MIDM)",
      badge: "Flagship Accelerator",
      tagline: "India's most comprehensive digital marketing course with 50+ modules and 2-month live agency floor training.",
      image: "/images/didm/homepage/Master_in_digital_marketing_course_MIDM_DIDM.webp",
      alt: "Master in Digital Marketing Course (MIDM) at DIDM",
      duration: "3 to 5 Months",
      format: "Classroom & Online",
      slug: "master-in-digital-marketing-course",
      featured: true,
      highlights: [
        "50+ In-Depth Modules & Practical Labs",
        "2-Month Live Agency Floor at Online Strikers",
        "30+ Globally Recognized Certifications",
        "100% Guaranteed Placement Drives & Support",
        "Live Budgets on Google & Meta Ads",
      ],
    },
    {
      id: "aidm",
      title: "Advanced Digital Marketing (AIDM)",
      badge: "Skill Builder Course",
      tagline: "In-depth training on core search, performance marketing channels, and conversion analytics.",
      image: "/images/didm/homepage/Advanced_in_digital_marketing_course_AIMTP_Course_DIDM.webp",
      alt: "Advanced Digital Marketing Course (AIDM) at DIDM",
      duration: "3 Months",
      format: "Classroom & Hybrid",
      slug: "advanced-digital-marketing-course",
      featured: false,
      highlights: [
        "Search Engine Optimization (SEO) & Web Audits",
        "Performance PPC & Meta Advertising",
        "Social Media & Content Strategy Pipelines",
        "20+ Industry Certifications (Google, HubSpot)",
        "Dedicated Campus Placement Assistance",
      ],
    },
    {
      id: "dmi",
      title: "Digital Marketing Intelligence (DMI)",
      badge: "AI & Growth Marketing",
      tagline: "Executive program integrating generative AI workflows, predictive algorithms, and full-funnel growth automation.",
      image: "/images/didm/homepage/digital-marketing-intelligence.webp",
      alt: "Digital Marketing Intelligence (DMI) Program at DIDM",
      duration: "4 to 6 Months",
      format: "Hybrid & Agency Lab",
      slug: "master-in-digital-marketing-course",
      featured: false,
      highlights: [
        "Generative AI for Copy, Creatives & Funnels",
        "GA4 Advanced Tracking & Server-Side Tagging",
        "Data-Driven Multi-Touch Attribution Models",
        "Enterprise ROAS Scaling on Real Client Accounts",
        "Executive Strategy Sessions with Google Mentors",
      ],
    },
    {
      id: "customized",
      title: "Professional in Digital Marketing",
      badge: "Founders & Executives",
      tagline: "Customized curriculum tailored for entrepreneurs, business owners, and working professionals.",
      image: "/images/didm/homepage/Professional_in_Digital_Marketing_Course_DIDM.webp",
      alt: "Professional in Digital Marketing Course at DIDM",
      duration: "Flexible Batches",
      format: "Weekend & Evenings",
      slug: "customized-digital-marketing-course",
      featured: false,
      highlights: [
        "Hands-On Lead Gen for Your Own Business",
        "Agency Performance Auditing & CAC Control",
        "Mentorship by Senior Marketing Directors",
        "Flexible Weekend Schedules for Professionals",
        "Direct ROI & Conversion Funnel Frameworks",
      ],
    },
  ];

  return (
    <MotionSection id="courses" preset="editorial" className="py-14 sm:py-20 bg-neutral-50 dark:bg-[#0F1017] border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-14">
        
        {/* Section Heading with Masked Reveal */}
        <MotionHeading
          eyebrow="Accredited Career Programs"
          title="Choose the Certification Course for Your Career!"
          description="Explore industry-focused digital marketing courses designed to build practical skills in SEO, PPC advertising, social media growth, web analytics, and modern AI automation."
          align="center"
        />

        {/* 4 Core Course Cards Grid with Staggered Motion */}
        <StaggeredCardGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {courses.map((course) => (
            <div
              key={course.id}
              className={`flex flex-col justify-between bg-white dark:bg-[#151620] rounded-2xl sm:rounded-3xl border transition-all duration-300 overflow-hidden group shadow-sm hover:shadow-xl ${
                course.featured
                  ? "border-brand-red shadow-brand-red/10 ring-2 ring-brand-red/20"
                  : "border-neutral-200 dark:border-neutral-800 hover:border-brand-red/40"
              }`}
            >
              <div>
                {/* Course Artwork Header */}
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                  <Image
                    src={course.image}
                    alt={course.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-brand-red text-white text-[11px] font-bold px-3 py-1 rounded-full font-heading shadow-md">
                    {course.badge}
                  </div>
                </div>

                {/* Course Content Body */}
                <div className="p-5 space-y-4">
                  <div className="space-y-1.5">
                    <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white font-heading group-hover:text-brand-red transition line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed line-clamp-3">
                      {course.tagline}
                    </p>
                  </div>

                  {/* Quick Meta Badges */}
                  <div className="flex items-center gap-2.5 py-2 border-y border-neutral-100 dark:border-neutral-800/80 text-[11px] text-neutral-600 dark:text-neutral-300 font-medium">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-brand-red" />
                      <span>{course.duration}</span>
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-brand-red" />
                      <span>{course.format}</span>
                    </span>
                  </div>

                  {/* Highlights Bullet List */}
                  <div className="space-y-1.5 pt-1">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 font-heading">
                      Course Highlights:
                    </div>
                    <ul className="space-y-1.5">
                      {course.highlights.map((h, i) => (
                        <li key={i} className="text-xs text-neutral-700 dark:text-neutral-300 flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="p-5 pt-0 space-y-2">
                <Link
                  href={`/${course.slug}`}
                  className="btn-red w-full text-xs py-2.5 px-4 font-bold rounded-xl flex items-center justify-center gap-2 shadow-xs transition-all hover:scale-[1.01]"
                >
                  <span>Explore Course &amp; Syllabus</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <div className="flex items-center justify-between text-[11px] pt-1 px-1 text-neutral-500">
                  <a
                    href="/brochure"
                    className="hover:text-brand-red flex items-center gap-1 transition"
                  >
                    <Download className="w-3 h-3" />
                    <span>Brochure</span>
                  </a>
                  <a
                    href="#demo-enquiry"
                    className="hover:text-brand-red font-semibold transition"
                  >
                    Book Free Demo →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </StaggeredCardGrid>

        {/* Global Accreditation Strip */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#14151E] border border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-sm font-bold text-neutral-900 dark:text-white font-heading">
              Need assistance selecting the right program?
            </div>
            <div className="text-xs text-neutral-500">
              Our academic counsellors evaluate your current background, career goals, and available schedule for personalized batch recommendations.
            </div>
          </div>
          <a
            href="#demo-enquiry"
            className="btn-ghost text-xs py-2 px-4 rounded-xl border border-neutral-300 dark:border-neutral-700 font-bold hover:border-brand-red"
          >
            Request Syllabus Comparison
          </a>
        </div>

      </div>
    </MotionSection>
  );
}
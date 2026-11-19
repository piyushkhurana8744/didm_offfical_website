"use client";

import { EditorialHero } from "@/components/creative/EditorialHero";
import { useDialogFocus } from "@/components/public/useDialogFocus";
import { useEnquirySubmission, EnquiryFeedback } from "@/components/creative/EnquirySubmission";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Phone,
  GraduationCap,
  Building2,
  Calendar,
  Users,
  Award,
  BookOpen,
  CheckCircle2,
  Search,
  Maximize2,
  X,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  ArrowRight,
  Send,
  Loader2,
  Briefcase,
  Layers,
  Laptop,
  Lightbulb,
} from "lucide-react";
import COLLEGE_SOURCE from "@/data/didm-college-sessions.json";
import COLLEGE_PHOTOS from "@/data/creative-college-photos.json";
const COLLEGE_SESSIONS = COLLEGE_SOURCE.map(row => ({...row,images:row.images.map(url => (COLLEGE_PHOTOS as Record<string,string>)[url] || url)}));
import { MotionSection } from "@/components/motion/MotionSection";
import { MotionHeading } from "@/components/motion/MotionHeading";
import { StaggeredCardGrid } from "@/components/motion/StaggeredCardGrid";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "Who can opt for this course?",
    answer:
      "1. Students (Any Stream - BBA, B.Com, B.Tech, BCA, Mass Communication, Arts), 2. Faculty & Researchers, 3. College Management & Placement Teams looking to modernize curriculum with practical industry exposure.",
  },
  {
    question: "Why should digital marketing be introduced in educational institutions?",
    answer:
      "Digital marketing is of tremendous value to modern industry. Introducing digital marketing in colleges bridges the academic-industry divide, equipping students with real performance marketing, AI automation, and SEO skills that make them immediately employable.",
  },
  {
    question: "What will be the duration of the course or seminar?",
    answer:
      "We offer flexible formats: 1-Day Mega Seminars ('Digital Udaan'), 3-Day Practical Skill Camps, 4-Week Certificate Electives, or Full-Semester Integrated Digital Marketing Modules.",
  },
  {
    question: "What modules will be taught in college sessions?",
    answer:
      "Generally, we teach 50+ cutting-edge modules covering SEO, Google Ads, Meta Performance Campaigns, AI Content Generation, GA4 Web Analytics, Social Media Strategy, and E-commerce Scaling.",
  },
  {
    question: "What are the career opportunities for students?",
    answer:
      "Students can hone their skills and target in-demand job profiles like SEO Specialist, Social Media Strategist, PPC Media Buyer, Content Creator, Performance Marketer, or launch their own digital marketing agency / freelance consultancy.",
  },
];

export default function CollegesAndUniversitySessionPage() {
  const enquiry = useEnquirySubmission();
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);
  const [expandedColleges, setExpandedColleges] = useState<Record<string, boolean>>({});
  const [activeLightboxImage, setActiveLightboxImage] = useState<string | null>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  useDialogFocus(lightboxRef, !!activeLightboxImage, ()=>setActiveLightboxImage(null));
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Form State
  const isSubmitting = enquiry.pending;
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    institutionName: "",
    contactPerson: "",
    phone: "",
    email: "",
    city: "",
    sessionType: "Campus Seminar (Digital Udaan)",
    studentCount: "100-300 Students",
    message: "",
  });

  const toggleExpand = (id: string) => {
    setExpandedColleges((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex((prev) => (prev === idx ? null : idx));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => enquiry.submit(e, {name:formData.contactPerson, phone:formData.phone, email:formData.email, courseId:"institutional-training", preferredBatch:formData.sessionType, organization:formData.institutionName, message:[formData.city, formData.studentCount, formData.message].filter(Boolean).join(" / ")}, () => setIsSubmitted(true));

  const filteredColleges = COLLEGE_SESSIONS.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="creative-page min-h-screen bg-[#fafbfc] text-[#222222]">
      <EditorialHero bannerRatio={3.75} eyebrow="COLLEGES & UNIVERSITIES" title="Colleges & University Sessions" description="Explore DIDM’s sessions and training programs for educational institutions, and discover the original campus session galleries below." image="/images/didm/colleges/colleges_banner.png" alt="DIDM college and university sessions" caption="DIDM college and university sessions" variant="institution" href="#partner-form" action="Discuss a campus session" />
      {/* 1. TOP BREADCRUMB BAR */}
      <section className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm">
          <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-neutral-500">
            <Link href="/" className="hover:text-[#c0392b] transition">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
            <Link href="/organisations" className="hover:text-[#c0392b] transition">
              Enterprise
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
            <span className="font-semibold text-[#c0392b]">Colleges &amp; Universities</span>
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

      {/* 2. AUTHENTIC HERO BANNER */}
      <details className="creative-source-art"><summary>Original DIDM training introduction</summary>      <MotionSection as="section" preset="editorial" className="bg-[#b52828] w-full overflow-hidden">
        <div className="w-full">
          <Image
            src="/images/didm/colleges/colleges_banner.png"
            alt="DIGITAL MARKETING COLLEGES AND UNIVERSITY SESSION BY DIDM"
            width={1500}
            height={400}
            priority
            className="w-full h-auto object-cover"
            sizes="100vw"
          />
        </div>
      </MotionSection></details>

      {/* 3. 5 YEARS CAREER PROJECTION SECTION */}
      <MotionSection as="section" preset="depth" className="py-10 sm:py-14 bg-white border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <MotionHeading
            eyebrow="Industry Trend Forecast"
            title="5 Years Career Projection in Digital Marketing"
            subtitle="How practical digital marketing skills are outpacing conventional corporate recruitment across Indian universities."
            align="center"
            as="h2"
            size="lg"
            className="mb-8"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-neutral-50/70 p-6 sm:p-8 rounded-2xl border border-neutral-200">
            <div className="lg:col-span-7 flex justify-center">
              <div className="relative w-full max-w-lg aspect-[16/10] rounded-xl overflow-hidden bg-white shadow-sm p-4 border border-neutral-200">
                <Image sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  src="/images/didm/colleges/growth_chart_2030.webp"
                  alt="Digital Marketing growth 2030"
                  fill
                  className="object-contain p-2"
                />
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-black uppercase text-[#c0392b] tracking-wider">
                Industry Trend Forecast
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-neutral-900 leading-snug">
                Why College Campuses Need Practical Marketing Labs
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                By 2030, over 85% of brand ad spends will flow into digital platforms. DIDM partners with universities to set up hands-on digital agency labs, guest masterclasses, and convocation certifications.
              </p>
              <div className="pt-2">
                <a
                  href="#partner-form"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#c0392b] hover:bg-[#a92323] text-white font-bold text-xs sm:text-sm shadow transition"
                >
                  <span>Host a Seminar on Campus</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </MotionSection>

      {/* 4. SEARCH & FILTER TOOLBAR */}
      <section className="py-6 bg-white border-b border-neutral-200 sticky top-0 z-20 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <GraduationCap className="w-5 h-5 text-[#c0392b]" />
            <h2 className="text-base sm:text-lg font-black text-neutral-900">
              Campus Seminars Directory ({COLLEGE_SESSIONS.length} Premier Institutions)
            </h2>
          </div>

          <div className="w-full sm:w-72 relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
            <input aria-label="Search college, IPU, university..."
              type="text"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setVisibleCount(6); }}
              placeholder="Search college, IPU, university..."
              className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm rounded-lg border border-neutral-300 focus:outline-none focus:border-[#c0392b] focus:ring-1 focus:ring-[#c0392b]"
            />
          </div>
        </div>
      </section>

      {/* 5. SEQUENTIAL COLLEGE SESSIONS GALLERIES (Matching Uploaded Media Exactly!) */}
      <section className="py-12 bg-[#fafbfc]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {filteredColleges.slice(0, visibleCount).map((college) => {
            const isExpanded = !!expandedColleges[college.id];
            const displayImages = isExpanded ? college.images : college.images.slice(0, 4);

            return (
              <article
                key={college.id}
                id={college.id}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200 shadow-sm hover:shadow-md transition space-y-6"
              >
                {/* College Session Header */}
                <div className="text-center space-y-3 max-w-4xl mx-auto">
                  <button
                    onClick={() => toggleExpand(college.id)}
                    aria-expanded={isExpanded}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#c0392b] hover:bg-[#a92323] text-white font-extrabold text-xs uppercase tracking-wider transition cursor-pointer shadow-xs"
                  >
                    <span>{isExpanded ? "Show Less" : "View More"}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>

                  <h3 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">
                    {college.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    {college.description}
                  </p>
                </div>

                {/* College Photo Grid (4 columns, matching uploaded image e3af9890.jpg) */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-2">
                  {displayImages.map((imgUrl, imgIdx) => (
                    <button type="button" aria-label={`View ${college.name} seminar photo ${imgIdx + 1}`}
                      key={imgIdx}
                      onClick={() => setActiveLightboxImage(imgUrl)}
                      className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-neutral-100 cursor-zoom-in border border-neutral-200 shadow-xs hover:shadow-md transition"
                    >
                      <Image
                        src={imgUrl}
                        alt={`${college.name} DIDM Seminar Photo ${imgIdx + 1}`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-neutral-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Maximize2 className="w-5 h-5 text-white drop-shadow" />
                      </div>
                    </button>
                  ))}
                </div>

                {/* Expander Footer */}
                {college.images.length > 4 && (
                  <div className="text-center pt-2">
                    <button
                      onClick={() => toggleExpand(college.id)}
                    aria-expanded={isExpanded}
                      className="text-xs font-bold text-[#c0392b] hover:underline cursor-pointer"
                    >
                      {isExpanded
                        ? "Collapse Photos"
                        : `+ View All ${college.images.length} Photos from this Session`}
                    </button>
                  </div>
                )}
              </article>
            );
          })}
          {filteredColleges.length > visibleCount && <div className="text-center"><p className="mb-4 text-sm text-neutral-600" role="status">Showing {Math.min(visibleCount, filteredColleges.length)} of {filteredColleges.length} sessions</p><button type="button" className="student-primary" onClick={()=>setVisibleCount(count=>count+6)}>Explore more sessions</button></div>}
          {filteredColleges.length === 0 && <p role="status" className="text-center text-sm text-neutral-600">No sessions match this search. Try another institution or topic.</p>}
        </div>
      </section>

      {/* 6. FULLSCREEN LIGHTBOX */}
      {activeLightboxImage && (
        <div
          ref={lightboxRef}
          tabIndex={-1}
          role="dialog"
          aria-label="Institutional session photograph"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-neutral-950/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setActiveLightboxImage(null)}
        >
          <button
            onClick={() => setActiveLightboxImage(null)}
            aria-label="Close session photograph"
            className="absolute top-5 right-5 p-2 rounded-full bg-neutral-800 hover:bg-[#c0392b] text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
          <div
            className="relative max-w-4xl max-h-[85vh] w-full aspect-[4/3] overflow-hidden rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              src={activeLightboxImage}
              alt="DIDM Seminar Fullscreen View"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}

      {/* 7. DIDM APPROACH & ADVANTAGES */}
      <MotionSection as="section" preset="depth" className="py-14 sm:py-16 bg-white border-t border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <MotionHeading
            eyebrow="Pedagogical Model"
            title="DIDM Approach & Advantages - Training Features and Outcome"
            align="center"
            as="h2"
            size="lg"
            className="mb-10"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-neutral-200 shadow-sm">
              <Image sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                src="/images/didm/colleges/curriculum_approach.jpg"
                alt="DIDM Approach & Advantages"
                fill
                className="object-contain p-2"
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-neutral-900">
                Empowering Students With Employable Digital Skills
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Our college partnership model brings industry-seasoned faculty right into your lecture halls. Students work on actual live client briefs, learn ROI-focused budget planning, and earn industry-certified credentials.
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-neutral-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#c0392b]" />
                  <span>Hands-on training on 50+ cutting-edge digital marketing tools.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#c0392b]" />
                  <span>Live Agency Capstone with Online Strikers.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#c0392b]" />
                  <span>Dedicated campus placement drives with 450+ hiring partners.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </MotionSection>

      {/* 8. WHY DIDM ? (8 Feature Cards) */}
      <MotionSection as="section" preset="stagger" className="py-14 sm:py-16 bg-[#f4f5f7] border-t border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <MotionHeading
            title="Why DIDM ?"
            align="center"
            as="h2"
            size="lg"
            className="mb-12"
          />

          <StaggeredCardGrid columns={4} stagger={0.06}>
            <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-red-50 text-[#c0392b] flex items-center justify-center mx-auto">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xs sm:text-sm text-neutral-900">Customized Training</h3>
            </div>

            <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-red-50 text-[#c0392b] flex items-center justify-center mx-auto">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xs sm:text-sm text-neutral-900">Experienced Mentors</h3>
            </div>

            <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-red-50 text-[#c0392b] flex items-center justify-center mx-auto">
                <Laptop className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xs sm:text-sm text-neutral-900">Practical Live Projects</h3>
            </div>

            <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-red-50 text-[#c0392b] flex items-center justify-center mx-auto">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xs sm:text-sm text-neutral-900">30+ Recognized Certs</h3>
            </div>

            <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-red-50 text-[#c0392b] flex items-center justify-center mx-auto">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xs sm:text-sm text-neutral-900">LMS Portal &amp; E-Notes</h3>
            </div>

            <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-red-50 text-[#c0392b] flex items-center justify-center mx-auto">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xs sm:text-sm text-neutral-900">100% Placement Support</h3>
            </div>

            <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-red-50 text-[#c0392b] flex items-center justify-center mx-auto">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xs sm:text-sm text-neutral-900">AI Prompting &amp; Tools</h3>
            </div>

            <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-red-50 text-[#c0392b] flex items-center justify-center mx-auto">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xs sm:text-sm text-neutral-900">14+ PAN India Hubs</h3>
            </div>
          </StaggeredCardGrid>
        </div>
      </MotionSection>

      {/* 9. FOR EDUCATIONAL INSTITUTION (2 Feature Cards) */}
      <MotionSection as="section" preset="scale" className="py-14 sm:py-16 bg-white border-t border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <MotionHeading
            eyebrow="For Educational Institution"
            title="We provide you the skills to change your workforce & students as per current market standards."
            align="center"
            as="h2"
            size="lg"
            className="mb-10"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-2xl overflow-hidden border border-neutral-200 shadow-md aspect-[16/10] relative">
              <Image sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                src="/images/didm/colleges/education_1.jpg"
                alt="Educational Institution Partnerships 1"
                fill
                className="object-cover"
              />
            </div>
            <div className="rounded-2xl overflow-hidden border border-neutral-200 shadow-md aspect-[16/10] relative">
              <Image sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                src="/images/didm/colleges/education_2.jpg"
                alt="Educational Institution Partnerships 2"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </MotionSection>

      {/* 10. LETS START WORK TOGETHER..... (Institutional Partnership Lead Form) */}
      <MotionSection as="section" id="partner-form" preset="depth" className="py-14 sm:py-16 bg-[#f8f9fa] border-t border-neutral-200 scroll-mt-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
              Lets Start <span className="text-[#c0392b]">Work Together.....</span>
            </h2>
            <div className="w-16 h-1 bg-[#c0392b] mx-auto"></div>
            <p className="text-xs sm:text-sm text-neutral-600">
              Invite DIDM to conduct a seminar, workshop, or MOU collaboration at your college.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Graphic */}
            <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-neutral-200 shadow-sm bg-white p-4">
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden">
                <Image sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  src="/images/didm/colleges/didm_college_seminar.png"
                  alt="DIDM Digital Marketing Colleges Seminar"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Right Lead Capture Form */}
            <div className="lg:col-span-6 bg-white rounded-2xl border border-neutral-200 shadow-lg p-6 sm:p-8">
              {isSubmitted ? (
                <div className="text-center py-10 space-y-3">
                  <div className="w-14 h-14 rounded-full bg-green-50 text-green-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-neutral-900">
                    Partnership Request Received!
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-600 max-w-sm mx-auto">
                    Your enquiry has been saved. The DIDM team will contact you to discuss session availability.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      College / University Name *
                    </label>
                    <input aria-label="Full name"
                      type="text"
                      required
                      value={formData.institutionName}
                      onChange={(e) => setFormData({ ...formData, institutionName: e.target.value })}
                      placeholder="e.g. VIPS College, IP University"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-lg border border-neutral-300 focus:outline-none focus:border-[#b52828] focus:ring-1 focus:ring-[#b52828]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        Coordinator / Faculty Name *
                      </label>
                      <input aria-label="Full name"
                        type="text"
                        required
                        value={formData.contactPerson}
                        onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                        placeholder="Dr. / Prof. / Placement Officer"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-lg border border-neutral-300 focus:outline-none focus:border-[#b52828] focus:ring-1 focus:ring-[#b52828]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        Phone Number *
                      </label>
                      <input aria-label="Phone number"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. 98112XXXXX"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-lg border border-neutral-300 focus:outline-none focus:border-[#b52828] focus:ring-1 focus:ring-[#b52828]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        Official College Email *
                      </label>
                      <input aria-label="Email address"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="placement@college.edu.in"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-lg border border-neutral-300 focus:outline-none focus:border-[#b52828] focus:ring-1 focus:ring-[#b52828]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        City / State
                      </label>
                      <input aria-label="City or location"
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="Delhi-NCR / Dehradun / etc."
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-lg border border-neutral-300 focus:outline-none focus:border-[#b52828] focus:ring-1 focus:ring-[#b52828]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        Collaboration Format
                      </label>
                      <select aria-label="Preferred session type"
                        value={formData.sessionType}
                        onChange={(e) => setFormData({ ...formData, sessionType: e.target.value })}
                        className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-lg border border-neutral-300 focus:outline-none focus:border-[#b52828] focus:ring-1 focus:ring-[#b52828] bg-white"
                      >
                        <option value="Campus Seminar (Digital Udaan)">Campus Seminar (Digital Udaan)</option>
                        <option value="3-Day Practical Bootcamp">3-Day Practical Bootcamp</option>
                        <option value="MOU / Curriculum Integration">MOU / Curriculum Integration</option>
                        <option value="Placement Drive Collaboration">Placement Drive Collaboration</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        Expected Student Strength
                      </label>
                      <select aria-label="Expected number of students"
                        value={formData.studentCount}
                        onChange={(e) => setFormData({ ...formData, studentCount: e.target.value })}
                        className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-lg border border-neutral-300 focus:outline-none focus:border-[#b52828] focus:ring-1 focus:ring-[#b52828] bg-white"
                      >
                        <option value="50-100 Students">50–100 Students</option>
                        <option value="100-300 Students">100–300 Students</option>
                        <option value="300-500 Students">300–500 Students</option>
                        <option value="500+ Auditorium Mega Session">500+ Auditorium Mega Session</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 rounded-lg bg-[#b52828] hover:bg-[#962020] text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Submitting Request...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Collaboration Request</span>
                        </>
                      )}
                    </button>
                  </div>
                <EnquiryFeedback error={enquiry.error} pending={enquiry.pending} consent={true} />
</form>
              )}
            </div>
          </div>
        </div>
      </MotionSection>

      {/* 11. FAQ ACCORDION */}
      <MotionSection as="section" preset="editorial" className="py-12 sm:py-16 bg-white border-t border-neutral-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <MotionHeading
            title="Frequently Asked Questions (FAQ)"
            align="center"
            as="h2"
            size="lg"
            className="mb-10"
          />

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-neutral-200 overflow-hidden bg-white transition-shadow hover:shadow-sm"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={isOpen}
                    className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left font-bold text-xs sm:text-sm text-neutral-900 hover:text-[#c0392b] transition cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-3">
                      <HelpCircle className="w-4 h-4 text-[#c0392b] flex-shrink-0" />
                      <span>{faq.question}</span>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-neutral-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-neutral-500 flex-shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </MotionSection>
    </div>
  );
}


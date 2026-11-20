"use client";

import { EditorialHero } from "@/components/creative/EditorialHero";
import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Award,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Star,
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  ShieldCheck,
  Search,
  Filter,
  ChevronRight,
  ChevronLeft,
  Quote,
  GraduationCap,
  Building2,
  Users,
} from "lucide-react";
import {
  DIDM_FACULTY,
  ALL_54_TRAINEES,
  TESTIMONIAL_CAROUSEL,
  type TrainerFaculty,
  type TraineePlacement,
} from "@/data/didm-trainees";
import { MotionSection } from "@/components/motion/MotionSection";
import { MotionHeading } from "@/components/motion/MotionHeading";
import { StaggeredCardGrid } from "@/components/motion/StaggeredCardGrid";
import { SplitContentReveal } from "@/components/motion/SplitContentReveal";

export default function TrainersPage() {
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);

  // Filtered trainers by branch
  const filteredTrainers = useMemo(() => {
    if (selectedBranch === "all") return DIDM_FACULTY;
    return DIDM_FACULTY.filter((t) =>
      t.branch.toLowerCase().includes(selectedBranch.toLowerCase())
    );
  }, [selectedBranch]);

  // Filtered trainees by search & category
  const filteredTrainees = useMemo(() => {
    return ALL_54_TRAINEES.filter((trainee) => {
      const matchesCategory =
        selectedCategory === "all" || trainee.category === selectedCategory;
      const matchesSearch =
        trainee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trainee.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trainee.designation.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const branches = [
    { label: "All Campuses (11 Leads)", value: "all" },
    { label: "Satya Niketan HQ", value: "satya niketan" },
    { label: "Noida Sector 18", value: "noida" },
    { label: "Pitampura (NSP)", value: "pitampura" },
    { label: "Kalkaji (South Delhi)", value: "kalkaji" },
    { label: "Dwarka", value: "dwarka" },
    { label: "Gurgaon", value: "gurgaon" },
    { label: "Dehradun", value: "dehradun" },
    { label: "Mumbai", value: "mumbai" },
    { label: "Online Campus", value: "online" },
  ];

  return (
    <div className="creative-page bg-white dark:bg-[#0B0C10] text-[#222222] dark:text-[#EAEAEA] font-body selection:bg-[#b52828] selection:text-white">
      {/* ========================================================= */}
      {/* SECTION 01: HERO BANNER (TEAM IN WHITE T-SHIRTS)          */}
      {/* ========================================================= */}
      <EditorialHero bannerRatio={3.8} eyebrow="MEET YOUR MENTORS" title="DIDM Training Faculty" description="Meet the DIDM training faculty. Explore their backgrounds, practical expertise and the learning areas they bring into the classroom." image="/images/didm/trainers/Digital Marketing Trainer in DIDM.jpg" alt="Digital Marketing Trainers in DIDM" caption="Digital Marketing Trainers in DIDM" variant="mentors" href="#trainers-grid" action="Meet the faculty" />
        {/* Quick Anchor Navigation Strip */}
        <div className="bg-neutral-800/90 text-white border-t border-neutral-700 py-3 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs font-heading">
            <div className="flex items-center gap-4">
              <a
                href="#trainers-grid"
                className="hover:text-yellow-400 transition flex items-center gap-1.5"
              >
                <Users className="w-3.5 h-3.5 text-[#f0081e]" />
                <span>Meet Faculty Leads (11)</span>
              </a>
              <span className="text-neutral-500">&bull;</span>
              <a
                href="#trainee-reviews"
                className="hover:text-yellow-400 transition flex items-center gap-1.5"
              >
                <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                <span>Trainee Reviews &amp; Placements (54+)</span>
              </a>
              <span className="text-neutral-500">&bull;</span>
              <a
                href="#placement-partners"
                className="hover:text-yellow-400 transition flex items-center gap-1.5"
              >
                <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>450+ Placement Partners</span>
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/enquire"
                className="text-white hover:text-yellow-300 font-bold transition flex items-center gap-1"
              >
                <span>Request Free Demo Batch</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>


      {/* ========================================================= */}
      {/* SECTION 02: CLASSROOM GRAPHIC + PEDAGOGY INTRO             */}
      {/* ========================================================= */}
      <MotionSection as="section" preset="split" className="py-12 sm:py-16 border-b border-gray-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Authentic Classroom Illustration */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-gray-200 dark:border-neutral-800 shadow-md">
                <Image
                  src="/images/didm/trainers/Digital Marketing Training in DIDM(1).jpg"
                  alt="Digital Marketing Classroom Training at DIDM"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right: Pedagogy Description */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-red-50 dark:bg-red-950/40 text-brand-red text-xs font-heading font-bold uppercase tracking-wider">
                <Award className="w-3.5 h-3.5" />
                <span>Pedagogy &amp; Mentorship Philosophy</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-gray-900 dark:text-white leading-tight">
                DIDM <span className="text-[#b52828]">Trainers &amp; Mentors</span>
              </h2>
              <p className="text-sm text-gray-700 dark:text-gray-300 font-body leading-relaxed">
                DIDM has a team of experienced and qualified trainers who provide training on digital marketing courses. They have extensive knowledge and hands-on experience in the digital marketing industry, and they use practical teaching methods to ensure that students understand the concepts and can apply them in real-world scenarios.
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300 font-body leading-relaxed">
                The trainers at DIDM are also dedicated to helping students achieve their career goals and provide guidance and support throughout the training program. With dedicated doubt sessions, live campaign allocations, and interview prep workshops, our mentors ensure every learner transitions into an industry-ready professional.
              </p>

              {/* 3 Value Highlights */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-gray-50 dark:bg-neutral-800/60 border border-gray-200 dark:border-neutral-700">
                  <div className="text-xl font-bold font-heading text-[#b52828]">8+ to 15+</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 font-body">Years Avg Agency Exp</div>
                </div>
                <div className="p-3 rounded-lg bg-gray-50 dark:bg-neutral-800/60 border border-gray-200 dark:border-neutral-700">
                  <div className="text-xl font-bold font-heading text-[#b52828]">61,500+</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 font-body">Students Mentored</div>
                </div>
                <div className="p-3 rounded-lg bg-gray-50 dark:bg-neutral-800/60 border border-gray-200 dark:border-neutral-700">
                  <div className="text-xl font-bold font-heading text-[#b52828]">100%</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 font-body">Live Practical Spends</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MotionSection>

      {/* ========================================================= */}
      {/* SECTION 03: 11 VERIFIED FACULTY LEADS GRID                */}
      {/* ========================================================= */}
      <MotionSection id="trainers-grid" as="section" preset="stagger" className="py-14 sm:py-20 border-b border-gray-200 dark:border-neutral-800 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#b52828] font-heading">
                Faculty Directory
              </span>
              <MotionHeading as="h2" className="text-2xl sm:text-4xl font-extrabold font-heading text-gray-900 dark:text-white">
                Meet Our Expert Digital Mentors
              </MotionHeading>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-body">
                Learn from senior campaign architects stationed across our 14 physical centres in Delhi NCR, Mumbai, Dehradun &amp; Online.
              </p>
            </div>

            {/* Branch Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {branches.slice(0, 5).map((b) => (
                <button
                  key={b.value}
                  onClick={() => setSelectedBranch(b.value)}
                  className={`px-3 py-1.5 rounded-full text-xs font-heading font-medium transition ${
                    selectedBranch === b.value
                      ? "bg-[#b52828] text-white shadow-sm"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-neutral-800 dark:text-neutral-300"
                  }`}
                >
                  {b.label.split(" ")[0]}
                </button>
              ))}
              {selectedBranch !== "all" && (
                <button
                  onClick={() => setSelectedBranch("all")}
                  className="px-2.5 py-1.5 text-xs text-red-600 font-bold hover:underline"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* 11 Trainers Grid */}
          <StaggeredCardGrid columns={4} stagger={0.06}>
            {filteredTrainers.map((t) => (
              <div
                key={t.id}
                className="rounded-2xl bg-white dark:bg-[#13141F] border border-gray-200 dark:border-neutral-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:border-[#b52828]/50 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100 dark:bg-neutral-800">
                    <Image
                      src={t.image}
                      alt={t.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 px-2 py-1 rounded bg-[#b52828] text-white text-[10px] font-heading font-bold shadow-md">
                      {t.experience}
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <h3 className="text-lg font-extrabold font-heading text-gray-900 dark:text-white group-hover:text-[#b52828] transition-colors">
                      {t.name}
                    </h3>
                    <div className="text-xs font-semibold text-[#b52828] font-heading">
                      {t.role}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 font-body flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <span>{t.branch}</span>
                    </div>
                    <p className="pt-2 text-[11px] text-gray-600 dark:text-gray-300 border-t border-gray-100 dark:border-neutral-800 font-body line-clamp-2">
                      <span className="font-semibold text-gray-800 dark:text-neutral-200">Domain: </span>
                      {t.specialization}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-0">
                  <Link
                    href={`/enquire?trainer=${encodeURIComponent(t.name)}`}
                    className="w-full py-2.5 rounded-lg bg-gray-50 hover:bg-[#b52828] text-gray-800 hover:text-white dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-[#b52828] text-xs font-heading font-bold flex items-center justify-center gap-1.5 transition-colors border border-gray-200 dark:border-neutral-700"
                  >
                    <span>Request Batch with {t.name.split(" ")[0]}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </StaggeredCardGrid>
        </div>
      </MotionSection>

      {/* ========================================================= */}
      {/* SECTION 04: RED TRAINEE REVIEWS HEADER + STATS CARD        */}
      {/* ========================================================= */}
      <MotionSection
        id="trainee-reviews"
        as="section"
        preset="scale"
        className="py-12 sm:py-16 bg-gradient-to-r from-red-800 via-[#b52828] to-red-900 text-white shadow-inner scroll-mt-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-yellow-300 text-xs font-heading font-bold uppercase tracking-wider">
                <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                <span>Verified Alumni Track Record</span>
              </div>
              <MotionHeading as="h2" className="text-3xl sm:text-5xl font-extrabold font-heading text-white">
                Trainee Reviews
              </MotionHeading>
              <p className="text-xs sm:text-sm text-red-100 max-w-xl font-body leading-relaxed">
                Authentic reflections, placement ratings, and career milestones from students trained directly under our faculty members.
              </p>
            </div>

            {/* Red Ratings Summary Card (Exact Match to Screenshot) */}
            <div className="p-5 sm:p-6 rounded-2xl bg-black/40 border border-white/20 flex flex-col sm:flex-row items-center gap-6 text-left shrink-0 shadow-xl">
              <div className="text-center sm:pr-6 sm:border-r border-white/20">
                <div className="text-4xl sm:text-5xl font-extrabold font-heading text-yellow-300">
                  4.9
                </div>
                <div className="flex items-center gap-0.5 justify-center mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <div className="text-[11px] text-neutral-300 font-mono mt-1">
                  1,450+ Verified Ratings
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-neutral-200 font-body">
                <div className="flex items-center gap-2">
                  <span className="w-12 font-medium">5 Star</span>
                  <div className="w-28 h-2 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-400 w-[92%]" />
                  </div>
                  <span className="text-[11px] font-mono text-neutral-300">92%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-12 font-medium">4 Star</span>
                  <div className="w-28 h-2 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-400 w-[6%]" />
                  </div>
                  <span className="text-[11px] font-mono text-neutral-300">6%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-12 font-medium">3 Star</span>
                  <div className="w-28 h-2 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-400 w-[2%]" />
                  </div>
                  <span className="text-[11px] font-mono text-neutral-300">2%</span>
                </div>
                <div className="pt-2 text-[10px] text-yellow-200 font-mono flex items-center gap-2">
                  <span>61,500+ Students Trained</span>
                  <span>&bull;</span>
                  <span>2,445+ Batches</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MotionSection>

      {/* ========================================================= */}
      {/* SECTION 05: TESTIMONIAL QUOTE CAROUSEL                     */}
      {/* ========================================================= */}
      <MotionSection as="section" preset="depth" className="py-10 bg-gray-50 dark:bg-neutral-900 border-b border-gray-200 dark:border-neutral-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="relative p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#13141F] border border-gray-200 dark:border-neutral-800 shadow-md">
            <Quote className="w-10 h-10 text-red-200 dark:text-red-950/60 absolute top-4 right-4" />
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[#b52828] shrink-0">
                <Image
                  src={TESTIMONIAL_CAROUSEL[activeTestimonialIdx].image}
                  alt={TESTIMONIAL_CAROUSEL[activeTestimonialIdx].name}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              <div className="space-y-2 text-center sm:text-left flex-1">
                <div className="flex items-center justify-center sm:justify-start gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-gray-800 dark:text-gray-200 font-body italic leading-relaxed">
                  &ldquo;{TESTIMONIAL_CAROUSEL[activeTestimonialIdx].quote}&rdquo;
                </p>
                <div>
                  <h4 className="text-sm font-bold font-heading text-gray-900 dark:text-white">
                    {TESTIMONIAL_CAROUSEL[activeTestimonialIdx].name}
                  </h4>
                  <div className="text-xs text-[#b52828] font-heading">
                    {TESTIMONIAL_CAROUSEL[activeTestimonialIdx].role} &bull; {TESTIMONIAL_CAROUSEL[activeTestimonialIdx].company}
                  </div>
                </div>
              </div>
            </div>

            {/* Carousel navigation controls */}
            <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100 dark:border-neutral-800">
              <span className="text-xs text-gray-400 font-mono">
                {activeTestimonialIdx + 1} of {TESTIMONIAL_CAROUSEL.length}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setActiveTestimonialIdx((prev) =>
                      prev === 0 ? TESTIMONIAL_CAROUSEL.length - 1 : prev - 1
                    )
                  }
                  className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() =>
                    setActiveTestimonialIdx((prev) =>
                      prev === TESTIMONIAL_CAROUSEL.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
                  aria-label="Next review"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </MotionSection>

      {/* ========================================================= */}
      {/* SECTION 06: ALL 54 PLACED TRAINEES 4-COLUMN GRID          */}
      {/* Exact Match to User Screenshot (media_1794482798890_f217dc00) */}
      {/* ========================================================= */}
      <MotionSection as="section" preset="stagger" className="py-14 sm:py-20 border-b border-gray-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#b52828] font-heading">
                From the published directory
              </span>
              <MotionHeading as="h2" className="text-2xl sm:text-4xl font-extrabold font-heading text-gray-900 dark:text-white">
                Trainee Reviews &amp; Company Placements
              </MotionHeading>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-body">
                Explore learner records published by DIDM. Ask admissions to confirm current details and available career support.
              </p>
            </div>

            {/* Search Input & Category Filters */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input aria-label="Search student or company..."
                  type="text"
                  placeholder="Search student or company..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white focus:outline-none focus:border-[#b52828]"
                />
              </div>

            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                {[
                  { label: "All (54)", value: "all" },
                  { label: "SEO", value: "seo" },
                  { label: "Paid Ads", value: "performance" },
                  { label: "Social", value: "social" },
                  { label: "Growth", value: "growth" },
                ].map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setSelectedCategory(cat.value)}
                    className={`px-3 py-1.5 rounded-full text-xs font-heading whitespace-nowrap transition ${
                      selectedCategory === cat.value
                        ? "bg-[#b52828] text-white font-bold"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-neutral-800 dark:text-neutral-300"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results count */}
          <div className="text-xs text-gray-500 font-mono">
            Displaying {filteredTrainees.length} of 54 Published Learner Records
          </div>

          {/* 4 COLUMNS MEMBER GRID (Source faithful) */}
          <StaggeredCardGrid columns={4} stagger={0.03}>
            {filteredTrainees.map((trainee) => (
              <div
                key={trainee.id}
                className="rounded-2xl bg-white dark:bg-[#13141F] border border-gray-200 dark:border-neutral-800 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group hover:border-[#b52828]/40"
              >
                <div>
                  {/* Photo at the top */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100 dark:bg-neutral-800 border-b border-gray-100 dark:border-neutral-800">
                    <Image
                      src={trainee.image}
                      alt={`${trainee.name} placed by DIDM at ${trainee.company}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Member Info */}
                  <div className="p-4 space-y-3">
                    <div>
                      <h4 className="text-base font-extrabold font-heading text-gray-900 dark:text-white group-hover:text-[#b52828] transition-colors">
                        {trainee.name}
                      </h4>
                      <div className="mt-1 text-xs text-gray-600 dark:text-gray-300 font-body">
                        <span className="font-bold text-gray-900 dark:text-white">Company: </span>
                        <span>{trainee.company}</span>
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-300 font-body">
                        <span className="font-bold text-gray-900 dark:text-white">Designation: </span>
                        <span>{trainee.designation}</span>
                      </div>
                    </div>

                    {/* Progress Bar 1: DIDM Ratings From Student */}


                    {/* Progress Bar 2: Student Performance */}


                    {/* Star ratings */}

                  </div>
                </div>

                {/* Footer badge */}
                <div className="px-4 py-2.5 bg-gray-50 dark:bg-neutral-900/50 border-t border-gray-100 dark:border-neutral-800 flex items-center justify-between text-[10px] text-gray-500 font-mono">
                  <span className="flex items-center gap-1 text-emerald-600">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Published learner record</span>
                  </span>
                  <a href="https://www.didm.in/placement" target="_blank" rel="noopener noreferrer" className="underline">DIDM source</a>
                </div>
              </div>
            ))}
          </StaggeredCardGrid>

          {/* CTA to Full Stories */}
          <div className="text-center pt-6">
            <Link
              href="/stories"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#b52828] hover:bg-red-800 text-white font-heading font-bold text-xs rounded-md shadow-sm transition"
            >
              <span>Explore Video Interviews &amp; Long-Form Reviews</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </MotionSection>

      {/* ========================================================= */}
      {/* SECTION 07: HIRING PARTNERS LOGO STRIP                    */}
      {/* ========================================================= */}
      <MotionSection id="placement-partners" as="section" preset="editorial" className="py-14 border-b border-gray-200 dark:border-neutral-800 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#b52828] font-heading">
              100% Placement Record
            </span>
            <MotionHeading as="h2" className="text-2xl sm:text-3xl font-extrabold font-heading text-gray-900 dark:text-white">
              Companies That Love Our Students
            </MotionHeading>
            <p className="text-xs text-gray-600 dark:text-gray-400 font-body">
              Over 450+ hiring partners regularly recruit DIDM trainees for executive and leadership roles.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gray-50 dark:bg-[#12131A] border border-gray-200 dark:border-neutral-800 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 items-center">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <div
                key={num}
                className="relative h-12 w-full flex items-center justify-center p-2 bg-white dark:bg-neutral-900 rounded-lg border border-gray-200/60 shadow-2xs"
              >
                <Image
                  src={`/images/didm/homepage/logo${num}.jpg`}
                  alt={`Placement Partner ${num}`}
                  fill
                  sizes="120px"
                  className="object-contain p-1"
                />
              </div>
            ))}
          </div>
        </div>
      </MotionSection>

      {/* ========================================================= */}
      {/* SECTION 08: BOOK FREE MENTORING CLASS BANNER              */}
      {/* ========================================================= */}
      <MotionSection as="section" preset="scale" className="py-14 bg-gradient-to-br from-neutral-900 via-neutral-900 to-black text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red text-white text-xs font-heading font-bold uppercase tracking-wider">
            <span>Experience The Classroom</span>
          </div>
          <MotionHeading as="h2" className="text-2xl sm:text-4xl font-extrabold font-heading text-white">
            Attend a Live Mentoring Class Before Enrolling
          </MotionHeading>
          <p className="text-xs sm:text-sm text-neutral-300 font-body leading-relaxed max-w-xl mx-auto">
            Sit in on an ongoing batch session, talk 1-on-1 with our trainers, and experience the classroom dynamics firsthand at any of our 14 physical branches or online.
          </p>
          <div className="pt-2 flex flex-wrap justify-center items-center gap-3">
            <Link
              href="/enquire"
              className="px-6 py-3 bg-[#b52828] hover:bg-red-800 text-white font-heading font-bold text-xs rounded-md shadow-md transition-all hover:scale-105"
            >
              Book Free Demo Class &rarr;
            </Link>
            <a
              href="tel:+918800505151"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-heading font-bold text-xs rounded-md border border-white/20 transition flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-[#b52828]" />
              <span>Call Helpline: 88005 05151</span>
            </a>
          </div>
        </div>
      </MotionSection>
    </div>
  );
}

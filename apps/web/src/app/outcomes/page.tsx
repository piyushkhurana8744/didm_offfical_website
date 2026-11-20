"use client";

import { useEnquirySubmission, EnquiryFeedback } from "@/components/creative/EnquirySubmission";
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
  TrendingUp,
  Users,
  Building2,
  Briefcase,
  Search,
  Check,
  ChevronDown,
  Building,
  GraduationCap,
} from "lucide-react";
import { ALL_54_TRAINEES } from "@/data/didm-trainees";
import { MotionSection } from "@/components/motion/MotionSection";
import { MotionHeading } from "@/components/motion/MotionHeading";
import { StaggeredCardGrid } from "@/components/motion/StaggeredCardGrid";

export default function OutcomesPlacementPage() {
  const enquiry = useEnquirySubmission();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Lead form states
  const [counsellingForm, setCounsellingForm] = useState({
    name: "",
    phone: "",
    email: "",
    centre: "Satya Niketan",
  });
  const [counsellingSubmitted, setCounsellingSubmitted] = useState(false);

  const [sessionForm, setSessionForm] = useState({
    name: "",
    phone: "",
    email: "",
    centre: "Satya Niketan",
  });
  const [sessionSubmitted, setSessionSubmitted] = useState(false);

  const handleCounsellingSubmit = (e: React.FormEvent<HTMLFormElement>) => enquiry.submit(e, {name:counsellingForm.name, phone:counsellingForm.phone, email:counsellingForm.email, centreId:counsellingForm.centre}, () => setCounsellingSubmitted(true));

  const handleSessionSubmit = (e: React.FormEvent<HTMLFormElement>) => enquiry.submit(e, {name:sessionForm.name, phone:sessionForm.phone, email:sessionForm.email, centreId:sessionForm.centre}, () => setSessionSubmitted(true));

  // Filtered trainees
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

  return (
    <div className="creative-page bg-white dark:bg-[#0B0C10] text-[#222222] dark:text-[#EAEAEA] font-body selection:bg-[#b52828] selection:text-white">
      {/* ========================================================= */}
      {/* SECTION 01: HERO TOP BANNER (15+ CAREER OPTIONS)          */}
      {/* ========================================================= */}
      <EditorialHero bannerRatio={3.75} eyebrow="SKILLS TO CAREER" title="DIDM Digital Marketing Career" description="Discover DIDM’s placement support, explore real student placement records and see how practical learning connects to career preparation." image="/images/didm/placement/DIGITAL MARKETING CAREER PLACEMENT IN DIDM.jpg" alt="DIDM digital marketing career pathways" caption="DIDM digital marketing career pathways" variant="stories" href="#placement-records" action="Explore student records" />
      <details className="creative-source-art"><summary>Original DIDM career information</summary>      <MotionSection as="section" preset="editorial" className="relative bg-neutral-900 border-b border-gray-200 dark:border-neutral-800">
        <div className="relative aspect-[21/8] sm:aspect-[24/7] w-full max-h-[460px] overflow-hidden">
          <Image
            src="/images/didm/placement/DIGITAL MARKETING CAREER PLACEMENT IN DIDM.jpg"
            alt="15+ Career Options in Digital Marketing DIDM"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>

        {/* Breadcrumb Strip */}
        <div className="bg-neutral-800 text-white py-2.5 px-4 sm:px-6 border-t border-neutral-700">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-heading">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-neutral-300">
              <Link href="/" className="hover:text-yellow-400 transition">Home</Link>
              <span>/</span>
              <span className="text-white font-semibold">100% Placement Record &amp; Process</span>
            </nav>
            <div className="hidden sm:flex items-center gap-2 text-yellow-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Dedicated Corporate Placement Cell &bull; 650+ Hiring Tie-Ups</span>
            </div>
          </div>
        </div>
      </MotionSection>


      {/* ========================================================= */}
      {/* SECTION 02: PAGE HEADER & STATS                           */}
      {/* ========================================================= */}
      <MotionSection as="section" preset="scale" className="py-8 sm:py-10 bg-white dark:bg-[#0E0F16] border-b border-gray-100 dark:border-neutral-800 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-2">
          <span className="px-3.5 py-1 rounded-full bg-red-50 dark:bg-red-950/50 text-[#b52828] text-xs font-heading font-bold uppercase tracking-wider">
            70,000+ Success Stories &bull; 2,500+ Batches Closed
          </span>
          <MotionHeading as="h2" className="text-3xl sm:text-5xl font-extrabold font-heading text-gray-900 dark:text-white tracking-tight mt-2">
            DIDM <span className="text-[#b52828]">Digital Marketing Career</span>
          </MotionHeading>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-body max-w-2xl mx-auto">
            Bridging the gap between educational theory and corporate hiring demands with structured agency internships, live ad budgets, and guaranteed interview support.
          </p>
        </div>
      </MotionSection>

</details>
      {/* ========================================================= */}
      {/* SECTION 03: 4 STEPS PLACEMENT PROCESS                     */}
      {/* ========================================================= */}
      <MotionSection as="section" preset="stagger" className="py-12 sm:py-16 border-b border-gray-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#b52828] font-heading">
              Our Structured Pathway
            </span>
            <MotionHeading as="h2" className="text-2xl sm:text-4xl font-extrabold font-heading text-gray-900 dark:text-white">
              4 Steps Placement Process
            </MotionHeading>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-body">
              How our students transition smoothly from classroom learning into corporate roles.
            </p>
          </div>

          {/* Authentic 4-Step Diagram */}
          <div className="relative aspect-[21/9] sm:aspect-[24/8] w-full max-w-4xl mx-auto rounded-2xl overflow-hidden border border-gray-200 dark:border-neutral-800 shadow-md bg-white">
            <Image
              src="/images/didm/placement/PLACEMENT.png"
              alt="DIDM 4 Steps Placement Process"
              fill
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-contain p-4"
            />
          </div>

          {/* 4 Steps Explanatory Cards */}
          <StaggeredCardGrid columns={4} stagger={0.06} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
            <div className="p-5 rounded-2xl bg-gray-50 dark:bg-[#13141F] border border-gray-200 dark:border-neutral-800 space-y-2">
              <div className="w-8 h-8 rounded-full bg-red-100 text-[#b52828] font-heading font-extrabold flex items-center justify-center text-sm">
                1
              </div>
              <h3 className="text-sm font-bold font-heading text-gray-900 dark:text-white">
                Core Skill Mastery
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-body leading-relaxed">
                Hands-on training across 50+ modules with live assignment grading and lab practicals.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-gray-50 dark:bg-[#13141F] border border-gray-200 dark:border-neutral-800 space-y-2">
              <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-800 font-heading font-extrabold flex items-center justify-center text-sm">
                2
              </div>
              <h3 className="text-sm font-bold font-heading text-gray-900 dark:text-white">
                Agency Internship
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-body leading-relaxed">
                Work on live client campaigns inside Online Strikers full-service digital agency.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-gray-50 dark:bg-[#13141F] border border-gray-200 dark:border-neutral-800 space-y-2">
              <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 font-heading font-extrabold flex items-center justify-center text-sm">
                3
              </div>
              <h3 className="text-sm font-bold font-heading text-gray-900 dark:text-white">
                Portfolio &amp; Mock Drills
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-body leading-relaxed">
                Resume building, LinkedIn optimization, case study defenses, and technical interview mock rounds.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-gray-50 dark:bg-[#13141F] border border-gray-200 dark:border-neutral-800 space-y-2">
              <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-800 font-heading font-extrabold flex items-center justify-center text-sm">
                4
              </div>
              <h3 className="text-sm font-bold font-heading text-gray-900 dark:text-white">
                Direct Corporate Placement
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-body leading-relaxed">
                Exclusive recruitment drives with 650+ partner companies until final offer letter acceptance.
              </p>
            </div>
          </StaggeredCardGrid>
        </div>
      </MotionSection>

      {/* ========================================================= */}
      {/* SECTION 04: PLACEMENT COMPARISON (MARKET VS DIDM)         */}
      {/* ========================================================= */}
      <MotionSection as="section" preset="depth" className="py-14 sm:py-20 bg-gray-50 dark:bg-[#111218] border-b border-gray-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#b52828] font-heading">
              Why Our Students Get Hired
            </span>
            <MotionHeading as="h2" className="text-2xl sm:text-4xl font-extrabold font-heading text-gray-900 dark:text-white">
              Placement Comparison
            </MotionHeading>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-body">
              How DIDM&apos;s outcome-driven pedagogy outpaces traditional educational setups.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Left: Traditional Market Trends */}
            <div className="rounded-2xl bg-white dark:bg-[#151622] border border-gray-300 dark:border-neutral-700 p-6 sm:p-8 space-y-5 shadow-sm">
              <div className="pb-3 border-b border-gray-200 dark:border-neutral-800">
                <span className="text-[11px] font-mono uppercase text-gray-400 font-bold">Standard Market</span>
                <h3 className="text-xl font-bold font-heading text-gray-800 dark:text-gray-200">
                  Market Trends
                </h3>
              </div>
              <ul className="space-y-3 text-xs text-gray-600 dark:text-gray-400 font-body">
                <li className="flex items-start gap-2.5">
                  <span className="text-red-500 font-bold shrink-0">&times;</span>
                  <span>Placement cells are missing or improperly functioning with zero accountability.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-500 font-bold shrink-0">&times;</span>
                  <span>Over-reliance on automated job portal forwards with no direct HR connections.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-500 font-bold shrink-0">&times;</span>
                  <span>Lack of expert digital marketing trainers with current agency credentials.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-500 font-bold shrink-0">&times;</span>
                  <span>Outdated syllabus not keeping pace with GA4, Gen AI, or modern algorithms.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-500 font-bold shrink-0">&times;</span>
                  <span>Heavy theoretical lecture training with zero live budget ad execution.</span>
                </li>
              </ul>
            </div>

            {/* Right: DIDM Approach (Featured Red) */}
            <div className="rounded-2xl bg-white dark:bg-[#151622] border-2 border-[#b52828] p-6 sm:p-8 space-y-5 shadow-xl relative">
              <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-[#b52828] text-white text-[10px] font-heading font-bold uppercase tracking-wider">
                100% Industry Benchmark
              </div>
              <div className="pb-3 border-b border-gray-200 dark:border-neutral-800">
                <span className="text-[11px] font-mono uppercase text-[#b52828] font-bold">The DIDM Standard</span>
                <h3 className="text-xl font-bold font-heading text-gray-900 dark:text-white">
                  DIDM Approach
                </h3>
              </div>
              <ul className="space-y-3 text-xs text-gray-800 dark:text-gray-200 font-body">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Dedicated HR &amp; Placement Cell</strong> with customized student tracking.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>650+ Active Corporate Hiring Partners</strong> scheduling on-campus interviews.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>8+ to 15+ Years Experienced Faculty</strong> with live agency campaign portfolios.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Course + Training + Live Projects + LMS + Practical Floor Execution.</strong></span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>INR 3.5 &ndash; 6.5 LPA Average Fresher Package</strong> with rapid leadership growth.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </MotionSection>

      {/* ========================================================= */}
      {/* SECTION 05: TRAINING APPROACH & FREE COUNSELLING FORM     */}
      {/* ========================================================= */}
      <MotionSection as="section" preset="split" className="py-14 sm:py-20 border-b border-gray-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Authentic Training Approach Flowchart */}
            <div className="lg:col-span-7 space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#b52828] font-heading">
                  Pedagogy Architecture
                </span>
                <MotionHeading as="h2" className="text-2xl sm:text-4xl font-extrabold font-heading text-gray-900 dark:text-white mt-1">
                  Record Placement in 2026
                </MotionHeading>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-body">
                  Our comprehensive training system prepares candidates to tackle every dynamic vertical in modern performance marketing.
                </p>
              </div>

              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-gray-200 dark:border-neutral-800 shadow-md bg-white p-2">
                <Image
                  src="/images/didm/placement/trainingapproach.jpg"
                  alt="DIDM Training Approach Flowchart"
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-contain"
                />
              </div>
            </div>

            {/* Right: Book Seat For Free Counselling Form */}
            <div className="lg:col-span-5 rounded-2xl bg-white dark:bg-[#13141F] border-2 border-[#b52828] p-6 sm:p-8 shadow-xl space-y-4">
              <div className="text-center pb-2 border-b border-gray-100 dark:border-neutral-800">
                <span className="px-3 py-0.5 rounded-full bg-red-100 text-[#b52828] text-[10px] font-heading font-bold uppercase">
                  1-on-1 Guidance
                </span>
                <h3 className="text-xl font-bold font-heading text-gray-900 dark:text-white mt-1">
                  Book Seat For Free Counselling
                </h3>
                <p className="text-xs text-gray-500 font-body">
                  Meet our placement director to discuss your career path
                </p>
              </div>

              {counsellingSubmitted ? (
                <div className="p-6 text-center space-y-2 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <div className="text-sm font-bold text-emerald-800 dark:text-emerald-300">
                    Enquiry received
                  </div>
                  <p className="text-xs text-emerald-700 dark:text-emerald-400 font-body">
                    Our placement coordinator will call you to confirm your convenient appointment.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleCounsellingSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">
                      Full Name *
                    </label>
                    <input aria-label="Full name"
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={counsellingForm.name}
                      onChange={(e) => setCounsellingForm({ ...counsellingForm, name: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-md border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white focus:outline-none focus:border-[#b52828]"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">
                      Phone Number *
                    </label>
                    <input aria-label="Phone number"
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={counsellingForm.phone}
                      onChange={(e) => setCounsellingForm({ ...counsellingForm, phone: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-md border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white focus:outline-none focus:border-[#b52828]"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">
                      Email Address *
                    </label>
                    <input aria-label="Email address"
                      type="email"
                      required
                      placeholder="rahul@example.com"
                      value={counsellingForm.email}
                      onChange={(e) => setCounsellingForm({ ...counsellingForm, email: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-md border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white focus:outline-none focus:border-[#b52828]"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">
                      Preferred Campus *
                    </label>
                    <select aria-label="Preferred training centre"
                      value={counsellingForm.centre}
                      onChange={(e) => setCounsellingForm({ ...counsellingForm, centre: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-md border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white focus:outline-none focus:border-[#b52828]"
                    >
                      <option value="Satya Niketan">Satya Niketan HQ</option>
                      <option value="Noida">Noida Sector 18</option>
                      <option value="Dwarka">Dwarka Sector 7</option>
                      <option value="Kalkaji">Kalkaji</option>
                      <option value="Pitampura">Pitampura NSP</option>
                      <option value="Preet Vihar">Preet Vihar</option>
                      <option value="Gurgaon">Gurgaon</option>
                      <option value="Online">Online Interactive Live Campus</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#b52828] hover:bg-red-800 text-white font-heading font-bold text-xs rounded-md shadow transition"
                  >
                    Reserve Free Counselling Slot &rarr;
                  </button>
                <EnquiryFeedback error={enquiry.error} pending={enquiry.pending} consent={true} />
</form>
              )}
            </div>
          </div>
        </div>
      </MotionSection>

      {/* ========================================================= */}
      {/* SECTION 06: TREND JOB PROSPECTS GRAPHIC                   */}
      {/* ========================================================= */}
      <MotionSection as="section" preset="editorial" className="py-12 bg-gray-50 dark:bg-[#111218] border-b border-gray-200 dark:border-neutral-800 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#b52828] font-heading">
              Industry Demand
            </span>
            <MotionHeading as="h2" className="text-2xl sm:text-3xl font-extrabold font-heading text-gray-900 dark:text-white">
              Trend Job Prospects
            </MotionHeading>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-body">
              How the surge in digital adoption creates exponential career pathways for certified specialists.
            </p>
          </div>

          <div className="relative aspect-[21/9] sm:aspect-[24/8] w-full max-w-4xl mx-auto rounded-2xl overflow-hidden border border-gray-200 dark:border-neutral-800 bg-white shadow-sm p-4">
            <Image
              src="/images/didm/placement/focused trainiign job(1).jpg"
              alt="DIDM Trend Job Prospects"
              fill
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-contain"
            />
          </div>
        </div>
      </MotionSection>

      {/* ========================================================= */}
      {/* SECTION 07: WHO ALL CAN JOIN                              */}
      {/* ========================================================= */}
      <MotionSection as="section" preset="stagger" className="py-12 border-b border-gray-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center">
            <MotionHeading as="h2" className="text-2xl sm:text-3xl font-extrabold font-heading text-gray-900 dark:text-white">
              Who All <span className="text-[#b52828]">Can Join</span>
            </MotionHeading>
          </div>

          <StaggeredCardGrid columns={4} stagger={0.06}>
            <div className="p-6 rounded-2xl bg-white dark:bg-[#151622] border border-gray-200 dark:border-neutral-800 space-y-2 shadow-sm">
              <div className="text-xs font-bold font-heading text-[#b52828] uppercase">Group 01</div>
              <h3 className="text-base font-bold font-heading text-gray-900 dark:text-white">For Fresher Students</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-body leading-relaxed">
                Graduate with practical agency experience, personal live portfolio, and direct placement access.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#151622] border border-gray-200 dark:border-neutral-800 space-y-2 shadow-sm">
              <div className="text-xs font-bold font-heading text-[#b52828] uppercase">Group 02</div>
              <h3 className="text-base font-bold font-heading text-gray-900 dark:text-white">For Working Professionals</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-body leading-relaxed">
                Upskill into high-paying performance marketing, SEO lead, and agency management positions.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#151622] border border-gray-200 dark:border-neutral-800 space-y-2 shadow-sm">
              <div className="text-xs font-bold font-heading text-[#b52828] uppercase">Group 03</div>
              <h3 className="text-base font-bold font-heading text-gray-900 dark:text-white">For Business Owners</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-body leading-relaxed">
                Gain complete transparency over digital spends, manage marketing teams, and generate leads directly.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#151622] border border-gray-200 dark:border-neutral-800 space-y-2 shadow-sm">
              <div className="text-xs font-bold font-heading text-[#b52828] uppercase">Group 04</div>
              <h3 className="text-base font-bold font-heading text-gray-900 dark:text-white">For Job Seekers</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-body leading-relaxed">
                Re-enter the job market with updated digital tool proficiencies and verified agency credentials.
              </p>
            </div>
          </StaggeredCardGrid>
        </div>
      </MotionSection>

      {/* ========================================================= */}
      {/* SECTION 08: WHY JOIN DIDM & STUDENT FEEDBACK CARD         */}
      {/* ========================================================= */}
      <MotionSection as="section" preset="depth" className="py-14 sm:py-20 bg-gray-50 dark:bg-[#111218] border-b border-gray-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Graphic */}
            <div className="lg:col-span-7 space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#b52828] font-heading">
                  Learner perspectives
                </span>
                <MotionHeading as="h2" className="text-2xl sm:text-4xl font-extrabold font-heading text-gray-900 dark:text-white mt-1">
                  Why Join <span className="text-[#b52828]">DIDM ?</span>
                </MotionHeading>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-body">
                  Read individual learner reflections published by DIDM and discuss the learning experience with admissions.
                </p>
              </div>

              <div className="relative aspect-[16/9] w-full max-w-lg rounded-2xl overflow-hidden border border-gray-200 dark:border-neutral-800 shadow-md bg-white">
                <Image
                  src="/images/didm/courses/Student Feedback.jpg"
                  alt="Student Feedback 4.9 Stars 7000+ Reviews"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain p-2"
                />
              </div>
            </div>

            {/* Right: Red Form */}
            <div className="lg:col-span-5 rounded-2xl bg-gradient-to-br from-red-800 via-[#b52828] to-red-900 text-white p-6 sm:p-8 shadow-xl space-y-4">
              <div className="text-center pb-2 border-b border-white/20">
                <h3 className="text-xl sm:text-2xl font-extrabold font-heading text-white">
                  Take a free session today!!
                </h3>
                <p className="text-xs text-red-100 font-body mt-1">
                  Talk to our career counseling specialists
                </p>
              </div>

              {sessionSubmitted ? (
                <div className="p-6 text-center space-y-2 bg-white/10 rounded-xl border border-white/20">
                  <CheckCircle2 className="w-8 h-8 text-yellow-300 mx-auto" />
                  <div className="text-sm font-bold text-white">Enquiry received</div>
                  <p className="text-xs text-red-100 font-body">
                    We will call you shortly to confirm your slot.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSessionSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-red-100 font-semibold mb-1">Your Name *</label>
                    <input aria-label="Full name"
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={sessionForm.name}
                      onChange={(e) => setSessionForm({ ...sessionForm, name: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>

                  <div>
                    <label className="block text-red-100 font-semibold mb-1">Phone Number *</label>
                    <input aria-label="Phone number"
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={sessionForm.phone}
                      onChange={(e) => setSessionForm({ ...sessionForm, phone: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>

                  <div>
                    <label className="block text-red-100 font-semibold mb-1">Email Address *</label>
                    <input aria-label="Email address"
                      type="email"
                      required
                      placeholder="rahul@example.com"
                      value={sessionForm.email}
                      onChange={(e) => setSessionForm({ ...sessionForm, email: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>

                  <div>
                    <label className="block text-red-100 font-semibold mb-1">Nearest Campus *</label>
                    <select aria-label="Preferred training centre"
                      value={sessionForm.centre}
                      onChange={(e) => setSessionForm({ ...sessionForm, centre: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    >
                      <option value="Satya Niketan">Satya Niketan HQ</option>
                      <option value="Noida">Noida Sector 18</option>
                      <option value="Dwarka">Dwarka Sector 7</option>
                      <option value="Kalkaji">Kalkaji</option>
                      <option value="Pitampura">Pitampura NSP</option>
                      <option value="Preet Vihar">Preet Vihar</option>
                      <option value="Gurgaon">Gurgaon</option>
                      <option value="Online">Online Campus</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-heading font-extrabold text-xs rounded-md shadow-md transition"
                  >
                    Submit &amp; Attend Free Session &rarr;
                  </button>
                <EnquiryFeedback error={enquiry.error} pending={enquiry.pending} consent={true} />
</form>
              )}
            </div>
          </div>
        </div>
      </MotionSection>

      {/* ========================================================= */}
      {/* SECTION 09: OUR PLACED STUDENTS (ALL 54 AUTHENTIC CARDS)  */}
      {/* ========================================================= */}
      <MotionSection id="placement-records" as="section" preset="stagger" className="py-14 sm:py-20 border-b border-gray-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#b52828] font-heading">
                Published learner directory
              </span>
              <MotionHeading as="h2" className="text-2xl sm:text-4xl font-extrabold font-heading text-gray-900 dark:text-white">
                Our Placed Students
              </MotionHeading>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-body">
                Explore real students placed across digital agencies, performance media desks, and multinationals.
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

          <div className="text-xs text-gray-500 font-mono">
            Displaying {filteredTrainees.length} of 54 Published Learner Records
          </div>

          {/* 4 COLUMNS MEMBER GRID */}
          <StaggeredCardGrid columns={4} stagger={0.03}>
            {filteredTrainees.map((trainee) => (
              <div
                key={trainee.id}
                className="rounded-2xl bg-white dark:bg-[#13141F] border border-gray-200 dark:border-neutral-800 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group hover:border-[#b52828]/40"
              >
                <div>
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100 dark:bg-neutral-800 border-b border-gray-100 dark:border-neutral-800">
                    <Image
                      src={trainee.image}
                      alt={`${trainee.name} placed by DIDM at ${trainee.company}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

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






                  </div>
                </div>

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

          <div className="text-center pt-4">
            <Link
              href="/trainers"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#b52828] hover:bg-red-800 text-white font-heading font-bold text-xs rounded-md shadow-sm transition"
            >
              <span>Meet The Faculty Behind These Placements</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </MotionSection>

      {/* ========================================================= */}
      {/* SECTION 10: 450+ PLACEMENT PARTNERS LOGOS STRIP           */}
      {/* ========================================================= */}
      <MotionSection as="section" preset="editorial" className="py-14 border-b border-gray-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#b52828] font-heading">
              100% Placement Record
            </span>
            <MotionHeading as="h2" className="text-2xl sm:text-3xl font-extrabold font-heading text-gray-900 dark:text-white">
              Over 450+ Placement Partners
            </MotionHeading>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#12131A] border border-gray-200 dark:border-neutral-800 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 items-center">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <div
                key={num}
                className="relative h-10 w-full flex items-center justify-center p-2 bg-white dark:bg-neutral-900 rounded-lg border border-gray-200/60 shadow-2xs"
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
      {/* SECTION 11: 14 PHYSICAL CENTRES DIRECTORY STRIP           */}
      {/* ========================================================= */}
      <MotionSection as="section" preset="editorial" className="py-12 bg-gray-50 dark:bg-[#111218] border-b border-gray-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center">
            <MotionHeading as="h2" className="text-xl sm:text-2xl font-extrabold font-heading text-gray-900 dark:text-white">
              DIDM Learning Centres Across India
            </MotionHeading>
            <p className="text-xs text-gray-500 font-body mt-1">
              Visit any of our physical campus locations for free 1-on-1 counseling and demo classes.
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-2 text-xs font-heading">
            {[
              { name: "Satya Niketan HQ", href: "/centres/satya-niketan" },
              { name: "Noida Sector 18", href: "/centres/noida" },
              { name: "Dwarka Sector 7", href: "/centres/dwarka" },
              { name: "Kalkaji", href: "/centres/kalkaji" },
              { name: "Pitampura (NSP)", href: "/centres/pitampura" },
              { name: "Preet Vihar", href: "/centres/preet-vihar" },
              { name: "Rajouri Garden", href: "/centres/rajouri-garden" },
              { name: "Gurgaon Sector 14", href: "/centres/gurgaon" },
              { name: "Dehradun", href: "/centres/dehradun" },
              { name: "Mumbai Andheri", href: "/centres/mumbai" },
              { name: "Haldwani / Rudrapur", href: "/centres/haldwani-rudarpur" },
              { name: "Meerut", href: "/centres/meerut" },
              { name: "Jaipur", href: "/centres/jaipur" },
              { name: "Live Online Campus", href: "/centres/online" },
            ].map((c) => (
              <Link
                key={c.name}
                href={c.href}
                className="px-3.5 py-2 rounded-lg bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 hover:border-[#b52828] text-gray-800 dark:text-neutral-200 hover:text-[#b52828] transition shadow-2xs"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </MotionSection>

      {/* ========================================================= */}
      {/* SECTION 12: BOTTOM CTA BANNER                             */}
      {/* ========================================================= */}
      <MotionSection as="section" preset="scale" className="py-14 bg-gradient-to-br from-neutral-900 via-neutral-900 to-black text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red text-white text-xs font-heading font-bold uppercase tracking-wider">
            <span>Guaranteed Interview Drives</span>
          </div>
          <MotionHeading as="h2" className="text-2xl sm:text-4xl font-extrabold font-heading text-white">
            Ready to Launch Your High-Paying Digital Career?
          </MotionHeading>
          <p className="text-xs sm:text-sm text-neutral-300 font-body leading-relaxed max-w-xl mx-auto">
            Book a personalized career assessment with our placement head to understand salary projections, agency requirements, and batch start dates.
          </p>
          <div className="pt-2 flex flex-wrap justify-center items-center gap-3">
            <Link
              href="/enquire"
              className="px-6 py-3 bg-[#b52828] hover:bg-red-800 text-white font-heading font-bold text-xs rounded-md shadow-md transition-all hover:scale-105"
            >
              Book Placement Assessment &rarr;
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

"use client";

import { useEnquirySubmission, EnquiryFeedback } from "@/components/creative/EnquirySubmission";
import { EditorialHero } from "@/components/creative/EditorialHero";
import { VideoPreview } from "@/components/public/VideoPreview";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  ChevronDown,
  Award,
  CheckCircle2,
  Play,
  Download,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  Star,
  ShieldCheck,
  Building,
  GraduationCap,
  Users,
} from "lucide-react";
import { SITE_BRAND } from "@/lib/content";
import { MotionSection } from "@/components/motion/MotionSection";
import { MotionHeading } from "@/components/motion/MotionHeading";
import { StaggeredCardGrid } from "@/components/motion/StaggeredCardGrid";
import { SplitContentReveal } from "@/components/motion/SplitContentReveal";
import { ProgressiveTimeline } from "@/components/motion/ProgressiveTimeline";

interface Visionary {
  name: string;
  role: string;
  department: string;
  image: string;
}

const VISIONARIES: Visionary[] = [
  {
    name: "Sushil Sisodia",
    role: "HR Head",
    department: "DIDM Human Resources",
    image: "/images/didm/about/SUSHIL HR Head DIDM.jpg",
  },
  {
    name: "Medha Virdi",
    role: "HR Manager",
    department: "DIDM Talent Acquisition",
    image: "/images/didm/about/Medha Virdi HR Manager.jpg",
  },
  {
    name: "Anil Chander",
    role: "Accounts Coordinator",
    department: "Account & Admin Coordinator",
    image: "/images/didm/about/ANIL CHANDER ACCOUNTS DEPARTMENT.jpg",
  },
  {
    name: "Rahul Sharma",
    role: "Logistics Lead",
    department: "Logistics & Branch Support",
    image: "/images/didm/about/Rahul Logistic Department.jpg",
  },
  {
    name: "Chirag Singhal",
    role: "Operations Head",
    department: "Operations & Student Services",
    image: "/images/didm/about/Operation Head Chirag Singhal.jpg",
  },
  {
    name: "Shivir Wadhawan",
    role: "Operations Manager",
    department: "Campus Operations DIDM",
    image: "/images/didm/about/Shivir Wadhwan Operation Manager DIDM.jpg",
  },
  {
    name: "Syed Shakir Rasul",
    role: "Team Leader",
    department: "Admissions & Counseling Lead",
    image: "/images/didm/about/Syed Shakir Rasul TL DIDM.jpg",
  },
  {
    name: "Vaibhav Sharma",
    role: "Trainer Head",
    department: "Pedagogy & Faculty Head",
    image: "/images/didm/about/Vaibhav Trainer Head DIDM.jpg",
  },
  {
    name: "Siddhartha Jain",
    role: "Project Head",
    department: "Online Strikers Agency Head",
    image: "/images/didm/about/Siddhartha Project Head Online Strikers.jpg",
  },
  {
    name: "Manish Sharma",
    role: "Marketing Head",
    department: "Marketing Strategy Head",
    image: "/images/didm/about/Manish Marketing Head Online Strikers.jpg",
  },
  {
    name: "Manish Kumar",
    role: "Head IT",
    department: "Technology & LMS Department",
    image: "/images/didm/about/Manish Head IT.jpg",
  },
];

const FAQS = [
  {
    q: "What if I missed some classes? How to cover the missed classes? What are the charges for the same?",
    a: "The missed classes can be covered by attending any of the upcoming batches, which can be considered as back-up classes. DIDM does not charge any extra fee for the same. However, this has to be pre-informed to the support team.",
  },
  {
    q: "I did not understand some topics of the program. Is it possible to cover the topics once again? If yes, then is there any extra charge for it?",
    a: "Yes, you can get access to the upcoming batches to form and have a better understanding. DIDM never charges any extra fee for doubt clearing sessions.",
  },
  {
    q: "What is the salary that I will get after completing the Digital Marketing program?",
    a: "You can get a salary from Rs. 15,000 to Rs. 50,000 monthly depending on your skill, domain specialization, and performance in recruiter interviews.",
  },
  {
    q: "Do you provide training material?",
    a: "Yes, DIDM provides complete training material in the form of updated E-notes, step-by-step PDF blueprints, and pro marketing software tools.",
  },
  {
    q: "What are the criteria to get a confirmed status?",
    a: "We have an evaluation system that assesses trainees based on elective subjects and practical live project knowledge. We award certifications once you satisfy project submission criteria and complete the course program.",
  },
  {
    q: "What are the chances of working from home after completing the course? Is there any chance to get projects that I can complete from home?",
    a: "Yes, digital marketing offers extensive remote employment and freelancing flexibility. Our curriculum includes dedicated modules on freelance client acquisition, international platform bidding, and remote digital agency contracts.",
  },
  {
    q: "How can I reach my trainer for doubts?",
    a: "Trainers are available during 1-on-1 lab hours after every scheduled class, through the dedicated student WhatsApp batch group, and during weekend doubt-clearing sessions.",
  },
  {
    q: "In which cities does DIDM conduct its classes?",
    a: "DIDM operates 14 physical learning campuses across Delhi NCR (Satya Niketan, Dwarka, Kalkaji, Noida, Gurgaon, Pitampura, Preet Vihar, Rajouri Garden), regional centres (Dehradun, Mumbai, Haldwani, Meerut, Jaipur), and a live interactive 2-way online campus.",
  },
  {
    q: "How do we get live practical experience on live projects?",
    a: "Through our in-house digital marketing agency Online Strikers, students are assigned live corporate accounts, managing real advertising budgets on Meta and Google Ads, rather than theoretical simulations.",
  },
  {
    q: "When will I get my certifications from Google and DIDM?",
    a: "You receive your DIDM Course Completion Diploma upon final capstone review. Global certifications from Google, Meta, and HubSpot are earned through proctored portal exams integrated during the relevant training modules.",
  },
];

export default function AboutUsPage() {
  const enquiry = useEnquirySubmission();
  const [activeTab, setActiveTab] = useState<"mission" | "vision" | "value">("mission");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    centre: "Noida",
    course: "midm",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => enquiry.submit(e, {name:formData.name, phone:formData.phone, email:formData.email, centreId:formData.centre, courseId:formData.course}, () => setFormSubmitted(true));

  return (
    <div className="creative-page bg-white dark:bg-[#0B0C10] text-[#222222] dark:text-[#EAEAEA] font-body selection:bg-[#b52828] selection:text-white">
      {/* ========================================================= */}
      {/* SECTION 01: HERO BANNER & TEAM ANNUAL MEET                */}
      {/* ========================================================= */}
      <EditorialHero bannerRatio={3.75} eyebrow="THE PEOPLE BEHIND DIDM" title="About Delhi Institute of Digital Marketing" description="Get to know Delhi Institute of Digital Marketing. Meet the people, explore our story and discover a community built around practical digital marketing education." image="/images/didm/about/Didm_Annual_Meet_2026.webp" alt="DIDM Annual Meet 2026 — original team photograph" caption="DIDM Annual Meet 2026 — original team photograph" variant="institution" href="#about-story" action="Discover our story" />
      <div id="about-story" />
      <details className="creative-source-art"><summary>DIDM Annual Meet 2026 — original team photograph</summary><Image src="/images/didm/about/Didm_Annual_Meet_2026.webp" alt="DIDM Annual Meet 2026" width={1500} height={400} sizes="100vw" className="w-full h-auto"/></details>
      <MotionSection className="institutional-timeline" preset="depth"><div className="creative-shell"><div className="creative-section-heading"><div><p className="creative-eyebrow"><span className="eyebrow-rule"/>THE STORY CONTINUES</p><h2>Built over time.<br/><em>Moving forward together.</em></h2></div><p>Milestones from DIDM’s institutional story.</p></div><ProgressiveTimeline milestones={[
        {yearOrStage:"2014",title:"The beginning",description:"Delhi Institute of Digital Marketing was established, beginning its journey in practical digital marketing education."},
        {yearOrStage:"2024",title:"New spaces for learning",description:"A new corporate office in Noida, revamped Kalkaji and Gurgaon branches, and expansion to Haldwani."},
        {yearOrStage:"2026",title:"The people behind the next chapter",description:"The DIDM Annual Meet brings the team together. Explore the real team photographs and institutional stories on this page."},
      ]}/></div></MotionSection>


      {/* ========================================================= */}
      {/* SECTION 02: PROGRAM INTRODUCTION & MISSION/VISION/VALUES  */}
      {/* ========================================================= */}
      <MotionSection as="section" preset="depth" className="py-14 sm:py-20 border-b border-gray-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left 4 Award Photographs (2x2 Grid) */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3.5">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-gray-200 shadow-md group">
                <Image
                  src="/images/didm/about/About DIDM IFA Award by Sonu Soon.jpg"
                  alt="About DIDM IFA Award by Sonu Sood"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-x-0 bottom-0 bg-black/75 p-1.5 text-[10px] text-white text-center font-semibold">
                  IFA Award 2021
                </div>
              </div>

              <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-gray-200 shadow-md group">
                <Image
                  src="/images/didm/about/About Assocham Award 2018.jpg"
                  alt="About Assocham Award 2018"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-x-0 bottom-0 bg-black/75 p-1.5 text-[10px] text-white text-center font-semibold">
                  ASSOCHAM 2018
                </div>
              </div>

              <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-gray-200 shadow-md group">
                <Image
                  src="/images/didm/about/DIDM MSME Award 22.jpg"
                  alt="DIDM MSME Award 2022"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-x-0 bottom-0 bg-black/75 p-1.5 text-[10px] text-white text-center font-semibold">
                  MSME Award 2022
                </div>
              </div>

              <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-gray-200 shadow-md group">
                <Image
                  src="/images/didm/about/About DIDM 9th Assocham Awards.jpg"
                  alt="About DIDM 9th Assocham Awards"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-x-0 bottom-0 bg-black/75 p-1.5 text-[10px] text-white text-center font-semibold">
                  9th ASSOCHAM Award
                </div>
              </div>
            </div>

            {/* Right Program Introduction & Tabs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#b52828] font-heading">
                  New Way To Learn
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-gray-900 dark:text-white">
                  Master In Digital Marketing Course
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed font-body">
                  In this era of digitization, digital marketing is practiced by every organization. At DIDM, we commit to providing quality training in advanced digital marketing courses and in-depth practical knowledge to meet the growing global demand for skilled professionals.
                </p>
              </div>

              {/* 3 Interactive Accordion Tabs: Mission, Vision, Value */}
              <div className="space-y-3 pt-2">
                {/* Mission */}
                <div className="rounded-xl border border-gray-200 dark:border-neutral-800 overflow-hidden shadow-sm">
                  <button
                    onClick={() => setActiveTab(activeTab === "mission" ? "vision" : "mission")}
                    className={`w-full p-4 text-left font-heading font-bold text-sm sm:text-base flex items-center justify-between transition-colors ${
                      activeTab === "mission"
                        ? "bg-[#b52828] text-white"
                        : "bg-gray-50 dark:bg-neutral-900 hover:bg-gray-100 dark:hover:bg-neutral-800 text-gray-900 dark:text-white"
                    }`}
                  >
                    <span>Our Mission → Empowering Digital Learning</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${activeTab === "mission" ? "rotate-180" : ""}`} />
                  </button>
                  {activeTab === "mission" && (
                    <div className="p-5 bg-white dark:bg-[#12131A] text-xs sm:text-sm text-gray-600 dark:text-gray-300 space-y-2 font-body leading-relaxed">
                      <div className="font-semibold text-brand-red">
                        Practical Knowledge | Job Assistance | Infusing Technical Skills
                      </div>
                      <p>
                        Our objective is to utilize our Digital Marketing Course not only to provide knowledge in existing internet marketing concepts but also to come up with new strategies in a way companies make their existence in the market to stay competitive.
                      </p>
                    </div>
                  )}
                </div>

                {/* Vision */}
                <div className="rounded-xl border border-gray-200 dark:border-neutral-800 overflow-hidden shadow-sm">
                  <button
                    onClick={() => setActiveTab(activeTab === "vision" ? "value" : "vision")}
                    className={`w-full p-4 text-left font-heading font-bold text-sm sm:text-base flex items-center justify-between transition-colors ${
                      activeTab === "vision"
                        ? "bg-[#b52828] text-white"
                        : "bg-gray-50 dark:bg-neutral-900 hover:bg-gray-100 dark:hover:bg-neutral-800 text-gray-900 dark:text-white"
                    }`}
                  >
                    <span>Our Vision → Shaping Future Marketers</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${activeTab === "vision" ? "rotate-180" : ""}`} />
                  </button>
                  {activeTab === "vision" && (
                    <div className="p-5 bg-white dark:bg-[#12131A] text-xs sm:text-sm text-gray-600 dark:text-gray-300 space-y-2 font-body leading-relaxed">
                      <div className="font-semibold text-brand-red">
                        Upskill Individuals | Industry-Ready | Certified Digital Marketers
                      </div>
                      <p>
                        The vision of the Delhi Institute of Digital Marketing is to teach and train our students to become successful digital marketers and contribute to the welfare of the entire society. Our motive behind starting and expanding DIDM is to develop skilled professionals across PAN India.
                      </p>
                    </div>
                  )}
                </div>

                {/* Value */}
                <div className="rounded-xl border border-gray-200 dark:border-neutral-800 overflow-hidden shadow-sm">
                  <button
                    onClick={() => setActiveTab(activeTab === "value" ? "mission" : "value")}
                    className={`w-full p-4 text-left font-heading font-bold text-sm sm:text-base flex items-center justify-between transition-colors ${
                      activeTab === "value"
                        ? "bg-[#b52828] text-white"
                        : "bg-gray-50 dark:bg-neutral-900 hover:bg-gray-100 dark:hover:bg-neutral-800 text-gray-900 dark:text-white"
                    }`}
                  >
                    <span>Our Value → Excellence, Innovation, Integrity</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${activeTab === "value" ? "rotate-180" : ""}`} />
                  </button>
                  {activeTab === "value" && (
                    <div className="p-5 bg-white dark:bg-[#12131A] text-xs sm:text-sm text-gray-600 dark:text-gray-300 space-y-2 font-body leading-relaxed">
                      <div className="font-semibold text-brand-red">
                        50+ Modules | 650+ Corporate Partners | Live Projects
                      </div>
                      <p>
                        Our digital marketing course comes along with 50+ modules and 100% placement assistance like no other institute, backed by 650+ company tie-ups in IT and non-IT sectors. We provide theoretical and practical classes with real hands-on client projects.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </MotionSection>

      {/* ========================================================= */}
      {/* SECTION 03: A DECADE OF EXCELLENCE (DOCUMENTARY VIDEO)     */}
      {/* ========================================================= */}
      <MotionSection as="section" preset="depth" className="py-14 sm:py-20 bg-gray-50 dark:bg-[#111218] border-b border-gray-200 dark:border-neutral-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-center">
          <MotionHeading
            eyebrow="10 Years of Trust & Leadership"
            title="A Decade of Excellence in Digital Marketing Education"
            subtitle="Established in 2014, DIDM has been a pioneer in digital marketing education, shaping the careers of over 70,000+ success stories across India."
            align="center"
            as="h2"
            size="lg"
          />

          {/* Embedded YouTube Player: The Rise of DIDM */}
          <VideoPreview />
        </div>
      </MotionSection>

      {/* ========================================================= */}
      {/* SECTION 04: MEET THE VISIONARIES BEHIND DIDM               */}
      {/* ========================================================= */}
      <MotionSection as="section" preset="stagger" className="py-14 sm:py-20 border-b border-gray-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <MotionHeading
            eyebrow="Leadership & Faculty"
            title="Meet the Visionaries Behind DIDM"
            subtitle="The educators, operations directors, and agency mentors who steer India's leading digital marketing institute."
            align="center"
            as="h2"
            size="lg"
          />

          <StaggeredCardGrid columns={4} stagger={0.06}>
            {VISIONARIES.map((member, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-5 rounded-2xl bg-white dark:bg-[#14151E] border border-gray-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-3 border-[#b52828] mb-4 shadow-inner group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </div>
                <h3 className="text-sm sm:text-base font-bold font-heading text-gray-900 dark:text-white">
                  {member.name}
                </h3>
                <div className="text-xs font-semibold text-[#b52828] mt-0.5">
                  {member.role}
                </div>
                <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 font-body">
                  {member.department}
                </div>
              </div>
            ))}
          </StaggeredCardGrid>

          <div className="text-center pt-4 flex flex-wrap justify-center items-center gap-3">
            <Link
              href="/trainers"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#b52828] hover:bg-red-800 text-white font-heading font-bold text-xs rounded-md shadow-sm transition"
            >
              <span>Meet All Faculty Trainers &amp; Mentors</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/trainers#trainee-reviews"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-gray-800 dark:text-neutral-200 font-heading font-bold text-xs rounded-md transition"
            >
              <span>View 54+ Trainee Placement Reviews</span>
              <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
            </Link>
          </div>
        </div>
      </MotionSection>

      {/* ========================================================= */}
      {/* SECTION 05: DOWNLOAD E-RESOURCE BANNER                     */}
      {/* ========================================================= */}
      <MotionSection as="section" preset="scale" className="py-12 bg-gray-100 dark:bg-[#111218] border-b border-gray-200 dark:border-neutral-800 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-gray-900 dark:text-white">
            Download E-Resource
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 max-w-xl mx-auto font-body">
            DIDM provides comprehensive study materials, e-notes, and career roadmap brochures to help kickstart your digital marketing education.
          </p>
          <div className="pt-2">
            <a
              href="/enquire?form=brochure"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#b52828] hover:bg-red-800 text-white font-heading font-bold text-sm rounded-md shadow-md transition-all hover:scale-105"
            >
              <Download className="w-4 h-4" />
              <span>Request the official brochure</span>
            </a>
          </div>
        </div>
      </MotionSection>

      {/* ========================================================= */}
      {/* SECTION 06: 100% RECORD PLACEMENTS & PARTNER LOGOS         */}
      {/* ========================================================= */}
      <MotionSection as="section" preset="editorial" className="py-14 sm:py-20 border-b border-gray-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[#b52828] font-heading">
              New Way To Learn
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-gray-900 dark:text-white">
              100% Record Placements
            </h2>
            <div className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 font-heading">
              Placement Cell | 650+ Company Tie Up&apos;s | Dedicated Staff | Counselling Sessions
            </div>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-body leading-relaxed pt-1">
              During the internship, candidates get to experience working environments in various organizations, understand agency workflows, and build live client campaign portfolios. DIDM provides hassle-free internships with News24, Online Strikers, and 650+ corporate partners.
            </p>
          </div>

          {/* Hiring Partners Logo Strip */}
          <div className="p-6 rounded-2xl bg-gray-50 dark:bg-[#12131A] border border-gray-200 dark:border-neutral-800 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 items-center">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <div key={num} className="relative h-12 w-full flex items-center justify-center p-2 bg-white dark:bg-neutral-900 rounded-lg border border-gray-200/60 shadow-2xs">
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


          <div className="text-center pt-4 flex flex-wrap justify-center items-center gap-3">
            <Link
              href="/trainers"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#b52828] hover:bg-red-800 text-white font-heading font-bold text-xs rounded-md shadow-sm transition"
            >
              <span>Meet All Faculty Trainers &amp; Mentors</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/trainers#trainee-reviews"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-gray-800 dark:text-neutral-200 font-heading font-bold text-xs rounded-md transition"
            >
              <span>View 54+ Trainee Placement Reviews</span>
              <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
            </Link>
          </div>
        </div>
      </MotionSection>

      {/* ========================================================= */}
      {/* SECTION 07: ACHIEVEMENT OF THE YEAR - 2024                 */}
      {/* ========================================================= */}
      <MotionSection as="section" preset="depth" className="py-14 sm:py-20 bg-gradient-to-r from-red-800 via-[#b52828] to-red-900 text-white shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-yellow-300 font-heading">
                Milestone Highlights
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-white">
                Achievement of the Year - 2024
              </h2>
              <p className="text-sm sm:text-base text-red-100 font-body leading-relaxed">
                DIDM has opened a new corporate office in Noida, revamped our Kalkaji and Gurgaon branches, and expanded further with a new branch in Haldwani (Uttarakhand). This year, we witnessed record-breaking admissions and placements, helping thousands of students launch rewarding careers in digital marketing.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-lg bg-black/25 border border-white/10">
                  <div className="text-xl font-bold text-yellow-300 font-heading">14</div>
                  <div className="text-neutral-200 mt-0.5">Physical Campuses</div>
                </div>
                <div className="p-3 rounded-lg bg-black/25 border border-white/10">
                  <div className="text-xl font-bold text-yellow-300 font-heading">70,000+</div>
                  <div className="text-neutral-200 mt-0.5">Trained Students</div>
                </div>
                <div className="p-3 rounded-lg bg-black/25 border border-white/10 col-span-2 sm:col-span-1">
                  <div className="text-xl font-bold text-yellow-300 font-heading">650+</div>
                  <div className="text-neutral-200 mt-0.5">Hiring Tie-Ups</div>
                </div>
              </div>
            </div>

            {/* Convocation Photo */}
            <div className="lg:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20">
              <Image
                src="/images/didm/homepage/DIDM_June_Batch_Closing_by-Mr-Siddhartha-sir-in_Preet-Vihar-1.jpg"
                alt="DIDM Convocation and Batch Graduation Ceremony"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </MotionSection>

      {/* ========================================================= */}
      {/* SECTION 08: # DIDM IS TRENDING                             */}
      {/* ========================================================= */}
      <MotionSection as="section" preset="editorial" className="py-14 border-b border-gray-200 dark:border-neutral-800 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#b52828] font-heading">
            Social Proof &amp; Media
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-gray-900 dark:text-white">
            # DIDM is Trending
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-body max-w-xl mx-auto">
            From premier media interviews on Zee News and News24 to our viral student campaign teardowns, discover why DIDM is India&apos;s most talked-about digital academy.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Link
              href="/media-coverage"
              className="px-6 py-2.5 rounded-md bg-[#b52828] hover:bg-red-800 text-white font-heading font-bold text-xs shadow-sm transition"
            >
              Explore Media Coverage &rarr;
            </Link>
            <Link
              href="/news-and-events"
              className="px-6 py-2.5 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-gray-900 dark:text-white font-heading font-bold text-xs transition"
            >
              Browse News &amp; Events
            </Link>
          </div>
        </div>
      </MotionSection>

      {/* ========================================================= */}
      {/* SECTION 09: FAQ'S ACCORDION                                */}
      {/* ========================================================= */}
      <MotionSection as="section" preset="editorial" className="py-14 sm:py-20 bg-gray-50 dark:bg-[#111218] border-b border-gray-200 dark:border-neutral-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <MotionHeading
            eyebrow="Common Queries"
            title="FAQ'S"
            subtitle="Everything you need to know about DIDM batches, doubt-clearing, certifications, and placement support."
            align="center"
            as="h2"
            size="lg"
          />

          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-[#14151E] overflow-hidden shadow-2xs"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left font-heading font-bold text-xs sm:text-sm text-gray-900 dark:text-white flex items-center justify-between gap-4 hover:bg-gray-50 dark:hover:bg-neutral-800/50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#b52828] shrink-0 transition-transform duration-200 ${
                      openFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-body leading-relaxed border-t border-gray-100 dark:border-neutral-800 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>


          <div className="text-center pt-4 flex flex-wrap justify-center items-center gap-3">
            <Link
              href="/trainers"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#b52828] hover:bg-red-800 text-white font-heading font-bold text-xs rounded-md shadow-sm transition"
            >
              <span>Meet All Faculty Trainers &amp; Mentors</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/trainers#trainee-reviews"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-gray-800 dark:text-neutral-200 font-heading font-bold text-xs rounded-md transition"
            >
              <span>View 54+ Trainee Placement Reviews</span>
              <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
            </Link>
          </div>
        </div>
      </MotionSection>

      {/* ========================================================= */}
      {/* SECTION 10: HEAD OFFICE & INLINE ADMISSIONS FORM           */}
      {/* ========================================================= */}
      <MotionSection as="section" preset="depth" className="py-14 sm:py-20 border-b border-gray-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Institutional Contact Card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#b52828] font-heading">
                  Visit DIDM HQ
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-gray-900 dark:text-white">
                  Head Office : Satya Niketan
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-body leading-relaxed">
                  Located opposite Sri Venkateswara College in South Campus, New Delhi. Drop in for a 1-on-1 career consultation or attend an ongoing classroom session.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-gray-50 dark:bg-[#12131A] border border-gray-200 dark:border-neutral-800 space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#b52828] shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300 font-body">
                    Plot 12, 3rd Floor, Satya Niketan, opp. Sri Venkateswara College, New Delhi - 110021
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#b52828] shrink-0" />
                  <a href="tel:+918800505151" className="text-gray-700 dark:text-gray-300 hover:text-[#b52828] font-bold">
                    +91 88005 05151 (Toll-Free Admissions Desk)
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#b52828] shrink-0" />
                  <a href="mailto:info@didm.in" className="text-gray-700 dark:text-gray-300 hover:text-[#b52828]">
                    info@didm.in
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#b52828] shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300 font-body">
                    Mon–Fri: 9am–9pm | Sat–Sun: 9am–7pm
                  </span>
                </div>
              </div>
            </div>

            {/* Right Take a Free Session Today Lead Form */}
            <div className="lg:col-span-7">
              <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#12131A] border-2 border-[#b52828]/30 shadow-xl space-y-5">
                <div className="border-b border-gray-100 dark:border-neutral-800 pb-3">
                  <h3 className="text-xl sm:text-2xl font-extrabold font-heading text-gray-900 dark:text-white">
                    Book a Free Demo Class
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-body mt-1">
                    Please fill with your details to receive curriculum syllabus and session invite.
                  </p>
                </div>

                {formSubmitted ? (
                  <div className="p-6 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-center space-y-2">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                    <h4 className="text-base font-bold text-emerald-900 dark:text-emerald-200">
                      Request Submitted Successfully!
                    </h4>
                    <p className="text-xs text-emerald-700 dark:text-emerald-300">
                      Your enquiry has been saved. The DIDM team will contact you about course information and demo availability.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                    <div>
                      <label className="block font-heading font-semibold text-gray-700 dark:text-gray-300 mb-1">
                        Full Name *
                      </label>
                      <input aria-label="Full name"
                        type="text"
                        required
                        placeholder="e.g. Rahul Verma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-md border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-gray-900 dark:text-white focus:outline-none focus:border-[#b52828]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-heading font-semibold text-gray-700 dark:text-gray-300 mb-1">
                          Phone Number *
                        </label>
                        <input aria-label="Phone number"
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-md border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-gray-900 dark:text-white focus:outline-none focus:border-[#b52828]"
                        />
                      </div>

                      <div>
                        <label className="block font-heading font-semibold text-gray-700 dark:text-gray-300 mb-1">
                          Email Address *
                        </label>
                        <input aria-label="Email address"
                          type="email"
                          required
                          placeholder="rahul@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-md border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-gray-900 dark:text-white focus:outline-none focus:border-[#b52828]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-heading font-semibold text-gray-700 dark:text-gray-300 mb-1">
                          Select Nearest Branch *
                        </label>
                        <select aria-label="Preferred training centre"
                          value={formData.centre}
                          onChange={(e) => setFormData({ ...formData, centre: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-md border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-gray-900 dark:text-white focus:outline-none focus:border-[#b52828]"
                        >
                          <option value="Satya Niketan">Satya Niketan (South Campus HQ)</option>
                          <option value="Noida">Noida Sector 62</option>
                          <option value="Dwarka">Dwarka Sector 7</option>
                          <option value="Kalkaji">Kalkaji / Nehru Place</option>
                          <option value="Gurgaon">Gurgaon Sector 14</option>
                          <option value="Pitampura">Pitampura (NSP)</option>
                          <option value="Preet Vihar">Preet Vihar</option>
                          <option value="Rajouri Garden">Rajouri Garden</option>
                          <option value="Online">Online Interactive Live Campus</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-heading font-semibold text-gray-700 dark:text-gray-300 mb-1">
                          Select Program *
                        </label>
                        <select aria-label="Program of interest"
                          value={formData.course}
                          onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-md border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-gray-900 dark:text-white focus:outline-none focus:border-[#b52828]"
                        >
                          <option value="midm">Master in Digital Marketing (MIDM)</option>
                          <option value="aidm">Advanced in Digital Marketing (AIDM)</option>
                          <option value="dmi">DMI 1-Year Diploma</option>
                          <option value="custom">Customized Digital Marketing</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 bg-[#b52828] hover:bg-red-800 text-white font-heading font-bold text-sm rounded-md shadow-md transition-all hover:scale-[1.01]"
                    >
                      Book Free Demo Class &amp; Download Syllabus
                    </button>
                  <EnquiryFeedback error={enquiry.error} pending={enquiry.pending} consent={true} />
</form>
                )}
              </div>
            </div>
          </div>
        </div>
      </MotionSection>
    </div>
  );
}

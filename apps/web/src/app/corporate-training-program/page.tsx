"use client";

import { EditorialHero } from "@/components/creative/EditorialHero";
import { useEnquirySubmission, EnquiryFeedback } from "@/components/creative/EnquirySubmission";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Phone,
  Layers,
  Clock,
  Presentation,
  TrendingUp,
  Laptop,
  Lightbulb,
  Globe,
  Award,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Download,
  Mail,
  User,
  Building,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Send,
  Loader2,
  X,
} from "lucide-react";
import { MotionSection } from "@/components/motion/MotionSection";
import { MotionHeading } from "@/components/motion/MotionHeading";
import { StaggeredCardGrid } from "@/components/motion/StaggeredCardGrid";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "What is the importance of corporate training?",
    answer:
      "The importance of corporate training is to ensure that all our candidates can handle their projects well when it comes to fulfilling company goals and objectives. Continued training in an individual career has become a huge part of the corporate culture. We at DIDM help organizations get high ROI by providing hands-on practical digital marketing skills to their teams.",
  },
  {
    question: "I have experience in Traditional Marketing. Can I shift my career to digital marketing?",
    answer:
      "Yes, of course. In today's digital environment, traditional marketers must understand the concepts of digital marketing while running campaigns for clients across search, social, and programmatic media to achieve strong ROI.",
  },
  {
    question: "I am not an engineer neither do I possess Programming knowledge. Will I be able to do this Digital Marketing course?",
    answer:
      "You need not know coding or come from an engineering/technical background to be successful in Digital Marketing. The tools and platforms we teach are user-friendly, business-oriented, and focused on strategic marketing execution.",
  },
  {
    question: "I am a Marketing Professional with 5+ years of experience. Should I learn Digital Marketing?",
    answer:
      "It is an excellent course to take up if you want to stay relevant in a marketing leadership role. With the growing contribution of digital channels in overall marketing spends, digital competence is mandatory for senior brand managers.",
  },
  {
    question: "Is the course theoretical or practical?",
    answer:
      "Our training program combines theoretical foundations with 80% practical execution in each module. We provide live exposure on actual ad budgets, SEO campaigns, and analytics reporting tools.",
  },
  {
    question: "Can I work as a freelancer after completing the course?",
    answer:
      "Yes, our course helps you learn every concept in real-time. At the end of the sessions, we discuss client pitching, freelancing platforms, agency contract frameworks, and proposal management.",
  },
  {
    question: "What is the mode of training?",
    answer:
      "We offer 3 flexible modes of training: On-site Classroom Corporate Training at your company premises, Campus Training at our 14+ PAN India centers, and Live Global Interactive Online Sessions.",
  },
  {
    question: "Are your online training sessions interactive?",
    answer:
      "Yes, we conduct live Q&A sessions, breakout room exercises, real-time campaign audits, and small group discussions to ensure the highest engagement and retention.",
  },
  {
    question: "What is the salary for professionals in Digital Marketing?",
    answer:
      "At the entry level, fresh digital marketing associates typically start between ₹3.5 LPA to ₹6 LPA. Experienced performance marketers and digital marketing heads command packages between ₹12 LPA to ₹25+ LPA.",
  },
  {
    question: "Can I train my office employees through your corporate digital marketing program?",
    answer:
      "Yes! We specialize in custom enterprise cohorts tailored specifically to your company's product niche, target audience, KPIs, and tech stack.",
  },
];

export default function CorporateTrainingProgramPage() {
  const enquiry = useEnquirySubmission();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const isSubmitting = enquiry.pending;
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    email: "",
    company: "",
    teamSize: "10-25 Employees",
    message: "",
  });

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => enquiry.submit(e, {name:formData.fullname, phone:formData.phone, email:formData.email, courseId:"corporate-training", preferredBatch:formData.teamSize, organization:formData.company, message:formData.message}, () => setIsSubmitted(true));

  return (
    <div className="creative-page min-h-screen bg-[#fafbfc] text-[#222222]">
      <EditorialHero bannerRatio={3.3333333333333335} eyebrow="FOR TEAMS & ORGANISATIONS" title="Corporate Training Program" description="Explore DIDM corporate training for practical digital marketing skills. Talk through your team’s learning needs and request a tailored training conversation." image="/images/didm/corporate/corporate_banner.jpg" alt="DIDM Corporate Training Program" caption="DIDM Corporate Training Program" variant="institution" href="#corporate-form" action="Discuss team training" />
      <div id="community-gallery" />
      {/* 1. TOP BREADCRUMB BAR */}
      <MotionSection as="section" preset="editorial" className="bg-white border-b border-neutral-200">
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
            <span className="font-semibold text-[#c0392b]">Corporate Training Program</span>
          </nav>

          <a
            href="tel:+918800505151"
            className="inline-flex items-center gap-1.5 text-neutral-700 hover:text-[#c0392b] font-bold transition text-xs sm:text-sm"
          >
            <Phone className="w-3.5 h-3.5 text-[#c0392b]" />
            <span>+91 8800-505-151</span>
          </a>
        </div>
      </MotionSection>

      {/* 2. CORPORATE HERO BANNER */}
      <details className="creative-source-art"><summary>Original DIDM training introduction</summary>      <MotionSection as="section" preset="editorial" className="relative bg-[#7d1919] text-white py-16 sm:py-24 overflow-hidden">
        {/* Background Image with Crimson Overlay */}
        <div className="absolute inset-0 z-0">
          <Image sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            src="/images/didm/corporate/corporate_banner.jpg"
            alt="Corporate Training Program"
            fill
            priority
            className="object-cover opacity-25 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#6b1414] via-[#851d1d]/90 to-[#6b1414]"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-sm border border-white/20">
            <Building className="w-3.5 h-3.5 text-yellow-400" />
            Enterprise Upskilling &amp; Workforce Transformation
          </div>

          <MotionHeading as="h2" className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase drop-shadow-sm">
            Corporate Training Program
          </MotionHeading>

          <p className="max-w-3xl mx-auto text-sm sm:text-base lg:text-lg text-neutral-200 leading-relaxed font-normal">
            Learn how to build in-house digital capabilities to scale and accelerate your business in this digital era.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <a
              href="#corporate-form"
              className="px-6 py-3 rounded-full bg-white text-[#b52828] hover:bg-neutral-100 font-extrabold text-xs sm:text-sm shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5"
            >
              Request Custom Enterprise Proposal
            </a>
            <a
              href="tel:+918800505151"
              className="px-6 py-3 rounded-full bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold text-xs sm:text-sm transition flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call Senior Advisor</span>
            </a>
          </div>
        </div>
      </MotionSection></details>

      {/* 3. SECTION: DIDM TRAINING APPROACH */}
      <MotionSection as="section" preset="depth" className="py-12 sm:py-16 bg-white border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-2">
            <MotionHeading as="h2" className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
              DIDM <span className="text-[#c0392b]">Training Approach</span>
            </MotionHeading>
            <div className="w-16 h-1 bg-[#c0392b] mx-auto"></div>
            <p className="text-xs sm:text-sm text-neutral-600">
              We design corporate training programs as per real market standards and organizational KPIs.
            </p>
          </div>

          {/* Central Meeting Graphic with 6 Surrounding Approach Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column (3 Points) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-5 rounded-xl border border-neutral-200 bg-neutral-50/60 hover:bg-white hover:shadow-md transition text-left space-y-1.5 group">
                <span className="text-xs font-black uppercase text-[#c0392b] tracking-wider block">
                  1. Assessment
                </span>
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                  We work closely with leadership to identify your exact business requirements, skill gaps, and channel objectives.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-neutral-200 bg-neutral-50/60 hover:bg-white hover:shadow-md transition text-left space-y-1.5 group">
                <span className="text-xs font-black uppercase text-[#c0392b] tracking-wider block">
                  2. Customized Training
                </span>
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                  Every curriculum is customized around your actual marketing stack, ad budgets, and industry vertical.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-neutral-200 bg-neutral-50/60 hover:bg-white hover:shadow-md transition text-left space-y-1.5 group">
                <span className="text-xs font-black uppercase text-[#c0392b] tracking-wider block">
                  3. Analyze &amp; Final Assessment
                </span>
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                  Benchmark employee performance with pre-and-post training assessments, ROI dashboards, and certification tests.
                </p>
              </div>
            </div>

            {/* Center Column: Graphic Illustration */}
            <div className="lg:col-span-4 flex items-center justify-center">
              <div className="relative w-full max-w-sm aspect-square rounded-2xl overflow-hidden p-2 flex items-center justify-center">
                <Image
                  src="/images/didm/corporate/corporate_approach_table.jpg"
                  alt="DIDM Corporate Training Circular Approach"
                  width={500}
                  height={500}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>

            {/* Right Column (3 Points) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-5 rounded-xl border border-neutral-200 bg-neutral-50/60 hover:bg-white hover:shadow-md transition text-left space-y-1.5 group">
                <span className="text-xs font-black uppercase text-[#c0392b] tracking-wider block">
                  4. Practical Approach
                </span>
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                  80% hands-on learning on live campaigns, actual Google Ads accounts, Meta CAPI pipelines, and GA4 dashboards.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-neutral-200 bg-neutral-50/60 hover:bg-white hover:shadow-md transition text-left space-y-1.5 group">
                <span className="text-xs font-black uppercase text-[#c0392b] tracking-wider block">
                  5. Branding &amp; Marketing Support
                </span>
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                  During the training cycle, employees immediately apply frameworks to generate measurable brand uplift.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-neutral-200 bg-neutral-50/60 hover:bg-white hover:shadow-md transition text-left space-y-1.5 group">
                <span className="text-xs font-black uppercase text-[#c0392b] tracking-wider block">
                  6. Target Goal
                </span>
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                  After cohort completion, your team achieves sustainable in-house digital execution without agency dependencies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </MotionSection>

      {/* 4. SECTION: WHY CHOOSE US FOR CORPORATE DIGITAL TRAINING */}
      <MotionSection preset="stagger" className="py-12 sm:py-16 bg-[#f4f5f7] border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-1">
            <span className="text-xs font-black uppercase tracking-wider text-[#c0392b]">
              Why Choose Us?
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight uppercase">
              For Corporate Digital Training
            </h2>
            <div className="w-16 h-1 bg-[#c0392b] mx-auto mt-2"></div>
          </div>

          <StaggeredCardGrid columns={4} stagger={0.04}>
            {/* Card 1 */}
            <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition text-center space-y-3 group">
              <div className="w-12 h-12 rounded-full bg-red-50 text-[#c0392b] flex items-center justify-center mx-auto group-hover:bg-[#c0392b] group-hover:text-white transition">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xs sm:text-sm text-neutral-900 leading-snug">
                Tailored Training Program
              </h3>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition text-center space-y-3 group">
              <div className="w-12 h-12 rounded-full bg-red-50 text-[#c0392b] flex items-center justify-center mx-auto group-hover:bg-[#c0392b] group-hover:text-white transition">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xs sm:text-sm text-neutral-900 leading-snug">
                Flextime Training Schedule
              </h3>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition text-center space-y-3 group">
              <div className="w-12 h-12 rounded-full bg-red-50 text-[#c0392b] flex items-center justify-center mx-auto group-hover:bg-[#c0392b] group-hover:text-white transition">
                <Presentation className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xs sm:text-sm text-neutral-900 leading-snug">
                1:1 Mentor Training
              </h3>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition text-center space-y-3 group">
              <div className="w-12 h-12 rounded-full bg-red-50 text-[#c0392b] flex items-center justify-center mx-auto group-hover:bg-[#c0392b] group-hover:text-white transition">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xs sm:text-sm text-neutral-900 leading-snug">
                Result-Oriented Training
              </h3>
            </div>

            {/* Card 5 */}
            <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition text-center space-y-3 group">
              <div className="w-12 h-12 rounded-full bg-red-50 text-[#c0392b] flex items-center justify-center mx-auto group-hover:bg-[#c0392b] group-hover:text-white transition">
                <Laptop className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xs sm:text-sm text-neutral-900 leading-snug">
                Live Project &amp; Case Studies
              </h3>
            </div>

            {/* Card 6 */}
            <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition text-center space-y-3 group">
              <div className="w-12 h-12 rounded-full bg-red-50 text-[#c0392b] flex items-center justify-center mx-auto group-hover:bg-[#c0392b] group-hover:text-white transition">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xs sm:text-sm text-neutral-900 leading-snug">
                Industry Experts Mentors
              </h3>
            </div>

            {/* Card 7 */}
            <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition text-center space-y-3 group">
              <div className="w-12 h-12 rounded-full bg-red-50 text-[#c0392b] flex items-center justify-center mx-auto group-hover:bg-[#c0392b] group-hover:text-white transition">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xs sm:text-sm text-neutral-900 leading-snug">
                Offline &amp; Online Hybrid
              </h3>
            </div>

            {/* Card 8 */}
            <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition text-center space-y-3 group">
              <div className="w-12 h-12 rounded-full bg-red-50 text-[#c0392b] flex items-center justify-center mx-auto group-hover:bg-[#c0392b] group-hover:text-white transition">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xs sm:text-sm text-neutral-900 leading-snug">
                30+ Certifications
              </h3>
            </div>
          </StaggeredCardGrid>
        </div>
      </MotionSection>

      {/* 5. SECTION: FOR CORPORATE & STARTUP */}
      <MotionSection preset="depth" className="py-12 sm:py-16 bg-white border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-[#c0392b]">
              For Corporate &amp; Startup
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-900 tracking-tight leading-snug">
              We provide you the <span className="text-[#c0392b]">skills</span> to change your <br className="hidden sm:block" />
              <span className="text-[#c0392b]">work force</span> as per current market standards.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Left Card: Up Skill Your Talent Force */}
            <div className="rounded-2xl border border-neutral-200 shadow-md overflow-hidden bg-white hover:shadow-xl transition flex flex-col justify-between group">
              <div className="relative w-full aspect-[16/10]">
                <Image sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  src="/images/didm/corporate/corporate_talent.jpg"
                  alt="For Corporate Up Skill your talent Force"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 bg-neutral-900 text-white flex items-center justify-between">
                <div>
                  <span className="text-xs text-neutral-400 uppercase tracking-wider block">Corporate Cohort</span>
                  <h4 className="font-bold text-sm sm:text-base text-white">Up Skill Your Talent Force</h4>
                </div>
                <a
                  href="#corporate-form"
                  className="px-4 py-2 rounded bg-[#c0392b] hover:bg-[#a92323] text-white text-xs font-bold transition flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Brochure</span>
                </a>
              </div>
            </div>

            {/* Right Column: Add Skill Courses to Portfolio & Entrepreneur Program */}
            <div className="space-y-6 flex flex-col justify-between">
              {/* Top Banner: Association */}
              <div className="rounded-2xl border border-neutral-200 shadow-md overflow-hidden bg-white hover:shadow-xl transition group">
                <Link href="/organisations" className="block relative w-full aspect-[16/8]">
                  <Image sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    src="/images/didm/corporate/association.jpg"
                    alt="For association add our skill courses to your portfolio"
                    fill
                    className="object-cover"
                  />
                </Link>
                <div className="p-4 bg-[#0fa47f] text-white flex items-center justify-between">
                  <span className="text-xs font-bold">University &amp; College Skill Partnerships</span>
                  <Link
                    href="/organisations"
                    className="px-3 py-1.5 rounded bg-white text-[#0fa47f] hover:bg-neutral-100 text-xs font-extrabold transition"
                  >
                    Learn More
                  </Link>
                </div>
              </div>

              {/* Bottom Banner: Entrepreneur Program */}
              <div className="rounded-2xl border border-neutral-200 shadow-md overflow-hidden bg-white hover:shadow-xl transition">
                <div className="relative w-full aspect-[16/5]">
                  <Image sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    src="/images/didm/corporate/entrepreneur_program.jpg"
                    alt="Digital marketing entrepreneur training program"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </MotionSection>

      {/* 6. SECTION: LEARNING EXPERTISE & CORPORATE GOAL LEAD FORM */}
      <MotionSection preset="scale" id="corporate-form" className="py-14 sm:py-16 bg-[#f8f9fa] border-b border-neutral-200 scroll-mt-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
              Learning <span className="text-[#c0392b]">Expertise</span>
            </h2>
            <div className="w-16 h-1 bg-[#c0392b] mx-auto"></div>
            <p className="text-xs sm:text-sm text-neutral-600 max-w-2xl mx-auto">
              We work with your team force to quickly boost the digital capabilities of your staff skill to deliver maximum ROI.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Training Outcome */}
            <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 shadow-sm space-y-6">
              <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden">
                <Image sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  src="/images/didm/corporate/learn_outcome.jpg"
                  alt="DIDM Training Outcome"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-black text-[#d35400] text-center tracking-tight">
                  Training Outcome
                </h3>

                <ul className="space-y-3 text-xs sm:text-sm text-neutral-700">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#c0392b] flex-shrink-0 mt-0.5" />
                    <span>Improve your brand value and online market presence across search and social.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#c0392b] flex-shrink-0 mt-0.5" />
                    <span>Empower staff with end-to-end capabilities to handle client queries and pitches.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#c0392b] flex-shrink-0 mt-0.5" />
                    <span>Minimum 05 virtual internship-trained digital marketers to boost your pipeline.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#c0392b] flex-shrink-0 mt-0.5" />
                    <span>24x7 dedicated support and services desk from senior DIDM faculty.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#c0392b] flex-shrink-0 mt-0.5" />
                    <span>End-to-end strategic campaign roadmaps for high conversion velocity.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right: Corporate Goal Form */}
            <div className="lg:col-span-6 bg-white rounded-2xl border border-neutral-200 shadow-xl overflow-hidden">
              {/* Form Crimson Header */}
              <div className="bg-[#b52828] text-white p-6 text-center space-y-1">
                <h3 className="text-xl sm:text-2xl font-black tracking-tight uppercase text-white">
                  Corporate Goal !!!
                </h3>
                <p className="text-xs sm:text-sm text-neutral-200 font-medium tracking-wide">
                  Go Digital | Go Global
                </p>
              </div>

              {/* Form Body */}
              <div className="p-6 sm:p-8">
                {isSubmitted ? (
                  <div className="text-center py-10 space-y-3">
                    <div className="w-14 h-14 rounded-full bg-green-50 text-green-600 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-lg font-bold text-neutral-900">
                      Corporate Enquiry Received!
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-600 max-w-sm mx-auto">
                      Thank you. Our Enterprise Training Director will review your requirements and share a custom syllabus proposal to discuss your enquiry.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                        <input aria-label="Full name"
                          type="text"
                          required
                          value={formData.fullname}
                          onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                          placeholder="e.g. Rajesh Sharma"
                          className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-lg border border-neutral-300 focus:outline-none focus:border-[#b52828] focus:ring-1 focus:ring-[#b52828]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-neutral-700 mb-1">
                          Phone Number *
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                          <input aria-label="Phone number"
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="e.g. 98112XXXXX"
                            className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-lg border border-neutral-300 focus:outline-none focus:border-[#b52828] focus:ring-1 focus:ring-[#b52828]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-neutral-700 mb-1">
                          Official Work Email *
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                          <input aria-label="Email address"
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="name@company.com"
                            className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-lg border border-neutral-300 focus:outline-none focus:border-[#b52828] focus:ring-1 focus:ring-[#b52828]"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-neutral-700 mb-1">
                          Company / Brand Name
                        </label>
                        <div className="relative">
                          <Building className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                          <input aria-label="Company Name"
                            type="text"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            placeholder="Company Name"
                            className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-lg border border-neutral-300 focus:outline-none focus:border-[#b52828] focus:ring-1 focus:ring-[#b52828]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-neutral-700 mb-1">
                          Team Size for Training
                        </label>
                        <select aria-label="Expected team size"
                          value={formData.teamSize}
                          onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                          className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-lg border border-neutral-300 focus:outline-none focus:border-[#b52828] focus:ring-1 focus:ring-[#b52828] bg-white"
                        >
                          <option value="5-10 Employees">5–10 Employees</option>
                          <option value="10-25 Employees">10–25 Employees</option>
                          <option value="25-50 Employees">25–50 Employees</option>
                          <option value="50+ Enterprise">50+ Enterprise Tier</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        Specific Marketing Goals or Requirements
                      </label>
                      <textarea aria-label="Your message"
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Mention key channels (Meta Ads, SEO, GA4, E-commerce, Generative AI) or desired outcomes..."
                        className="w-full p-3 text-xs sm:text-sm rounded-lg border border-neutral-300 focus:outline-none focus:border-[#b52828] focus:ring-1 focus:ring-[#b52828]"
                      ></textarea>
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
                            <span>Submitting Requirements...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Request Custom Proposal</span>
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
        </div>
      </MotionSection>

      {/* 7. SECTION: PARTNERSHIP & TRAINING MODELS */}
      <MotionSection preset="editorial" className="py-12 sm:py-16 bg-white border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
              Partnership <span className="text-[#c0392b]">Models</span>
            </h2>
            <div className="w-16 h-1 bg-[#c0392b] mx-auto"></div>
            <p className="text-xs sm:text-sm text-neutral-600 max-w-2xl mx-auto">
              We design our collaboration plan to integrate all your requirements into one segment to reduce cost with your business metrics.
            </p>
          </div>

          <StaggeredCardGrid columns={3} stagger={0.06}>
            {/* Model 1: New-Hire Training */}
            <div className="p-6 rounded-xl border border-neutral-200 bg-neutral-50/70 hover:bg-white hover:shadow-lg transition flex flex-col justify-between space-y-4 group">
              <div className="space-y-3">
                <div className="w-full h-1 bg-[#c0392b] rounded-full"></div>
                <h3 className="text-base sm:text-lg font-black text-[#c0392b]">
                  New-Hire Training
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  Fresher / new-hires trained extensively before they join the active operational organization to hit the ground running.
                </p>
              </div>
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                Induction Cohorts
              </span>
            </div>

            {/* Model 2: On-Boarding */}
            <div className="p-6 rounded-xl border border-neutral-200 bg-neutral-50/70 hover:bg-white hover:shadow-lg transition flex flex-col justify-between space-y-4 group">
              <div className="space-y-3">
                <div className="w-full h-1 bg-[#c0392b] rounded-full"></div>
                <h3 className="text-base sm:text-lg font-black text-[#c0392b]">
                  On-Boarding
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  Fast-track onboarding for experienced hires to synchronize their skills with your enterprise workflows and tools.
                </p>
              </div>
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                Experienced Hires
              </span>
            </div>

            {/* Model 3: Continuous Skilling */}
            <div className="p-6 rounded-xl border border-neutral-200 bg-neutral-50/70 hover:bg-white hover:shadow-lg transition flex flex-col justify-between space-y-4 group">
              <div className="space-y-3">
                <div className="w-full h-1 bg-[#c0392b] rounded-full"></div>
                <h3 className="text-base sm:text-lg font-black text-[#c0392b]">
                  Continuous Skilling
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  Upskilling existing teams and managers on generative AI marketing, attribution modeling, and technical SEO.
                </p>
              </div>
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                Workforce Upskilling
              </span>
            </div>
          </StaggeredCardGrid>
        </div>
      </MotionSection>

      {/* 8. SECTION: TRENDING BLOGS */}
      <MotionSection preset="editorial" className="py-12 bg-neutral-50 border-b border-neutral-200">
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
              className="group p-5 rounded-lg border border-neutral-200 hover:border-[#c0392b] shadow-sm hover:shadow transition bg-white space-y-3"
            >
              <span className="text-[11px] font-bold text-[#c0392b] uppercase tracking-wider">
                Enterprise Growth
              </span>
              <h3 className="font-bold text-neutral-900 group-hover:text-[#c0392b] transition text-sm sm:text-base leading-snug">
                Why Top Indian Corporates are Bringing Performance Marketing In-House
              </h3>
              <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed">
                Learn how internal digital marketing squads reduce customer acquisition costs (CAC) by 35% compared to outsourced agencies.
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
                AI &amp; Automation
              </span>
              <h3 className="font-bold text-neutral-900 group-hover:text-[#c0392b] transition text-sm sm:text-base leading-snug">
                How Corporate Teams Can Implement Generative AI Workflows for Ad Creatives
              </h3>
              <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed">
                Step-by-step framework for training copywriting and performance teams on prompt architecture, image models, and Zapier pipelines.
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
                ROI &amp; Attribution
              </span>
              <h3 className="font-bold text-neutral-900 group-hover:text-[#c0392b] transition text-sm sm:text-base leading-snug">
                Building Advanced GA4 &amp; Looker Studio Dashboards for Executive Reporting
              </h3>
              <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed">
                Understand how corporate marketing leaders unify omnichannel revenue data to report accurate ROAS directly to CXOs.
              </p>
              <div className="text-xs font-bold text-[#c0392b] flex items-center gap-1 pt-1">
                <span>Read More</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
              </div>
            </Link>
          </StaggeredCardGrid>
        </div>
      </MotionSection>

      {/* 9. SECTION: FAQS ACCORDION */}
      <MotionSection preset="depth" className="py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
              Frequently Asked <span className="text-[#c0392b]">Questions (FAQ)</span>
            </h2>
            <div className="w-16 h-1 bg-[#c0392b] mx-auto"></div>
          </div>

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


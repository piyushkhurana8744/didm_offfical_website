import Link from "next/link";
import { Suspense } from "react";
import {
  Building2,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Users,
  Award,
  BookOpen,
  ArrowRight,
  Sparkles,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { EnquiryForm } from "@/components/EnquiryForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Franchise Opportunities | Partner with DIDM",
  description:
    "Start your own profitable digital marketing training institute. Partner with DIDM — India's most promising brand in digital marketing education.",
  alternates: {
    canonical: "https://www.didm.in/franchise",
  },
};

const ADVANTAGES = [
  {
    icon: Building2,
    title: "Established 10+ Year Legacy",
    description: "Launch with an accredited brand with over 70,000+ success stories, ASSOCHAM honors, and ISO 9001:2015 certification.",
  },
  {
    icon: BookOpen,
    title: "52-Module Turnkey Curriculum",
    description: "Centralized syllabus, student e-notes, recorded LMS video libraries, and ongoing curriculum updates managed by DIDM headquarters.",
  },
  {
    icon: Users,
    title: "Faculty Hiring & Trainer Grooming",
    description: "Complete assistance in recruiting, training, and evaluating certified digital marketing mentors for your local campus.",
  },
  {
    icon: TrendingUp,
    title: "Centralized Admission Leads",
    description: "High-volume digital marketing ad campaigns, regional inquiries, and corporate tie-ups driven by our in-house performance agency Online Strikers.",
  },
  {
    icon: ShieldCheck,
    title: "100% Placement Cell Access",
    description: "Your students gain direct access to DIDM's pan-India placement network with 650+ verified corporate hiring partners.",
  },
  {
    icon: Award,
    title: "30+ Global Certification Vouchers",
    description: "Equip your trainees with Google, Meta, HubSpot, and SEMrush testing pathways and our recognized Industry Diploma.",
  },
];

export default function FranchisePage() {
  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <nav aria-label="Breadcrumb" className="text-xs font-mono text-neutral-500 flex items-center gap-2">
            <Link href="/" className="hover:text-brand-red transition-colors">Home</Link>
            <span>/</span>
            <span className="text-neutral-900 dark:text-white font-semibold">Franchise Partnership</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-red/10 text-brand-red text-xs font-mono font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>BUSINESS PARTNERSHIP · HIGH ROI EDUCATION MODEL</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-normal text-neutral-900 dark:text-white leading-[1.1]">
            Partner with India&apos;s most promising brand in digital marketing education.
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
            The demand for practical digital skills, AI tools, and performance marketing is skyrocketing across Tier 1, Tier 2, and Tier 3 cities. Start your own profitable digital marketing training center with turnkey operational support from DIDM.
          </p>
        </div>

        {/* Advantages Grid */}
        <div className="space-y-6">
          <div className="max-w-2xl space-y-1">
            <span className="text-xs font-mono uppercase text-brand-red font-bold tracking-wider">
              Why Partner With DIDM
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
              Complete End-to-End Operational Support
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ADVANTAGES.map((adv, idx) => {
              const Icon = adv.icon;
              return (
                <div
                  key={idx}
                  className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 shadow-sm hover:border-brand-red/30 transition-colors space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-red/10 text-brand-red flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white">{adv.title}</h3>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {adv.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Center Setup Requirements */}
        <div className="p-8 sm:p-12 rounded-3xl bg-neutral-100/70 dark:bg-[#14141B] border border-neutral-200 dark:border-neutral-800 space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono uppercase text-brand-red font-bold tracking-wider">
              Infrastructure Specifications
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
              Campus Setup Guidelines
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500">
              Designed to create an immersive, agency-like atmosphere for our students.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-[#181822] border border-neutral-200 dark:border-neutral-800 space-y-2">
              <div className="text-xs font-mono text-brand-red font-bold">CARPET AREA</div>
              <h4 className="text-lg font-bold text-neutral-900 dark:text-white">1,200 – 2,500 Sq Ft</h4>
              <p className="text-xs text-neutral-500">Well-located commercial space near transit hubs or educational zones.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white dark:bg-[#181822] border border-neutral-200 dark:border-neutral-800 space-y-2">
              <div className="text-xs font-mono text-brand-red font-bold">COMPUTER LABS</div>
              <h4 className="text-lg font-bold text-neutral-900 dark:text-white">1 to 2 Labs (20+ PCs)</h4>
              <p className="text-xs text-neutral-500">Equipped with high-speed internet for live Google and Meta ad drills.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white dark:bg-[#181822] border border-neutral-200 dark:border-neutral-800 space-y-2">
              <div className="text-xs font-mono text-brand-red font-bold">THEORY &amp; LAB ROOM</div>
              <h4 className="text-lg font-bold text-neutral-900 dark:text-white">Interactive Display</h4>
              <p className="text-xs text-neutral-500">Smart projector or large interactive display for slide &amp; screen walk-throughs.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white dark:bg-[#181822] border border-neutral-200 dark:border-neutral-800 space-y-2">
              <div className="text-xs font-mono text-brand-red font-bold">COUNSELLING DESK</div>
              <h4 className="text-lg font-bold text-neutral-900 dark:text-white">Reception &amp; Lounge</h4>
              <p className="text-xs text-neutral-500">Dedicated student admission desk and comfortable visitor lounge.</p>
            </div>
          </div>
        </div>

        {/* Real Enquiry Form for Franchise */}
        <div className="p-8 sm:p-12 rounded-3xl bg-neutral-50 dark:bg-[#15151D] border border-neutral-200 dark:border-neutral-800 shadow-xl space-y-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono uppercase text-brand-red font-bold tracking-wider">
              Franchise Expansion Desk
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
              Apply for DIDM Franchise Partnership
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500">
              Submit your inquiry below to connect directly with our central franchise expansion directorate.
            </p>
          </div>

          <Suspense fallback={<div className="p-8 text-center text-xs text-neutral-400">Loading franchise inquiry form...</div>}>
            <EnquiryForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}


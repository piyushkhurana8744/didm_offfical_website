import Link from "next/link";
import { Suspense } from "react";
import {
  Briefcase,
  Users,
  Sparkles,
  Heart,
  TrendingUp,
  Award,
  CheckCircle2,
  Mail,
  MapPin,
} from "lucide-react";
import { EnquiryForm } from "@/components/EnquiryForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers @ DIDM | Join Our Educational Faculty & Team",
  description:
    "Explore career openings at Delhi Institute of Digital Marketing. Hiring digital marketing trainers, SEO mentors, career counsellors, and corporate placement coordinators.",
  alternates: {
    canonical: "https://www.didm.in/careers",
  },
};

const OPEN_POSITIONS = [
  {
    id: "job-dm-trainer",
    title: "Senior Trainer — Performance Marketing & Google/Meta Ads",
    department: "Training & Academic Faculty",
    locations: "Noida / South Delhi / Gurugram / Online",
    experience: "3–6 Years Hands-On Agency / Training Experience",
    type: "Full-Time",
    responsibilities: [
      "Conduct engaging practical lectures on Google Ads, Meta Ads Manager, and programmatic media.",
      "Mentor student cohorts on live client ad account audits and conversion rate optimization.",
      "Review student assignments, campaign budgets, and capstone project defenses.",
    ],
  },
  {
    id: "job-career-counsellor",
    title: "Student Admissions & Career Counsellor",
    department: "Admissions Advisory",
    locations: "Dwarka / Kalkaji / Preet Vihar / Pitampura",
    experience: "1–4 Years Experience in EdTech / Education Counselling",
    type: "Full-Time",
    responsibilities: [
      "Provide transparent course guidance to students, college freshers, and career switchers.",
      "Conduct campus walk-throughs and explain curriculum pathways (MIDM, DMI, AIDM).",
      "Manage student onboarding, batch scheduling, and enrollment formalities.",
    ],
  },
  {
    id: "job-seo-mentor",
    title: "Technical SEO & Inbound Marketing Specialist",
    department: "Academic Faculty & Research",
    locations: "South Campus Satya Niketan (HQ) / Hybrid",
    experience: "2–5 Years in Technical SEO, Semrush & Core Web Vitals",
    type: "Full-Time",
    responsibilities: [
      "Lead technical SEO, schema architecture, and keyword research training modules.",
      "Demonstrate live site audits using Google Search Console, Moz, and Screaming Frog.",
      "Mentor trainees on AI-assisted content optimization and inbound marketing funnels.",
    ],
  },
  {
    id: "job-placement-manager",
    title: "Corporate Relations & Placement Officer",
    department: "Corporate Placement Cell",
    locations: "Noida Sector 62 / Delhi NCR",
    experience: "2–5 Years in HR, Campus Recruitment or Agency Hiring",
    type: "Full-Time",
    responsibilities: [
      "Manage relations with 650+ corporate hiring partners and schedule campus recruitment drives.",
      "Conduct professional resume grooming, LinkedIn optimization, and mock interview drills.",
      "Match qualified student profiles with digital agency and corporate job openings.",
    ],
  },
];

export default function CareersPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <nav aria-label="Breadcrumb" className="text-xs font-mono text-neutral-500 flex items-center gap-2">
            <Link href="/" className="hover:text-brand-red transition-colors">Home</Link>
            <span>/</span>
            <Link href="/about" className="hover:text-brand-red transition-colors">About</Link>
            <span>/</span>
            <span className="text-neutral-900 dark:text-white font-semibold">Careers</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-red/10 text-brand-red text-xs font-mono font-semibold">
            <Users className="w-3.5 h-3.5" />
            <span>IT&apos;S NOT JUST A TEAM — IT&apos;S A FAMILY</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-normal text-neutral-900 dark:text-white leading-[1.1]">
            Build the future of digital education with DIDM.
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
            Join India&apos;s leading network of practical digital marketing educators, agency strategists, and student career builders. Explore our current job openings across 14 training campuses.
          </p>
        </div>

        {/* Culture / Perks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 space-y-2">
            <Heart className="w-6 h-6 text-brand-red" />
            <h4 className="font-bold text-sm text-neutral-900 dark:text-white">Supportive Culture</h4>
            <p className="text-xs text-neutral-500">Collaborative, student-first environment with passionate mentors.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 space-y-2">
            <TrendingUp className="w-6 h-6 text-brand-red" />
            <h4 className="font-bold text-sm text-neutral-900 dark:text-white">Rapid Growth</h4>
            <p className="text-xs text-neutral-500">Promotions, leadership opportunities, and performance incentives.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 space-y-2">
            <Briefcase className="w-6 h-6 text-brand-red" />
            <h4 className="font-bold text-sm text-neutral-900 dark:text-white">Agency Exposure</h4>
            <p className="text-xs text-neutral-500">Work directly with client campaigns via in-house agency Online Strikers.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 space-y-2">
            <Award className="w-6 h-6 text-brand-red" />
            <h4 className="font-bold text-sm text-neutral-900 dark:text-white">Continuous Learning</h4>
            <p className="text-xs text-neutral-500">Sponsored certifications, AI prompting camps, and executive workshops.</p>
          </div>
        </div>

        {/* Current Open Positions */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">Current Job Openings</h2>
            <span className="text-xs font-mono text-neutral-400">{OPEN_POSITIONS.length} Active Openings</span>
          </div>

          <div className="space-y-4">
            {OPEN_POSITIONS.map((pos) => (
              <div
                key={pos.id}
                className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4 hover:border-brand-red/30 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-mono text-brand-red font-bold uppercase">{pos.department}</span>
                    <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white mt-0.5">
                      {pos.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <span className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-[11px] font-mono text-neutral-600 dark:text-neutral-300">
                      {pos.type}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500 font-medium">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-brand-red" />
                    {pos.locations}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-brand-red" />
                    {pos.experience}
                  </span>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-neutral-100 dark:border-neutral-800/80">
                  <div className="text-[11px] font-mono text-neutral-400 uppercase font-bold">Key Responsibilities:</div>
                  {pos.responsibilities.map((resp, rIdx) => (
                    <div key={rIdx} className="flex items-start gap-2 text-xs text-neutral-600 dark:text-neutral-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-red shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Application Form */}
        <div className="p-8 sm:p-12 rounded-3xl bg-neutral-50 dark:bg-[#15151D] border border-neutral-200 dark:border-neutral-800 shadow-xl space-y-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono uppercase text-brand-red font-bold tracking-wider">
              Apply Today
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
              Submit Your Profile &amp; Resume
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500">
              You can also email your CV directly to <strong className="text-neutral-900 dark:text-white">careers@didm.in</strong> or fill the form below.
            </p>
          </div>

          <Suspense fallback={<div className="p-8 text-center text-xs text-neutral-400">Loading careers application form...</div>}>
            <EnquiryForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}


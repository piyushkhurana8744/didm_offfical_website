import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Users,
  Building2,
  Award,
  ShieldCheck,
  Briefcase,
  FileText,
  HelpCircle,
  Phone,
} from "lucide-react";
import { SITE_BRAND } from "@/lib/content";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { getRecruiterLogoComponent } from "@/components/BrandIcons";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Career Placement Support & Outcomes | DIDM Official",
  description:
    "Explore DIDM's dedicated placement assistance process, 650+ corporate hiring partners, student portfolio preparation, and transparent career transition pathways.",
  alternates: {
    canonical: "https://www.didm.in/outcomes",
  },
  openGraph: {
    title: "Placement Support & Career Pathways | DIDM",
    description:
      "Understand how DIDM connects graduates with digital agencies, tech startups, and multinational marketing wings through structured portfolio proof.",
    url: "https://www.didm.in/outcomes",
    type: "website",
  },
};

export default function OutcomesPage() {
  const placementPhases = [
    {
      step: "01",
      title: "Practical Campaign Portfolio & Live Proof",
      desc: "Before attending interviews, candidates build documented campaign audits, live ad spend analytics, and SEO case studies that prove practical competency beyond certificates.",
    },
    {
      step: "02",
      title: "Agency Resume & Technical Mock Interviews",
      desc: "Our placement specialists conduct 1-on-1 resume optimization, LinkedIn profile structuring, and realistic agency panel interviews covering Google Ads, Meta CAPI, and GA4.",
    },
    {
      step: "03",
      title: "Direct Recruitment Drives Across 650+ Partners",
      desc: "Eligible graduates receive continuous interview interview interview scheduling with our network of digital agencies, MNCs, and high-growth brands until a suitable offer is accepted.",
    },
  ];

  const careerTiers = [
    {
      tier: "Entry-Level Digital Marketer (0–1 Yrs)",
      roles: ["SEO Executive", "PPC Junior Associate", "Social Media Executive", "Content Marketing Specialist"],
      skills: ["Google Search Ads", "Meta Ads Manager", "On-Page SEO", "Canva & Basic Copywriting"],
      scope: "Executes tactical daily campaign optimizations, keyword research, and client report compilation under team lead supervision.",
    },
    {
      tier: "Performance & Growth Specialist (2–4 Yrs)",
      roles: ["Performance Marketing Manager", "Senior Media Buyer", "Technical SEO Specialist", "Analytics Consultant"],
      skills: ["GA4 Server-Side Tracking", "Performance Max", "Midjourney & AI Workflows", "Attribution Modeling"],
      scope: "Owns entire brand ad budgets, multi-channel funnels, CAC reduction, and automated lead routing.",
    },
    {
      tier: "Lead Strategist & Marketing Head (5+ Yrs)",
      roles: ["Digital Marketing Director", "VP of Growth", "Agency Founder", "Independent E-Commerce Consultant"],
      skills: ["Full P&L Responsibility", "Omnichannel Growth", "Agency Team Leadership", "Enterprise Tech Stacks"],
      scope: "Designs end-to-end go-to-market strategies, manages cross-functional teams, and drives annual enterprise growth.",
    },
  ];

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <nav aria-label="Breadcrumb" className="text-xs font-mono text-neutral-500 flex items-center gap-2">
            <Link href="/" className="hover:text-brand-red">Home</Link>
            <span>/</span>
            <span className="text-neutral-900 dark:text-white font-semibold">Placement Outcomes & Support</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red-soft dark:bg-brand-red/10 text-brand-red text-xs font-mono font-semibold">
            CAREER SUPPORT & RECRUITMENT PATHWAYS
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-normal text-neutral-900 dark:text-white leading-[1.08] break-words">
            Transparent career results. <em>No inflated claims</em>.
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
            At DIDM, we uphold strict institutional integrity. We do not promise magical overnight salaries or unconditional employment guarantees. We train you with real advertising budgets, construct verified work portfolios, and coordinate dedicated placement drives across 650+ corporate hiring partners.
          </p>
        </div>

        {/* 4 Verified Institutional Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 space-y-1">
            <div className="font-serif text-3xl sm:text-4xl text-brand-red font-bold">50,000+</div>
            <div className="text-xs font-mono uppercase text-neutral-400">Total Trained Alumni</div>
            <p className="text-[11px] text-neutral-500 pt-1">Across 14 physical branches and online campus since 2014.</p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 space-y-1">
            <div className="font-serif text-3xl sm:text-4xl text-brand-red font-bold">650+</div>
            <div className="text-xs font-mono uppercase text-neutral-400">Hiring Partner Network</div>
            <p className="text-[11px] text-neutral-500 pt-1">Digital agencies, consumer brands, MNCs, and high-growth startups.</p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 space-y-1">
            <div className="font-serif text-3xl sm:text-4xl text-brand-red font-bold">100%</div>
            <div className="text-xs font-mono uppercase text-neutral-400">Placement Assistance</div>
            <p className="text-[11px] text-neutral-500 pt-1">Dedicated interview coordination until candidate secures employment.</p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 space-y-1">
            <div className="font-serif text-3xl sm:text-4xl text-brand-red font-bold">4.8 / 5</div>
            <div className="text-xs font-mono uppercase text-neutral-400">Google Review Rating</div>
            <p className="text-[11px] text-neutral-500 pt-1">Verified candidate feedback across Delhi NCR branch listings.</p>
          </div>
        </div>

        {/* SECTION 1: How the 3-Phase Placement Cell Operates */}
        <RevealOnScroll direction="up" delayMs={50}>
          <section className="space-y-8">
            <div>
              <div className="text-xs font-mono uppercase text-brand-red font-bold tracking-wider">
                Methodology
              </div>
              <h2 className="text-2xl sm:text-4xl font-normal text-neutral-900 dark:text-white mt-1">
                The DIDM Placement Cell Workflow
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 mt-1 max-w-2xl">
                How we systematically prepare every candidate to clear rigorous technical and agency interviews.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {placementPhases.map((phase) => (
                <div
                  key={phase.step}
                  className="p-8 rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 space-y-4 card-hover flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-brand-red/10 text-brand-red flex items-center justify-center font-bold text-lg font-mono">
                      {phase.step}
                    </div>
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                      {phase.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {phase.desc}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 text-[11px] text-neutral-400 font-mono">
                    Stage {phase.step} of 03
                  </div>
                </div>
              ))}
            </div>
          </section>
        </RevealOnScroll>

        {/* SECTION 2: Career Trajectories & Skill Progression */}
        <section className="p-8 sm:p-12 rounded-3xl bg-neutral-100/70 dark:bg-[#1A1A22] border border-neutral-200 dark:border-neutral-800 space-y-8">
          <div className="max-w-2xl space-y-2">
            <div className="text-xs font-mono uppercase text-brand-red font-bold tracking-wider">
              Growth Framework
            </div>
            <h2 className="text-2xl sm:text-4xl font-normal text-neutral-900 dark:text-white">
              Digital Marketing Career Trajectories
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
              Compensation and seniority vary by prior experience, portfolio strength, and recruiter evaluation. Here is how modern digital marketing careers typically progress.
            </p>
          </div>

          <div className="space-y-4">
            {careerTiers.map((tier, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-100 dark:border-neutral-800 pb-3">
                  <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
                    {tier.tier}
                  </h3>
                  <span className="text-xs font-mono font-semibold text-brand-red">
                    Typical Agency Benchmark
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs pt-1">
                  <div>
                    <span className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">Common Designations</span>
                    <ul className="space-y-1 text-neutral-700 dark:text-neutral-300">
                      {tier.roles.map((r, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-red shrink-0" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">Key Tool Competencies</span>
                    <div className="flex flex-wrap gap-1.5">
                      {tier.skills.map((s, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-[11px] font-medium text-neutral-800 dark:text-neutral-200">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-neutral-400 font-mono text-[10px] uppercase block mb-1">Core Responsibility</span>
                    <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-[11px]">
                      {tier.scope}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: Verified Hiring Partners Roster */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-mono uppercase text-brand-red font-bold tracking-wider">
                Corporate Hiring Network
              </div>
              <h2 className="text-2xl sm:text-3xl font-normal text-neutral-900 dark:text-white mt-1">
                Where DIDM Graduates Are Placed
              </h2>
            </div>
            <Link
              href="/enquire"
              className="btn-red text-xs py-2 px-4 font-bold"
            >
              Request Placement Brochure
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {SITE_BRAND.hiringPartners.map((partner, idx) => {
              const RecruiterLogo = getRecruiterLogoComponent(partner);
              return (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 text-center card-hover flex flex-col justify-between group"
                >
                  <div className="h-12 w-full rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-100 dark:border-neutral-800 flex items-center justify-center px-4 py-2 mb-2 group-hover:border-brand-red/30 transition-colors">
                    <RecruiterLogo className="h-6 w-auto max-w-[120px] object-contain transition-transform group-hover:scale-105" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-neutral-400 uppercase">Hiring Partner</div>
                    <div className="text-sm font-bold text-neutral-900 dark:text-white mt-0.5 truncate">{partner}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 4: Policy & Commitment Notice */}
        <div className="p-8 sm:p-10 rounded-3xl bg-neutral-900 text-white space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-brand-red font-bold uppercase">
            <ShieldCheck className="w-4 h-4" />
            <span>Institutional Commitment Statement</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Placement Assistance vs Guaranteed Employment
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-3xl">
            DIDM provides complete 100% placement assistance, including continuous interview scheduling, portfolio audits, and recruiter introductions for eligible candidates who complete all course assignments and project deliverables. Final hiring offers, package amounts, and employment terms are determined independently by recruiting employers based on their internal evaluation.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link href="/enquire" className="btn-red text-xs py-3 px-6 font-bold">
              Speak to a Career Counselor
            </Link>
            <a
              href={`tel:${SITE_BRAND.phoneClean}`}
              className="btn-ghost text-xs py-3 px-5 text-white border-neutral-700 hover:bg-neutral-800"
            >
              Call Helpline: {SITE_BRAND.phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

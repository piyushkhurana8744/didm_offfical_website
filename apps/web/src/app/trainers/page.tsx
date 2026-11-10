import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  GraduationCap,
  Award,
  Users,
  Briefcase,
  CheckCircle2,
  Calendar,
  Phone,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Star,
} from "lucide-react";
import teamData from "@/data/website/about-team.json";
import { SITE_BRAND } from "@/lib/content";

export const metadata: Metadata = {
  title: "Our Trainers & Digital Mentors | DIDM Faculty Directory",
  description:
    "Meet DIDM's experienced faculty, industry mentors, and department heads with 8+ to 15+ years of live agency and digital advertising execution experience.",
  alternates: {
    canonical: "https://www.didm.in/trainers",
  },
  openGraph: {
    title: "DIDM Faculty & Industry Mentors",
    description:
      "Learn from digital marketing practitioners who manage live multi-million ad accounts, execute technical SEO, and guide real agency projects.",
    url: "https://www.didm.in/trainers",
    type: "website",
  },
};

export default function TrainersPage() {
  const trainers = teamData.team_members;

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Breadcrumb & Hero */}
        <div className="max-w-3xl space-y-4">
          <nav aria-label="Breadcrumb" className="text-xs font-mono text-neutral-500 flex items-center gap-2">
            <Link href="/" className="hover:text-brand-red">Home</Link>
            <span>/</span>
            <Link href="/about" className="hover:text-brand-red">About Us</Link>
            <span>/</span>
            <span className="text-neutral-900 dark:text-white font-semibold">Faculty & Trainers</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red-soft dark:bg-brand-red/10 text-brand-red text-xs font-mono font-semibold">
            EXPERIENCED FACULTY & INDUSTRY MENTORS
          </div>

          <h1 className="text-3xl sm:text-5xl font-normal text-neutral-900 dark:text-white leading-[1.08]">
            Learn directly from <em>agency veterans</em> and technical leaders.
          </h1>

          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            At DIDM, education is not delivered by textbook theorists. Our mentors are working performance marketers, agency heads, and project leaders who manage live ad budgets, optimize real search algorithms, and guide student live client campaigns.
          </p>
        </div>

        {/* 4 Pillars of DIDM Mentorship */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-neutral-100/60 dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-red/10 text-brand-red flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-white">8+ to 15+ Years Experience</h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Every lead trainer carries substantial agency and enterprise marketing leadership pedigree.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-neutral-100/60 dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-white">Live Agency Practice</h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Mentors teach from live Meta Ads Manager dashboards and Google MCC accounts, not theoretical slides.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-neutral-100/60 dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-white">1-on-1 Doubt Clearing</h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Dedicated lab hours after every class for individual campaign debugging and code review.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-neutral-100/60 dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-white">Train-the-Trainer (ToT)</h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              All instructors undergo rigorous quarterly pedagogy audits and platform certification renewals.
            </p>
          </div>
        </div>

        {/* Faculty & Leadership Directory Grid */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-4">
            <div>
              <div className="text-xs font-mono uppercase text-brand-red font-bold">Directory</div>
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white mt-1">
                Faculty Heads, Mentors &amp; Department Leaders
              </h2>
            </div>
            <div className="text-xs text-neutral-500">
              Showing {trainers.length} Verified Institutional Profiles
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainers.map((member) => (
              <div
                key={member.id}
                className="p-6 rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 shadow-sm hover:border-brand-red/40 transition-all group flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-lg font-bold text-brand-red font-mono shrink-0 border border-neutral-200 dark:border-neutral-700">
                      {member.normalized_content.avatar_initials}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-neutral-900 dark:text-white group-hover:text-brand-red transition">
                        {member.normalized_content.name}
                      </h3>
                      <div className="text-xs font-semibold text-brand-red">
                        {member.normalized_content.role}
                      </div>
                      <div className="text-[11px] text-neutral-500 font-mono mt-0.5">
                        {member.normalized_content.department}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Key faculty guiding curriculum standardisation, live campaign supervision, and corporate placement readiness across DIDM campuses.
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs font-semibold">
                  <span className="text-neutral-500 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Verified Faculty</span>
                  </span>
                  <Link
                    href={`/enquire?p=midm`}
                    className="text-brand-red hover:underline flex items-center gap-1"
                  >
                    <span>Request Session</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Demo Booking Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-neutral-900 to-neutral-800 text-white space-y-6 relative overflow-hidden">
          <div className="max-w-2xl space-y-3 relative z-10">
            <span className="text-xs font-mono uppercase tracking-wider text-brand-red font-bold">
              Personalized Mentorship
            </span>
            <h2 className="text-2xl sm:text-4xl font-normal leading-tight">
              Attend a live mentoring class with our faculty before enrolling.
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed">
              Sit in on an ongoing batch session, talk 1-on-1 with our trainers, and experience the classroom dynamics firsthand at any of our 14 physical branches or online.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 relative z-10 pt-2">
            <Link
              href="/enquire"
              className="btn-red text-sm px-6 py-3 font-bold inline-flex items-center gap-2"
            >
              <span>Book Free Demo Class</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`tel:${SITE_BRAND.phoneClean}`}
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 transition text-sm font-semibold flex items-center gap-2 border border-white/20"
            >
              <Phone className="w-4 h-4 text-brand-red" />
              <span>Call Helpline: 88005 05151</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}


import Link from "next/link";
import Image from "next/image";
import {
  Building2,
  Users,
  Sparkles,
  Award,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Mail,
  Phone,
  GraduationCap,
  Briefcase,
  BookOpen,
  Calendar,
  Laptop,
} from "lucide-react";
import { SITE_BRAND } from "@/lib/content";
import { DIDM_MEDIA } from "@/data/didm-media";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Corporate & College Digital Marketing Training | DIDM",
  description:
    "Custom corporate marketing upskilling, university digital literacy programs, and campus hiring solutions from Delhi Institute of Digital Marketing (DIDM).",
  alternates: {
    canonical: "https://www.didm.in/organisations",
  },
  openGraph: {
    title: "Corporate & College Marketing Programs | DIDM Enterprise",
    description:
      "Empower your workforce or college students with practical performance marketing, GA4 analytics, and generative AI skills.",
    url: "https://www.didm.in/organisations",
    type: "website",
  },
};

export default function OrganisationsPage() {
  const corporateCurricula = [
    {
      title: "Performance Marketing & ROAS Scaling",
      duration: "2–4 Weeks Modular Cohort",
      focus: "Google Performance Max, Meta Advantage+ funnels, server-side CAPI tracking, CAC optimization.",
    },
    {
      title: "Generative AI for Marketing Teams",
      duration: "1–2 Weeks Intensive Bootcamp",
      focus: "Midjourney creative visual asset generation, Claude copywriting pipelines, automated Zapier workflows.",
    },
    {
      title: "Data Analytics, GA4 & Looker Studio",
      duration: "2 Weeks Deep Dive",
      focus: "Event-driven tracking setup, conversion funnel drop-off audits, custom Looker Studio executive reporting.",
    },
    {
      title: "Executive SEO & Organic Growth Strategy",
      duration: "2–3 Weeks Hands-On Workshop",
      focus: "Technical crawl optimization, entity schema architecture, content engineering for Google AI Overviews.",
    },
  ];

  const collegeOfferings = [
    {
      title: "Semester Digital Marketing Credit Course",
      audience: "BBA / B.Com / MBA / Mass Communication Students",
      desc: "Structured semester-long curriculum integrating practical live ad budgets and Google/Meta certification preparation directly into college coursework.",
    },
    {
      title: "3-Day Practical AI & Career Accelerator",
      audience: "Final Year Graduating Batches",
      desc: "Intensive 18-hour workshop covering prompt engineering, live PPC ad setup, resume optimization, and digital portfolio creation for placement drives.",
    },
    {
      title: "Faculty Development Programs (FDP)",
      audience: "University Professors & Lecturers",
      desc: "Hands-on upskilling for academic faculty on modern digital agency workflows, AI tools, and practical marketing pedagogy.",
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
            <span className="text-neutral-900 dark:text-white font-semibold">Organisations & College Training</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red-soft dark:bg-brand-red/10 text-brand-red text-xs font-mono font-semibold">
            ENTERPRISE & HIGHER EDUCATION SOLUTIONS
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-normal text-neutral-900 dark:text-white leading-[1.08] break-words">
            Empower teams and campuses with <em>practical AI capabilities</em>.
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
            DIDM designs bespoke corporate workshops, enterprise marketing transformation bootcamps, and university digital literacy partnerships backed by a decade of practical training pedagogy.
          </p>
        </div>

        {/* SECTION 1: Corporate Training */}
        <section className="space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-mono uppercase text-brand-red font-bold">
                ENTERPRISE WORKFORCE UPSKILLING
              </span>
              <h2 className="text-2xl sm:text-4xl font-normal text-neutral-900 dark:text-white leading-tight">
                Modernize your in-house marketing department.
              </h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Traditional marketing knowledge no longer delivers positive ROAS in an AI-driven bidding landscape. We train corporate marketing, sales, and product teams on real-time campaign architectures with measurable business KPIs.
              </p>
              <div className="space-y-2 pt-2 text-xs text-neutral-700 dark:text-neutral-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Customized modules tailored to your company&apos;s product and CAC goals</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Conducted by senior agency directors with multi-crore ad spend track records</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Post-training implementation support and campaign review clinics</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-[3/2] overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-100 shadow-xl dark:border-neutral-800 dark:bg-neutral-900">
                <Image
                  src={DIDM_MEDIA.corporateTraining.path}
                  alt={DIDM_MEDIA.corporateTraining.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Corporate Curricula Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {corporateCurricula.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 space-y-3 card-hover flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase text-brand-red font-bold">
                    {item.duration}
                  </span>
                  <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {item.focus}
                  </p>
                </div>
                <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800/80 text-[11px] font-semibold text-neutral-500">
                  Tailored Corporate Delivery
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 2: College & University Training */}
        <section className="space-y-10 pt-8 border-t border-neutral-200 dark:border-neutral-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="relative aspect-[3/2] overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-100 shadow-xl dark:border-neutral-800 dark:bg-neutral-900">
                <Image
                  src={DIDM_MEDIA.collegeTraining.path}
                  alt={DIDM_MEDIA.collegeTraining.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4 order-1 lg:order-2">
              <span className="text-xs font-mono uppercase text-ai dark:text-ai-dark font-bold">
                CAMPUS PARTNERSHIPS & ACADEMIC COLLABORATION
              </span>
              <h2 className="text-2xl sm:text-4xl font-normal text-neutral-900 dark:text-white leading-tight">
                Bridge the campus-to-agency placement gap.
              </h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                DIDM partners with premier universities and colleges to equip undergraduates and postgraduates with practical, job-ready digital marketing competencies before they face corporate recruiters.
              </p>
              <div className="space-y-2 pt-2 text-xs text-neutral-700 dark:text-neutral-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Curriculum aligned with current digital agency hiring requirements</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Students graduate with live portfolio campaigns and Google/Meta credentials</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Direct recruitment drives connecting campus placement cells with 650+ corporate partners</span>
                </div>
              </div>
            </div>
          </div>

          {/* College Offerings Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {collegeOfferings.map((offering, idx) => (
              <div
                key={idx}
                className="p-7 rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 space-y-3 card-hover flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-ai-soft dark:bg-ai/10 text-ai dark:text-ai-dark flex items-center justify-center">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-neutral-400 font-semibold">
                      Target Audience: {offering.audience}
                    </span>
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white mt-1">
                      {offering.title}
                    </h3>
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {offering.desc}
                  </p>
                </div>
                <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 text-[11px] font-semibold text-brand-red">
                  MOU & Campus Collaboration
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: Training Delivery Formats */}
        <section className="p-8 sm:p-12 rounded-3xl bg-neutral-100/70 dark:bg-[#1A1A22] border border-neutral-200 dark:border-neutral-800 space-y-8">
          <div className="max-w-2xl space-y-2">
            <div className="text-xs font-mono uppercase text-brand-red font-bold tracking-wider">
              Implementation Flexibility
            </div>
            <h2 className="text-2xl sm:text-4xl font-normal text-neutral-900 dark:text-white">
              Three Seamless Training Delivery Models
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500">
              We adapt our training environment to match your organization&apos;s geographic and operational requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 space-y-3">
              <div className="font-mono text-xs font-bold text-brand-red uppercase">Format 01</div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">On-Premise Corporate Campus</h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Our master instructors travel directly to your corporate headquarters or university campus to run intensive in-person classroom workshops.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 space-y-3">
              <div className="font-mono text-xs font-bold text-brand-red uppercase">Format 02</div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">Live Virtual Classroom (Two-Way)</h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Full-cohort live interactive video instruction with cloud screen sharing, real-time code/ad execution, and session archive access.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 space-y-3">
              <div className="font-mono text-xs font-bold text-brand-red uppercase">Format 03</div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">DIDM Campus Dedicated Lab</h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Reserve dedicated computer lab stations and conference rooms at any of our 14 physical branches for exclusive cohort training.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Custom Training Enquiry CTA */}
        <section className="p-8 sm:p-12 rounded-3xl bg-neutral-950 text-white space-y-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono uppercase text-brand-red font-bold tracking-wider">
              DIRECT INSTITUTIONAL DESK
            </span>
            <h2 className="text-2xl sm:text-4xl font-normal text-white">
              Plan custom training for your team or university.
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Reach our corporate and institutional partnership division directly to discuss syllabus customization, batch timelines, and MOU terms.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <a
              href={`tel:${SITE_BRAND.phoneClean}`}
              className="btn-red text-xs sm:text-sm py-3 px-6 font-bold flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call Corporate Team: {SITE_BRAND.phone}</span>
            </a>
            <a
              href={`mailto:${SITE_BRAND.email}?subject=Corporate%20Training%20Inquiry%20-%20DIDM`}
              className="btn-ghost text-xs sm:text-sm py-3 px-5 text-white border-neutral-700 hover:bg-neutral-800 flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              <span>Email: {SITE_BRAND.email}</span>
            </a>
            <Link
              href="/contact"
              className="text-xs font-semibold text-neutral-400 hover:text-white underline pt-1"
            >
              Or visit our Satya Niketan Head Office →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

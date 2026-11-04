import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles, BookOpen, Clock, Award, Layers } from "lucide-react";
import { SITE_DATA } from "@/data/site-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Digital Marketing Courses & Certifications | DIDM",
  description:
    "Explore DIDM's 4 career programs and 3 short-term skill courses. From the flagship MIDM to 1-Year DMI Diploma and Gen AI tool bootcamps.",
};

export default function ProgramsPage() {
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "DIDM Digital Marketing Programs",
    itemListElement: SITE_DATA.programs.map((p, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: p.name,
      description: p.summary,
      url: `https://www.didm.in/program?p=${p.id}`,
    })),
  };

  return (
    <div className="py-12 md:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red-soft dark:bg-brand-red/10 text-brand-red text-xs font-mono font-semibold">
            PROGRAMS DIRECTORY
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-normal text-neutral-900 dark:text-white leading-[1.1] break-words">
            Career programs engineered for <em>practical digital mastery</em>.
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Choose between comprehensive career accelerators, full 1-year agency diplomas, and
            focused executive tracks. All courses include live campaign ad spend and 100% placement support.
          </p>
        </div>

        {/* 4 Flagship Career Programs */}
        <div className="space-y-6 sm:space-y-8">
          <div className="text-xs font-mono uppercase text-brand-red font-bold tracking-wider">
            Flagship Career Certifications
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {SITE_DATA.programs.map((prog) => (
              <div
                key={prog.id}
                className="rounded-3xl p-5 sm:p-7 md:p-9 bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between card-hover relative"
              >
                {prog.badge && (
                  <span className="absolute top-5 right-5 sm:top-6 sm:right-6 text-[10px] font-mono uppercase px-2.5 sm:px-3 py-1 rounded-full bg-brand-red text-white font-bold tracking-wider">
                    {prog.badge}
                  </span>
                )}

                <div className="space-y-4 sm:space-y-5">
                  <div className="pr-16 sm:pr-0">
                    <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white">
                      {prog.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1 leading-relaxed">
                      {prog.tagline}
                    </p>
                  </div>

                  {/* Fee Bar */}
                  <div className="py-2.5 sm:py-3 px-3.5 sm:px-4 rounded-2xl bg-neutral-50 dark:bg-[#1A1A22] border border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-mono uppercase text-neutral-400">Tuition Fee</div>
                      <div className="font-serif text-xl sm:text-2xl text-neutral-900 dark:text-white font-normal">
                        {prog.fee}
                      </div>
                    </div>
                    {prog.feeInstalment && (
                      <div className="text-right text-[10px] sm:text-[11px] text-neutral-500 max-w-[130px] sm:max-w-[150px]">
                        {prog.feeInstalment}
                      </div>
                    )}
                  </div>

                  <dl className="grid grid-cols-2 gap-2.5 sm:gap-3 text-xs text-neutral-600 dark:text-neutral-300">
                    <div>
                      <dt className="text-neutral-400 font-mono text-[10px] uppercase">Duration</dt>
                      <dd className="font-semibold text-neutral-900 dark:text-white mt-0.5">{prog.duration}</dd>
                    </div>
                    <div>
                      <dt className="text-neutral-400 font-mono text-[10px] uppercase">Hours</dt>
                      <dd className="font-semibold text-neutral-900 dark:text-white mt-0.5">{prog.hours}</dd>
                    </div>
                    <div>
                      <dt className="text-neutral-400 font-mono text-[10px] uppercase">Modules</dt>
                      <dd className="font-semibold text-neutral-900 dark:text-white mt-0.5">{prog.modulesCount}</dd>
                    </div>
                    <div>
                      <dt className="text-neutral-400 font-mono text-[10px] uppercase">Internship</dt>
                      <dd className="font-semibold text-neutral-900 dark:text-white mt-0.5">{prog.internship}</dd>
                    </div>
                  </dl>

                  {/* Key Syllabus Modules Preview */}
                  <div className="space-y-1.5 pt-3 border-t border-neutral-100 dark:border-neutral-800">
                    <div className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                      Core Modules Include:
                    </div>
                    {prog.keyModules.slice(0, 4).map((m, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] sm:text-xs text-neutral-600 dark:text-neutral-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-red shrink-0" />
                        <span>{m}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-5 mt-5 sm:pt-6 sm:mt-6 border-t border-neutral-100 dark:border-neutral-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3">
                  <Link
                    href={`/program?p=${prog.id}`}
                    className="btn-ghost text-xs py-2.5 px-4 font-semibold text-center justify-center flex-1"
                  >
                    View Curriculum
                  </Link>

                  <Link
                    href={`/enquire?p=${prog.id}`}
                    className="btn-red text-xs py-2.5 px-4 font-semibold text-center justify-center flex-1"
                  >
                    Book Demo Class
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3 Short-Term Skill Courses */}
        <div className="space-y-8 pt-8 border-t border-neutral-200 dark:border-neutral-800">
          <div>
            <div className="text-xs font-mono uppercase text-brand-red font-bold tracking-wider">
              Short-Term Skill Bootcamps
            </div>
            <h2 className="text-2xl sm:text-4xl font-normal text-neutral-900 dark:text-white mt-1">
              Focused 4-week modular mastery.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SITE_DATA.shortCourses.map((sc) => (
              <div
                key={sc.id}
                className="p-6 rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between card-hover"
              >
                <div className="space-y-3">
                  <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-ai-soft dark:bg-ai-soft-dark text-ai dark:text-ai-dark font-bold">
                    {sc.duration} · {sc.hours}
                  </span>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                    {sc.title}
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {sc.description}
                  </p>

                  <div className="pt-2 text-xs text-neutral-500">
                    <strong className="text-neutral-700 dark:text-neutral-300 block mb-1">Tools Practiced:</strong>
                    {sc.tools.join(" · ")}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-neutral-100 dark:border-neutral-800">
                  <Link
                    href={`/enquire?p=${sc.id}`}
                    className="btn-ghost text-xs py-2 w-full text-center block font-semibold hover:border-brand-red"
                  >
                    Enquire About Next Batch
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How to Choose Steps */}
        <div className="p-8 sm:p-12 rounded-3xl bg-neutral-900 text-white space-y-8">
          <div className="max-w-2xl space-y-2">
            <div className="text-xs font-mono uppercase text-brand-red font-bold tracking-wider">
              Decision Guide
            </div>
            <h2 className="text-2xl sm:text-4xl font-normal text-white">
              How to choose the right program for you.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs sm:text-sm text-neutral-300">
            <div className="space-y-2">
              <div className="font-serif text-3xl text-brand-red">01</div>
              <h4 className="font-bold text-white text-base">Assess Your Timeline</h4>
              <p className="leading-relaxed">
                If you have 10-12 weeks, MIDM gives you the highest ROI. If you want full-time immersion with 3 months of agency residency, pick the 1-Year DMI.
              </p>
            </div>
            <div className="space-y-2">
              <div className="font-serif text-3xl text-brand-red">02</div>
              <h4 className="font-bold text-white text-base">Identify End Goal</h4>
              <p className="leading-relaxed">
                Job seekers need certified live campaign proof (MIDM). Business owners need customer lead funnels and agency auditing (Professional).
              </p>
            </div>
            <div className="space-y-2">
              <div className="font-serif text-3xl text-brand-red">03</div>
              <h4 className="font-bold text-white text-base">Attend a Free Demo</h4>
              <p className="leading-relaxed">
                Sit in a live class, speak with mentors, and inspect our LMS before making any financial commitment.
              </p>
            </div>
          </div>

          <div className="pt-4 flex items-center gap-4">
            <Link href="/enquire" className="btn-red text-xs py-3 px-6 font-bold">
              Schedule Free 1-on-1 Counseling Call
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


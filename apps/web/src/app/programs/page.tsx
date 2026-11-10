import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Sparkles, BookOpen, Clock, Award, Layers, ShieldCheck, Compass } from "lucide-react";
import { getAllCourses, SITE_BRAND } from "@/lib/content";
import type { Metadata } from "next";
import { COURSE_CARD_MEDIA, DIDM_MEDIA } from "@/data/didm-media";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

export const metadata: Metadata = {
  title: "All Digital Marketing Courses & Certifications | DIDM",
  description:
    "Explore DIDM's accredited digital marketing career programs: Master in Digital Marketing (MIDM), 1-Year DMI Agency Diploma, Advanced Digital Marketing, and Specialized AI Bootcamps.",
  alternates: {
    canonical: "https://www.didm.in/programs",
  },
};

export default function ProgramsPage() {
  const courses = getAllCourses();

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "DIDM Digital Marketing Programs",
    itemListElement: courses.map((c, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: c.name,
      description: c.tagline,
      url: `https://www.didm.in/programs/${c.slug}`,
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
            ACCREDITED PROGRAM DIRECTORY
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-normal text-neutral-900 dark:text-white leading-[1.1] break-words">
            Career programs engineered for <em>practical digital mastery</em>.
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Choose between comprehensive career accelerators, full 1-year agency diplomas, and focused executive tracks. All programs include live campaign budgets, tool access, and dedicated placement support.
          </p>
        </div>

        <div className="relative min-h-[220px] sm:min-h-[280px] overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-[#641f33] shadow-xl">
          <Image
            src={DIDM_MEDIA.digitalMarketingCourseBanner.path}
            alt={DIDM_MEDIA.digitalMarketingCourseBanner.alt}
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />
          <div className="relative z-10 flex min-h-[220px] sm:min-h-[280px] max-w-xl flex-col justify-end p-6 sm:p-10 text-white">
            <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-red-200">
              Original DIDM course media
            </div>
            <h2 className="mt-2 text-2xl sm:text-4xl font-normal text-white">
              Learn the systems behind modern digital growth.
            </h2>
            <p className="mt-2 text-xs sm:text-sm leading-relaxed text-neutral-200">
              Compare practical programs spanning performance marketing, SEO, analytics, automation and AI.
            </p>
          </div>
        </div>

        {/* Flagship Career Programs Grid */}
        <div className="space-y-6 sm:space-y-8">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-brand-red font-bold tracking-wider">
              Flagship Career Certifications
            </span>
            <Link
              href="/compare"
              className="text-xs font-bold text-neutral-700 dark:text-neutral-300 hover:text-brand-red flex items-center gap-1"
            >
              <span>Side-by-Side Comparison</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {courses.map((prog, idx) => (
              <RevealOnScroll key={prog.id} direction="up" delayMs={idx * 80}>
                <div
                  className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between card-hover relative group h-full"
                >
                  {prog.badge && (
                    <span className="absolute top-5 right-5 sm:top-6 sm:right-6 text-[10px] font-mono uppercase px-2.5 sm:px-3 py-1 rounded-full bg-brand-red text-white font-bold tracking-wider">
                      {prog.badge}
                    </span>
                  )}

                  <div className="space-y-4 sm:space-y-5">
                    {COURSE_CARD_MEDIA[prog.slug] && (
                      <div className="relative overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-900 aspect-[5/4]">
                        <Image
                          src={COURSE_CARD_MEDIA[prog.slug]!.path}
                          alt={COURSE_CARD_MEDIA[prog.slug]!.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="pr-16 sm:pr-0">
                      <span className="text-xs font-mono uppercase text-neutral-400 font-semibold">
                        {prog.format} · {prog.internship}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white mt-1 group-hover:text-brand-red transition">
                        <Link href={`/programs/${prog.slug}`}>
                          {prog.name}
                        </Link>
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1 leading-relaxed">
                        {prog.tagline}
                      </p>
                    </div>

                    {/* Highlights Bar */}
                    <div className="py-3 px-4 rounded-2xl bg-neutral-50 dark:bg-[#1A1A22] border border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] font-mono uppercase text-neutral-400">Duration</div>
                        <div className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
                          {prog.duration}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] font-mono uppercase text-neutral-400">Instruction Hours</div>
                        <div className="text-base sm:text-lg font-bold text-brand-red">
                          {prog.hours}
                        </div>
                      </div>
                    </div>

                    {/* Program Features / Tools */}
                    <div className="space-y-2 pt-2">
                      <div className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                        Core Modules & Agency Tools:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-neutral-600 dark:text-neutral-400">
                        {prog.features.slice(0, 4).map((f, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span className="truncate">{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Practical Project Notice */}
                    {prog.syllabus.length > 0 && (
                      <div className="text-[11px] font-mono text-neutral-500 bg-neutral-100/60 dark:bg-neutral-800/60 px-3 py-1.5 rounded-xl">
                        Live Exposure: {prog.syllabus[0]?.practicalProject}
                      </div>
                    )}
                  </div>

                  <div className="pt-6 mt-6 border-t border-neutral-100 dark:border-neutral-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <Link
                      href={`/programs/${prog.slug}#course-roadmap`}
                      className="btn-secondary text-xs py-2.5 px-4 font-bold text-center justify-center flex-1 flex items-center gap-1.5 border border-neutral-300 dark:border-neutral-700 hover:border-brand-red"
                    >
                      <Compass className="w-3.5 h-3.5 text-brand-red" />
                      <span>Explore Roadmap</span>
                    </Link>

                    <Link
                      href={`/enquire?p=${prog.id}`}
                      className="btn-red text-xs py-2.5 px-4 font-semibold text-center justify-center flex-1"
                    >
                      Book Demo Class
                    </Link>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>

        {/* Decision Guide Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-neutral-900 text-white space-y-8">
          <div className="max-w-2xl space-y-2">
            <div className="text-xs font-mono uppercase text-brand-red font-bold tracking-wider">
              Counseling Matrix
            </div>
            <h2 className="text-2xl sm:text-4xl font-normal text-white">
              Unsure which syllabus fits your career timeline?
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Our academic counselors assess your current background (student, job-seeker, entrepreneur, or working professional) and align you with the right cohort.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs sm:text-sm text-neutral-300">
            <div className="space-y-2 p-4 rounded-2xl bg-neutral-800/60 border border-neutral-700/60">
              <div className="font-mono text-xs text-brand-red font-bold uppercase">Fresh Graduates</div>
              <h4 className="font-bold text-white text-sm">Master in Digital Marketing (MIDM)</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Career-focused learning with practical exercises, mock interviews, and placement support.
              </p>
            </div>
            <div className="space-y-2 p-4 rounded-2xl bg-neutral-800/60 border border-neutral-700/60">
              <div className="font-mono text-xs text-brand-red font-bold uppercase">Deep Agency Career</div>
              <h4 className="font-bold text-white text-sm">1-Year Diploma in Digital Marketing</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Full-stack digital residency with 3 months embedded in an agency environment.
              </p>
            </div>
            <div className="space-y-2 p-4 rounded-2xl bg-neutral-800/60 border border-neutral-700/60">
              <div className="font-mono text-xs text-brand-red font-bold uppercase">Entrepreneurs</div>
              <h4 className="font-bold text-white text-sm">Customized Professional Track</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Focus on customer acquisition funnels, ROI measurement, agency auditing, and AI tools.
              </p>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link href="/enquire" className="btn-red text-xs py-3 px-6 font-bold">
              Schedule Free 1-on-1 Counseling Call
            </Link>
            <a
              href={`tel:${SITE_BRAND.phoneClean}`}
              className="btn-ghost text-xs py-3 px-5 text-white border-neutral-700 hover:bg-neutral-800"
            >
              Call Central Desk: {SITE_BRAND.phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

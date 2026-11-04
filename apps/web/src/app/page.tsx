import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles, Building2, Users, Award, ShieldCheck, MapPin, Calendar, BookOpen, Download, Phone } from "lucide-react";
import { Advisor } from "@/components/Advisor";
import { CareerTabs } from "@/components/CareerTabs";
import { FAQSection } from "@/components/FAQSection";
import { SITE_DATA } from "@/data/site-data";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Aurora Ambient Hero Glow */}
      <div className="aurora-glow" />

      {/* 1. Hero Section */}
      <section className="relative pt-6 sm:pt-12 pb-12 sm:pb-20 md:pt-16 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Heading, Subhead, Verified Stats */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-red-soft dark:bg-brand-red/10 border border-brand-red/20 text-brand-red text-[11px] sm:text-xs font-mono font-semibold">
                <span className="w-2 h-2 rounded-full bg-brand-red animate-ping" />
                <span className="truncate">ADMISSIONS OPEN FOR 2026–2027 COHORTS</span>
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-normal tracking-tight text-neutral-900 dark:text-white leading-[1.1] sm:leading-[1.05] break-words">
                Master modern marketing with <em>practical AI skills</em> & guaranteed careers.
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-neutral-600 dark:text-neutral-300 max-w-xl leading-relaxed">
                Delhi Institute of Digital Marketing (DIDM) blends high-impact performance marketing,
                SEO, and enterprise AI workflows with live ad budgets and 650+ placement partners.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-1 sm:pt-2">
                <Link href="/enquire" className="btn-red py-3 sm:py-3.5 px-6 text-xs sm:text-sm font-bold text-center justify-center">
                  Book a Free Demo Class <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
                <Link href="/programs" className="btn-ghost py-3 sm:py-3.5 px-6 text-xs sm:text-sm font-semibold text-center justify-center">
                  Explore All Programs
                </Link>
              </div>

              {/* Verified Trust Strip */}
              <div className="pt-4 sm:pt-6 border-t border-neutral-200/80 dark:border-neutral-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {SITE_DATA.brand.stats.map((s, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="font-serif text-2xl sm:text-3xl font-normal text-neutral-900 dark:text-white">
                      {s.value}
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-neutral-500 uppercase font-mono tracking-tight">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Interactive Course Advisor */}
            <div className="lg:col-span-5 w-full">
              <Advisor />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Three Free Entry Points */}
      <section className="py-8 bg-neutral-100/70 dark:bg-[#131319]/50 border-y border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/enquire"
              className="p-5 rounded-2xl bg-white dark:bg-[#1A1A22] border border-neutral-200 dark:border-neutral-800 flex items-center justify-between group hover:border-brand-red transition"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-brand-red/10 text-brand-red flex items-center justify-center">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase text-neutral-400">Step 01</div>
                  <div className="text-sm font-bold text-neutral-900 dark:text-white group-hover:text-brand-red transition">
                    Attend a Free Demo Session
                  </div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-brand-red group-hover:translate-x-1 transition" />
            </Link>

            <Link
              href="/program?p=midm"
              className="p-5 rounded-2xl bg-white dark:bg-[#1A1A22] border border-neutral-200 dark:border-neutral-800 flex items-center justify-between group hover:border-brand-red transition"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-ai/10 text-ai flex items-center justify-center">
                  <Download className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase text-neutral-400">Step 02</div>
                  <div className="text-sm font-bold text-neutral-900 dark:text-white group-hover:text-brand-red transition">
                    Download 50-Module Syllabus
                  </div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-brand-red group-hover:translate-x-1 transition" />
            </Link>

            <Link
              href="/centres"
              className="p-5 rounded-2xl bg-white dark:bg-[#1A1A22] border border-neutral-200 dark:border-neutral-800 flex items-center justify-between group hover:border-brand-red transition"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase text-neutral-400">Step 03</div>
                  <div className="text-sm font-bold text-neutral-900 dark:text-white group-hover:text-brand-red transition">
                    Locate Your Nearest Centre
                  </div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-brand-red group-hover:translate-x-1 transition" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Flagship Programs Section */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <div className="text-xs font-mono uppercase text-brand-red font-bold tracking-wider">
                Industry-Accredited Curriculum
              </div>
              <h2 className="text-3xl sm:text-5xl font-normal text-neutral-900 dark:text-white mt-1.5 leading-tight">
                Career courses built for the <em>AI-first marketing era</em>.
              </h2>
            </div>
            <Link
              href="/compare"
              className="link-arrow text-sm font-semibold text-brand-red hover:underline flex items-center gap-1 shrink-0"
            >
              <span>Compare all courses side-by-side</span>
              <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {SITE_DATA.programs.map((prog) => (
              <div
                key={prog.id}
                className={`rounded-3xl p-5 sm:p-7 md:p-9 bg-white dark:bg-[#131319] border flex flex-col justify-between card-hover relative ${
                  prog.popular
                    ? "border-brand-red shadow-lg ring-1 ring-brand-red/20"
                    : "border-neutral-200 dark:border-neutral-800"
                }`}
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

                  {/* Price Block */}
                  <div className="py-2.5 sm:py-3 px-3.5 sm:px-4 rounded-2xl bg-neutral-50 dark:bg-[#1A1A22] border border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-mono uppercase text-neutral-400">Tuition Fee</div>
                      <div className="font-serif text-xl sm:text-2xl md:text-3xl text-neutral-900 dark:text-white font-normal">
                        {prog.fee}
                      </div>
                    </div>
                    {prog.feeInstalment && (
                      <div className="text-right text-[10px] sm:text-[11px] text-neutral-500 max-w-[130px] sm:max-w-[140px]">
                        {prog.feeInstalment}
                      </div>
                    )}
                  </div>

                  {/* Key facts list */}
                  <dl className="grid grid-cols-2 gap-2.5 sm:gap-3 text-xs text-neutral-600 dark:text-neutral-300">
                    <div>
                      <dt className="text-neutral-400 font-mono text-[10px] uppercase">Duration</dt>
                      <dd className="font-semibold text-neutral-900 dark:text-white mt-0.5">{prog.duration}</dd>
                    </div>
                    <div>
                      <dt className="text-neutral-400 font-mono text-[10px] uppercase">Practical Hours</dt>
                      <dd className="font-semibold text-neutral-900 dark:text-white mt-0.5">{prog.hours}</dd>
                    </div>
                    <div>
                      <dt className="text-neutral-400 font-mono text-[10px] uppercase">Modules & Depth</dt>
                      <dd className="font-semibold text-neutral-900 dark:text-white mt-0.5">{prog.modulesCount}</dd>
                    </div>
                    <div>
                      <dt className="text-neutral-400 font-mono text-[10px] uppercase">Internship</dt>
                      <dd className="font-semibold text-neutral-900 dark:text-white mt-0.5">{prog.internship}</dd>
                    </div>
                  </dl>

                  {/* Highlights */}
                  <div className="space-y-1.5 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                    {prog.features.slice(0, 3).map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] sm:text-xs text-neutral-700 dark:text-neutral-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-red shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Card Actions */}
                <div className="pt-5 mt-5 sm:pt-6 sm:mt-6 border-t border-neutral-100 dark:border-neutral-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3">
                  <Link
                    href={`/program?p=${prog.id}`}
                    className="btn-ghost text-xs py-2.5 px-4 font-semibold text-center justify-center flex-1"
                  >
                    View Full Details
                  </Link>

                  <Link
                    href={`/enquire?p=${prog.id}`}
                    className="btn-red text-xs py-2.5 px-4 font-semibold text-center justify-center flex-1"
                  >
                    Get Free Demo
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Career Pathways Tabs */}
      <section className="py-16 md:py-24 bg-neutral-100/60 dark:bg-[#131319]/40 border-y border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <div className="text-xs font-mono uppercase text-brand-red font-bold tracking-wider">
              Tailored Career Outcomes
            </div>
            <h2 className="text-3xl sm:text-5xl font-normal text-neutral-900 dark:text-white mt-1.5 leading-tight">
              Where do you stand? <em>Choose your pathway</em>.
            </h2>
          </div>

          <CareerTabs />
        </div>
      </section>

      {/* 5. How Learning Works at DIDM */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-xs font-mono uppercase text-brand-red font-bold tracking-wider">
              Practical Methodology
            </div>
            <h2 className="text-3xl sm:text-5xl font-normal text-neutral-900 dark:text-white mt-2 leading-tight">
              No theoretical lectures. <em>Real campaign execution</em>.
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-3">
              We train you exactly like a high-growth marketing agency does on day one.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                num: "01",
                title: "Live Ad Budgets",
                desc: "Don't just watch videos. Every student manages live Google and Meta ad spend to learn bidding, CAC, and conversion tracking.",
              },
              {
                num: "02",
                title: "40+ Paid Agency Tools",
                desc: "Get certified access to Semrush, Ahrefs, Canva Pro, Screaming Frog, SpyFu, and modern AI automation platforms.",
              },
              {
                num: "03",
                title: "2-Month Internship",
                desc: "Work on live client deliverables under senior digital marketing directors before facing job interviews.",
              },
              {
                num: "04",
                title: "Guaranteed Placement Drives",
                desc: "Resume optimization, portfolio building, and direct campus recruitment rounds with 650+ partner companies.",
              },
            ].map((step) => (
              <div
                key={step.num}
                className="p-6 rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 space-y-3 relative group hover:border-brand-red transition"
              >
                <div className="font-serif text-4xl text-brand-red/80 font-normal">
                  {step.num}
                </div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Hiring Partners */}
      <section className="py-12 bg-white dark:bg-[#131319] border-y border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-semibold">
            Our Alumni Work At Top Global Agencies & Tech Enterprises
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 opacity-75">
            {SITE_DATA.hiringPartners.map((brand, i) => (
              <span
                key={i}
                className="text-xs sm:text-sm font-bold tracking-tight text-neutral-600 dark:text-neutral-400 font-mono"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Student Success Stories */}
      <section className="py-20 md:py-28 bg-neutral-100/50 dark:bg-[#131319]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <div className="text-xs font-mono uppercase text-brand-red font-bold tracking-wider">
                Proven Trajectories
              </div>
              <h2 className="text-3xl sm:text-5xl font-normal text-neutral-900 dark:text-white mt-1.5 leading-tight">
                Real learners. <em>Verified career transitions</em>.
              </h2>
            </div>
            <Link
              href="/stories"
              className="link-arrow text-sm font-semibold text-brand-red hover:underline flex items-center gap-1 shrink-0"
            >
              <span>Read all 50+ student stories</span>
              <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SITE_DATA.stories.slice(0, 3).map((story) => (
              <div
                key={story.id}
                className="p-7 rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between card-hover"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-brand-red font-bold uppercase">
                      {story.category}
                    </span>
                    <span className="text-neutral-400">{story.center}</span>
                  </div>
                  <blockquote className="text-sm font-medium text-neutral-800 dark:text-neutral-200 italic leading-relaxed">
                    &ldquo;{story.quote}&rdquo;
                  </blockquote>
                </div>

                <div className="pt-6 mt-6 border-t border-neutral-100 dark:border-neutral-800">
                  <div className="font-bold text-sm text-neutral-900 dark:text-white">
                    {story.name}
                  </div>
                  <div className="text-xs text-neutral-500 mt-0.5">
                    {story.role} · <strong className="text-neutral-700 dark:text-neutral-300">{story.company}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. DIDM at a Glance (Real <dl> fact block for SEO & AI Answer Engines) */}
      <section className="py-16 bg-white dark:bg-[#131319] border-t border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs font-mono uppercase text-brand-red font-bold tracking-wider mb-2">
            Institutional Factsheet
          </div>
          <h2 className="text-2xl sm:text-3xl font-normal text-neutral-900 dark:text-white mb-6">
            DIDM at a glance.
          </h2>

          <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 bg-neutral-50/70 dark:bg-[#1A1A22]/50">
            <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs sm:text-sm">
              <div className="space-y-1">
                <dt className="text-neutral-400 font-mono text-[10px] uppercase">Founded & Track Record</dt>
                <dd className="font-bold text-neutral-900 dark:text-white">10+ Years of Excellence (Est. 2014)</dd>
              </div>
              <div className="space-y-1">
                <dt className="text-neutral-400 font-mono text-[10px] uppercase">Benchmark Course</dt>
                <dd className="font-bold text-neutral-900 dark:text-white">MIDM (₹68,661 · 500+ Hours)</dd>
              </div>
              <div className="space-y-1">
                <dt className="text-neutral-400 font-mono text-[10px] uppercase">Flagship 1-Yr Diploma</dt>
                <dd className="font-bold text-neutral-900 dark:text-white">DMI (₹1,67,518 · 6 Growth Phases)</dd>
              </div>
              <div className="space-y-1">
                <dt className="text-neutral-400 font-mono text-[10px] uppercase">Toll-Free Helpline</dt>
                <dd className="font-bold text-brand-red">+91 88005 05151</dd>
              </div>
              <div className="space-y-1">
                <dt className="text-neutral-400 font-mono text-[10px] uppercase">Physical Learning Centres</dt>
                <dd className="font-bold text-neutral-900 dark:text-white">13 Centres in Delhi NCR & North India</dd>
              </div>
              <div className="space-y-1">
                <dt className="text-neutral-400 font-mono text-[10px] uppercase">Hiring Network</dt>
                <dd className="font-bold text-neutral-900 dark:text-white">650+ Verified Agency & Corporate Partners</dd>
              </div>
              <div className="space-y-1">
                <dt className="text-neutral-400 font-mono text-[10px] uppercase">Certifications Provided</dt>
                <dd className="font-bold text-neutral-900 dark:text-white">Google, Meta, HubSpot & DIDM Diploma</dd>
              </div>
              <div className="space-y-1">
                <dt className="text-neutral-400 font-mono text-[10px] uppercase">Corporate Accreditations</dt>
                <dd className="font-bold text-neutral-900 dark:text-white">ASSOCHAM, WASME & ISO 9001:2015</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* 9. FAQs Section */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-2">
            <div className="text-xs font-mono uppercase text-brand-red font-bold tracking-wider">
              Answers to Common Questions
            </div>
            <h2 className="text-3xl sm:text-4xl font-normal text-neutral-900 dark:text-white">
              Everything you need to know before joining.
            </h2>
          </div>

          <FAQSection faqs={SITE_DATA.faqs} />
        </div>
      </section>

      {/* 10. Final CTA Band */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-neutral-900 dark:bg-[#131319] text-white p-8 sm:p-14 relative overflow-hidden shadow-2xl border border-neutral-800">
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red/20 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-2xl space-y-6 relative z-10">
              <span className="text-xs font-mono uppercase px-3 py-1 rounded-full bg-brand-red text-white font-bold">
                Join The Next Batch
              </span>
              <h2 className="text-3xl sm:text-5xl font-normal text-white leading-tight">
                Ready to accelerate your career into <em>digital & AI marketing</em>?
              </h2>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                Book a free 1-on-1 counseling session at your nearest centre or online. Inspect live ad
                budgets, review alumni placements, and receive personalized course guidance.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link href="/enquire" className="btn-red py-3.5 px-6 text-sm font-bold">
                  Book Free Demo Session <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={`tel:${SITE_DATA.brand.phoneClean}`}
                  className="btn-ghost text-white border-neutral-700 hover:border-white py-3.5 px-6 text-sm font-semibold flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-brand-red" />
                  <span>Call: 88005 05151</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


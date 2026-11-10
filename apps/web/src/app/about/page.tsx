import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  Building2,
  MapPin,
  Phone,
  Mail,
  Users,
  Clock,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Laptop,
  Layers,
  HeartHandshake,
  Calendar,
  Briefcase,
  HelpCircle,
  Video,
  BookOpen,
  TrendingUp,
} from "lucide-react";
import { SITE_BRAND, getAllCentres, getAllCourses } from "@/lib/content";
import { DIDM_MEDIA } from "@/data/didm-media";
import {
  getAboutUsData,
  getAboutTeam,
  getAboutFaqs,
  getAboutAchievements,
} from "@/lib/website";
import {
  PillarsTabViewer,
  TeamGallery,
  AboutFaqAccordion,
  TimelineJourneyViewer,
} from "@/components/about/AboutInteractiveStudio";
import { EnquiryForm } from "@/components/EnquiryForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About DIDM | India's Leading Digital Marketing Institute (10+ Years)",
  description:
    "Explore Delhi Institute of Digital Marketing (DIDM). Established in 2014, over 70,000+ alumni, 14 physical campuses across India, accredited by ASSOCHAM and ISO 9001:2015 certified.",
  alternates: {
    canonical: "https://www.didm.in/about",
  },
  openGraph: {
    title: "About DIDM | A Decade of Excellence in Digital Marketing Education",
    description:
      "From classroom training to AI-driven performance marketing: discover DIDM's 10-year legacy, 650+ corporate tie-ups, and live agency mentorship with Online Strikers.",
    url: "https://www.didm.in/about",
    type: "website",
  },
};

export default function AboutPage() {
  const aboutData = getAboutUsData();
  const team = getAboutTeam();
  const faqs = getAboutFaqs();
  const achievements = getAboutAchievements();
  const centres = getAllCentres();

  const aboutJsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: SITE_BRAND.fullName,
    alternateName: SITE_BRAND.name,
    url: "https://www.didm.in",
    logo: `https://www.didm.in${DIDM_MEDIA.officialLogo.path}`,
    foundingDate: "2014",
    description: aboutData.decade_of_excellence.summary,
    telephone: SITE_BRAND.phone,
    email: SITE_BRAND.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: aboutData.head_office.address,
      addressCountry: "IN",
    },
    hasCredential: achievements.institutional_recognitions.map((r) => r.award),
    member: team.map((m) => ({
      "@type": "Person",
      name: m.name,
      jobTitle: m.role,
      worksFor: {
        "@type": "EducationalOrganization",
        name: SITE_BRAND.fullName,
      },
    })),
  };

  return (
    <div className="py-12 md:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        {/* ========================================================= */}
        {/* SECTION 1: HERO & INSTITUTIONAL OVERVIEW                   */}
        {/* ========================================================= */}
        <section className="space-y-8" aria-label="Institute Overview">
          <div className="max-w-3xl space-y-4">
            <nav aria-label="Breadcrumb" className="text-xs font-mono text-neutral-500 flex items-center gap-2">
              <Link href="/" className="hover:text-brand-red transition-colors">Home</Link>
              <span>/</span>
              <span className="text-neutral-900 dark:text-white font-semibold">About DIDM</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-red-soft dark:bg-brand-red/10 text-brand-red text-xs font-mono font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ESTABLISHED IN 2014 · 10+ YEARS OF EXCELLENCE</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-normal text-neutral-900 dark:text-white leading-[1.08] break-words">
              Educating India&apos;s next generation of <em>growth architects</em>.
            </h1>

            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
              {aboutData.decade_of_excellence.summary}
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 shadow-sm">
              <div className="text-2xl sm:text-3xl font-bold text-brand-red">10+</div>
              <div className="text-xs text-neutral-500 font-medium mt-1">Years of Legacy (Since 2014)</div>
            </div>
            <div className="p-5 rounded-2xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 shadow-sm">
              <div className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">70,000+</div>
              <div className="text-xs text-neutral-500 font-medium mt-1">Careers Shaped & Alumni</div>
            </div>
            <div className="p-5 rounded-2xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 shadow-sm">
              <div className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">14</div>
              <div className="text-xs text-neutral-500 font-medium mt-1">Campuses Across India</div>
            </div>
            <div className="p-5 rounded-2xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 shadow-sm">
              <div className="text-2xl sm:text-3xl font-bold text-brand-red">650+</div>
              <div className="text-xs text-neutral-500 font-medium mt-1">Placement Partner Tie-Ups</div>
            </div>
            <div className="p-5 rounded-2xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 shadow-sm col-span-2 sm:col-span-1">
              <div className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">52</div>
              <div className="text-xs text-neutral-500 font-medium mt-1">Master Curriculum Stops</div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 2: OUR STORY & CORPORATE TRIAD                     */}
        {/* ========================================================= */}
        <section className="space-y-12" aria-label="Our Story and Corporate Ecosystem">
          {/* Authentic Visual Banner */}
          <div className="relative aspect-[1796/400] sm:aspect-[1796/320] overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 shadow-xl">
            <Image
              src={DIDM_MEDIA.mediaNews.path}
              alt={DIDM_MEDIA.mediaNews.alt}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent flex items-end p-6 sm:p-10">
              <div className="max-w-2xl text-white space-y-2">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-brand-red-light bg-black/60 px-3 py-1 rounded-full backdrop-blur-md">
                  Institutional Heritage
                </span>
                <h2 className="text-xl sm:text-3xl font-bold leading-tight">
                  {aboutData.headline}
                </h2>
                <p className="text-xs sm:text-sm text-neutral-300">
                  {aboutData.decade_of_excellence.callout}
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Verified Timeline */}
          {aboutData.timeline_milestones && aboutData.timeline_milestones.length > 0 && (
            <div className="space-y-6">
              <div className="max-w-2xl space-y-2">
                <div className="text-xs font-mono uppercase text-brand-red font-bold tracking-wider">
                  Historical Progression
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
                  Evolution of an Educational Pioneer
                </h3>
                <p className="text-xs sm:text-sm text-neutral-500">
                  Tracing DIDM&apos;s journey from foundational classrooms to an integrated national digital network.
                </p>
              </div>
              <TimelineJourneyViewer milestones={aboutData.timeline_milestones} />
            </div>
          )}

          {/* Corporate Ecosystem: 3 Sister Brands */}
          <div className="p-8 sm:p-10 rounded-3xl bg-neutral-50 dark:bg-[#111116] border border-neutral-200 dark:border-neutral-800 space-y-6">
            <div className="max-w-2xl space-y-2">
              <div className="text-xs font-mono uppercase text-brand-red font-bold tracking-wider">
                Integrated Corporate Ecosystem
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
                Three Distinct Brands Under One Parent Company
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                DIDM operates within a comprehensive marketing ecosystem providing students immediate bridge from classroom to agency operations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {achievements.corporate_ecosystem.brands.map((brand, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white dark:bg-[#16161D] border border-neutral-200 dark:border-neutral-800 space-y-3 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-lg bg-brand-red/10 text-brand-red font-mono font-bold text-xs flex items-center justify-center">
                      0{idx + 1}
                    </span>
                    <span className="text-[11px] font-mono text-neutral-400">{brand.domain}</span>
                  </div>
                  <h4 className="text-lg font-bold text-neutral-900 dark:text-white">{brand.name}</h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {brand.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 3: CORE PILLARS (MISSION, VISION, VALUES)          */}
        {/* ========================================================= */}
        <section className="space-y-8" aria-label="Institutional Foundation">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="text-xs font-mono uppercase text-brand-red font-bold tracking-wider">
              Guiding Principles
            </div>
            <h2 className="text-3xl sm:text-4xl font-normal text-neutral-900 dark:text-white">
              Mission, Vision & Core Values
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500">
              The foundational ethos that guides every curriculum update, campus launch, and mentor interaction at DIDM.
            </p>
          </div>

          <PillarsTabViewer pillars={aboutData.core_pillars} />
        </section>

        {/* ========================================================= */}
        {/* SECTION 4: MEET THE VISIONARIES (TEAM GALLERY)             */}
        {/* ========================================================= */}
        <section id="team" className="space-y-8" aria-label="Leadership and Faculty">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="text-xs font-mono uppercase text-brand-red font-bold tracking-wider">
                Leadership & Academic Faculty
              </div>
              <h2 className="text-3xl sm:text-4xl font-normal text-neutral-900 dark:text-white">
                Meet the Visionaries Behind DIDM
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 max-w-xl">
                The experienced department directors, operational heads, and training coordinators driving academic excellence across India.
              </p>
            </div>
            <div className="text-xs font-mono text-neutral-400">
              {team.length} Core Department Leads
            </div>
          </div>

          <TeamGallery team={team} />
        </section>

        {/* ========================================================= */}
        {/* SECTION 5: PRACTICAL PEDAGOGY & METHODOLOGY                */}
        {/* ========================================================= */}
        <section className="space-y-8" aria-label="Training Methodology">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="text-xs font-mono uppercase text-brand-red font-bold tracking-wider">
              Academic Excellence
            </div>
            <h2 className="text-3xl sm:text-4xl font-normal text-neutral-900 dark:text-white">
              {aboutData.pedagogy_and_methodology.title}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500">
              Engineered to replace passive theory with real agency drills, budget allocations, and conversion optimization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aboutData.pedagogy_and_methodology.features.map((item, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 space-y-3 shadow-sm hover:border-brand-red/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-red/10 text-brand-red flex items-center justify-center font-mono font-bold text-sm">
                  0{idx + 1}
                </div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 6: AWARDS & INSTITUTIONAL ACCREDITATIONS           */}
        {/* ========================================================= */}
        <section id="achievements" className="p-8 sm:p-12 rounded-3xl bg-neutral-100/70 dark:bg-[#14141B] border border-neutral-200 dark:border-neutral-800 space-y-8" aria-label="Accreditations and Honors">
          <div className="max-w-2xl space-y-2">
            <div className="text-xs font-mono uppercase text-brand-red font-bold tracking-wider">
              Accreditations & Honors
            </div>
            <h2 className="text-2xl sm:text-4xl font-normal text-neutral-900 dark:text-white">
              Recognized by Premier Industry & Government Bodies
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
              External validations affirming our rigorous academic standards, verified corporate placement record, and operational integrity.
            </p>
          </div>

          {/* 2024 Achievement Highlight Banner */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#181822] border border-brand-red/20 space-y-3">
            <div className="flex items-center gap-2 text-brand-red text-xs font-mono font-bold">
              <Sparkles className="w-4 h-4" />
              <span>{achievements.year_2024.title}</span>
            </div>
            <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              {achievements.year_2024.description}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 pt-2">
              {achievements.year_2024.milestones.map((m, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-red flex-shrink-0" />
                  <span>{m}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Grid of Formal Accreditations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.institutional_recognitions.map((award, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-[#181822] border border-neutral-200 dark:border-neutral-800 space-y-3"
              >
                <Award className="w-8 h-8 text-brand-red" />
                <div>
                  <h4 className="font-bold text-sm text-neutral-900 dark:text-white">{award.award}</h4>
                  <p className="text-[11px] font-mono text-brand-red mt-0.5">{award.awarding_body}</p>
                </div>
                <p className="text-xs text-neutral-500 leading-relaxed">{award.description}</p>
              </div>
            ))}
          </div>

          {/* Media & Training Collaboration */}
          <div className="p-6 rounded-2xl bg-brand-red/5 dark:bg-brand-red/10 border border-brand-red/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase font-bold text-brand-red">
                Exclusive Media & Training Collaboration
              </span>
              <h4 className="font-bold text-base text-neutral-900 dark:text-white">
                ISOMES | NEWS24 Media Partnership & National Awards Hub
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 max-w-2xl">
                DIDM collaborates with ISOMES | News 24 as a media and training partner. Explore our full archive of ministerial awards, 3x ASSOCHAM honors, and national press coverage.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Link
                href="/media-coverage"
                className="btn-red text-xs py-2.5 px-4 font-semibold whitespace-nowrap inline-flex items-center gap-1.5"
              >
                <span>View All Awards & Press</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 7: PLACEMENT & CAREER SUPPORT ECOSYSTEM            */}
        {/* ========================================================= */}
        <section className="space-y-8" aria-label="Placement and Career Cell">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div className="text-xs font-mono uppercase text-brand-red font-bold tracking-wider">
                Career Enablement
              </div>
              <h2 className="text-3xl sm:text-4xl font-normal text-neutral-900 dark:text-white">
                {aboutData.career_and_placement.title}
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
                DIDM maintains an active placement cell bridging students with over {aboutData.career_and_placement.placement_partners_count} IT, MNC, and digital agency partners. Our dedicated mentors conduct individualized resume grooming, simulated hiring drives, and freelance onboarding.
              </p>

              <div className="space-y-2.5 pt-2">
                {aboutData.career_and_placement.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
                    <CheckCircle2 className="w-4 h-4 text-brand-red flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-xl bg-neutral-100 dark:bg-neutral-900">
                <Image
                  src={DIDM_MEDIA.corporateTraining.path}
                  alt={DIDM_MEDIA.corporateTraining.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white space-y-1">
                    <div className="text-xs font-mono text-brand-red-light font-bold">CORPORATE HIRING & UPSKILLING SESSIONS</div>
                    <p className="text-xs text-neutral-300">Live enterprise executive training and campus recruitment partner sessions conducted across DIDM centres.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 8: STUDENT RESOURCES & LMS ECOSYSTEM               */}
        {/* ========================================================= */}
        <section className="p-8 sm:p-12 rounded-3xl bg-neutral-900 text-white space-y-8" aria-label="Student Learning Resources">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-mono uppercase text-brand-red-light font-bold tracking-wider">
              Continuous Learning Tools
            </div>
            <h2 className="text-3xl sm:text-4xl font-normal text-white">
              {aboutData.student_resources.title}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              {aboutData.student_resources.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {aboutData.student_resources.items.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-neutral-800/80 border border-neutral-700/80 space-y-2"
              >
                <BookOpen className="w-5 h-5 text-brand-red-light" />
                <h4 className="text-xs sm:text-sm font-bold text-white">{item}</h4>
                <div className="text-[10px] font-mono text-neutral-400">Included in Enrolment</div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 9: AUTHENTIC INSTITUTIONAL FAQS                    */}
        {/* ========================================================= */}
        <section id="faqs" className="space-y-8" aria-label="Frequently Asked Questions">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="text-xs font-mono uppercase text-brand-red font-bold tracking-wider">
              Transparency First
            </div>
            <h2 className="text-3xl sm:text-4xl font-normal text-neutral-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500">
              Authentic answers on missed class policies, doubt clearing sessions, salary expectations, and offshore opportunities.
            </p>
          </div>

          <AboutFaqAccordion faqs={faqs} />
        </section>

        {/* ========================================================= */}
        {/* SECTION 10: REAL ENQUIRY & HEADQUARTERS DIRECTORY          */}
        {/* ========================================================= */}
        <section className="space-y-12" aria-label="Admissions and Headquarters Contact">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Headquarters, Hours & Centers Directory */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-8 rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-6">
                <div className="space-y-2">
                  <div className="text-xs font-mono uppercase text-brand-red font-bold">
                    Central Institutional Headquarters
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                    {aboutData.institute_name} ({aboutData.acronym})
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {aboutData.head_office.address}
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-neutral-100 dark:border-neutral-800 text-xs">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-brand-red flex-shrink-0" />
                    <span className="font-semibold text-neutral-900 dark:text-white">{aboutData.head_office.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-brand-red flex-shrink-0" />
                    <span className="text-neutral-600 dark:text-neutral-400">{aboutData.head_office.email}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-brand-red flex-shrink-0 mt-0.5" />
                    <div className="text-neutral-600 dark:text-neutral-400">
                      <div>{aboutData.business_hours.weekdays}</div>
                      <div>{aboutData.business_hours.weekends}</div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 space-y-3">
                  <div className="text-xs font-mono uppercase text-neutral-400 font-bold">
                    14 Regional Training Campuses
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {aboutData.centres_list.map((c) => (
                      <span
                        key={c}
                        className="px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-[11px] font-medium text-neutral-700 dark:text-neutral-300"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <Link href="/centres" className="btn-secondary text-xs py-2 px-4 font-semibold flex-1 text-center">
                    All Campus Maps
                  </Link>
                  <Link href="/contact" className="btn-ghost text-xs py-2 px-4 font-semibold flex-1 text-center">
                    Helpline Directory
                  </Link>
                </div>
              </div>
            </div>

            {/* Right: Real Consultation Enquiry Form */}
            <div className="lg:col-span-7">
              <div className="p-8 sm:p-10 rounded-3xl bg-neutral-50 dark:bg-[#15151D] border border-neutral-200 dark:border-neutral-800 shadow-xl space-y-6">
                <div>
                  <div className="text-xs font-mono uppercase text-brand-red font-bold tracking-wider">
                    Direct Admissions Advisory
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white mt-1">
                    Book a Free Demo Class or Campus Visit
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                    Meet our senior trainers, inspect our live agency environment, and review syllabus materials tailored to your career goal.
                  </p>
                </div>

                <Suspense fallback={<div className="p-8 text-center text-xs text-neutral-400">Loading admissions advisory form...</div>}>
                  <EnquiryForm />
                </Suspense>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

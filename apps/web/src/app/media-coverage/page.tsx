import Link from "next/link";
import Image from "next/image";
import {
  Award,
  Sparkles,
  ExternalLink,
  Calendar,
  Building2,
  Newspaper,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  FileText,
  BadgeCheck,
} from "lucide-react";
import {
  getAllAwards,
  getAllPressCoverage,
  AWARD_GALLERIES,
  getAllCertificates,
} from "@/lib/media-coverage";
import { MediaLightboxGallery } from "@/components/media/MediaLightboxGallery";
import { AwardsTimeline } from "@/components/media/AwardsTimeline";
import type { Metadata } from "next";

function formatPublicationDate(dateStr: string): string {
  const parts = dateStr.split("-");
  const year = parts[0];
  const month = parts[1];
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const m = parseInt(month || "1", 10);
  const monthName = monthNames[m - 1] || month || "";
  return `${monthName} ${year}`.trim();
}

export const metadata: Metadata = {
  title: "Media Coverage, National Awards & Press Archive | DIDM Official",
  description:
    "Explore Delhi Institute of Digital Marketing (DIDM) media coverage, 3x ASSOCHAM honors, Noida Education Conclave Award 2026, Economic Times & Hindustan Times coverage, and authentic event archives.",
  alternates: {
    canonical: "https://www.didm.in/media-coverage",
  },
  openGraph: {
    title: "Media Coverage & National Awards Hub | DIDM",
    description:
      "Explore 10+ years of institutional credibility, ministerial convocations, ASSOCHAM awards, and national press reporting.",
    url: "https://www.didm.in/media-coverage",
  },
};

export default function MediaCoveragePage() {
  const awards = getAllAwards();
  const featuredAward = awards.find((a) => a.id === "award-noida-conclave-2026") || awards[0];
  const pressStories = getAllPressCoverage();
  const certificates = getAllCertificates();

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* ========================================================= */}
        {/* SECTION 1: HEADER & BREADCRUMBS                           */}
        {/* ========================================================= */}
        <div className="max-w-3xl space-y-4">
          <nav aria-label="Breadcrumb" className="text-xs font-mono text-neutral-500 flex items-center gap-2">
            <Link href="/" className="hover:text-brand-red transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/about" className="hover:text-brand-red transition-colors">
              About
            </Link>
            <span>/</span>
            <span className="text-neutral-900 dark:text-white font-semibold">Media Coverage</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-red/10 text-brand-red text-xs font-mono font-semibold">
            <Newspaper className="w-3.5 h-3.5" />
            <span>NATIONAL AWARDS · MINISTERIAL CONVOCATIONS · PRESS ARCHIVE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-normal text-neutral-900 dark:text-white leading-[1.1]">
            Media coverage, industry recognitions &amp; conclaves.
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
            Over a decade of excellence, Delhi Institute of Digital Marketing (DIDM) has been consistently recognized by apex industry associations, Union Ministries, state education departments, and national press networks.
          </p>
        </div>

        {/* ========================================================= */}
        {/* SECTION 2: FEATURED RECOGNITION HERO CARD                 */}
        {/* ========================================================= */}
        {featuredAward && (
          <div className="p-6 sm:p-10 rounded-3xl bg-neutral-900 text-white shadow-2xl relative overflow-hidden border border-neutral-800">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-brand-red text-white text-xs font-mono font-bold">
                    Latest National Award · {featuredAward.awardYear}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-neutral-300 text-xs font-mono">
                    {featuredAward.organization}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-bold text-white leading-tight">
                  {featuredAward.title}
                </h2>

                <p className="text-sm sm:text-base text-amber-300 font-medium">
                  {featuredAward.conclaveTitle}
                </p>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs sm:text-sm text-neutral-300 flex items-start gap-2.5">
                  <UserCheck className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-semibold">Felicitation: </span>
                    <span>{featuredAward.presentedBy}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed line-clamp-3">
                  {featuredAward.description}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Link
                    href={`/media-coverage/${featuredAward.slug}`}
                    className="btn-red text-xs sm:text-sm py-2.5 px-5 font-bold inline-flex items-center gap-1.5 shadow-lg shadow-brand-red/30"
                  >
                    <span>Read Full Ceremony Story</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <a
                    href={featuredAward.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-neutral-400 hover:text-white transition flex items-center gap-1"
                  >
                    <span>Verify Live Archive</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                  <Image
                    src={featuredAward.heroImage}
                    alt={featuredAward.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                    <span className="text-[11px] font-mono text-white/90">
                      Official felicitation moment at Noida Education Conclave
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* SECTION 3: INTERACTIVE AWARDS TIMELINE                    */}
        {/* ========================================================= */}
        <AwardsTimeline awards={awards} />

        {/* ========================================================= */}
        {/* SECTION 4: GENUINE EVENT PHOTO ARCHIVE                    */}
        {/* ========================================================= */}
        <div className="pt-6">
          <MediaLightboxGallery items={AWARD_GALLERIES} />
        </div>

        {/* ========================================================= */}
        {/* SECTION 5: IN THE PRESS (PUBLICATION-ORIENTED GRID)       */}
        {/* ========================================================= */}
        <div className="space-y-6 pt-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-brand-red uppercase tracking-wider mb-1">
                <Newspaper className="w-3.5 h-3.5" />
                <span>Editorial &amp; Media Coverage</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
                DIDM in the National Press
              </h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1 max-w-2xl">
                Real publication articles, editorial insights, and syndicated announcements across leading Indian newspapers and digital portals.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>All External Links Verified</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pressStories.map((story) => (
              <div
                key={story.id}
                className="p-6 rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-sm text-neutral-900 dark:text-white">
                      {story.publisher}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                        story.classification === "independent_reporting"
                          ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400"
                          : story.classification === "branded_content"
                          ? "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400"
                          : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300"
                      }`}
                    >
                      {story.classificationLabel}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-neutral-900 dark:text-white leading-snug group-hover:text-brand-red transition">
                    {story.headline}
                  </h3>

                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-3">
                    {story.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs">
                  <span className="text-neutral-400 font-mono">
                    {formatPublicationDate(story.publicationDate)}
                  </span>

                  <a
                    href={story.articleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-brand-red hover:underline inline-flex items-center gap-1"
                  >
                    <span>Read Article</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================= */}
        {/* SECTION 6: INSTITUTIONAL CERTIFICATES SHOWCASE             */}
        {/* ========================================================= */}
        <div className="space-y-6 pt-6">
          <div className="border-b border-neutral-200 dark:border-neutral-800 pb-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-brand-red uppercase tracking-wider mb-1">
              <BadgeCheck className="w-3.5 h-3.5" />
              <span>Official Accreditations</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
              Institutional Certificates &amp; Recognitions
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1 max-w-2xl">
              Authentic certificates and academic partnership commendations issued by industry bodies and management institutes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="p-5 rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group space-y-3"
              >
                <div className="space-y-3">
                  <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700/80">
                    <Image
                      src={cert.imageUrl}
                      alt={cert.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, 25vw"
                      className="object-cover transition-transform group-hover:scale-103"
                    />
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-brand-red font-bold uppercase">
                      {cert.issuingBody}
                    </span>
                    <h3 className="text-sm font-bold text-neutral-900 dark:text-white mt-0.5 leading-snug">
                      {cert.title}
                    </h3>
                  </div>

                  <p className="text-xs text-neutral-500 leading-relaxed line-clamp-2">
                    {cert.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                  <span>Year: {cert.year}</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Verified</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================= */}
        {/* SECTION 7: OTHER RECOGNITIONS (JUSTDIAL & FRANCHISE BATAO) */}
        {/* ========================================================= */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#F4F1EA] dark:bg-[#16161E] border border-neutral-200 dark:border-neutral-800 space-y-6">
          <div>
            <span className="text-xs font-mono font-bold uppercase text-brand-red tracking-wider">
              Network Honors
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white mt-1">
              Public Search &amp; Business Network Honors
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-[#1E1E28] border border-neutral-200 dark:border-neutral-700/60 space-y-3">
              <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase">
                Justdial Consumer Search
              </span>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                #1 Most Searched Digital Marketing Institute Across Delhi NCR
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                Awarded for exceptional learner satisfaction, organic campus inquiry volume, and consistent 4.8/5 aggregate ratings from over 35,000+ registered course participants.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#1E1E28] border border-neutral-200 dark:border-neutral-700/60 space-y-3">
              <span className="text-xs font-mono font-bold text-brand-red uppercase">
                Franchise Batao Network
              </span>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                Excellence in Digital Marketing Education &amp; Center Expansion
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                Recognizing DIDM for scaling top-tier smart classroom infrastructure and standardized curriculum across 14+ campuses in Delhi NCR and North India.
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* SECTION 8: ENQUIRY CTA                                    */}
        {/* ========================================================= */}
        <div className="p-8 sm:p-12 rounded-3xl bg-neutral-900 text-white relative overflow-hidden shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-8 border border-neutral-800">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red/20 text-brand-red text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>LEARN WITH THE WINNING INSTITUTE</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white leading-tight">
              Ready to learn from India&apos;s most celebrated marketing mentors?
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
              Book a free offline or online counselling session. Experience live smart class demos, explore 52 modules, and review authentic corporate placement proof.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <Link
              href="/enquire"
              className="btn-red py-3.5 px-6 font-bold text-center text-sm shadow-xl shadow-brand-red/30 flex items-center justify-center gap-2"
            >
              <span>Book Free Demo Class</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/programs"
              className="px-5 py-3.5 rounded-full border border-neutral-700 hover:border-neutral-500 font-semibold text-center text-sm transition"
            >
              <span>Explore All Courses</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Award, Phone, ArrowRight, ShieldCheck, Newspaper } from "lucide-react";
import { getAllNewsArticles, getFeaturedNewsArticle, getNewsCategories } from "@/lib/news-events";
import { NewsArchiveClient } from "@/components/news/NewsArchiveClient";
import { DIDM_MEDIA } from "@/data/didm-media";
import { SITE_BRAND } from "@/lib/content";

export const metadata: Metadata = {
  title: "News & Events | DIDM Official Press & Institutional Archive",
  description:
    "Explore the complete chronological archive of official announcements, convocation ceremonies, award celebrations, masterclasses, and partnerships from Delhi Institute of Digital Marketing (DIDM).",
  alternates: {
    canonical: "https://www.didm.in/news-and-events",
  },
  openGraph: {
    title: "News & Events | DIDM Official Press Archive",
    description:
      "Official press releases, convocation ceremonies, masterclasses, and award celebrations across Delhi Institute of Digital Marketing.",
    url: "https://www.didm.in/news-and-events",
    type: "website",
  },
};

export default function NewsAndEventsPage() {
  const articles = getAllNewsArticles();
  const featuredArticle = getFeaturedNewsArticle();
  const categories = getNewsCategories();

  return (
    <div className="py-12 md:py-20" suppressHydrationWarning>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header & Context */}
        <div className="max-w-3xl space-y-4">
          <nav aria-label="Breadcrumb" className="text-xs font-mono text-neutral-500 flex items-center gap-2">
            <Link href="/" className="hover:text-brand-red">Home</Link>
            <span>/</span>
            <span className="text-neutral-900 dark:text-white font-semibold">News &amp; Events</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red-soft dark:bg-brand-red/10 text-brand-red text-xs font-mono font-semibold">
            OFFICIAL INSTITUTIONAL PRESS &amp; EVENT ARCHIVE
          </div>

          <h1 className="text-3xl sm:text-5xl font-normal text-neutral-900 dark:text-white leading-[1.08]">
            News, milestones &amp; <em>campus events</em>.
          </h1>

          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Stay up to date with official convocation celebrations, award recognitions, industry masterclasses, branch expansions, and student achievements across all DIDM campuses.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              href="/media-coverage"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-red/10 text-brand-red text-xs font-bold hover:bg-brand-red/20 transition-colors"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Explore Official Media Coverage &amp; Awards Hub →</span>
            </Link>
            <span className="text-xs font-mono text-neutral-400">
              {articles.length} Verified Records in Archive
            </span>
          </div>
        </div>

        {/* Interactive Client Hub with Search, Category Filter & Pagination */}
        <NewsArchiveClient
          articles={articles}
          featuredArticle={featuredArticle}
          categories={categories}
        />

        {/* Institutional Contact / Callback Banner */}
        <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-neutral-900 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-[10px] font-mono uppercase text-brand-red font-bold tracking-wider">
              Admissions &amp; Event Enquiries
            </span>
            <h3 className="text-xl sm:text-2xl font-bold">
              Want to attend our next convocation, masterclass or demo session?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Speak with our senior academic counsellors to learn about upcoming batch commencements, hands-on masterclasses, and live agency project cohorts.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={`tel:${SITE_BRAND.phoneClean}`}
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-2 transition"
            >
              <Phone className="w-4 h-4 text-brand-red" />
              <span>Toll Free: 88005 05151</span>
            </a>
            <Link
              href="/enquire"
              className="btn-red py-3 px-6 text-xs font-bold shadow-lg shadow-brand-red/25 flex items-center gap-2"
            >
              <span>Request Free Callback</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

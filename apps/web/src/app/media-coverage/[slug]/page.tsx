import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Award,
  Calendar,
  Building2,
  UserCheck,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  ChevronLeft,
  Share2,
  ShieldCheck,
} from "lucide-react";
import {
  AWARDS,
  getAllAwards,
  getAwardBySlug,
  getAwardGallery,
  NEWS_ARTICLES,
} from "@/lib/media-coverage";
import { MediaLightboxGallery } from "@/components/media/MediaLightboxGallery";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return AWARDS.map((award) => ({
    slug: award.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const award = getAwardBySlug(slug);

  if (!award) {
    return {
      title: "Award Not Found | DIDM Media Coverage",
    };
  }

  return {
    title: `${award.title} (${award.awardYear}) — ${award.conclaveTitle} | DIDM`,
    description: award.description.slice(0, 160),
    alternates: {
      canonical: `https://www.didm.in/media-coverage/${award.slug}`,
    },
    openGraph: {
      title: `${award.title} — ${award.conclaveTitle}`,
      description: award.description.slice(0, 160),
      url: `https://www.didm.in/media-coverage/${award.slug}`,
      images: [
        {
          url: award.heroImage,
          alt: award.title,
        },
      ],
    },
  };
}

export default async function AwardDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const award = getAwardBySlug(slug);

  if (!award) {
    notFound();
  }

  const galleryItems = getAwardGallery(award.id);
  const otherAwards = getAllAwards()
    .filter((a) => a.id !== award.id)
    .slice(0, 3);
  const relatedNews = award.relatedNewsId
    ? NEWS_ARTICLES.find((n) => n.legacyId === award.relatedNewsId)
    : null;

  return (
    <article className="py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="text-xs font-mono text-neutral-500 flex items-center gap-2">
          <Link href="/" className="hover:text-brand-red transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/media-coverage" className="hover:text-brand-red transition-colors">
            Media Coverage
          </Link>
          <span>/</span>
          <span className="text-neutral-900 dark:text-white font-semibold truncate max-w-[280px]">
            {award.title}
          </span>
        </nav>

        {/* Back Link & Header */}
        <div className="space-y-4">
          <Link
            href="/media-coverage"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-brand-red hover:underline"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to All Recognitions</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-brand-red text-white text-xs font-mono font-bold">
              {award.awardYear}
            </span>
            <span className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs font-mono font-semibold">
              {award.organization}
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-xs font-mono font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Verified Institutional Record</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-normal text-neutral-900 dark:text-white leading-[1.1]">
            {award.title}
          </h1>

          <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 font-medium">
            {award.conclaveTitle}
          </p>
        </div>

        {/* Hero Photograph with Caption Overlay */}
        <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl">
          <Image
            src={award.heroImage}
            alt={award.title}
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 sm:p-8">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                Official Presentation Moment
              </span>
              <p className="text-sm sm:text-base text-white font-medium max-w-2xl">
                Presented by: {award.presentedBy}
              </p>
            </div>
          </div>
        </div>

        {/* Narrative & Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
          {/* Main Narrative Column */}
          <div className="lg:col-span-8 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 space-y-4">
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
                Award Citation &amp; Recognition Overview
              </h2>
              <p className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                {award.description}
              </p>

              {relatedNews && (
                <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/80 space-y-2 mt-4">
                  <span className="text-[11px] font-mono text-brand-red font-bold uppercase">
                    From the Event News Desk
                  </span>
                  <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                    {relatedNews.title}
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {relatedNews.content}
                  </p>
                </div>
              )}
            </div>

            {/* Event Gallery */}
            {galleryItems.length > 0 && (
              <div className="pt-4">
                <MediaLightboxGallery
                  items={galleryItems}
                  title="Ceremony Gallery &amp; Photographs"
                  subtitle={`Genuine high-resolution event photographs from the ${award.conclaveTitle}.`}
                />
              </div>
            )}
          </div>

          {/* Sidebar Metadata Column */}
          <div className="lg:col-span-4 space-y-6">
            {/* Factsheet Card */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 space-y-4">
              <h3 className="text-sm font-bold font-mono uppercase text-brand-red tracking-wider">
                Recognition Factsheet
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-neutral-400 block font-mono">Conclave / Summit</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">
                    {award.conclaveTitle}
                  </span>
                </div>

                <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800">
                  <span className="text-neutral-400 block font-mono">Awarding Body</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">
                    {award.organization}
                  </span>
                </div>

                <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800">
                  <span className="text-neutral-400 block font-mono">Presented By</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">
                    {award.presentedBy}
                  </span>
                </div>

                <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800">
                  <span className="text-neutral-400 block font-mono">Award Year</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">
                    {award.awardYear}
                  </span>
                </div>

                <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800">
                  <span className="text-neutral-400 block font-mono">Category</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">
                    {award.category}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800">
                <a
                  href={award.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs font-semibold hover:bg-neutral-200 dark:hover:bg-neutral-700 transition"
                >
                  <span>Verify Original Archive</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Quick Enquiry Card */}
            <div className="p-6 rounded-3xl bg-neutral-900 text-white space-y-4">
              <span className="text-[10px] font-mono text-brand-red font-bold uppercase">
                Industry-Recognized Training
              </span>
              <h3 className="text-lg font-bold text-white">
                Train at India&apos;s Most Awarded Digital Institute
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Join 50,000+ graduates trained with live client budgets, 52-module hands-on curriculum, and dedicated placement cell support.
              </p>
              <Link
                href="/enquire"
                className="w-full btn-red py-3 text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <span>Request Free Counselling</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Other Related Awards */}
        <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
              Explore Other National Recognitions
            </h2>
            <Link
              href="/media-coverage"
              className="text-xs font-bold text-brand-red hover:underline flex items-center gap-1"
            >
              <span>View All Recognitions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {otherAwards.map((item) => (
              <Link
                key={item.id}
                href={`/media-coverage/${item.slug}`}
                className="p-5 rounded-2xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 hover:border-brand-red/40 transition-all card-hover flex flex-col justify-between group space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-brand-red">{item.awardYear}</span>
                    <span className="text-[10px] font-mono text-neutral-400">{item.organization.split(" ")[0]}</span>
                  </div>
                  <h3 className="text-sm font-bold text-neutral-900 dark:text-white group-hover:text-brand-red transition">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-500 line-clamp-2">
                    {item.conclaveTitle}
                  </p>
                </div>
                <span className="text-xs font-semibold text-brand-red flex items-center gap-1">
                  <span>Read details</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}


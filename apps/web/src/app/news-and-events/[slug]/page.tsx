import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Calendar,
  ArrowLeft,
  Share2,
  Phone,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Newspaper,
  Tag,
  Building2,
  Sparkles,
} from "lucide-react";
import {
  getAllNewsArticles,
  getNewsArticleBySlug,
  getRelatedNewsArticles,
} from "@/lib/news-events";
import { NewsGalleryLightbox } from "@/components/news/NewsGalleryLightbox";
import { DIDM_MEDIA } from "@/data/didm-media";
import { SITE_BRAND } from "@/lib/content";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = getAllNewsArticles();
  const params: { slug: string }[] = [];

  // Generate both slug and id parameters so both URL styles work
  articles.forEach((a) => {
    if (a.slug) params.push({ slug: a.slug });
    if (a.id && a.id !== a.slug) params.push({ slug: a.id });
  });

  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getNewsArticleBySlug(slug);

  if (!article) {
    return {
      title: "News Article | DIDM Official Press",
    };
  }

  const image =
    article.coverImage?.localPath ||
    article.galleryImages?.[0]?.localPath ||
    article.coverImage?.sourceUrl ||
    DIDM_MEDIA.officialLogo.path;

  return {
    title: `${article.title} | DIDM News & Events`,
    description:
      article.excerpt ||
      `Read the official announcement and verified event details regarding ${article.title} from Delhi Institute of Digital Marketing.`,
    alternates: {
      canonical: `https://www.didm.in/news-and-events/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `https://www.didm.in/news-and-events/${article.slug}`,
      type: "article",
      images: [
        {
          url: image.startsWith("http") ? image : `https://www.didm.in${image}`,
          alt: article.title,
        },
      ],
    },
  };
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getNewsArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedNewsArticles(article.id, 4);

  const heroImage =
    article.coverImage?.localPath ||
    article.galleryImages?.[0]?.localPath ||
    article.coverImage?.sourceUrl;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt || `${article.publishedYear}-01-01`,
    author: {
      "@type": "Organization",
      name: "Delhi Institute of Digital Marketing (DIDM)",
      url: "https://www.didm.in",
    },
    publisher: {
      "@type": "Organization",
      name: "Delhi Institute of Digital Marketing",
      logo: {
        "@type": "ImageObject",
        url: `https://www.didm.in${DIDM_MEDIA.officialLogo.path}`,
      },
    },
    image: heroImage ? (heroImage.startsWith("http") ? heroImage : `https://www.didm.in${heroImage}`) : undefined,
  };

  return (
    <div className="py-12 md:py-20" suppressHydrationWarning>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="text-xs font-mono text-neutral-500 flex items-center gap-2">
          <Link href="/" className="hover:text-brand-red">Home</Link>
          <span>/</span>
          <Link href="/news-and-events" className="hover:text-brand-red">News &amp; Events</Link>
          <span>/</span>
          <span className="text-neutral-900 dark:text-white font-semibold truncate max-w-xs sm:max-w-md">
            {article.title}
          </span>
        </nav>

        {/* Article Header */}
        <div className="space-y-6 max-w-4xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-brand-red/10 text-brand-red text-xs font-mono font-semibold">
              {article.category}
            </span>
            <span className="text-xs text-neutral-400 font-mono">
              Press Release #{article.id} · Year {article.publishedYear}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-mono font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Institutional Event</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white leading-[1.12]">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-6 text-xs text-neutral-500">
            <div className="flex items-center gap-3">
              <span>Published by DIDM Editorial Desk</span>
              <span>·</span>
              <span>Authentic Source Record</span>
            </div>
            <Link
              href="/news-and-events"
              className="inline-flex items-center gap-1.5 text-brand-red hover:underline font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to all updates</span>
            </Link>
          </div>
        </div>

        {/* Main 2-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Main Article Content */}
          <div className="lg:col-span-8 space-y-8">
            {/* Hero Cover Image (if available) */}
            {heroImage && (
              <div className="relative rounded-3xl overflow-hidden border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-100 dark:bg-neutral-900 shadow-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={heroImage}
                  alt={article.coverImage?.alt || article.title}
                  className="w-full h-auto max-h-[520px] object-cover"
                />
              </div>
            )}

            {/* Lead Excerpt Callout */}
            {article.excerpt && (
              <div className="p-6 sm:p-8 rounded-2xl bg-neutral-50 dark:bg-[#131319] border-l-4 border-brand-red text-neutral-800 dark:text-neutral-200 text-base sm:text-lg font-medium leading-relaxed shadow-sm">
                {article.excerpt}
              </div>
            )}

            {/* Sequential Content Blocks (Preserves Headings, Paragraphs, Images in order!) */}
            {article.contentBlocks && article.contentBlocks.length > 0 ? (
              <div className="space-y-6 text-neutral-800 dark:text-neutral-200 leading-relaxed text-sm sm:text-base">
                {article.contentBlocks.map((block, idx) => {
                  if (block.type === "heading") {
                    if (block.level === 3) {
                      return (
                        <h3
                          key={idx}
                          className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white pt-3 pb-1"
                        >
                          {block.text}
                        </h3>
                      );
                    }
                    return (
                      <h2
                        key={idx}
                        className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white pt-4 pb-1"
                      >
                        {block.text}
                      </h2>
                    );
                  }

                  if (block.type === "paragraph") {
                    return (
                      <p key={idx} className="leading-relaxed">
                        {block.text}
                      </p>
                    );
                  }

                  if (block.type === "image") {
                    const imgSrc = block.localPath || block.src;
                    if (!imgSrc) return null;
                    return (
                      <figure
                        key={idx}
                        className="my-8 rounded-2xl overflow-hidden border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-100 dark:bg-neutral-900 shadow-sm"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={imgSrc}
                          alt={block.alt || `${article.title} event photograph`}
                          className="w-full h-auto object-contain max-h-[600px]"
                          loading="lazy"
                        />
                        {block.caption && (
                          <figcaption className="p-3 bg-neutral-50 dark:bg-neutral-900/90 text-xs text-neutral-500 text-center font-mono border-t border-neutral-200 dark:border-neutral-800">
                            {block.caption}
                          </figcaption>
                        )}
                      </figure>
                    );
                  }

                  if (block.type === "read_more") {
                    return (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 text-xs font-mono text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700"
                      >
                        {block.text}
                      </div>
                    );
                  }

                  return null;
                })}
              </div>
            ) : (
              /* Fallback for articles without deep parsed blocks */
              <div className="space-y-6 text-neutral-800 dark:text-neutral-200 leading-relaxed text-sm sm:text-base">
                <p>
                  As part of Delhi Institute of Digital Marketing's ongoing mission to empower students, entrepreneurs, and professionals with practical digital intelligence, this milestone highlights our continued commitment to excellence across our 14+ campuses in Delhi NCR and North India.
                </p>
                <p>
                  With certified master trainers, ISO 9001:2015 accredited curriculum, and over 10+ years of educational leadership, DIDM continues to shape tomorrow's digital leaders through agency-style practical training.
                </p>
              </div>
            )}

            {/* Event Photo Gallery Lightbox (when article has multiple event photos) */}
            {article.galleryImages && article.galleryImages.length > 1 && (
              <NewsGalleryLightbox
                images={article.galleryImages}
                articleTitle={article.title}
              />
            )}

            {/* Sharing & Enquiries Footer */}
            <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-neutral-900 dark:text-white">Share:</span>
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                    article.title + " - Read on DIDM: https://www.didm.in/news-and-events/" + article.slug
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition"
                >
                  WhatsApp
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    article.title
                  )}&url=${encodeURIComponent("https://www.didm.in/news-and-events/" + article.slug)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-lg bg-neutral-900 dark:bg-neutral-800 text-white text-xs font-semibold hover:bg-neutral-800 transition"
                >
                  Twitter / X
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href="/enquire"
                  className="btn-red text-xs py-2 px-4 font-bold"
                >
                  Request Callback
                </Link>
                <Link
                  href="/news-and-events"
                  className="px-3.5 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 text-xs font-semibold hover:bg-neutral-50 dark:hover:bg-neutral-800 transition"
                >
                  All News
                </Link>
              </div>
            </div>
          </div>

          {/* Sticky Right Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Admissions Demo Card */}
            <div className="p-6 rounded-3xl bg-neutral-900 text-white space-y-4 shadow-xl">
              <span className="text-[10px] font-mono uppercase text-brand-red font-bold tracking-wider">
                Admissions &amp; Trial Classes
              </span>
              <h4 className="text-base font-bold leading-snug">
                Experience DIDM's Industry-Grade Digital Marketing Training
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Attend a free 1-on-1 counseling and trial session at any of our 14 physical branches or join live online from anywhere.
              </p>
              <Link
                href="/upcoming-batches"
                className="btn-red text-xs py-3 px-4 font-bold text-center block shadow-md shadow-brand-red/30"
              >
                View Upcoming Batches →
              </Link>
            </div>

            {/* Helpline Card */}
            <div className="p-6 rounded-3xl bg-neutral-50 dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 space-y-3">
              <div className="text-xs font-mono uppercase text-neutral-400">Toll Free Student Desk</div>
              <a
                href={`tel:${SITE_BRAND.phoneClean}`}
                className="flex items-center gap-2 text-neutral-900 dark:text-white font-bold text-base hover:text-brand-red transition"
              >
                <Phone className="w-4 h-4 text-brand-red" />
                <span>+91 88005 05151</span>
              </a>
              <div className="text-[11px] text-neutral-500 font-mono">
                Open All 7 Days: 9:00 AM – 8:00 PM
              </div>
            </div>

            {/* Related Stories */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-brand-red font-bold">Related Stories</span>
                <Link href="/news-and-events" className="text-[11px] text-neutral-400 hover:text-brand-red">
                  View All
                </Link>
              </div>

              <div className="space-y-3">
                {relatedArticles.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/news-and-events/${rel.slug}`}
                    className="block group space-y-1 p-2 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800/60 transition"
                  >
                    <div className="text-xs font-bold text-neutral-900 dark:text-white group-hover:text-brand-red transition line-clamp-2 leading-snug">
                      {rel.title}
                    </div>
                    <div className="text-[10px] text-neutral-400 font-mono flex items-center gap-2">
                      <span>{rel.category}</span>
                      <span>·</span>
                      <span>{rel.publishedYear}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

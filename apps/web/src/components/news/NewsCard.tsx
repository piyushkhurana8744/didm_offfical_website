"use client";

import Link from "next/link";
import { useState } from "react";
import { Calendar, Tag, ArrowRight, Award, GraduationCap, Sparkles, Building2, PartyPopper, Newspaper } from "lucide-react";
import type { NewsArticle } from "@/lib/news-events";

function getCategoryIcon(category: string) {
  switch (category) {
    case "Convocations & Graduations":
      return <GraduationCap className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />;
    case "Awards & Recognition":
      return <Award className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />;
    case "Masterclasses & Workshops":
      return <Sparkles className="w-3.5 h-3.5 text-brand-red" />;
    case "Campus & Expansion":
      return <Building2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />;
    case "Celebrations & Culture":
      return <PartyPopper className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />;
    default:
      return <Newspaper className="w-3.5 h-3.5 text-neutral-500" />;
  }
}

export function NewsCard({ article }: { article: NewsArticle }) {
  // Determine display image: prefer local cover or first gallery image, fallback to sourceUrl
  const imageSrc =
    article.coverImage?.localPath ||
    article.galleryImages?.[0]?.localPath ||
    article.coverImage?.sourceUrl ||
    "";

  const detailHref = `/news-and-events/${article.slug}`;

  return (
    <article className="group flex flex-col bg-white dark:bg-[#131319] border border-neutral-200/80 dark:border-neutral-800/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-brand-red/30 dark:hover:border-brand-red/30 transition-all duration-300">
      {/* Media Container with absolute stacked image + fallback */}
      <Link href={detailHref} className="relative aspect-[16/10] overflow-hidden bg-neutral-100 dark:bg-neutral-900 block">
        {/* Underneath fallback icon */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-900 dark:to-neutral-800 select-none">
          <Newspaper className="w-10 h-10 text-neutral-400 dark:text-neutral-600 mb-2" />
          <span className="text-[11px] font-mono uppercase text-neutral-500">DIDM Editorial Press</span>
        </div>

        {/* Real Event Image */}
        {imageSrc && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageSrc}
            alt={article.coverImage?.alt || article.title}
            onError={(e) => {
              e.currentTarget.style.opacity = "0";
            }}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        )}

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 dark:bg-[#131319]/95 backdrop-blur-md text-[11px] font-semibold text-neutral-900 dark:text-white shadow-sm">
            {getCategoryIcon(article.category)}
            <span>{article.category}</span>
          </span>
          <span className="px-2 py-0.5 rounded-md bg-neutral-900/80 backdrop-blur-md text-[10px] font-mono text-white">
            {article.publishedYear}
          </span>
        </div>

        {/* Multi-image indicator if gallery available */}
        {article.galleryImages?.length > 1 && (
          <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-neutral-900/85 backdrop-blur-md text-[10px] font-mono text-white flex items-center gap-1">
            <span>📷 {article.galleryImages.length} Photos</span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="flex-1 p-5 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-400">
            <span>Ref #{article.id}</span>
            <span>·</span>
            <span>DIDM Press Release</span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white group-hover:text-brand-red transition-colors line-clamp-2 leading-snug">
            <Link href={detailHref}>{article.title}</Link>
          </h3>

          <p className="text-xs sm:text-[13px] text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
            {article.excerpt}
          </p>
        </div>

        <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between">
          <span className="text-[11px] text-neutral-500 font-medium">Verified Event Update</span>
          <Link
            href={detailHref}
            className="inline-flex items-center gap-1 text-xs font-bold text-brand-red group-hover:translate-x-0.5 transition-transform"
          >
            <span>Read Story</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}


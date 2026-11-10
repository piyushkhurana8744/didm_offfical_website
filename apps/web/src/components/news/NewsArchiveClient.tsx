"use client";

import { useState, useMemo, useRef } from "react";
import Link from "next/link";
import { Search, Filter, ArrowRight, Calendar, Newspaper, ArrowLeft, ArrowRight as NextArrow } from "lucide-react";
import type { NewsArticle } from "@/lib/news-events";
import { NewsCard } from "./NewsCard";

interface Props {
  articles: NewsArticle[];
  featuredArticle: NewsArticle | null;
  categories: string[];
}

const ITEMS_PER_PAGE = 12;

export function NewsArchiveClient({ articles, featuredArticle, categories }: Props) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const gridTopRef = useRef<HTMLDivElement>(null);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: articles.length };
    articles.forEach((a) => {
      counts[a.category] = (counts[a.category] || 0) + 1;
    });
    return counts;
  }, [articles]);

  // Filtered articles
  const filteredArticles = useMemo(() => {
    let result = articles;

    if (selectedCategory !== "All") {
      result = result.filter(
        (a) => a.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.id.includes(q) ||
          a.slug.toLowerCase().includes(q)
      );
    }

    return result;
  }, [articles, selectedCategory, searchQuery]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE) || 1;
  const currentArticles = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredArticles.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredArticles, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (gridTopRef.current) {
      gridTopRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  // Featured story display
  const showFeatured =
    featuredArticle && currentPage === 1 && selectedCategory === "All" && !searchQuery.trim();

  return (
    <div className="space-y-12" suppressHydrationWarning>
      {/* 1. Featured Article Hero (Shown on page 1 of All) */}
      {showFeatured && featuredArticle && (
        <section className="bg-gradient-to-br from-neutral-900 to-neutral-950 text-white rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
            {/* Image Side */}
            <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto lg:h-[480px] bg-neutral-900 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={
                  featuredArticle.coverImage?.localPath ||
                  featuredArticle.galleryImages?.[0]?.localPath ||
                  featuredArticle.coverImage?.sourceUrl
                }
                alt={featuredArticle.title}
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent lg:hidden" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-brand-red text-white text-xs font-mono font-bold uppercase tracking-wider shadow-lg">
                  Featured Headline
                </span>
              </div>
            </div>

            {/* Text Side */}
            <div className="lg:col-span-5 p-6 sm:p-10 lg:p-12 space-y-6">
              <div className="flex items-center gap-3 text-xs font-mono text-neutral-400">
                <span className="text-brand-red font-semibold">{featuredArticle.category}</span>
                <span>·</span>
                <span>{featuredArticle.publishedYear}</span>
                <span>·</span>
                <span>Press Release #{featuredArticle.id}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold leading-snug">
                <Link
                  href={`/news-and-events/${featuredArticle.slug}`}
                  className="hover:text-brand-red transition-colors"
                >
                  {featuredArticle.title}
                </Link>
              </h2>

              <p className="text-sm text-neutral-300 leading-relaxed line-clamp-3">
                {featuredArticle.excerpt}
              </p>

              <div className="pt-2">
                <Link
                  href={`/news-and-events/${featuredArticle.slug}`}
                  className="btn-red py-3 px-6 text-sm font-bold inline-flex items-center gap-2 shadow-lg shadow-brand-red/30"
                >
                  <span>Read Full Story</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 2. Search & Category Filters Bar */}
      <div ref={gridTopRef} className="space-y-6 pt-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search news by headline, event or keyword..."
              suppressHydrationWarning
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-red/50 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-neutral-400 hover:text-neutral-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Result counter */}
          <div className="text-xs font-mono text-neutral-500 shrink-0">
            Showing {filteredArticles.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1}–
            {Math.min(currentPage * ITEMS_PER_PAGE, filteredArticles.length)} of {filteredArticles.length} updates
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const count = categoryCounts[cat] || 0;
            const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();
            return (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                  isSelected
                    ? "bg-brand-red text-white shadow-md shadow-brand-red/25"
                    : "bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-neutral-300 dark:hover:border-neutral-700"
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    isSelected
                      ? "bg-white/20 text-white"
                      : "bg-neutral-100 dark:bg-neutral-800 text-neutral-500"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Grid of Articles */}
      {currentArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {currentArticles.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-3xl bg-neutral-50 dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 space-y-4">
          <Newspaper className="w-12 h-12 text-neutral-400 mx-auto" />
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
            No updates found
          </h3>
          <p className="text-sm text-neutral-500 max-w-md mx-auto">
            We couldn't find any press releases matching "{searchQuery}". Try selecting another category or clear your search query.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="btn-red text-xs py-2 px-4 font-bold"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* 4. Pagination Bar */}
      {totalPages > 1 && (
        <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs font-mono text-neutral-500">
            Page {currentPage} of {totalPages}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#131319] text-neutral-700 dark:text-neutral-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-50 dark:hover:bg-neutral-800 transition"
              aria-label="Previous Page"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            {/* Render direct page buttons */}
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum: number;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              const isActive = currentPage === pageNum;
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-9 h-9 rounded-xl text-xs font-mono font-bold transition ${
                    isActive
                      ? "bg-brand-red text-white shadow-md shadow-brand-red/25"
                      : "bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            {totalPages > 5 && currentPage < totalPages - 2 && (
              <>
                <span className="px-1 text-neutral-400">…</span>
                <button
                  onClick={() => handlePageChange(totalPages)}
                  className="w-9 h-9 rounded-xl text-xs font-mono font-bold bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                >
                  {totalPages}
                </button>
              </>
            )}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#131319] text-neutral-700 dark:text-neutral-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-50 dark:hover:bg-neutral-800 transition"
              aria-label="Next Page"
            >
              <NextArrow className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


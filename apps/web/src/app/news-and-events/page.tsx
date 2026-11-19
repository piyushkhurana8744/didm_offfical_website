"use client";

import { EditorialHero } from "@/components/creative/EditorialHero";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import page1Articles from "@/data/didm-news-events.json";
import rawArchive from "@/data/news-and-events/articles.json";
import { MotionSection } from "@/components/motion/MotionSection";
import { MotionHeading } from "@/components/motion/MotionHeading";
import { StaggeredCardGrid } from "@/components/motion/StaggeredCardGrid";

interface UnifiedArticle {
  id: string | number;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
}

// Prepare archive items into unified shape
const archiveItems: UnifiedArticle[] = (rawArchive as any[]).map((a, idx) => {
  // Use page1 local image if within first 18
  if (idx < page1Articles.length) {
    return {
      id: page1Articles[idx].id,
      slug: page1Articles[idx].slug,
      title: page1Articles[idx].title,
      excerpt: page1Articles[idx].excerpt,
      image: page1Articles[idx].localImage,
    };
  }
  const img =
    a.coverImage?.localPath ||
    a.coverImage?.sourceUrl ||
    "/images/didm/news/500x4005.jpg";
  return {
    id: a.id || idx + 1,
    slug: a.slug || `news-${a.id}`,
    title: a.title,
    excerpt: a.excerpt || "",
    image: img,
  };
});

const ITEMS_PER_PAGE = 18;
const TOTAL_PAGES = Math.ceil(archiveItems.length / ITEMS_PER_PAGE);

export default function NewsAndEventsPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentArticles = archiveItems.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  return (
    <main className="creative-page bg-[#f7f7f7] min-h-screen text-[#222222]">
      <EditorialHero eyebrow="NEWS & EVENTS" title="What’s happening." accent="What’s next." description="Ideas, events and moments from the DIDM community. Explore the latest stories from our classrooms and beyond." image="/images/didm/homepage/DIDM_June_Batch_Closing_by-Mr-Siddhartha-sir-in_Preet-Vihar-6.jpg" alt="DIDM batch closing celebration at Preet Vihar" caption="Inside DIDM / Events, people and new possibilities" variant="editorial" href="#latest-stories" action="Read the latest" />
      <div id="latest-stories" />
      <MotionSection as="section" preset="editorial" className="pt-8 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Top Pagination Bar */}
        <div className="flex justify-end items-center mb-6 text-sm">
          <div className="flex items-center gap-1.5 bg-transparent text-neutral-700">
            {[1, 2, 3].map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`px-2 py-0.5 font-semibold transition-colors ${
                  currentPage === pageNum
                    ? "text-[#b52828] font-bold underline"
                    : "hover:text-[#b52828]"
                }`}
              >
                {pageNum}
              </button>
            ))}
            <button
              onClick={() =>
                handlePageChange(Math.min(TOTAL_PAGES, currentPage + 1))
              }
              className="px-2 py-0.5 font-semibold hover:text-[#b52828] transition-colors"
              title="Next Page"
            >
              &gt;
            </button>
            <button
              onClick={() => handlePageChange(TOTAL_PAGES)}
              className="px-2 py-0.5 font-semibold hover:text-[#b52828] transition-colors"
            >
              Last &rsaquo;
            </button>
          </div>
        </div>

        {/* 3-Column Articles Grid */}
        <StaggeredCardGrid columns={3} stagger={0.06}>
          {currentArticles.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded overflow-hidden shadow-[0_2px_15px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.12)] transition-all duration-300 flex flex-col h-full border border-neutral-100 group"
            >
              {/* Card Image */}
              <Link
                href={`/news-and-events/${article.slug}`}
                className="block relative w-full h-[270px] bg-neutral-100 overflow-hidden"
              >
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </Link>

              {/* Card Title */}
              <div className="px-5 pt-4 pb-2">
                <h2 className="text-base sm:text-[17px] font-bold text-black leading-snug line-clamp-2 font-poppins">
                  <Link
                    href={`/news-and-events/${article.slug}`}
                    className="hover:text-[#b52828] transition-colors"
                  >
                    {article.title}
                  </Link>
                </h2>
              </div>

              {/* Card Excerpt & Button */}
              <div className="px-5 pb-5 pt-1 flex flex-col justify-between flex-1">
                <p className="text-sm text-neutral-600 line-clamp-3 leading-relaxed mb-4">
                  {article.excerpt}
                </p>

                <div>
                  <Link
                    href={`/news-and-events/${article.slug}`}
                    className="inline-block px-4 py-1.5 bg-[#b52828] hover:bg-[#8c1b1b] text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors shadow-sm"
                  >
                    Read more
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </StaggeredCardGrid>

        {/* Bottom Pagination Bar */}
        <div className="flex justify-end items-center mt-10 pt-4 text-sm border-t border-neutral-200">
          <div className="flex items-center gap-1.5 bg-transparent text-neutral-700">
            {[1, 2, 3].map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`px-2 py-0.5 font-semibold transition-colors ${
                  currentPage === pageNum
                    ? "text-[#b52828] font-bold underline"
                    : "hover:text-[#b52828]"
                }`}
              >
                {pageNum}
              </button>
            ))}
            <button
              onClick={() =>
                handlePageChange(Math.min(TOTAL_PAGES, currentPage + 1))
              }
              className="px-2 py-0.5 font-semibold hover:text-[#b52828] transition-colors"
              title="Next Page"
            >
              &gt;
            </button>
            <button
              onClick={() => handlePageChange(TOTAL_PAGES)}
              className="px-2 py-0.5 font-semibold hover:text-[#b52828] transition-colors"
            >
              Last &rsaquo;
            </button>
          </div>
        </div>
      </MotionSection>

    </main>
  );
}

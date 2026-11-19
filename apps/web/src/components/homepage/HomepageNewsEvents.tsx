import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Newspaper, Sparkles } from "lucide-react";
import articlesData from "@/data/news-and-events/articles.json";
import { MotionSection, MotionHeading, StaggeredCardGrid } from "@/components/motion";

export function HomepageNewsEvents() {
  const latestArticles = articlesData.slice(0, 3);

  return (
    <MotionSection preset="stagger" className="py-14 sm:py-20 bg-white dark:bg-[#0C0D12] border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        
        {/* Section Heading with Masked Reveal */}
        <MotionHeading
          eyebrow="Campus Happenings & Insights"
          title="Latest News & Events at DIDM"
          description="Stay updated with recent AI masterclasses, convocation ceremonies, e-commerce workshops, and festival celebrations across all campuses."
          align="center"
        />

        {/* 3 Articles Grid with Staggered Cascading Reveal */}
        <StaggeredCardGrid className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {latestArticles.map((article) => (
            <div
              key={article.id}
              className="bg-neutral-50 dark:bg-[#151620] rounded-2xl sm:rounded-3xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm hover:shadow-xl hover:border-brand-red/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Cover Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                  <Image
                    src={article.coverImage?.localPath || "/images/didm/homepage/MEDIA_NEWS.png"}
                    alt={article.coverImage?.alt || article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-brand-red text-white text-[10px] font-bold px-3 py-1 rounded-full font-heading shadow-md">
                    {article.category}
                  </div>
                </div>

                {/* Article Info */}
                <div className="p-5 sm:p-6 space-y-3">
                  <div className="flex items-center gap-2 text-[11px] text-neutral-500 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-brand-red" />
                    <span>{article.publishedAt || "June 2026"}</span>
                  </div>

                  <h3 className="text-base font-bold text-neutral-900 dark:text-white font-heading group-hover:text-brand-red transition line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              {/* Read More Link */}
              <div className="p-5 sm:p-6 pt-0">
                <Link
                  href={`/news-and-events/${article.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-red hover:underline transition"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </StaggeredCardGrid>

        {/* View All Articles Link */}
        <div className="text-center pt-2">
          <Link
            href="/news-and-events"
            className="btn-ghost inline-flex items-center gap-2 text-xs sm:text-sm py-2.5 px-6 rounded-xl border border-neutral-300 dark:border-neutral-700 font-bold hover:border-brand-red"
          >
            <span>Explore All News, Workshops &amp; Masterclasses</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </MotionSection>
  );
}

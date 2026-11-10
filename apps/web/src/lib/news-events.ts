import rawArticles from "@/data/news-and-events/articles.json";

export interface NewsContentBlock {
  type: "heading" | "paragraph" | "image" | "quote" | "read_more";
  level?: number;
  text?: string;
  src?: string;
  localPath?: string;
  alt?: string;
  caption?: string;
}

export interface NewsMediaItem {
  articleId: string;
  sourceUrl: string;
  localPath: string;
  alt: string;
  caption?: string;
  isGallery?: boolean;
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  originalUrl: string;
  category: string;
  publishedYear: string;
  publishedAt: string;
  sourceOffset: number;
  sourcePage: number;
  hasFullContent: boolean;
  coverImage: {
    sourceUrl: string;
    localPath?: string;
    alt: string;
  };
  contentBlocks: NewsContentBlock[];
  galleryImages: NewsMediaItem[];
  sourceStatus: "verified" | "pending";
  mediaStatus: "complete" | "text_only" | "available" | "fetch_failed";
}

const articlesList = rawArticles as unknown as NewsArticle[];

function loadArticles(): NewsArticle[] {
  return articlesList;
}

export function getAllNewsArticles(): NewsArticle[] {
  return loadArticles();
}

export function getFeaturedNewsArticle(): NewsArticle | null {
  const articles = loadArticles();
  // Find the first article that has full content and a cover/gallery image
  const featured = articles.find((a) => a.hasFullContent && a.galleryImages.length > 0) || articles[0];
  return featured || null;
}

export function getLatestNewsArticles(limit = 12): NewsArticle[] {
  const articles = loadArticles();
  return articles.slice(0, limit);
}

export function getNewsArticleById(id: string): NewsArticle | null {
  const articles = loadArticles();
  return articles.find((a) => a.id === id) || null;
}

export function getNewsArticleBySlug(slug: string): NewsArticle | null {
  const articles = loadArticles();
  // Match either exact slug, or case-insensitive slug, or check if slug equals ID
  return (
    articles.find((a) => a.slug.toLowerCase() === slug.toLowerCase()) ||
    articles.find((a) => a.id === slug) ||
    null
  );
}

export function getNewsArticlesByCategory(category: string): NewsArticle[] {
  const articles = loadArticles();
  if (!category || category === "All") return articles;
  return articles.filter((a) => a.category.toLowerCase() === category.toLowerCase());
}

export function getNewsCategories(): string[] {
  const articles = loadArticles();
  const categories = new Set<string>();
  articles.forEach((a) => {
    if (a.category) categories.add(a.category);
  });
  return ["All", ...Array.from(categories)];
}

export function getRelatedNewsArticles(currentId: string, limit = 3): NewsArticle[] {
  const articles = loadArticles();
  const current = articles.find((a) => a.id === currentId);
  if (!current) return articles.slice(0, limit);

  // Prefer articles from the same category
  const sameCategory = articles.filter(
    (a) => a.id !== currentId && a.category === current.category
  );
  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }

  const others = articles.filter(
    (a) => a.id !== currentId && a.category !== current.category
  );
  return [...sameCategory, ...others].slice(0, limit);
}


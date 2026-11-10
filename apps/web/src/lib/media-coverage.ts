import awardsData from "@/data/media-coverage/awards.json";
import pressData from "@/data/media-coverage/press-coverage.json";
import newsData from "@/data/media-coverage/news-articles.json";
import galleriesData from "@/data/media-coverage/award-galleries.json";
import certificatesData from "@/data/media-coverage/certificates.json";
import mediaAssetsData from "@/data/media-coverage/media-assets.json";
import provenanceData from "@/data/media-coverage/source-provenance.json";

export interface AwardRecord {
  id: string;
  slug: string;
  title: string;
  conclaveTitle: string;
  awardYear: number;
  organization: string;
  category: string;
  presentedBy: string;
  description: string;
  sourceUrl: string;
  eventDate: string;
  heroImage: string;
  galleryIds: string[];
  relatedNewsId: string | null;
  featured: boolean;
  verificationStatus: string;
}

export interface PressCoverageRecord {
  id: string;
  publisher: string;
  publisherLogo?: string;
  headline: string;
  articleUrl: string;
  publicationDate: string;
  classification: "independent_reporting" | "branded_content" | "conclave_report" | "broadcast_feature" | "editorial_contributor" | "press_wire";
  classificationLabel: string;
  summary: string;
  relatedAwardId: string | null;
  relatedProgram: string | null;
  verifiedAvailability: boolean;
}

export interface NewsArticleRecord {
  id: string;
  legacyId: string;
  slug: string;
  title: string;
  publishDate: string;
  category: string;
  summary: string;
  content: string;
  relatedAwardId: string | null;
  coverImage: string;
  gallery: string[];
}

export interface AwardGalleryItem {
  id: string;
  awardId: string;
  caption: string;
  url: string;
  alt: string;
  year: number;
}

export interface CertificateRecord {
  id: string;
  title: string;
  issuingBody: string;
  year: number;
  description: string;
  imageUrl: string;
  alt: string;
  verificationNote: string;
}

export interface MediaAssetRecord {
  id: string;
  originalUrl: string;
  targetAwardId: string | null;
  role: string;
  alt: string;
  caption: string;
  fileType: string;
  approvalStatus: string;
  localPath?: string;
}

export const AWARDS: AwardRecord[] = awardsData as AwardRecord[];
export const PRESS_COVERAGE: PressCoverageRecord[] = pressData as PressCoverageRecord[];
export const NEWS_ARTICLES: NewsArticleRecord[] = newsData as NewsArticleRecord[];
export const AWARD_GALLERIES: AwardGalleryItem[] = galleriesData as AwardGalleryItem[];
export const CERTIFICATES: CertificateRecord[] = certificatesData as CertificateRecord[];
export const MEDIA_ASSETS: MediaAssetRecord[] = mediaAssetsData as MediaAssetRecord[];
export const SOURCE_PROVENANCE = provenanceData;

export function getAllAwards(): AwardRecord[] {
  return [...AWARDS].sort((a, b) => b.awardYear - a.awardYear);
}

export function getAwardBySlug(slug: string): AwardRecord | undefined {
  return AWARDS.find((a) => a.slug === slug);
}

export function getFeaturedAwards(): AwardRecord[] {
  return AWARDS.filter((a) => a.featured);
}

export function getAllPressCoverage(): PressCoverageRecord[] {
  return [...PRESS_COVERAGE].sort(
    (a, b) => new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime()
  );
}

export function getAllNewsArticles(): NewsArticleRecord[] {
  return [...NEWS_ARTICLES].sort(
    (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );
}

export function getNewsArticleBySlug(slug: string): NewsArticleRecord | undefined {
  return NEWS_ARTICLES.find((n) => n.slug === slug);
}

export function getAwardGallery(awardId: string): AwardGalleryItem[] {
  return AWARD_GALLERIES.filter((g) => g.awardId === awardId);
}

export function getAllCertificates(): CertificateRecord[] {
  return [...CERTIFICATES].sort((a, b) => b.year - a.year);
}

export function getAllMediaAssets(): MediaAssetRecord[] {
  return MEDIA_ASSETS;
}


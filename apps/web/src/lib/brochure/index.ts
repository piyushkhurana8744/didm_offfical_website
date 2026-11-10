import masterModulesJson from '@/data/brochure/master-52-modules.json';
import courseComparisonJson from '@/data/brochure/course-comparison.json';
import toolsCertificationsJson from '@/data/brochure/tools-and-certifications.json';
import instituteInfoJson from '@/data/brochure/institute-information.json';
import faqKnowledgeJson from '@/data/brochure/faq-knowledge.json';
import brochureMasterJson from '@/data/brochure/didm-brochure.json';

export interface BrochureModule {
  sequenceNumber: number;
  id: string;
  originalTitle: string;
  normalizedTitle: string;
  category: string;
  chapter: string;
  sourcePage: number;
  sourceDocument: string;
  description: string;
}

export interface ComparisonFeature {
  feature: string;
  description: string;
  master: string | boolean;
  advanced: string | boolean;
  customized: string | boolean;
}

export interface CourseComparison {
  sourcePages: number[];
  sourceDocument: string;
  programs: Array<{
    id: string;
    name: string;
    subtitle: string;
    totalHours: number | string;
    inClassHours: number | string;
    onBoardHours: number | string;
    brochurePage: number;
  }>;
  features: ComparisonFeature[];
}

export interface PracticalTool {
  name: string;
  category: string;
  subtext: string;
}

export interface VeblikaTool {
  name: string;
  benefit: string;
}

export interface CertificationCategory {
  group: string;
  count: number;
  items: string[];
}

export interface ToolsAndCertifications {
  sourcePages: number[];
  sourceDocument: string;
  practicalTools: PracticalTool[];
  veblikaAutomationTools: {
    title: string;
    provider: string;
    valuation: string;
    sourcePage: number;
    tools: VeblikaTool[];
  };
  certifications: {
    totalCount: string;
    sourcePages: number[];
    categories: CertificationCategory[];
  };
}

export interface InstituteMilestone {
  year: number;
  title: string;
  detail: string;
}

export interface InstituteAward {
  year: number | string;
  organization: string;
  title: string;
  description: string;
  sourcePage: number;
}

export interface CampusLocation {
  city: string;
  name: string;
  isHeadOffice: boolean;
}

export interface InstituteInformation {
  sourcePages: number[];
  sourceDocument: string;
  name: string;
  tagline: string;
  slogan: string;
  parentEntity: string;
  agencyPartner: string;
  leadership: {
    coFounderDirector: string;
    directorMessageExcerpt: string;
    sourcePage: number;
  };
  mission: string;
  vision: string;
  milestones: InstituteMilestone[];
  statistics: Record<string, string>;
  keyAwards: InstituteAward[];
  trainingMethodology: {
    sourcePage: number;
    pillars: string[];
  };
  careerRoles: string[];
  hiringPartners: string[];
  institutionalWorkshops: Array<{
    institution: string;
    type: string;
    sourcePage: number;
  }>;
  headOffice: {
    address: string;
    phone: string;
    email: string;
    website: string;
    sourcePage: number;
  };
  campuses: CampusLocation[];
}

export interface FaqRecord {
  id: string;
  question: string;
  answer: string;
  sourcePage: number;
  sourceDocument: string;
  tags: string[];
}

/**
 * Access all 52 official modules extracted directly from Brochure Page 12 in sequence.
 */
export function getBrochureModules52(): BrochureModule[] {
  return masterModulesJson as BrochureModule[];
}

/**
 * Get module by sequence number (1-52).
 */
export function getBrochureModuleBySequence(sequence: number): BrochureModule | undefined {
  return (masterModulesJson as BrochureModule[]).find((m) => m.sequenceNumber === sequence);
}

/**
 * Get modules grouped by their curriculum chapters.
 */
export function getBrochureModulesByChapters(): Record<string, BrochureModule[]> {
  const modules = masterModulesJson as BrochureModule[];
  return modules.reduce((acc, mod) => {
    if (!acc[mod.chapter]) {
      acc[mod.chapter] = [];
    }
    acc[mod.chapter].push(mod);
    return acc;
  }, {} as Record<string, BrochureModule[]>);
}

/**
 * Get the full 16-feature course comparison matrix across Master, Advanced, and Customized tracks.
 */
export function getCourseComparison(): CourseComparison {
  return courseComparisonJson as CourseComparison;
}

/**
 * Get the tools and certifications dataset including 22 practical tools and 8 Veblika automation tools.
 */
export function getToolsAndCertifications(): ToolsAndCertifications {
  return toolsCertificationsJson as ToolsAndCertifications;
}

/**
 * Get complete institute history, mission, leadership, awards, workshops, and campus directories.
 */
export function getInstituteInformation(): InstituteInformation {
  return instituteInfoJson as InstituteInformation;
}

/**
 * Get verified FAQ knowledge base grounded directly in brochure page references.
 */
export function getFaqKnowledge(): FaqRecord[] {
  return faqKnowledgeJson as FaqRecord[];
}

/**
 * Get master brochure metadata.
 */
export function getBrochureMaster() {
  return brochureMasterJson;
}


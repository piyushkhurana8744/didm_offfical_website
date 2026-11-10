import aboutUsJson from "@/data/website/about-us.json";
import aboutTeamJson from "@/data/website/about-team.json";
import aboutFaqsJson from "@/data/website/about-faqs.json";
import aboutAchievementsJson from "@/data/website/about-achievements.json";
import aboutMediaJson from "@/data/website/about-media.json";
import aboutProvenanceJson from "@/data/website/about-source-provenance.json";

export type VerificationStatus =
  | "source_listed_unverified"
  | "independently_verified"
  | "historical_claim";

export interface FactualRecordMetadata {
  id: string;
  source_url: string;
  source_section: string;
  original_source_wording?: string;
  retrieval_date: string;
  verification_status: VerificationStatus;
  last_verified_date: string;
  editorial_review_flag: boolean;
  editorial_note?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  original_image_url: string;
  image_alt: string;
  avatar_initials: string;
  verification_status: VerificationStatus;
  editorial_review_flag: boolean;
}

export interface TeamMemberRecord extends FactualRecordMetadata {
  normalized_content: {
    name: string;
    role: string;
    department: string;
    original_image_url: string;
    image_alt: string;
    avatar_initials: string;
  };
}

export interface AboutFaq {
  id: string;
  question: string;
  answer: string;
  category: string;
  source: string;
  verification_status: VerificationStatus;
  editorial_review_flag: boolean;
}

export interface AboutFaqRecord extends FactualRecordMetadata {
  normalized_content: {
    question: string;
    answer: string;
    category: string;
  };
}

export interface InstitutionalAward {
  award: string;
  awarding_body: string;
  description: string;
  source: string;
}

export interface CorporateBrand {
  name: string;
  role: string;
  domain: string;
}

export interface AchievementRecord extends FactualRecordMetadata {
  normalized_content: any;
}

export interface AboutAchievements {
  records?: AchievementRecord[];
  year_2024: {
    title: string;
    description: string;
    milestones: string[];
  };
  institutional_recognitions: InstitutionalAward[];
  corporate_ecosystem: {
    title: string;
    brands: CorporateBrand[];
  };
  media_and_training_partnerships: Array<{
    partner: string;
    role: string;
    details: string;
    source: string;
  }>;
}

export interface TimelineMilestone {
  id: string;
  year: string;
  title: string;
  description: string;
  verification_status: VerificationStatus;
  editorial_review_flag: boolean;
}

export interface AboutUsData {
  institute_name: string;
  acronym: string;
  headline: string;
  tagline: string;
  decade_of_excellence: {
    established_year: number;
    years_completed: string;
    summary: string;
    callout: string;
  };
  timeline_milestones: TimelineMilestone[];
  core_pillars: {
    mission: {
      title: string;
      tagline: string;
      subpoints: string[];
      description: string;
    };
    vision: {
      title: string;
      tagline: string;
      subpoints: string[];
      description: string;
    };
    values: {
      title: string;
      tagline: string;
      subpoints: string[];
      description: string;
    };
  };
  pedagogy_and_methodology: {
    title: string;
    features: Array<{
      title: string;
      description: string;
    }>;
  };
  student_resources: {
    title: string;
    description: string;
    items: string[];
  };
  career_and_placement: {
    title: string;
    placement_partners_count: string;
    features: string[];
  };
  centres_list: string[];
  business_hours: {
    weekdays: string;
    weekends: string;
  };
  head_office: {
    address: string;
    phone: string;
    email: string;
  };
  provenance_metadata?: FactualRecordMetadata;
}

export interface AboutMediaCatalog {
  team_photos: Array<{
    name: string;
    role: string;
    remote_url: string;
    alt: string;
    status: string;
    local_fallback: string;
  }>;
  institutional_assets: Array<{
    id: string;
    path: string;
    alt: string;
    source: string;
  }>;
}

export interface AboutSourceProvenance {
  retrieved_at: string;
  sources: Array<{
    id: string;
    url: string;
    content_type: string;
    byte_size: number;
    sha256: string;
    title: string;
    verification_status: string;
  }>;
}

export function getAboutUsData(): AboutUsData {
  return aboutUsJson as AboutUsData;
}

export function getAboutTeamRecords(): TeamMemberRecord[] {
  return (aboutTeamJson as { team_members: TeamMemberRecord[] }).team_members;
}

export function getAboutTeam(): TeamMember[] {
  const records = getAboutTeamRecords();
  return records.map((r) => ({
    id: r.id,
    name: r.normalized_content.name,
    role: r.normalized_content.role,
    department: r.normalized_content.department,
    original_image_url: r.normalized_content.original_image_url,
    image_alt: r.normalized_content.image_alt,
    avatar_initials: r.normalized_content.avatar_initials,
    verification_status: r.verification_status,
    editorial_review_flag: r.editorial_review_flag,
  }));
}

export function getAboutFaqRecords(): AboutFaqRecord[] {
  return (aboutFaqsJson as { faqs: AboutFaqRecord[] }).faqs;
}

export function getAboutFaqs(): AboutFaq[] {
  const records = getAboutFaqRecords();
  return records.map((r) => ({
    id: r.id,
    question: r.normalized_content.question,
    answer: r.normalized_content.answer,
    category: r.normalized_content.category,
    source: r.source_url,
    verification_status: r.verification_status,
    editorial_review_flag: r.editorial_review_flag,
  }));
}

export function getAboutAchievements(): AboutAchievements {
  return aboutAchievementsJson as AboutAchievements;
}

export function getAboutMedia(): AboutMediaCatalog {
  return aboutMediaJson as AboutMediaCatalog;
}

export function getAboutProvenance(): AboutSourceProvenance {
  return aboutProvenanceJson as AboutSourceProvenance;
}

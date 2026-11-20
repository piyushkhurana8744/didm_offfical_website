export interface SyllabusTopic {
  title: string;
  duration?: string;
  summary: string;
  topics: string[];
  toolsUsed: string[];
  practicalProject: string;
}

export interface Course {
  id: string;
  slug: string;
  aliases: string[];
  name: string;
  shortName: string;
  tagline: string;
  badge?: string;
  popular?: boolean;
  duration: string;
  hours: string;
  modulesCount: string;
  certificationsCount: string;
  internship: string;
  fee: string;
  feeInstalment?: string;
  format: string;
  summary: string;
  idealFor: string[];
  keyModules: string[];
  features: string[];
  highlights: { title: string; desc: string }[];
  syllabus: SyllabusTopic[];
  /** Retained editorial draft; never shown as brochure-grounded curriculum. */
  editorialSyllabus?: SyllabusTopic[];
  faqs: { q: string; a: string }[];
  verifiedSourceUrl?: string;
}

export interface Centre {
  id: string;
  slug: string;
  aliases: string[];
  name: string;
  city: string;
  state: string;
  postalCode?: string;
  region: "Delhi" | "Noida/UP" | "Gurgaon/Haryana" | "Punjab" | "Uttarakhand" | "Maharashtra" | "Rajasthan" | "Online";
  address: string;
  landmark: string;
  metroStation?: string;
  phones: string[];
  email: string;
  batches: string[];
  rating: string;
  reviewsCount: string;
  isHeadOffice?: boolean;
  facilities: string[];
  verifiedSourceUrl?: string;
  // Canonical Location & Maps Verification Fields
  directionsUrl?: string;
  mapEmbedUrl?: string;
  googlePlaceId?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  centerStatus?: "active" | "review_needed" | "virtual";
  verificationStatus?:
    | "matches_official_and_maps_listing"
    | "needs_pin_code_confirmation"
    | "conflicting_historical_location"
    | "conflicting_historical_floor"
    | "website_pin_typo_corrected"
    | "pin_mismatch_review"
    | "needs_pin_and_active_center_confirmation"
    | "unresolved_needs_confirmation"
    | "virtual_campus";
  reviewNotes?: string[];
  lastVerifiedDate?: string;
}

export interface ReviewStory {
  id: string;
  name: string;
  role: string;
  company: string;
  package?: string;
  course: string;
  batch: string;
  category: "Job Switch" | "Fresh Graduate" | "Business Owner" | "Freelancer";
  quote: string;
  detailedStory: string;
  center: string;
}

export interface FAQItem {
  q: string;
  a: string;
  category?: string;
}

export interface RedirectRule {
  source: string;
  destination: string;
  permanent: boolean;
}


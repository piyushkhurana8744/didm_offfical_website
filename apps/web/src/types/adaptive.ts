/**
 * Canonical Type Definitions for DIDM AI-First Adaptive Homepage
 */

export type VisitorGoal =
  | "student"
  | "career_switch"
  | "business_owner"
  | "freelancer"
  | "explorer";

export type ExperienceLevel = "beginner" | "intermediate" | "practising";

export type LearningModePreference = "classroom" | "online" | "either";

export type SchedulePreference = "weekday" | "weekend" | "flexible";

export interface AdaptiveProfile {
  visitorGoal: VisitorGoal;
  experienceLevel: ExperienceLevel;
  skillInterests: string[];
  preferredLearningMode: LearningModePreference;
  preferredLocation?: string;
  schedulePreference?: SchedulePreference;
  recommendedCourseIds: string[];
  suggestedCareerPath?: string;
  confidenceLevel: number;
  lastUpdatedAt: string;
}

export interface CourseMatch {
  courseId: string;
  matchScore: number; // 0 - 100
  matchReason: string;
  highlightTag: string;
}

export interface RoadmapStep {
  stepNumber: number;
  title: string;
  duration: string;
  skillsCovered: string[];
  practicalDeliverable: string;
}

export interface HomepageAdaptation {
  heroHeadline: string;
  heroSubheading: string;
  heroBadge: string;
  featuredCourseMatches: CourseMatch[];
  roadmapTitle: string;
  roadmapSteps: RoadmapStep[];
  highlightedStoryName: string;
  suggestedBatchesFilter?: {
    mode?: LearningModePreference;
    location?: string;
  };
  primaryCta: {
    label: string;
    href: string;
    intent: "explore_course" | "compare" | "batches" | "counsellor";
  };
}

export interface ChatMessage {
  id: string;
  sender: "user" | "guide";
  text: string;
  timestamp: string;
  suggestions?: string[];
  suggestedActions?: Array<{ label: string; href: string }>;
  counsellingSuggested?: boolean;
}

export interface AIGuideRequest {
  message: string;
  history: Array<{
    role: "user" | "assistant";
    content: string;
  }>;
  currentProfile?: Partial<AdaptiveProfile>;
}

export interface AIGuideResponse {
  ok: true;
  reply: string;
  intent: "goal_identified" | "course_inquiry" | "fee_inquiry" | "batch_inquiry" | "handoff_requested" | "general_faq";
  profileUpdates: Partial<AdaptiveProfile>;
  homepageUpdates: HomepageAdaptation;
  suggestedFollowUps: string[];
  counsellingSuggested?: boolean;
}

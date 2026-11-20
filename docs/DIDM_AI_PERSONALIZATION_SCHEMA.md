# DIDM AI Personalization Schema & API Contracts

**Document:** `DIDM_AI_PERSONALIZATION_SCHEMA.md`  
**Date:** November 20, 2026  
**Status:** Canonical Data Contract Specification  

---

## 1. Typed Learner Profile State

```typescript
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
```

---

## 2. Dynamic Homepage Update Directives

```typescript
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
```

---

## 3. Server API Request & Response Contracts (`/api/ai-guide`)

### Request Payload (`POST /api/ai-guide`)
```typescript
export interface AIGuideRequest {
  message: string; // 2 - 500 characters
  history: Array<{
    role: "user" | "assistant";
    content: string;
  }>;
  currentProfile?: Partial<AdaptiveProfile>;
}
```

### Response Payload (`200 OK`)
```typescript
export interface AIGuideResponse {
  ok: true;
  reply: string;
  intent: "goal_identified" | "course_inquiry" | "fee_inquiry" | "batch_inquiry" | "handoff_requested" | "general_faq";
  profileUpdates: Partial<AdaptiveProfile>;
  homepageUpdates: HomepageAdaptation;
  suggestedFollowUps: string[];
  counsellingSuggested?: boolean;
}
```

### Error Response (`400 / 500`)
```typescript
export interface AIGuideErrorResponse {
  ok: false;
  error: string;
  fallbackReply: string;
  suggestedActions: Array<{ label: string; href: string }>;
}
```

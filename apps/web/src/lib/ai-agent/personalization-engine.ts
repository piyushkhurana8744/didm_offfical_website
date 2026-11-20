import { getAllCourses, getAllCentres } from "@/lib/content";
import { recommendCourses, discoveryCatalog } from "@/lib/student/discovery";
import { getCareerRoadmap, getApprovedFaqAnswers, getTrainingCenters } from "./agent-tools";
import { PUBLISHED_STUDENT_REFLECTIONS } from "@/lib/public/student-stories";
import type {
  AdaptiveProfile,
  VisitorGoal,
  ExperienceLevel,
  LearningModePreference,
  SchedulePreference,
  HomepageAdaptation,
  CourseMatch,
  AIGuideResponse,
} from "@/types/adaptive";

interface EngineInput {
  message: string;
  history?: Array<{ role: "user" | "assistant"; content: string }>;
  currentProfile?: Partial<AdaptiveProfile>;
}

const norm = (str: string) => str.toLowerCase().replace(/[^a-z0-9\s]+/g, " ").trim();

export function detectLanguage(text: string): "hindi" | "hinglish" | "english" {
  // Devanagari range
  if (/[\u0900-\u097F]/.test(text)) return "hindi";
  const hinglishTokens = [
    "kya", "hai", "mujhe", "karna", "chahiye", "bhai", "main", "mera", "meri", "kaunsa", "konsa",
    "paise", "fees", "kitni", "batch", "kab", "shuru", "hoga", "placement", "milega", "karein",
    "sikhaoge", "seekhna", "padhna", "noida", "delhi", "pass", "centre", "job", "lagti"
  ];
  const words = norm(text).split(/\s+/);
  const matchCount = words.filter((w) => hinglishTokens.includes(w)).length;
  if (matchCount >= 2 || (words.length <= 4 && matchCount >= 1)) return "hinglish";
  return "english";
}

export function extractProfileUpdates(
  message: string,
  existing: Partial<AdaptiveProfile> = {}
): Partial<AdaptiveProfile> {
  const m = norm(message);
  const updates: Partial<AdaptiveProfile> = {};

  // 1. Goal Detection
  if (
    m.includes("student") ||
    m.includes("college") ||
    m.includes("bcom") ||
    m.includes("bba") ||
    m.includes("bca") ||
    m.includes("graduate") ||
    m.includes("graduation") ||
    m.includes("fresher")
  ) {
    updates.visitorGoal = "student";
  } else if (
    m.includes("switch") ||
    m.includes("working") ||
    m.includes("job change") ||
    m.includes("career transition") ||
    m.includes("professional") ||
    m.includes("shift") ||
    m.includes("current job")
  ) {
    updates.visitorGoal = "career_switch";
  } else if (
    m.includes("business") ||
    m.includes("sales") ||
    m.includes("leads") ||
    m.includes("grow my brand") ||
    m.includes("startup") ||
    m.includes("entrepreneur") ||
    m.includes("revenue") ||
    m.includes("roi")
  ) {
    updates.visitorGoal = "business_owner";
  } else if (
    m.includes("freelance") ||
    m.includes("freelancer") ||
    m.includes("clients") ||
    m.includes("retainer") ||
    m.includes("upwork") ||
    m.includes("fiverr") ||
    m.includes("part time") ||
    m.includes("work from home")
  ) {
    updates.visitorGoal = "freelancer";
  } else if (
    m.includes("explore") ||
    m.includes("curious") ||
    m.includes("just checking") ||
    m.includes("what is digital marketing")
  ) {
    updates.visitorGoal = "explorer";
  }

  // 2. Experience Level
  if (m.includes("beginner") || m.includes("scratch") || m.includes("no experience") || m.includes("fresher") || m.includes("new to")) {
    updates.experienceLevel = "beginner";
  } else if (m.includes("practising") || m.includes("already know") || m.includes("working in marketing") || m.includes("experience")) {
    updates.experienceLevel = "practising";
  } else if (m.includes("basic") || m.includes("little bit") || m.includes("intermediate")) {
    updates.experienceLevel = "intermediate";
  }

  // 3. Learning Mode
  if (m.includes("online") || m.includes("zoom") || m.includes("remote") || m.includes("live class") || m.includes("gharse")) {
    updates.preferredLearningMode = "online";
  } else if (m.includes("classroom") || m.includes("offline") || m.includes("campus") || m.includes("centre") || m.includes("center") || m.includes("physical")) {
    updates.preferredLearningMode = "classroom";
  }

  // 4. Schedule Preference
  if (m.includes("weekend") || m.includes("saturday") || m.includes("sunday")) {
    updates.schedulePreference = "weekend";
  } else if (m.includes("weekday") || m.includes("regular") || m.includes("daily") || m.includes("morning") || m.includes("evening")) {
    updates.schedulePreference = "weekday";
  }

  // 5. Location Preference
  const centres = getAllCentres();
  for (const centre of centres) {
    const cName = norm(centre.name);
    const cCity = norm(centre.city);
    if (m.includes(cName) || m.includes(cCity) || (centre.id === "satya-niketan" && (m.includes("south campus") || m.includes("satya niketan")))) {
      updates.preferredLocation = centre.name;
      break;
    }
  }

  // 6. Skill Interests
  const interests: string[] = existing.skillInterests ? [...existing.skillInterests] : [];
  if (m.includes("seo") || m.includes("google search") || m.includes("rank") || m.includes("ranking")) {
    if (!interests.includes("SEO")) interests.push("SEO");
  }
  if (m.includes("ads") || m.includes("google ads") || m.includes("meta ads") || m.includes("facebook ads") || m.includes("performance marketing") || m.includes("ppc")) {
    if (!interests.includes("Performance Ads")) interests.push("Performance Ads");
  }
  if (m.includes("ai") || m.includes("chatgpt") || m.includes("artificial intelligence") || m.includes("automation")) {
    if (!interests.includes("AI Marketing")) interests.push("AI Marketing");
  }
  if (m.includes("social media") || m.includes("instagram") || m.includes("linkedin") || m.includes("youtube")) {
    if (!interests.includes("Social Media")) interests.push("Social Media");
  }
  if (m.includes("ecommerce") || m.includes("shopify") || m.includes("dropshipping") || m.includes("online store")) {
    if (!interests.includes("E-Commerce")) interests.push("E-Commerce");
  }
  if (m.includes("analytics") || m.includes("ga4") || m.includes("google analytics") || m.includes("data")) {
    if (!interests.includes("Marketing Analytics")) interests.push("Marketing Analytics");
  }
  if (interests.length > 0) {
    updates.skillInterests = interests;
  }

  return updates;
}

export function synthesizePersonalization(input: EngineInput): AIGuideResponse {
  const { message, history = [], currentProfile = {} } = input;
  const lang = detectLanguage(message);
  const profileUpdates = extractProfileUpdates(message, currentProfile);

  // Merge profile
  const mergedProfile: AdaptiveProfile = {
    visitorGoal: profileUpdates.visitorGoal || currentProfile.visitorGoal || "student",
    experienceLevel: profileUpdates.experienceLevel || currentProfile.experienceLevel || "beginner",
    skillInterests: profileUpdates.skillInterests || currentProfile.skillInterests || ["SEO", "Performance Ads", "AI Marketing"],
    preferredLearningMode: profileUpdates.preferredLearningMode || currentProfile.preferredLearningMode || "either",
    preferredLocation: profileUpdates.preferredLocation || currentProfile.preferredLocation || undefined,
    schedulePreference: profileUpdates.schedulePreference || currentProfile.schedulePreference || "flexible",
    recommendedCourseIds: [],
    confidenceLevel: profileUpdates.visitorGoal ? 95 : currentProfile.visitorGoal ? 85 : 70,
    lastUpdatedAt: new Date().toISOString(),
  };

  // Run deterministic discovery match
  const rawCourses = getAllCourses();
  const catalog = discoveryCatalog(rawCourses);
  const matched = recommendCourses(catalog, {
    goal: mergedProfile.visitorGoal === "business_owner" ? "business" : mergedProfile.visitorGoal === "career_switch" ? "specialise" : "career",
    experience: mergedProfile.experienceLevel === "practising" ? "practising" : "beginner",
    interest: mergedProfile.skillInterests.includes("AI Marketing") ? "ai" : mergedProfile.skillInterests.includes("SEO") ? "seo" : mergedProfile.skillInterests.includes("Performance Ads") ? "performance" : "all",
    mode: mergedProfile.preferredLearningMode,
    time: "extended",
  });

  const courseMatches: CourseMatch[] = matched.map((item, idx) => {
    const c = rawCourses.find((rc) => rc.id === item.course.id);
    const score = idx === 0 ? 98 : idx === 1 ? 92 : 86;
    let tag = "Recommended Fit";
    if (c?.id === "midm") tag = "Flagship 52-Stops";
    if (c?.id === "dmi") tag = "Dual AI Diploma";
    if (c?.id === "advanced") tag = "Performance Track";
    if (c?.id === "customized") tag = "Custom Fast-Track";
    if (c?.id === "online") tag = "Live Global Classroom";

    return {
      courseId: item.course.id,
      matchScore: score,
      matchReason: item.reasons[0] || "Aligned with your learning background and career aspirations.",
      highlightTag: tag,
    };
  });

  mergedProfile.recommendedCourseIds = courseMatches.map((cm) => cm.courseId);

  // Roadmap
  const roadmap = getCareerRoadmap(mergedProfile.visitorGoal, mergedProfile.experienceLevel);

  // Select verified story
  const verifiedStories = PUBLISHED_STUDENT_REFLECTIONS;
  let storyName = verifiedStories[0]?.name || "Soumya Jay";
  if (mergedProfile.visitorGoal === "student") storyName = "Soumya Jay";
  if (mergedProfile.visitorGoal === "career_switch") storyName = "Nancy Sharma";
  if (mergedProfile.visitorGoal === "business_owner") storyName = "Prateek Jain";
  if (mergedProfile.visitorGoal === "freelancer") storyName = "Sonam Aggarwal";

  // Create Homepage Updates
  let heroHeadline = "Launch Your Digital Marketing Career Before You Graduate";
  let heroSubheading = "Gain hands-on experience on live ad budgets, master 50+ modules including AI workflows, and graduate with a verified job placement portfolio.";
  let heroBadge = "STUDENT CAREER TRACK";
  let ctaText = "Explore Master in Digital Marketing (MIDM)";
  let ctaHref = "/programs/master-in-digital-marketing-course";

  if (mergedProfile.visitorGoal === "career_switch") {
    heroHeadline = "Transition into High-Growth Performance Marketing & AI Roles";
    heroSubheading = "Accelerate your career switch with practical live agency training under Online Strikers, advanced analytics, and 650+ dedicated hiring partner drives.";
    heroBadge = "CAREER TRANSITION TRACK";
    ctaText = "Explore Advanced Marketing Course";
    ctaHref = "/programs/advanced-digital-marketing-course";
  } else if (mergedProfile.visitorGoal === "business_owner") {
    heroHeadline = "Scale Your Business with Proven Digital Funnels & Real ROI";
    heroSubheading = "Stop relying on guesswork. Master high-converting Meta and Google ad funnels, local SEO maps dominance, and automated lead nurturing for your enterprise.";
    heroBadge = "BUSINESS & ENTREPRENEUR TRACK";
    ctaText = "Explore Customized Program";
    ctaHref = "/programs/customized-digital-marketing-course";
  } else if (mergedProfile.visitorGoal === "freelancer") {
    heroHeadline = "Build a High-Ticket Freelance & Agency Retainer Portfolio";
    heroSubheading = "Master high-demand performance marketing and AI client delivery. Learn proposal pitching, international retainer frameworks, and client management.";
    heroBadge = "FREELANCE & AGENCY TRACK";
    ctaText = "Explore Freelance Curriculum";
    ctaHref = "/programs/customized-digital-marketing-course";
  } else if (mergedProfile.visitorGoal === "explorer") {
    heroHeadline = "Explore the Future of Digital Marketing & Generative AI";
    heroSubheading = "Discover which digital channels fit your natural strengths. Learn live practical skills across SEO, paid media, social algorithms, and modern AI tools.";
    heroBadge = "EXPLORATION & DISCOVERY TRACK";
    ctaText = "Compare All 6 Programs";
    ctaHref = "/compare";
  }

  const homepageUpdates: HomepageAdaptation = {
    heroHeadline,
    heroSubheading,
    heroBadge,
    featuredCourseMatches: courseMatches,
    roadmapTitle: roadmap.title,
    roadmapSteps: roadmap.steps,
    highlightedStoryName: storyName,
    suggestedBatchesFilter: {
      mode: mergedProfile.preferredLearningMode,
      location: mergedProfile.preferredLocation,
    },
    primaryCta: {
      label: ctaText,
      href: ctaHref,
      intent: "explore_course",
    },
  };

  // Conversational response generation
  let reply = "";
  let intent: AIGuideResponse["intent"] = "goal_identified";
  let suggestedFollowUps: string[] = [];
  let counsellingSuggested = false;

  const mLower = message.toLowerCase();
  const isCounsellingQuery = mLower.includes("counsell") || mLower.includes("call") || mLower.includes("talk to") || mLower.includes("admission") || mLower.includes("demo");
  const isFeeQuery = mLower.includes("fee") || mLower.includes("cost") || mLower.includes("price") || mLower.includes("emi") || mLower.includes("kitna");
  const isBatchQuery = mLower.includes("batch") || mLower.includes("timing") || mLower.includes("weekend") || mLower.includes("weekday") || mLower.includes("schedule");

  if (isCounsellingQuery) {
    intent = "handoff_requested";
    counsellingSuggested = true;
    if (lang === "hindi" || lang === "hinglish") {
      reply = "Bilkul! Aap humare senior academic counsellor se 1-on-1 free counselling schedule kar sakte hain. Main aapka recommended course details aur query unhe forward kar sakta hoon.";
    } else {
      reply = "Certainly! You can schedule a free 1-on-1 career consultation with our senior admissions counsellors. I'll pass along your recommended course path so they can assist you right away.";
    }
    suggestedFollowUps = ["Request Free Callback", "Check Upcoming Batches", "View Centre Locations"];
  } else if (isFeeQuery) {
    intent = "fee_inquiry";
    counsellingSuggested = true;
    if (lang === "hindi" || lang === "hinglish") {
      reply = "DIDM mein flexible 0% interest EMI options aur merit-based scholarships available hain. Course aur batch format ke hisaab se fees vary karti hai. Kya aapko fee structure aur batch timings ke liye admissions team se callback chahiye?";
    } else {
      reply = "DIDM offers flexible zero-interest EMI plans and merit installment options. Fees depend on whether you opt for classroom or live online format. Would you like our admissions advisor to share the detailed fee breakdown?";
    }
    suggestedFollowUps = ["Request Detailed Fee Structure", "Explore Scholarship Options", "Upcoming Weekend Batches"];
  } else if (isBatchQuery) {
    intent = "batch_inquiry";
    if (lang === "hindi" || lang === "hinglish") {
      reply = "Humare regular weekday (Mon–Fri) aur working professionals ke liye special weekend (Sat–Sun) batches har hafte shuru hote hain. Classroom aur live online dono options uplabdh hain.";
    } else {
      reply = "We run flexible weekday cohorts (morning & evening slots) and dedicated weekend batches for working professionals across all 14 campuses and our live online campus.";
    }
    suggestedFollowUps = ["View Upcoming Batch Dates", "Find Nearest Campus", "Book Free Demo Session"];
  } else {
    // Goal identified or general query
    if (lang === "hindi" || lang === "hinglish") {
      if (mergedProfile.visitorGoal === "student") {
        reply = "Badhiya! Ek college student ke roop mein practical digital marketing aur AI tools seekhna aapke resume ko sabse aage rakhega. Maine homepage par aapke liye **Master in Digital Marketing (MIDM)** aur **52-Module Roadmap** personalize kar diya hai.";
      } else if (mergedProfile.visitorGoal === "career_switch") {
        reply = "Great move! Marketing aur AI roles mein transition ke liye live ad budgets aur analytics ka hands-on experience zaroori hai. Maine homepage ko aapke career transition ke anusaar customize kar diya hai.";
      } else if (mergedProfile.visitorGoal === "business_owner") {
        reply = "Ek business owner ke liye profitable funnels aur Google Maps dominance sabse high-ROI investment hai. Aapke liye customized entrepreneur curriculum homepage par highlight kar diya gaya hai.";
      } else if (mergedProfile.visitorGoal === "freelancer") {
        reply = "Freelancing aur high-ticket client retainers ke liye performance marketing aur agency delivery key skills hain. Maine aapke liye freelance career path aur client acquisition roadmap update kar diya hai.";
      } else {
        reply = "Digital marketing mein bohot saare exciting career options hain—SEO, Paid Ads, Social Media aur AI Workflows. Maine aapke anusaar homepage recommendations set kar diye hain.";
      }
    } else {
      if (mergedProfile.visitorGoal === "student") {
        reply = "Fantastic! As a student, mastering real-world digital marketing and AI workflows gives you an undeniable edge before graduation. I've tailored the homepage to showcase our flagship **MIDM 52-Module Roadmap** and placement support.";
      } else if (mergedProfile.visitorGoal === "career_switch") {
        reply = "A high-growth decision! Transitioning into performance marketing requires hands-on experience with live ad accounts and GA4 analytics. I've updated the homepage with the optimal transition track.";
      } else if (mergedProfile.visitorGoal === "business_owner") {
        reply = "Smart move. Scaling customer acquisition and dominating local search will dramatically lower your cost per lead. I've highlighted our customized business growth track on the homepage.";
      } else if (mergedProfile.visitorGoal === "freelancer") {
        reply = "Freelancing allows you to build recurring client retainers worldwide. I've aligned the homepage recommendations to our client acquisition and performance campaign roadmap.";
      } else {
        reply = "Digital marketing combines strategy, creative storytelling, and cutting-edge AI tools. I've personalized the course directory to help you explore what matches your interests.";
      }
    }

    suggestedFollowUps = [
      "Tell me about 100% placement support",
      "Which tools are covered?",
      "Nearest branch in Delhi NCR",
      "Book Free 1-on-1 Counselling"
    ];
  }

  return {
    ok: true,
    reply,
    intent,
    profileUpdates,
    homepageUpdates,
    suggestedFollowUps,
    counsellingSuggested,
  };
}

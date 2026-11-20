import { getAllCourses, getAllCentres } from "@/lib/content";
import { getBrochureModules52 } from "@/lib/brochure";
import { CAREER_PATHS } from "@/lib/student/discovery";
import { PUBLISHED_STUDENT_REFLECTIONS } from "@/lib/public/student-stories";
import { getAboutFaqs } from "@/lib/website";
import { SITE_DATA } from "@/data/site-data";
import type { RoadmapStep } from "@/types/adaptive";

/**
 * 1. Search Approved Published Courses
 */
export function searchPublishedCourses(query = "", mode?: string) {
  const courses = getAllCourses();
  const q = query.toLowerCase().trim();

  return courses.filter((course) => {
    const matchesQuery =
      !q ||
      course.name.toLowerCase().includes(q) ||
      course.shortName.toLowerCase().includes(q) ||
      course.summary.toLowerCase().includes(q) ||
      course.keyModules.some((m) => m.toLowerCase().includes(q));

    const matchesMode =
      !mode ||
      mode === "either" ||
      (mode === "online" && course.id === "online") ||
      (mode === "classroom" && course.id !== "online");

    return matchesQuery && matchesMode;
  });
}

/**
 * 2. Get Comprehensive Course Details
 */
export function getCourseDetails(courseId: string) {
  const courses = getAllCourses();
  const course = courses.find((c) => c.id === courseId || c.slug === courseId);
  if (!course) return null;

  const toolsCovered = Array.from(
    new Set(course.syllabus?.flatMap((s) => s.toolsUsed || []) || [])
  ).slice(0, 15);

  return {
    id: course.id,
    name: course.name,
    shortName: course.shortName,
    slug: course.slug,
    duration: course.duration,
    format: course.format,
    summary: course.summary,
    keyModules: course.keyModules,
    modulesCount: course.modulesCount,
    toolsCovered,
    certificationsCount: course.certificationsCount,
    fee: course.fee,
  };
}

/**
 * 3. Get Verified Physical Training Campuses
 */
export function getTrainingCenters(region?: string) {
  const centres = getAllCentres();
  if (!region) return centres;
  const regNorm = region.toLowerCase();
  return centres.filter(
    (c) =>
      c.city.toLowerCase().includes(regNorm) ||
      c.name.toLowerCase().includes(regNorm) ||
      c.address.toLowerCase().includes(regNorm)
  );
}

/**
 * 4. Get Approved FAQs
 */
export function getApprovedFaqAnswers(topic: string) {
  const t = topic.toLowerCase();
  const websiteFaqs = getAboutFaqs();
  const staticFaqs = SITE_DATA.faqs || [];

  const combined = [
    ...websiteFaqs.map((f) => ({ question: f.question, answer: f.answer })),
    ...staticFaqs.map((f) => ({ question: f.q, answer: f.a })),
  ];

  const matched = combined.filter(
    (f) =>
      f.question.toLowerCase().includes(t) ||
      f.answer.toLowerCase().includes(t)
  );

  return matched.slice(0, 3);
}

/**
 * 5. Get Verified Student Stories & Reflections
 */
export function getVerifiedStudentStories(category?: string) {
  const stories = PUBLISHED_STUDENT_REFLECTIONS;
  if (!category) return stories;
  return stories.filter(
    (s) =>
      s.quote.toLowerCase().includes(category.toLowerCase()) ||
      s.name.toLowerCase().includes(category.toLowerCase())
  );
}

/**
 * 6. Get Grounded Career Roadmap by Visitor Goal
 */
export function getCareerRoadmap(goal: string, experience = "beginner"): { title: string; steps: RoadmapStep[] } {
  switch (goal) {
    case "student":
      return {
        title: "Campus to High-Growth Corporate Marketer Roadmap",
        steps: [
          {
            stepNumber: 1,
            title: "Digital Marketing Foundations & Strategy",
            duration: "Weeks 1–3",
            skillsCovered: ["Marketing Strategy", "WordPress CMS", "Copywriting & Creative Design"],
            practicalDeliverable: "Launch your personal branding website with custom blog architecture.",
          },
          {
            stepNumber: 2,
            title: "Search & Visibility Engineering",
            duration: "Weeks 4–7",
            skillsCovered: ["Technical SEO", "Google Search Console", "Semrush Keyword Mapping"],
            practicalDeliverable: "Execute a full technical on-page audit on a live business domain.",
          },
          {
            stepNumber: 3,
            title: "Paid Media & Performance Funnels",
            duration: "Weeks 8–11",
            skillsCovered: ["Google Search & PMax Ads", "Meta Ads Manager", "Conversion Funnels"],
            practicalDeliverable: "Deploy a live Meta & Google Ads campaign with budget & conversion tracking.",
          },
          {
            stepNumber: 4,
            title: "Analytics, Automation & AI Marketing",
            duration: "Weeks 12–14",
            skillsCovered: ["Google Analytics 4 (GA4)", "ChatGPT & Claude Prompting", "Make.com Automation"],
            practicalDeliverable: "Build an automated Looker Studio executive dashboard with GA4 events.",
          },
          {
            stepNumber: 5,
            title: "Live Agency Capstone & Placement Prep",
            duration: "Weeks 15–16",
            skillsCovered: ["Online Strikers Agency Floor", "ATS Resume", "Mock Technical Interviews"],
            practicalDeliverable: "Defend your capstone portfolio with verified ROI metrics to placement council.",
          },
        ],
      };

    case "career_switch":
      return {
        title: "Professional Career Transition to Performance Marketing & AI",
        steps: [
          {
            stepNumber: 1,
            title: "Core Domain Realignment & Tech Stack",
            duration: "Weeks 1–2",
            skillsCovered: ["Digital Ecosystem", "Funnel Architecture", "Canva & WordPress"],
            practicalDeliverable: "Analyze competitor marketing channels and formulate a go-to-market plan.",
          },
          {
            stepNumber: 2,
            title: "Data-Driven Performance Advertising",
            duration: "Weeks 3–6",
            skillsCovered: ["Meta Ads Scaling", "Google Search & Shopping Ads", "Audience Retargeting"],
            practicalDeliverable: "Manage a live client campaign budget with ROAS and CPL optimization.",
          },
          {
            stepNumber: 3,
            title: "Search Engine Optimization & Authority",
            duration: "Weeks 7–10",
            skillsCovered: ["Semantic SEO", "Backlink Architecture", "Local SEO Maps"],
            practicalDeliverable: "Rank a targeted high-intent keyword in Google Top 10 search results.",
          },
          {
            stepNumber: 4,
            title: "AI Workflows & Growth Hacking",
            duration: "Weeks 11–13",
            skillsCovered: ["Generative AI Ads", "CRM Workflows", "GA4 Attribution Models"],
            practicalDeliverable: "Automate an end-to-end multi-channel lead nurture workflow.",
          },
          {
            stepNumber: 5,
            title: "Executive Portfolio & Senior Placement Drives",
            duration: "Weeks 14–16",
            skillsCovered: ["Live Client SOW Defense", "Senior Interview Case Studies", "650+ Corporate Partners"],
            practicalDeliverable: "Attend dedicated MNC hiring drives with your verified performance portfolio.",
          },
        ],
      };

    case "business_owner":
      return {
        title: "Business Growth & High-ROI Customer Acquisition Roadmap",
        steps: [
          {
            stepNumber: 1,
            title: "Business Market Positioning & Offer Design",
            duration: "Week 1",
            skillsCovered: ["Customer Avatar Mapping", "Value Proposition", "Competitor Reverse Engineering"],
            practicalDeliverable: "Draft your complete commercial digital marketing strategy document.",
          },
          {
            stepNumber: 2,
            title: "High-Converting Sales Funnel & Landing Page",
            duration: "Weeks 2–3",
            skillsCovered: ["WordPress & Elementor", "Conversion Copywriting", "Lead Capture Integration"],
            practicalDeliverable: "Launch a conversion-optimized sales landing page for your actual business.",
          },
          {
            stepNumber: 3,
            title: "Targeted Paid Customer Acquisition",
            duration: "Weeks 4–7",
            skillsCovered: ["Google Search & Maps Ads", "Meta Lead Gen Ads", "Remarketing Campaigns"],
            practicalDeliverable: "Set up and execute profitable customer acquisition ads for your products/services.",
          },
          {
            stepNumber: 4,
            title: "Local Dominance & Organic Search Authority",
            duration: "Weeks 8–10",
            skillsCovered: ["Google Business Profile Ranking", "Local SEO Citations", "Review Management"],
            practicalDeliverable: "Rank your business in the Google Maps 3-Pack for local customer queries.",
          },
          {
            stepNumber: 5,
            title: "Automation, Retention & Agency Delegation",
            duration: "Weeks 11–12",
            skillsCovered: ["WhatsApp & Email Sequences", "Vendor/Agency Audit Framework", "Looker Studio KPI Dashboard"],
            practicalDeliverable: "Automate 24/7 lead response and establish KPI metrics to hold agencies accountable.",
          },
        ],
      };

    case "freelancer":
      return {
        title: "Freelance Digital Marketer & High-Ticket Retainer Roadmap",
        steps: [
          {
            stepNumber: 1,
            title: "High-Demand Skill Selection & Positioning",
            duration: "Weeks 1–3",
            skillsCovered: ["Technical SEO", "Performance Ads", "Offer Packaging"],
            practicalDeliverable: "Create a focused freelance service menu with tiered monthly retainer pricing.",
          },
          {
            stepNumber: 2,
            title: "Proof of Concept & Live Client Projects",
            duration: "Weeks 4–8",
            skillsCovered: ["Online Strikers Agency Accounts", "Client SOWs", "Reporting Dashboards"],
            practicalDeliverable: "Complete two verified live client projects with documented traffic/lead gains.",
          },
          {
            stepNumber: 3,
            title: "Portfolio Development & Case Studies",
            duration: "Weeks 9–11",
            skillsCovered: ["Case Study Framework", "Client Video Testimonials", "Cold Outreach Pitching"],
            practicalDeliverable: "Launch your agency/freelancer portfolio website with verified client proof.",
          },
          {
            stepNumber: 4,
            title: "Inbound Client Acquisition & International Platforms",
            duration: "Weeks 12–14",
            skillsCovered: ["LinkedIn Inbound Strategy", "Upwork & Fiverr Optimization", "Proposal Writing"],
            practicalDeliverable: "Submit high-converting proposals to international and domestic clients.",
          },
          {
            stepNumber: 5,
            title: "Scaling Retainers & Agency Automation",
            duration: "Weeks 15–16",
            skillsCovered: ["Contract Drafting", "Recurring Invoicing", "AI-Powered Tool Automation"],
            practicalDeliverable: "Secure your first ₹30,000–₹50,000/month recurring client retainer.",
          },
        ],
      };

    default:
      return {
        title: "Comprehensive Digital Marketing & AI Mastery Roadmap",
        steps: [
          {
            stepNumber: 1,
            title: "Exploration & Foundation",
            duration: "Weeks 1–3",
            skillsCovered: ["Digital Marketing Principles", "Website Design", "Content & Social Channels"],
            practicalDeliverable: "Build an active online web presence with analytics tracking.",
          },
          {
            stepNumber: 2,
            title: "Organic Search & Local Visibility",
            duration: "Weeks 4–7",
            skillsCovered: ["On-Page & Off-Page SEO", "Google Search Console", "Google Maps Listing"],
            practicalDeliverable: "Execute an end-to-end SEO audit and ranking strategy.",
          },
          {
            stepNumber: 3,
            title: "Paid Advertising & Media Buying",
            duration: "Weeks 8–11",
            skillsCovered: ["Google Ads Suite", "Meta Ads Manager", "Conversion Tracking"],
            practicalDeliverable: "Run a live ad campaign and calculate ROI and cost per acquisition.",
          },
          {
            stepNumber: 4,
            title: "AI Tools & Marketing Automation",
            duration: "Weeks 12–14",
            skillsCovered: ["Generative AI Tools", "GA4 Advanced Metrics", "Workflow Automation"],
            practicalDeliverable: "Build automated marketing workflows combining AI with analytics.",
          },
          {
            stepNumber: 5,
            title: "Portfolio Defense & Career Certification",
            duration: "Weeks 15–16",
            skillsCovered: ["Capstone Project", "30+ Global Certifications", "Career Advisory"],
            practicalDeliverable: "Earn official DIDM & global partner certifications with verified capstone.",
          },
        ],
      };
  }
}

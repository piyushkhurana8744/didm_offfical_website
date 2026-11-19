import type { Course } from "../../types/content";

export type DiscoveryCourse = Pick<Course,"id"|"slug"|"name"|"shortName"|"summary"|"keyModules">;
export function discoveryCatalog(courses: Course[]): DiscoveryCourse[] {
  return courses.map(({id,slug,name,shortName,summary,keyModules})=>({id,slug,name,shortName,summary,keyModules}));
}

export type LearnerProfile = {
  goal: "career" | "business" | "specialise";
  experience: "beginner" | "practising";
  interest: "all" | "seo" | "performance" | "content" | "ai";
  mode: "classroom" | "online" | "either";
  time: "focused" | "extended";
};
export const DEFAULT_PROFILE: LearnerProfile = { goal: "career", experience: "beginner", interest: "all", mode: "either", time: "extended" };

/** Transparent catalog matching. No external model, personal data, or admissions decision. */
export function recommendCourses(courses: DiscoveryCourse[], profile: LearnerProfile) {
  return courses.map(course => {
    let score = 0;
    const reasons: string[] = [];
    const add = (points: number, reason: string) => { score += points; reasons.push(reason); };
    if (profile.goal === "career" && course.id === "midm") add(6, "A broad curriculum for exploring a digital marketing career.");
    if (profile.goal === "career" && profile.time === "extended" && course.id === "dmi") add(5, "A wider marketing and AI pathway to discuss with your counsellor.");
    if (profile.goal === "business" && course.id === "customized") add(8, "A focused track to discuss around your business goals.");
    if (profile.goal === "specialise" && course.id === "advanced") add(6, "A practical option for extending your existing marketing toolkit.");
    if (profile.experience === "beginner" && course.id === "midm") add(3, "Foundational topics lead into practical marketing modules.");
    if (profile.experience === "practising" && course.id === "advanced") add(3, "Build on the marketing experience you already have.");
    if (profile.interest === "ai" && course.id === "gen-ai-knowledge-camp") add(8, "The catalog includes a dedicated generative AI learning option.");
    if (profile.interest !== "all" && `${course.keyModules.join(" ")} ${course.summary}`.toLowerCase().includes(profile.interest === "performance" ? "ads" : profile.interest === "ai" ? "ai" : profile.interest)) add(2, `Its catalog covers your interest in ${profile.interest === "seo" ? "SEO" : profile.interest === "ai" ? "AI" : profile.interest + " marketing"}.`);
    if (profile.mode === "online" && course.id === "online") add(9, "A dedicated online course matches your preferred learning mode.");
    if (profile.time === "focused" && ["advanced", "customized", "gen-ai-knowledge-camp"].includes(course.id)) add(3, "Explore this focused option and confirm the study commitment with admissions.");
    if (!reasons.length) reasons.push("An alternative from the existing DIDM course catalog.");
    return { course, score, reasons };
  }).sort((a,b) => b.score - a.score || a.course.id.localeCompare(b.course.id)).slice(0,3);
}

export const CAREER_PATHS = [
  { id: "seo", title: "SEO specialist", courseId: "midm", skills: ["Search intent & keyword research", "Technical and on-page SEO", "Measurement & reporting"], projects: ["Map a topic cluster for a small business", "Audit a website and prioritise fixes", "Build a Search Console reporting plan"] },
  { id: "performance", title: "Performance marketer", courseId: "advanced", skills: ["Campaign structure & audiences", "Creative testing & landing pages", "Conversion tracking & optimisation"], projects: ["Write a campaign brief with a clear objective", "Create an ad and landing-page test plan", "Explain cost per lead and conversion rate"] },
  { id: "social", title: "Social media marketer", courseId: "midm", skills: ["Audience research & positioning", "Content calendars & community", "Social performance analysis"], projects: ["Develop a brand voice guide", "Plan a two-week content calendar", "Present a social channel audit"] },
  { id: "content", title: "Content strategist", courseId: "customized", skills: ["Research & editorial planning", "Search-led content & storytelling", "Responsible AI-assisted drafting"], projects: ["Create an editorial brief", "Draft and fact-check a campaign article", "Design a content measurement framework"] },
  { id: "analytics", title: "Marketing analyst", courseId: "advanced", skills: ["Measurement plans & GA4 concepts", "Funnel analysis & attribution", "Reporting & experimentation"], projects: ["Define a conversion measurement plan", "Build a sample funnel report", "Explain an experiment and its limitations"] },
  { id: "freelance", title: "Freelance marketer", courseId: "customized", skills: ["Service positioning & proposals", "Campaign delivery & reporting", "Client communication & scope"], projects: ["Write a scoped service proposal", "Create a sample client campaign plan", "Present a portfolio case study"] },
] as const;

export const SKILL_QUESTIONS = [
  { skill: "SEO", question: "What should a page answer first?", options: ["The searcher's intent", "Every possible keyword", "Only the brand's history"], correct: 0, why: "Useful pages answer the reason behind a search, then support that answer with clear structure." },
  { skill: "Paid media", question: "An ad gets clicks but few enquiries. What is a useful next check?", options: ["Double the budget immediately", "Check the landing page and conversion tracking", "Stop measuring enquiries"], correct: 1, why: "Check the path after the click and verify tracking before deciding whether to spend more." },
  { skill: "Content", question: "What is a responsible use of AI when writing marketing content?", options: ["Publish every generated claim", "Invent reviews to build trust", "Use it for a draft, then verify claims and edit"], correct: 2, why: "Human review, factual checks and brand judgment remain essential." },
  { skill: "Analytics", question: "A campaign has 200 visits and 10 enquiries. What is its enquiry conversion rate?", options: ["5%", "20%", "0.5%"], correct: 0, why: "10 divided by 200, multiplied by 100, gives a 5% enquiry conversion rate." },
] as const;

export function simulateFunnel(budget: number, cpc: number, conversionRate: number) {
  const visits = cpc > 0 ? Math.floor(Math.max(0,budget) / cpc) : 0;
  const enquiries = Math.floor(visits * Math.min(100,Math.max(0,conversionRate)) / 100);
  return { visits, enquiries, costPerEnquiry: enquiries > 0 ? budget / enquiries : null };
}

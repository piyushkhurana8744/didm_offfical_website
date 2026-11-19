export type WorldKind =
  | "campus"
  | "performance"
  | "ai"
  | "virtual"
  | "journey"
  | "timeline"
  | "discovery";
export interface SceneStop {
  id: string;
  name: string;
  description: string;
  href: string;
  position: [number, number, number];
  color: string;
  image?: string;
}
export const CAMPUS_LABS: SceneStop[] = [
  {
    id: "seo-lab",
    name: "SEO Lab",
    description:
      "Explore search intent, website structure and on-page optimization in the MIDM curriculum.",
    href: "/programs/master-in-digital-marketing-course",
    position: [-5.5, 0, -2.6],
    color: "#c38a3e",
  },
  {
    id: "social-studio",
    name: "Social Media Studio",
    description:
      "Discover content planning, social media optimization and creative production.",
    href: "/programs/master-in-digital-marketing-course",
    position: [-5, 0, 3.4],
    color: "#c56772",
  },
  {
    id: "ads-centre",
    name: "Advertising Lab",
    description:
      "Explore Google Ads, audience selection and campaign structure in the Advanced course.",
    href: "/programs/advanced-digital-marketing-course",
    position: [5, 0, 3.4],
    color: "#487c9a",
  },
  {
    id: "ai-lab",
    name: "AI Innovation Lab",
    description:
      "Explore prompts, creative workflows and responsible review of generated marketing content.",
    href: "/programs/gen-ai-knowledge-camp",
    position: [5.5, 0, -2.6],
    color: "#8676ac",
  },
  {
    id: "analytics-observatory",
    name: "Analytics Lab",
    description:
      "Discover measurement, Google Analytics 4 and reporting in the MIDM curriculum.",
    href: "/programs/master-in-digital-marketing-course",
    position: [0, 0, -5.2],
    color: "#4a8d78",
  },
];
export const WORKSPACE_STOPS: Record<string, SceneStop[]> = {
  performance: [
    ["brief", "Campaign brief", "Define the audience and campaign objective."],
    ["creative", "Creative desk", "Plan ad copy and creative formats."],
    ["measure", "Measurement", "Explore conversion events and reporting."],
  ].map(([id, name, description], i) => ({
    id,
    name,
    description,
    href: "/programs/advanced-digital-marketing-course#modules",
    position: [(i - 1) * 3.5, 0, 0] as [number, number, number],
    color: ["#b52828", "#487c9a", "#4a8d78"][i],
  })),
  ai: [
    [
      "prompt",
      "Prompt design",
      "Give a model context, instructions and a clear output format.",
    ],
    [
      "generate",
      "Creative workflow",
      "Explore AI-assisted content ideas and drafting.",
    ],
    [
      "review",
      "Human review",
      "Review accuracy, brand voice and suitability before publishing.",
    ],
  ].map(([id, name, description], i) => ({
    id,
    name,
    description,
    href: "/programs/gen-ai-knowledge-camp#syllabus",
    position: [(i - 1) * 3.5, 0, 0] as [number, number, number],
    color: ["#b52828", "#8676ac", "#4a8d78"][i],
  })),
  virtual: [
    [
      "class",
      "Live classroom",
      "Explore the live online course options and training format.",
    ],
    [
      "practice",
      "Practice desk",
      "Learn through practical digital marketing modules.",
    ],
    [
      "support",
      "Learning support",
      "Find course information and speak to an admissions advisor.",
    ],
  ].map(([id, name, description], i) => ({
    id,
    name,
    description,
    href: "/programs/online-digital-marketing-course#modules",
    position: [(i - 1) * 3.5, 0, 0] as [number, number, number],
    color: ["#b52828", "#487c9a", "#4a8d78"][i],
  })),
};
export function pathPoint(i: number, count: number): [number, number, number] {
  const t = count <= 1 ? 0 : i / (count - 1);
  return [-6 + t * 12, 0, Math.sin(t * Math.PI * 2) * 2.4];
}

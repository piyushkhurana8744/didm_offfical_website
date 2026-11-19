"use client";
import { useState } from "react";
import { ImmersiveScene } from "./ImmersiveScene";
import { Accessible3DNavigation } from "./Accessible3DNavigation";
import {
  WORKSPACE_STOPS,
  pathPoint,
  type SceneStop,
  type WorldKind,
} from "./scene-data";
import { DIDM_MEDIA } from "@/data/didm-media";
const DISCOVERY_STOPS: SceneStop[] = [
  DIDM_MEDIA.noidaCentre,
  DIDM_MEDIA.meerutCentre,
  DIDM_MEDIA.haldwaniCentre,
].map((photo, i) => ({
  id: ["noida", "meerut", "haldwani-rudarpur"][i],
  name: ["Noida", "Meerut", "Haldwani–Rudrapur"][i],
  description: photo.alt,
  href: `/centres/${["noida", "meerut", "haldwani-rudarpur"][i]}`,
  position: [(i - 1) * 4, 0, 0],
  color: "#b52828",
  image: photo.path,
}));
const HISTORY: SceneStop[] = [
  {
    id: "foundation",
    name: "2014 · Foundation",
    description: "DIDM was established in 2014.",
    href: "/about",
    position: [-5, 0, 0],
    color: "#b52828",
  },
  {
    id: "awards",
    name: "2021 · Recognition",
    description:
      "International Fame Award and WASME SME Excellence Award are included in DIDM’s published recognitions.",
    href: "/certifications",
    position: [0, 0, -1.2],
    color: "#c38a3e",
  },
  {
    id: "community",
    name: "2026 · Team gathering",
    description:
      "Explore the original 2026 annual team meet photography on this page.",
    href: "/about",
    position: [5, 0, 0],
    color: "#4a8d78",
  },
];
const CAREER: SceneStop[] = [
  {
    id: "learn",
    name: "Learn",
    description:
      "Explore the digital marketing curriculum and build a foundation in search, content and campaigns.",
    href: "/programs",
    position: [-5, 0, 0],
    color: "#b52828",
  },
  {
    id: "portfolio",
    name: "Build a portfolio",
    description:
      "Practise your skills and develop work you can explain in interviews.",
    href: "/programs/master-in-digital-marketing-course",
    position: [0, 0, -1.2],
    color: "#c38a3e",
  },
  {
    id: "career",
    name: "Explore opportunities",
    description:
      "Explore DIDM’s career support and placement information. Employment outcomes depend on individual skills and hiring decisions.",
    href: "/outcomes",
    position: [5, 0, 0],
    color: "#4a8d78",
  },
];
const labels: Record<string, [string, string]> = {
  performance: [
    "Performance marketing studio",
    "Explore the campaign brief, creative desk and measurement workspace. Screens illustrate learning concepts, without campaign results.",
  ],
  ai: [
    "AI innovation lab",
    "Move from prompt context to creative exploration and human review. Choose a workstation to learn more.",
  ],
  virtual: [
    "Your virtual learning studio",
    "Discover a live classroom, practical workstations and learning support.",
  ],
  timeline: [
    "The DIDM institutional journey",
    "Explore milestones already documented in DIDM’s institutional content.",
  ],
  discovery: [
    "Discover our real campuses",
    "Original DIDM photographs in a spatial gallery. Choose a photograph to explore that centre.",
  ],
  journey: [
    "Your one-year learning journey",
    "Explore the course’s published learning stages in their original sequence.",
  ],
  career: [
    "From learning to opportunity",
    "Explore skills, portfolio development and career support.",
  ],
};
export function ProgramWorld({
  kind = "performance",
  stops: custom,
  title,
  description,
  compact = false,
}: {
  kind?: WorldKind | "career";
  stops?: SceneStop[];
  title?: string;
  description?: string;
  compact?: boolean;
}) {
  const [active, setActive] = useState<string | null>(null);
  const stops =
    custom ??
    (kind === "discovery"
      ? DISCOVERY_STOPS
      : kind === "timeline"
        ? HISTORY
        : kind === "career"
          ? CAREER
          : (WORKSPACE_STOPS[kind] ?? []));
  const [heading, copy] = labels[kind] ?? labels.performance;
  return (
    <section
      className={`program-world ${compact ? "program-world-compact" : ""}`}
      aria-label={title ?? heading}
    >
      <div className="program-world-heading">
        <div>
          <span>THE DIDM LEARNING EXPERIENCE</span>
          <h2>{title ?? heading}</h2>
          <p>{description ?? copy}</p>
        </div>
        <span>EXPLORE ↗</span>
      </div>
      <ImmersiveScene
        kind={kind === "career" ? "timeline" : kind}
        stops={stops}
        active={active}
        onSelect={setActive}
      />
      <Accessible3DNavigation
        stops={stops}
        active={active}
        onSelect={setActive}
      />
    </section>
  );
}
export function CourseStagesWorld({
  stages,
}: {
  stages: { title: string; summary: string }[];
}) {
  const stops: SceneStop[] = stages.map((stage, i) => ({
    id: `stage-${i + 1}`,
    name: stage.title,
    description: stage.summary,
    href: "#syllabus",
    position: pathPoint(i, stages.length),
    color: ["#b52828", "#487c9a", "#4a8d78", "#c38a3e", "#8676ac", "#c56772"][
      i % 6
    ],
  }));
  return <ProgramWorld kind="journey" stops={stops} />;
}

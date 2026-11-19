"use client";
// Compatibility export for existing callers. All scene content uses the shared campus.
import { CAMPUS_LABS } from "./scene-data";
import { LearningCampusScene } from "./LearningCampusScene";
export const LAB_DESTINATIONS = CAMPUS_LABS.map((l) => ({
  ...l,
  category: "Digital marketing learning lab",
  color: l.color,
  accentColor: l.color,
  courseSlug: l.href.split("/").pop()!,
}));
export type LabDestination = (typeof LAB_DESTINATIONS)[number];
export function CampusEnvironment({
  activePortal,
  onSelectPortal,
}: {
  activePortal: string | null;
  onSelectPortal: (id: string) => void;
}) {
  return (
    <LearningCampusScene
      active={activePortal}
      onSelect={onSelectPortal}
      onHover={() => {}}
    />
  );
}

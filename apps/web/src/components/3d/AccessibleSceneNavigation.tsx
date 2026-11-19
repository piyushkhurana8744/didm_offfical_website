"use client";
import { Accessible3DNavigation } from "./Accessible3DNavigation";
import { CAMPUS_LABS } from "./scene-data";
export function AccessibleSceneNavigation({
  activePortal,
  onSelectPortal,
}: {
  activePortal: string | null;
  onSelectPortal: (id: string | null) => void;
}) {
  return (
    <Accessible3DNavigation
      stops={CAMPUS_LABS}
      active={activePortal}
      onSelect={onSelectPortal}
    />
  );
}

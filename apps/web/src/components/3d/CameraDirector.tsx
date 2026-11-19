"use client";
import { CinematicCamera } from "./SceneRuntime";
import { CAMPUS_LABS } from "./scene-data";
export function CameraDirector({
  activePortal,
}: {
  activePortal: string | null;
  scrollProgress?: number;
  enableManualOrbit?: boolean;
}) {
  return (
    <CinematicCamera
      kind="campus"
      selected={CAMPUS_LABS.find((l) => l.id === activePortal)}
    />
  );
}

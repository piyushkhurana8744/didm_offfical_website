"use client";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { LearningCampusScene } from "./LearningCampusScene";
import { ProgramWorldScene } from "./ProgramWorldScene";
import {
  CinematicCamera,
  SceneVisibilityMonitor,
  SceneQualityController,
} from "./SceneRuntime";
import type { RefObject } from "react";
import type { SceneStop, WorldKind } from "./scene-data";
export function LearningUniverseCanvas({
  kind,
  stops,
  activePortal,
  onSelectPortal,
  onHover,
  visible,
  host,
  quality,
  onReady,
  onFailure,
  progressIndex,
}: {
  kind: WorldKind;
  stops: SceneStop[];
  activePortal: string | null;
  onSelectPortal: (id: string) => void;
  onHover: (id: string | null) => void;
  visible: boolean;
  host: RefObject<HTMLDivElement | null>;
  quality: "mobile" | "desktop";
  onReady: () => void;
  onFailure: (reason: string) => void;
  progressIndex?: number;
}) {
  return (
    <Canvas
      shadows={quality === "desktop"}
      dpr={quality === "mobile" ? 1 : 1.35}
      camera={{
        position: kind === "campus" ? [17, 18, 24] : [13, 15, 20],
        fov: 36,
        near: 0.1,
        far: 120,
      }}
      frameloop={visible ? "always" : "never"}
      gl={{
        antialias: quality === "desktop",
        alpha: true,
        powerPreference: "default",
      }}
      onCreated={({ gl }) => {
        gl.setClearColor("#eee8db", 0);
        const context = gl.getContext();
        const ext = context.getExtension("WEBGL_debug_renderer_info");
        if (host.current)
          host.current.dataset.renderer = ext
            ? String(context.getParameter(ext.UNMASKED_RENDERER_WEBGL))
            : "unavailable";
        const c = gl.domElement;
        const lost = (e: Event) => {
          e.preventDefault();
          onFailure(
            "The graphics context was lost. The still preview is available.",
          );
        };
        c.addEventListener("webglcontextlost", lost, { once: true });
      }}
      fallback={<span>3D is unavailable in this browser.</span>}
    >
      <ambientLight intensity={1.35} />
      <hemisphereLight args={["#fffaf0", "#78918b", 1.3]} />
      <directionalLight
        position={[4, 14, 9]}
        intensity={2.6}
        castShadow={quality === "desktop"}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-normalBias={0.04}
      />
      <Suspense fallback={null}>
        {kind === "campus" ? (
          <LearningCampusScene
            active={activePortal}
            onSelect={onSelectPortal}
            onHover={onHover}
          />
        ) : (
          <ProgramWorldScene
            kind={kind}
            stops={stops}
            active={activePortal}
            onSelect={onSelectPortal}
            onHover={onHover}
            progressIndex={progressIndex}
          />
        )}
      </Suspense>
      <CinematicCamera
        kind={kind}
        selected={stops.find((s) => s.id === activePortal)}
      />
      <SceneVisibilityMonitor
        host={host}
        active={visible}
        stops={stops}
        onReady={onReady}
      />
      <SceneQualityController />
    </Canvas>
  );
}

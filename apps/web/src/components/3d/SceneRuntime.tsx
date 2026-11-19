"use client";
import { useEffect, useRef, type RefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import type { SceneStop, WorldKind } from "./scene-data";
export function SceneVisibilityMonitor({
  host,
  active,
  stops,
  onReady,
}: {
  host: RefObject<HTMLDivElement | null>;
  active: boolean;
  stops: SceneStop[];
  onReady: () => void;
}) {
  const { gl, scene, camera, size } = useThree();
  const notified = useRef(false);
  const count = useRef(0),
    last = useRef(0),
    frames = useRef(0);
  useEffect(() => {
    const el = gl.domElement;
    const lost = (e: Event) => {
      e.preventDefault();
      host.current?.setAttribute("data-context", "lost");
    };
    el.addEventListener("webglcontextlost", lost);
    return () => el.removeEventListener("webglcontextlost", lost);
  }, [gl, host]);
  useFrame(() => {
    count.current++;
    frames.current++;
    const now = performance.now() / 1000;
    if (now - last.current < 0.5) return;
    const dt = now - last.current;
    last.current = now;
    const h = host.current;
    if (!h) return;
    const student = scene.getObjectByName("student-explorer");
    let objects = 0;
    scene.traverse(() => objects++);
    if (objects > 20 && !notified.current) {
      notified.current = true;
      onReady();
    }
    const rect = gl.domElement.getBoundingClientRect();
    const projected = stops.map((s) => {
      const v = new Vector3(s.position[0], 1, s.position[2]).project(camera);
      return {
        id: s.id,
        x: rect.x + ((v.x + 1) / 2) * size.width,
        y: rect.y + ((1 - v.y) / 2) * size.height,
      };
    });
    Object.assign(h.dataset, {
      mounted: "yes",
      context: gl.getContext().isContextLost() ? "lost" : "active",
      frames: String(count.current),
      fps: (frames.current / dt).toFixed(1),
      objects: String(objects),
      camera: JSON.stringify(camera.position.toArray()),
      student: JSON.stringify(student?.position.toArray() ?? []),
      walking: String(student?.userData.walking ?? false),
      loop: active ? "always" : "never",
      animation: active ? "active" : "paused",
      drawCalls: String(gl.info.render.calls),
      triangles: String(gl.info.render.triangles),
      dimensions: `${Math.round(rect.width)} × ${Math.round(rect.height)}`,
      targets: JSON.stringify(projected),
    });
    frames.current = 0;
  });
  useEffect(() => {
    last.current = performance.now() / 1000;
    frames.current = 0;
    if (host.current) {
      host.current.dataset.animation = active ? "active" : "paused";
      host.current.dataset.loop = active ? "always" : "never";
    }
  }, [active, host]);
  return null;
}
export function CinematicCamera({
  selected,
  kind,
}: {
  selected: SceneStop | undefined;
  kind: WorldKind;
}) {
  const { camera, size } = useThree();
  const look = useRef(new Vector3(0, 0.6, 0));
  const desired = useRef(new Vector3());
  const target = useRef(new Vector3());
  useFrame((_, delta) => {
    const narrow = size.width / size.height < 1;
    const scale = narrow ? 1.35 : 1;
    const campus = kind === "campus";
    if (selected && kind !== "journey") {
      desired.current.set(
        selected.position[0] + 5.5,
        6.8,
        selected.position[2] + 8,
      );
      target.current.set(selected.position[0], 1, selected.position[2]);
    } else {
      desired.current.set(
        (campus ? 13 : 12) * scale,
        (campus ? 14 : 14) * scale,
        (campus ? 18 : 18) * scale,
      );
      target.current.set(0, 0.5, 0);
    }
    const a = 1 - Math.exp(-Math.min(delta, 0.05) * 2.6);
    camera.position.lerp(desired.current, a);
    look.current.lerp(target.current, a);
    camera.lookAt(look.current);
  });
  return null;
}

export function SceneQualityController() {
  const { gl, setDpr } = useThree();
  const frames = useRef(0),
    time = useRef(0),
    adjusted = useRef(false);
  useFrame((_, delta) => {
    if (adjusted.current) return;
    frames.current++;
    time.current += delta;
    if (time.current > 4) {
      if (frames.current / time.current < 28) {
        setDpr(1);
        gl.shadowMap.enabled = false;
        gl.shadowMap.needsUpdate = true;
      }
      adjusted.current = true;
    }
  });
  return null;
}

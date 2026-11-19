"use client";
import { AnimatedStudent } from "./ScenePrimitives";
export function StudentExplorer({
  initialPosition,
  targetPosition,
  color,
  mode = "walk",
}: {
  initialPosition?: [number, number, number];
  targetPosition?: [number, number, number];
  color?: string;
  speed?: number;
  mode?: "walk" | "observe" | "tablet";
}) {
  return (
    <AnimatedStudent
      start={initialPosition}
      end={targetPosition}
      color={color}
      stationary={mode !== "walk"}
    />
  );
}

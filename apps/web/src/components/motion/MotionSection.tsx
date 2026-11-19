"use client";
import { useRef, type ElementType, type ReactNode } from "react";
import { useScrollEntrance } from "./useScrollEntrance";

export type MotionPreset = "editorial" | "fadeUp" | "depth" | "scale" | "stagger" | "slideLeft" | "slideRight" | "split";
interface Props {
  children: ReactNode;
  as?: ElementType;
  preset?: MotionPreset;
  className?: string;
  delayMs?: number;
  durationMs?: number;
  threshold?: number;
  id?: string;
  "aria-label"?: string;
}

/** Reveal the section's hierarchy; forms and whole page containers stay stable. */
export function MotionSection({ children, as: Component = "section", preset = "editorial", className = "", delayMs = 0, durationMs = 600, id, "aria-label": ariaLabel }: Props) {
  const root = useRef<HTMLElement>(null);
  useScrollEntrance(root, {
    direction: preset === "slideLeft" ? "left" : preset === "slideRight" ? "right" : preset === "scale" ? "zoom" : "up",
    delayMs, durationMs, selector: "h1, h2, h3", staggerMs: 45,
  });
  return <Component ref={root} id={id} aria-label={ariaLabel} className={className} data-motion-preset={preset}>{children}</Component>;
}

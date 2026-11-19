"use client";

import { useRef, type ReactNode } from "react";
import { useScrollEntrance, type EntranceDirection } from "./useScrollEntrance";

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  direction?: EntranceDirection;
  delayMs?: number;
  durationMs?: number;
  threshold?: number;
  once?: boolean;
}

export function RevealOnScroll({ children, className = "", direction = "up", delayMs = 0, durationMs = 540, once = true }: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  useScrollEntrance(ref, { direction, delayMs, durationMs, once });
  return <div ref={ref} className={className} data-scroll-entrance="reveal">{children}</div>;
}

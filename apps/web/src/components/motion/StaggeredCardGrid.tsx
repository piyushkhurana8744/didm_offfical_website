"use client";
import { useRef, Children, type ReactNode } from "react";
import { useScrollEntrance } from "./useScrollEntrance";

interface Props { children: ReactNode; className?: string; columns?: number; stagger?: number; staggerMs?: number; initialDelayMs?: number; threshold?: number }
export function StaggeredCardGrid({ children, className, columns, stagger, staggerMs = 65, initialDelayMs = 0 }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const resolved = className || (columns === 1 ? "grid grid-cols-1 gap-6" : columns === 2 ? "grid grid-cols-1 md:grid-cols-2 gap-6" : columns === 3 ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6");
  useScrollEntrance(root, { selector: ":scope > div", delayMs: initialDelayMs, staggerMs: Math.min(stagger !== undefined ? stagger * 1000 : staggerMs, 100) });
  return <div ref={root} className={resolved} data-scroll-entrance="cards">{Children.map(children, (child, index) => <div key={index} className="h-full">{child}</div>)}</div>;
}

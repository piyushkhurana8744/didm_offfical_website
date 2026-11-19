"use client";

import { useEffect, type RefObject } from "react";
import { MOTION_TOKENS } from "./motion-tokens";

export type EntranceDirection = "up" | "down" | "left" | "right" | "zoom" | "fade";
type Options = {
  direction?: EntranceDirection;
  delayMs?: number;
  durationMs?: number;
  once?: boolean;
  selector?: string;
  staggerMs?: number;
};

/** Animate on entry without hiding server content or reserving GPU layers offscreen. */
export function useScrollEntrance(ref: RefObject<HTMLElement | null>, {
  direction = "up", delayMs = 0, durationMs = 540, once = true, selector, staggerMs = 0,
}: Options = {}) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();
    let observer: IntersectionObserver | undefined;
    const cancel = () => { animations.forEach(animation => animation.cancel()); animations.clear(); };
    const observe = () => {
      observer?.disconnect();
      cancel();
      if (media.matches || !("IntersectionObserver" in window) || !("animate" in element)) {
        element.dataset.revealState = "static";
        return;
      }
      element.dataset.revealState = "ready";
      observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        if (once) observer?.disconnect();
        cancel();
        const transforms: Record<EntranceDirection, string> = {
          up: "translateY(18px)", down: "translateY(-18px)", left: "translateX(18px)",
          right: "translateX(-18px)", zoom: "scale(.975)", fade: "none",
        };
        const targets = selector ? Array.from(element.querySelectorAll<HTMLElement>(selector)).slice(0, 16) : [element];
        element.dataset.revealState = "entered";
        targets.forEach((target, index) => {
          const animation = target.animate([
            { opacity: .45, transform: transforms[direction] },
            { opacity: 1, transform: "none" },
          ], { duration: Math.min(Math.max(durationMs, 0), 1000), delay: Math.min(Math.max(delayMs + index * staggerMs, 0), 600), easing: MOTION_TOKENS.easings.cinematic, fill: "none" });
          animations.add(animation);
          animation.onfinish = () => { animations.delete(animation); if (!animations.size) element.dataset.revealState = "settled"; };
        });
      }, { threshold: 0, rootMargin: "0px 0px -24px 0px" });
      observer.observe(element);
    };
    observe();
    media.addEventListener("change", observe);
    return () => { observer?.disconnect(); cancel(); media.removeEventListener("change", observe); };
  }, [ref, direction, delayMs, durationMs, once, selector, staggerMs]);
}

"use client";

import { useEffect, ReactNode } from "react";

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let isMounted = true;
    let cleanup: (() => void) | undefined;

    Promise.all([
      import("lenis"),
      import("gsap"),
      import("gsap/ScrollTrigger"),
    ])
      .then(([{ default: Lenis }, gsapModule, scrollTriggerModule]) => {
        if (!isMounted) return;

        const gsap = gsapModule.gsap || gsapModule.default || gsapModule;
        const ScrollTrigger = scrollTriggerModule.ScrollTrigger || scrollTriggerModule.default;

        if (gsap && gsap.registerPlugin && ScrollTrigger) {
          gsap.registerPlugin(ScrollTrigger);
        }

        const lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: "vertical",
          gestureOrientation: "vertical",
          smoothWheel: true,
          touchMultiplier: 1.5,
        });

        if (ScrollTrigger && ScrollTrigger.update) {
          lenis.on("scroll", ScrollTrigger.update);
        }

        const tickerCallback = (time: number) => {
          lenis.raf(time * 1000);
        };

        if (gsap && gsap.ticker) {
          gsap.ticker.add(tickerCallback);
          gsap.ticker.lagSmoothing(0);
        }

        cleanup = () => {
          if (gsap && gsap.ticker) {
            gsap.ticker.remove(tickerCallback);
          }
          lenis.destroy();
        };
      })
      .catch(() => {
        // Fallback gracefully without smooth scrolling if modules fail to load
      });

    return () => {
      isMounted = false;
      cleanup?.();
    };
  }, []);

  return <>{children}</>;
}


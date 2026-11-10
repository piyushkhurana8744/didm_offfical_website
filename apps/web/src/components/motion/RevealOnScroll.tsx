"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "zoom" | "fade";
  delayMs?: number;
  durationMs?: number;
  threshold?: number;
  once?: boolean;
}

export function RevealOnScroll({
  children,
  className = "",
  direction = "up",
  delayMs = 0,
  durationMs = 700,
  threshold = 0.15,
  once = true,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Respect user's reduced-motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(element);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, once]);

  // Initial and active transform mappings
  const getTransforms = () => {
    switch (direction) {
      case "up":
        return isVisible ? "translate3d(0, 0, 0)" : "translate3d(0, 36px, 0)";
      case "down":
        return isVisible ? "translate3d(0, 0, 0)" : "translate3d(0, -36px, 0)";
      case "left":
        return isVisible ? "translate3d(0, 0, 0)" : "translate3d(40px, 0, 0)";
      case "right":
        return isVisible ? "translate3d(0, 0, 0)" : "translate3d(-40px, 0, 0)";
      case "zoom":
        return isVisible ? "scale3d(1, 1, 1)" : "scale3d(0.92, 0.92, 1)";
      case "fade":
      default:
        return "translate3d(0, 0, 0)";
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      suppressHydrationWarning
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransforms(),
        transitionProperty: "opacity, transform",
        transitionDuration: `${durationMs}ms`,
        transitionDelay: `${delayMs}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)", // Apple-like smooth cubic curve
        willChange: isVisible ? "auto" : "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}


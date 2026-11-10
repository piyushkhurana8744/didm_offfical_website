"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface TextRevealProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delayMs?: number;
  staggerMs?: number;
  highlightWords?: { [word: string]: string };
}

export function TextReveal({
  text,
  className = "",
  wordClassName = "",
  delayMs = 100,
  staggerMs = 50,
  highlightWords = {},
}: TextRevealProps) {
  const [mounted, setMounted] = useState(false);
  const words = text.split(" ");

  useEffect(() => {
    // Respect reduced-motion immediately
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setMounted(true);
      return;
    }
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <span className={`inline-block ${className}`} aria-label={text} suppressHydrationWarning>
      {words.map((word, index) => {
        const cleanWord = word.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
        const customColor = highlightWords[cleanWord] || "";

        return (
          <span
            key={index}
            className="inline-block overflow-hidden mr-[0.25em] last:mr-0 align-top"
          >
            <span
              suppressHydrationWarning
              className={`inline-block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${wordClassName} ${customColor}`}
              style={{
                transform: mounted ? "translate3d(0, 0, 0)" : "translate3d(0, 110%, 0)",
                opacity: mounted ? 1 : 0,
                transitionDelay: `${delayMs + index * staggerMs}ms`,
                willChange: mounted ? "auto" : "transform, opacity",
              }}
            >
              {word}
            </span>
          </span>
        );
      })}
    </span>
  );
}


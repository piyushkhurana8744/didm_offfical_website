"use client";

import { useEffect, useState } from "react";

export function AnimatedGradient({ className = "" }: { className?: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* Primary red ambient glow sphere */}
      <div
        suppressHydrationWarning
        className="absolute -top-[20%] -left-[10%] w-[600px] sm:w-[900px] h-[600px] sm:h-[900px] rounded-full blur-[140px] opacity-[0.14] dark:opacity-[0.22] transition-opacity duration-1000"
        style={{
          background: "radial-gradient(circle, #C8102E 0%, rgba(200, 16, 46, 0.2) 60%, transparent 80%)",
          transform: mounted ? "translate3d(30px, 40px, 0)" : "translate3d(0, 0, 0)",
          transition: "transform 14s ease-in-out infinite alternate",
        }}
      />

      {/* Secondary subtle warm amber/indigo accent sphere for visual depth */}
      <div
        suppressHydrationWarning
        className="absolute top-[20%] -right-[15%] w-[500px] sm:w-[750px] h-[500px] sm:h-[750px] rounded-full blur-[150px] opacity-[0.08] dark:opacity-[0.15] transition-opacity duration-1000"
        style={{
          background: "radial-gradient(circle, #6366F1 0%, rgba(245, 158, 11, 0.15) 50%, transparent 80%)",
          transform: mounted ? "translate3d(-40px, -30px, 0)" : "translate3d(0, 0, 0)",
          transition: "transform 18s ease-in-out infinite alternate",
        }}
      />

      {/* Subtle organic grid texture for modern editorial structure */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />
    </div>
  );
}


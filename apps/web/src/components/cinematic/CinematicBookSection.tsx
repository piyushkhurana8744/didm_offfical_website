"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { BookAccessibleOverlay } from "./BookAccessibleOverlay";
import { CinematicBookFallback } from "./CinematicBookFallback";
import { EnquiryForm } from "@/components/EnquiryForm";
import { X } from "lucide-react";

// Dynamically import the Three.js Canvas to prevent SSR hydration errors
const CinematicBookCanvas = dynamic(
  () =>
    import("./CinematicBookCanvas").then((mod) => mod.CinematicBookCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-[#faf8f5] dark:bg-[#0c0d12]">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-[#b52828] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs font-mono uppercase tracking-widest text-neutral-500">
            Opening DIDM Curriculum Handbook...
          </p>
        </div>
      </div>
    ),
  }
);

export function CinematicBookSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [pinState, setPinState] = useState<"top" | "pinned" | "bottom">("top");
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isWebGlAvailable, setIsWebGlAvailable] = useState(true);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);

  // Check reduced motion & WebGL support on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(motionQuery.matches);
    const motionListener = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    motionQuery.addEventListener("change", motionListener);

    // Verify WebGL availability
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
      setIsWebGlAvailable(Boolean(gl));
    } catch {
      setIsWebGlAvailable(false);
    }

    return () => {
      motionQuery.removeEventListener("change", motionListener);
    };
  }, []);

  // Track scroll position and bulletproof pin state
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const totalScrollableHeight = rect.height - windowHeight;

    if (totalScrollableHeight <= 0) return;

    // How far the top of the container has scrolled past the top of the viewport
    const scrolledDistance = -rect.top;
    const rawProgress = scrolledDistance / totalScrollableHeight;
    const clampedProgress = Math.max(0, Math.min(1, rawProgress));
    setScrollProgress(clampedProgress);

    // Bulletproof Pin State (bypasses any parent overflow-x: hidden)
    if (rect.top > 0) {
      setPinState("top");
    } else if (rect.bottom < windowHeight) {
      setPinState("bottom");
    } else {
      setPinState("pinned");
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [handleScroll]);

  // Jump to specific chapter progress when pill is clicked
  const handleSelectStage = useCallback((stageProgress: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const currentScrollY = window.scrollY;
    const containerTop = currentScrollY + rect.top;
    const totalScrollableHeight = rect.height - window.innerHeight;

    const targetScrollY = containerTop + stageProgress * totalScrollableHeight;
    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth",
    });
  }, []);

  // If reduced motion is requested or WebGL is unsupported, serve the high-fidelity editorial fallback
  if (isReducedMotion || !isWebGlAvailable) {
    return (
      <CinematicBookFallback
        onOpenEnquiryModal={() => setIsEnquiryModalOpen(true)}
      />
    );
  }

  // Determine container pinning class
  let pinClasses = "absolute top-0 left-0 w-full h-screen";
  if (pinState === "pinned") {
    pinClasses = "fixed top-0 left-0 w-full h-screen z-30";
  } else if (pinState === "bottom") {
    pinClasses = "absolute bottom-0 left-0 w-full h-screen";
  }

  return (
    <>
      {/* 
        Scroll container:
        Total height is 300vh so user scrolls smoothly through the 5 storytelling chapters.
      */}
      <section
        ref={containerRef}
        id="didm-curriculum-experience"
        className="relative w-full h-[320vh] bg-[#fbf9f5] dark:bg-[#0a0b0e]"
        aria-label="DIDM Interactive Curriculum Experience"
      >
        {/* Pinned 100vh Viewport */}
        <div className={`${pinClasses} overflow-hidden flex flex-col justify-center items-center pointer-events-auto`}>
          {/* Subtle Studio Vignette Backdrop */}
          <div className="absolute inset-0 bg-radial from-transparent via-neutral-200/20 to-neutral-300/40 dark:via-black/20 dark:to-black/80 pointer-events-none" />

          {/* Three.js WebGL 3D Book Canvas */}
          <div className="w-full h-full relative">
            <CinematicBookCanvas scrollProgress={scrollProgress} />
          </div>

          {/* Semantic HTML Text, Progress Controls & Action CTAs */}
          <BookAccessibleOverlay
            scrollProgress={scrollProgress}
            onSelectStage={handleSelectStage}
            onOpenEnquiryModal={() => setIsEnquiryModalOpen(true)}
          />
        </div>
      </section>

      {/* Global Admission & Free Demo Lead Intake Modal */}
      {isEnquiryModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-lg bg-white dark:bg-[#14151e] rounded-2xl p-6 sm:p-8 shadow-2xl border border-neutral-200 dark:border-white/10">
            <button
              onClick={() => setIsEnquiryModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-700 dark:hover:text-white rounded-full hover:bg-neutral-100 dark:hover:bg-white/10 transition"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#b52828]">
                  Free Demo Class • Instant Career Clarity
                </span>
                <h3 className="text-2xl font-black text-neutral-900 dark:text-white">
                  Join a Session at Your Nearest DIDM Centre
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300">
                  Speak directly with senior digital marketing mentors and explore the 52-module syllabus.
                </p>
              </div>

              <EnquiryForm />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

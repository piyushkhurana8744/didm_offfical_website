"use client";

import { useState, useEffect } from "react";

export function useReducedMotionSafe() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const touchQuery = window.matchMedia("(pointer: coarse)");

    setPrefersReducedMotion(motionQuery.matches);
    setIsTouchDevice(touchQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    const handleTouchChange = (e: MediaQueryListEvent) => {
      setIsTouchDevice(e.matches);
    };

    motionQuery.addEventListener("change", handleMotionChange);
    touchQuery.addEventListener("change", handleTouchChange);

    return () => {
      motionQuery.removeEventListener("change", handleMotionChange);
      touchQuery.removeEventListener("change", handleTouchChange);
    };
  }, []);

  return {
    prefersReducedMotion,
    isTouchDevice,
    shouldReduceMotion: prefersReducedMotion,
  };
}


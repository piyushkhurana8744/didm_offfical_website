/**
 * DIDM Cinematic Motion Tokens
 * Inspired by BRAHMA.IO's luxury digital storytelling & fluid momentum.
 */

export const MOTION_TOKENS = {
  // Cubic bezier easing curves
  easings: {
    // Primary cinematic ease - smooth acceleration, long luxurious deceleration
    cinematic: "cubic-bezier(0.16, 1, 0.3, 1)",
    // Fluid ease for navigation and hover micro-interactions
    fluid: "cubic-bezier(0.25, 0.1, 0.25, 1)",
    // Magnetic snap ease for interactive buttons
    magnetic: "cubic-bezier(0.2, 0.9, 0.3, 1)",
    // Gentle spring for badges and counter reveals
    spring: "cubic-bezier(0.34, 1.4, 0.64, 1)",
  },

  // Animation durations (in milliseconds)
  durations: {
    micro: 180,
    quick: 320,
    standard: 540,
    deliberate: 780,
    cinematic: 1100,
    scenic: 1600,
  },

  // Stagger intervals for multi-item sequences
  stagger: {
    tight: 35,
    standard: 65,
    generous: 120,
  },

  // Spatial translation offsets (in pixels)
  offsets: {
    subtle: 12,
    standard: 28,
    dramatic: 56,
  },

  // Scroll intersection thresholds
  scrollThresholds: {
    immediate: 0.05,
    standard: 0.15,
    center: 0.4,
  },
} as const;

export type MotionDuration = keyof typeof MOTION_TOKENS.durations;
export type MotionEasing = keyof typeof MOTION_TOKENS.easings;


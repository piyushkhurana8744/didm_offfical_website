"use client";
import type { ReactNode } from "react";
/** Native scroll preserves wheel, touch, keyboard and browser history behaviour. */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

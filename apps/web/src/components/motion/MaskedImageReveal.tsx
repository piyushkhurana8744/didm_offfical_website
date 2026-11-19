"use client";
import { useRef } from "react";
import Image, { type StaticImageData } from "next/image";
import { useScrollEntrance } from "./useScrollEntrance";
interface MaskedImageRevealProps { src: string | StaticImageData; alt: string; className?: string; aspectRatio?: string; priority?: boolean; delayMs?: number }
export function MaskedImageReveal({ src, alt, className = "", aspectRatio = "aspect-[16/10]", priority = false, delayMs = 0 }: MaskedImageRevealProps) {
  const root = useRef<HTMLDivElement>(null);
  useScrollEntrance(root, { direction: "zoom", delayMs, durationMs: 700 });
  return <div ref={root} className={`relative overflow-hidden rounded-3xl bg-neutral-100 ${aspectRatio} ${className}`} data-scroll-entrance="image"><Image src={src} alt={alt} fill priority={priority} sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" /></div>;
}

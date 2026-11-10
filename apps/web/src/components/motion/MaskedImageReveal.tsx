"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import Image, { StaticImageData } from "next/image";

interface MaskedImageRevealProps {
  src: string | StaticImageData;
  alt: string;
  className?: string;
  aspectRatio?: string;
  priority?: boolean;
  delayMs?: number;
}

export function MaskedImageReveal({
  src,
  alt,
  className = "",
  aspectRatio = "aspect-[16/10]",
  priority = false,
  delayMs = 0,
}: MaskedImageRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-3xl bg-neutral-900 ${aspectRatio} ${className}`}
    >
      {/* Expanding Clipping Shutter */}
      <div
        suppressHydrationWarning
        className="w-full h-full transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          clipPath: isVisible
            ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
            : "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
          transitionDelay: `${delayMs}ms`,
        }}
      >
        <div
          className="w-full h-full relative transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            transform: isVisible ? "scale(1)" : "scale(1.08)",
            transitionDelay: `${delayMs}ms`,
          }}
        >
          {typeof src === "string" ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt={alt}
              className="w-full h-full object-cover"
              loading={priority ? "eager" : "lazy"}
            />
          ) : (
            <Image
              src={src}
              alt={alt}
              fill
              priority={priority}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          )}
        </div>
      </div>
    </div>
  );
}


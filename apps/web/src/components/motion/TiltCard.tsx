"use client";

import { useRef, useState, useEffect, ReactNode, MouseEvent } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTiltDeg?: number;
  glare?: boolean;
}

export function TiltCard({
  children,
  className = "",
  maxTiltDeg = 8,
  glare = true,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsTouch(true);
    }
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isTouch) return;
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTiltDeg;
    const rotateY = ((x - centerX) / centerX) * maxTiltDeg;

    setRotate({ x: rotateX, y: rotateY });

    if (glare) {
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      setGlarePosition({ x: glareX, y: glareY, opacity: 0.15 });
    }
  };

  const handleMouseEnter = () => {
    if (isTouch) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (isTouch) return;
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
    setGlarePosition((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      style={{ perspective: 1000 }}
      className="inline-block w-full"
    >
      <div
        ref={cardRef}
        suppressHydrationWarning
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`relative overflow-hidden transition-transform duration-300 ease-out ${className}`}
        style={{
          transform: isHovered
            ? `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1.015, 1.015, 1.015)`
            : "rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
          transformStyle: "preserve-3d",
          willChange: isHovered ? "transform" : "auto",
        }}
      >
        {children}

        {glare && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle 350px at ${glarePosition.x}% ${glarePosition.y}%, rgba(255, 255, 255, ${glarePosition.opacity}), transparent 80%)`,
            }}
          />
        )}
      </div>
    </div>
  );
}


"use client";

import { useEffect, useState, useRef, ReactNode } from "react";

interface ParallaxLayerProps {
  children: ReactNode;
  speed?: number; // e.g. -0.05 to 0.08
  className?: string;
  mouseResponsive?: boolean;
}

export function ParallaxLayer({
  children,
  speed = 0.04,
  className = "",
  mouseResponsive = true,
}: ParallaxLayerProps) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let animationFrameId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: globalThis.MouseEvent) => {
      if (!mouseResponsive) return;
      const { innerWidth, innerHeight } = window;
      const normX = (e.clientX / innerWidth - 0.5) * 2;
      const normY = (e.clientY / innerHeight - 0.5) * 2;
      targetX = normX * speed * 200;
      targetY = normY * speed * 200;
    };

    const loop = () => {
      // Linear interpolation (lerp) for buttery smooth motion
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      setOffset({
        x: Math.round(currentX * 10) / 10,
        y: Math.round(currentY * 10) / 10,
      });

      animationFrameId = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    animationFrameId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [speed, mouseResponsive]);

  return (
    <div
      ref={layerRef}
      className={`transition-transform duration-75 ease-linear ${className}`}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}


"use client";

import { useRef, useState, useEffect, ReactNode, MouseEvent } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  pullFactor?: number; // 0.1 to 0.4
  disabled?: boolean;
}

export function MagneticButton({
  children,
  className = "",
  pullFactor = 0.25,
  disabled = false,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsTouch(true);
    }
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (disabled || isTouch) return;
    const element = buttonRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * pullFactor;
    const deltaY = (e.clientY - centerY) * pullFactor;

    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseEnter = () => {
    if (disabled || isTouch) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (disabled || isTouch) return;
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`inline-block ${className}`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: isHovered
          ? "transform 0.15s cubic-bezier(0.2, 0.9, 0.3, 1)"
          : "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        willChange: isHovered ? "transform" : "auto",
      }}
    >
      {children}
    </div>
  );
}


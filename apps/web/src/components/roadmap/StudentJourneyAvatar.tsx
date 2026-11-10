"use client";

import { useId } from "react";

interface StudentJourneyAvatarProps {
  isMoving?: boolean;
  stepNumber: number;
  facing?: "left" | "right";
  walkCycle?: number; // 0 to 2*PI oscillation phase
  badgeText?: string;
  className?: string;
}

export function StudentJourneyAvatar({
  isMoving = false,
  stepNumber,
  facing = "right",
  walkCycle = 0,
  badgeText,
  className = "",
}: StudentJourneyAvatarProps) {
  const maskId = useId();

  // Dynamic leg and arm rotation based on walk cycle phase
  // When isMoving is true and walkCycle is passed, compute rotation angle (-24deg to +24deg)
  const legAngle = isMoving ? Math.sin(walkCycle) * 22 : 0;
  const bobbingY = isMoving ? -Math.abs(Math.sin(walkCycle)) * 3 : 0;

  return (
    <div
      className={`relative flex flex-col items-center select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* Step Badge floating above the character (Never mirrored) */}
      <div className="mb-1.5 px-2.5 py-0.5 rounded-full bg-brand-red text-white text-[10px] font-mono font-bold shadow-lg shadow-brand-red/35 whitespace-nowrap border border-white/20 transition-transform duration-200">
        {badgeText || `Step ${stepNumber < 10 ? `0${stepNumber}` : stepNumber}`}
      </div>

      {/* Mirrored container for character orientation */}
      <div
        className={`transition-transform duration-250 ${
          facing === "left" ? "-scale-x-100" : "scale-x-100"
        }`}
        style={{
          transformOrigin: "center bottom",
        }}
      >
        <svg
          width="48"
          height="62"
          viewBox="0 0 48 62"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="filter drop-shadow-md"
        >
          {/* Walking shadow under feet */}
          <ellipse
            cx="24"
            cy="58"
            rx={isMoving ? 13 : 15}
            ry={isMoving ? 3.5 : 4}
            fill="rgba(0, 0, 0, 0.22)"
            className="transition-all duration-200"
          />

          {/* Body & Head Group with subtle vertical bobbing */}
          <g
            style={{
              transform: `translateY(${bobbingY}px)`,
              transition: isMoving ? "none" : "transform 0.2s ease",
            }}
          >
            {/* Student Backpack (Behind body) */}
            <rect x="10" y="24" width="5.5" height="15" rx="2.5" fill="#0F172A" />
            <rect x="9" y="27" width="2" height="9" rx="1" fill="#334155" />

            {/* Left Leg (Rear leg) */}
            <g
              style={{
                transformOrigin: "18px 40px",
                transform: `rotate(${legAngle}deg)`,
                transition: isMoving ? "none" : "transform 0.2s ease",
              }}
            >
              {/* Trouser */}
              <rect x="16" y="40" width="5" height="15" rx="2.5" fill="#1E293B" />
              {/* Sneaker */}
              <rect x="14" y="53" width="8" height="5" rx="2" fill="#C8102E" />
              <rect x="14" y="56" width="8" height="2" rx="1" fill="#FFFFFF" />
            </g>

            {/* Right Leg (Front leg - swings opposite to left leg) */}
            <g
              style={{
                transformOrigin: "28px 40px",
                transform: `rotate(${-legAngle}deg)`,
                transition: isMoving ? "none" : "transform 0.2s ease",
              }}
            >
              {/* Trouser */}
              <rect x="25" y="40" width="5" height="15" rx="2.5" fill="#0F172A" />
              {/* Sneaker */}
              <rect x="24" y="53" width="8" height="5" rx="2" fill="#C8102E" />
              <rect x="24" y="56" width="8" height="2" rx="1" fill="#FFFFFF" />
            </g>

            {/* Torso / DIDM Branded Red Hoodie */}
            <rect x="14" y="21" width="20" height="21" rx="7" fill="#C8102E" />
            {/* Hoodie Zipper & Seam */}
            <line
              x1="24"
              y1="23"
              x2="24"
              y2="40"
              stroke="#FFFFFF"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.85"
            />
            {/* Kangaroo pocket */}
            <path
              d="M18 34C18 32 30 32 30 34V39H18V34Z"
              fill="#A00D24"
              opacity="0.6"
            />

            {/* Left Arm carrying a digital learning tablet */}
            <g
              style={{
                transformOrigin: "15px 26px",
                transform: `rotate(${-legAngle * 0.8}deg)`,
                transition: isMoving ? "none" : "transform 0.2s ease",
              }}
            >
              <rect x="11" y="25" width="4.5" height="11" rx="2" fill="#C8102E" />
              {/* Digital Tablet / Portfolio Pad */}
              <rect
                x="8"
                y="33"
                width="6.5"
                height="8.5"
                rx="1.5"
                fill="#2563EB"
                stroke="#FFFFFF"
                strokeWidth="1"
              />
              <rect x="9.5" y="34.5" width="3.5" height="5" rx="0.5" fill="#93C5FD" />
            </g>

            {/* Right Arm (Swings forward/back with walking cadence) */}
            <g
              style={{
                transformOrigin: "32px 26px",
                transform: `rotate(${legAngle * 0.8}deg)`,
                transition: isMoving ? "none" : "transform 0.2s ease",
              }}
            >
              <rect x="32" y="25" width="4.5" height="11" rx="2" fill="#C8102E" />
              {/* Hand */}
              <circle cx="34" cy="37" r="2.2" fill="#FDBA74" />
            </g>

            {/* Neck */}
            <rect x="21" y="18" width="6" height="4.5" rx="1.5" fill="#FDBA74" />

            {/* Student Head */}
            <circle cx="24" cy="13" r="8.5" fill="#FDBA74" />

            {/* Modern Haircut */}
            <path
              d="M15.5 11.5C16 7 19.5 4.5 24 4.5C28.5 4.5 32 7 32.5 11.5C29.5 11 27 9.8 24 9.8C20 9.8 17.5 11 15.5 11.5Z"
              fill="#0F172A"
            />

            {/* Friendly Eyes */}
            <circle cx="22" cy="13" r="1.1" fill="#0F172A" />
            <circle cx="26.5" cy="13" r="1.1" fill="#0F172A" />

            {/* Warm, determined smile */}
            <path
              d="M22.5 16C23.2 16.8 25 16.8 25.8 16"
              stroke="#0F172A"
              strokeWidth="1.1"
              strokeLinecap="round"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}

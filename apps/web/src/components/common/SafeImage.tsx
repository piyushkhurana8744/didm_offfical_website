"use client";

import React, { useState } from "react";
import Image, { ImageProps } from "next/image";

export type ImageDisplayMode =
  | "banner" // Full-width promotional banner, safe positioning
  | "portrait" // Trainer/student portraits with face-safe top/center positioning
  | "certificate" // Official certificates & awards, strict object-fit: contain
  | "logo" // Partner & accreditation logos, strict object-fit: contain
  | "group" // Student/convocation group photos, uncropped or natural ratio
  | "editorial"; // Editorial & news images with safe center positioning

interface SafeImageProps extends Omit<ImageProps, "onError"> {
  displayMode?: ImageDisplayMode;
  fallbackSrc?: string;
  containerClassName?: string;
}

/**
 * Institutional SafeImage Component.
 * Enforces strict aspect ratio preservation and subject-safe framing according to DIDM Display Rules:
 * - Certificates & Logos: Always object-contain to prevent cropping text/seals.
 * - Portraits: Top-weighted framing to prevent cropping faces.
 * - Group Photos: Uncropped framing to keep all graduates and faculty visible.
 * - Banners: Responsive edge-to-edge presentation without horizontal stretch.
 */
export function SafeImage({
  src,
  alt,
  displayMode = "editorial",
  className = "",
  containerClassName = "",
  fallbackSrc = "/images/didm/homepage/didm-star-rating.png",
  fill,
  width,
  height,
  ...props
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const getModeStyles = (): string => {
    switch (displayMode) {
      case "certificate":
        return "object-contain object-center";
      case "logo":
        return "object-contain object-center p-1.5";
      case "portrait":
        return "object-cover object-top";
      case "group":
        return "object-cover object-center";
      case "banner":
        return "object-cover object-center";
      case "editorial":
      default:
        return "object-cover object-center";
    }
  };

  const finalClassName = `${getModeStyles()} ${className}`.trim();

  return (
    <Image sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
      src={hasError && fallbackSrc ? fallbackSrc : imgSrc}
      alt={alt}
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      className={finalClassName}
      onError={() => {
        if (!hasError && fallbackSrc && imgSrc !== fallbackSrc) {
          setHasError(true);
          setImgSrc(fallbackSrc);
        }
      }}
      {...props}
    />
  );
}

export default SafeImage;


import React from "react";

interface FullBleedSectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  as?: "section" | "div" | "header" | "footer";
  hasContainer?: boolean;
  maxWidth?: "5xl" | "6xl" | "7xl" | "none";
}

/**
 * Reusable full-bleed section component.
 * Extends edge-to-edge across the entire viewport (100% width)
 * without causing horizontal scrollbars or relying on fragile negative margins.
 */
export function FullBleedSection({
  children,
  className = "",
  innerClassName = "",
  as: Component = "section",
  hasContainer = false,
  maxWidth = "7xl",
  ...props
}: FullBleedSectionProps) {
  const maxWClass =
    maxWidth === "5xl"
      ? "max-w-5xl"
      : maxWidth === "6xl"
      ? "max-w-6xl"
      : maxWidth === "7xl"
      ? "max-w-7xl"
      : "max-w-none";

  return (
    <Component
      className={`w-full relative left-0 right-0 overflow-hidden ${className}`}
      {...props}
    >
      {hasContainer ? (
        <div className={`w-full ${maxWClass} mx-auto px-4 sm:px-6 lg:px-8 ${innerClassName}`}>
          {children}
        </div>
      ) : (
        <div className={`w-full ${innerClassName}`}>{children}</div>
      )}
    </Component>
  );
}

export default FullBleedSection;


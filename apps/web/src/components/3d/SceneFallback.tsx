"use client";
import Link from "next/link";
export function SceneFallback() {
  return (
    <div className="scene-static-fallback">
      <img
        src="/images/3d/campus-poster.webp"
        alt="The DIDM digital learning campus"
      />
      <p>Explore digital marketing learning spaces at your own pace.</p>
      <Link href="/programs">Explore all courses ↗</Link>
    </div>
  );
}

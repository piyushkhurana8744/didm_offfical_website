"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { HardcoverBook3D } from "./HardcoverBook3D";

interface CinematicBookCanvasProps {
  scrollProgress: number;
}

/**
 * Three.js WebGL Canvas with Art-Directed Studio Lighting & Shadow Mapping.
 * Automatically halts GPU rendering when scrolled out of view.
 */
export function CinematicBookCanvas({ scrollProgress }: CinematicBookCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full relative select-none">
      <Canvas
        shadows="soft"
        frameloop={isIntersecting ? "always" : "never"}
        dpr={[1, typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 1.75) : 1]}
        camera={{ position: [0, 2.8, 6.2], fov: 38 }}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
        }}
        className="w-full h-full pointer-events-none"
      >
        {/* Studio Lighting Rig */}
        {/* Ambient fill */}
        <ambientLight intensity={0.85} color="#fffcf5" />

        {/* Directional Key Light with soft contact shadow */}
        <directionalLight
          position={[4, 6, 5]}
          intensity={1.5}
          color="#ffffff"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-bias={-0.0001}
          shadow-camera-near={0.5}
          shadow-camera-far={20}
          shadow-camera-left={-4}
          shadow-camera-right={4}
          shadow-camera-top={4}
          shadow-camera-bottom={-4}
        />

        {/* Cool soft fill light */}
        <directionalLight
          position={[-4, 3, 2]}
          intensity={0.65}
          color="#f0f5fa"
        />

        {/* Gold accent rim light */}
        <directionalLight
          position={[0, -2, -4]}
          intensity={0.45}
          color="#ffd700"
        />

        {/* The 3D Book */}
        <HardcoverBook3D scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}


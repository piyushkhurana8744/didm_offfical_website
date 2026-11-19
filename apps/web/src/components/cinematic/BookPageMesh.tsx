"use client";

import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface BookPageMeshProps {
  width: number;
  height: number;
  frontTexture: THREE.Texture;
  backTexture: THREE.Texture;
  /** Turn progress from 0 (resting on right stack) to 1 (resting on left stack) */
  progress: number;
  liftAmplitude?: number;
  zIndexOffset?: number;
}

/**
 * Procedural Turning Page with Realistic Dynamic Curvature.
 * Dynamically computes paper arching, tension flex, and normal vectors.
 */
export function BookPageMesh({
  width,
  height,
  frontTexture,
  backTexture,
  progress,
  liftAmplitude = 0.65,
  zIndexOffset = 0.005,
}: BookPageMeshProps) {
  const meshFrontRef = useRef<THREE.Mesh>(null);
  const meshBackRef = useRef<THREE.Mesh>(null);

  const segmentsX = 36;
  const segmentsY = 16;

  // Create base plane geometries anchored at left edge (spine at x = 0)
  const [frontGeometry, backGeometry, originalPositions] = useMemo(() => {
    // Front plane: facing +Z
    const fg = new THREE.PlaneGeometry(width, height, segmentsX, segmentsY);
    fg.translate(width / 2, 0, 0); // Shift anchor so x=0 is the spine

    // Back plane: facing -Z (rotated 180 around Y so textures aren't mirrored)
    const bg = new THREE.PlaneGeometry(width, height, segmentsX, segmentsY);
    bg.translate(width / 2, 0, 0);
    bg.rotateY(Math.PI);

    // Cache original vertex positions for deformation calculations
    const posAttr = fg.attributes.position;
    const origPos = new Float32Array(posAttr.array.length);
    origPos.set(posAttr.array);

    return [fg, bg, origPos];
  }, [width, height, segmentsX, segmentsY]);

  // Current smoothed progress
  const currentProgress = useRef(progress);

  useFrame((_, delta) => {
    // Exponential smoothing towards target progress
    currentProgress.current = THREE.MathUtils.damp(
      currentProgress.current,
      progress,
      12,
      delta
    );

    const p = Math.max(0, Math.min(1, currentProgress.current));

    if (!meshFrontRef.current || !meshBackRef.current) return;

    const fg = meshFrontRef.current.geometry;
    const bg = meshBackRef.current.geometry;
    const posFront = fg.attributes.position;
    const posBack = bg.attributes.position;

    const vertexCount = posFront.count;

    // Curvature calculation for each vertex
    for (let i = 0; i < vertexCount; i++) {
      const idx = i * 3;
      const x0 = originalPositions[idx];
      const y0 = originalPositions[idx + 1];

      // Normalized distance from spine (0 at spine to 1 at outer edge)
      const u = Math.max(0, Math.min(1, x0 / width));

      // As page turns, the spine leads and the outer edge lags slightly
      const lag = 0.12 * Math.sin(Math.PI * u);
      const effectiveProgress = Math.max(0, Math.min(1, p * (1 + lag) - lag * u));

      // Rotation angle around the spine hinge (0 to -PI)
      const angle = -effectiveProgress * Math.PI;

      // Realistic paper lift arch: highest in the middle of the turn (p ~ 0.5)
      // and arched along the horizontal span
      const arch = Math.sin(Math.PI * effectiveProgress) * Math.sin(Math.PI * Math.pow(u, 0.75));
      const liftZ = liftAmplitude * arch;

      // Flex along the radius: cylindrical bend
      const curlRadius = width * (1.1 - 0.3 * Math.sin(Math.PI * effectiveProgress));
      const curlTheta = (x0 / curlRadius) * Math.sin(Math.PI * effectiveProgress) * 0.45;

      const totalAngle = angle + curlTheta;

      // Deformed coordinates
      const xNew = x0 * Math.cos(totalAngle);
      const yNew = y0;
      const zNew = -x0 * Math.sin(totalAngle) + liftZ + zIndexOffset;

      // Update front mesh
      posFront.setXYZ(i, xNew, yNew, zNew);

      // Back mesh with slight negative offset to prevent z-fighting
      posBack.setXYZ(i, xNew, yNew, zNew - 0.003);
    }

    posFront.needsUpdate = true;
    posBack.needsUpdate = true;

    fg.computeVertexNormals();
    bg.computeVertexNormals();
  });

  return (
    <group>
      {/* Front Face (Recto) */}
      <mesh ref={meshFrontRef} geometry={frontGeometry} castShadow receiveShadow>
        <meshStandardMaterial
          map={frontTexture}
          roughness={0.8}
          metalness={0.02}
          side={THREE.FrontSide}
        />
      </mesh>

      {/* Back Face (Verso) */}
      <mesh ref={meshBackRef} geometry={backGeometry} castShadow receiveShadow>
        <meshStandardMaterial
          map={backTexture}
          roughness={0.8}
          metalness={0.02}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}


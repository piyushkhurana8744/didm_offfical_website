"use client";

import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import {
  createCoverTexture,
  createInsideCoverTexture,
  createSpread1Texture,
  createSpread2Texture,
  createSpread3Texture,
  createPageEdgeTexture,
} from "./book-texture-generator";
import { BookPageMesh } from "./BookPageMesh";

interface HardcoverBook3DProps {
  /** Scroll progress from 0.0 to 1.0 */
  scrollProgress: number;
}

/**
 * Premium 3D Hardcover Book Experience for DIDM.
 * Features realistic PBR materials, gold foil deboss, and physics-curved page turns.
 */
export function HardcoverBook3D({ scrollProgress }: HardcoverBook3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const frontCoverPivotRef = useRef<THREE.Group>(null);

  // Book physical dimensions
  const pageWidth = 2.4;
  const pageHeight = 3.2;
  const coverThickness = 0.06;
  const pageStackThickness = 0.16;

  // Initialize and memoize high-res procedural textures
  const textures = useMemo(() => {
    return {
      cover: createCoverTexture(),
      insideCover: createInsideCoverTexture(),
      spread1: createSpread1Texture(),
      spread2: createSpread2Texture(),
      spread3: createSpread3Texture(),
      pageEdge: createPageEdgeTexture(),
    };
  }, []);

  // Calculate turning progress for individual stages:
  // 1. Cover Open: progress 0.15 to 0.40
  // 2. Page 1 Turn: progress 0.42 to 0.68
  // 3. Page 2 Turn: progress 0.70 to 0.92

  const coverOpenProgress = useMemo(() => {
    const start = 0.12;
    const end = 0.38;
    if (scrollProgress < start) return 0;
    if (scrollProgress > end) return 1;
    return (scrollProgress - start) / (end - start);
  }, [scrollProgress]);

  const page1Progress = useMemo(() => {
    const start = 0.40;
    const end = 0.66;
    if (scrollProgress < start) return 0;
    if (scrollProgress > end) return 1;
    return (scrollProgress - start) / (end - start);
  }, [scrollProgress]);

  const page2Progress = useMemo(() => {
    const start = 0.68;
    const end = 0.92;
    if (scrollProgress < start) return 0;
    if (scrollProgress > end) return 1;
    return (scrollProgress - start) / (end - start);
  }, [scrollProgress]);

  // Smooth interpolation in animation loop
  const currentCoverProgress = useRef(0);
  const currentPitch = useRef(0.26);
  const currentYaw = useRef(-0.25);
  const currentPosX = useRef(0);

  useFrame((state, delta) => {
    if (!groupRef.current || !frontCoverPivotRef.current) return;

    // Smooth cover rotation
    currentCoverProgress.current = THREE.MathUtils.damp(
      currentCoverProgress.current,
      coverOpenProgress,
      10,
      delta
    );

    // Front cover rotates around spine from 0 to -Math.PI
    frontCoverPivotRef.current.rotation.y = -currentCoverProgress.current * Math.PI;

    // As book opens, gently shift center to balance open double spread
    // When closed, book is slightly right; when open, center shifts so spread is centered
    const targetX = THREE.MathUtils.lerp(0.5, 0.0, currentCoverProgress.current);
    currentPosX.current = THREE.MathUtils.damp(currentPosX.current, targetX, 8, delta);

    // Subtle breathing / inspection tilt
    const targetPitch = THREE.MathUtils.lerp(0.32, 0.48, currentCoverProgress.current);
    const targetYaw = THREE.MathUtils.lerp(-0.28, -0.05, currentCoverProgress.current);

    currentPitch.current = THREE.MathUtils.damp(currentPitch.current, targetPitch, 8, delta);
    currentYaw.current = THREE.MathUtils.damp(currentYaw.current, targetYaw, 8, delta);

    groupRef.current.position.x = currentPosX.current;
    groupRef.current.rotation.x = currentPitch.current;
    groupRef.current.rotation.y = currentYaw.current;

    // Very gentle hovering float to give tactile presence
    const time = state.clock.getElapsedTime();
    groupRef.current.position.y = Math.sin(time * 0.8) * 0.04;
  });

  return (
    <group ref={groupRef} position={[0.5, 0, 0]}>
      {/* 1. SOFT STUDIO CONTACT SHADOW ON TABLE */}
      <mesh position={[0, -0.12, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[pageWidth * 2.8, pageHeight * 1.6]} />
        <meshBasicMaterial
          color="#000000"
          transparent
          opacity={0.35}
          depthWrite={false}
        />
      </mesh>

      {/* 2. BACK COVER (Laying flat on the desk) */}
      <mesh
        position={[pageWidth / 2, -pageStackThickness / 2 - coverThickness / 2, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[pageWidth + 0.08, coverThickness, pageHeight + 0.08]} />
        <meshPhysicalMaterial
          color="#7a1212"
          roughness={0.4}
          metalness={0.05}
          clearcoat={0.25}
          clearcoatRoughness={0.4}
        />
      </mesh>

      {/* 3. BOOK SPINE (Curved cylinder connecting front and back at x = 0) */}
      <mesh
        position={[-0.04, -pageStackThickness / 4, 0]}
        rotation={[0, 0, 0]}
        castShadow
      >
        <cylinderGeometry
          args={[
            pageStackThickness * 0.7,
            pageStackThickness * 0.7,
            pageHeight + 0.08,
            24,
            1,
            false,
            Math.PI * 0.5,
            Math.PI
          ]}
        />
        <meshPhysicalMaterial
          color="#700f0f"
          roughness={0.35}
          metalness={0.08}
          clearcoat={0.3}
        />
      </mesh>

      {/* 4. BASE RIGHT PAGE STACK (Ivory pages lying on back cover) */}
      <mesh
        position={[pageWidth / 2, -pageStackThickness / 4, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[pageWidth, pageStackThickness * 0.8, pageHeight]} />
        <meshStandardMaterial
          map={textures.pageEdge}
          roughness={0.85}
          metalness={0.0}
        />
      </mesh>

      {/* Base Page Spread Surface on Right Stack (displays Spread 3 underneath all turning pages) */}
      <mesh
        position={[pageWidth / 2, 0.001, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[pageWidth, pageHeight]} />
        <meshStandardMaterial
          map={textures.spread3}
          roughness={0.8}
          metalness={0.02}
        />
      </mesh>

      {/* 5. BASE LEFT PAGE STACK (Builds up when book is open) */}
      {coverOpenProgress > 0.05 && (
        <group position={[-pageWidth / 2, -pageStackThickness / 4, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry
              args={[
                pageWidth,
                pageStackThickness * 0.75 * coverOpenProgress,
                pageHeight,
              ]}
            />
            <meshStandardMaterial
              map={textures.pageEdge}
              roughness={0.85}
              metalness={0.0}
            />
          </mesh>

          {/* Left inside cover spread surface */}
          <mesh
            position={[0, 0.001, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            receiveShadow
          >
            <planeGeometry args={[pageWidth, pageHeight]} />
            <meshStandardMaterial
              map={textures.insideCover}
              roughness={0.8}
              metalness={0.02}
            />
          </mesh>
        </group>
      )}

      {/* 6. TURNING PAGE 1: Transits from Spread 1 to Spread 2 */}
      {coverOpenProgress > 0.8 && (
        <BookPageMesh
          width={pageWidth}
          height={pageHeight}
          frontTexture={textures.spread1}
          backTexture={textures.spread2}
          progress={page1Progress}
          liftAmplitude={0.75}
          zIndexOffset={0.008}
        />
      )}

      {/* 7. TURNING PAGE 2: Transits from Spread 2 to Spread 3 */}
      {page1Progress > 0.8 && (
        <BookPageMesh
          width={pageWidth}
          height={pageHeight}
          frontTexture={textures.spread2}
          backTexture={textures.spread3}
          progress={page2Progress}
          liftAmplitude={0.68}
          zIndexOffset={0.016}
        />
      )}

      {/* 8. FRONT COVER (Hinged at x = 0 along spine) */}
      <group ref={frontCoverPivotRef} position={[0, pageStackThickness / 2, 0]}>
        {/* Cover Board with thickness */}
        <mesh
          position={[pageWidth / 2, coverThickness / 2, 0]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[pageWidth + 0.08, coverThickness, pageHeight + 0.08]} />
          <meshPhysicalMaterial
            color="#801313"
            roughness={0.38}
            metalness={0.05}
            clearcoat={0.35}
            clearcoatRoughness={0.35}
          />
        </mesh>

        {/* Front Cover Artwork Plane (+Y when horizontal, facing camera when closed) */}
        <mesh
          position={[pageWidth / 2, coverThickness + 0.002, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          castShadow
        >
          <planeGeometry args={[pageWidth + 0.04, pageHeight + 0.04]} />
          <meshStandardMaterial
            map={textures.cover}
            roughness={0.4}
            metalness={0.08}
          />
        </mesh>

        {/* Inside Front Cover Spread (-Y when horizontal, facing up when opened) */}
        <mesh
          position={[pageWidth / 2, -0.002, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[pageWidth + 0.02, pageHeight + 0.02]} />
          <meshStandardMaterial
            map={textures.insideCover}
            roughness={0.8}
            metalness={0.02}
          />
        </mesh>
      </group>

      {/* 9. BOOKMARK RIBBON (Silk Crimson Ribbon) */}
      <mesh position={[0, 0.02, 0]} rotation={[0, 0, 0]}>
        <planeGeometry args={[0.08, pageHeight * 1.1]} />
        <meshStandardMaterial
          color="#a81a1a"
          roughness={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}


"use client";

import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import {
  createLaptopScreenTexture,
  createLaptopKeyboardTexture,
} from "./laptop-texture-generator";

interface LaptopWorkstation3DProps {
  progress: number;
}

export function LaptopWorkstation3D({ progress }: LaptopWorkstation3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const screenPivotRef = useRef<THREE.Group>(null);

  const textures = useMemo(() => {
    return {
      screen: createLaptopScreenTexture(),
      keyboard: createLaptopKeyboardTexture(),
    };
  }, []);

  const baseWidth = 3.6;
  const baseDepth = 2.4;
  const baseThickness = 0.08;
  const screenHeight = 2.3;
  const screenThickness = 0.06;

  // Screen open angle progress
  const openProgress = useMemo(() => {
    if (progress < 0.15) return 0;
    if (progress > 0.85) return 1;
    return (progress - 0.15) / 0.70;
  }, [progress]);

  const curOpen = useRef(0);

  useFrame((_, delta) => {
    curOpen.current = THREE.MathUtils.damp(curOpen.current, openProgress, 8, delta);

    if (screenPivotRef.current) {
      // Screen rotates backwards around hinge: 0 rad (closed) to 1.95 rad (~112 deg open)
      screenPivotRef.current.rotation.x = -curOpen.current * 1.95;
    }

    if (groupRef.current) {
      // Perspective tilt & subtle yaw as laptop opens
      const targetPitch = THREE.MathUtils.lerp(0.35, 0.45, curOpen.current);
      const targetYaw = THREE.MathUtils.lerp(-0.25, -0.05, curOpen.current);
      groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetPitch, 8, delta);
      groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetYaw, 8, delta);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Studio Shadow Beneath Base */}
      <mesh position={[0, -baseThickness - 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[baseWidth * 1.8, baseDepth * 1.6]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.3} depthWrite={false} />
      </mesh>

      {/* 1. LAPTOP BASE CHASSIS */}
      <mesh position={[0, -baseThickness / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[baseWidth, baseThickness, baseDepth]} />
        <meshPhysicalMaterial
          color="#1e2229"
          roughness={0.35}
          metalness={0.7}
          clearcoat={0.2}
        />
      </mesh>

      {/* Keyboard Surface on Top of Base (+Y) */}
      <mesh position={[0, 0.001, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[baseWidth * 0.96, baseDepth * 0.94]} />
        <meshStandardMaterial map={textures.keyboard} roughness={0.6} metalness={0.2} />
      </mesh>

      {/* 2. LAPTOP HINGE (Cylinder at back z = -baseDepth/2) */}
      <mesh position={[0, 0, -baseDepth / 2]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, baseWidth * 0.7, 16]} />
        <meshPhysicalMaterial color="#111317" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* 3. SCREEN LID (Hinged at back z = -baseDepth/2) */}
      <group ref={screenPivotRef} position={[0, 0, -baseDepth / 2]}>
        {/* Lid Shell (extends forward in +Z when closed) */}
        <mesh position={[0, screenThickness / 2, baseDepth / 2]} castShadow receiveShadow>
          <boxGeometry args={[baseWidth, screenThickness, screenHeight]} />
          <meshPhysicalMaterial
            color="#1a1d24"
            roughness={0.3}
            metalness={0.75}
            clearcoat={0.3}
          />
        </mesh>

        {/* Screen Bezel & Display (+Y when flat, faces user when open) */}
        <mesh
          position={[0, 0.002, baseDepth / 2]}
          rotation={[Math.PI / 2, 0, 0]}
          castShadow
        >
          <planeGeometry args={[baseWidth * 0.94, screenHeight * 0.92]} />
          <meshStandardMaterial
            map={textures.screen}
            roughness={0.2}
            metalness={0.05}
          />
        </mesh>
      </group>
    </group>
  );
}


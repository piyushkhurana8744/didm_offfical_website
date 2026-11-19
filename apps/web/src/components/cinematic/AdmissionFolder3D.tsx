"use client";

import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import {
  createFolderCoverTexture,
  createApplicationSheetTexture,
} from "./admission-texture-generator";

interface AdmissionFolder3DProps {
  progress: number;
}

export function AdmissionFolder3D({ progress }: AdmissionFolder3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const flapPivotRef = useRef<THREE.Group>(null);
  const sheetGroupRef = useRef<THREE.Group>(null);

  const textures = useMemo(() => {
    return {
      cover: createFolderCoverTexture(),
      sheet: createApplicationSheetTexture(),
    };
  }, []);

  const folderWidth = 2.4;
  const folderHeight = 3.0;

  // Progress segmentation:
  // 1. Cover Open: progress 0.10 to 0.45
  // 2. Sheet Rise: progress 0.40 to 0.85

  const coverProgress = useMemo(() => {
    if (progress < 0.10) return 0;
    if (progress > 0.45) return 1;
    return (progress - 0.10) / 0.35;
  }, [progress]);

  const sheetProgress = useMemo(() => {
    if (progress < 0.40) return 0;
    if (progress > 0.85) return 1;
    return (progress - 0.40) / 0.45;
  }, [progress]);

  const curCover = useRef(0);
  const curSheet = useRef(0);

  useFrame((_, delta) => {
    curCover.current = THREE.MathUtils.damp(curCover.current, coverProgress, 9, delta);
    curSheet.current = THREE.MathUtils.damp(curSheet.current, sheetProgress, 9, delta);

    if (flapPivotRef.current) {
      // Cover hinges open to the left (-140 degrees)
      flapPivotRef.current.rotation.y = -curCover.current * (Math.PI * 0.78);
    }

    if (sheetGroupRef.current) {
      // Sheet lifts upward out of the folder and angles forward
      const liftY = curSheet.current * 0.65;
      const liftZ = curSheet.current * 0.25;
      const tiltX = curSheet.current * 0.12;

      sheetGroupRef.current.position.y = liftY;
      sheetGroupRef.current.position.z = liftZ + 0.02;
      sheetGroupRef.current.rotation.x = tiltX;
    }

    if (groupRef.current) {
      // Subtle tilt based on progress
      const targetPitch = 0.22 + curCover.current * 0.08;
      const targetYaw = -0.25 + curCover.current * 0.15;
      groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetPitch, 8, delta);
      groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetYaw, 8, delta);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Soft Contact Shadow */}
      <mesh position={[0, -folderHeight / 2 - 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[folderWidth * 2.2, folderHeight * 1.5]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.25} depthWrite={false} />
      </mesh>

      {/* Back Folder Board */}
      <mesh position={[0, 0, -0.02]} castShadow receiveShadow>
        <boxGeometry args={[folderWidth, folderHeight, 0.03]} />
        <meshPhysicalMaterial color="#6e1010" roughness={0.4} clearcoat={0.3} />
      </mesh>

      {/* Folder Tab at top right */}
      <mesh position={[folderWidth / 2 - 0.35, folderHeight / 2 + 0.12, -0.02]}>
        <boxGeometry args={[0.7, 0.24, 0.03]} />
        <meshPhysicalMaterial color="#8b1818" roughness={0.4} clearcoat={0.3} />
      </mesh>

      {/* Application Sheet (Inside folder, rises on scroll) */}
      <group ref={sheetGroupRef} position={[0, 0, 0.01]}>
        <mesh castShadow receiveShadow>
          <planeGeometry args={[folderWidth * 0.92, folderHeight * 0.92]} />
          <meshStandardMaterial map={textures.sheet} roughness={0.8} />
        </mesh>
      </group>

      {/* Front Flap / Cover (Hinged along left edge x = -folderWidth/2) */}
      <group ref={flapPivotRef} position={[-folderWidth / 2, 0, 0.02]}>
        <mesh position={[folderWidth / 2, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[folderWidth, folderHeight, 0.02]} />
          <meshPhysicalMaterial color="#7a1212" roughness={0.38} clearcoat={0.35} />
        </mesh>

        {/* Front Cover Texture */}
        <mesh position={[folderWidth / 2, 0, 0.012]} castShadow>
          <planeGeometry args={[folderWidth * 0.98, folderHeight * 0.98]} />
          <meshStandardMaterial map={textures.cover} roughness={0.4} metalness={0.05} />
        </mesh>
      </group>
    </group>
  );
}


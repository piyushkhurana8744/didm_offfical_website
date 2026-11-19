"use client";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { Block, Tree, Sign, Screen, AnimatedStudent } from "./ScenePrimitives";
import { CAMPUS_LABS, type SceneStop } from "./scene-data";

export function InteractiveLearningLab({
  lab,
  active,
  onSelect,
  onHover,
}: {
  lab: SceneStop;
  active: boolean;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
}) {
  const [hover, setHover] = useState(false);
  const root = useRef<Group>(null);
  useFrame((_, d) => {
    if (root.current)
      root.current.position.y +=
        ((active || hover ? 0.15 : 0) - root.current.position.y) *
        (1 - Math.exp(-d * 6));
  });
  return (
    <group name={lab.id} position={lab.position}>
      <group
        ref={root}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(lab.id);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHover(true);
          onHover(lab.id);
        }}
        onPointerOut={() => {
          setHover(false);
          onHover(null);
        }}
      >
        <Block
          p={[0, 0.09, 0]}
          s={[3, 0.18, 2.6]}
          color={hover || active ? lab.color : "#d8cdb9"}
        />
        <Block p={[0, 0.22, -1.05]} s={[2.8, 0.25, 0.12]} color={lab.color} />
        {lab.id === "seo-lab" && (
          <>
            <Block p={[0, 1.15, -0.8]} s={[2.7, 1.8, 0.14]} />
            <Screen p={[0, 1.3, -0.68]} color={lab.color} />
            <Block p={[0, 0.67, 0.2]} s={[2.2, 0.1, 0.9]} color="#cba97b" />
            <Sign text="SEARCH & DISCOVER" p={[0, 2.2, -0.7]} width={2.7} />
          </>
        )}
        {lab.id === "social-studio" && (
          <>
            <Block p={[0, 1.15, -0.9]} s={[2.7, 1.8, 0.12]} color="#dbb5ae" />
            <Block p={[-0.6, 0.5, 0]} s={[1.2, 0.5, 0.8]} color="#eedbce" />
            <Block p={[0.65, 1.1, 0]} s={[0.1, 1.8, 0.1]} color="#344b57" />
            <mesh position={[0.65, 1.9, 0]}>
              <torusGeometry args={[0.42, 0.055, 8, 24]} />
              <meshStandardMaterial color="#fff8e5" />
            </mesh>
            <Block
              p={[0.65, 1.6, 0.08]}
              s={[0.24, 0.38, 0.08]}
              color="#344b57"
            />
            <Sign text="CREATE & CONNECT" p={[0, 2.2, -0.8]} width={2.7} />
          </>
        )}
        {lab.id === "ads-centre" && (
          <>
            <Block p={[0, 0.75, -0.1]} s={[2.8, 0.12, 1.4]} color="#cba97b" />
            {[-0.8, 0.8].map((x) => (
              <Block
                key={x}
                p={[x, 0.4, -0.1]}
                s={[0.12, 0.7, 1.2]}
                color="#526467"
              />
            ))}
            <Screen p={[-0.65, 1.65, -0.35]} width={1.15} color={lab.color} />
            <Screen p={[0.65, 1.65, -0.35]} width={1.15} color="#c38a3e" />
          </>
        )}
        {lab.id === "ai-lab" && (
          <>
            <Block p={[0, 0.7, 0]} s={[2.6, 0.15, 1.5]} color="#e9e1d3" />
            <Screen
              p={[0, 1.65, -0.45]}
              kind="prompt"
              width={2.4}
              color={lab.color}
            />
            {[-1, 1].map((x) => (
              <Block
                key={x}
                p={[x, 0.35, 0]}
                s={[0.15, 0.7, 1.2]}
                color={lab.color}
              />
            ))}
            <Block p={[0.7, 0.84, 0.3]} s={[0.6, 0.13, 0.45]} color="#b8a4c4" />
          </>
        )}
        {lab.id === "analytics-observatory" && (
          <>
            <Block p={[0, 1.1, -0.8]} s={[2.7, 1.7, 0.15]} color="#526e67" />
            <Screen p={[0, 1.4, -0.65]} width={2.4} color={lab.color} />
            {[0, 1, 2, 3].map((i) => (
              <Block
                key={i}
                p={[-0.85 + i * 0.55, 0.3 + i * 0.1, 0.45]}
                s={[0.35, 0.35 + i * 0.2, 0.4]}
                color={["#8eac9c", "#78a18a", "#527f6a", "#325f52"][i]}
              />
            ))}
          </>
        )}
        <Sign
          text={lab.name.toUpperCase()}
          p={[0, 0.49, 1.32]}
          width={2.75}
          color="#fff8ed"
          background={active || hover ? lab.color : "#344b57"}
        />
      </group>
    </group>
  );
}
function Academy() {
  return (
    <group name="DIDM-academy" position={[0, 0, -0.5]}>
      <Block p={[0, 0.15, 0]} s={[5.3, 0.3, 3.2]} color="#ccbea8" />
      <Block p={[0, 1.55, -0.15]} s={[4.6, 2.8, 2.3]} />
      <Block p={[0, 3.05, -0.15]} s={[4.9, 0.25, 2.65]} color="#b52828" />
      <Block p={[-2.05, 1.8, 1.1]} s={[0.35, 2.7, 0.55]} color="#b52828" />
      <Block p={[2.05, 1.8, 1.1]} s={[0.35, 2.7, 0.55]} color="#b52828" />
      {[-1.35, -0.48, 0.48, 1.35].map((x) => (
        <group key={x}>
          <Block p={[x, 2.25, 1.015]} s={[0.62, 0.72, 0.05]} color="#6f969c" />
          <Block p={[x, 2.25, 1.05]} s={[0.04, 0.72, 0.03]} color="#f5eedf" />
        </group>
      ))}
      <Block p={[0, 0.9, 1.04]} s={[1.1, 1.5, 0.08]} color="#416971" />
      <Block p={[0, 0.9, 1.1]} s={[0.055, 1.5, 0.05]} color="#cba97b" />
      {[-1.4, 1.4].map((x) => (
        <Block
          key={x}
          p={[x, 0.95, 1.04]}
          s={[0.65, 1.2, 0.05]}
          color="#86a3a2"
        />
      ))}
      <Block p={[0, 1.77, 1.45]} s={[4.7, 0.15, 1.1]} color="#b52828" />
      <Sign
        text="DIDM  /  DIGITAL ACADEMY"
        p={[0, 2.94, 1.2]}
        width={3.8}
        color="#fff8ed"
        background="#b52828"
      />
      {[0, 1, 2].map((i) => (
        <Block
          key={i}
          p={[0, 0.06 + i * 0.055, 2 - i * 0.25]}
          s={[2.2, 0.11, 0.45]}
          color="#e3d7c3"
        />
      ))}
      <Block p={[-1.65, 3.35, -0.5]} s={[0.65, 0.3, 0.8]} color="#c3c1b4" />
    </group>
  );
}
export function LearningCampusScene({
  active,
  onSelect,
  onHover,
}: {
  active: string | null;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
}) {
  return (
    <group>
      <Block p={[0, -0.4, 0]} s={[16, 0.7, 13.7]} color="#d5c8ae" />
      <Block p={[0, -0.025, 0]} s={[15.7, 0.1, 13.4]} color="#e7e0ce" />
      <Block p={[0, 0.04, 3.4]} s={[13.8, 0.06, 1.55]} color="#f9f2e6" />
      <Block p={[0, 0.04, 0]} s={[1.6, 0.06, 12.6]} color="#f9f2e6" />
      {[-1, 1].map((x) => (
        <Block
          key={x}
          p={[x * 3.05, 0.06, -0.7]}
          s={[0.75, 0.08, 6.8]}
          color="#a8b596"
        />
      ))}
      <Academy />
      {CAMPUS_LABS.map((lab) => (
        <InteractiveLearningLab
          key={lab.id}
          lab={lab}
          active={active === lab.id}
          onSelect={onSelect}
          onHover={onHover}
        />
      ))}
      {[
        [-7, 0, -5.3],
        [-7, 0, 0.5],
        [7, 0, 0.5],
        [7, 0, -5.3],
        [-3.5, 0, 5.6],
        [3.5, 0, 5.6],
      ].map((p, i) => (
        <Tree key={i} p={p as [number, number, number]} />
      ))}
      {[-2.5, 2.5].map((x) => (
        <group key={x} position={[x, 0, 5.4]}>
          <Block p={[0, 0.45, 0]} s={[1.5, 0.1, 0.5]} color="#b6916a" />
          {[-0.5, 0.5].map((v) => (
            <Block
              key={v}
              p={[v, 0.22, 0]}
              s={[0.1, 0.45, 0.4]}
              color="#526467"
            />
          ))}
        </group>
      ))}
      <AnimatedStudent start={[-3.8, 0, 3.1]} end={[2.8, 0, 3.1]} />
      <AnimatedStudent
        name="student-creative"
        start={[-3, 0, -3.8]}
        end={[-3, 0, 1.6]}
        color="#356a72"
      />
      <AnimatedStudent
        name="student-ai"
        start={[4.6, 0, -1]}
        stationary
        color="#c38a3e"
      />
      <Sign
        text="A CAMPUS FOR YOUR DIGITAL FUTURE"
        p={[0, -0.23, 6.89]}
        width={8}
        color="#696f62"
        background="#d5c8ae"
      />
    </group>
  );
}

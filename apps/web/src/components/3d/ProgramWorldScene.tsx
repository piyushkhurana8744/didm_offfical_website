"use client";
import { useEffect, useRef, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader, SRGBColorSpace, type Group } from "three";
import { Block, Sign, Screen, Tree, AnimatedStudent } from "./ScenePrimitives";
import { pathPoint, type SceneStop, type WorldKind } from "./scene-data";
function Photo({ stop }: { stop: SceneStop }) {
  const t = useLoader(TextureLoader, stop.image!);
  useEffect(() => {
    t.colorSpace = SRGBColorSpace;
  }, [t]);
  const aspect = t.image.width / t.image.height;
  return (
    <mesh position={[0, 1.55, 0.12]}>
      <planeGeometry args={[2.5, 2.5 / aspect]} />
      <meshBasicMaterial map={t} />
    </mesh>
  );
}
function Stop({
  stop,
  index,
  kind,
  active,
  onSelect,
  onHover,
}: {
  stop: SceneStop;
  index: number;
  kind: WorldKind;
  active: boolean;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
}) {
  const [hover, setHover] = useState(false);
  return (
    <group
      name={stop.id}
      position={stop.position}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(stop.id);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHover(true);
        onHover(stop.id);
      }}
      onPointerOut={() => {
        setHover(false);
        onHover(null);
      }}
    >
      <Block
        p={[0, 0.12, 0]}
        s={[kind === "journey" ? 0.4 : 3, 0.24, kind === "journey" ? 0.4 : 2.6]}
        color={active || hover ? stop.color : "#d9cbb8"}
      />
      {kind === "discovery" ? (
        <>
          <Block p={[0, 1.4, 0]} s={[2.8, 2.4, 0.18]} color="#f5eedf" />
          <Photo stop={stop} />
        </>
      ) : kind === "timeline" || kind === "journey" ? (
        <>
          <Block
            p={[0, active ? 0.65 : 0.35, 0]}
            s={[
              kind === "journey" ? 0.25 : 1.2,
              active ? 1.1 : 0.5,
              kind === "journey" ? 0.25 : 1.2,
            ]}
            color={stop.color}
          />
          {(kind !== "journey" || active || index % 10 === 0) && (
            <Sign
              text={
                kind === "journey"
                  ? String(index + 1).padStart(2, "0")
                  : stop.name
              }
              p={[0, kind === "journey" ? 1.25 : 1.75, 0.2]}
              width={kind === "journey" ? 0.75 : 2.8}
            />
          )}
        </>
      ) : (
        <>
          <Block p={[0, 0.85, 0]} s={[2.8, 0.12, 1.5]} color="#cba97b" />
          {[-1, 1].map((x) => (
            <Block
              key={x}
              p={[x, 0.42, 0]}
              s={[0.15, 0.84, 1.3]}
              color="#526467"
            />
          ))}
          <Screen
            p={[0, 1.85, -0.35]}
            width={2.4}
            kind={
              kind === "ai"
                ? ["prompt", "creative", "review"][index % 3]
                : kind === "virtual"
                  ? ["class", "creative", "review"][index % 3]
                  : ["brief", "creative", "bars"][index % 3]
            }
            color={stop.color}
          />
          {kind === "ai" && (
            <Block p={[0.7, 1, 0.3]} s={[0.6, 0.13, 0.4]} color="#b8a4c4" />
          )}
          {kind === "virtual" && (
            <Block p={[0, 1.1, 1]} s={[1, 0.7, 0.15]} color="#72918c" />
          )}
        </>
      )}
      {kind !== "journey" && kind !== "timeline" && (
        <Sign
          text={stop.name.toUpperCase()}
          p={[0, 0.42, 1.32]}
          width={2.75}
          color="#fff8ed"
          background={active || hover ? stop.color : "#344b57"}
        />
      )}
    </group>
  );
}
export function ProgramWorldScene({
  kind,
  stops,
  active,
  onSelect,
  onHover,
  progressIndex,
}: {
  kind: WorldKind;
  stops: SceneStop[];
  active: string | null;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
  progressIndex?: number;
}) {
  const end = stops[
    progressIndex ??
      (active
        ? Math.max(
            0,
            stops.findIndex((s) => s.id === active),
          )
        : stops.length - 1)
  ]?.position ?? [0, 0, 0];
  return (
    <group>
      <Block p={[0, -0.3, 0]} s={[16, 0.55, 9]} color="#d5c8ae" />
      <Block p={[0, 0, 0]} s={[15.7, 0.08, 8.7]} color="#e7e0ce" />
      {(kind === "journey" || kind === "timeline") &&
        stops.slice(1).map((s, i) => {
          const a = stops[i].position;
          const dx = s.position[0] - a[0],
            dz = s.position[2] - a[2];
          return (
            <group
              key={s.id}
              position={[
                (s.position[0] + a[0]) / 2,
                0.06,
                (s.position[2] + a[2]) / 2,
              ]}
              rotation={[0, Math.atan2(dx, dz), 0]}
            >
              <Block s={[0.35, 0.08, Math.hypot(dx, dz)]} color="#fdf7ea" />
            </group>
          );
        })}
      {stops.map((s, i) => (
        <Stop
          key={s.id}
          stop={s}
          index={i}
          kind={kind}
          active={active === s.id}
          onSelect={onSelect}
          onHover={onHover}
        />
      ))}
      {kind === "journey" ? (
        <AnimatedStudent
          start={[
            stops[0]?.position[0] ?? -6,
            0,
            (stops[0]?.position[2] ?? 0) + 0.9,
          ]}
          end={[end[0], 0, end[2] + 0.9]}
          progress={active ? (progressIndex ?? 0) : undefined}
          followJourney
        />
      ) : (
        <AnimatedStudent
          start={[-4, 0, 2.7]}
          end={[4, 0, 2.7]}
          color="#b52828"
        />
      )}
      {[-1, 1].map((i) => (
        <Tree key={i} p={[i * 7, 0, -3]} />
      ))}
      <Sign
        text={
          kind === "ai"
            ? "CONTEXT  /  CREATION  /  HUMAN REVIEW"
            : kind === "virtual"
              ? "YOUR VIRTUAL LEARNING STUDIO"
              : kind === "performance"
                ? "CAMPAIGN WORKSPACE  /  LEARNING DEMONSTRATION"
                : kind === "journey"
                  ? "YOUR LEARNING JOURNEY"
                  : "DISCOVER DIDM"
        }
        p={[0, -0.23, 4.52]}
        width={11}
        background="#d5c8ae"
      />
    </group>
  );
}

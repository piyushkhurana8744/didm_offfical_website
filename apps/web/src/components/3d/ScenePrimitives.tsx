"use client";
import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { CanvasTexture, SRGBColorSpace, type Group, type Mesh } from "three";
export function Block({
  p = [0, 0, 0],
  s = [1, 1, 1],
  color = "#f5eedf",
  ...props
}: {
  p?: [number, number, number];
  s?: [number, number, number];
  color?: string;
  [key: string]: unknown;
}) {
  return (
    <mesh position={p} castShadow receiveShadow {...props}>
      <boxGeometry args={s} />
      <meshStandardMaterial color={color} roughness={0.78} />
    </mesh>
  );
}
export function Sign({
  text,
  p = [0, 0, 0],
  width = 2,
  color = "#283c3e",
  background = "#fff9ed",
}: {
  text: string;
  p?: [number, number, number];
  width?: number;
  color?: string;
  background?: string;
}) {
  const texture = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 768;
    c.height = 144;
    const x = c.getContext("2d")!;
    x.fillStyle = background;
    x.fillRect(0, 0, c.width, c.height);
    x.fillStyle = color;
    x.font = "700 48px Arial";
    x.textAlign = "center";
    x.textBaseline = "middle";
    x.fillText(text, 384, 76, 728);
    const t = new CanvasTexture(c);
    t.colorSpace = SRGBColorSpace;
    return t;
  }, [text, color, background]);
  useEffect(() => () => texture.dispose(), [texture]);
  return (
    <mesh position={p}>
      <planeGeometry args={[width, (width * 144) / 768]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
}
export function Tree({ p }: { p: [number, number, number] }) {
  return (
    <group position={p}>
      <mesh position={[0, 0.6, 0]} castShadow>
        <cylinderGeometry args={[0.09, 0.14, 1.2, 6]} />
        <meshStandardMaterial color="#9e8064" />
      </mesh>
      <mesh position={[0, 1.45, 0]} castShadow scale={[0.85, 1.15, 0.85]}>
        <icosahedronGeometry args={[0.72, 1]} />
        <meshStandardMaterial color="#638574" roughness={1} />
      </mesh>
    </group>
  );
}
export function Screen({
  p = [0, 0, 0],
  color = "#7faaa9",
  kind = "bars",
  width = 1.6,
}: {
  p?: [number, number, number];
  color?: string;
  kind?: string;
  width?: number;
}) {
  const bars = useRef<Group>(null);
  useFrame(({ clock }) => {
    bars.current?.children.forEach((b, i) => {
      b.scale.y = 0.65 + Math.sin(clock.elapsedTime * 1.6 + i) * 0.25;
    });
  });
  return (
    <group position={p}>
      <Block s={[width, 1.05, 0.12]} color="#263e43" />
      <Block p={[0, -0.7, 0]} s={[0.12, 0.4, 0.12]} color="#263e43" />
      <Block p={[0, -0.87, 0.1]} s={[0.65, 0.06, 0.4]} color="#263e43" />
      <Block
        p={[0, 0.01, 0.07]}
        s={[width - 0.14, 0.88, 0.015]}
        color="#e6f0e9"
      />
      {kind === "bars" ? (
        <group ref={bars} position={[-width * 0.32, -0.28, 0.09]}>
          {[0, 1, 2, 3, 4].map((i) => (
            <Block
              key={i}
              p={[i * width * 0.15, 0.2, 0]}
              s={[width * 0.09, 0.2 + i * 0.08, 0.016]}
              color={color}
            />
          ))}
        </group>
      ) : kind === "class" ? (
        <group>
          {[0, 1, 2, 3].map((i) => (
            <group
              key={i}
              position={[
                ((i % 2) - 0.5) * width * 0.42,
                -0.07 - Math.floor(i / 2) * 0.3,
                0.09,
              ]}
            >
              <Block
                s={[width * 0.36, 0.23, 0.015]}
                color={i === 0 ? color : "#c4d6ca"}
              />
              <mesh position={[0, 0.015, 0.02]}>
                <circleGeometry args={[0.055, 10]} />
                <meshBasicMaterial color="#fff8ed" />
              </mesh>
            </group>
          ))}
        </group>
      ) : kind === "creative" ? (
        <group>
          <Block
            p={[-width * 0.2, -0.05, 0.09]}
            s={[width * 0.35, 0.5, 0.015]}
            color={color}
          />
          <Sign
            text="YOUR IDEA"
            p={[-width * 0.2, -0.06, 0.12]}
            width={width * 0.3}
          />
          <Block
            p={[width * 0.22, 0.06, 0.09]}
            s={[width * 0.35, 0.06, 0.015]}
            color="#87a59a"
          />
          <Block
            p={[width * 0.18, -0.1, 0.09]}
            s={[width * 0.27, 0.05, 0.015]}
            color="#bbc9ba"
          />
          <Block
            p={[width * 0.16, -0.27, 0.09]}
            s={[width * 0.24, 0.09, 0.015]}
            color={color}
          />
        </group>
      ) : (
        <group>
          {[0, 1, 2].map((i) => (
            <group key={i} position={[-width * 0.32, 0.1 - i * 0.23, 0.09]}>
              <Block s={[width * 0.05, 0.07, 0.015]} color={color} />
              <Sign
                text={
                  kind === "review"
                    ? [
                        "CHECK ACCURACY",
                        "CHECK BRAND VOICE",
                        "REVIEW & APPROVE",
                      ][i]
                    : kind === "brief"
                      ? [
                          "DEFINE OBJECTIVE",
                          "KNOW YOUR AUDIENCE",
                          "PLAN YOUR MESSAGE",
                        ][i]
                      : [
                          "SET CONTEXT",
                          "GIVE INSTRUCTIONS",
                          "DEFINE THE FORMAT",
                        ][i]
                }
                p={[width * 0.36, 0, 0.015]}
                width={width * 0.62}
              />
            </group>
          ))}
        </group>
      )}
      <Sign
        text={
          kind === "prompt"
            ? "CONTEXT → CREATE → REVIEW"
            : kind === "class"
              ? "LIVE • LEARN • PRACTICE"
              : kind === "creative"
                ? "CREATIVE WORKSPACE"
                : kind === "review"
                  ? "HUMAN REVIEW"
                  : kind === "brief"
                    ? "CAMPAIGN BRIEF"
                    : "LEARN • BUILD • MEASURE"
        }
        p={[0, 0.34, 0.09]}
        width={width * 0.88}
      />
    </group>
  );
}
export function AnimatedStudent({
  name = "student-explorer",
  start = [-3, 0, 3],
  end = [2.5, 0, 3],
  color = "#b52828",
  stationary = false,
  progress,
  followJourney = false,
}: {
  name?: string;
  start?: [number, number, number];
  end?: [number, number, number];
  color?: string;
  stationary?: boolean;
  progress?: number;
  followJourney?: boolean;
}) {
  const root = useRef<Group>(null),
    leftLeg = useRef<Group>(null),
    rightLeg = useRef<Group>(null),
    leftArm = useRef<Group>(null),
    rightArm = useRef<Group>(null),
    head = useRef<Group>(null),
    time = useRef(0),
    x = useRef(start[0]),
    z = useRef(start[2]);
  useFrame((_, d) => {
    time.current += Math.min(d, 0.05);
    const t = time.current;
    const phase = t % 14;
    const walking =
      !stationary &&
      (progress !== undefined
        ? Math.abs(x.current - end[0]) > 0.04
        : phase < 5 || (phase >= 7 && phase < 12));
    const ratio =
      phase < 5
        ? phase / 5
        : phase < 7
          ? 1
          : phase < 12
            ? 1 - (phase - 7) / 5
            : 0;
    const tx =
      progress !== undefined ? end[0] : start[0] + (end[0] - start[0]) * ratio;
    const tz =
      progress !== undefined ? end[2] : start[2] + (end[2] - start[2]) * ratio;
    if (root.current) {
      if (progress !== undefined) {
        const a = 1 - Math.exp(-d * 2);
        x.current += (tx - x.current) * a;
        z.current += (tz - z.current) * a;
      } else {
        x.current = tx;
        z.current = tz;
      }
      if (followJourney)
        z.current = Math.sin(((x.current + 6) / 12) * Math.PI * 2) * 2.4 + 0.9;
      root.current.position.set(x.current, 0, z.current);
      root.current.userData.walking = walking;
      root.current.rotation.y = walking
        ? Math.atan2(end[0] - start[0], end[2] - start[2]) +
          (progress === undefined && phase >= 7 ? Math.PI : 0)
        : Math.sin(t * 0.6) * 0.2;
    }
    const swing = walking ? Math.sin(t * 8) * 0.55 : 0;
    if (leftLeg.current) leftLeg.current.rotation.x = swing;
    if (rightLeg.current) rightLeg.current.rotation.x = -swing;
    if (leftArm.current)
      leftArm.current.rotation.x = walking ? -swing * 0.8 : -0.8;
    if (rightArm.current)
      rightArm.current.rotation.x = walking ? swing * 0.8 : -0.65;
    if (head.current)
      head.current.rotation.x = walking ? 0 : 0.15 + Math.sin(t) * 0.05;
  });
  return (
    <group ref={root} name={name} position={start} scale={1.18}>
      <Block p={[0, 0.79, 0]} s={[0.35, 0.17, 0.23]} color="#344b57" />
      {[-1, 1].map((side, i) => (
        <group
          ref={i === 0 ? leftLeg : rightLeg}
          key={side}
          position={[side * 0.115, 0.77, 0]}
        >
          <Block p={[0, -0.3, 0]} s={[0.15, 0.6, 0.17]} color="#344b57" />
          <Block p={[0, -0.66, 0.065]} s={[0.19, 0.12, 0.31]} color="#fff9ed" />
        </group>
      ))}
      <mesh position={[0, 1.09, 0]} castShadow>
        <capsuleGeometry args={[0.22, 0.35, 4, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <Block p={[0, 1.08, -0.23]} s={[0.31, 0.4, 0.16]} color="#e4b76b" />
      {[-1, 1].map((side, i) => (
        <group
          key={side}
          ref={i === 0 ? leftArm : rightArm}
          position={[side * 0.29, 1.3, 0]}
        >
          <mesh position={[0, -0.19, 0]} castShadow>
            <capsuleGeometry args={[0.075, 0.27, 3, 8]} />
            <meshStandardMaterial color={color} />
          </mesh>
          <mesh position={[0, -0.42, 0]}>
            <sphereGeometry args={[0.08, 8, 6]} />
            <meshStandardMaterial color="#bd8761" />
          </mesh>
        </group>
      ))}
      <group ref={head} position={[0, 1.59, 0]}>
        <mesh castShadow scale={[0.85, 1.1, 0.9]}>
          <sphereGeometry args={[0.2, 12, 10]} />
          <meshStandardMaterial color="#bd8761" />
        </mesh>
        <mesh position={[0, 0.13, -0.035]} scale={[1, 0.55, 1]}>
          <sphereGeometry args={[0.21, 12, 8]} />
          <meshStandardMaterial color="#302d2c" />
        </mesh>
        {[-1, 1].map((i) => (
          <mesh key={i} position={[i * 0.07, 0.02, 0.17]}>
            <sphereGeometry args={[0.018, 6, 4]} />
            <meshStandardMaterial color="#273437" />
          </mesh>
        ))}
      </group>
    </group>
  );
}

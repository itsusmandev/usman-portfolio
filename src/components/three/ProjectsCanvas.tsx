"use client";

import { Float, RoundedBox, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Group } from "three";

type ProjectsVisualProps = {
  reducedMotion: boolean;
  isMobile: boolean;
};

function ProjectPanel({
  position,
  rotation,
  scale,
  accent,
  reducedMotion,
}: {
  position: readonly [number, number, number];
  rotation: readonly [number, number, number];
  scale: number;
  accent: string;
  reducedMotion: boolean;
}) {
  return (
    <Float
      speed={reducedMotion ? 0 : 1.15}
      floatIntensity={reducedMotion ? 0 : 0.45}
      rotationIntensity={reducedMotion ? 0 : 0.15}
    >
      <group position={position} rotation={rotation} scale={scale}>
        <RoundedBox args={[1.8, 1.15, 0.06]} radius={0.06} smoothness={4}>
          <meshStandardMaterial
            color="#0b1520"
            metalness={0.4}
            roughness={0.35}
            transparent
            opacity={0.88}
          />
        </RoundedBox>
        <mesh position={[0, 0, 0.04]}>
          <planeGeometry args={[1.55, 0.9]} />
          <meshStandardMaterial
            color="#071018"
            emissive={accent}
            emissiveIntensity={0.22}
            transparent
            opacity={0.95}
          />
        </mesh>
        <mesh position={[-0.5, 0.32, 0.05]}>
          <planeGeometry args={[0.45, 0.08]} />
          <meshStandardMaterial
            color={accent}
            emissive={accent}
            emissiveIntensity={0.7}
            transparent
            opacity={0.75}
          />
        </mesh>
        <mesh position={[-0.28, 0.12, 0.05]}>
          <planeGeometry args={[0.9, 0.05]} />
          <meshStandardMaterial color="#64748b" transparent opacity={0.45} />
        </mesh>
        <mesh position={[-0.4, -0.05, 0.05]}>
          <planeGeometry args={[0.65, 0.05]} />
          <meshStandardMaterial color="#475569" transparent opacity={0.35} />
        </mesh>
        {[0, 1, 2].map((i) => (
          <mesh key={i} position={[-0.48 + i * 0.38, -0.32, 0.05]}>
            <planeGeometry args={[0.3, 0.22]} />
            <meshStandardMaterial
              color={accent}
              emissive={accent}
              emissiveIntensity={0.25}
              transparent
              opacity={0.28 + i * 0.08}
            />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

function WorkOrbit({ reducedMotion, isMobile }: ProjectsVisualProps) {
  const root = useRef<Group>(null);
  const panels = useMemo(
    () =>
      [
        {
          position: [-1.6, 0.55, 0.2] as const,
          rotation: [0.12, 0.45, -0.08] as const,
          scale: isMobile ? 0.72 : 0.9,
          accent: "#2dd4bf",
        },
        {
          position: [1.45, 0.2, -0.15] as const,
          rotation: [-0.08, -0.5, 0.06] as const,
          scale: isMobile ? 0.68 : 0.85,
          accent: "#38bdf8",
        },
        {
          position: [0.15, -0.95, 0.35] as const,
          rotation: [0.18, 0.15, 0.04] as const,
          scale: isMobile ? 0.6 : 0.75,
          accent: "#5eead4",
        },
      ] as const,
    [isMobile],
  );

  useFrame(({ pointer, clock }, dt) => {
    if (!root.current) return;
    if (reducedMotion) {
      root.current.rotation.set(0.08, 0.25, 0);
      return;
    }
    const t = clock.getElapsedTime();
    root.current.rotation.y +=
      (pointer.x * 0.35 + Math.sin(t * 0.2) * 0.08 - root.current.rotation.y) *
      Math.min(dt * 1.7, 1);
    root.current.rotation.x +=
      (-pointer.y * 0.2 + 0.1 - root.current.rotation.x) * Math.min(dt * 1.7, 1);
  });

  return (
    <group ref={root}>
      {panels.map((panel, i) => (
        <ProjectPanel key={i} {...panel} reducedMotion={reducedMotion} />
      ))}
      {!isMobile ? (
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -1.45, 0]}>
          <ringGeometry args={[1.8, 1.84, 64]} />
          <meshStandardMaterial
            color="#2dd4bf"
            emissive="#2dd4bf"
            emissiveIntensity={0.4}
            transparent
            opacity={0.35}
          />
        </mesh>
      ) : null}
      <Sparkles
        count={isMobile ? 12 : 26}
        scale={[6, 4, 4]}
        size={1.5}
        speed={reducedMotion ? 0 : 0.22}
        color="#a5f3fc"
        opacity={0.45}
      />
    </group>
  );
}

export function ProjectsCanvas({
  reducedMotion,
  isMobile,
}: ProjectsVisualProps) {
  return (
    <Canvas
      dpr={isMobile ? [1, 1.25] : [1, 1.5]}
      camera={{ position: [0, 0.2, 5.4], fov: 40 }}
      gl={{
        antialias: true,
        powerPreference: "high-performance",
        alpha: true,
      }}
      frameloop={reducedMotion ? "demand" : "always"}
      className="h-full w-full"
    >
      <hemisphereLight intensity={0.45} color="#dbeafe" groundColor="#061018" />
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 4, 2]} intensity={1.15} color="#f8fafc" />
      <pointLight position={[2, 1.5, 2]} intensity={18} color="#2dd4bf" />
      <pointLight position={[-2, 0.5, 1.5]} intensity={12} color="#38bdf8" />
      <WorkOrbit reducedMotion={reducedMotion} isMobile={isMobile} />
    </Canvas>
  );
}

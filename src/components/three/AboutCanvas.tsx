"use client";

import { Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import {
  CatmullRomCurve3,
  type Group,
  type Mesh,
  TubeGeometry,
  Vector3,
} from "three";

type AboutVisualProps = {
  reducedMotion: boolean;
  isMobile: boolean;
};

function helixPoint(t: number, radius: number, height: number, phase = 0) {
  const angle = t * Math.PI * 4 + phase;
  return new Vector3(
    Math.cos(angle) * radius,
    (t - 0.5) * height,
    Math.sin(angle) * radius,
  );
}

function HelixRibbon({
  phase,
  color,
  isMobile,
}: {
  phase: number;
  color: string;
  reducedMotion: boolean;
  isMobile: boolean;
}) {
  const beads = useMemo(() => {
    const count = isMobile ? 14 : 22;
    return Array.from({ length: count }, (_, i) => {
      const t = i / (count - 1);
      const point = helixPoint(t, 1.15, 3.4, phase);
      return {
        position: [point.x, point.y, point.z] as const,
        scale: 0.06 + (i % 3) * 0.02,
      };
    });
  }, [isMobile, phase]);

  const tube = useMemo(() => {
    const points = Array.from({ length: 48 }, (_, i) =>
      helixPoint(i / 47, 1.15, 3.4, phase),
    );
    const curve = new CatmullRomCurve3(points);
    return new TubeGeometry(curve, isMobile ? 64 : 120, 0.018, 8, false);
  }, [isMobile, phase]);

  useEffect(() => {
    return () => {
      tube.dispose();
    };
  }, [tube]);

  return (
    <group>
      <mesh geometry={tube}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.55}
          metalness={0.55}
          roughness={0.25}
          transparent
          opacity={0.55}
        />
      </mesh>
      {beads.map((bead, i) => (
        <mesh key={i} position={bead.position} scale={bead.scale}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.85}
            metalness={0.6}
            roughness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

function SignalCore({ reducedMotion }: { reducedMotion: boolean }) {
  const core = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (!core.current || reducedMotion) return;
    const t = clock.getElapsedTime();
    core.current.rotation.y = t * 0.4;
    core.current.rotation.x = Math.sin(t * 0.5) * 0.2;
    const pulse = 0.85 + Math.sin(t * 1.6) * 0.08;
    core.current.scale.setScalar(pulse);
  });

  return (
    <mesh ref={core}>
      <dodecahedronGeometry args={[0.42, 0]} />
      <meshStandardMaterial
        color="#99f6e4"
        emissive="#2dd4bf"
        emissiveIntensity={0.9}
        metalness={0.85}
        roughness={0.12}
      />
    </mesh>
  );
}

function CraftHelix({ reducedMotion, isMobile }: AboutVisualProps) {
  const root = useRef<Group>(null);

  useFrame(({ pointer, clock }, dt) => {
    if (!root.current) return;
    if (reducedMotion) {
      root.current.rotation.set(0.2, 0.55, 0.1);
      return;
    }
    const t = clock.getElapsedTime();
    root.current.rotation.y +=
      (pointer.x * 0.55 + t * 0.12 - root.current.rotation.y) *
      Math.min(dt * 1.8, 1);
    root.current.rotation.x +=
      (-pointer.y * 0.25 + 0.25 - root.current.rotation.x) *
      Math.min(dt * 1.8, 1);
  });

  return (
    <group ref={root} position={[0.15, 0, 0]} scale={isMobile ? 0.85 : 1}>
      <HelixRibbon
        phase={0}
        color="#2dd4bf"
        reducedMotion={reducedMotion}
        isMobile={isMobile}
      />
      <HelixRibbon
        phase={Math.PI}
        color="#38bdf8"
        reducedMotion={reducedMotion}
        isMobile={isMobile}
      />
      <SignalCore reducedMotion={reducedMotion} />
      <Sparkles
        count={isMobile ? 12 : 28}
        scale={[4.5, 4.2, 3.5]}
        size={1.8}
        speed={reducedMotion ? 0 : 0.2}
        color="#cffafe"
        opacity={0.5}
      />
    </group>
  );
}

export function AboutCanvas({ reducedMotion, isMobile }: AboutVisualProps) {
  return (
    <Canvas
      dpr={isMobile ? [1, 1.25] : [1, 1.55]}
      camera={{ position: [0, 0.1, 5.2], fov: 42 }}
      gl={{
        antialias: true,
        powerPreference: "high-performance",
        alpha: true,
      }}
      frameloop={reducedMotion ? "demand" : "always"}
      className="h-full w-full"
    >
      <color attach="background" args={["#00000000"]} />
      <hemisphereLight intensity={0.45} color="#dbeafe" groundColor="#061018" />
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 3, 2]} intensity={1.2} color="#f8fafc" />
      <pointLight position={[2, 1, 2]} intensity={20} color="#2dd4bf" />
      <pointLight position={[-2.5, 0.5, 1]} intensity={14} color="#38bdf8" />
      <CraftHelix reducedMotion={reducedMotion} isMobile={isMobile} />
    </Canvas>
  );
}

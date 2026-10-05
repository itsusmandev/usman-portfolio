"use client";

import { Float, Line, RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Group, Mesh } from "three";

type DevSceneProps = {
  reducedMotion: boolean;
  isMobile: boolean;
};

function WireCore({
  reducedMotion,
  isMobile,
}: {
  reducedMotion: boolean;
  isMobile: boolean;
}) {
  const outer = useRef<Group>(null);
  const inner = useRef<Mesh>(null);

  useFrame(({ pointer, clock }, dt) => {
    if (!outer.current) return;
    if (reducedMotion) {
      outer.current.rotation.set(0.25, 0.6, 0);
      return;
    }
    const t = clock.getElapsedTime();
    outer.current.rotation.y +=
      (pointer.x * 0.45 + 0.55 - outer.current.rotation.y) * Math.min(dt * 2.2, 1);
    outer.current.rotation.x +=
      (-pointer.y * 0.25 + 0.2 - outer.current.rotation.x) * Math.min(dt * 2.2, 1);
    if (inner.current) {
      inner.current.rotation.y = t * 0.35;
      inner.current.rotation.z = t * 0.18;
    }
  });

  return (
    <Float
      speed={reducedMotion ? 0 : 1.2}
      floatIntensity={reducedMotion ? 0 : 0.45}
      rotationIntensity={0}
    >
      <group ref={outer} position={[0.2, 0.15, 0]} scale={isMobile ? 0.85 : 1}>
        <mesh>
          <icosahedronGeometry args={[1.55, 1]} />
          <meshStandardMaterial
            color="#14323a"
            wireframe
            transparent
            opacity={0.55}
            emissive="#2dd4bf"
            emissiveIntensity={0.25}
          />
        </mesh>
        <mesh ref={inner} scale={0.72}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#2dd4bf"
            metalness={0.75}
            roughness={0.18}
            emissive="#0f766e"
            emissiveIntensity={0.45}
          />
        </mesh>
        <mesh scale={1.05}>
          <torusGeometry args={[1.95, 0.012, 12, 96]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#38bdf8"
            emissiveIntensity={0.55}
            transparent
            opacity={0.7}
          />
        </mesh>
        <mesh rotation={[Math.PI / 2.4, 0.4, 0]} scale={1.05}>
          <torusGeometry args={[1.65, 0.008, 12, 96]} />
          <meshStandardMaterial
            color="#67e8f9"
            emissive="#67e8f9"
            emissiveIntensity={0.4}
            transparent
            opacity={0.45}
          />
        </mesh>
      </group>
    </Float>
  );
}

function CodePanel({
  position,
  rotation,
  scale = 1,
  reducedMotion,
  accent = "#2dd4bf",
}: {
  position: readonly [number, number, number];
  rotation: readonly [number, number, number];
  scale?: number;
  reducedMotion: boolean;
  accent?: string;
}) {
  const lines = [1.45, 1.1, 0.8, 1.25, 0.95];

  return (
    <Float
      speed={reducedMotion ? 0 : 1.4}
      floatIntensity={reducedMotion ? 0 : 0.5}
      rotationIntensity={reducedMotion ? 0 : 0.12}
    >
      <group position={position} rotation={rotation} scale={scale}>
        <RoundedBox args={[2.2, 1.5, 0.08]} radius={0.08} smoothness={4}>
          <meshStandardMaterial
            color="#0c141d"
            metalness={0.35}
            roughness={0.35}
            transparent
            opacity={0.92}
          />
        </RoundedBox>
        <mesh position={[0, 0, 0.045]}>
          <planeGeometry args={[2.05, 1.35]} />
          <meshStandardMaterial
            color="#081018"
            emissive="#102030"
            emissiveIntensity={0.35}
            transparent
            opacity={0.95}
          />
        </mesh>
        {[-0.55, 0, 0.55].map((x) => (
          <mesh key={x} position={[x, 0.58, 0.05]}>
            <circleGeometry args={[0.045, 16]} />
            <meshStandardMaterial
              color={accent}
              emissive={accent}
              emissiveIntensity={0.8}
            />
          </mesh>
        ))}
        {lines.map((width, i) => (
          <mesh
            key={i}
            position={[-0.85 + width / 2, 0.28 - i * 0.22, 0.05]}
          >
            <planeGeometry args={[width, 0.07]} />
            <meshStandardMaterial
              color={accent}
              emissive={accent}
              emissiveIntensity={0.55}
              transparent
              opacity={0.55 + (i % 2) * 0.2}
            />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

function OrbitNodes({
  reducedMotion,
  isMobile,
}: {
  reducedMotion: boolean;
  isMobile: boolean;
}) {
  const group = useRef<Group>(null);
  const count = isMobile ? 5 : 8;

  const nodes = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * Math.PI * 2;
        const radius = 2.55 + (i % 2) * 0.25;
        return {
          x: Math.cos(angle) * radius,
          y: Math.sin(angle * 1.4) * 0.55,
          z: Math.sin(angle) * radius * 0.55,
          color: i % 2 === 0 ? "#2dd4bf" : "#38bdf8",
        };
      }),
    [count],
  );

  useFrame(({ clock }) => {
    if (!group.current || reducedMotion) return;
    group.current.rotation.y = clock.getElapsedTime() * 0.18;
  });

  return (
    <group ref={group} position={[0.2, 0.1, 0]}>
      {nodes.map((node, i) => (
        <group key={i}>
          {i < nodes.length - 1 ? (
            <Line
              points={[
                [node.x, node.y, node.z],
                [nodes[i + 1].x, nodes[i + 1].y, nodes[i + 1].z],
              ]}
              color="#38bdf8"
              lineWidth={1}
              transparent
              opacity={0.28}
            />
          ) : null}
          <mesh position={[node.x, node.y, node.z]}>
            <sphereGeometry args={[0.07, 20, 20]} />
            <meshStandardMaterial
              color={node.color}
              emissive={node.color}
              emissiveIntensity={0.85}
              metalness={0.4}
              roughness={0.2}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function BracketGlyph({
  position,
  rotation,
  reducedMotion,
  flip = false,
}: {
  position: readonly [number, number, number];
  rotation: readonly [number, number, number];
  reducedMotion: boolean;
  flip?: boolean;
}) {
  const dir = flip ? -1 : 1;

  return (
    <Float
      speed={reducedMotion ? 0 : 1.1}
      floatIntensity={reducedMotion ? 0 : 0.4}
      rotationIntensity={reducedMotion ? 0 : 0.2}
    >
      <group position={position} rotation={rotation} scale={[dir, 1, 1]}>
        <mesh position={[-0.16, 0, 0]}>
          <boxGeometry args={[0.08, 0.7, 0.08]} />
          <meshStandardMaterial
            color="#67e8f9"
            emissive="#38bdf8"
            emissiveIntensity={0.5}
            metalness={0.6}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[-0.02, 0.31, 0]}>
          <boxGeometry args={[0.28, 0.08, 0.08]} />
          <meshStandardMaterial
            color="#67e8f9"
            emissive="#38bdf8"
            emissiveIntensity={0.5}
            metalness={0.6}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[-0.02, -0.31, 0]}>
          <boxGeometry args={[0.28, 0.08, 0.08]} />
          <meshStandardMaterial
            color="#67e8f9"
            emissive="#38bdf8"
            emissiveIntensity={0.5}
            metalness={0.6}
            roughness={0.2}
          />
        </mesh>
      </group>
    </Float>
  );
}

export function FloatingShapes({ reducedMotion, isMobile }: DevSceneProps) {
  const root = useRef<Group>(null);

  useFrame(({ pointer, clock }) => {
    if (!root.current || reducedMotion) return;
    root.current.position.x = 0.1 + pointer.x * 0.2;
    root.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.05;
  });

  return (
    <group ref={root} position={[1.55, 0.05, 0]}>
      <WireCore reducedMotion={reducedMotion} isMobile={isMobile} />
      <OrbitNodes reducedMotion={reducedMotion} isMobile={isMobile} />

      <CodePanel
        reducedMotion={reducedMotion}
        position={[2.35, 1.15, -0.6]}
        rotation={[-0.12, -0.45, 0.05]}
        scale={isMobile ? 0.7 : 0.85}
        accent="#2dd4bf"
      />
      {!isMobile ? (
        <CodePanel
          reducedMotion={reducedMotion}
          position={[2.55, -1.25, -0.2]}
          rotation={[0.1, -0.55, -0.04]}
          scale={0.72}
          accent="#38bdf8"
        />
      ) : null}

      <BracketGlyph
        reducedMotion={reducedMotion}
        position={[-1.7, 1.35, 0.4]}
        rotation={[0.1, 0.3, -0.1]}
      />
      <BracketGlyph
        reducedMotion={reducedMotion}
        position={[-1.15, -1.4, 0.6]}
        rotation={[-0.05, 0.2, 0.1]}
        flip
      />
    </group>
  );
}

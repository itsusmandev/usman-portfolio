"use client";

import { ContactShadows, Sparkles } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { FloatingShapes } from "@/components/three/FloatingShapes";

type SceneProps = {
  reducedMotion: boolean;
  isMobile: boolean;
};

export function Scene({ reducedMotion, isMobile }: SceneProps) {
  return (
    <Canvas
      dpr={isMobile ? [1, 1.35] : [1, 1.75]}
      camera={{ position: [0.2, 0.35, 7.8], fov: 38 }}
      gl={{
        antialias: true,
        powerPreference: "high-performance",
        alpha: true,
      }}
      frameloop={reducedMotion ? "demand" : "always"}
      className="h-full w-full"
    >
      <hemisphereLight intensity={0.55} color="#dbeafe" groundColor="#071018" />
      <ambientLight intensity={0.35} />
      <directionalLight
        position={[5, 7, 4]}
        intensity={1.6}
        color="#f8fafc"
      />
      <pointLight position={[4, 2, 3]} intensity={28} color="#2dd4bf" />
      <pointLight position={[-3, 1, 2]} intensity={16} color="#38bdf8" />
      <spotLight
        position={[2, 6, 2]}
        angle={0.45}
        penumbra={0.6}
        intensity={18}
        color="#99f6e4"
      />

      <FloatingShapes reducedMotion={reducedMotion} isMobile={isMobile} />

      <Sparkles
        count={isMobile ? 18 : 40}
        scale={[8, 5, 6]}
        size={1.4}
        speed={reducedMotion ? 0 : 0.2}
        color="#a5f3fc"
        position={[1.4, 0.2, -0.5]}
        opacity={0.55}
      />

      {!isMobile ? (
        <ContactShadows
          position={[1.4, -2.15, 0]}
          opacity={0.28}
          scale={12}
          blur={2.8}
          far={5}
          color="#020617"
        />
      ) : null}
    </Canvas>
  );
}

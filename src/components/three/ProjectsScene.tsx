"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Fallback } from "@/components/three/Fallback";
import { ProjectsCanvas } from "@/components/three/ProjectsCanvas";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl"),
    );
  } catch {
    return false;
  }
}

const emptySubscribe = () => () => undefined;

type ProjectsSceneProps = {
  className?: string;
};

export default function ProjectsScene({ className }: ProjectsSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const webglOk = useSyncExternalStore(
    emptySubscribe,
    supportsWebGL,
    () => true,
  );
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: "100px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={cn("absolute inset-0 h-full w-full", className)}
    >
      {!webglOk || !inView ? (
        <Fallback />
      ) : (
        <div className="absolute inset-0 opacity-90">
          <ProjectsCanvas reducedMotion={reducedMotion} isMobile={isMobile} />
        </div>
      )}
    </div>
  );
}

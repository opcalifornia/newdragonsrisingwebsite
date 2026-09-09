"use client";

import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { HeroCrest } from "./hero-crest";
import { usePointerParallax } from "@/hooks/use-pointer-parallax";
import { LogoMark } from "@/components/ui/logo-mark";

export function HeroScene() {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const pointer = usePointerParallax(containerRef);

  if (reduceMotion) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <LogoMark className="h-40 w-40 opacity-90" />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 40 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.35} />
          <directionalLight
            position={[3, 4, 5]}
            intensity={1.1}
            color="#ffffff"
          />
          <pointLight position={[-4, -2, -3]} intensity={6} color="#ff4b54" />
          <pointLight position={[0, -3, 2]} intensity={2.2} color="#c41e2e" />
          <HeroCrest pointer={pointer} />
        </Suspense>
      </Canvas>
    </div>
  );
}

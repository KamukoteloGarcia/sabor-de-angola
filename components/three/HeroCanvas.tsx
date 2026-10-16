"use client";

import { Environment, Lightformer, PerformanceMonitor, Sparkles } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState, type ComponentType, type RefObject } from "react";
import type { HeroSlideId } from "@/config/hero";
import { CameraRig } from "./core/CameraRig";
import { ScenePlacement } from "./core/ScenePlacement";
import { SceneTransition } from "./core/SceneTransition";
import { BarScene } from "./scenes/BarScene";
import { CatalogScene } from "./scenes/CatalogScene";
import { GrillScene } from "./scenes/GrillScene";
import { SeaScene } from "./scenes/SeaScene";
import { SignatureScene } from "./scenes/SignatureScene";

const scenes: Record<HeroSlideId, ComponentType> = {
  signature: SignatureScene,
  grill: GrillScene,
  sea: SeaScene,
  bar: BarScene,
  catalog: CatalogScene,
};

export type HeroCanvasProps = {
  slides: readonly HeroSlideId[];
  active: number;
  /** Pauses rendering (off screen). */
  isRunning: boolean;
  /** Element whose pointer moves drive the parallax (the whole hero, not just the canvas). */
  eventSource: RefObject<HTMLElement | null>;
};

// Warm studio lighting baked into an environment map (no HDR download): gives gold, glaze and glass their reflections.
function StudioLights() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 5]} intensity={2.4} color="#ffe2b8" />
      <directionalLight position={[-5, 2, -3]} intensity={1.4} color="#ff9a5a" />
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={3} color="#ffe7c2" position={[0, 5, -2]} scale={[8, 2, 1]} rotation-x={Math.PI / 2} />
        <Lightformer form="rect" intensity={2.2} color="#ff9b52" position={[-5, 1, 1]} scale={[3, 5, 1]} rotation-y={Math.PI / 2} />
        <Lightformer form="rect" intensity={1.6} color="#ffffff" position={[5, 1, 1]} scale={[3, 5, 1]} rotation-y={-Math.PI / 2} />
        <Lightformer form="ring" intensity={2} color="#deb36d" position={[0, 0, -6]} scale={4} />
      </Environment>
    </>
  );
}

// One WebGL canvas for all five banners: the active scene grows in while the previous one spins away.
export default function HeroCanvas({ slides, active, isRunning, eventSource }: HeroCanvasProps) {
  const [dpr, setDpr] = useState(1.75);
  const reducedMotion = typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <Canvas
      dpr={[1, dpr]}
      camera={{ position: [0, 1.1, 7.6], fov: 32 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      frameloop={!isRunning ? "never" : reducedMotion ? "demand" : "always"}
      eventSource={eventSource as RefObject<HTMLElement>}
      eventPrefix="client"
      className="motion-safe:animate-rise"
    >
      <PerformanceMonitor onDecline={() => setDpr(1)} />
      <StudioLights />
      <CameraRig />

      <ScenePlacement>
        {slides.map((id, i) => {
          const Scene = scenes[id];
          return (
            <SceneTransition key={id} active={i === active}>
              <Suspense fallback={null}>
                <Scene />
              </Suspense>
            </SceneTransition>
          );
        })}
      </ScenePlacement>

      <Sparkles count={40} scale={[8, 5, 4]} size={2} speed={0.3} color="#f6d798" opacity={0.6} />
    </Canvas>
  );
}

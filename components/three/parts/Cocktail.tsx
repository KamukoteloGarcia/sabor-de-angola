"use client";

import { MeshTransmissionMaterial, RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Color, LatheGeometry, Object3D, Vector2, type InstancedMesh } from "three";
import { seeded } from "../core/random";
import { CitrusSlice, Leaf } from "./Ingredients";

const lathe = (points: number[][]) => new LatheGeometry(points.map(([x, y]) => new Vector2(x, y)), 64);

// Rocks glass: thick base, straight walls, rounded rim (outer wall up, inner wall down).
const glassGeometry = lathe([
  [0, -0.9],
  [0.78, -0.9],
  [0.83, -0.85],
  [0.87, 0.6],
  [0.86, 0.64],
  [0.82, 0.64],
  [0.8, 0.6],
  [0.76, -0.66],
  [0, -0.66],
]);

const liquidGeometry = lathe([
  [0, -0.65],
  [0.75, -0.65],
  [0.785, 0.2],
  [0, 0.2],
]);

// Transmission "sees" this colour behind the glass (the canvas itself is transparent).
const behindGlass = new Color("#2a1b12");

export function IceCube({ size = 0.5, ...props }: { size?: number; position?: [number, number, number]; rotation?: [number, number, number] }) {
  return (
    <RoundedBox args={[size, size, size]} radius={size * 0.14} smoothness={4} {...props}>
      <meshPhysicalMaterial color="#eef8ff" transmission={1} roughness={0.12} thickness={0.6} ior={1.31} />
    </RoundedBox>
  );
}

// Fizz rising through the drink.
function Bubbles({ count = 26 }: { count?: number }) {
  const mesh = useRef<InstancedMesh>(null);
  const bubbles = useMemo(() => {
    const rand = seeded(5);
    return Array.from({ length: count }, () => {
      const angle = rand() * Math.PI * 2;
      const radius = rand() * 0.6;
      return { x: Math.cos(angle) * radius, z: Math.sin(angle) * radius, y: -0.6 + rand() * 0.75, speed: 0.15 + rand() * 0.3, size: 0.015 + rand() * 0.02 };
    });
  }, [count]);
  const heights = useRef(bubbles.map((bubble) => bubble.y));
  const dummy = useMemo(() => new Object3D(), []);

  useFrame((_, delta) => {
    if (!mesh.current) return;
    bubbles.forEach((bubble, i) => {
      const y = heights.current[i] > 0.18 ? -0.6 : heights.current[i] + bubble.speed * delta;
      heights.current[i] = y;
      dummy.position.set(bubble.x, y, bubble.z);
      dummy.scale.setScalar(bubble.size);
      dummy.updateMatrix();
      mesh.current?.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 10, 10]} />
      <meshStandardMaterial color="#fff3dc" emissive="#ffcf8a" emissiveIntensity={0.4} transparent opacity={0.7} />
    </instancedMesh>
  );
}

// Signature cocktail: refracting glass, amber drink, ice, fizz and an orange wheel on the rim.
export function Cocktail() {
  return (
    <group>
      <mesh geometry={glassGeometry}>
        <MeshTransmissionMaterial
          samples={6}
          resolution={512}
          thickness={0.35}
          roughness={0.04}
          transmission={1}
          ior={1.5}
          chromaticAberration={0.06}
          anisotropy={0.2}
          distortion={0.15}
          distortionScale={0.4}
          temporalDistortion={0.1}
          background={behindGlass}
        />
      </mesh>
      <mesh geometry={liquidGeometry}>
        <meshPhysicalMaterial color="#d2701f" emissive="#6b2804" emissiveIntensity={0.5} roughness={0.12} clearcoat={1} transparent opacity={0.88} />
      </mesh>
      <IceCube size={0.52} position={[-0.15, 0.12, 0.1]} rotation={[0.3, 0.6, 0.2]} />
      <IceCube size={0.44} position={[0.25, 0.22, -0.18]} rotation={[0.8, 0.2, 0.5]} />
      <Bubbles />
      <CitrusSlice kind="orange" radius={0.46} position={[0.64, 0.66, 0.15]} rotation={[0.2, 0.5, 1.45]} />
      <Leaf color="#2f6e2a" scale={0.32} position={[-0.25, 0.5, 0.15]} rotation={[-0.4, 0.3, 0.6]} />
    </group>
  );
}

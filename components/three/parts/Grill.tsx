"use client";

import { RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useLayoutEffect, useMemo, useRef } from "react";
import { Color, Object3D, type Group, type InstancedMesh } from "three";
import { seeded } from "../core/random";
import { charTexture } from "../core/textures";

type Vec3 = [number, number, number];

// Bed of charcoal: dark lumps with glowing embers peeking through their faces, flickering.
export function CharcoalBed({ count = 90, width = 3.4, depth = 1.7 }: { count?: number; width?: number; depth?: number }) {
  const coals = useRef<InstancedMesh>(null);
  const embers = useRef<InstancedMesh>(null);
  const lumps = useMemo(() => {
    const rand = seeded(3);
    return Array.from({ length: count }, () => ({
      x: (rand() - 0.5) * width,
      z: (rand() - 0.5) * depth,
      size: 0.11 + rand() * 0.11,
      rotation: [rand() * 3, rand() * 3, rand() * 3] as Vec3,
      phase: rand() * 10,
    }));
  }, [count, width, depth]);
  const color = useMemo(() => new Color(), []);

  useLayoutEffect(() => {
    const dummy = new Object3D();
    lumps.forEach((lump, i) => {
      dummy.position.set(lump.x, lump.size * 0.4, lump.z);
      dummy.rotation.set(...lump.rotation);
      dummy.scale.setScalar(lump.size);
      dummy.updateMatrix();
      coals.current?.setMatrixAt(i, dummy.matrix);
      dummy.scale.setScalar(lump.size * 0.86);
      dummy.updateMatrix();
      embers.current?.setMatrixAt(i, dummy.matrix);
      embers.current?.setColorAt(i, color.setRGB(2, 0.5, 0.08));
    });
    if (coals.current) coals.current.instanceMatrix.needsUpdate = true;
    if (embers.current) embers.current.instanceMatrix.needsUpdate = true;
  }, [lumps, color]);

  useFrame(({ clock }) => {
    const mesh = embers.current;
    if (!mesh?.instanceColor) return;
    const t = clock.elapsedTime;
    lumps.forEach((lump, i) => {
      const flicker = 0.55 + 0.45 * Math.sin(t * 2.3 + lump.phase) * Math.sin(t * 1.3 + lump.phase * 2);
      mesh.setColorAt(i, color.setRGB(2.4 * flicker + 0.3, 0.6 * flicker + 0.08, 0.06 * flicker));
    });
    mesh.instanceColor.needsUpdate = true;
  });

  return (
    <group>
      <instancedMesh ref={coals} args={[undefined, undefined, count]}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#1c1613" roughness={0.95} />
      </instancedMesh>
      <instancedMesh ref={embers} args={[undefined, undefined, count]}>
        <icosahedronGeometry args={[1, 0]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
    </group>
  );
}

// Iron grill grate: parallel bars inside a frame.
export function Grate({ width = 3.6, depth = 1.9, bars = 12, y = 0 }: { width?: number; depth?: number; bars?: number; y?: number }) {
  const metal = <meshStandardMaterial color="#3a332e" metalness={0.9} roughness={0.38} />;

  return (
    <group position-y={y}>
      {Array.from({ length: bars }, (_, i) => (
        <mesh key={i} position-z={-depth / 2 + (i * depth) / (bars - 1)} rotation-z={Math.PI / 2}>
          <cylinderGeometry args={[0.022, 0.022, width, 10]} />
          {metal}
        </mesh>
      ))}
      {[-1, 1].map((side) => (
        <mesh key={side} position-x={(side * width) / 2} rotation-x={Math.PI / 2}>
          <cylinderGeometry args={[0.04, 0.04, depth + 0.1, 10]} />
          {metal}
        </mesh>
      ))}
    </group>
  );
}

const pieces = ["meat", "pepper", "meat", "onion", "meat", "greenPepper", "meat"] as const;
const pieceColor = { meat: "#8c4a26", pepper: "#b3201b", onion: "#eadcc4", greenPepper: "#3d7a2c" };

type SkewerProps = { position?: Vec3; rotation?: Vec3; speed?: number; seed?: number };

// Espetada: meat, peppers and onion on a steel skewer, turning slowly like a rotisserie.
export function Skewer({ position, rotation, speed = 0.4, seed = 1 }: SkewerProps) {
  const spin = useRef<Group>(null);
  const char = useMemo(() => charTexture(), []);
  const tilts = useMemo(() => {
    const rand = seeded(seed);
    return pieces.map(() => [rand() * 0.7, rand() * 0.7, rand() * 0.7] as Vec3);
  }, [seed]);

  useFrame((_, delta) => {
    if (spin.current) spin.current.rotation.x += delta * speed;
  });

  return (
    <group position={position} rotation={rotation}>
      <group ref={spin}>
        <mesh rotation-z={Math.PI / 2}>
          <cylinderGeometry args={[0.016, 0.016, 3.3, 8]} />
          <meshStandardMaterial color="#d6d0c8" metalness={1} roughness={0.22} />
        </mesh>
        <mesh position-x={1.72}>
          <torusGeometry args={[0.09, 0.016, 8, 24]} />
          <meshStandardMaterial color="#d6d0c8" metalness={1} roughness={0.22} />
        </mesh>
        {pieces.map((piece, i) => (
          <RoundedBox
            key={i}
            args={piece === "meat" ? [0.36, 0.3, 0.33] : [0.18, 0.3, 0.27]}
            radius={piece === "meat" ? 0.11 : 0.07}
            smoothness={3}
            position-x={-1.1 + i * 0.36}
            rotation={tilts[i]}
          >
            <meshStandardMaterial color={pieceColor[piece]} map={piece === "meat" ? char : null} roughness={piece === "meat" ? 0.7 : 0.35} />
          </RoundedBox>
        ))}
      </group>
    </group>
  );
}

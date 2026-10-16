"use client";

import { useMemo } from "react";
import { DoubleSide, LatheGeometry, Shape, ShapeGeometry, Vector2 } from "three";
import { citrusTexture } from "../core/textures";

type Transform = { position?: [number, number, number]; rotation?: [number, number, number]; scale?: number };

// Gindungo (Angolan piri-piri): a small, glossy red chilli with a green stem.
const chilliGeometry = new LatheGeometry(
  [
    [0, -0.42],
    [0.05, -0.36],
    [0.09, -0.18],
    [0.105, 0.05],
    [0.095, 0.22],
    [0.06, 0.3],
    [0, 0.31],
  ].map(([x, y]) => new Vector2(x, y)),
  32,
);

export function Gindungo(props: Transform) {
  return (
    <group {...props}>
      <mesh geometry={chilliGeometry}>
        <meshPhysicalMaterial color="#c8141b" roughness={0.22} clearcoat={1} clearcoatRoughness={0.08} />
      </mesh>
      <mesh position-y={0.36}>
        <cylinderGeometry args={[0.018, 0.03, 0.14, 8]} />
        <meshStandardMaterial color="#4f7a2a" roughness={0.6} />
      </mesh>
    </group>
  );
}

// A gently curved herb leaf.
const leafGeometry = (() => {
  const shape = new Shape();
  shape.moveTo(0, -0.5);
  shape.bezierCurveTo(0.34, -0.25, 0.3, 0.25, 0, 0.5);
  shape.bezierCurveTo(-0.3, 0.25, -0.34, -0.25, 0, -0.5);
  const geometry = new ShapeGeometry(shape, 24);
  const position = geometry.attributes.position;
  for (let i = 0; i < position.count; i++) {
    const x = position.getX(i);
    const y = position.getY(i);
    position.setZ(i, -1.1 * x * x - 0.25 * y * y);
  }
  geometry.computeVertexNormals();
  return geometry;
})();

export function Leaf({ color = "#3f7d32", ...props }: Transform & { color?: string }) {
  return (
    <mesh geometry={leafGeometry} {...props}>
      <meshPhysicalMaterial color={color} roughness={0.42} sheen={0.6} sheenColor="#b9e08a" side={DoubleSide} />
    </mesh>
  );
}

// A slice of lime or orange: rind on the edge, juicy segments on both faces.
export function CitrusSlice({ kind = "lime", radius = 0.42, ...props }: Transform & { kind?: "lime" | "orange"; radius?: number }) {
  const face = useMemo(() => citrusTexture(kind), [kind]);
  const rind = kind === "lime" ? "#4f8a2b" : "#e8731c";

  return (
    <mesh {...props}>
      <cylinderGeometry args={[radius, radius, 0.07, 48]} />
      <meshStandardMaterial attach="material-0" color={rind} roughness={0.5} />
      <meshPhysicalMaterial attach="material-1" map={face} roughness={0.3} clearcoat={0.7} />
      <meshPhysicalMaterial attach="material-2" map={face} roughness={0.3} clearcoat={0.7} />
    </mesh>
  );
}

"use client";

import { useFrame } from "@react-three/fiber";
import { MathUtils } from "three";

const base = { x: 0, y: 1.1, z: 7.6 };

// Drifts the camera towards the pointer (parallax) and backs off on narrow screens so scenes fit.
export function CameraRig() {
  useFrame(({ camera, pointer, size }, delta) => {
    const fit = Math.max(1, 1.2 / (size.width / size.height));
    camera.position.x = MathUtils.damp(camera.position.x, base.x + pointer.x * 0.9, 2, delta);
    camera.position.y = MathUtils.damp(camera.position.y, base.y + pointer.y * 0.6, 2, delta);
    camera.position.z = MathUtils.damp(camera.position.z, base.z * fit, 2, delta);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

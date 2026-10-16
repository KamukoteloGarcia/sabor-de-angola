"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";
import type { HeroCanvasProps } from "./HeroCanvas";

// three.js only runs in the browser and is heavy: load it after the page, never on the server.
const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

let webglSupport: boolean | undefined;

function hasWebGL() {
  webglSupport ??= !!document.createElement("canvas").getContext("webgl2");
  return webglSupport;
}

const subscribe = () => () => {};

// Renders the 3D banners where WebGL is available (the photo backdrop alone otherwise).
export function HeroScene3D(props: HeroCanvasProps) {
  const supported = useSyncExternalStore(subscribe, hasWebGL, () => false);
  return supported ? <HeroCanvas {...props} /> : null;
}

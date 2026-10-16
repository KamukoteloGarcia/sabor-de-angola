"use client";

import { useSyncExternalStore } from "react";

// The splash marks the page as ready (<html data-ready>) when it starts to leave.
// Entrance animations and the 3D hero wait for it, so they play in view instead of behind the splash.
export function markPageReady() {
  document.documentElement.dataset.ready = "";
}

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-ready"] });
  return () => observer.disconnect();
}

const isReady = () => "ready" in document.documentElement.dataset;

export function usePageReady() {
  return useSyncExternalStore(subscribe, isReady, () => false);
}

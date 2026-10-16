"use client";

import { useSyncExternalStore } from "react";

// Palette of the visible hero banner, published by the hero as <html data-hero-tone="…">.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-hero-tone"] });
  return () => observer.disconnect();
}

const getTone = () => document.documentElement.dataset.heroTone ?? "dark";

export function useHeroTone() {
  return useSyncExternalStore(subscribe, getTone, () => "dark");
}

"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Freezes every animation inside while it is off screen (see [data-paused] in globals.css).
export function PauseWhenHidden({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} data-paused={isVisible ? undefined : ""} className={className}>
      {children}
    </div>
  );
}

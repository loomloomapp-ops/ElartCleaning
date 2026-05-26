"use client";

import { useEffect, useState } from "react";

type Dir = "up" | "down" | null;

export function useScrollDirection(threshold = 8): { dir: Dir; y: number } {
  const [dir, setDir] = useState<Dir>(null);
  const [y, setY] = useState(0);

  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;
    let idleTimer: ReturnType<typeof setTimeout> | null = null;

    const update = () => {
      const current = window.scrollY;
      const delta = current - last;
      setY(current);
      if (Math.abs(delta) >= threshold) {
        setDir(delta > 0 ? "down" : "up");
        last = current;
      }
      ticking = false;

      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => setDir("up"), 200);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    setY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (idleTimer) clearTimeout(idleTimer);
    };
  }, [threshold]);

  return { dir, y };
}

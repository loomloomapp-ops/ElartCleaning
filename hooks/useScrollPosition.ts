"use client";

import { useEffect, useState } from "react";

export function useScrollPastFraction(fraction = 0.3): boolean {
  const [past, setPast] = useState(false);
  useEffect(() => {
    const compute = () => {
      const max = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1,
      );
      setPast(window.scrollY / max >= fraction);
    };
    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, [fraction]);
  return past;
}

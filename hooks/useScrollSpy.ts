"use client";

import { useEffect, useState } from "react";

export function useScrollSpy(ids: readonly string[], offset = 120): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!els.length) return;

    const compute = () => {
      const y = window.scrollY + offset;
      let current: string | null = null;
      for (const el of els) {
        if (el.offsetTop <= y) current = el.id;
        else break;
      }
      setActive(current);
    };

    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, [ids, offset]);

  return active;
}

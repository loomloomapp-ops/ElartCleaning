"use client";

import { useEffect, useState } from "react";

const KEY = "elart-exit-popup-shown";

export function useExitIntent(): boolean {
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(KEY)) return;
    } catch {
      /* ignore */
    }

    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) fire();
    };
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    const fire = () => {
      setTriggered(true);
      try {
        window.sessionStorage.setItem(KEY, "1");
      } catch {
        /* ignore */
      }
      cleanup();
    };
    const cleanup = () => {
      document.removeEventListener("mouseleave", onMouseLeave);
      if (timeoutId) clearTimeout(timeoutId);
    };

    document.addEventListener("mouseleave", onMouseLeave);
    timeoutId = setTimeout(fire, 90000);

    return cleanup;
  }, []);

  return triggered;
}

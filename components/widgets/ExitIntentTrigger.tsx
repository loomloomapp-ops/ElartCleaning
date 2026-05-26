"use client";

import { useEffect } from "react";
import { useExitIntent } from "@/hooks/useExitIntent";

export function ExitIntentTrigger({ onTrigger }: { onTrigger: () => void }) {
  const triggered = useExitIntent();
  useEffect(() => {
    if (triggered) onTrigger();
  }, [triggered, onTrigger]);
  return null;
}

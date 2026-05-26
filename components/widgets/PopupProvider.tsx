"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { PopupForm } from "./PopupForm";
import { ExitIntentTrigger } from "./ExitIntentTrigger";

type Ctx = {
  open: boolean;
  setOpen: (v: boolean) => void;
  openPopup: () => void;
};

const PopupContext = createContext<Ctx | null>(null);

export function PopupProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const openPopup = useCallback(() => setOpen(true), []);
  const value = useMemo(() => ({ open, setOpen, openPopup }), [open]);

  return (
    <PopupContext.Provider value={value}>
      {children}
      <PopupForm open={open} onOpenChange={setOpen} />
      <ExitIntentTrigger onTrigger={openPopup} />
    </PopupContext.Provider>
  );
}

export function usePopup(): Ctx {
  const ctx = useContext(PopupContext);
  if (!ctx) throw new Error("usePopup must be used inside PopupProvider");
  return ctx;
}

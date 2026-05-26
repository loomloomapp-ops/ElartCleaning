"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { usePopup } from "./PopupProvider";
import { useScrollPastFraction } from "@/hooks/useScrollPosition";
import { useI18n } from "@/lib/i18n";
import { UI } from "@/lib/content";

export function FloatingWidget() {
  const visible = useScrollPastFraction(0.5);
  const { openPopup } = usePopup();
  const { pick } = useI18n();

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={openPopup}
          aria-label={pick(UI.fastQuote)}
          className="group fixed bottom-7 right-7 z-[60] hidden md:inline-flex items-center gap-3 rounded-full bg-burgundy-700 text-paper pl-3 pr-5 py-3 shadow-card animate-pulseSoft hover:bg-burgundy-800 transition-all"
        >
          <span className="grid h-10 w-10 place-items-center rounded-full bg-gold-500 text-burgundy-900">
            <MessageCircle size={20} strokeWidth={2} />
          </span>
          <span className="text-sm font-medium tracking-wide">{pick(UI.fastQuote)}</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

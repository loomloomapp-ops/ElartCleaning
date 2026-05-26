"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { usePopup } from "./PopupProvider";
import { useScrollPastFraction } from "@/hooks/useScrollPosition";
import { useI18n } from "@/lib/i18n";
import { UI } from "@/lib/content";
import { buildWhatsAppUrl, defaultQuoteMessage } from "@/lib/whatsapp";

export function MobileStickyCta() {
  const visible = useScrollPastFraction(0.18);
  const { openPopup } = usePopup();
  const { pick, lang } = useI18n();

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-3 bottom-3 z-[70] flex items-stretch gap-2 md:hidden"
        >
          <button
            onClick={openPopup}
            className="flex-1 rounded-full bg-burgundy-700 px-5 py-4 text-paper font-medium text-sm shadow-card active:scale-[0.98] transition"
          >
            {pick(UI.orderQuote)}
          </button>
          <a
            href={buildWhatsAppUrl(defaultQuoteMessage(lang))}
            target="_blank"
            rel="noopener"
            aria-label="WhatsApp"
            className="grid place-items-center h-14 w-14 rounded-full bg-gold-500 text-burgundy-900 shadow-card active:scale-[0.98] transition"
          >
            <MessageCircle size={22} strokeWidth={2} />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

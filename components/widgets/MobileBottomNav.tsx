"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Phone, Instagram } from "lucide-react";
import { usePopup } from "./PopupProvider";
import { useScrollPastFraction } from "@/hooks/useScrollPosition";
import { useI18n } from "@/lib/i18n";
import { UI } from "@/lib/content";
import { BRAND } from "@/lib/constants";
import { buildWhatsAppUrl, defaultQuoteMessage } from "@/lib/whatsapp";

/**
 * Mobile bottom action bar (phones only — `md:hidden`, no overlap with the
 * desktop FloatingWidget which starts at `md`). Brand glass pill with a primary
 * quote CTA plus quick WhatsApp / call / Instagram actions.
 */
export function MobileBottomNav() {
  const visible = useScrollPastFraction(0.12);
  const { openPopup } = usePopup();
  const { pick, lang } = useI18n();

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          aria-label={pick(UI.menu)}
          className="fixed inset-x-3 z-[70] md:hidden"
          style={{ bottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
        >
          <div className="flex items-center gap-2 rounded-pill border border-ink/8 bg-paper/85 p-1.5 shadow-soft backdrop-blur-xl">
            <button
              type="button"
              onClick={openPopup}
              className="flex-1 rounded-pill bg-accent px-4 py-3 text-center font-display text-[14px] font-bold uppercase leading-none text-ink transition active:scale-[0.98]"
            >
              {pick(UI.orderQuote)}
            </button>

            <a
              href={buildWhatsAppUrl(defaultQuoteMessage(lang))}
              target="_blank"
              rel="noopener"
              aria-label="WhatsApp"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-burgundy-700 text-paper transition active:scale-95"
            >
              <MessageCircle size={18} strokeWidth={2} />
            </a>

            <a
              href={`tel:${BRAND.phoneTel}`}
              aria-label={pick(UI.call)}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-surface text-ink border border-ink/10 transition active:scale-95"
            >
              <Phone size={18} strokeWidth={2} />
            </a>

            <a
              href={BRAND.instagram}
              target="_blank"
              rel="noopener"
              aria-label="Instagram"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink text-paper transition active:scale-95"
            >
              <Instagram size={18} strokeWidth={2} />
            </a>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

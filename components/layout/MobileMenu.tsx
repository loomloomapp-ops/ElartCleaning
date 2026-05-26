"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, Mail, Instagram, MessageCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { NAV_ANCHORS, BRAND } from "@/lib/constants";
import { UI } from "@/lib/content";
import { LangSwitcher } from "./LangSwitcher";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { buildWhatsAppUrl, defaultQuoteMessage } from "@/lib/whatsapp";
import Image from "next/image";

export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { pick, lang } = useI18n();
  useLockBodyScroll(open);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] bg-burgundy-900 text-paper md:hidden"
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-paper/10">
            <div className="flex items-center gap-3">
              <Image src="/logo-elart.png" alt={BRAND.name} width={40} height={40} className="h-10 w-10 object-contain" />
              <span className="font-display text-lg">{BRAND.name}</span>
            </div>
            <button
              aria-label={pick(UI.close)}
              onClick={onClose}
              className="rounded-full border border-paper/20 p-2 text-paper/80 hover:text-gold-500 transition"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="px-5 pt-6">
            <ul className="space-y-1">
              {NAV_ANCHORS.map((a, i) => (
                <motion.li
                  key={a.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.04, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={`#${a.id}`}
                    onClick={onClose}
                    className="block py-3 font-display text-3xl leading-tight hover:text-gold-500 transition"
                  >
                    {lang === "pl" ? a.pl : a.en}
                  </a>
                </motion.li>
              ))}
            </ul>
          </nav>

          <div className="mt-8 border-t border-paper/10 px-5 py-6 space-y-4">
            <LangSwitcher tone="white" />

            <a
              href={buildWhatsAppUrl(defaultQuoteMessage(lang))}
              target="_blank"
              rel="noopener"
              onClick={onClose}
              className="flex items-center justify-between rounded-full bg-gold-500 px-5 py-3 text-burgundy-900 font-medium"
            >
              <span>{pick(UI.fastQuote)} · WhatsApp</span>
              <MessageCircle size={18} />
            </a>

            <ul className="space-y-2 text-sm text-paper/80">
              <li>
                <a href={`tel:${BRAND.phoneTel}`} className="inline-flex items-center gap-2 hover:text-gold-500">
                  <Phone size={16} /> {BRAND.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${BRAND.email}`} className="inline-flex items-center gap-2 hover:text-gold-500">
                  <Mail size={16} /> {BRAND.email}
                </a>
              </li>
              <li>
                <a href={BRAND.instagram} target="_blank" rel="noopener" className="inline-flex items-center gap-2 hover:text-gold-500">
                  <Instagram size={16} /> Instagram
                </a>
              </li>
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

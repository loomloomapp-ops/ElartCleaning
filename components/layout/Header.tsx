"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BRAND, NAV_ANCHORS } from "@/lib/constants";
import { UI } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { LangSwitcher } from "./LangSwitcher";
import { MobileMenu } from "./MobileMenu";
import { buildWhatsAppUrl, defaultQuoteMessage } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export function Header() {
  const { dir, y } = useScrollDirection(10);
  const { pick, lang } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const anchorIds = NAV_ANCHORS.map((a) => a.id);
  const activeId = useScrollSpy(anchorIds, 120);

  const hidden = mounted && dir === "down" && y > 160;
  const scrolled = mounted && y > 24;

  return (
    <>
      <AnimatePresence>
        <motion.header
          initial={{ y: 0 }}
          animate={{ y: hidden ? -120 : 0 }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "fixed top-0 left-0 right-0 z-50 transition-colors duration-300",
            scrolled
              ? "bg-paper/92 backdrop-blur-md border-b border-ink/8 shadow-[0_8px_30px_-20px_rgba(74,0,15,0.25)]"
              : "bg-paper/80 backdrop-blur-md border-b border-transparent",
          )}
        >
          <div className="mx-auto max-w-container px-5 md:px-8 lg:px-10">
            <div className="flex h-16 md:h-20 items-center justify-between gap-4">
              {/* Logo */}
              <a
                href="#top"
                className="flex items-center gap-3 group shrink-0"
                aria-label={BRAND.name}
              >
                <Image
                  src="/logo-elart.png"
                  alt={BRAND.name}
                  width={44}
                  height={44}
                  priority
                  className="h-10 w-10 md:h-12 md:w-12 object-contain"
                />
                <span className="hidden sm:flex flex-col leading-none">
                  <span className="font-display text-lg md:text-xl text-ink group-hover:text-burgundy-700 transition-colors">
                    {BRAND.name}
                  </span>
                  <span className="font-bebas tracking-[0.22em] text-[10px] text-gold-600">
                    POZNAŃ
                  </span>
                </span>
              </a>

              {/* Nav */}
              <nav className="hidden lg:flex items-center gap-7">
                {NAV_ANCHORS.map((a) => {
                  const isActive = activeId === a.id;
                  return (
                    <a
                      key={a.id}
                      href={`#${a.id}`}
                      className={cn(
                        "relative text-sm font-medium transition-colors py-1",
                        isActive ? "text-burgundy-700" : "text-ink/80 hover:text-burgundy-700",
                      )}
                    >
                      {lang === "pl" ? a.pl : a.en}
                      <span
                        aria-hidden
                        className={cn(
                          "absolute -bottom-1 left-0 right-0 h-px bg-gold-500 origin-left transition-transform duration-300",
                          isActive ? "scale-x-100" : "scale-x-0",
                        )}
                      />
                    </a>
                  );
                })}
              </nav>

              {/* Right cluster */}
              <div className="flex items-center gap-3">
                <div className="hidden md:block">
                  <LangSwitcher />
                </div>

                <a
                  href={buildWhatsAppUrl(defaultQuoteMessage(lang))}
                  target="_blank"
                  rel="noopener"
                  className="hidden md:inline-flex group items-center gap-2.5 rounded-full bg-burgundy-700 text-paper pl-4 pr-2 py-2 text-sm font-medium hover:bg-burgundy-800 transition-all active:scale-[0.98]"
                >
                  <span>WhatsApp</span>
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-gold-500 text-burgundy-900 transition-transform group-hover:rotate-12">
                    <MessageCircle size={16} strokeWidth={2.2} />
                  </span>
                </a>

                <button
                  aria-label={pick(UI.menu)}
                  onClick={() => setMenuOpen(true)}
                  className="md:hidden grid h-11 w-11 place-items-center rounded-full bg-paper border border-ink/15 text-ink hover:border-burgundy-700 hover:text-burgundy-700 transition"
                >
                  <Menu size={20} />
                </button>
              </div>
            </div>
          </div>
        </motion.header>
      </AnimatePresence>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

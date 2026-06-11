"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, ArrowUpRight } from "lucide-react";
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

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.04 21.5h-.01a9.46 9.46 0 0 1-4.82-1.32l-.35-.2-3.58.94.96-3.49-.23-.36a9.43 9.43 0 0 1-1.45-5.05c0-5.22 4.25-9.47 9.48-9.47 2.53 0 4.91.99 6.7 2.78a9.42 9.42 0 0 1 2.77 6.7c0 5.22-4.25 9.47-9.47 9.47zm8.06-17.53A11.34 11.34 0 0 0 12.04.62C5.8.62.72 5.7.72 11.94c0 2 .52 3.95 1.52 5.68L.62 23.38l5.9-1.55a11.31 11.31 0 0 0 5.51 1.41h.01c6.24 0 11.32-5.08 11.32-11.32 0-3.03-1.18-5.87-3.32-8.01z" />
    </svg>
  );
}

export function Header() {
  const { dir, y } = useScrollDirection(10);
  const { pick, lang } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const anchorIds = NAV_ANCHORS.map((a) => a.id);
  const activeId = useScrollSpy(anchorIds, 140);

  const hidden = mounted && dir === "down" && y > 200;
  const scrolled = mounted && y > 24;

  return (
    <>
      {/* Top announcement banner */}
      <div className="hidden md:block bg-accent text-ink py-1.5 text-center text-b3 font-semibold">
        <span>
          {lang === "pl"
            ? "4 wolne terminy w tym tygodniu · "
            : "4 open slots this week · "}
          <a
            href={buildWhatsAppUrl(defaultQuoteMessage(lang))}
            target="_blank"
            rel="noopener"
            className="link-underline"
          >
            {lang === "pl" ? "Zarezerwuj zanim znikną" : "Book before they're gone"}
          </a>
        </span>
      </div>

      <AnimatePresence>
        <motion.header
          initial={{ y: 0 }}
          animate={{ y: hidden ? -160 : 0 }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "sticky top-0 left-0 right-0 z-50 transition-colors duration-300",
            scrolled
              ? "bg-paper border-b border-ink/8"
              : "bg-paper border-b border-transparent",
          )}
        >
          <div className="mx-auto max-w-container px-4 md:px-6 lg:px-8">
            <div className="flex h-16 md:h-20 items-center justify-between gap-4">
              {/* Logo */}
              <a
                href="#top"
                className="flex items-center gap-3 shrink-0"
                aria-label={BRAND.name}
              >
                <Image
                  src="/logo-elart.png"
                  alt={BRAND.name}
                  width={44}
                  height={44}
                  priority
                  className="h-10 w-10 md:h-11 md:w-11 object-contain"
                />
                <span className="hidden sm:flex flex-col leading-none">
                  <span className="font-display text-[18px] font-bold text-ink">
                    {BRAND.name}
                  </span>
                  <span className="text-label-2 font-bold uppercase text-ink/64 mt-0.5">
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
                        "text-b3 font-semibold transition-colors py-1 link-underline",
                        isActive ? "text-ink" : "text-ink/64 hover:text-ink",
                      )}
                    >
                      {lang === "pl" ? a.pl : a.en}
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
                  className="hidden md:inline-flex items-center gap-2 rounded-pill bg-[#25D366] text-white px-4 py-2.5 text-[14px] font-display font-bold uppercase leading-none transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:brightness-110 active:scale-95"
                >
                  <WhatsAppGlyph className="h-[18px] w-[18px] shrink-0" />
                  <span>{lang === "pl" ? "Napisz na WhatsApp" : "Message on WhatsApp"}</span>
                </a>

                <a
                  href={buildWhatsAppUrl(defaultQuoteMessage(lang))}
                  target="_blank"
                  rel="noopener"
                  className="hidden lg:inline-flex group relative items-center overflow-hidden rounded-pill bg-accent text-ink px-4 py-2.5 text-[14px] font-display font-bold uppercase leading-none transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-ink hover:text-paper hover:pr-10"
                >
                  <span className="relative z-10">
                    {lang === "pl" ? "Zamów wycenę" : "Book now"}
                  </span>
                  <span
                    aria-hidden
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 grid h-7 w-7 place-items-center rounded-full bg-paper text-ink opacity-0 -translate-x-2 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-hover:translate-x-0"
                  >
                    <ArrowUpRight size={14} strokeWidth={2.4} />
                  </span>
                </a>

                <a
                  href={buildWhatsAppUrl(defaultQuoteMessage(lang))}
                  target="_blank"
                  rel="noopener"
                  aria-label={lang === "pl" ? "Napisz na WhatsApp" : "Message on WhatsApp"}
                  className="md:hidden grid h-11 w-11 place-items-center rounded-full bg-[#25D366] text-white shadow-card transition-transform active:scale-95"
                >
                  <WhatsAppGlyph className="h-[20px] w-[20px]" />
                </a>

                <button
                  aria-label={pick(UI.menu)}
                  onClick={() => setMenuOpen(true)}
                  className="md:hidden grid h-11 w-11 place-items-center rounded-full bg-surface border border-ink/10 text-ink"
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

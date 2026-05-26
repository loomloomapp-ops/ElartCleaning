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
                  className="hidden md:inline-flex group relative items-center overflow-hidden rounded-pill bg-accent text-ink px-4 py-2.5 text-[14px] font-display font-bold uppercase leading-none transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-ink hover:text-paper hover:pr-10"
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

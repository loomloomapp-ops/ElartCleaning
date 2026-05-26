"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Instagram, Phone, Mail, MessageCircle } from "lucide-react";
import { Container } from "@/components/primitives";
import { SafeImage } from "@/components/primitives/SafeImage";
import { PrimaryButton, SecondaryButton } from "@/components/cta";
import { HERO_SLIDES, HERO, UI } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { STOCK } from "@/lib/stock";
import { BRAND } from "@/lib/constants";
import { buildWhatsAppUrl, defaultQuoteMessage } from "@/lib/whatsapp";

const AUTOPLAY_MS = 7000;

export function HeroSlider() {
  const { pick, lang } = useI18n();
  const [idx, setIdx] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % HERO_SLIDES.length), AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [paused]);

  const go = (n: number) => setIdx((HERO_SLIDES.length + n) % HERO_SLIDES.length);

  return (
    <section id="top" className="bg-paper pt-24 md:pt-28 lg:pt-32 pb-10 md:pb-14">
      <Container>
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="relative isolate overflow-hidden rounded-[1.75rem] md:rounded-[2.25rem] bg-burgundy-900 text-paper min-h-[600px] md:min-h-[680px] lg:min-h-[760px] shadow-card border border-ink/5"
        >
          {/* Slides — image only, no burgundy wash */}
          <div className="absolute inset-0 -z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <SafeImage
                  src={STOCK.heroSlides[idx]}
                  alt={pick(HERO_SLIDES[idx].title)}
                  className="absolute inset-0 w-full h-full"
                  priority
                />
                {/* Tone-down layer + readability scrim */}
                <div className="absolute inset-0 bg-black/15" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-transparent" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Content — bottom-left aligned */}
          <div className="relative h-full flex flex-col justify-end p-7 md:p-12 lg:p-16 min-h-[inherit]">
            <AnimatePresence mode="wait">
              <motion.div
                key={`text-${idx}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-2xl space-y-5"
              >
                <div className="inline-flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
                  <span className="font-bebas tracking-[0.24em] text-xs md:text-sm text-gold-500 uppercase">
                    {pick(HERO_SLIDES[idx].eyebrow)}
                  </span>
                </div>
                <h1 className="font-display font-medium leading-[1.05] tracking-tight text-balance text-[clamp(2.1rem,5.2vw,4.4rem)]">
                  {pick(HERO_SLIDES[idx].title)}
                </h1>
                <p className="text-paper/85 text-base md:text-lg max-w-xl leading-relaxed">
                  {pick(HERO_SLIDES[idx].body)}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-1">
                  <PrimaryButton
                    href={buildWhatsAppUrl(defaultQuoteMessage(lang))}
                    target="_blank"
                    rel="noopener"
                  >
                    {pick(HERO.ctaPrimary)}
                  </PrimaryButton>
                  <SecondaryButton href="#uslugi" tone="white">
                    {pick(HERO.ctaSecondary)}
                  </SecondaryButton>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Bottom bar: socials + slider controls */}
            <div className="mt-8 md:mt-12 flex flex-wrap items-center justify-between gap-5 border-t border-paper/15 pt-5">
              <ul className="flex items-center gap-3 text-paper/75">
                <li>
                  <a
                    href={BRAND.instagram}
                    target="_blank"
                    rel="noopener"
                    className="grid h-9 w-9 place-items-center rounded-full border border-paper/20 hover:bg-gold-500 hover:text-burgundy-900 hover:border-gold-500 transition"
                    aria-label="Instagram"
                  >
                    <Instagram size={15} />
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${BRAND.phoneTel}`}
                    className="grid h-9 w-9 place-items-center rounded-full border border-paper/20 hover:bg-gold-500 hover:text-burgundy-900 hover:border-gold-500 transition"
                    aria-label={pick(UI.call)}
                  >
                    <Phone size={15} />
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${BRAND.email}`}
                    className="grid h-9 w-9 place-items-center rounded-full border border-paper/20 hover:bg-gold-500 hover:text-burgundy-900 hover:border-gold-500 transition"
                    aria-label={pick(UI.email)}
                  >
                    <Mail size={15} />
                  </a>
                </li>
                <li>
                  <a
                    href={buildWhatsAppUrl(defaultQuoteMessage(lang))}
                    target="_blank"
                    rel="noopener"
                    className="grid h-9 w-9 place-items-center rounded-full border border-paper/20 hover:bg-gold-500 hover:text-burgundy-900 hover:border-gold-500 transition"
                    aria-label="WhatsApp"
                  >
                    <MessageCircle size={15} />
                  </a>
                </li>
              </ul>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {HERO_SLIDES.map((_, i) => (
                    <button
                      key={i}
                      aria-label={`Slide ${i + 1}`}
                      onClick={() => setIdx(i)}
                      className={`h-1.5 transition-all duration-500 rounded-full ${
                        i === idx ? "w-10 bg-gold-500" : "w-6 bg-paper/30 hover:bg-paper/50"
                      }`}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    aria-label="Previous slide"
                    onClick={() => go(idx - 1)}
                    className="grid h-9 w-9 place-items-center rounded-full border border-paper/25 text-paper hover:bg-gold-500 hover:text-burgundy-900 hover:border-gold-500 transition"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    aria-label="Next slide"
                    onClick={() => go(idx + 1)}
                    className="grid h-9 w-9 place-items-center rounded-full border border-paper/25 text-paper hover:bg-gold-500 hover:text-burgundy-900 hover:border-gold-500 transition"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

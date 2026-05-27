"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, ChevronsRight, Hand } from "lucide-react";
import { Container, Chip } from "@/components/primitives";
import { SERVICES } from "@/lib/content";
import { STOCK } from "@/lib/stock";
import { useI18n } from "@/lib/i18n";

const GAP = 20; // matches gap-5

export function ServicesMarquee() {
  const { pick, lang } = useI18n();
  const scrollerRef = React.useRef<HTMLDivElement>(null);
  const [paused, setPaused] = React.useState(false);
  const [showHint, setShowHint] = React.useState(true);
  const resumeTimer = React.useRef<number>(0);

  const stepSize = () => {
    const el = scrollerRef.current;
    if (!el) return 0;
    const card = el.querySelector<HTMLElement>("[data-card]");
    return card ? card.offsetWidth + GAP : el.clientWidth;
  };

  // Auto-advance one card every 4s; loop back to start at the end.
  React.useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      const el = scrollerRef.current;
      if (!el) return;
      const maxScroll = el.scrollWidth - el.clientWidth;
      const next = el.scrollLeft + stepSize();
      el.scrollTo({ left: next > maxScroll - 4 ? 0 : next, behavior: "smooth" });
    }, 4000);
    return () => window.clearInterval(id);
  }, [paused]);

  // Hide the swipe hint after a while if untouched.
  React.useEffect(() => {
    if (!showHint) return;
    const t = window.setTimeout(() => setShowHint(false), 6500);
    return () => window.clearTimeout(t);
  }, [showHint]);

  // Clean up the resume timer on unmount.
  React.useEffect(() => () => window.clearTimeout(resumeTimer.current), []);

  // Pause auto-play briefly when the user takes over (touch / manual scroll).
  const pauseTemporarily = () => {
    setPaused(true);
    window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => setPaused(false), 6000);
  };

  const onScroll = () => {
    if (showHint) setShowHint(false);
  };

  const scrollByDir = (dir: 1 | -1) => {
    scrollerRef.current?.scrollBy({ left: dir * stepSize(), behavior: "smooth" });
    pauseTemporarily();
  };

  return (
    <section id="uslugi" className="bg-paper py-section-sm">
      <Container>
        <div className="mb-8 flex items-end justify-between gap-4 lg:mb-10">
          <div className="flex max-w-col-6 flex-col gap-4">
            <Chip>{lang === "pl" ? "Usługi Elart Cleaning" : "Elart services"}</Chip>
            <h2 className="font-display text-[clamp(2rem,5.5vw,4.5rem)] font-bold uppercase leading-[0.9] tracking-[-0.02em] text-ink">
              {lang === "pl" ? "Co czyścimy" : "What we clean"}
            </h2>
          </div>

          {/* desktop arrows */}
          <div className="hidden shrink-0 items-center gap-2 md:flex">
            <button
              type="button"
              onClick={() => scrollByDir(-1)}
              aria-label={lang === "pl" ? "Poprzednia" : "Previous"}
              className="grid h-12 w-12 place-items-center rounded-full border border-ink/10 bg-surface text-ink transition hover:bg-ink hover:text-paper active:scale-95"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => scrollByDir(1)}
              aria-label={lang === "pl" ? "Następna" : "Next"}
              className="grid h-12 w-12 place-items-center rounded-full border border-ink/10 bg-surface text-ink transition hover:bg-ink hover:text-paper active:scale-95"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </Container>

      {/* slider */}
      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={pauseTemporarily}
      >
        <div
          ref={scrollerRef}
          onScroll={onScroll}
          className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-4 md:px-6 lg:px-8 [scroll-padding-left:1rem] md:[scroll-padding-left:1.5rem] lg:[scroll-padding-left:2rem]"
        >
          {SERVICES.map((s) => (
            <ServiceCard
              key={s.slug}
              slug={s.slug as keyof typeof STOCK.services}
              title={pick(s.title)}
            />
          ))}
        </div>

        {/* mobile swipe hint */}
        <AnimatePresence>
          {showHint && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 md:hidden"
            >
              <div className="flex items-center gap-3 rounded-full bg-ink/85 px-5 py-3.5 text-paper shadow-soft ring-1 ring-paper/15 backdrop-blur-md">
                <Hand size={26} strokeWidth={2} className="swipe-finger shrink-0" />
                <span className="text-b3 font-bold uppercase tracking-wider">
                  {lang === "pl" ? "Przesuń w bok" : "Swipe sideways"}
                </span>
                <ChevronsRight size={22} strokeWidth={2.5} className="swipe-arrows shrink-0 text-accent" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function ServiceCard({
  slug,
  title,
}: {
  slug: keyof typeof STOCK.services;
  title: string;
}) {
  const img = STOCK.services[slug];
  return (
    <a
      data-card
      href="#cennik"
      className="group relative block w-[260px] shrink-0 snap-start overflow-hidden rounded-2xl bg-ink sm:w-[320px]"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={img}
          alt={title}
          fill
          sizes="320px"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-paper text-ink transition-transform duration-300 group-hover:rotate-45">
          <ArrowUpRight size={18} strokeWidth={2.4} />
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-display text-h6 font-bold uppercase leading-tight text-paper">{title}</h3>
      </div>
    </a>
  );
}

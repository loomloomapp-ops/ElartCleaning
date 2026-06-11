"use client";

import * as React from "react";
import { ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/primitives";
import { SafeImage } from "@/components/primitives/SafeImage";
import { StaggerGroup, StaggerItem } from "@/components/motion";
import { SERVICES, SERVICE_PRICE, HEADINGS } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { buildWhatsAppUrl, serviceQuoteMessage } from "@/lib/whatsapp";
import { STOCK } from "@/lib/stock";

type Service = (typeof SERVICES)[number];

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.04 21.5h-.01a9.46 9.46 0 0 1-4.82-1.32l-.35-.2-3.58.94.96-3.49-.23-.36a9.43 9.43 0 0 1-1.45-5.05c0-5.22 4.25-9.47 9.48-9.47 2.53 0 4.91.99 6.7 2.78a9.42 9.42 0 0 1 2.77 6.7c0 5.22-4.25 9.47-9.47 9.47zm8.06-17.53A11.34 11.34 0 0 0 12.04.62C5.8.62.72 5.7.72 11.94c0 2 .52 3.95 1.52 5.68L.62 23.38l5.9-1.55a11.31 11.31 0 0 0 5.51 1.41h.01c6.24 0 11.32-5.08 11.32-11.32 0-3.03-1.18-5.87-3.32-8.01z" />
    </svg>
  );
}

function ServiceModal({ service, onClose }: { service: Service; onClose: () => void }) {
  const { pick, lang } = useI18n();
  useLockBodyScroll(true);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const info = SERVICE_PRICE[service.slug];
  const title = pick(service.title);
  const price = info ? pick(info.price) : undefined;
  const wa = buildWhatsAppUrl(serviceQuoteMessage(title, price, lang));
  const image = STOCK.services[service.slug as keyof typeof STOCK.services];

  return (
    <motion.div
      className="fixed inset-0 z-[100] grid place-items-center bg-ink/80 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative w-full max-w-md overflow-hidden rounded-4xl bg-surface shadow-soft"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={lang === "pl" ? "Zamknij" : "Close"}
          className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-paper/90 text-ink shadow-card transition active:scale-95"
        >
          <X size={20} />
        </button>

        {image && (
          <div className="relative bg-cream-deep">
            <SafeImage src={image} alt={title} ratio="16/10" className="w-full" />
            <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-pill bg-burgundy-900 px-3 py-1.5 text-label-2 font-bold uppercase tracking-wider text-gold-500">
              {pick(service.ribbon)}
            </span>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-surface to-transparent" />
          </div>
        )}

        <div className="space-y-5 p-7 md:p-8">
          {!image && (
            <span className="inline-flex items-center gap-2 rounded-pill bg-burgundy-900 px-3 py-1.5 text-label-2 font-bold uppercase tracking-wider text-gold-500">
              {pick(service.ribbon)}
            </span>
          )}

          <h3 className="font-display text-2xl font-bold leading-tight text-ink md:text-3xl">
            {title}
          </h3>

          <p className="text-b2 leading-relaxed text-ink/64">{pick(service.description)}</p>

          {info && (
            <div className="rounded-2xl bg-cream-deep p-5">
              <p className="text-label-2 uppercase tracking-wider text-ink/45">
                {lang === "pl" ? "Cena orientacyjna" : "Starting price"}
              </p>
              <p className="font-display text-2xl font-bold text-ink">{price}</p>
              <p className="mt-1 text-b3 text-ink/55">{pick(info.note)}</p>
            </div>
          )}

          <a
            href={wa}
            target="_blank"
            rel="noopener"
            className="inline-flex w-full items-center justify-center gap-2.5 rounded-pill bg-[#25D366] px-6 py-4 font-display text-[15px] font-bold uppercase tracking-wide text-white shadow-card transition-all duration-300 hover:brightness-110 active:scale-95"
          >
            <WhatsAppGlyph className="h-5 w-5 shrink-0" />
            {lang === "pl" ? "Napisz na WhatsApp" : "Message on WhatsApp"}
          </a>

          <p className="text-center text-label-2 leading-relaxed text-ink/40">
            {lang === "pl"
              ? "Ostateczna cena zależy od metrażu, zakresu i stopnia zabrudzenia."
              : "Final price depends on area, scope and level of soiling."}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/**
 * Replica of Cleaningflow services list — dark container, title bar
 * with "• Services" eyebrow, big H2 "From floors to ceilings", and a flex of
 * 5+ wide rows. Each row is a service link with H3 + chevron-icon.
 * On hover, 3 floating images appear (portrait, landscape, circle).
 */
const FLOATING_BY_SLUG: Record<string, [string, string, string]> = {
  mieszkania: [
    STOCK.services.mieszkania,
    STOCK.services.domy,
    STOCK.services["po-remoncie"],
  ],
  domy: [STOCK.services.domy, STOCK.services.mieszkania, STOCK.services.biura],
  "po-remoncie": [STOCK.services["po-remoncie"], STOCK.services.biura, STOCK.services.mieszkania],
  biura: [STOCK.services.biura, STOCK.services["po-remoncie"], STOCK.services.abonament],
  tapicerka: [STOCK.services.tapicerka, STOCK.services.dywany, STOCK.services.mieszkania],
  dywany: [STOCK.services.dywany, STOCK.services.tapicerka, STOCK.services.mieszkania],
  okna: [STOCK.services.okna, STOCK.services.biura, STOCK.services.mieszkania],
  transport: [STOCK.services.transport, STOCK.services.domy, STOCK.services.abonament],
  magazyn: [STOCK.services.magazyn, STOCK.services.transport, STOCK.services.domy],
  abonament: [STOCK.services.abonament, STOCK.services.biura, STOCK.services.mieszkania],
};

export function Services() {
  const { pick } = useI18n();
  const [selected, setSelected] = React.useState<Service | null>(null);

  return (
    <section id="uslugi" className="bg-paper py-10 md:py-14">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] bg-burgundy-900 text-paper p-8 md:p-14 lg:p-20">
          {/* radial accent */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.15] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 12% 18%, rgba(204,177,112,0.6) 0, transparent 38%), radial-gradient(circle at 90% 100%, rgba(204,177,112,0.35) 0, transparent 50%)",
            }}
          />

          {/* Title bar */}
          <div className="relative flex items-center gap-3 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
            <span className="font-bebas tracking-[0.24em] text-xs md:text-sm text-gold-500 uppercase">
              {pick(HEADINGS.services)}
            </span>
          </div>
          <h2 className="relative font-display font-medium leading-[1.05] tracking-tight text-balance text-[clamp(2.2rem,5vw,4rem)] max-w-3xl">
            {pick(HEADINGS.servicesSub)}
          </h2>

          {/* Services list */}
          <StaggerGroup className="relative mt-10 md:mt-14 divide-y divide-paper/10 border-y border-paper/10">
            {SERVICES.map((s) => {
              const imgs = FLOATING_BY_SLUG[s.slug] ?? [
                STOCK.services.mieszkania,
                STOCK.services.domy,
                STOCK.services.biura,
              ];
              return (
                <StaggerItem key={s.slug}>
                  <button
                    onClick={() => setSelected(s)}
                    className="group relative w-full grid grid-cols-[1fr_auto] items-center gap-6 py-6 md:py-7 text-left"
                  >
                    {/* Title — moves right + gold on hover */}
                    <h3 className="font-display text-2xl md:text-4xl lg:text-5xl text-paper leading-tight tracking-tight transition-all duration-500 group-hover:text-gold-500 group-hover:translate-x-2">
                      {pick(s.title)}
                    </h3>

                    {/* Chevron */}
                    <span className="grid h-12 w-12 md:h-14 md:w-14 place-items-center rounded-full border border-paper/30 text-paper transition group-hover:bg-gold-500 group-hover:text-burgundy-900 group-hover:border-gold-500">
                      <ChevronRight size={20} />
                    </span>

                    {/* Hover-reveal floating images */}
                    <span
                      aria-hidden
                      className="hidden lg:block pointer-events-none absolute right-[18%] top-1/2 -translate-y-1/2 w-32 h-44 rounded-2xl overflow-hidden opacity-0 -rotate-6 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-[-50%] group-hover:rotate-[-4deg] z-10"
                    >
                      <SafeImage src={imgs[0]} alt="" className="w-full h-full" ratio="3/4" />
                    </span>
                    <span
                      aria-hidden
                      className="hidden lg:block pointer-events-none absolute right-[34%] top-1/2 -translate-y-1/2 w-44 h-28 rounded-2xl overflow-hidden opacity-0 rotate-3 translate-y-6 transition-all duration-500 delay-75 group-hover:opacity-100 group-hover:translate-y-[-50%] group-hover:rotate-2 z-10"
                    >
                      <SafeImage src={imgs[1]} alt="" className="w-full h-full" ratio="16/10" />
                    </span>
                    <span
                      aria-hidden
                      className="hidden lg:block pointer-events-none absolute right-[10%] top-1/2 -translate-y-1/2 w-24 h-24 rounded-full overflow-hidden opacity-0 transition-all duration-500 delay-150 group-hover:opacity-100 group-hover:scale-110 z-10"
                    >
                      <SafeImage src={imgs[2]} alt="" className="w-full h-full" />
                    </span>
                  </button>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </Container>

      <AnimatePresence>
        {selected && (
          <ServiceModal service={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

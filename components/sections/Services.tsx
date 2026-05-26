"use client";

import { ChevronRight } from "lucide-react";
import { Container } from "@/components/primitives";
import { SafeImage } from "@/components/primitives/SafeImage";
import { StaggerGroup, StaggerItem } from "@/components/motion";
import { SERVICES, HEADINGS } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { usePopup } from "@/components/widgets/PopupProvider";
import { STOCK } from "@/lib/stock";

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
  const { openPopup } = usePopup();

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
                    onClick={openPopup}
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
    </section>
  );
}

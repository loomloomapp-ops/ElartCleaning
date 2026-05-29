"use client";

import { useState } from "react";
import { Container, Chip } from "@/components/primitives";
import { PrimaryButton } from "@/components/cta";
import { PRICE_CATALOG, PRICES_NOTE } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { buildWhatsAppUrl, defaultQuoteMessage } from "@/lib/whatsapp";

/**
 * Pełny cennik — kompletny katalog z briefu (5 sektorów).
 * Zakładki sektorów przełączają widoczną tabelę; w każdym sektorze
 * usługi pogrupowane są w kategorie, a cena jest mocno wyeksponowana po prawej.
 */
export function PriceList() {
  const { pick, lang } = useI18n();
  const [active, setActive] = useState(0);
  const sector = PRICE_CATALOG[active];

  return (
    <section id="cennik-pelny" className="bg-paper py-section-md scroll-mt-24">
      <Container>
        <div className="rounded-[2rem] bg-cream-deep px-5 md:px-10 lg:px-14 py-10 md:py-14 lg:py-16">
          {/* Heading */}
          <div className="flex flex-col items-center text-center gap-4 max-w-col-6 mx-auto mb-8 md:mb-10">
            <Chip tone="surface">{lang === "pl" ? "Pełny cennik" : "Full price list"}</Chip>
            <h2 className="font-display font-bold uppercase leading-[0.9] tracking-[-0.02em] text-ink text-[clamp(2rem,5.5vw,4.5rem)]">
              {lang === "pl" ? "Wszystkie usługi i ceny" : "Every service and price"}
            </h2>
            <p className="text-b1 text-ink/64 max-w-col-4">
              {lang === "pl"
                ? "Pięć sektorów, pełen zakres i jasne stawki. Wybierz kategorię, aby zobaczyć szczegóły."
                : "Five sectors, full scope and clear rates. Pick a category to see details."}
            </p>
          </div>

          {/* Sector tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8 md:mb-10">
            {PRICE_CATALOG.map((s, i) => (
              <button
                key={s.num}
                onClick={() => setActive(i)}
                aria-pressed={active === i}
                className={cn(
                  "group inline-flex items-center gap-2 rounded-full pl-2 pr-4 py-2 text-b3 font-bold uppercase transition",
                  active === i
                    ? "bg-ink text-paper"
                    : "bg-surface text-ink/64 hover:text-ink",
                )}
              >
                <span
                  className={cn(
                    "grid h-7 w-7 place-items-center rounded-full font-display text-label-1 transition",
                    active === i ? "bg-accent text-ink" : "bg-cream-deep text-ink/64 group-hover:text-ink",
                  )}
                >
                  {s.num}
                </span>
                {pick(s.title)}
              </button>
            ))}
          </div>

          {/* Active sector table */}
          <div className="rounded-3xl bg-surface px-5 md:px-9 lg:px-12 py-8 md:py-10">
            <div className="flex items-baseline gap-3 mb-6 md:mb-8">
              <span className="font-display font-bold leading-none text-ink/15 text-[clamp(2.5rem,6vw,4rem)]">
                {sector.num}
              </span>
              <div className="flex flex-col">
                <span className="font-display font-bold uppercase text-ink text-h6 md:text-[1.6rem] leading-tight">
                  {pick(sector.title)}
                </span>
                <span className="text-b3 text-ink/56 uppercase tracking-[0.08em]">
                  {pick(sector.subtitle)}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-7 md:gap-9">
              {sector.groups.map((g) => (
                <div key={pick(g.label)}>
                  {/* Category label */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-label-1 font-bold uppercase tracking-[0.12em] text-gold-600">
                      {pick(g.label)}
                    </span>
                    <span aria-hidden className="h-px flex-1 bg-ink/10" />
                  </div>

                  {/* Rows */}
                  <ul className="divide-y divide-ink/8">
                    {g.rows.map((r) => (
                      <li
                        key={pick(r.name)}
                        className="flex items-baseline justify-between gap-4 md:gap-8 py-3"
                      >
                        <span className="text-b2 text-ink/80 leading-snug">{pick(r.name)}</span>
                        <span
                          className={cn(
                            "shrink-0 text-right font-display",
                            r.quote
                              ? "text-b3 italic text-ink/48 font-medium"
                              : "text-b1 font-bold text-ink",
                          )}
                        >
                          {pick(r.price)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Footer note + CTA */}
          <div className="mt-8 md:mt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <p className="text-b3 text-ink/56 max-w-col-5">{pick(PRICES_NOTE)}</p>
            <PrimaryButton
              href={buildWhatsAppUrl(defaultQuoteMessage(lang))}
              target="_blank"
              rel="noopener"
              className="shrink-0 justify-center"
            >
              {lang === "pl" ? "Zamów dokładną wycenę" : "Get an exact quote"}
            </PrimaryButton>
          </div>
        </div>
      </Container>
    </section>
  );
}

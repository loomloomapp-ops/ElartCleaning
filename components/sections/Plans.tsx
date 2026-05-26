"use client";

import { ArrowRight } from "lucide-react";
import { Container } from "@/components/primitives";
import { FadeUp, StaggerGroup, StaggerItem } from "@/components/motion";
import { PLAN_TIERS, PRICES_NOTE, PRICES, HEADINGS, UI } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * Replica of Cleaningflow Pricing — title-bar + flexbox of 3 cards,
 * middle card "featured" with dark header. Each card: title block, price row,
 * features list, primary button.
 */
export function Plans() {
  const { pick } = useI18n();
  return (
    <section id="cennik" className="bg-paper py-28 md:py-40">
      <Container className="space-y-14 md:space-y-20">
        {/* Editorial intro band */}
        <FadeUp>
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-16 items-end">
            <div className="space-y-5">
              <span className="inline-flex items-center gap-2.5 font-bebas tracking-[0.24em] text-xs md:text-sm uppercase text-burgundy-700">
                <span className="h-1.5 w-1.5 rounded-full bg-burgundy-700" />
                {pick(HEADINGS.prices)}
              </span>
              <h2 className="font-display font-medium leading-[1.02] tracking-tight text-balance text-ink text-[clamp(2.25rem,5vw,4.25rem)] max-w-2xl">
                {pick(HEADINGS.plans)}
              </h2>
            </div>
            <p className="text-ink/65 leading-relaxed text-base md:text-lg max-w-md lg:pb-2">
              {pick({
                pl: "Trzy progi do wyboru — od ekspresowego odświeżenia po pełną opiekę. Każda wycena dopasowana do metrażu i stanu.",
                en: "Three tiers to choose from — from express refresh to full care. Each quote is tailored to area and condition.",
              })}
            </p>
          </div>
        </FadeUp>

        {/* 3 cards */}
        <StaggerGroup className="grid md:grid-cols-3 gap-5 md:gap-6 max-w-6xl mx-auto items-stretch">
          {PLAN_TIERS.map((p) => {
            const hl = !!p.highlight;
            return (
              <StaggerItem key={p.key}>
                <div
                  className={cn(
                    "group h-full rounded-[1.5rem] overflow-hidden flex flex-col border transition-all duration-500",
                    hl
                      ? "border-burgundy-700 bg-paper shadow-card md:scale-[1.04]"
                      : "border-ink/10 bg-paper hover:-translate-y-1 hover:shadow-card hover:border-burgundy-700/30",
                  )}
                >
                  {/* Header */}
                  <div
                    className={cn(
                      "p-6 md:p-7",
                      hl
                        ? "bg-burgundy-700 text-paper"
                        : "bg-cream text-ink border-b border-ink/8",
                    )}
                  >
                    <h3
                      className={cn(
                        "font-display text-xl tracking-tight",
                        hl ? "text-paper" : "text-ink",
                      )}
                    >
                      {pick(p.title)}
                    </h3>
                    <p className={cn("mt-1 text-sm", hl ? "text-paper/75" : "text-ink/60")}>
                      {pick(p.summary)}
                    </p>
                  </div>

                  {/* Body */}
                  <div className="p-6 md:p-7 flex flex-col gap-6 grow">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="font-display text-4xl md:text-5xl text-burgundy-700 leading-none tabular-nums">
                        {pick(p.price).split(" ")[0]}
                      </span>
                      <span className="text-ink/55 text-sm">
                        {pick(p.price).split(" ").slice(1).join(" ") || pick({ pl: "/ usługa", en: "/ visit" })}
                      </span>
                    </div>

                    <ul className="space-y-3 text-sm text-ink/80 grow">
                      {p.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="grid h-5 w-5 shrink-0 mt-0.5 place-items-center rounded-full bg-burgundy-700 text-gold-500 text-xs">
                            ✓
                          </span>
                          {pick(f)}
                        </li>
                      ))}
                    </ul>

                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(
                        `Dzień dobry Elart Cleaning, interesuje mnie pakiet ${pick(p.title)} (${pick(p.price)}). Proszę o wycenę.`,
                      )}`}
                      target="_blank"
                      rel="noopener"
                      className={cn(
                        "group/btn inline-flex items-center justify-between gap-3 rounded-full px-5 py-3.5 text-sm font-medium transition",
                        hl
                          ? "bg-gold-500 text-burgundy-900 hover:bg-gold-400"
                          : "bg-burgundy-700 text-paper hover:bg-burgundy-800",
                      )}
                    >
                      {pick(UI.orderQuote)}
                      <span
                        className={cn(
                          "grid h-7 w-7 place-items-center rounded-full transition group-hover/btn:translate-x-0.5",
                          hl ? "bg-burgundy-900 text-gold-500" : "bg-gold-500 text-burgundy-900",
                        )}
                      >
                        <ArrowRight size={12} />
                      </span>
                    </a>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>

        {/* Note + full pricelist grid */}
        <FadeUp className="space-y-8">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div className="space-y-3 max-w-2xl">
              <span className="inline-flex items-center gap-2.5 font-bebas tracking-[0.24em] text-xs uppercase text-burgundy-700">
                <span className="h-1.5 w-1.5 rounded-full bg-burgundy-700" />
                {pick({ pl: "Pełen cennik", en: "Full pricelist" })}
              </span>
              <h3 className="font-display text-2xl md:text-3xl text-ink leading-tight">
                {pick({
                  pl: "Pojedyncze pozycje i dodatki",
                  en: "Individual items & add-ons",
                })}
              </h3>
            </div>
            <p className="text-sm text-ink/60 max-w-md">{pick(PRICES_NOTE)}</p>
          </div>

          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-ink/8 border border-ink/8 rounded-[1.5rem] overflow-hidden">
            {PRICES.map((p) => (
              <li
                key={p.key}
                className="bg-paper p-6 hover:bg-cream transition flex flex-col gap-3"
              >
                <p className="text-sm font-semibold text-burgundy-700 leading-snug">
                  {pick(p.title)}
                </p>
                <p className="text-2xl font-semibold text-ink tabular-nums leading-tight">
                  {pick(p.price)}
                </p>
                <p className="text-sm text-ink/65 leading-relaxed mt-auto">{pick(p.note)}</p>
              </li>
            ))}
          </ul>
        </FadeUp>
      </Container>
    </section>
  );
}

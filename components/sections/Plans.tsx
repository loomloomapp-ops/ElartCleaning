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
    <section id="cennik" className="bg-paper py-24 md:py-32 lg:py-36">
      <Container className="space-y-12">
        {/* Title bar */}
        <FadeUp>
          <div className="flex items-center gap-3 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-burgundy-700" />
            <span className="font-bebas tracking-[0.24em] text-xs md:text-sm text-burgundy-700 uppercase">
              {pick(HEADINGS.prices)}
            </span>
          </div>
          <h2 className="font-display font-medium leading-[1.05] tracking-tight text-balance text-ink text-[clamp(2.2rem,5vw,4rem)] max-w-3xl">
            {pick(HEADINGS.plans)}
          </h2>
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
        <FadeUp className="space-y-6">
          <p className="text-sm text-ink/60 max-w-3xl mx-auto text-center">{pick(PRICES_NOTE)}</p>
          <div className="rounded-[1.5rem] border border-ink/8 bg-cream p-6 md:p-8">
            <p className="font-bebas tracking-[0.2em] text-burgundy-700 text-xs uppercase mb-4">
              {pick({ pl: "Pełen cennik", en: "Full pricelist" })}
            </p>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {PRICES.map((p) => (
                <li
                  key={p.key}
                  className="rounded-2xl bg-paper border border-ink/8 p-4 hover:border-burgundy-700/30 transition"
                >
                  <p className="text-xs font-bebas tracking-[0.18em] text-burgundy-700">
                    {pick(p.title)}
                  </p>
                  <p className="mt-1 font-display text-xl text-ink tabular-nums leading-none">
                    {pick(p.price)}
                  </p>
                  <p className="mt-2 text-xs text-ink/60 leading-relaxed">{pick(p.note)}</p>
                </li>
              ))}
            </ul>
          </div>
        </FadeUp>
      </Container>
    </section>
  );
}

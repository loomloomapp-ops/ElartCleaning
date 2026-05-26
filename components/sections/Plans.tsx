"use client";

import { ArrowRight } from "lucide-react";
import { Container, SectionHeading } from "@/components/primitives";
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
    <section id="cennik" className="bg-paper py-28 md:py-40 lg:py-48">
      <Container className="space-y-16 md:space-y-24">
        <FadeUp>
          <SectionHeading
            eyebrow={pick(HEADINGS.prices)}
            title={pick(HEADINGS.plans)}
            subtitle={pick({
              pl: "Trzy progi do wyboru — od ekspresowego odświeżenia po pełną opiekę. Każda wycena dopasowana do metrażu i stanu.",
              en: "Three tiers to choose from — from express refresh to full care. Each quote is tailored to area and condition.",
            })}
          />
        </FadeUp>

        {/* 3 cards */}
        <StaggerGroup className="grid md:grid-cols-3 gap-5 md:gap-6 max-w-6xl mx-auto items-stretch">
          {PLAN_TIERS.map((p) => {
            const hl = !!p.highlight;
            return (
              <StaggerItem key={p.key}>
                <div
                  className={cn(
                    "group h-full rounded-[1.5rem] overflow-hidden flex flex-col transition-all duration-500",
                    hl ? "bg-burgundy-900 text-paper md:scale-[1.03]" : "bg-cream text-ink hover:-translate-y-1",
                  )}
                >
                  {/* Header */}
                  <div
                    className={cn(
                      "p-8 md:p-10",
                      hl ? "text-paper" : "text-ink",
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
                  <div className="px-8 pb-8 md:px-10 md:pb-10 flex flex-col gap-7 grow">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span
                        className={cn(
                          "font-display font-medium leading-none tabular-nums tracking-[-0.03em] text-[clamp(2.5rem,4.5vw,3.5rem)]",
                          hl ? "text-gold-500" : "text-burgundy-700",
                        )}
                      >
                        {pick(p.price).split(" ")[0]}
                      </span>
                      <span className={cn("text-sm", hl ? "text-paper/65" : "text-ink/55")}>
                        {pick(p.price).split(" ").slice(1).join(" ") || pick({ pl: "/ usługa", en: "/ visit" })}
                      </span>
                    </div>

                    <ul className={cn("space-y-3 text-sm grow", hl ? "text-paper/85" : "text-ink/75")}>
                      {p.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span
                            className={cn(
                              "grid h-5 w-5 shrink-0 mt-0.5 place-items-center rounded-full text-xs",
                              hl ? "bg-gold-500 text-burgundy-900" : "bg-burgundy-700 text-gold-500",
                            )}
                          >
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

        {/* Full pricelist */}
        <FadeUp className="space-y-12 pt-8">
          <SectionHeading
            eyebrow={pick({ pl: "Pełen cennik", en: "Full pricelist" })}
            title={pick({
              pl: "Pojedyncze pozycje i dodatki",
              en: "Individual items & add-ons",
            })}
            subtitle={pick(PRICES_NOTE)}
          />

          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-ink/8 rounded-[1.75rem] overflow-hidden">
            {PRICES.map((p) => (
              <li
                key={p.key}
                className="bg-cream p-7 hover:bg-paper transition flex flex-col gap-3"
              >
                <p className="text-sm font-semibold text-burgundy-700 leading-snug">
                  {pick(p.title)}
                </p>
                <p className="text-3xl font-semibold text-ink tabular-nums leading-tight tracking-[-0.02em]">
                  {pick(p.price)}
                </p>
                <p className="text-sm text-ink/60 leading-relaxed mt-auto">{pick(p.note)}</p>
              </li>
            ))}
          </ul>
        </FadeUp>
      </Container>
    </section>
  );
}

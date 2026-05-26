"use client";

import { Check } from "lucide-react";
import { Container, Chip } from "@/components/primitives";
import { PrimaryButton, SecondaryButton } from "@/components/cta";
import { PLAN_TIERS } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { buildWhatsAppUrl, defaultQuoteMessage } from "@/lib/whatsapp";

const SCOPES_PL = ["Sprzątanie", "Po remoncie", "Biura · Lokale"];
const SCOPES_EN = ["Apartments", "Post-reno", "Offices"];

export function Plans() {
  const { pick, lang } = useI18n();
  const [tab, setTab] = useState(0);
  const scopes = lang === "pl" ? SCOPES_PL : SCOPES_EN;

  return (
    <section id="cennik" className="bg-paper py-section-md">
      <Container>
        <div className="rounded-3xl bg-cream-deep px-6 md:px-10 lg:px-16 py-16 lg:py-24">
          <div className="flex flex-col items-center text-center gap-5 max-w-col-6 mx-auto mb-10">
            <Chip tone="surface">{lang === "pl" ? "Cennik" : "Pricing"}</Chip>
            <h2 className="font-display font-bold uppercase leading-[0.9] tracking-[-0.02em] text-ink text-[clamp(2rem,5.5vw,4.5rem)]">
              {lang === "pl" ? "Przejrzysty cennik" : "Simple pricing"}
            </h2>
            <p className="text-b1 text-ink/64 max-w-col-4">
              {lang === "pl"
                ? "Trzy gotowe pakiety. Finalna wycena zawsze indywidualna — dopasowana do metrażu i zakresu."
                : "Three ready packages. Final quote always individual — tailored to area and scope."}
            </p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {scopes.map((s, i) => (
              <button
                key={s}
                onClick={() => setTab(i)}
                className={cn(
                  "rounded-full px-4 py-2 text-b3 font-bold uppercase transition",
                  tab === i ? "bg-ink text-paper" : "bg-surface text-ink/64 hover:text-ink",
                )}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-5">
            {PLAN_TIERS.map((p) => {
              const highlight = p.highlight;
              return (
                <div
                  key={p.key}
                  className={cn(
                    "rounded-2xl p-7 lg:p-8 flex flex-col gap-6",
                    highlight ? "bg-ink text-paper" : "bg-surface text-ink",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold uppercase text-h6">
                      {pick(p.title)}
                    </span>
                    {highlight ? (
                      <span className="rounded-full bg-accent text-ink text-label-2 font-bold uppercase px-2.5 py-1">
                        {lang === "pl" ? "Najczęściej" : "Most popular"}
                      </span>
                    ) : null}
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="font-display font-bold leading-[0.95] text-[clamp(2rem,4vw,2.75rem)]">
                      {pick(p.price)}
                    </span>
                    <span
                      className={cn(
                        "text-b3",
                        highlight ? "text-paper/64" : "text-ink/64",
                      )}
                    >
                      {pick(p.summary)}
                    </span>
                  </div>

                  <ul className="flex flex-col gap-2.5 flex-1">
                    {p.features.map((f, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-b3">
                        <span
                          className={cn(
                            "mt-0.5 grid h-5 w-5 place-items-center rounded-full shrink-0",
                            highlight ? "bg-accent text-ink" : "bg-cream-deep text-ink",
                          )}
                        >
                          <Check size={12} strokeWidth={3} />
                        </span>
                        <span>{pick(f)}</span>
                      </li>
                    ))}
                  </ul>

                  {highlight ? (
                    <PrimaryButton
                      href={buildWhatsAppUrl(defaultQuoteMessage(lang))}
                      target="_blank"
                      rel="noopener"
                      className="w-full justify-center"
                    >
                      {lang === "pl" ? "Wybieram" : "Choose"}
                    </PrimaryButton>
                  ) : (
                    <SecondaryButton
                      href={buildWhatsAppUrl(defaultQuoteMessage(lang))}
                      target="_blank"
                      rel="noopener"
                      className="w-full justify-center"
                    >
                      {lang === "pl" ? "Zapytaj" : "Ask"}
                    </SecondaryButton>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

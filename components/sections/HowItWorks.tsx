"use client";

import { Container, Chip } from "@/components/primitives";
import { PrimaryButton } from "@/components/cta";
import { HOW_STEPS } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { buildWhatsAppUrl, defaultQuoteMessage } from "@/lib/whatsapp";

export function HowItWorks() {
  const { pick, lang } = useI18n();

  return (
    <section id="proces" className="bg-paper py-section-md">
      <Container>
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* LEFT — sticky headline */}
          <div className="lg:sticky lg:top-32 flex flex-col gap-6 max-w-col-4">
            <Chip>{lang === "pl" ? "Jak pracujemy" : "How it works"}</Chip>
            <h2 className="font-display font-bold uppercase leading-[0.9] tracking-[-0.02em] text-ink text-[clamp(2rem,5.5vw,4.5rem)]">
              {lang === "pl" ? "7 kroków od kontaktu do czystej przestrzeni" : "7 steps from contact to a clean space"}
            </h2>
            <p className="text-b1 text-ink/64">
              {lang === "pl"
                ? "Spokojnie, dokładnie, z gwarancją satysfakcji. Bez niespodzianek w cenie ani w zakresie."
                : "Calmly, thoroughly, with a satisfaction guarantee. No surprises in price or scope."}
            </p>
            <div className="pt-2">
              <PrimaryButton
                href={buildWhatsAppUrl(defaultQuoteMessage(lang))}
                target="_blank"
                rel="noopener"
              >
                {lang === "pl" ? "Rozpocznijmy" : "Let's start"}
              </PrimaryButton>
            </div>
          </div>

          {/* RIGHT — numbered list */}
          <ul className="flex flex-col">
            {HOW_STEPS.map((s, i) => (
              <li
                key={i}
                className="grid grid-cols-[auto_1fr] gap-5 lg:gap-8 py-6 lg:py-8 border-b border-ink/10 first:border-t"
              >
                <span className="font-display font-bold leading-none text-ink/64 text-[clamp(2.5rem,5vw,4rem)] min-w-[3ch]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-2 pt-1">
                  <h3 className="font-display font-bold text-h6 text-ink leading-tight">
                    {pick(s.title)}
                  </h3>
                  <p className="text-b3 text-ink/64 leading-relaxed">{pick(s.body)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

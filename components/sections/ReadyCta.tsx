"use client";

import { Container, Chip } from "@/components/primitives";
import { PrimaryButton } from "@/components/cta";
import { useI18n } from "@/lib/i18n";
import { buildWhatsAppUrl, defaultQuoteMessage } from "@/lib/whatsapp";

export function ReadyCta() {
  const { lang } = useI18n();
  return (
    <section id="kontakt" className="bg-paper pt-section-xs">
      <Container>
        <div className="rounded-3xl bg-accent text-ink px-6 md:px-10 lg:px-14 py-12 md:py-16 lg:py-20 flex flex-col items-center text-center gap-5">
          <Chip tone="surface">{lang === "pl" ? "Czas na czystość" : "Ready to clean"}</Chip>
          <h2 className="font-display font-bold uppercase leading-[0.9] tracking-[-0.02em] text-[clamp(2rem,6vw,5rem)] max-w-col-6">
            {lang === "pl"
              ? "Gotowy na czystość i spokój w domu?"
              : "Ready for a cleaner, calmer home?"}
          </h2>
          <p className="text-b1 text-ink/72 max-w-col-4">
            {lang === "pl"
              ? "Napisz na WhatsApp — odpowiadamy w kilkanaście minut i przygotujemy przejrzystą wycenę."
              : "Message us on WhatsApp — we reply within minutes with a clear quote."}
          </p>
          <div className="pt-2">
            <PrimaryButton
              href={buildWhatsAppUrl(defaultQuoteMessage(lang))}
              target="_blank"
              rel="noopener"
              className="!bg-ink !text-paper hover:!bg-burgundy-700"
            >
              {lang === "pl" ? "Zamów wycenę" : "Get a quote"}
            </PrimaryButton>
          </div>
        </div>
      </Container>
    </section>
  );
}

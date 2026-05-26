"use client";

import { Container } from "@/components/primitives";
import { SafeImage } from "@/components/primitives/SafeImage";
import { FadeUp } from "@/components/motion";
import { WhatsAppCta } from "@/components/cta";
import { useI18n } from "@/lib/i18n";
import { STOCK } from "@/lib/stock";

/**
 * Replica of Cleaningflow booking-section — full-bleed bg image with
 * dark gradient overlay, centered single H2 + CTA button.
 */
export function BookingBanner() {
  const { pick } = useI18n();
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <SafeImage src={STOCK.cta.primary} alt="" className="absolute inset-0 w-full h-full" />
        <div className="absolute inset-0 bg-burgundy-900/85" />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 30%, rgba(204,177,112,0.5) 0, transparent 45%)",
          }}
        />
      </div>

      <Container className="py-24 md:py-32 lg:py-40 text-paper">
        <FadeUp className="max-w-3xl mx-auto text-center space-y-7">
          <p className="font-bebas tracking-[0.24em] text-sm text-gold-500 uppercase">
            {pick({ pl: "Bezpłatna wycena", en: "Free quote" })}
          </p>
          <h2 className="font-display font-medium leading-[1.05] tracking-tight text-balance text-[clamp(2.2rem,5vw,4rem)]">
            {pick({
              pl: "Zamów usługę cleaningową i odbierz bezpłatną wycenę na miejscu.",
              en: "Book our cleaning service and get a free on-site quote.",
            })}
          </h2>
          <p className="text-paper/80 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            {pick({
              pl: "Dla lokali komercyjnych oraz sprzątania po remoncie — dojazd i wycena na miejscu są w pełni bezpłatne.",
              en: "For commercial spaces and post-renovation cleaning — on-site visit and quote are completely free.",
            })}
          </p>
          <div className="pt-3 flex justify-center">
            <WhatsAppCta
              label={pick({ pl: "Umów bezpłatną wycenę", en: "Get a free quote" })}
            />
          </div>
        </FadeUp>
      </Container>
    </section>
  );
}

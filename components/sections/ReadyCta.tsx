"use client";

import { Phone, Mail, MessageCircle } from "lucide-react";
import { Container } from "@/components/primitives";
import { FadeUp } from "@/components/motion";
import { useI18n } from "@/lib/i18n";
import { BRAND } from "@/lib/constants";
import { buildWhatsAppUrl, defaultQuoteMessage } from "@/lib/whatsapp";

/**
 * Replica of Cleaningflow CTA section — dark block, eyebrow + h2 left,
 * two contact info cards on right.
 */
export function ReadyCta() {
  const { pick, lang } = useI18n();
  return (
    <section className="bg-paper py-10 md:py-14">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] bg-burgundy-900 text-paper p-8 md:p-14 lg:p-16">
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 90% 30%, rgba(204,177,112,0.6) 0, transparent 40%)",
            }}
          />
          <FadeUp className="relative grid lg:grid-cols-[1.2fr_1fr] gap-10 items-center">
            <div className="space-y-4">
              <p className="text-paper/75 text-sm md:text-base">
                {pick({ pl: "Zacznij z nami", en: "Bring your vision to life" })}
              </p>
              <h2 className="font-display font-medium leading-[1.05] tracking-tight text-balance text-[clamp(2rem,4.6vw,3.6rem)]">
                {pick({ pl: "Gotowy zacząć swój projekt?", en: "Ready to start your project?" })}
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <a
                href={`mailto:${BRAND.email}`}
                className="group rounded-2xl border border-paper/15 hover:border-gold-500 transition p-5 space-y-2"
              >
                <p className="text-xs font-bebas tracking-[0.18em] text-gold-500 uppercase inline-flex items-center gap-2">
                  <Mail size={12} /> {pick({ pl: "Napisz e-mail", en: "Mail us" })}
                </p>
                <p className="font-display text-lg md:text-xl text-paper group-hover:text-gold-500 transition">
                  {BRAND.email}
                </p>
              </a>
              <a
                href={buildWhatsAppUrl(defaultQuoteMessage(lang))}
                target="_blank"
                rel="noopener"
                className="group rounded-2xl border border-paper/15 hover:border-gold-500 transition p-5 space-y-2"
              >
                <p className="text-xs font-bebas tracking-[0.18em] text-gold-500 uppercase inline-flex items-center gap-2">
                  <MessageCircle size={12} /> WhatsApp
                </p>
                <p className="font-display text-lg md:text-xl text-paper group-hover:text-gold-500 transition">
                  {BRAND.phone}
                </p>
              </a>
              <a
                href={`tel:${BRAND.phoneTel}`}
                className="group rounded-2xl border border-paper/15 hover:border-gold-500 transition p-5 space-y-2 sm:col-span-2"
              >
                <p className="text-xs font-bebas tracking-[0.18em] text-gold-500 uppercase inline-flex items-center gap-2">
                  <Phone size={12} /> {pick({ pl: "Zadzwoń", en: "Call us" })}
                </p>
                <p className="font-display text-lg md:text-xl text-paper group-hover:text-gold-500 transition">
                  {BRAND.phone}
                </p>
              </a>
            </div>
          </FadeUp>
        </div>
      </Container>
    </section>
  );
}

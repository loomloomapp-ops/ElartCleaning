"use client";

import Image from "next/image";
import { Check, ArrowLeft, MessageCircle, Phone } from "lucide-react";
import { Container } from "@/components/primitives";
import { PrimaryButton, SecondaryButton } from "@/components/cta";
import { BRAND } from "@/lib/constants";
import { useI18n } from "@/lib/i18n";
import { buildWhatsAppUrl, defaultQuoteMessage } from "@/lib/whatsapp";

export function ThankYouContent() {
  const { lang } = useI18n();
  const pl = lang === "pl";

  return (
    <main className="grid min-h-[100dvh] place-items-center bg-cream px-4 py-16">
      <Container className="flex max-w-xl flex-col items-center gap-7 text-center">
        <a href="/" aria-label={BRAND.name}>
          <Image
            src="/logo-elart.png"
            alt={BRAND.name}
            width={64}
            height={64}
            className="h-14 w-14 object-contain"
          />
        </a>

        {/* checkmark */}
        <span className="relative grid h-24 w-24 place-items-center">
          <span className="absolute inset-0 animate-ping rounded-full bg-burgundy-700/15 [animation-duration:2.4s]" />
          <span className="relative grid h-24 w-24 place-items-center rounded-full bg-burgundy-800 text-paper shadow-soft">
            <Check size={44} strokeWidth={2.6} />
          </span>
        </span>

        <div className="space-y-3">
          <h1 className="font-display text-[clamp(2rem,5vw,3.25rem)] font-bold uppercase leading-[0.95] tracking-[-0.02em] text-ink text-balance">
            {pl ? "Dziękujemy za zgłoszenie!" : "Thank you for your request!"}
          </h1>
          <p className="text-b1 leading-relaxed text-ink/64">
            {pl
              ? "Twoja wiadomość już do nas dotarła. Skontaktujemy się z Tobą jak najszybciej — zwykle w ciągu kilku godzin w godzinach pracy."
              : "Your message has reached us. We'll get back to you as soon as possible — usually within a few hours during working hours."}
          </p>
        </div>

        <div className="flex flex-col items-center gap-3 pt-1 sm:flex-row">
          <PrimaryButton href="/" icon={<ArrowLeft size={16} strokeWidth={2.4} />}>
            {pl ? "Wróć na stronę główną" : "Back to homepage"}
          </PrimaryButton>
          <SecondaryButton
            href={buildWhatsAppUrl(defaultQuoteMessage(lang))}
            target="_blank"
            rel="noopener"
            icon={<MessageCircle size={16} strokeWidth={2.4} />}
          >
            {pl ? "Napisz na WhatsApp" : "Message on WhatsApp"}
          </SecondaryButton>
        </div>

        <a
          href={`tel:${BRAND.phoneTel}`}
          className="inline-flex items-center gap-2 text-b3 font-bold uppercase tracking-wide text-ink/60 transition hover:text-burgundy-700"
        >
          <Phone size={16} strokeWidth={2.4} />
          {BRAND.phone}
        </a>
      </Container>
    </main>
  );
}

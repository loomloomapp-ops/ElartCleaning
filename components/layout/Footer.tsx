"use client";

import Image from "next/image";
import { Phone, Mail, Instagram, MapPin, MessageCircle, ArrowRight } from "lucide-react";
import { Container, Eyebrow, GoldDivider } from "@/components/primitives";
import { BRAND, NAV_ANCHORS } from "@/lib/constants";
import { FOOTER, SERVICES } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { buildWhatsAppUrl, defaultQuoteMessage } from "@/lib/whatsapp";
import { isPlaceholder } from "@/lib/utils";

/**
 * Replica of Cleaningflow footer.
 * "Stay Fresh with Us" newsletter strip → repurposed to WhatsApp/email contact strip.
 * Then 4-col footer: Logo + tagline | Quick Links | Our Service | Contact Us.
 */
export function Footer() {
  const { pick, lang } = useI18n();
  return (
    <footer className="bg-burgundy-900 text-paper">
      {/* Newsletter-replacement strip: "Stay Fresh with Us" */}
      <div className="bg-burgundy-800/70 border-y border-gold-500/15">
        <Container className="py-12 md:py-16 grid md:grid-cols-[1.4fr_1fr] gap-8 items-center">
          <div className="space-y-3">
            <Eyebrow tone="white">
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
                {pick({ pl: "Bądźmy w kontakcie", en: "Stay fresh with us" })}
              </span>
            </Eyebrow>
            <h3 className="font-display text-2xl md:text-3xl lg:text-4xl leading-tight tracking-tight max-w-2xl">
              {pick(FOOTER.cta)}
            </h3>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 md:justify-end">
            <a
              href={buildWhatsAppUrl(defaultQuoteMessage(lang))}
              target="_blank"
              rel="noopener"
              className="group inline-flex items-center justify-between gap-3 rounded-full bg-gold-500 text-burgundy-900 px-6 py-3.5 font-medium hover:bg-gold-400 transition"
            >
              <span className="inline-flex items-center gap-2">
                <MessageCircle size={16} /> WhatsApp
              </span>
              <ArrowRight size={16} className="transition group-hover:translate-x-0.5" />
            </a>
            <a
              href={`mailto:${BRAND.email}`}
              className="inline-flex items-center justify-between gap-3 rounded-full border border-paper/30 text-paper px-6 py-3.5 hover:border-gold-500 hover:text-gold-500 transition"
            >
              <span className="inline-flex items-center gap-2">
                <Mail size={16} /> E-mail
              </span>
              <ArrowRight size={16} />
            </a>
          </div>
        </Container>
      </div>

      {/* 4-column footer */}
      <div className="border-b border-paper/10">
        <Container className="py-16 md:py-20 grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <Image
                src="/logo-elart.png"
                alt={BRAND.name}
                width={48}
                height={48}
                className="h-12 w-12 object-contain"
              />
              <div className="flex flex-col leading-none">
                <span className="font-display text-xl">{BRAND.name}</span>
                <span className="font-bebas tracking-[0.22em] text-[10px] text-gold-500">
                  POZNAŃ
                </span>
              </div>
            </div>
            <p className="text-paper/70 text-sm leading-relaxed max-w-md">
              {pick(FOOTER.description)}
            </p>
            <GoldDivider />
            <a
              href={BRAND.instagram}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 text-sm text-paper/80 hover:text-gold-500 transition"
            >
              <Instagram size={14} /> @elart_cleaning
            </a>
          </div>

          <div className="space-y-4">
            <Eyebrow tone="white">
              {pick({ pl: "Szybkie linki", en: "Quick links" })}
            </Eyebrow>
            <ul className="space-y-2.5 text-sm text-paper/75">
              {NAV_ANCHORS.map((a) => (
                <li key={a.id}>
                  <a
                    href={`#${a.id}`}
                    className="inline-flex items-center gap-1.5 hover:text-gold-500 transition"
                  >
                    <span className="h-1 w-1 rounded-full bg-gold-500" />
                    {lang === "pl" ? a.pl : a.en}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <Eyebrow tone="white">
              {pick({ pl: "Nasze usługi", en: "Our services" })}
            </Eyebrow>
            <ul className="space-y-2.5 text-sm text-paper/75">
              {SERVICES.slice(0, 7).map((s) => (
                <li key={s.slug}>
                  <a
                    href="#uslugi"
                    className="inline-flex items-center gap-1.5 hover:text-gold-500 transition"
                  >
                    <span className="h-1 w-1 rounded-full bg-gold-500" />
                    {pick(s.title)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <Eyebrow tone="white">{pick(FOOTER.contactHead)}</Eyebrow>
            <ul className="space-y-3 text-sm text-paper/75">
              <li>
                <a
                  href={`tel:${BRAND.phoneTel}`}
                  className="inline-flex items-start gap-3 hover:text-gold-500"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-burgundy-700 text-gold-500">
                    <Phone size={12} />
                  </span>
                  <span>
                    <span className="block text-[10px] uppercase tracking-[0.18em] text-paper/55">
                      {pick({ pl: "Telefon", en: "Phone" })}
                    </span>
                    {BRAND.phone}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="inline-flex items-start gap-3 hover:text-gold-500 break-all"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-burgundy-700 text-gold-500">
                    <Mail size={12} />
                  </span>
                  <span>
                    <span className="block text-[10px] uppercase tracking-[0.18em] text-paper/55">
                      E-mail
                    </span>
                    {BRAND.email}
                  </span>
                </a>
              </li>
              <li className="inline-flex items-start gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-burgundy-700 text-gold-500">
                  <MapPin size={12} />
                </span>
                <span>
                  <span className="block text-[10px] uppercase tracking-[0.18em] text-paper/55">
                    {pick({ pl: "Lokalizacja", en: "Location" })}
                  </span>
                  Poznań, Polska
                </span>
              </li>
            </ul>
            <ul className="pt-3 text-xs text-paper/55 space-y-1.5">
              {FOOTER.docs.map((d, i) => (
                <li key={i}>
                  <a href="#" className="hover:text-gold-500 transition">
                    {pick(d)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </div>

      {/* Map */}
      <div className="border-b border-paper/10">
        <Container className="py-10">
          <div className="aspect-[16/6] w-full overflow-hidden rounded-3xl border border-paper/10 bg-burgundy-800/40">
            {isPlaceholder(BRAND.mapsEmbed) ? (
              <div className="flex h-full w-full items-center justify-center text-paper/50 text-sm">
                {BRAND.mapsEmbed} — Google Maps embed
              </div>
            ) : (
              <iframe
                title="Elart Cleaning Poznań — Google Maps"
                src={BRAND.mapsEmbed}
                loading="lazy"
                className="h-full w-full"
              />
            )}
          </div>
        </Container>
      </div>

      <Container className="py-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between text-xs text-paper/55">
        <p>
          © {new Date().getFullYear()} {BRAND.name}. {pick(FOOTER.rights)}.
        </p>
        <p>Made in Poznań · designed for conversion</p>
      </Container>
    </footer>
  );
}

"use client";

import { Phone, Mail, MessageCircle, ArrowUpRight } from "lucide-react";
import { Container, SectionHeading } from "@/components/primitives";
import { FadeUp } from "@/components/motion";
import { useI18n } from "@/lib/i18n";
import { BRAND } from "@/lib/constants";
import { buildWhatsAppUrl, defaultQuoteMessage } from "@/lib/whatsapp";

function ContactRow({
  href,
  external,
  icon,
  label,
  value,
}: {
  href: string;
  external?: boolean;
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener" } : {})}
      className="group flex items-center justify-between gap-6 py-5 md:py-6"
    >
      <div className="flex items-center gap-5">
        <span className="grid h-12 w-12 place-items-center rounded-full border border-paper/15 text-gold-500 transition group-hover:bg-gold-500 group-hover:text-burgundy-900 group-hover:border-gold-500">
          {icon}
        </span>
        <div className="space-y-1">
          <span className="block font-bebas tracking-[0.18em] text-[11px] text-gold-500/85 uppercase">
            {label}
          </span>
          <span className="block font-display text-lg md:text-xl text-paper group-hover:text-gold-500 transition">
            {value}
          </span>
        </div>
      </div>
      <ArrowUpRight size={18} className="text-paper/40 transition group-hover:text-gold-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </a>
  );
}

/**
 * Replica of Cleaningflow CTA section — dark block, eyebrow + h2 left,
 * two contact info cards on right.
 */
export function ReadyCta() {
  const { pick, lang } = useI18n();
  return (
    <section className="bg-paper py-16 md:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] bg-burgundy-900 text-paper p-12 md:p-20 lg:p-28">
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 90% 30%, rgba(204,177,112,0.6) 0, transparent 40%)",
            }}
          />
          <FadeUp className="relative space-y-12 md:space-y-16">
            <SectionHeading
              tone="white"
              align="center"
              eyebrow={pick({ pl: "Zacznij z nami", en: "Bring your vision to life" })}
              title={pick({ pl: "Gotowy zacząć swój projekt?", en: "Ready to start your project?" })}
              subtitle={pick({
                pl: "Wybierz najwygodniejszy kanał — odpowiadamy w ciągu kilku minut.",
                en: "Pick the channel that suits you — we reply within minutes.",
              })}
            />

            <div className="mx-auto max-w-2xl divide-y divide-paper/10 border-y border-paper/10">
              <ContactRow
                href={`mailto:${BRAND.email}`}
                icon={<Mail size={16} />}
                label={pick({ pl: "Napisz e-mail", en: "Mail us" })}
                value={BRAND.email}
              />
              <ContactRow
                href={buildWhatsAppUrl(defaultQuoteMessage(lang))}
                external
                icon={<MessageCircle size={16} />}
                label="WhatsApp"
                value={BRAND.phone}
              />
              <ContactRow
                href={`tel:${BRAND.phoneTel}`}
                icon={<Phone size={16} />}
                label={pick({ pl: "Zadzwoń", en: "Call us" })}
                value={BRAND.phone}
              />
            </div>
          </FadeUp>
        </div>
      </Container>
    </section>
  );
}

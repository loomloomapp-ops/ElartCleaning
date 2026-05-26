"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { Container } from "@/components/primitives";
import { SafeImage } from "@/components/primitives/SafeImage";
import { FadeUp } from "@/components/motion";
import { FAQ } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { WhatsAppCta } from "@/components/cta";
import { STOCK } from "@/lib/stock";

/**
 * Replica of Cleaningflow FAQ — dark left half with absolute-left-bg,
 * 2-column block: heading + paragraph + accordion on left, 3 images on right.
 */
export function Faq() {
  const { pick } = useI18n();
  return (
    <section id="faq" className="relative bg-burgundy-900 text-paper py-24 md:py-32 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 0% 100%, rgba(204,177,112,0.5) 0, transparent 40%)",
        }}
      />
      <Container className="relative">
        {/* Top heading band */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16">
          <div className="space-y-3">
            <p className="font-bebas tracking-[0.24em] text-xs md:text-sm text-gold-500 uppercase inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-500" /> FAQ
            </p>
            <h3 className="font-display font-medium leading-[1.05] tracking-tight text-balance text-[clamp(1.8rem,4vw,3rem)] max-w-md">
              {pick({
                pl: "Pytania o nasze usługi — odpowiedzi tutaj",
                en: "Your service-related questions, answered here",
              })}
            </h3>
          </div>
          <p className="text-paper/75 leading-relaxed max-w-md md:pt-2">
            {pick({
              pl: "Najczęstsze pytania o sprzątanie, pranie tapicerki, faktury i abonamenty. Nie znalazłeś odpowiedzi? Napisz na WhatsApp.",
              en: "Common questions about cleaning, upholstery, invoices and subscriptions. Can't find an answer? Message us on WhatsApp.",
            })}
          </p>
        </div>

        {/* 2-col body */}
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16 items-start">
          {/* Accordion */}
          <FadeUp>
            <Accordion.Root type="single" collapsible className="space-y-3">
              {FAQ.map((item, i) => (
                <Accordion.Item
                  key={i}
                  value={`q-${i}`}
                  className="rounded-2xl border border-paper/12 bg-burgundy-800/40 backdrop-blur overflow-hidden data-[state=open]:border-gold-500/40 data-[state=open]:bg-burgundy-800/70"
                >
                  <Accordion.Header>
                    <Accordion.Trigger className="group flex w-full items-center justify-between gap-6 text-left p-5 md:p-6">
                      <span className="font-display text-base md:text-lg text-paper leading-snug">
                        {i + 1}. {pick(item.q)}
                      </span>
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-paper/20 text-paper transition group-data-[state=open]:rotate-45 group-data-[state=open]:bg-gold-500 group-data-[state=open]:text-burgundy-900 group-data-[state=open]:border-gold-500">
                        <Plus size={16} />
                      </span>
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="overflow-hidden text-paper/75 data-[state=open]:animate-fadeUp">
                    <p className="px-5 md:px-6 pb-5 md:pb-6 text-sm md:text-base leading-relaxed">
                      {pick(item.a)}
                    </p>
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>

            <div className="mt-8">
              <WhatsAppCta size="md" label="WhatsApp" />
            </div>
          </FadeUp>

          {/* 3 stacked rounded images */}
          <FadeUp className="hidden lg:block space-y-5">
            {STOCK.faq.map((src, i) => (
              <div
                key={i}
                className={`relative overflow-hidden rounded-[1.5rem] border border-paper/10 ${
                  i === 1 ? "translate-x-8" : ""
                }`}
                style={{ aspectRatio: "16/10" }}
              >
                <SafeImage src={src} alt="" className="w-full h-full" />
              </div>
            ))}
          </FadeUp>
        </div>
      </Container>
    </section>
  );
}

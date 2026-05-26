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
    <section id="faq" className="relative bg-burgundy-900 text-paper py-28 md:py-40 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 0% 100%, rgba(204,177,112,0.5) 0, transparent 40%)",
        }}
      />
      <Container className="relative">
        {/* Editorial intro band */}
        <FadeUp>
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-16 items-end mb-14 md:mb-20">
            <div className="space-y-5">
              <span className="inline-flex items-center gap-2.5 font-bebas tracking-[0.24em] text-xs md:text-sm uppercase text-gold-500">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-500" /> FAQ
              </span>
              <h3 className="font-display font-medium leading-[1.02] tracking-tight text-balance text-[clamp(2rem,4.6vw,3.6rem)] max-w-xl">
                {pick({
                  pl: "Pytania o nasze usługi — odpowiedzi tutaj",
                  en: "Your service-related questions, answered here",
                })}
              </h3>
            </div>
            <p className="text-paper/75 leading-relaxed text-base md:text-lg max-w-md lg:pb-2">
              {pick({
                pl: "Najczęstsze pytania o sprzątanie, pranie tapicerki, faktury i abonamenty. Nie znalazłeś odpowiedzi? Napisz na WhatsApp.",
                en: "Common questions about cleaning, upholstery, invoices and subscriptions. Can't find an answer? Message us on WhatsApp.",
              })}
            </p>
          </div>
        </FadeUp>

        {/* 2-col body */}
        <div className="grid lg:grid-cols-[1.45fr_1fr] gap-12 lg:gap-20 items-start">
          {/* Accordion */}
          <FadeUp>
            <Accordion.Root type="single" collapsible className="divide-y divide-paper/10 border-y border-paper/10">
              {FAQ.map((item, i) => (
                <Accordion.Item key={i} value={`q-${i}`} className="group/item">
                  <Accordion.Header>
                    <Accordion.Trigger className="group flex w-full items-center justify-between gap-6 text-left py-6 md:py-7">
                      <span className="flex items-baseline gap-5">
                        <span className="font-bebas tracking-[0.18em] text-xs text-gold-500 tabular-nums shrink-0">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="font-display text-lg md:text-xl text-paper leading-snug">
                          {pick(item.q)}
                        </span>
                      </span>
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-paper/20 text-paper transition group-data-[state=open]:rotate-45 group-data-[state=open]:bg-gold-500 group-data-[state=open]:text-burgundy-900 group-data-[state=open]:border-gold-500">
                        <Plus size={16} />
                      </span>
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="overflow-hidden text-paper/75 data-[state=open]:animate-fadeUp">
                    <p className="pb-6 pl-12 pr-2 text-sm md:text-base leading-relaxed max-w-2xl">
                      {pick(item.a)}
                    </p>
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>

            <div className="mt-10">
              <WhatsAppCta size="md" label="WhatsApp" />
            </div>
          </FadeUp>

          {/* 3 stacked rounded images */}
          <FadeUp className="hidden lg:block space-y-6">
            {STOCK.faq.map((src, i) => (
              <div
                key={i}
                className={`relative overflow-hidden rounded-[1.5rem] border border-paper/10 ${
                  i === 1 ? "translate-x-10" : ""
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

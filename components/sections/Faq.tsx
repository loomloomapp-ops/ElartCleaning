"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { Container, SectionHeading } from "@/components/primitives";
import { FadeUp } from "@/components/motion";
import { FAQ } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { WhatsAppCta } from "@/components/cta";

/**
 * Replica of Cleaningflow FAQ — dark left half with absolute-left-bg,
 * 2-column block: heading + paragraph + accordion on left, 3 images on right.
 */
export function Faq() {
  const { pick } = useI18n();
  return (
    <section id="faq" className="relative bg-burgundy-900 text-paper py-28 md:py-40 lg:py-48 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 0% 100%, rgba(204,177,112,0.5) 0, transparent 40%)",
        }}
      />
      <Container className="relative space-y-16 md:space-y-24">
        <FadeUp>
          <SectionHeading
            tone="white"
            align="center"
            eyebrow="FAQ"
            title={pick({
              pl: "Pytania o nasze usługi — odpowiedzi tutaj",
              en: "Your service-related questions, answered here",
            })}
            subtitle={pick({
              pl: "Najczęstsze pytania o sprzątanie, pranie tapicerki, faktury i abonamenty.",
              en: "Common questions about cleaning, upholstery, invoices and subscriptions.",
            })}
          />
        </FadeUp>

        <FadeUp className="mx-auto max-w-3xl">
          <Accordion.Root type="single" collapsible className="divide-y divide-paper/10 border-y border-paper/10">
            {FAQ.map((item, i) => (
              <Accordion.Item key={i} value={`q-${i}`}>
                <Accordion.Header>
                  <Accordion.Trigger className="group flex w-full items-center justify-between gap-6 text-left py-7 md:py-8">
                    <span className="flex items-baseline gap-5">
                      <span className="text-xs font-semibold text-gold-500 tabular-nums shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-lg md:text-xl text-paper leading-snug tracking-[-0.01em]">
                        {pick(item.q)}
                      </span>
                    </span>
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-paper/8 text-paper transition group-data-[state=open]:rotate-45 group-data-[state=open]:bg-gold-500 group-data-[state=open]:text-burgundy-900">
                      <Plus size={16} />
                    </span>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden text-paper/70 data-[state=open]:animate-fadeUp">
                  <p className="pb-7 pl-10 pr-2 text-base leading-relaxed max-w-2xl">
                    {pick(item.a)}
                  </p>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>

          <div className="mt-12 flex justify-center">
            <WhatsAppCta size="md" label="WhatsApp" />
          </div>
        </FadeUp>
      </Container>
    </section>
  );
}

"use client";

import { Container, SectionHeading } from "@/components/primitives";
import { StaggerGroup, StaggerItem } from "@/components/motion";
import { HOW_STEPS, HEADINGS } from "@/lib/content";
import { useI18n } from "@/lib/i18n";

export function HowItWorks() {
  const { pick } = useI18n();
  return (
    <section id="jak-pracujemy" className="bg-paper py-24 md:py-32">
      <Container className="space-y-14">
        <SectionHeading
          eyebrow={pick(HEADINGS.how)}
          title={pick(HEADINGS.how)}
          subtitle={pick(HEADINGS.howSub)}
        />

        <StaggerGroup className="relative">
          <span aria-hidden className="hidden md:block absolute left-[27px] top-2 bottom-2 w-px bg-gold-500/30" />
          <ol className="space-y-6 md:space-y-8">
            {HOW_STEPS.map((s, i) => (
              <StaggerItem key={i}>
                <li className="relative grid md:grid-cols-[56px_1fr] gap-4 md:gap-8 items-start">
                  <div className="relative z-10 grid h-14 w-14 place-items-center rounded-full border border-burgundy-700/20 bg-paper text-burgundy-700 font-bebas tracking-[0.15em]">
                    <span className="text-sm">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="space-y-2 pt-1 md:pt-2">
                    <h3 className="font-display text-xl md:text-2xl text-ink leading-snug">
                      {pick(s.title)}
                    </h3>
                    <p className="text-ink/65 text-sm md:text-base leading-relaxed max-w-2xl">
                      {pick(s.body)}
                    </p>
                  </div>
                </li>
              </StaggerItem>
            ))}
          </ol>
        </StaggerGroup>
      </Container>
    </section>
  );
}

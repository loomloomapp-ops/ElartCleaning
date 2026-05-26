"use client";

import { Container, SectionHeading } from "@/components/primitives";
import { SafeImage } from "@/components/primitives/SafeImage";
import { StaggerGroup, StaggerItem, FadeUp } from "@/components/motion";
import { CATEGORIES } from "@/lib/content";
import { STOCK } from "@/lib/stock";
import { useI18n } from "@/lib/i18n";

/**
 * Editorial intro band + categories grid.
 * Tall, narrow image cards with overlay + label centered. Numbered index per tile.
 */
export function CategoryStrip() {
  const { pick } = useI18n();
  return (
    <section className="bg-paper py-20 md:py-28 lg:py-36">
      <Container className="space-y-14 md:space-y-20">
        <FadeUp>
          <SectionHeading
            eyebrow={pick({ pl: "Kategorie", en: "Categories" })}
            title={pick({
              pl: "Każda powierzchnia ma swojego specjalistę.",
              en: "Every surface has its specialist.",
            })}
            subtitle={pick({
              pl: "Mieszkania, biura, samochody, dywany, lokale po remoncie — pełen zakres, jedna ekipa, jeden numer.",
              en: "Apartments, offices, cars, rugs, post-renovation venues — full scope, one crew, one number.",
            })}
          />
        </FadeUp>

        <StaggerGroup className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 md:gap-4">
          {CATEGORIES.map((label, i) => (
            <StaggerItem key={i}>
              <div
                className="group relative overflow-hidden rounded-2xl border border-ink/8"
                style={{ aspectRatio: "3/4.5" }}
              >
                <SafeImage
                  src={STOCK.categories[i]}
                  alt={pick(label)}
                  className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-burgundy-900/30 via-burgundy-900/45 to-burgundy-900/80 transition group-hover:from-burgundy-900/15 group-hover:via-burgundy-900/30 group-hover:to-burgundy-900/70" />
                <span className="absolute top-3 left-3 font-bebas tracking-[0.18em] text-[10px] text-gold-500/90">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="absolute inset-x-3 bottom-3 text-paper">
                  <span className="font-display text-sm md:text-base leading-snug block">
                    {pick(label)}
                  </span>
                  <span
                    aria-hidden
                    className="mt-2 block h-px w-8 bg-gold-500/80 transition-all duration-500 group-hover:w-14"
                  />
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}

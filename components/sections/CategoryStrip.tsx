"use client";

import { Container } from "@/components/primitives";
import { SafeImage } from "@/components/primitives/SafeImage";
import { StaggerGroup, StaggerItem } from "@/components/motion";
import { CATEGORIES } from "@/lib/content";
import { STOCK } from "@/lib/stock";
import { useI18n } from "@/lib/i18n";

/**
 * Replica of Cleaningflow's category-grid section.
 * Tall, narrow image cards with black overlay + label centered.
 */
export function CategoryStrip() {
  const { pick } = useI18n();
  return (
    <section className="bg-paper py-10 md:py-14">
      <Container>
        <StaggerGroup className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 md:gap-4">
          {CATEGORIES.map((label, i) => (
            <StaggerItem key={i}>
              <div className="group relative overflow-hidden rounded-2xl border border-ink/8" style={{ aspectRatio: "3/4.5" }}>
                <SafeImage
                  src={STOCK.categories[i]}
                  alt={pick(label)}
                  className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-burgundy-900/55 transition group-hover:bg-burgundy-900/35" />
                <div className="absolute inset-0 grid place-items-center text-paper text-center px-3">
                  <span className="font-bebas tracking-[0.2em] text-sm md:text-base uppercase">
                    {pick(label)}
                  </span>
                </div>
                <span aria-hidden className="absolute left-1/2 bottom-3 h-0.5 w-8 -translate-x-1/2 bg-gold-500/80" />
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}

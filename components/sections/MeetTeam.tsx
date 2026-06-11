"use client";

import { Container, Chip } from "@/components/primitives";
import { ParallaxImage } from "@/components/primitives/ParallaxImage";
import { SecondaryButton } from "@/components/cta";
import { STOCK } from "@/lib/stock";
import { ABOUT } from "@/lib/content";
import { useI18n } from "@/lib/i18n";

export function MeetTeam() {
  const { pick, lang } = useI18n();

  return (
    <section className="bg-paper pt-section-xs">
      <Container>
        <div className="relative rounded-3xl overflow-hidden min-h-[560px] lg:min-h-[720px] flex items-end p-6 md:p-8 lg:p-10 bg-cream-deep">
          <ParallaxImage
            src={STOCK.about.top}
            alt={pick(ABOUT.title)}
            sizes="100vw"
            className="absolute inset-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent" />

          <div className="relative max-w-col-5 rounded-3xl bg-accent text-ink p-7 lg:p-12 flex flex-col gap-5">
            <Chip tone="surface">
              {lang === "pl" ? "Poznaj zespół" : "Meet the team"}
            </Chip>
            <h2 className="font-display font-bold uppercase leading-[0.95] tracking-[-0.02em] text-[clamp(1.75rem,3.5vw,3rem)]">
              {lang === "pl"
                ? "Stała ekipa, której naprawdę zależy."
                : "A regular crew who genuinely cares."}
            </h2>
            <p className="text-b2 text-ink/72">
              {lang === "pl"
                ? "5+ lat doświadczenia, minimum dwie osoby na zleceniu, własna chemia i sprzęt. Sprzątamy spokojnie, dokładnie i dyskretnie."
                : "5+ years of experience, minimum two-person team on every job, own chemistry and equipment. We work calmly, thoroughly, discreetly."}
            </p>
            <div>
              <SecondaryButton href="#opinie">
                {lang === "pl" ? "Zobacz opinie" : "See reviews"}
              </SecondaryButton>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

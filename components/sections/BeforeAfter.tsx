"use client";

import * as React from "react";
import { Container, SectionHeading, Pill, Ribbon } from "@/components/primitives";
import { SafeImage } from "@/components/primitives/SafeImage";
import { FadeUp } from "@/components/motion";
import { SecondaryButton, WhatsAppCta } from "@/components/cta";
import { CASES_CATEGORIES, HEADINGS, UI } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { STOCK } from "@/lib/stock";

type CategoryId = keyof typeof STOCK.caseBefore;

function Slider({ category }: { category: CategoryId }) {
  const [pos, setPos] = React.useState(50);
  const { pick } = useI18n();

  const before = STOCK.caseBefore[category];
  const after = STOCK.caseAfter[category];

  return (
    <div
      className="relative w-full overflow-hidden rounded-3xl border border-ink/8 select-none"
      style={{ aspectRatio: "4/3" }}
    >
      <SafeImage src={after} alt="After" ratio="4/3" className="absolute inset-0 w-full h-full rounded-3xl" />

      <div
        className="absolute inset-y-0 left-0 overflow-hidden"
        style={{ width: `${pos}%` }}
        aria-hidden
      >
        <SafeImage
          src={before}
          alt="Before"
          ratio="4/3"
          tone="cream"
          className="absolute inset-0 w-[100vw] max-w-none h-full rounded-3xl"
        />
        <div className="absolute inset-0 bg-burgundy-900/35 mix-blend-multiply" />
      </div>

      <div className="absolute top-4 left-4 z-10">
        <Ribbon variant="burgundy">{pick(UI.before)}</Ribbon>
      </div>
      <div className="absolute top-4 right-4 z-10">
        <Ribbon variant="gold">{pick(UI.after)}</Ribbon>
      </div>

      <div
        className="absolute inset-y-0 w-px bg-gold-500 z-10"
        style={{ left: `${pos}%`, transform: "translateX(-0.5px)" }}
        aria-hidden
      >
        <span className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-0 h-11 w-11 rounded-full border-2 border-gold-500 bg-burgundy-800 grid place-items-center text-paper text-sm font-bebas tracking-wider shadow-card">
          ↔
        </span>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Before / After slider"
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0 z-20"
      />
    </div>
  );
}

export function BeforeAfter() {
  const { pick } = useI18n();
  const [active, setActive] = React.useState<CategoryId>(CASES_CATEGORIES[0].id as CategoryId);

  return (
    <section id="efekty" className="bg-cream py-24 md:py-32">
      <Container className="space-y-12">
        <SectionHeading
          eyebrow={pick(HEADINGS.cases)}
          title={pick(HEADINGS.cases)}
          subtitle={pick(HEADINGS.casesSub)}
        />
        <div className="flex justify-center">
          <WhatsAppCta size="md" label={pick(UI.iWantThis)} />
        </div>

        <FadeUp className="flex flex-wrap gap-2">
          {CASES_CATEGORIES.map((c) => (
            <button key={c.id} onClick={() => setActive(c.id as CategoryId)} aria-pressed={active === c.id}>
              <Pill active={active === c.id}>{pick(c.label)}</Pill>
            </button>
          ))}
        </FadeUp>

        <FadeUp className="grid lg:grid-cols-[1.55fr_1fr] gap-4 md:gap-6">
          <Slider category={active} />

          <div className="grid grid-cols-2 gap-4 md:gap-6">
            <div className="relative overflow-hidden rounded-3xl border border-ink/8" style={{ aspectRatio: "1/1.1" }}>
              <SafeImage
                src={STOCK.caseBefore[active]}
                alt="Before"
                ratio="1/1.1"
                className="absolute inset-0 w-full h-full"
              />
              <div className="absolute inset-0 bg-burgundy-900/35 mix-blend-multiply" />
              <div className="absolute top-3 left-3">
                <Ribbon variant="gold">{pick(UI.before)}</Ribbon>
              </div>
              <div className="absolute bottom-3 left-3 right-3 text-paper">
                <p className="font-bebas tracking-[0.18em] text-paper/70 text-[10px]">REAL CASE</p>
                <p className="font-display text-lg leading-tight mt-1">Poznań · Grunwald · 62 m²</p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-3xl border border-ink/8" style={{ aspectRatio: "1/1.1" }}>
              <SafeImage
                src={STOCK.caseAfter[active]}
                alt="After"
                ratio="1/1.1"
                className="absolute inset-0 w-full h-full"
              />
              <div className="absolute top-3 left-3">
                <Ribbon variant="burgundy">{pick(UI.after)}</Ribbon>
              </div>
              <div className="absolute bottom-3 left-3 right-3 text-ink">
                <p className="font-bebas tracking-[0.18em] text-ink/55 text-[10px]">REAL CASE</p>
                <p className="font-display text-lg leading-tight mt-1 bg-paper/85 inline-block px-2 py-0.5 rounded">
                  Efekt po usłudze
                </p>
              </div>
            </div>
          </div>
        </FadeUp>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
          <p className="text-sm text-ink/60 max-w-xl">
            {pick({
              pl: "Pokazujemy realne efekty z Poznania — bez retuszu i bez filtrów. Więcej znajdziesz na Instagramie.",
              en: "Real outcomes from Poznań — no retouching, no filters. More on Instagram.",
            })}
          </p>
          <SecondaryButton href="https://www.instagram.com/elart_cleaning" target="_blank" rel="noopener">
            {pick(UI.allCases)}
          </SecondaryButton>
        </div>
      </Container>
    </section>
  );
}

"use client";

import { Target, Eye, Sparkles, ArrowRight } from "lucide-react";
import { Container, Eyebrow, GoldDivider } from "@/components/primitives";
import { ParallaxImage } from "@/components/primitives/ParallaxImage";
import { FadeUp } from "@/components/motion";
import { SecondaryButton } from "@/components/cta";
import { ABOUT, HEADINGS, UI } from "@/lib/content";
import { STOCK } from "@/lib/stock";
import { useI18n } from "@/lib/i18n";
import { usePopup } from "@/components/widgets/PopupProvider";

/**
 * Replica of Cleaningflow About — 2-column layout:
 * Left: 2 stacked images (top is a horizontal banner with an inline circular counter card,
 * bottom is a tall image with sparkle icon and decorative circle).
 * Right: eyebrow "About Us" + h2 + paragraph + Mission/Vision (icon + h3 + p) + button.
 */
export function About() {
  const { pick } = useI18n();
  const { openPopup } = usePopup();

  return (
    <section className="bg-paper py-24 md:py-32 lg:py-36">
      <Container className="grid lg:grid-cols-[1fr_1.05fr] gap-12 lg:gap-20">
        {/* LEFT: stacked image composition */}
        <FadeUp className="relative">
          {/* Top image with counter chip overlaid */}
          <div className="relative overflow-hidden rounded-[1.5rem] mb-4 md:mb-5">
            <ParallaxImage
              src={STOCK.about.top}
              alt="Elart Cleaning crew at work"
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="aspect-[16/9] rounded-[1.5rem]"
            />
            <div className="absolute right-4 bottom-4 md:right-6 md:bottom-6 inline-flex items-center gap-4 rounded-2xl bg-paper text-ink shadow-card border border-ink/5 px-5 py-4">
              <div className="font-display text-4xl md:text-5xl leading-none text-burgundy-700 tabular-nums">
                {ABOUT.yearsValue}
              </div>
              <div className="text-xs md:text-sm font-medium leading-tight max-w-[100px]">
                {pick(ABOUT.yearsLabel)}
              </div>
            </div>
          </div>

          {/* Bottom tall image with sparkle accent */}
          <div className="relative overflow-hidden rounded-[1.5rem]">
            <ParallaxImage
              src={STOCK.about.bottom}
              alt="Detail of cleaning work"
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="aspect-[4/3] rounded-[1.5rem]"
            />
            {/* Sparkle accent */}
            <span
              aria-hidden
              className="absolute -top-5 -right-5 grid h-16 w-16 place-items-center rounded-full bg-gold-500 text-burgundy-900 shadow-card animate-pulseSoft"
            >
              <Sparkles size={24} />
            </span>
            {/* Decorative ring */}
            <span
              aria-hidden
              className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full border border-gold-500/50 opacity-70"
            />
          </div>
        </FadeUp>

        {/* RIGHT: text + mission/vision */}
        <FadeUp className="space-y-6 lg:pt-10">
          <Eyebrow>
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
              {pick(HEADINGS.about)}
            </span>
          </Eyebrow>
          <h2 className="font-display font-medium leading-[1.05] tracking-tight text-balance text-ink text-[clamp(2rem,4.6vw,3.6rem)]">
            {pick(ABOUT.title)}
          </h2>
          <p className="text-ink/65 text-base md:text-lg leading-relaxed max-w-xl">
            {pick(ABOUT.body)}
          </p>

          <GoldDivider />

          {/* Mission */}
          <div className="grid grid-cols-[auto_1fr] gap-4 items-start">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-burgundy-700 text-gold-500 -rotate-12">
              <Target size={20} />
            </span>
            <div className="space-y-1.5 pt-1">
              <h3 className="font-display text-xl text-ink">{pick(ABOUT.mission.title)}</h3>
              <p className="text-sm text-ink/65 leading-relaxed">{pick(ABOUT.mission.body)}</p>
            </div>
          </div>

          {/* Divider */}
          <div className="ml-6 h-12 w-px bg-ink/10" aria-hidden />

          {/* Vision */}
          <div className="grid grid-cols-[auto_1fr] gap-4 items-start">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-burgundy-700 text-gold-500 -rotate-12">
              <Eye size={20} />
            </span>
            <div className="space-y-1.5 pt-1">
              <h3 className="font-display text-xl text-ink">{pick(ABOUT.vision.title)}</h3>
              <p className="text-sm text-ink/65 leading-relaxed">{pick(ABOUT.vision.body)}</p>
            </div>
          </div>

          <div className="pt-4">
            <SecondaryButton onClick={openPopup} icon={<ArrowRight size={16} />}>
              {pick({ pl: "Poznaj nas bliżej", en: "Learn more about us" })}
            </SecondaryButton>
          </div>
        </FadeUp>
      </Container>
    </section>
  );
}

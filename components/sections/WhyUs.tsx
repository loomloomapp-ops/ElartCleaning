"use client";

import { ParallaxImage } from "@/components/primitives/ParallaxImage";
import { ShieldCheck, Leaf, CalendarDays, Sparkles, Award, Wrench } from "lucide-react";
import { Container, Chip } from "@/components/primitives";
import { WHY_US, ABOUT } from "@/lib/content";
import { useI18n } from "@/lib/i18n";

const ICONS = [ShieldCheck, Leaf, CalendarDays, Sparkles, Award, Wrench];

export function WhyUs() {
  const { pick, lang } = useI18n();

  const features = [
    ...WHY_US.map((w) => ({ title: pick(w.title), body: pick(w.body) })),
    { title: pick(ABOUT.mission.title), body: pick(ABOUT.mission.body) },
    { title: pick(ABOUT.vision.title), body: pick(ABOUT.vision.body) },
  ];

  return (
    <section id="jak-pracujemy" className="bg-paper py-section-xs">
      <Container>
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-4 lg:gap-5 items-start">
          <ParallaxImage
            src="/cleaning/why-us.jpg"
            alt={pick(ABOUT.title)}
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="rounded-3xl aspect-[3/4] lg:aspect-auto lg:min-h-[720px] bg-cream-deep"
          />

          <div className="flex flex-col gap-5">
            <div className="rounded-3xl bg-cream-deep p-8 lg:p-12 flex flex-col gap-5">
              <Chip tone="surface">
                {lang === "pl" ? "Co nas wyróżnia" : "What sets us apart"}
              </Chip>
              <h2 className="font-display font-bold uppercase leading-[0.92] tracking-[-0.02em] text-ink text-[clamp(1.75rem,3.8vw,2.75rem)] max-w-col-5">
                {pick(ABOUT.title)}
              </h2>
              <p className="text-b2 text-ink/64 max-w-col-5">{pick(ABOUT.body)}</p>
            </div>

            <div className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0 lg:gap-5">
              {features.map((f, i) => {
                const Icon = ICONS[i % ICONS.length];
                return (
                  <div
                    key={i}
                    style={{ top: `calc(5.5rem + ${i * 0.75}rem)` }}
                    className="sticky sm:static rounded-2xl bg-cream-deep p-6 shadow-card ring-1 ring-ink/5 sm:shadow-none sm:ring-0 lg:p-8 flex flex-col gap-4"
                  >
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-surface text-ink">
                      <Icon size={22} strokeWidth={2} />
                    </span>
                    <h3 className="font-display font-bold text-h6 leading-tight text-ink">
                      {f.title}
                    </h3>
                    <p className="text-b3 text-ink/64 leading-relaxed">{f.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

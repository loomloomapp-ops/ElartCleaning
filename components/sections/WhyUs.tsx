"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Check } from "lucide-react";
import { Container } from "@/components/primitives";
import { SafeImage } from "@/components/primitives/SafeImage";
import { FadeUp } from "@/components/motion";
import { HEADINGS } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { STOCK } from "@/lib/stock";

const t = <T,>(pl: T, en: T) => ({ pl, en });

const ROWS = [
  {
    no: "01",
    title: t("Zaufana ekipa cleaningowa", "Trusted cleaning experts"),
    body: t(
      "Stała ekipa z własnym sprzętem i pełną chemią. Minimum 2 osoby na każdym zleceniu — szybko, dokładnie, dyskretnie.",
      "A regular crew with own equipment and full chemistry. Minimum 2 people per job — fast, thorough, discreet.",
    ),
    bullets: [
      t("Sprawdzeni i doświadczeni pracownicy", "Vetted & experienced cleaners"),
      t("Powtarzalna, kontrolowana jakość", "Consistent, monitored quality"),
      t("Firmowy uniform, profesjonalne maniery", "Branded uniform, professional manners"),
      t("Lokalna firma z Poznania", "Local company from Poznań"),
    ],
  },
  {
    no: "02",
    title: t("Bezpieczna chemia i suszenie", "Safe chemistry, drying included"),
    body: t(
      "Profesjonalne, ale bezpieczne dla domowników i zwierząt środki. Suszenie tapicerki w cenie — bez ryzyka wilgoci.",
      "Professional yet safe for residents and pets. Upholstery drying included — no moisture risk.",
    ),
    bullets: [
      t("Bezzapachowe środki dla alergików", "Allergy-safe, scent-free products"),
      t("Bezpieczne dla dzieci i zwierząt", "Pet & child friendly"),
      t("Suszenie w cenie — koniec wilgoci", "Drying included — no damp left"),
      t("Sprzęt do tapicerki, dywanów, ścian", "Tools for upholstery, rugs and walls"),
    ],
  },
  {
    no: "03",
    title: t("Elastyczne terminy i pilne zlecenia", "Flexible & convenient scheduling"),
    body: t(
      "Pracujemy cały rok, również w weekendy. Pilne realizacje, stała współpraca i wygodne terminy poranne czy wieczorne.",
      "Year-round, weekends included. Urgent jobs, recurring partnership and convenient early/late slots.",
    ),
    bullets: [
      t("Tygodniowo, dwutygodniowo, miesięcznie", "Weekly, bi-weekly or monthly"),
      t("Szybka odpowiedź na WhatsAppie", "Fast reply on WhatsApp"),
      t("Możliwość przesunięcia terminu", "Reschedule anytime"),
      t("Pracujemy także w weekendy", "We work weekends too"),
    ],
  },
  {
    no: "04",
    title: t("Gwarancja satysfakcji", "Satisfaction guaranteed"),
    body: t(
      "W przypadku jakichkolwiek niedociągnięć wracamy bezpłatnie i poprawiamy — w terminie wygodnym dla Ciebie.",
      "If anything is off, we come back free of charge and fix it — at a time convenient for you.",
    ),
    bullets: [
      t("100% gwarancja poprawki", "100% re-do guarantee"),
      t("Kontrola jakości przed oddaniem", "Quality check before handover"),
      t("Obsługa klienta first", "Customer-first support"),
      t("Wystawiamy faktury VAT", "VAT invoices included"),
    ],
  },
];

export function WhyUs() {
  const { pick } = useI18n();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Total scroll length: 1 viewport for first card + N more viewports for transitions.
  const sectionHeight = `${(ROWS.length + 1) * 100}vh`;

  return (
    <section className="bg-cream">
      <Container className="space-y-12 md:space-y-16 pt-24 md:pt-32">
        <FadeUp>
          <div className="flex items-center gap-3 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-burgundy-700" />
            <span className="font-bebas tracking-[0.24em] text-xs md:text-sm text-burgundy-700 uppercase">
              {pick(HEADINGS.benefits)}
            </span>
          </div>
          <h2 className="font-display font-medium leading-[1.05] tracking-tight text-balance text-ink text-[clamp(2.2rem,5vw,4rem)] max-w-3xl">
            {pick({
              pl: "Od podłóg po sufity — czyścimy wszystko z troską.",
              en: "From floors to ceilings — we clean it all with care.",
            })}
          </h2>
        </FadeUp>
      </Container>

      {/* Tall scroll driver — pinned viewport inside */}
      <div
        ref={sectionRef}
        className="relative"
        style={{ height: sectionHeight }}
      >
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <Container className="w-full">
            <div className="relative h-[min(78vh,720px)]">
              {ROWS.map((row, i) => (
                <StackCard
                  key={row.no}
                  row={row}
                  i={i}
                  total={ROWS.length}
                  progress={scrollYProgress}
                  pick={pick}
                />
              ))}
            </div>
          </Container>
        </div>
      </div>

      <div className="h-16 md:h-24" />
    </section>
  );
}

function StackCard({
  row,
  i,
  total,
  progress,
  pick,
}: {
  row: (typeof ROWS)[number];
  i: number;
  total: number;
  progress: MotionValue<number>;
  pick: ReturnType<typeof useI18n>["pick"];
}) {
  const reverse = i % 2 === 1;

  // Progress is divided into (total + 1) segments. First segment shows card 0 settled.
  // Each subsequent segment slides the next card up from below over the previous one.
  const seg = 1 / (total + 1);
  const enterStart = i * seg; // before this: card waits below
  const enterEnd = (i + 1) * seg; // by this point: card has fully arrived at stack
  const stackedAtIndex = (j: number) => (j + 1) * seg; // when does card j become "settled"

  // Y: starts 110% below, animates to its stacked offset (i * 18px).
  const y = useTransform(
    progress,
    [enterStart, enterEnd],
    ["110%", `${i * 18}px`],
  );

  // After this card settles, every subsequent card arrival shrinks it slightly.
  // Build a chain: at each later card's arrival, this card scales further down.
  const laterCards = Math.max(0, total - 1 - i);
  const scaleKeys: number[] = [enterEnd];
  const scaleVals: number[] = [1];
  for (let k = 1; k <= laterCards; k++) {
    scaleKeys.push(stackedAtIndex(i + k));
    scaleVals.push(1 - k * 0.04);
  }
  const scale = useTransform(progress, scaleKeys, scaleVals);

  const opacity = useTransform(progress, [enterStart - 0.001, enterStart], [0, 1]);

  return (
    <motion.div
      style={{
        y,
        scale,
        opacity,
        zIndex: i + 1,
      }}
      className="absolute inset-x-0 top-0"
    >
      <div
        className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center rounded-[2rem] bg-paper p-6 md:p-10 lg:p-14 shadow-[0_30px_80px_-30px_rgba(74,0,15,0.35)] border border-ink/5 ${
          reverse ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        <div className="space-y-5">
          <span className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-burgundy-700 text-gold-500 font-bebas tracking-wider text-sm">
            {row.no}
          </span>
          <h3 className="font-display text-3xl md:text-4xl lg:text-[2.5rem] text-ink leading-tight tracking-tight">
            {pick(row.title)}
          </h3>
          <p className="text-ink/65 leading-relaxed max-w-xl">{pick(row.body)}</p>
          <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5 pt-2">
            {row.bullets.map((b, j) => (
              <li key={j} className="flex items-start gap-3 text-sm text-ink">
                <span className="grid h-5 w-5 shrink-0 mt-0.5 place-items-center rounded-full bg-gold-500 text-burgundy-900">
                  <Check size={12} strokeWidth={3} />
                </span>
                {pick(b)}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative overflow-hidden rounded-[1.5rem] shadow-card">
          <SafeImage
            src={STOCK.whyUs[i]}
            alt={pick(row.title)}
            ratio="4/3"
            className="w-full h-full"
          />
        </div>
      </div>
    </motion.div>
  );
}

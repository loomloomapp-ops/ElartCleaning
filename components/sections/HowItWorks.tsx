"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container, SectionHeading } from "@/components/primitives";
import { HOW_STEPS, HEADINGS } from "@/lib/content";
import { useI18n } from "@/lib/i18n";

export function HowItWorks() {
  const { pick } = useI18n();
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 65%"],
  });

  return (
    <section id="jak-pracujemy" className="bg-paper py-28 md:py-40">
      <Container className="space-y-16 md:space-y-24">
        <SectionHeading
          eyebrow={pick(HEADINGS.how)}
          title={pick(HEADINGS.how)}
          subtitle={pick(HEADINGS.howSub)}
        />

        <ol
          ref={ref}
          className="mx-auto max-w-4xl grid gap-12 md:gap-16"
        >
          {HOW_STEPS.map((s, i) => {
            const start = i / HOW_STEPS.length;
            const end = (i + 0.7) / HOW_STEPS.length;
            return (
              <Step
                key={i}
                index={i}
                title={pick(s.title)}
                body={pick(s.body)}
                progress={scrollYProgress}
                start={start}
                end={end}
              />
            );
          })}
        </ol>
      </Container>
    </section>
  );
}

function Step({
  index,
  title,
  body,
  progress,
  start,
  end,
}: {
  index: number;
  title: string;
  body: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  start: number;
  end: number;
}) {
  // Numeral fades in & shifts from muted to accent color
  const opacity = useTransform(progress, [start, end], [0.18, 1]);

  return (
    <li className="grid md:grid-cols-[8rem_1fr] gap-4 md:gap-10 items-baseline border-t border-ink/10 pt-10 md:pt-12">
      <motion.span
        style={{ opacity }}
        className="font-display font-medium text-burgundy-700 leading-none tracking-[-0.04em] text-[clamp(3.5rem,7vw,6rem)] tabular-nums"
      >
        {String(index + 1).padStart(2, "0")}
      </motion.span>
      <div className="space-y-3 md:pt-4">
        <h3 className="font-display text-2xl md:text-3xl text-ink leading-tight tracking-[-0.02em]">
          {title}
        </h3>
        <p className="text-ink/65 text-base leading-relaxed max-w-2xl">{body}</p>
      </div>
    </li>
  );
}

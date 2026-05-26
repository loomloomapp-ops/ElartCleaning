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
    offset: ["start 75%", "end 60%"],
  });

  return (
    <section id="jak-pracujemy" className="bg-paper py-24 md:py-32">
      <Container className="space-y-14">
        <SectionHeading
          eyebrow={pick(HEADINGS.how)}
          title={pick(HEADINGS.how)}
          subtitle={pick(HEADINGS.howSub)}
        />

        <div className="relative">
          {/* Track */}
          <span
            aria-hidden
            className="hidden md:block absolute left-[27px] top-2 bottom-2 w-[2px] bg-burgundy-700/10 rounded-full"
          />
          {/* Filled progress */}
          <motion.span
            aria-hidden
            style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
            className="hidden md:block absolute left-[27px] top-2 bottom-2 w-[2px] bg-burgundy-700 rounded-full"
          />

          <ol ref={ref} className="space-y-6 md:space-y-8">
            {HOW_STEPS.map((s, i) => {
              const start = i / HOW_STEPS.length;
              const end = (i + 0.6) / HOW_STEPS.length;
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
        </div>
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
  const activeOpacity = useTransform(progress, [start, end], [0, 1]);
  const activeScale = useTransform(progress, [start, end], [0.85, 1]);

  return (
    <li className="relative grid md:grid-cols-[56px_1fr] gap-4 md:gap-8 items-start">
      <div className="relative h-14 w-14">
        {/* Inactive ring */}
        <div className="absolute inset-0 grid place-items-center rounded-full border border-burgundy-700/20 bg-paper text-burgundy-700 font-bebas tracking-[0.15em]">
          <span className="text-sm">{String(index + 1).padStart(2, "0")}</span>
        </div>
        {/* Filled state — appears as scroll passes */}
        <motion.div
          style={{ opacity: activeOpacity, scale: activeScale }}
          className="absolute inset-0 grid place-items-center rounded-full bg-burgundy-700 text-gold-500 font-bebas tracking-[0.15em] shadow-md"
        >
          <span className="text-sm">{String(index + 1).padStart(2, "0")}</span>
        </motion.div>
      </div>
      <div className="space-y-2 pt-1 md:pt-2">
        <motion.h3
          style={{ opacity: useTransform(progress, [start, end], [0.6, 1]) }}
          className="font-display text-xl md:text-2xl text-ink leading-snug"
        >
          {title}
        </motion.h3>
        <p className="text-ink/65 text-sm md:text-base leading-relaxed max-w-2xl">
          {body}
        </p>
      </div>
    </li>
  );
}

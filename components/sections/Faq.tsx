"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Container, Chip } from "@/components/primitives";
import { FAQ } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function Faq() {
  const { pick, lang } = useI18n();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-paper pt-section-xs">
      <Container>
        <div className="rounded-3xl bg-cream-deep px-6 md:px-10 lg:px-14 py-10 md:py-14 lg:py-16">
          <div className="flex flex-col items-center text-center gap-4 max-w-col-6 mx-auto mb-8">
            <Chip tone="surface">FAQ</Chip>
            <h2 className="font-display font-bold uppercase leading-[0.9] tracking-[-0.02em] text-ink text-[clamp(2rem,5.5vw,4.5rem)]">
              {lang === "pl" ? "Najczęstsze pytania" : "Frequently asked"}
            </h2>
            <p className="text-b1 text-ink/64 max-w-col-4">
              {lang === "pl"
                ? "Nie znalazłeś odpowiedzi? Napisz do nas — odpowiadamy w ten sam dzień."
                : "Didn't find an answer? Message us — we reply the same day."}
            </p>
          </div>

          <div className="flex flex-col gap-3 max-w-col-8 mx-auto">
            {FAQ.map((item, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={i}
                  className="rounded-2xl bg-surface p-6 lg:p-7 transition-all"
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display font-bold text-h6 text-ink leading-tight">
                      {pick(item.q)}
                    </span>
                    <span
                      className={cn(
                        "grid h-9 w-9 place-items-center rounded-full shrink-0 transition-colors",
                        isOpen ? "bg-ink text-paper" : "bg-cream-deep text-ink",
                      )}
                    >
                      {isOpen ? <Minus size={16} strokeWidth={2.4} /> : <Plus size={16} strokeWidth={2.4} />}
                    </span>
                  </button>
                  <div
                    className={cn(
                      "grid transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      isOpen ? "grid-rows-[1fr] mt-4" : "grid-rows-[0fr]",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="text-b2 text-ink/64 leading-relaxed pt-2">
                        {pick(item.a)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

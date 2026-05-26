"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Container, Chip } from "@/components/primitives";
import { SERVICES } from "@/lib/content";
import { STOCK } from "@/lib/stock";
import { useI18n } from "@/lib/i18n";

export function ServicesMarquee() {
  const { pick, lang } = useI18n();

  return (
    <section id="uslugi" className="bg-paper py-section-sm">
      <Container>
        <div className="flex flex-col gap-4 max-w-col-6 mb-12 lg:mb-16">
          <Chip>{lang === "pl" ? "Usługi Elart Cleaning" : "Elart services"}</Chip>
          <h2 className="font-display font-bold uppercase leading-[0.9] tracking-[-0.02em] text-ink text-[clamp(2rem,5.5vw,4.5rem)]">
            {lang === "pl" ? "Co czyścimy" : "What we clean"}
          </h2>
        </div>
      </Container>

      {/* Edge-bleeding marquee */}
      <div className="relative overflow-hidden">
        <div className="flex w-max gap-5 animate-marquee">
          {[...SERVICES, ...SERVICES].map((s, idx) => (
            <ServiceCard
              key={`${s.slug}-${idx}`}
              slug={s.slug as keyof typeof STOCK.services}
              title={pick(s.title)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  slug,
  title,
}: {
  slug: keyof typeof STOCK.services;
  title: string;
}) {
  const img = STOCK.services[slug];
  return (
    <a
      href={`#cennik`}
      className="group relative block w-[280px] sm:w-[332px] shrink-0 rounded-2xl overflow-hidden bg-ink"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={img}
          alt={title}
          fill
          sizes="332px"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute top-3 right-3 grid h-10 w-10 place-items-center rounded-full bg-paper text-ink transition-transform duration-300 group-hover:rotate-45">
          <ArrowUpRight size={18} strokeWidth={2.4} />
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-display font-bold uppercase text-paper text-h6 leading-tight">
          {title}
        </h3>
      </div>
    </a>
  );
}

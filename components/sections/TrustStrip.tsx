"use client";

import { Award, ShieldCheck, Leaf } from "lucide-react";
import { Container } from "@/components/primitives";
import { useI18n } from "@/lib/i18n";

export function TrustStrip() {
  const { lang } = useI18n();

  const items = lang === "pl"
    ? [
        { icon: Award, title: "Top Rated 2025", sub: "Polecana firma cleaningowa w Poznaniu" },
        { icon: ShieldCheck, title: "Faktura VAT i ubezpieczenie", sub: "Pełna formalność dla firm i klientów prywatnych" },
        { icon: Leaf, title: "Bezpieczna chemia", sub: "Środki bezpieczne dla domowników i zwierząt" },
      ]
    : [
        { icon: Award, title: "Top Rated 2025", sub: "Recommended cleaning company in Poznań" },
        { icon: ShieldCheck, title: "VAT invoice & insured", sub: "Full paperwork for business and private clients" },
        { icon: Leaf, title: "Safe chemistry", sub: "Products safe for family and pets" },
      ];

  return (
    <section className="bg-paper pt-section-xs pb-section-sm">
      <Container>
        <div className="grid md:grid-cols-3 gap-4">
          {items.map((it, i) => (
            <div key={i} className="flex items-center gap-4 rounded-2xl bg-cream-deep p-6">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-surface text-ink shrink-0">
                <it.icon size={22} strokeWidth={2} />
              </span>
              <div className="flex flex-col gap-1 min-w-0">
                <span className="text-b3 font-bold uppercase text-ink leading-tight">
                  {it.title}
                </span>
                <span className="text-b3 text-ink/64 leading-snug">{it.sub}</span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

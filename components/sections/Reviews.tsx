"use client";

import { Star } from "lucide-react";
import { Container, Chip } from "@/components/primitives";
import { useI18n } from "@/lib/i18n";

const REVIEWS_PL = [
  { name: "Anna K.", role: "Mieszkanie · Jeżyce", text: "Cudowna ekipa! Po remoncie zostawili mieszkanie idealne — żadnego pyłu, podłogi błyszczą, okna jak nowe." },
  { name: "Paweł M.", role: "Biuro · Centrum", text: "Stała współpraca od roku. Zawsze punktualnie, dokładnie i z fakturą. Polecam każdej firmie." },
  { name: "Karolina W.", role: "Sofa · Grunwald", text: "Pranie narożnika i materacy — wynik wow. Suszenie w cenie, brak zapachu wilgoci. Profesjonaliści." },
  { name: "Marek P.", role: "Dom · Naramowice", text: "Generalne sprzątanie po imprezie. Przyjechali we dwie, w 4h dom był nie do poznania. Szacunek." },
  { name: "Joanna L.", role: "Przeprowadzka", text: "Pomogli ze spakowaniem i transportem. Bardzo kulturalna ekipa, nic nie zostało zniszczone." },
  { name: "Tomasz S.", role: "Salon kosmetyczny", text: "Sprzątanie cykliczne — zawsze ta sama, sprawdzona ekipa. Klientki zauważają różnicę." },
  { name: "Magda B.", role: "Mieszkanie · Wilda", text: "Komunikacja na medal, wycena szybka, efekt jeszcze lepszy. Zamawiam co dwa tygodnie." },
  { name: "Krzysztof D.", role: "Okna · Stary Rynek", text: "Mycie 24 okien w kamienicy. Z drabiny, dokładnie, bez smug. Naprawdę polecam." },
  { name: "Ola T.", role: "Dywan + materace", text: "Stary dywan dziadka — myślałam że do wyrzucenia. Wrócił jak nowy. Czary." },
];

const REVIEWS_EN = REVIEWS_PL.map((r) => ({ ...r, text: r.text }));

export function Reviews() {
  const { lang } = useI18n();
  const reviews = lang === "pl" ? REVIEWS_PL : REVIEWS_EN;
  // Distribute 9 reviews into 3 columns
  const cols = [reviews.slice(0, 3), reviews.slice(3, 6), reviews.slice(6, 9)];

  return (
    <section id="opinie" className="bg-paper py-section-md overflow-clip">
      <Container>
        <div className="flex flex-col items-center text-center gap-5 mb-12 lg:mb-16 max-w-col-6 mx-auto">
          <Chip>{lang === "pl" ? "Opinie klientów" : "Client reviews"}</Chip>
          <h2 className="font-display font-bold uppercase leading-[0.9] tracking-[-0.02em] text-ink text-[clamp(2rem,5.5vw,4.5rem)]">
            {lang === "pl" ? "Klienci nam ufają · 4.9/5" : "People trust us · 4.9/5"}
          </h2>
          <div className="flex items-center gap-2">
            {[0, 1, 2, 3, 4].map((k) => (
              <Star key={k} size={20} className="fill-accent-deep text-accent-deep" strokeWidth={0} />
            ))}
            <span className="text-b3 font-bold uppercase text-ink ml-1">
              {lang === "pl" ? "Oceny Google i Instagram" : "Google & Instagram ratings"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 h-[640px] overflow-hidden relative">
          {cols.map((col, idx) => (
            <div key={idx} className={idx === 2 ? "hidden lg:block relative overflow-hidden" : "relative overflow-hidden"}>
              <div
                className="flex flex-col gap-5 animate-marqueeY"
                style={{ animationDuration: `${36 + idx * 6}s`, animationDirection: idx % 2 === 1 ? "reverse" : "normal" }}
              >
                {[...col, ...col, ...col].map((r, i) => (
                  <ReviewCard key={`${idx}-${i}`} {...r} />
                ))}
              </div>
              <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-paper to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-paper to-transparent" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ReviewCard({ name, role, text }: { name: string; role: string; text: string }) {
  const initial = name.charAt(0);
  return (
    <div className="rounded-2xl bg-surface p-6 flex flex-col gap-4 shadow-card">
      <div className="flex items-center gap-1 text-accent-deep">
        {[0, 1, 2, 3, 4].map((k) => (
          <Star key={k} size={16} fill="currentColor" strokeWidth={0} />
        ))}
      </div>
      <p className="text-b2 text-ink leading-relaxed">{text}</p>
      <div className="flex items-center gap-3 mt-2">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-cream-deep text-ink font-display font-bold">
          {initial}
        </span>
        <div className="flex flex-col">
          <span className="text-b3 font-bold text-ink">{name}</span>
          <span className="text-label-2 uppercase font-bold text-ink/48">{role}</span>
        </div>
      </div>
    </div>
  );
}

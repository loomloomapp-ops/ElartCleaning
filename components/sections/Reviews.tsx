"use client";

import { Star, Instagram } from "lucide-react";
import { Container, Chip } from "@/components/primitives";
import { SafeImage } from "@/components/primitives/SafeImage";
import { useI18n } from "@/lib/i18n";
import { BRAND } from "@/lib/constants";
import { cn } from "@/lib/utils";

type Bi = { pl: string; en: string };
const t = (pl: string, en: string): Bi => ({ pl, en });

/* ---------- Google reviews (real, translated) ---------- */
type GoogleReview = {
  id: string;
  name: string;
  role: Bi;
  text: Bi;
  avatar?: string;
};

const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    id: "g1",
    name: "Yuliya Zhashkevych",
    avatar: "/cleaning/review-yuliya.png",
    role: t("Mieszkanie 3-pokojowe + piekarnik", "3-room apartment + oven"),
    text: t(
      "Zamówiłam sprzątanie mieszkania 3-pokojowego i piekarnika. Wszystko super, sprzątanie na najwyższym poziomie. Piekarnik wygląda jak nowy, idealnie czysty. Szczerze polecam ❤️👍🏻",
      "I ordered cleaning of a 3-room apartment and the oven. Everything was great, cleaning at the highest level. The oven looks brand new, perfectly clean. Sincerely recommend ❤️👍🏻",
    ),
  },
  {
    id: "g2",
    name: "Kateryna Kanivets",
    role: t("Pranie kanapy", "Sofa cleaning"),
    text: t(
      "Jestem bardzo zadowolona z jakości wykonanej pracy. Moja kanapa dosłownie błagała o pranie — szczerze mówiąc, myślałam, że już nie da się jej uratować 😅 Ale ekipa świetnie poradziła sobie z zadaniem. Osobno chcę podkreślić uprzejmość, miłą obsługę i życzliwe podejście do klienta. Korzystam z ich usług nie pierwszy raz i na pewno nie ostatni 🙏",
      "I'm very pleased with the quality of the work. My sofa was literally begging to be cleaned — honestly, I thought it couldn't be saved 😅 But the team handled it perfectly. I especially want to note their politeness, pleasant service and genuine care for the client. It's not my first time using them, and certainly not the last 🙏",
    ),
  },
  {
    id: "g3",
    name: "Nadya Skuba",
    avatar: "/cleaning/review-nadya.png",
    role: t("Kanapa, kuchnia, łazienka", "Sofa, kitchen, bathroom"),
    text: t(
      "Moja kanapa jest teraz jak nowa, podobnie jak płyta kuchenna, piekarnik i kabina prysznicowa ☺️ Straciłam już nadzieję na przywrócenie kanapie przyzwoitego wyglądu, ale Artem dokonał tego cudu! Ogromne dzięki ♥️",
      "My sofa is now as good as new, and so are the stove, oven and shower cabin ☺️ I'd already lost all hope of restoring the sofa to a decent look, but Artem worked this little miracle! Huge thanks ♥️",
    ),
  },
];

/* ---------- subcomponents ---------- */

const AVATAR_TINTS = [
  "from-burgundy-600 to-burgundy-800",
  "from-accent to-gold-500",
  "from-burgundy-700 to-accent-deep",
];

function GoogleGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
      <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
      <path fill="#FBBC05" d="M11.69 28.18c-.44-1.32-.69-2.73-.69-4.18s.25-2.86.69-4.18v-5.7H4.34A21.98 21.98 0 0 0 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z" />
      <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
    </svg>
  );
}

function GoogleCard({ review, index }: { review: GoogleReview; index: number }) {
  const { pick } = useI18n();
  return (
    <article className="flex h-full flex-col gap-4 rounded-3xl border border-ink/8 bg-surface p-6 shadow-card">
      {/* header */}
      <div className="flex items-center gap-3">
        {review.avatar ? (
          <SafeImage
            src={review.avatar}
            alt={review.name}
            className="h-11 w-11 shrink-0 rounded-full object-cover"
          />
        ) : (
          <span
            className={cn(
              "grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br font-display text-b1 font-bold text-paper",
              AVATAR_TINTS[index % AVATAR_TINTS.length],
            )}
          >
            {review.name.charAt(0)}
          </span>
        )}
        <div className="flex min-w-0 flex-col leading-tight">
          <span className="truncate text-b2 font-bold text-ink">{review.name}</span>
          <span className="truncate text-label-2 uppercase tracking-wider text-ink/45">{pick(review.role)}</span>
        </div>
        {/* Google "G" mark */}
        <GoogleGlyph className="ml-auto h-5 w-5 shrink-0" />
      </div>

      {/* stars */}
      <div className="flex items-center gap-1 text-accent-deep">
        {[0, 1, 2, 3, 4].map((k) => (
          <Star key={k} size={16} fill="currentColor" strokeWidth={0} />
        ))}
      </div>

      {/* text */}
      <p className="text-b3 leading-relaxed text-ink/75">{pick(review.text)}</p>
    </article>
  );
}

/* ---------- section ---------- */

export function Reviews() {
  const { pick, lang } = useI18n();

  return (
    <section id="opinie" className="overflow-clip bg-paper py-section-md">
      <Container className="space-y-10">
        {/* header */}
        <div className="mx-auto flex max-w-col-6 flex-col items-center gap-4 text-center">
          <Chip>{pick(t("Opinie klientów", "Client reviews"))}</Chip>
          <h2 className="font-display text-[clamp(2rem,5.5vw,4.5rem)] font-bold uppercase leading-[0.9] tracking-[-0.02em] text-ink text-balance">
            {pick(t("Zobaczcie sami · 4.9/5", "See for yourself · 4.9/5"))}
          </h2>
          <div className="flex items-center gap-2">
            {[0, 1, 2, 3, 4].map((k) => (
              <Star key={k} size={20} className="fill-accent-deep text-accent-deep" strokeWidth={0} />
            ))}
            <span className="ml-1 text-b3 font-bold uppercase text-ink">
              {pick(t("Oceny Google i Instagram", "Google & Instagram ratings"))}
            </span>
          </div>
        </div>

        {/* Google reviews */}
        <div className="space-y-8">
          <p className="mx-auto max-w-col-5 text-center text-b2 leading-relaxed text-ink/60">
            {pick(
              t(
                "Prawdziwe opinie klientów z Google — przetłumaczone, ale bez zmian w treści.",
                "Real client reviews from Google — translated, with the content unchanged.",
              ),
            )}
          </p>
          <div className="grid gap-5 md:grid-cols-3">
            {GOOGLE_REVIEWS.map((r, i) => (
              <GoogleCard key={r.id} review={r} index={i} />
            ))}
          </div>
        </div>

        {/* links to Google & Instagram */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href={BRAND.googleMaps}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2.5 rounded-pill bg-paper px-6 py-3.5 font-display text-[15px] font-bold uppercase tracking-wide text-ink shadow-card ring-1 ring-ink/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft hover:ring-ink/20 active:scale-95"
          >
            <GoogleGlyph className="h-5 w-5 shrink-0" />
            {lang === "pl" ? "Zobacz opinie w Google" : "See reviews on Google"}
          </a>
          <a
            href={BRAND.instagram}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2.5 rounded-pill px-6 py-3.5 font-display text-[15px] font-bold uppercase tracking-wide text-white shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft hover:brightness-110 active:scale-95"
            style={{
              backgroundImage:
                "linear-gradient(45deg,#FEDA75 0%,#FA7E1E 25%,#D62976 55%,#962FBF 85%)",
            }}
          >
            <Instagram size={20} strokeWidth={2.2} />
            {lang === "pl" ? "Zobacz więcej na Instagramie" : "See more on Instagram"}
          </a>
        </div>
      </Container>
    </section>
  );
}

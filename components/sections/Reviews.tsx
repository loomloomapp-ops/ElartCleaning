"use client";

import * as React from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { Play, Quote, Star, Instagram } from "lucide-react";
import Image from "next/image";
import { Container, SectionHeading, Ribbon, Eyebrow } from "@/components/primitives";
import { SafeImage } from "@/components/primitives/SafeImage";
import { FadeUp } from "@/components/motion";
import { HEADINGS, REVIEWS_TABS, UI } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { ASSETS, BRAND } from "@/lib/constants";
import { getYouTubeId, cn } from "@/lib/utils";

const SAMPLE_QUOTES = [
  {
    name: "Karolina M.",
    role: { pl: "Mieszkanie 58 m², Jeżyce", en: "Apartment 58 m², Jeżyce" },
    text: {
      pl: "Po remoncie nasze mieszkanie wyglądało jak plac budowy. Ekipa Elart zrobiła robotę w 4 godziny — od pyłu nie ma śladu.",
      en: "After renovation our flat looked like a construction site. Elart did the job in 4 hours — no dust left at all.",
    },
  },
  {
    name: "Mateusz Z.",
    role: { pl: "Salon kosmetyczny, Wilda", en: "Beauty salon, Wilda" },
    text: {
      pl: "Sprzątają u nas co tydzień. Punktualnie, dyskretnie, faktura na firmę. Klientki same komentują, że jest świeżo.",
      en: "They clean us weekly. On time, discreet, invoice issued. Our clients themselves comment how fresh it feels.",
    },
  },
  {
    name: "Anna K.",
    role: { pl: "Pranie narożnika", en: "Corner sofa washing" },
    text: {
      pl: "Pies, dzieci, 5 lat plam. Narożnik wygląda jak nowy. Suszenie w cenie, więc wieczorem już siadaliśmy.",
      en: "Dog, kids, 5 years of stains. The sofa looks brand new. Drying included, we sat on it the same evening.",
    },
  },
];

function PhotoCard({
  asset,
  quote,
  emphasis = false,
}: {
  asset: string;
  quote: (typeof SAMPLE_QUOTES)[number];
  emphasis?: boolean;
}) {
  const { pick } = useI18n();
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-3xl border bg-paper transition-all duration-500 hover:-translate-y-1 hover:shadow-card",
        emphasis ? "border-gold-500/40" : "border-ink/8",
      )}
    >
      <div className="relative" style={{ aspectRatio: "4/5" }}>
        <SafeImage src={asset} alt={quote.name} ratio="4/5" className="absolute inset-0 w-full h-full" />

        <div className="absolute top-4 left-4">
          <Ribbon variant="burgundy">Real Client · Poznań</Ribbon>
        </div>
        <div className="absolute top-4 right-4 grid h-10 w-10 place-items-center rounded-full bg-gold-500 text-burgundy-900">
          <Quote size={16} strokeWidth={2.2} />
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-burgundy-900/85 via-burgundy-900/30 to-transparent" />
        <div className="absolute left-5 right-5 bottom-5 text-paper">
          <div className="flex gap-1 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={14} className="fill-gold-500 text-gold-500" />
            ))}
          </div>
          <p className="text-sm md:text-base leading-snug line-clamp-3">{pick(quote.text)}</p>
          <p className="mt-2 text-xs text-paper/75">
            <span className="font-medium">{quote.name}</span> · {pick(quote.role)}
          </p>
        </div>
      </div>
    </div>
  );
}

function VideoCard({ url, idx }: { url: string; idx: number }) {
  const { pick } = useI18n();
  const id = getYouTubeId(url);
  const [playing, setPlaying] = React.useState(false);

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-ink/8 bg-burgundy-900">
      <div className="relative" style={{ aspectRatio: "16/10" }}>
        {playing && id ? (
          <iframe
            src={`https://www.youtube.com/embed/${id}?autoplay=1`}
            title={`Video review ${idx + 1}`}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            {id ? (
              <Image
                src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
                alt={`Video review ${idx + 1}`}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-burgundy-700 to-burgundy-900 text-gold-500/80 font-bebas tracking-[0.22em] text-xs">
                {url}
              </div>
            )}

            <div className="absolute inset-0 bg-burgundy-900/40 transition group-hover:bg-burgundy-900/25" />
            <button
              onClick={() => id && setPlaying(true)}
              aria-label={pick(UI.playVideo)}
              className="absolute inset-0 grid place-items-center"
            >
              <span className="grid h-20 w-20 place-items-center rounded-full bg-gold-500 text-burgundy-900 shadow-gold transition-transform group-hover:scale-105">
                <Play size={26} className="translate-x-0.5" />
              </span>
            </button>
          </>
        )}

        <div className="absolute top-4 left-4">
          <Ribbon variant="gold">VIDEO · {String(idx + 1).padStart(2, "0")}</Ribbon>
        </div>
      </div>
    </div>
  );
}

export function Reviews() {
  const { pick } = useI18n();
  return (
    <section id="opinie" className="bg-paper py-28 md:py-40 lg:py-48">
      <Container className="space-y-16 md:space-y-20">
        <SectionHeading
          eyebrow={pick(HEADINGS.reviews)}
          title={pick(HEADINGS.reviews)}
          subtitle={pick(HEADINGS.reviewsSub)}
        />

        <Tabs.Root defaultValue="photos" className="flex flex-col items-center">
          <Tabs.List className="inline-flex rounded-full bg-cream p-1">
            <Tabs.Trigger
              value="photos"
              className="rounded-full px-5 py-2 text-sm font-medium text-ink/65 transition data-[state=active]:bg-burgundy-700 data-[state=active]:text-paper"
            >
              {pick(REVIEWS_TABS.photos)}
            </Tabs.Trigger>
            <Tabs.Trigger
              value="videos"
              className="rounded-full px-5 py-2 text-sm font-medium text-ink/65 transition data-[state=active]:bg-burgundy-700 data-[state=active]:text-paper"
            >
              {pick(REVIEWS_TABS.videos)}
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="photos" className="mt-10 focus:outline-none w-full">
            <FadeUp className="grid md:grid-cols-3 gap-4 md:gap-6">
              <PhotoCard asset={ASSETS.reviewPhotos[0]} quote={SAMPLE_QUOTES[0]} emphasis />
              <PhotoCard asset={ASSETS.reviewPhotos[1]} quote={SAMPLE_QUOTES[1]} />
              <div className="rounded-3xl border border-ink/8 bg-burgundy-700 text-paper p-7 flex flex-col justify-between">
                <Eyebrow tone="white">Opinia · tekst</Eyebrow>
                <div className="space-y-4">
                  <Quote className="text-gold-500" />
                  <p className="font-display text-xl leading-snug">
                    {pick(SAMPLE_QUOTES[2].text)}
                  </p>
                  <p className="text-xs text-paper/70">
                    <span className="font-medium">{SAMPLE_QUOTES[2].name}</span> · {pick(SAMPLE_QUOTES[2].role)}
                  </p>
                </div>
              </div>
            </FadeUp>
          </Tabs.Content>

          <Tabs.Content value="videos" className="mt-10 focus:outline-none w-full">
            <FadeUp className="grid md:grid-cols-2 gap-4 md:gap-6">
              <VideoCard url={ASSETS.reviewVideos[0]} idx={0} />
              <VideoCard url={ASSETS.reviewVideos[1]} idx={1} />
            </FadeUp>
          </Tabs.Content>
        </Tabs.Root>

        <div className="flex justify-center">
          <a
            href={BRAND.instagram}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 text-sm text-ink/60 hover:text-burgundy-700 transition"
          >
            <Instagram size={16} /> @elart_cleaning
          </a>
        </div>
      </Container>
    </section>
  );
}

"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Heart, MessageCircle, Send, Bookmark, Play, X, Instagram } from "lucide-react";
import { Container, Chip } from "@/components/primitives";
import { SafeImage } from "@/components/primitives/SafeImage";
import { SecondaryButton } from "@/components/cta";
import { useI18n } from "@/lib/i18n";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { BRAND } from "@/lib/constants";
import { cn } from "@/lib/utils";

type Bi = { pl: string; en: string };
const t = (pl: string, en: string): Bi => ({ pl, en });

/* ---------- Instagram screenshot reviews ---------- */
/* Replace `image` with real screenshot exports. Caption mirrors what's on the post. */
type IgPost = {
  id: string;
  image: string;
  likes: string;
  caption: Bi;
  time: Bi;
};

const IG_POSTS: IgPost[] = [
  {
    id: "ig-1",
    image: "/cleaning/service-reno.jpg",
    likes: "128",
    caption: t("Mieszkanie po remoncie — zero pyłu, okna jak nowe. Dziękujemy za zaufanie!", "Apartment after renovation — zero dust, windows like new. Thanks for trusting us!"),
    time: t("2 dni temu", "2 days ago"),
  },
  {
    id: "ig-2",
    image: "/cleaning/service-upholstery.jpg",
    likes: "94",
    caption: t("Pranie narożnika. Efekt mówi sam za siebie. Suszenie w cenie.", "Sofa wash. The result speaks for itself. Drying included."),
    time: t("5 dni temu", "5 days ago"),
  },
  {
    id: "ig-3",
    image: "/cleaning/service-office.jpg",
    likes: "76",
    caption: t("Biuro gotowe na poniedziałek. Stała współpraca z lokalem w centrum.", "Office ready for Monday. Ongoing partnership in the city centre."),
    time: t("1 tydzień temu", "1 week ago"),
  },
  {
    id: "ig-4",
    image: "/cleaning/service-carpet.jpg",
    likes: "152",
    caption: t("Dywan, który miał trafić do kosza — wrócił jak nowy. Czary? Nie, ekstrakcja.", "A carpet headed for the bin — back like new. Magic? No, extraction."),
    time: t("1 tydzień temu", "1 week ago"),
  },
  {
    id: "ig-5",
    image: "/cleaning/service-apartment.jpg",
    likes: "88",
    caption: t("Generalne sprzątanie 62 m² · Grunwald. Kuchnia i łazienka lśnią.", "General clean 62 m² · Grunwald. Kitchen and bathroom shining."),
    time: t("2 tygodnie temu", "2 weeks ago"),
  },
  {
    id: "ig-6",
    image: "/cleaning/service-moving.jpg",
    likes: "61",
    caption: t("Przygotowanie mieszkania po wyprowadzce — gotowe do oddania.", "Move-out prep — ready to hand over."),
    time: t("2 tygodnie temu", "2 weeks ago"),
  },
];

/* ---------- Video reviews ---------- */
/* For a real video set `youtubeId` (e.g. "dQw4w9WgXcQ") or `src` (mp4 path). */
/* Leaving both empty keeps the polished poster + "video soon" placeholder. */
type VideoReview = {
  id: string;
  poster: string;
  name: string;
  role: Bi;
  youtubeId?: string;
  src?: string;
};

const VIDEO_REVIEWS: VideoReview[] = [
  { id: "v1", poster: "/cleaning/review-1.jpg", name: "Anna K.", role: t("Mieszkanie · Jeżyce", "Apartment · Jeżyce") },
  { id: "v2", poster: "/cleaning/review-2.jpg", name: "Paweł M.", role: t("Biuro · Centrum", "Office · Centrum") },
  { id: "v3", poster: "/cleaning/hero-side-1.jpg", name: "Karolina W.", role: t("Narożnik · Grunwald", "Sofa · Grunwald") },
  { id: "v4", poster: "/cleaning/about-mission.jpg", name: "Marek P.", role: t("Dom · Naramowice", "House · Naramowice") },
];

/* ---------- subcomponents ---------- */

function IgCard({ post }: { post: IgPost }) {
  const { pick } = useI18n();
  return (
    <article className="w-[19rem] shrink-0 overflow-hidden rounded-3xl border border-ink/8 bg-surface shadow-card">
      {/* header */}
      <div className="flex items-center gap-3 px-4 py-3">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-accent via-gold-500 to-burgundy-600 p-[2px]">
          <span className="grid h-full w-full place-items-center rounded-full bg-surface">
            <SafeImage src="/logo-elart.png" alt="Elart Cleaning" className="h-6 w-6 rounded-full" />
          </span>
        </span>
        <div className="flex flex-col leading-tight">
          <span className="text-b3 font-bold text-ink">elart_cleaning</span>
          <span className="text-label-2 uppercase tracking-wider text-ink/45">Poznań</span>
        </div>
        <Instagram size={18} className="ml-auto text-ink/40" strokeWidth={1.8} />
      </div>

      {/* image */}
      <SafeImage src={post.image} alt={pick(post.caption)} ratio="4/5" className="w-full" />

      {/* actions */}
      <div className="flex items-center gap-4 px-4 pt-3 text-ink">
        <Heart size={20} className="fill-burgundy-600 text-burgundy-600" strokeWidth={1.8} />
        <MessageCircle size={20} strokeWidth={1.8} />
        <Send size={20} strokeWidth={1.8} />
        <Bookmark size={20} className="ml-auto" strokeWidth={1.8} />
      </div>

      {/* caption */}
      <div className="space-y-1 px-4 pb-4 pt-2">
        <p className="text-b3 font-bold text-ink">{post.likes} {pick(t("polubień", "likes"))}</p>
        <p className="text-b3 leading-snug text-ink/75">
          <span className="font-bold text-ink">elart_cleaning</span> {pick(post.caption)}
        </p>
        <p className="text-label-2 uppercase tracking-wider text-ink/40">{pick(post.time)}</p>
      </div>
    </article>
  );
}

function VideoCard({ video, onPlay }: { video: VideoReview; onPlay: () => void }) {
  const { pick } = useI18n();
  return (
    <button
      type="button"
      onClick={onPlay}
      className="group relative overflow-hidden rounded-3xl border border-ink/8 bg-cream-deep text-left shadow-card"
      style={{ aspectRatio: "9/16" }}
      aria-label={`${pick(t("Odtwórz opinię wideo", "Play video review"))} — ${video.name}`}
    >
      <SafeImage
        src={video.poster}
        alt={video.name}
        ratio="9/16"
        className="absolute inset-0 h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />

      <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-paper/90 text-burgundy-700 shadow-soft transition-transform duration-300 group-hover:scale-110">
        <Play size={24} className="ml-0.5 fill-burgundy-700" strokeWidth={0} />
      </span>

      <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 text-label-2 font-bold uppercase tracking-wider text-ink">
        {pick(t("Wideo", "Video"))}
      </span>

      <div className="absolute inset-x-0 bottom-0 p-4 text-paper">
        <p className="font-display text-b1 font-bold leading-tight">{video.name}</p>
        <p className="text-label-1 uppercase tracking-wider text-paper/70">{pick(video.role)}</p>
      </div>
    </button>
  );
}

function VideoModal({ video, onClose }: { video: VideoReview; onClose: () => void }) {
  const { pick } = useI18n();
  useLockBodyScroll(true);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-ink/80 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm overflow-hidden rounded-4xl bg-surface shadow-soft"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={pick(t("Zamknij", "Close"))}
          className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-paper/90 text-ink shadow-card transition active:scale-95"
        >
          <X size={20} />
        </button>

        <div className="relative bg-ink" style={{ aspectRatio: "9/16" }}>
          {video.youtubeId ? (
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
              title={video.name}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : video.src ? (
            // eslint-disable-next-line jsx-a11y/media-has-caption
            <video className="absolute inset-0 h-full w-full object-cover" src={video.src} controls autoPlay playsInline />
          ) : (
            <>
              <SafeImage src={video.poster} alt={video.name} ratio="9/16" className="absolute inset-0 h-full w-full opacity-70" />
              <div className="absolute inset-0 grid place-items-center p-6 text-center">
                <p className="font-display text-b1 font-bold text-paper">
                  {pick(t("Opinia wideo wkrótce", "Video review coming soon"))}
                </p>
              </div>
            </>
          )}
        </div>

        <div className="flex items-center justify-between gap-3 px-5 py-4">
          <div>
            <p className="font-display text-b1 font-bold text-ink">{video.name}</p>
            <p className="text-label-1 uppercase tracking-wider text-ink/50">{pick(video.role)}</p>
          </div>
          <div className="flex items-center gap-1 text-accent-deep">
            {[0, 1, 2, 3, 4].map((k) => (
              <Star key={k} size={16} fill="currentColor" strokeWidth={0} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- section ---------- */

type TabId = "screens" | "video";

export function Reviews() {
  const { pick, lang } = useI18n();
  const [activeVideo, setActiveVideo] = React.useState<VideoReview | null>(null);
  const [tab, setTab] = React.useState<TabId>("screens");

  const TABS: { id: TabId; label: Bi; icon: React.ReactNode }[] = [
    { id: "screens", label: t("Screeny z opiniami", "Review screenshots"), icon: <Instagram size={18} strokeWidth={2} /> },
    { id: "video", label: t("Opinie wideo", "Video reviews"), icon: <Play size={16} className="fill-current" strokeWidth={0} /> },
  ];

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

        {/* tabs */}
        <div className="flex justify-center" role="tablist" aria-label={pick(t("Rodzaje opinii", "Review types"))}>
          <div className="inline-flex flex-wrap justify-center gap-1 rounded-pill border border-ink/10 bg-surface p-1.5">
            {TABS.map((ti) => {
              const isActive = tab === ti.id;
              return (
                <button
                  key={ti.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setTab(ti.id)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-pill px-4 py-2.5 text-b3 font-bold uppercase tracking-wide transition md:px-5",
                    isActive ? "bg-ink text-paper" : "text-ink/55 hover:text-ink",
                  )}
                >
                  {ti.icon}
                  {pick(ti.label)}
                </button>
              );
            })}
          </div>
        </div>

        {/* panels */}
        <AnimatePresence mode="wait" initial={false}>
          {tab === "screens" ? (
            <motion.div
              key="screens"
              role="tabpanel"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              <p className="mx-auto max-w-col-5 text-center text-b2 leading-relaxed text-ink/60">
                {pick(
                  t(
                    "Prawdziwe posty i komentarze klientów z naszego Instagrama — bez retuszu.",
                    "Real posts and comments from our Instagram — no retouching.",
                  ),
                )}
              </p>
              <div className="group relative -mx-4 overflow-hidden md:mx-0">
                <div className="flex w-max gap-5 px-4 animate-marquee group-hover:[animation-play-state:paused] md:px-0">
                  {[...IG_POSTS, ...IG_POSTS].map((post, i) => (
                    <IgCard key={`${post.id}-${i}`} post={post} />
                  ))}
                </div>
                <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-paper to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-paper to-transparent" />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="video"
              role="tabpanel"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              <p className="mx-auto max-w-col-5 text-center text-b2 leading-relaxed text-ink/60">
                {pick(
                  t(
                    "Klienci opowiadają o efektach własnymi słowami. Kliknij, aby odtworzyć.",
                    "Clients describe the results in their own words. Tap to play.",
                  ),
                )}
              </p>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
                {VIDEO_REVIEWS.map((v) => (
                  <VideoCard key={v.id} video={v} onPlay={() => setActiveVideo(v)} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* link to Instagram */}
        <div className="flex justify-center pt-2">
          <SecondaryButton href={BRAND.instagram} target="_blank" rel="noopener">
            {lang === "pl" ? "Zobacz więcej na Instagramie" : "See more on Instagram"}
          </SecondaryButton>
        </div>
      </Container>

      {activeVideo && <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />}
    </section>
  );
}

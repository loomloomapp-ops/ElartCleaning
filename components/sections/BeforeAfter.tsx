"use client";

import * as React from "react";
import { MessageCircle, MoveHorizontal } from "lucide-react";
import { Container, Chip } from "@/components/primitives";
import { SafeImage } from "@/components/primitives/SafeImage";
import { FadeUp } from "@/components/motion";
import { PrimaryButton } from "@/components/cta";
import { useI18n } from "@/lib/i18n";
import { UI } from "@/lib/content";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

type Bi = { pl: string; en: string };
const t = (pl: string, en: string): Bi => ({ pl, en });

const FILTERS: { id: string; label: Bi }[] = [
  { id: "all", label: t("Wszystkie", "All") },
  { id: "mieszkanie", label: t("Mieszkanie", "Apartment") },
  { id: "po-remoncie", label: t("Po remoncie", "Post-reno") },
  { id: "tapicerka", label: t("Tapicerka", "Upholstery") },
  { id: "biuro", label: t("Biuro", "Office") },
  { id: "przeprowadzka", label: t("Przeprowadzka", "Moving") },
];

type CaseItem = {
  id: string;
  category: string;
  categoryLabel: Bi;
  title: Bi;
  meta: string;
  problem: Bi;
  done: Bi;
  result: Bi;
  before: string;
  after: string;
};

const CASES: CaseItem[] = [
  {
    id: "tapicerka-naroznik",
    category: "tapicerka",
    categoryLabel: t("Tapicerka", "Upholstery"),
    title: t("Czyszczenie narożnika po intensywnym użytkowaniu", "Corner sofa deep-clean"),
    meta: "Poznań · Grunwald",
    problem: t("Plamy, zapach i ślady codziennego użytkowania.", "Stains, odour and everyday wear."),
    done: t("Pranie tapicerki, neutralizacja zapachu, suszenie.", "Upholstery wash, odour neutralisation, drying."),
    result: t("Odświeżony materiał, czystszy wygląd i mebel gotowy do użytku.", "Refreshed fabric, cleaner look, ready to use."),
    before: "/cleaning/service-upholstery.jpg",
    after: "/cleaning/service-carpet.jpg",
  },
  {
    id: "po-remoncie-mieszkanie",
    category: "po-remoncie",
    categoryLabel: t("Po remoncie", "Post-reno"),
    title: t("Sprzątanie mieszkania po remoncie", "Apartment clean after renovation"),
    meta: "Poznań · Jeżyce",
    problem: t("Pył budowlany, zabrudzone powierzchnie i trudno dostępne miejsca.", "Construction dust, dirty surfaces and hard-to-reach spots."),
    done: t("Usunięcie pyłu, czyszczenie detali, mycie powierzchni.", "Dust removal, detail cleaning, surface washing."),
    result: t("Mieszkanie gotowe do wprowadzenia.", "Apartment ready to move in."),
    before: "/cleaning/service-reno.jpg",
    after: "/cleaning/hero-main.jpg",
  },
  {
    id: "biuro-poniedzialek",
    category: "biuro",
    categoryLabel: t("Biuro", "Office"),
    title: t("Odświeżenie biura przed poniedziałkiem", "Office refresh before Monday"),
    meta: "Poznań · Centrum",
    problem: t("Kurz, ślady użytkowania i nieuporządkowana przestrzeń.", "Dust, wear marks and a cluttered space."),
    done: t("Sprzątanie stanowisk, podłóg, kuchni i sanitariatów.", "Desks, floors, kitchen and restrooms."),
    result: t("Czysta, reprezentacyjna przestrzeń dla zespołu i klientów.", "Clean, presentable space for team and clients."),
    before: "/cleaning/service-office.jpg",
    after: "/cleaning/service-subscription.jpg",
  },
  {
    id: "mieszkanie-generalne",
    category: "mieszkanie",
    categoryLabel: t("Mieszkanie", "Apartment"),
    title: t("Generalne sprzątanie mieszkania", "General apartment cleaning"),
    meta: "Poznań · Wilda",
    problem: t("Nagromadzony kurz, zabrudzenia w kuchni i łazience.", "Built-up dust, kitchen and bathroom grime."),
    done: t("Dokładne sprzątanie powierzchni, kuchni, łazienki i podłóg.", "Thorough surfaces, kitchen, bathroom and floors."),
    result: t("Świeże, czyste i komfortowe mieszkanie.", "Fresh, clean and comfortable apartment."),
    before: "/cleaning/service-house.jpg",
    after: "/cleaning/service-apartment.jpg",
  },
  {
    id: "tapicerka-krzesla",
    category: "tapicerka",
    categoryLabel: t("Tapicerka", "Upholstery"),
    title: t("Pranie krzeseł i materaca", "Chairs and mattress wash"),
    meta: "Poznań · Naramowice",
    problem: t("Zabrudzenia, kurz i nieprzyjemny zapach.", "Dirt, dust and unpleasant odour."),
    done: t("Czyszczenie ekstrakcyjne, odświeżenie tkanin, suszenie.", "Extraction cleaning, fabric refresh, drying."),
    result: t("Czystsze tekstylia i większy komfort użytkowania.", "Cleaner textiles and more comfort."),
    before: "/cleaning/service-carpet.jpg",
    after: "/cleaning/service-upholstery.jpg",
  },
  {
    id: "przeprowadzka-wyprowadzka",
    category: "przeprowadzka",
    categoryLabel: t("Przeprowadzka", "Moving"),
    title: t("Przygotowanie mieszkania po wyprowadzce", "Apartment prep after move-out"),
    meta: "Poznań · Łazarz",
    problem: t("Zabrudzenia po wyniesieniu rzeczy i ślady użytkowania.", "Dirt after moving out and wear marks."),
    done: t("Sprzątanie końcowe, odświeżenie powierzchni, przygotowanie lokalu.", "Final clean, surface refresh, unit prep."),
    result: t("Mieszkanie gotowe do oddania lub wynajmu.", "Ready to hand over or rent out."),
    before: "/cleaning/service-moving.jpg",
    after: "/cleaning/hero-side-1.jpg",
  },
  {
    id: "po-remoncie-okna",
    category: "po-remoncie",
    categoryLabel: t("Po remoncie", "Post-reno"),
    title: t("Czyszczenie okien i powierzchni po pracach", "Windows and surfaces after works"),
    meta: "Poznań · Stary Rynek",
    problem: t("Pył, smugi, resztki materiałów budowlanych.", "Dust, smudges, leftover building materials."),
    done: t("Mycie okien, ram, parapetów i powierzchni.", "Windows, frames, sills and surfaces."),
    result: t("Jasna, czysta przestrzeń bez śladów remontu.", "Bright, clean space with no trace of the renovation."),
    before: "/cleaning/service-reno.jpg",
    after: "/cleaning/about-mission.jpg",
  },
  {
    id: "biuro-regularne",
    category: "biuro",
    categoryLabel: t("Biuro", "Office"),
    title: t("Regularne sprzątanie lokalu usługowego", "Regular service-venue cleaning"),
    meta: "Poznań · Winogrady",
    problem: t("Codzienne zabrudzenia i potrzeba utrzymania standardu.", "Daily dirt and the need to keep a standard."),
    done: t("Sprzątanie powierzchni, podłóg, zaplecza i strefy klienta.", "Surfaces, floors, back-office and client area."),
    result: t("Lokal gotowy na przyjęcie klientów.", "Venue ready to welcome clients."),
    before: "/cleaning/service-office.jpg",
    after: "/cleaning/hero-side-2.jpg",
  },
];

/* ---------- before/after slider (pointer + touch + keyboard) ---------- */

function BaSlider({
  before,
  after,
  beforeLabel,
  afterLabel,
}: {
  before: string;
  after: string;
  beforeLabel: string;
  afterLabel: string;
}) {
  const [pos, setPos] = React.useState(55);
  const ref = React.useRef<HTMLDivElement>(null);
  const dragging = React.useRef(false);

  const setFromClientX = React.useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, p)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    setFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    setFromClientX(e.clientX);
  };
  const stop = () => {
    dragging.current = false;
  };
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 4));
    if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 4));
  };

  return (
    <div
      ref={ref}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stop}
      onPointerLeave={stop}
      className="relative w-full cursor-ew-resize touch-none select-none overflow-hidden bg-cream-deep"
      style={{ aspectRatio: "4/3" }}
    >
      {/* AFTER (full) */}
      <SafeImage src={after} alt={afterLabel} ratio="4/3" className="absolute inset-0 h-full w-full" />

      {/* BEFORE (clipped from the left, slightly dimmed to read as "dirty") */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }} aria-hidden>
        <SafeImage
          src={before}
          alt={beforeLabel}
          ratio="4/3"
          tone="cream"
          className="absolute inset-0 h-full w-full [filter:grayscale(0.28)_brightness(0.84)_contrast(1.02)]"
        />
        <div className="absolute inset-0 bg-burgundy-900/25 mix-blend-multiply" />
      </div>

      {/* badges */}
      <span className="absolute left-3 top-3 z-10 rounded-full bg-burgundy-800 px-3 py-1 text-label-2 font-bold uppercase tracking-wider text-paper">
        {beforeLabel}
      </span>
      <span className="absolute right-3 top-3 z-10 rounded-full bg-accent px-3 py-1 text-label-2 font-bold uppercase tracking-wider text-ink">
        {afterLabel}
      </span>

      {/* divider + handle */}
      <div
        className="absolute inset-y-0 z-20 w-0.5 bg-paper/90 shadow-[0_0_0_1px_rgba(27,4,8,0.15)]"
        style={{ left: `${pos}%`, transform: "translateX(-1px)" }}
        aria-hidden
      >
        <div
          role="slider"
          tabIndex={0}
          aria-label={`${beforeLabel} / ${afterLabel}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          onKeyDown={onKeyDown}
          className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-ink/10 bg-surface text-burgundy-700 shadow-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <MoveHorizontal size={18} strokeWidth={2.2} />
        </div>
      </div>
    </div>
  );
}

/* ---------- case card ---------- */

function CaseCard({ item }: { item: CaseItem }) {
  const { pick } = useI18n();
  const waUrl = buildWhatsAppUrl(
    pick({
      pl: `Dzień dobry Elart Cleaning! Chcę taki efekt jak w realizacji „${item.title.pl}". Czy możecie przygotować wycenę?`,
      en: `Hello Elart Cleaning! I want a result like in your "${item.title.en}" case. Could you prepare a quote?`,
    }),
  );

  const rows: { label: Bi; value: Bi }[] = [
    { label: t("Problem", "Problem"), value: item.problem },
    { label: t("Wykonano", "Done"), value: item.done },
    { label: t("Efekt", "Result"), value: item.result },
  ];

  return (
    <article className="flex flex-col overflow-hidden rounded-4xl border border-ink/8 bg-surface shadow-card">
      <BaSlider
        before={item.before}
        after={item.after}
        beforeLabel={pick(UI.before)}
        afterLabel={pick(UI.after)}
      />
      <div className="flex flex-1 flex-col gap-4 p-6 md:p-7">
        <div className="flex items-center justify-between gap-3">
          <Chip tone="cream">{pick(item.categoryLabel)}</Chip>
          <span className="text-label-2 font-bold uppercase tracking-wider text-ink/45">{item.meta}</span>
        </div>

        <h3 className="font-display text-[1.35rem] font-bold leading-[1.1] tracking-[-0.01em] text-ink text-balance">
          {pick(item.title)}
        </h3>

        <dl className="flex flex-1 flex-col gap-3 border-t border-ink/8 pt-4">
          {rows.map((r, i) => (
            <div key={i} className="grid grid-cols-[5.5rem_1fr] gap-3">
              <dt className="text-label-1 font-bold uppercase tracking-wider text-burgundy-700">{pick(r.label)}</dt>
              <dd className="text-b3 leading-snug text-ink/72">{pick(r.value)}</dd>
            </div>
          ))}
        </dl>

        <PrimaryButton href={waUrl} target="_blank" rel="noopener" size="md" className="mt-1 self-start">
          {pick(UI.iWantThis)}
        </PrimaryButton>
      </div>
    </article>
  );
}

/* ---------- section ---------- */

export function BeforeAfter() {
  const { pick } = useI18n();
  const [active, setActive] = React.useState("all");

  const filtered = active === "all" ? CASES : CASES.filter((c) => c.category === active);

  const finalWa = buildWhatsAppUrl(
    pick({
      pl: "Dzień dobry Elart Cleaning! Wysyłam zdjęcie — proszę o ocenę zakresu pracy i wycenę.",
      en: "Hello Elart Cleaning! I'm sending a photo — please assess the scope of work and quote.",
    }),
  );

  return (
    <section id="efekty" className="bg-cream py-section-lg">
      <Container className="space-y-10 md:space-y-12">
        {/* heading */}
        <div className="flex flex-col items-center gap-5 text-center">
          <Chip>{pick(t("Efekty przed i po", "Before & after"))}</Chip>
          <h2 className="font-display text-[clamp(2.25rem,6vw,5rem)] font-bold uppercase leading-[0.9] tracking-[-0.02em] text-ink text-balance">
            {pick(t("Efekty przed i po", "Before & after"))}
          </h2>
          <p className="max-w-col-5 text-b1 leading-relaxed text-ink/64">
            {pick(
              t(
                "Zobacz realne rezultaty sprzątania, chemicznego prania tapicerki i przygotowania pomieszczeń. Przesuń suwak, aby porównać stan przed i po naszej pracy.",
                "See real results of cleaning, upholstery washing and room prep. Drag the slider to compare the state before and after our work.",
              ),
            )}
          </p>
        </div>

        {/* filters */}
        <div className="flex flex-wrap justify-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setActive(f.id)}
              aria-pressed={active === f.id}
              className={cn(
                "rounded-full border px-4 py-2 text-b3 font-semibold transition",
                active === f.id
                  ? "border-ink bg-ink text-paper"
                  : "border-ink/10 bg-surface text-ink hover:border-ink/40",
              )}
            >
              {pick(f.label)}
            </button>
          ))}
        </div>

        {/* cards */}
        <FadeUp className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {filtered.map((item) => (
            <CaseCard key={item.id} item={item} />
          ))}
        </FadeUp>

        {/* final CTA */}
        <div className="relative overflow-hidden rounded-4xl border border-ink/8 bg-gradient-to-br from-burgundy-800 via-burgundy-800 to-burgundy-900 px-6 py-10 md:px-12 md:py-12">
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 18% 20%, #CCB170 0, transparent 42%), radial-gradient(circle at 82% 85%, #CCB170 0, transparent 38%)",
            }}
          />
          <div className="relative flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
            <div className="max-w-col-5 space-y-2">
              <h3 className="font-display text-[clamp(1.5rem,3.2vw,2.25rem)] font-bold leading-tight text-paper text-balance">
                {pick(t("Chcesz zobaczyć taki efekt u siebie?", "Want a result like this at your place?"))}
              </h3>
              <p className="text-b2 leading-relaxed text-paper/72">
                {pick(
                  t(
                    "Napisz do nas i wyślij zdjęcie — ocenimy zakres pracy.",
                    "Message us and send a photo — we'll assess the scope of work.",
                  ),
                )}
              </p>
            </div>
            <PrimaryButton
              href={finalWa}
              target="_blank"
              rel="noopener"
              size="lg"
              icon={<MessageCircle size={16} strokeWidth={2.4} />}
            >
              {pick(t("Wyślij zdjęcie przez WhatsApp", "Send a photo via WhatsApp"))}
            </PrimaryButton>
          </div>
        </div>
      </Container>
    </section>
  );
}

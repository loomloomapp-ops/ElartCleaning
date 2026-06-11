"use client";

import * as React from "react";
import { MoveHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { Container, Chip } from "@/components/primitives";
import { SafeImage } from "@/components/primitives/SafeImage";
import { useI18n } from "@/lib/i18n";
import { UI } from "@/lib/content";
import { cn } from "@/lib/utils";

type Bi = { pl: string; en: string };
const t = (pl: string, en: string): Bi => ({ pl, en });

type Pair = { id: string; before: string; after: string };

const PAIRS: Pair[] = [
  { id: "ba-1", before: "/cleaning/ba-1-before.jpg", after: "/cleaning/ba-1-after.jpg" },
  { id: "ba-2", before: "/cleaning/ba-2-before.jpg", after: "/cleaning/ba-2-after.jpg" },
  { id: "ba-3", before: "/cleaning/ba-3-before.jpg", after: "/cleaning/ba-3-after.jpg" },
  { id: "ba-4", before: "/cleaning/ba-4-before.jpg", after: "/cleaning/ba-4-after.jpg" },
  { id: "ba-5", before: "/cleaning/ba-5-before.jpg", after: "/cleaning/ba-5-after.jpg" },
  { id: "ba-6", before: "/cleaning/ba-6-before.jpg", after: "/cleaning/ba-6-after.jpg" },
  { id: "ba-7", before: "/cleaning/ba-7-before.jpg", after: "/cleaning/ba-7-after.jpg" },
  { id: "ba-8", before: "/cleaning/ba-8-before.jpg", after: "/cleaning/ba-8-after.jpg" },
];

/* ---------- before/after slider (pointer + touch + keyboard) ---------- */

const START_POS = 55;

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
  const containerRef = React.useRef<HTMLDivElement>(null);
  const beforeRef = React.useRef<HTMLDivElement>(null);
  const dividerRef = React.useRef<HTMLDivElement>(null);
  const handleRef = React.useRef<HTMLDivElement>(null);
  const dragging = React.useRef(false);
  const posRef = React.useRef(START_POS);
  const rectRef = React.useRef<DOMRect | null>(null);
  const rafRef = React.useRef(0);
  const pendingX = React.useRef(0);

  // Write straight to the DOM — no React re-render per move (smooth on mobile).
  const apply = React.useCallback((p: number) => {
    const clamped = Math.min(100, Math.max(0, p));
    posRef.current = clamped;
    if (beforeRef.current) beforeRef.current.style.clipPath = `inset(0 ${100 - clamped}% 0 0)`;
    if (dividerRef.current) dividerRef.current.style.left = `${clamped}%`;
    handleRef.current?.setAttribute("aria-valuenow", String(Math.round(clamped)));
  }, []);

  // Coalesce many pointermove events into one paint per animation frame.
  const schedule = React.useCallback(
    (clientX: number) => {
      pendingX.current = clientX;
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        const rect = rectRef.current;
        if (!rect || rect.width === 0) return;
        apply(((pendingX.current - rect.left) / rect.width) * 100);
      });
    },
    [apply],
  );

  // Global listeners so the drag keeps following the finger even when it
  // slips off the handle/container — far more reliable on touch than capture.
  const onWindowMove = React.useCallback(
    (e: PointerEvent) => {
      if (!dragging.current) return;
      schedule(e.clientX);
    },
    [schedule],
  );
  const endDrag = React.useCallback(() => {
    dragging.current = false;
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }
    window.removeEventListener("pointermove", onWindowMove);
    window.removeEventListener("pointerup", endDrag);
    window.removeEventListener("pointercancel", endDrag);
  }, [onWindowMove]);

  const onPointerDown = (e: React.PointerEvent) => {
    e.preventDefault(); // stop text/image selection + scroll from stealing the gesture
    dragging.current = true;
    rectRef.current = containerRef.current?.getBoundingClientRect() ?? null; // cache once per drag
    schedule(e.clientX);
    window.addEventListener("pointermove", onWindowMove);
    window.addEventListener("pointerup", endDrag);
    window.addEventListener("pointercancel", endDrag);
  };

  React.useEffect(() => endDrag, [endDrag]); // cleanup on unmount
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") apply(posRef.current - 4);
    if (e.key === "ArrowRight") apply(posRef.current + 4);
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={onPointerDown}
      className="ba-slider relative w-full cursor-ew-resize select-none overflow-hidden rounded-3xl bg-cream-deep shadow-card"
      style={{ aspectRatio: "3/4", touchAction: "none" }}
    >
      {/* AFTER (full) */}
      <SafeImage src={after} alt={afterLabel} ratio="3/4" className="absolute inset-0 h-full w-full" />

      {/* BEFORE (clipped from the left, shown as-is) */}
      <div
        ref={beforeRef}
        className="absolute inset-0 will-change-[clip-path] [transform:translateZ(0)] [backface-visibility:hidden]"
        style={{ clipPath: `inset(0 ${100 - START_POS}% 0 0)` }}
        aria-hidden
      >
        <SafeImage src={before} alt={beforeLabel} ratio="3/4" className="absolute inset-0 h-full w-full" />
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
        ref={dividerRef}
        className="absolute inset-y-0 z-20 w-0.5 -translate-x-1/2 bg-paper/90 will-change-[left] shadow-[0_0_0_1px_rgba(27,4,8,0.15)]"
        style={{ left: `${START_POS}%` }}
        aria-hidden
      >
        <div
          ref={handleRef}
          role="slider"
          tabIndex={0}
          aria-label={`${beforeLabel} / ${afterLabel}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={START_POS}
          onKeyDown={onKeyDown}
          className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-ink/10 bg-surface text-burgundy-700 shadow-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <MoveHorizontal size={18} strokeWidth={2.2} />
        </div>
      </div>
    </div>
  );
}

/* ---------- section ---------- */

export function BeforeAfter() {
  const { pick } = useI18n();
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [index, setIndex] = React.useState(0);

  const goTo = React.useCallback((i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(PAIRS.length - 1, i));
    const child = track.children[clamped] as HTMLElement | undefined;
    if (child) track.scrollTo({ left: child.offsetLeft - track.offsetLeft, behavior: "smooth" });
  }, []);

  const onScroll = React.useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    let closest = 0;
    let min = Infinity;
    Array.from(track.children).forEach((c, i) => {
      const d = Math.abs((c as HTMLElement).offsetLeft - track.offsetLeft - track.scrollLeft);
      if (d < min) {
        min = d;
        closest = i;
      }
    });
    setIndex(closest);
  }, []);

  return (
    <section id="efekty" className="bg-cream py-section-lg">
      <Container className="space-y-8 md:space-y-10">
        {/* heading */}
        <div className="flex flex-col items-center gap-5 text-center">
          <Chip>{pick(t("Efekty przed i po", "Before & after"))}</Chip>
          <h2 className="font-display text-[clamp(2.25rem,6vw,5rem)] font-bold uppercase leading-[0.9] tracking-[-0.02em] text-ink text-balance">
            {pick(t("Efekty przed i po", "Before & after"))}
          </h2>
        </div>

        {/* slider track */}
        <div
          ref={trackRef}
          onScroll={onScroll}
          className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-4 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:px-0"
        >
          {PAIRS.map((p) => (
            <div
              key={p.id}
              className="w-[82%] shrink-0 snap-center sm:w-[360px] lg:w-[400px]"
            >
              <BaSlider
                before={p.before}
                after={p.after}
                beforeLabel={pick(UI.before)}
                afterLabel={pick(UI.after)}
              />
            </div>
          ))}
        </div>

        {/* controls: arrows + dots */}
        <div className="flex items-center justify-center gap-5">
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
            aria-label={pick(t("Poprzedni", "Previous"))}
            className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 bg-surface text-ink transition hover:border-ink/40 disabled:opacity-30 active:scale-95"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex items-center gap-2">
            {PAIRS.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`${i + 1}`}
                aria-current={i === index}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  i === index ? "w-6 bg-ink" : "w-2 bg-ink/25 hover:bg-ink/40",
                )}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => goTo(index + 1)}
            disabled={index === PAIRS.length - 1}
            aria-label={pick(t("Następny", "Next"))}
            className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 bg-surface text-ink transition hover:border-ink/40 disabled:opacity-30 active:scale-95"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </Container>
    </section>
  );
}

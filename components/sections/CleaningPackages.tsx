"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Info, ArrowUpRight } from "lucide-react";
import { Container, Chip } from "@/components/primitives";
import { PrimaryButton } from "@/components/cta";
import {
  CLEANING_PACKAGES,
  PACKAGES_HEADING,
  PACKAGES_UI,
  type CleaningPackage,
} from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { cn } from "@/lib/utils";
import { buildWhatsAppUrl, packageQuoteMessage } from "@/lib/whatsapp";

/**
 * Pakiety sprzątania mieszkań — najczęściej wybierane usługi.
 * Każda karta pokazuje cenę i skrócony zakres; przycisk "Szczegóły"
 * otwiera popup z pełnym zakresem pakietu oraz CTA na WhatsApp.
 */
export function CleaningPackages() {
  const { pick } = useI18n();
  const [openKey, setOpenKey] = React.useState<string | null>(null);
  const active = CLEANING_PACKAGES.find((p) => p.key === openKey) ?? null;

  return (
    <section id="pakiety" className="bg-paper py-section-md scroll-mt-24">
      <Container>
        <div className="rounded-[2rem] bg-cream-deep px-5 md:px-10 lg:px-14 py-10 md:py-14 lg:py-16">
          {/* Heading */}
          <div className="flex flex-col items-center text-center gap-4 max-w-col-6 mx-auto mb-8 md:mb-12">
            <Chip tone="surface">{pick(PACKAGES_HEADING.chip)}</Chip>
            <h2 className="font-display font-bold uppercase leading-[0.9] tracking-[-0.02em] text-ink text-[clamp(2rem,5.5vw,4.5rem)]">
              {pick(PACKAGES_HEADING.title)}
            </h2>
            <p className="text-b1 text-ink/64 max-w-col-4">{pick(PACKAGES_HEADING.subtitle)}</p>
          </div>

          {/* Cards */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CLEANING_PACKAGES.map((p) => (
              <PackageCard key={p.key} pkg={p} onOpen={() => setOpenKey(p.key)} />
            ))}
          </div>
        </div>
      </Container>

      <PackageDialog
        pkg={active}
        open={active != null}
        onOpenChange={(v) => !v && setOpenKey(null)}
      />
    </section>
  );
}

/* ----------------------------- Card ----------------------------- */

function PackageCard({ pkg, onOpen }: { pkg: CleaningPackage; onOpen: () => void }) {
  const { pick } = useI18n();
  const highlight = pkg.highlight;

  // Skrócony podgląd: pierwsze pozycje pierwszej grupy (bez wiersza "Wszystko z…").
  const preview = pkg.groups[0].items
    .filter((i) => !pick(i).toLowerCase().startsWith("wszystko") && !pick(i).toLowerCase().startsWith("everything"))
    .slice(0, 4);

  return (
    <div
      className={cn(
        "relative flex flex-col rounded-3xl p-7 lg:p-8 transition-transform duration-300",
        highlight ? "bg-ink text-paper" : "bg-surface text-ink",
      )}
    >
      {highlight ? (
        <span className="absolute right-6 top-6 rounded-full bg-accent text-ink text-label-2 font-bold uppercase px-2.5 py-1">
          {pick(PACKAGES_UI.popular)}
        </span>
      ) : null}

      <div className="flex flex-col gap-1.5 pr-24">
        <span className="font-display font-bold uppercase text-h6 leading-tight">{pick(pkg.name)}</span>
        <span className={cn("text-b3 leading-snug", highlight ? "text-paper/64" : "text-ink/56")}>
          {pick(pkg.tagline)}
        </span>
      </div>

      <div className="mt-5 flex items-baseline gap-2">
        <span className="font-display font-bold leading-none text-[clamp(2.2rem,4vw,2.9rem)]">
          {pick(pkg.price)}
        </span>
        <span className={cn("text-b3", highlight ? "text-paper/64" : "text-ink/56")}>
          {pick(pkg.unit)}
        </span>
      </div>

      {pkg.addons.length ? (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {pkg.addons.map((a, i) => (
            <span
              key={i}
              className={cn(
                "rounded-full px-2.5 py-1 text-label-2 font-semibold",
                highlight ? "bg-paper/12 text-paper/80" : "bg-cream-deep text-ink/72",
              )}
            >
              {pick(a)}
            </span>
          ))}
        </div>
      ) : null}

      <ul className="mt-5 flex flex-col gap-2.5 flex-1">
        {preview.map((f, idx) => (
          <li key={idx} className="flex items-start gap-2 text-b3">
            <span
              className={cn(
                "mt-0.5 grid h-5 w-5 place-items-center rounded-full shrink-0",
                highlight ? "bg-accent text-ink" : "bg-cream-deep text-ink",
              )}
            >
              <Check size={12} strokeWidth={3} />
            </span>
            <span className={highlight ? "text-paper/82" : "text-ink/80"}>{pick(f)}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={onOpen}
        className={cn(
          "group mt-6 inline-flex items-center justify-center gap-2 rounded-pill px-5 py-3.5 text-[14px] font-display font-bold uppercase leading-none",
          "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98]",
          highlight
            ? "bg-accent text-ink hover:bg-paper"
            : "bg-ink text-paper hover:bg-burgundy-700",
        )}
      >
        <Info size={16} strokeWidth={2.2} />
        {pick(PACKAGES_UI.details)}
      </button>
    </div>
  );
}

/* ---------------------------- Dialog ---------------------------- */

function PackageDialog({
  pkg,
  open,
  onOpenChange,
}: {
  pkg: CleaningPackage | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const { pick, lang } = useI18n();
  useLockBodyScroll(open);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && pkg && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 z-[80] bg-burgundy-900/70 backdrop-blur-sm"
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <div className="fixed inset-0 z-[90] grid place-items-center p-4 pointer-events-none">
                <motion.div
                  initial={{ opacity: 0, y: 24, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="pointer-events-auto w-[min(640px,100%)] max-h-[92dvh] overflow-y-auto rounded-3xl bg-paper shadow-card outline-none"
                >
                  {/* Header */}
                  <div className="sticky top-0 z-10 flex items-start justify-between gap-4 bg-paper/95 backdrop-blur px-6 md:px-8 pt-6 pb-4 border-b border-ink/8">
                    <div className="space-y-1.5">
                      <Dialog.Title className="font-display font-bold uppercase text-2xl md:text-3xl leading-tight text-ink">
                        {pick(pkg.name)}
                      </Dialog.Title>
                      <Dialog.Description className="text-ink/64 text-sm md:text-base">
                        {pick(pkg.tagline)}
                      </Dialog.Description>
                      <div className="flex items-baseline gap-2 pt-1">
                        <span className="font-display font-bold text-burgundy-700 text-[1.7rem] leading-none">
                          {pick(pkg.price)}
                        </span>
                        <span className="text-b3 text-ink/56">{pick(pkg.unit)}</span>
                      </div>
                    </div>
                    <Dialog.Close
                      aria-label={lang === "pl" ? "Zamknij" : "Close"}
                      className="rounded-full p-2 text-ink/60 hover:text-burgundy-700 transition shrink-0"
                    >
                      <X size={20} />
                    </Dialog.Close>
                  </div>

                  {/* Body */}
                  <div className="px-6 md:px-8 py-6 flex flex-col gap-7">
                    {pkg.addons.length ? (
                      <div className="flex flex-wrap gap-1.5">
                        {pkg.addons.map((a, i) => (
                          <span
                            key={i}
                            className="rounded-full bg-cream-deep px-3 py-1 text-label-1 font-semibold text-ink/72"
                          >
                            {pick(a)}
                          </span>
                        ))}
                      </div>
                    ) : null}

                    {pkg.groups.map((g, gi) => (
                      <div key={gi}>
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-label-1 font-bold uppercase tracking-[0.12em] text-gold-600">
                            {pick(g.label)}
                          </span>
                          <span aria-hidden className="h-px flex-1 bg-ink/10" />
                        </div>
                        <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                          {g.items.map((it, ii) => (
                            <li key={ii} className="flex items-start gap-2 text-b3 text-ink/80">
                              <span className="mt-0.5 grid h-5 w-5 place-items-center rounded-full bg-cream-deep text-ink shrink-0">
                                <Check size={12} strokeWidth={3} />
                              </span>
                              <span>{pick(it)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}

                    {pkg.perks?.length ? (
                      <div className="rounded-2xl bg-cream-deep px-5 py-4">
                        <span className="text-label-1 font-bold uppercase tracking-[0.12em] text-gold-600">
                          {pick(PACKAGES_UI.perksLabel)}
                        </span>
                        <ul className="mt-3 flex flex-col gap-2">
                          {pkg.perks.map((it, ii) => (
                            <li key={ii} className="flex items-start gap-2 text-b3 text-ink/80">
                              <span className="mt-0.5 grid h-5 w-5 place-items-center rounded-full bg-accent text-ink shrink-0">
                                <Check size={12} strokeWidth={3} />
                              </span>
                              <span>{pick(it)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    {pkg.footnote ? (
                      <p className="text-b3 italic text-ink/56">{pick(pkg.footnote)}</p>
                    ) : null}

                    {pkg.notes.length ? (
                      <div className="rounded-2xl border border-ink/10 px-5 py-4">
                        <span className="text-label-1 font-bold uppercase tracking-[0.12em] text-ink/56">
                          {pick(PACKAGES_UI.notesLabel)}
                        </span>
                        <ul className="mt-3 flex flex-col gap-2">
                          {pkg.notes.map((it, ii) => (
                            <li key={ii} className="flex items-start gap-2 text-b3 text-ink/64">
                              <span aria-hidden className="mt-2 h-1 w-1 rounded-full bg-ink/40 shrink-0" />
                              <span>{pick(it)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>

                  {/* Footer CTA */}
                  <div className="sticky bottom-0 bg-paper/95 backdrop-blur border-t border-ink/8 px-6 md:px-8 py-4">
                    <PrimaryButton
                      href={buildWhatsAppUrl(packageQuoteMessage(pick(pkg.name), pick(pkg.price), lang))}
                      target="_blank"
                      rel="noopener"
                      className="w-full justify-center"
                      icon={<ArrowUpRight size={16} strokeWidth={2.4} />}
                    >
                      {pick(PACKAGES_UI.whatsapp)}
                    </PrimaryButton>
                  </div>
                </motion.div>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { FORM, POPUP, UI } from "@/lib/content";
import { Eyebrow, GoldDivider } from "@/components/primitives";
import { PrimaryButton } from "@/components/cta";
import { buildWhatsAppUrl, buildMailto } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().min(7).regex(/^[+()\-\s0-9]+$/),
  email: z.string().email().optional().or(z.literal("")),
  message: z.string().optional(),
  rodo: z.literal(true),
});

type Values = z.infer<typeof schema>;

export function PopupForm({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const { pick, lang } = useI18n();
  const [submitted, setSubmitted] = React.useState<"idle" | "ok" | "err">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Values>({ resolver: zodResolver(schema), defaultValues: { rodo: false as unknown as true } });

  const onSubmit = async (data: Values) => {
    try {
      const msg = `${pick(POPUP.title)} — ${data.name}\n${pick(FORM.phone)}: ${data.phone}` +
        (data.email ? `\n${pick(FORM.email)}: ${data.email}` : "") +
        (data.message ? `\n${pick(FORM.message)}: ${data.message}` : "");
      window.open(buildWhatsAppUrl(msg), "_blank", "noopener");
      setSubmitted("ok");
      reset();
      setTimeout(() => onOpenChange(false), 1500);
    } catch {
      setSubmitted("err");
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
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
                className="pointer-events-auto w-[min(560px,100%)] max-h-[92dvh] overflow-y-auto rounded-3xl bg-paper p-6 md:p-8 shadow-card outline-none"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <Eyebrow>{pick(UI.fastQuote)}</Eyebrow>
                    <Dialog.Title className="font-display text-2xl md:text-3xl leading-tight">
                      {pick(POPUP.title)}
                    </Dialog.Title>
                    <Dialog.Description className="text-ink/70 text-sm md:text-base">
                      {pick(POPUP.subtitle)}
                    </Dialog.Description>
                  </div>
                  <Dialog.Close
                    aria-label={pick(UI.close)}
                    className="rounded-full p-2 text-ink/60 hover:text-burgundy-700 transition"
                  >
                    <X size={20} />
                  </Dialog.Close>
                </div>

                <GoldDivider className="mt-5" />

                <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4">
                  <Field
                    label={pick(FORM.name)}
                    error={errors.name && pick(FORM.required)}
                  >
                    <input
                      type="text"
                      autoComplete="name"
                      {...register("name")}
                      className={inputCls}
                    />
                  </Field>
                  <Field
                    label={pick(FORM.phone)}
                    error={errors.phone && pick(FORM.invalidPhone)}
                  >
                    <input
                      type="tel"
                      autoComplete="tel"
                      placeholder="+48 ___ ___ ___"
                      {...register("phone")}
                      className={inputCls}
                    />
                  </Field>
                  <Field
                    label={pick(FORM.email)}
                    error={errors.email && pick(FORM.invalidEmail)}
                  >
                    <input
                      type="email"
                      autoComplete="email"
                      {...register("email")}
                      className={inputCls}
                    />
                  </Field>
                  <Field label={pick(FORM.message)}>
                    <textarea rows={3} {...register("message")} className={cn(inputCls, "resize-none")} />
                  </Field>

                  <label className="flex items-start gap-3 text-xs text-ink/70 leading-relaxed">
                    <input
                      type="checkbox"
                      {...register("rodo")}
                      className="mt-0.5 h-4 w-4 accent-burgundy-700"
                    />
                    <span>{pick(FORM.rodo)}</span>
                  </label>
                  {errors.rodo && (
                    <p className="text-xs text-burgundy-700">{pick(FORM.required)}</p>
                  )}

                  {submitted === "ok" && (
                    <div className="rounded-2xl bg-cream p-3 text-sm text-ink">
                      {pick(FORM.success)}
                    </div>
                  )}
                  {submitted === "err" && (
                    <div className="rounded-2xl bg-burgundy-700/10 p-3 text-sm text-burgundy-700">
                      {pick(FORM.error)}
                    </div>
                  )}

                  <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                    <PrimaryButton type="submit" disabled={isSubmitting}>
                      {pick(FORM.submit)}
                    </PrimaryButton>
                    <span className="text-xs text-ink/60 inline-flex items-center gap-2">
                      <MessageCircle size={14} className="text-burgundy-700" />
                      {pick(POPUP.whatsappAlt)}
                    </span>
                  </div>

                  <noscript>
                    <a href={buildMailto(pick(POPUP.title), "")} className="text-burgundy-700 underline text-sm">
                      {pick(FORM.submit)}
                    </a>
                  </noscript>
                </form>
              </motion.div>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

const inputCls =
  "w-full rounded-2xl border border-ink/15 bg-paper px-4 py-3 text-ink placeholder:text-ink/40 outline-none transition focus:border-burgundy-700 focus:ring-2 focus:ring-burgundy-700/15";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string | undefined | false;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium uppercase tracking-[0.12em] text-ink/60">
        {label}
      </label>
      {children}
      {error ? <p className="text-xs text-burgundy-700">{error}</p> : null}
    </div>
  );
}

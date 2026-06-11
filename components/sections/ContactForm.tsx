"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Phone, Mail, Instagram, MessageCircle } from "lucide-react";
import { Container, SectionHeading, Eyebrow, GoldDivider } from "@/components/primitives";
import { PrimaryButton } from "@/components/cta";
import { FadeUp } from "@/components/motion";
import { FORM, HEADINGS, SERVICES, UI } from "@/lib/content";
import { BRAND } from "@/lib/constants";
import { useI18n } from "@/lib/i18n";
import { buildMailto, buildWhatsAppUrl, defaultQuoteMessage } from "@/lib/whatsapp";
import { sendLead } from "@/lib/lead";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().min(7).regex(/^[+()\-\s0-9]+$/),
  email: z.string().email(),
  service: z.string().min(1),
  message: z.string().min(5),
  company: z.string().optional(), // honeypot
  rodo: z.literal(true),
});
type Values = z.infer<typeof schema>;

export function ContactForm() {
  const { pick, lang } = useI18n();
  const [state, setState] = React.useState<"idle" | "ok" | "err">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Values>({ resolver: zodResolver(schema), defaultValues: { rodo: false as unknown as true } });

  const onSubmit = async (data: Values) => {
    const ok = await sendLead({
      name: data.name,
      phone: data.phone,
      email: data.email,
      service: data.service,
      message: data.message,
      source: "Formularz kontaktowy",
      company: data.company,
    });
    if (ok) {
      setState("ok");
      reset();
      return;
    }
    // Fallback so the lead is never lost (also covers local dev without PHP).
    try {
      const subject = `Elart Cleaning — ${data.service}`;
      const body = `${pick(FORM.name)}: ${data.name}\n${pick(FORM.phone)}: ${data.phone}\n${pick(FORM.email)}: ${data.email}\n${pick(FORM.service)}: ${data.service}\n\n${pick(FORM.message)}:\n${data.message}`;
      window.location.href = buildMailto(subject, body);
      setState("ok");
      reset();
    } catch {
      setState("err");
    }
  };

  return (
    <section id="kontakt" className="bg-burgundy-800 text-paper py-28 md:py-40">
      <Container className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        <div className="space-y-10">
          <SectionHeading
            eyebrow={pick(HEADINGS.contact)}
            title={pick(HEADINGS.contact)}
            subtitle={pick(HEADINGS.contactSub)}
            tone="white"
            align="left"
          />
          <GoldDivider />

          <ul className="space-y-4 text-paper/85">
            <li>
              <a href={`tel:${BRAND.phoneTel}`} className="group flex items-center gap-4 hover:text-gold-500 transition">
                <span className="grid h-12 w-12 place-items-center rounded-full border border-paper/15 text-gold-500 transition group-hover:bg-gold-500 group-hover:text-burgundy-900 group-hover:border-gold-500">
                  <Phone size={18} />
                </span>
                <span>
                  <Eyebrow tone="white">{pick(UI.call)}</Eyebrow>
                  <span className="block font-display text-xl">{BRAND.phone}</span>
                </span>
              </a>
            </li>
            <li>
              <a
                href={buildWhatsAppUrl(defaultQuoteMessage(lang))}
                target="_blank"
                rel="noopener"
                className="group flex items-center gap-4 hover:text-gold-500 transition"
              >
                <span className="grid h-12 w-12 place-items-center rounded-full border border-paper/15 text-gold-500 transition group-hover:bg-gold-500 group-hover:text-burgundy-900 group-hover:border-gold-500">
                  <MessageCircle size={18} />
                </span>
                <span>
                  <Eyebrow tone="white">WhatsApp</Eyebrow>
                  <span className="block font-display text-xl">{BRAND.phone}</span>
                </span>
              </a>
            </li>
            <li>
              <a href={`mailto:${BRAND.email}`} className="group flex items-center gap-4 hover:text-gold-500 transition">
                <span className="grid h-12 w-12 place-items-center rounded-full border border-paper/15 text-gold-500 transition group-hover:bg-gold-500 group-hover:text-burgundy-900 group-hover:border-gold-500">
                  <Mail size={18} />
                </span>
                <span>
                  <Eyebrow tone="white">{pick(UI.email)}</Eyebrow>
                  <span className="block font-display text-xl">{BRAND.email}</span>
                </span>
              </a>
            </li>
            <li>
              <a
                href={BRAND.instagram}
                target="_blank"
                rel="noopener"
                className="group flex items-center gap-4 hover:text-gold-500 transition"
              >
                <span className="grid h-12 w-12 place-items-center rounded-full border border-paper/15 text-gold-500 transition group-hover:bg-gold-500 group-hover:text-burgundy-900 group-hover:border-gold-500">
                  <Instagram size={18} />
                </span>
                <span>
                  <Eyebrow tone="white">Instagram</Eyebrow>
                  <span className="block font-display text-xl">@elart_cleaning</span>
                </span>
              </a>
            </li>
          </ul>
        </div>

        <FadeUp>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 rounded-3xl bg-paper text-ink p-7 md:p-10 lg:p-12 shadow-card border border-paper/10"
          >
            {/* honeypot — hidden from humans, catches bots */}
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              {...register("company")}
              className="absolute left-[-9999px] h-0 w-0 opacity-0"
            />
            <div className="grid md:grid-cols-2 gap-4">
              <Field label={pick(FORM.name)} error={errors.name && pick(FORM.required)}>
                <input type="text" autoComplete="name" {...register("name")} className={inputCls} />
              </Field>
              <Field label={pick(FORM.phone)} error={errors.phone && pick(FORM.invalidPhone)}>
                <input
                  type="tel"
                  autoComplete="tel"
                  placeholder="+48 ___ ___ ___"
                  {...register("phone")}
                  className={inputCls}
                />
              </Field>
            </div>
            <Field label={pick(FORM.email)} error={errors.email && pick(FORM.invalidEmail)}>
              <input type="email" autoComplete="email" {...register("email")} className={inputCls} />
            </Field>
            <Field label={pick(FORM.service)} error={errors.service && pick(FORM.required)}>
              <select {...register("service")} className={cn(inputCls, "appearance-none pr-10")}>
                <option value="">—</option>
                {SERVICES.map((s) => (
                  <option key={s.slug} value={pick(s.title)}>
                    {pick(s.title)}
                  </option>
                ))}
              </select>
            </Field>
            <Field label={pick(FORM.message)} error={errors.message && pick(FORM.required)}>
              <textarea rows={4} {...register("message")} className={cn(inputCls, "resize-none")} />
            </Field>

            <label className="flex items-start gap-3 text-xs text-ink/70 leading-relaxed">
              <input type="checkbox" {...register("rodo")} className="mt-0.5 h-4 w-4 accent-burgundy-700" />
              <span>{pick(FORM.rodo)}</span>
            </label>
            {errors.rodo && <p className="text-xs text-burgundy-700">{pick(FORM.required)}</p>}

            {state === "ok" && (
              <div className="rounded-2xl bg-cream p-3 text-sm text-ink">{pick(FORM.success)}</div>
            )}
            {state === "err" && (
              <div className="rounded-2xl bg-burgundy-700/10 p-3 text-sm text-burgundy-700">{pick(FORM.error)}</div>
            )}

            <div className="pt-2">
              <PrimaryButton type="submit" disabled={isSubmitting}>
                {pick(FORM.submit)}
              </PrimaryButton>
            </div>
          </form>
        </FadeUp>
      </Container>
    </section>
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
      <label className="block text-xs font-medium uppercase tracking-[0.12em] text-ink/60">{label}</label>
      {children}
      {error ? <p className="text-xs text-burgundy-700">{error}</p> : null}
    </div>
  );
}

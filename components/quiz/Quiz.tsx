"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, MessageCircle, Mail } from "lucide-react";
import { Container, SectionHeading, Eyebrow, GoldDivider } from "@/components/primitives";
import { FadeUp } from "@/components/motion";
import { PrimaryButton, SecondaryButton } from "@/components/cta";
import { QUIZ, HEADINGS } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { buildQuizMessage, buildWhatsAppUrl, buildMailto, type QuizAnswers } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

type State = {
  current: number;
  answers: Array<string | string[]>;
  name: string;
  phone: string;
  email: string;
  message: string;
  rodo: boolean;
  err: string | null;
};

const initial: State = {
  current: 0,
  answers: [],
  name: "",
  phone: "",
  email: "",
  message: "",
  rodo: false,
  err: null,
};

export function QuizSection() {
  const { pick, lang } = useI18n();
  const [s, setS] = React.useState<State>(initial);
  const total = QUIZ.steps.length + 1;
  const progress = ((s.current + 1) / total) * 100;

  const step = QUIZ.steps[s.current];
  const isContact = s.current === QUIZ.steps.length;

  const select = (value: string) => {
    if (!step) return;
    const next = [...s.answers];
    if (step.multi) {
      const arr = (next[s.current] as string[]) ?? [];
      next[s.current] = arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
    } else {
      next[s.current] = value;
    }
    setS({ ...s, answers: next });
  };

  const canAdvance = () => {
    if (isContact) return s.name.length > 1 && /^[+()\-\s0-9]{7,}$/.test(s.phone) && s.rodo;
    const cur = s.answers[s.current];
    if (!cur) return false;
    if (Array.isArray(cur)) return cur.length > 0;
    return true;
  };

  const stepError = pick({
    pl: step?.multi ? "Wybierz co najmniej jedną opcję" : "Wybierz jedną z opcji",
    en: step?.multi ? "Pick at least one option" : "Pick one option",
  });
  const contactError = pick({
    pl: "Podaj imię, telefon i zaakceptuj politykę prywatności",
    en: "Provide name, phone and accept the privacy policy",
  });

  const advance = () => {
    if (!canAdvance()) {
      setS({ ...s, err: isContact ? contactError : stepError });
      return;
    }
    setS({ ...s, current: Math.min(s.current + 1, total - 1), err: null });
  };

  const back = () => setS({ ...s, current: Math.max(s.current - 1, 0), err: null });

  const build = (): QuizAnswers => {
    const pickAnswer = (i: number) => {
      const a = s.answers[i];
      if (!a) return "—";
      if (Array.isArray(a)) return a.join(", ");
      return a;
    };
    return {
      service: pickAnswer(0),
      object: pickAnswer(1),
      area: pickAnswer(2),
      timing: pickAnswer(3),
      extras: (s.answers[4] as string[]) ?? [],
      name: s.name,
      phone: s.phone,
      email: s.email || undefined,
      message: s.message || undefined,
    };
  };

  const submitWhatsApp = () => {
    if (!canAdvance()) {
      setS({ ...s, err: contactError });
      return;
    }
    const msg = buildQuizMessage(build(), lang);
    window.open(buildWhatsAppUrl(msg), "_blank", "noopener");
  };

  const submitEmail = () => {
    if (!canAdvance()) {
      setS({ ...s, err: contactError });
      return;
    }
    const msg = buildQuizMessage(build(), lang);
    window.location.href = buildMailto(pick(QUIZ.title), msg);
  };

  return (
    <section className="bg-burgundy-700 text-paper py-24 md:py-32 relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 10%, rgba(204,177,112,0.6) 0, transparent 40%), radial-gradient(circle at 90% 90%, rgba(204,177,112,0.3) 0, transparent 45%)",
        }}
      />
      <Container className="relative space-y-10">
        <SectionHeading
          eyebrow={pick(HEADINGS.quiz)}
          title={pick(QUIZ.title)}
          subtitle={pick(QUIZ.subtitle)}
          tone="white"
          align="center"
        />

        <FadeUp className="mx-auto max-w-2xl rounded-3xl bg-paper text-ink p-6 md:p-8 shadow-card">
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-ink/55">
            <span>
              {pick(QUIZ.step)} {s.current + 1} {pick(QUIZ.of)} {total}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="mt-2 h-1.5 w-full rounded-full bg-ink/10 overflow-hidden">
            <motion.div
              className="h-full bg-burgundy-700"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          <div className="mt-6 min-h-[280px]">
            <AnimatePresence mode="wait">
              {!isContact && step ? (
                <motion.div
                  key={`q-${s.current}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-4"
                >
                  <h3 className="font-display text-2xl md:text-3xl leading-tight">
                    {pick(step.q)}
                  </h3>
                  <GoldDivider />
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {step.options.map((opt, i) => {
                      const value = pick(opt);
                      const current = s.answers[s.current];
                      const selected = Array.isArray(current)
                        ? current.includes(value)
                        : current === value;
                      return (
                        <li key={i}>
                          <button
                            type="button"
                            onClick={() => select(value)}
                            className={cn(
                              "w-full text-left rounded-2xl border px-4 py-3 text-sm transition flex items-center justify-between gap-3",
                              selected
                                ? "border-burgundy-700 bg-burgundy-700 text-paper"
                                : "border-ink/15 hover:border-burgundy-700/40 text-ink",
                            )}
                          >
                            <span>{value}</span>
                            {selected ? (
                              <span className="grid h-5 w-5 place-items-center rounded-full bg-gold-500 text-burgundy-900">
                                <Check size={12} strokeWidth={3} />
                              </span>
                            ) : (
                              <span className="grid h-5 w-5 place-items-center rounded-full border border-ink/20" />
                            )}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </motion.div>
              ) : (
                <motion.div
                  key="contact"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-4"
                >
                  <h3 className="font-display text-2xl md:text-3xl leading-tight">
                    {pick(QUIZ.contact.title)}
                  </h3>
                  <GoldDivider />
                  <div className="grid sm:grid-cols-2 gap-3">
                    <input
                      placeholder={pick(QUIZ.contact.name)}
                      value={s.name}
                      onChange={(e) => setS({ ...s, name: e.target.value })}
                      className={quizInput}
                    />
                    <input
                      placeholder={pick(QUIZ.contact.phone)}
                      value={s.phone}
                      onChange={(e) => setS({ ...s, phone: e.target.value })}
                      className={quizInput}
                    />
                  </div>
                  <input
                    placeholder={pick(QUIZ.contact.email)}
                    value={s.email}
                    onChange={(e) => setS({ ...s, email: e.target.value })}
                    className={quizInput}
                  />
                  <textarea
                    placeholder={pick(QUIZ.contact.message)}
                    value={s.message}
                    onChange={(e) => setS({ ...s, message: e.target.value })}
                    rows={3}
                    className={cn(quizInput, "resize-none")}
                  />
                  <label className="flex items-start gap-3 text-xs text-ink/70 leading-relaxed">
                    <input
                      type="checkbox"
                      checked={s.rodo}
                      onChange={(e) => setS({ ...s, rodo: e.target.checked })}
                      className="mt-0.5 h-4 w-4 accent-burgundy-700"
                    />
                    <span>{pick(QUIZ.contact.rodo)}</span>
                  </label>
                </motion.div>
              )}
            </AnimatePresence>

            {s.err && (
              <p className="mt-3 text-xs text-burgundy-700">{s.err}</p>
            )}
          </div>

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={back}
              disabled={s.current === 0}
              className="inline-flex items-center gap-2 text-sm text-ink/70 hover:text-burgundy-700 disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              <ArrowLeft size={16} /> {pick(QUIZ.back)}
            </button>

            {!isContact ? (
              <PrimaryButton onClick={advance} icon={<ArrowRight size={14} />}>
                {pick(QUIZ.next)}
              </PrimaryButton>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3">
                <SecondaryButton onClick={submitEmail} icon={<Mail size={14} />}>
                  {pick(QUIZ.emailFallback)}
                </SecondaryButton>
                <PrimaryButton onClick={submitWhatsApp} icon={<MessageCircle size={14} />}>
                  {pick(QUIZ.submit)}
                </PrimaryButton>
              </div>
            )}
          </div>
        </FadeUp>

        <p className="text-center text-sm text-paper/70">
          {pick({ pl: "Bez zobowiązań · odpowiedź w tym samym dniu", en: "No commitment · same-day reply" })}
        </p>
      </Container>
    </section>
  );
}

const quizInput =
  "w-full rounded-2xl border border-ink/15 bg-paper px-4 py-3 text-ink placeholder:text-ink/40 outline-none transition focus:border-burgundy-700 focus:ring-2 focus:ring-burgundy-700/15";

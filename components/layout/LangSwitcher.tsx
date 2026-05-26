"use client";

import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LangSwitcher({ tone = "ink" }: { tone?: "ink" | "white" }) {
  const { lang, setLang } = useI18n();
  const base = "px-2.5 py-1 text-xs font-medium tracking-wider uppercase transition";
  const active = tone === "white" ? "text-paper" : "text-ink";
  const idle = tone === "white" ? "text-paper/55 hover:text-paper" : "text-ink/55 hover:text-ink";
  return (
    <div
      role="group"
      aria-label="Language"
      className={cn(
        "inline-flex items-center rounded-full border",
        tone === "white" ? "border-paper/20" : "border-ink/15",
      )}
    >
      <button onClick={() => setLang("pl")} className={cn(base, lang === "pl" ? active : idle)}>
        PL
      </button>
      <span className={cn("h-3 w-px", tone === "white" ? "bg-paper/20" : "bg-ink/15")} aria-hidden />
      <button onClick={() => setLang("en")} className={cn(base, lang === "en" ? active : idle)}>
        EN
      </button>
    </div>
  );
}

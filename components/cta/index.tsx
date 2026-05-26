"use client";

import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buildWhatsAppUrl, defaultQuoteMessage } from "@/lib/whatsapp";
import { useI18n } from "@/lib/i18n";

type ButtonBase = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: never;
};
type AnchorBase = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

type Common = {
  children: React.ReactNode;
  size?: "md" | "lg";
  icon?: React.ReactNode;
  className?: string;
};

function baseClasses(size: "md" | "lg") {
  return cn(
    "inline-flex items-center gap-2.5 font-medium text-sm md:text-[15px] tracking-wide",
    "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
    "active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-burgundy-900",
    size === "lg" ? "px-7 py-4 rounded-full" : "px-5 py-3 rounded-full",
  );
}

export function PrimaryButton({
  children,
  size = "lg",
  icon,
  className,
  ...props
}: Common & (ButtonBase | AnchorBase)) {
  const cls = cn(
    baseClasses(size),
    "bg-gold-500 text-burgundy-900 hover:bg-gold-400 shadow-gold",
    className,
  );
  const inner = (
    <>
      <span>{children}</span>
      <span className="grid h-7 w-7 place-items-center rounded-full bg-burgundy-900 text-gold-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
        {icon ?? <ArrowUpRight size={14} strokeWidth={2.4} />}
      </span>
    </>
  );
  if ("href" in props && props.href) {
    const { href, ...rest } = props as AnchorBase;
    return (
      <a href={href} className={cn("group", cls)} {...rest}>
        {inner}
      </a>
    );
  }
  return (
    <button className={cn("group", cls)} {...(props as ButtonBase)}>
      {inner}
    </button>
  );
}

export function SecondaryButton({
  children,
  size = "lg",
  icon,
  className,
  tone = "ink",
  ...props
}: Common & { tone?: "ink" | "white" } & (ButtonBase | AnchorBase)) {
  const cls = cn(
    baseClasses(size),
    tone === "white"
      ? "border border-paper/30 text-paper hover:border-gold-500 hover:text-gold-500"
      : "border border-ink/15 text-ink hover:border-burgundy-700 hover:text-burgundy-700",
    className,
  );
  const inner = (
    <>
      <span>{children}</span>
      {icon ? <span className="grid place-items-center">{icon}</span> : null}
    </>
  );
  if ("href" in props && props.href) {
    const { href, ...rest } = props as AnchorBase;
    return (
      <a href={href} className={cls} {...rest}>
        {inner}
      </a>
    );
  }
  return (
    <button className={cls} {...(props as ButtonBase)}>
      {inner}
    </button>
  );
}

export function WhatsAppCta({
  label,
  size = "lg",
  message,
  className,
}: {
  label: string;
  size?: "md" | "lg";
  message?: string;
  className?: string;
}) {
  const { lang } = useI18n();
  const href = buildWhatsAppUrl(message ?? defaultQuoteMessage(lang));
  return (
    <PrimaryButton href={href} target="_blank" rel="noopener" size={size} className={className}>
      {label}
    </PrimaryButton>
  );
}

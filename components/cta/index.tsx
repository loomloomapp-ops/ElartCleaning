"use client";

import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buildWhatsAppUrl, defaultQuoteMessage } from "@/lib/whatsapp";
import { useI18n } from "@/lib/i18n";

type ButtonBase = React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };
type AnchorBase = React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type Common = {
  children: React.ReactNode;
  size?: "md" | "lg";
  icon?: React.ReactNode;
  className?: string;
};

/**
 * Sparkles-style pill button.
 * The icon lives inside the button on hover via padding expansion on the right.
 */
function basePill(size: "md" | "lg") {
  return cn(
    "group relative inline-flex items-center gap-2 overflow-hidden rounded-pill font-display font-bold uppercase",
    "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
    "active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/30 focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
    size === "lg"
      ? "px-5 py-4 text-[18px] leading-none hover:pr-12"
      : "px-4 py-3 text-[14px] leading-none hover:pr-10",
  );
}

function IconSlot({ size, children }: { size: "md" | "lg"; children: React.ReactNode }) {
  return (
    <span
      aria-hidden
      className={cn(
        "absolute right-2 top-1/2 -translate-y-1/2 grid place-items-center rounded-full opacity-0 -translate-x-2",
        "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
        "group-hover:opacity-100 group-hover:translate-x-0",
        size === "lg" ? "h-8 w-8" : "h-7 w-7",
      )}
    >
      {children}
    </span>
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
    basePill(size),
    "bg-accent text-ink hover:bg-ink hover:text-paper",
    className,
  );
  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      <IconSlot size={size}>
        <span className="grid h-full w-full place-items-center rounded-full bg-paper text-ink">
          {icon ?? <ArrowUpRight size={16} strokeWidth={2.4} />}
        </span>
      </IconSlot>
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

export function SecondaryButton({
  children,
  size = "lg",
  icon,
  className,
  tone = "ink",
  ...props
}: Common & { tone?: "ink" | "white" } & (ButtonBase | AnchorBase)) {
  const cls = cn(
    basePill(size),
    tone === "white"
      ? "bg-paper/15 text-paper hover:bg-paper hover:text-ink backdrop-blur"
      : "bg-ink/[0.08] text-ink hover:bg-ink hover:text-paper",
    className,
  );
  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      <IconSlot size={size}>
        <span
          className={cn(
            "grid h-full w-full place-items-center rounded-full",
            tone === "white" ? "bg-ink text-paper" : "bg-paper text-ink",
          )}
        >
          {icon ?? <ArrowUpRight size={16} strokeWidth={2.4} />}
        </span>
      </IconSlot>
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

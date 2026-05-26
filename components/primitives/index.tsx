import * as React from "react";
import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mx-auto w-full max-w-container px-5 md:px-8 lg:px-10", className)}
      {...rest}
    >
      {children}
    </div>
  );
}

/**
 * Sparkles-style label pill: small filled rounded chip with a leading dot.
 * Replaces the old uppercase letter-spaced eyebrow.
 */
export function Eyebrow({
  children,
  className,
  tone = "gold",
}: {
  children: React.ReactNode;
  className?: string;
  /** gold: gold bg, burgundy text (use on light bg) | white: paper bg, burgundy text | ink: same | dark: burgundy bg, gold text (use on light) */
  tone?: "gold" | "white" | "ink" | "dark";
}) {
  const styles =
    tone === "gold"
      ? "bg-gold-500 text-burgundy-900"
      : tone === "dark"
      ? "bg-burgundy-700 text-gold-500"
      : tone === "white"
      ? "bg-paper/15 text-paper backdrop-blur"
      : "bg-burgundy-700/8 text-burgundy-700";
  const dot =
    tone === "gold"
      ? "bg-burgundy-900"
      : tone === "dark"
      ? "bg-gold-500"
      : tone === "white"
      ? "bg-gold-500"
      : "bg-burgundy-700";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-[12px] px-3 h-7 text-[11px] font-semibold tracking-[0.01em]",
        styles,
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", dot)} aria-hidden />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  tone = "ink",
  className,
  aside,
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  /** Default centered (sparkles pattern). Use "left" for editorial split with aside. */
  align?: "left" | "center";
  tone?: "ink" | "white";
  className?: string;
  /** Optional secondary copy rendered as an editorial right column on lg+ (forces align=left) */
  aside?: React.ReactNode;
}) {
  const isWhite = tone === "white";
  const heading = isWhite ? "text-paper" : "text-ink";
  const sub = isWhite ? "text-paper/70" : "text-ink/60";

  // Heading clamp tuned to sparkles ~h2 5rem desktop, 3rem mobile
  const h2Cls = cn(
    "font-display font-medium leading-[0.98] tracking-[-0.025em] text-balance",
    "text-[clamp(2.4rem,5.6vw,4.75rem)]",
    heading,
  );

  // Aside layout overrides align
  if (aside) {
    return (
      <div className={cn("grid lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-16 items-end", className)}>
        <div className="flex flex-col gap-5">
          {eyebrow ? <Eyebrow tone={isWhite ? "white" : "dark"}>{eyebrow}</Eyebrow> : null}
          <h2 className={cn(h2Cls, "max-w-3xl")}>{title}</h2>
        </div>
        <div className={cn("space-y-4 max-w-md lg:pb-2", sub)}>
          {aside}
          {subtitle ? <p className="text-base md:text-lg leading-relaxed">{subtitle}</p> : null}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        align === "center" ? "items-center text-center mx-auto max-w-3xl" : "max-w-3xl",
        className,
      )}
    >
      {eyebrow ? <Eyebrow tone={isWhite ? "white" : "dark"}>{eyebrow}</Eyebrow> : null}
      <h2 className={h2Cls}>{title}</h2>
      {subtitle ? (
        <p
          className={cn(
            "text-base md:text-lg leading-relaxed max-w-2xl",
            sub,
            align === "center" && "mx-auto",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

export function Ribbon({
  children,
  className,
  variant = "burgundy",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "burgundy" | "gold";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 px-3.5 py-1.5 font-bebas uppercase tracking-[0.18em] text-xs md:text-sm",
        variant === "burgundy" && "bg-burgundy-700 text-paper",
        variant === "gold" && "bg-gold-500 text-burgundy-900",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function GoldDivider({
  className,
  tone = "gold",
}: {
  className?: string;
  tone?: "gold" | "burgundy";
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "block h-px w-12",
        tone === "gold" ? "bg-gold-500/70" : "bg-burgundy-900/40",
        className,
      )}
    />
  );
}

export function Pill({
  children,
  className,
  active = false,
}: {
  children: React.ReactNode;
  className?: string;
  active?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition",
        active
          ? "bg-burgundy-700 text-paper border-burgundy-700"
          : "bg-paper text-ink border-ink/10 hover:border-burgundy-700/40",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function LogoStamp({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex h-16 w-16 items-center justify-center rounded-full border border-gold-500/70 text-gold-500",
        "font-bebas tracking-[0.2em] text-[10px] backdrop-blur",
        className,
      )}
    >
      ELART
    </span>
  );
}

import * as React from "react";
import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mx-auto w-full max-w-container px-4 md:px-6 lg:px-8", className)}
      {...rest}
    >
      {children}
    </div>
  );
}

/**
 * Sparkles-style chip: small, uppercase, neutral background.
 * Tones: cream (default — depth bg), surface (white lift), ink (dark fill), accent (warm).
 */
export function Chip({
  children,
  className,
  tone = "cream",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "cream" | "surface" | "ink" | "accent" | "white" | "gold" | "dark";
}) {
  const styles =
    tone === "ink" || tone === "dark"
      ? "bg-ink text-paper"
      : tone === "accent" || tone === "gold"
      ? "bg-accent text-ink"
      : tone === "surface" || tone === "white"
      ? "bg-surface text-ink"
      : "bg-cream-deep text-ink";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-2xl px-3 py-1.5 text-label-1 font-bold uppercase",
        styles,
        className,
      )}
    >
      {children}
    </span>
  );
}

// Alias for backward-compatibility in places that still import Eyebrow
export const Eyebrow = Chip;

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  tone = "ink",
  className,
  aside,
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center";
  tone?: "ink" | "white";
  className?: string;
  aside?: React.ReactNode;
}) {
  const isWhite = tone === "white";
  const heading = isWhite ? "text-paper" : "text-ink";
  const sub = isWhite ? "text-paper/70" : "text-ink/64";

  const h2Cls = cn(
    "font-display font-bold leading-[0.9] tracking-[-0.02em] text-balance uppercase",
    "text-[clamp(2.25rem,6vw,5rem)]",
    heading,
  );

  if (aside) {
    return (
      <div className={cn("grid lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-16 items-end", className)}>
        <div className="flex flex-col gap-5">
          {eyebrow ? <Chip>{eyebrow}</Chip> : null}
          <h2 className={cn(h2Cls, "max-w-3xl")}>{title}</h2>
        </div>
        <div className={cn("space-y-4 max-w-md lg:pb-2", sub)}>
          {aside}
          {subtitle ? <p className="text-b1 leading-relaxed">{subtitle}</p> : null}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" ? "items-center text-center mx-auto max-w-col-6" : "max-w-col-6",
        className,
      )}
    >
      {eyebrow ? <Chip>{eyebrow}</Chip> : null}
      <h2 className={h2Cls}>{title}</h2>
      {subtitle ? (
        <p
          className={cn(
            "text-b1 leading-relaxed max-w-col-4",
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

// Kept for legacy imports; renders nothing meaningful but doesn't break builds.
export function Ribbon({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "burgundy" | "gold";
}) {
  return <Chip className={className}>{children}</Chip>;
}

export function GoldDivider({ className }: { className?: string; tone?: "gold" | "burgundy" }) {
  return (
    <span
      aria-hidden
      className={cn("block h-px w-12 bg-ink/16", className)}
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
        "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-b3 font-semibold transition",
        active
          ? "bg-ink text-paper border-ink"
          : "bg-surface text-ink border-ink/10 hover:border-ink/40",
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
        "inline-flex h-16 w-16 items-center justify-center rounded-full border border-ink/16 text-ink",
        "font-display tracking-[0.2em] text-[10px] font-bold",
        className,
      )}
    >
      ELART
    </span>
  );
}

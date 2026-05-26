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

export function Eyebrow({
  children,
  className,
  tone = "gold",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "gold" | "white" | "ink";
}) {
  return (
    <span
      className={cn(
        "font-bebas tracking-[0.22em] text-xs md:text-sm uppercase",
        tone === "gold" && "text-gold-500",
        tone === "white" && "text-paper/80",
        tone === "ink" && "text-ink/70",
        className,
      )}
    >
      {children}
    </span>
  );
}

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
  /** Optional secondary copy rendered as an editorial right column on lg+ */
  aside?: React.ReactNode;
}) {
  const isWhite = tone === "white";
  const heading = isWhite ? "text-paper" : "text-ink";
  const sub = isWhite ? "text-paper/75" : "text-ink/65";
  const dot = isWhite ? "bg-gold-500" : "bg-burgundy-700";

  const headerCol = (
    <div className={cn("flex flex-col gap-5", align === "center" && "items-center text-center")}>
      {eyebrow ? (
        <span
          className={cn(
            "inline-flex items-center gap-2.5 font-bebas tracking-[0.24em] text-xs md:text-sm uppercase",
            isWhite ? "text-gold-500" : "text-burgundy-700",
          )}
        >
          <span className={cn("h-1.5 w-1.5 rounded-full", dot)} />
          {eyebrow}
        </span>
      ) : null}
      <h2
        className={cn(
          "font-display font-medium leading-[1.02] tracking-tight text-balance",
          "text-[clamp(2.25rem,5vw,4.25rem)] max-w-3xl",
          heading,
        )}
      >
        {title}
      </h2>
      {subtitle && align === "center" ? (
        <p className={cn("text-base md:text-lg leading-relaxed max-w-2xl mx-auto", sub)}>
          {subtitle}
        </p>
      ) : null}
    </div>
  );

  // Editorial split: heading on the left, supporting copy on the right (lg+)
  if (aside && align === "left") {
    return (
      <div className={cn("grid lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-16 items-end", className)}>
        {headerCol}
        <div className={cn("space-y-4 max-w-md lg:pb-2", sub)}>
          {aside}
          {subtitle ? (
            <p className="text-base md:text-lg leading-relaxed">{subtitle}</p>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-5 max-w-3xl", align === "center" && "mx-auto", className)}>
      {headerCol}
      {subtitle && align !== "center" ? (
        <p className={cn("text-base md:text-lg leading-relaxed max-w-2xl", sub)}>{subtitle}</p>
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

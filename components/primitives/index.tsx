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
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center";
  tone?: "ink" | "white";
  className?: string;
}) {
  const heading =
    tone === "white"
      ? "text-paper"
      : "text-ink";
  const sub = tone === "white" ? "text-paper/75" : "text-ink/70";
  return (
    <div
      className={cn(
        "max-w-3xl flex flex-col gap-4",
        align === "center" && "mx-auto text-center items-center",
        className,
      )}
    >
      {eyebrow ? <Eyebrow tone={tone === "white" ? "gold" : "gold"}>{eyebrow}</Eyebrow> : null}
      <h2
        className={cn(
          "font-display font-medium leading-[1.05] tracking-tight text-balance",
          "text-[clamp(2rem,4.4vw,3.5rem)]",
          heading,
        )}
      >
        {title}
      </h2>
      {subtitle ? (
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

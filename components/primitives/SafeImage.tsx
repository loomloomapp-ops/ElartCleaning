"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Image with onError fallback to themed gradient.
 * Uses plain <img> for predictable error handling on external CDN URLs.
 */
export function SafeImage({
  src,
  alt,
  className,
  ratio,
  tone = "burgundy",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  ratio?: string;
  tone?: "burgundy" | "cream";
  priority?: boolean;
}) {
  const [failed, setFailed] = React.useState(false);
  const isUsable =
    !!src && (src.startsWith("/") || /^https?:\/\//.test(src));
  const isPlaceholder = !src || src.startsWith("[PLACEHOLDER");

  const containerStyle = ratio ? { aspectRatio: ratio } : undefined;

  if (isPlaceholder || failed || !isUsable) {
    return (
      <div
        className={cn(
          "relative overflow-hidden",
          tone === "burgundy"
            ? "bg-gradient-to-br from-burgundy-700 via-burgundy-800 to-burgundy-900"
            : "bg-gradient-to-br from-cream via-paper to-cream",
          className,
        )}
        style={containerStyle}
        aria-label={alt}
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, #CCB170 0, transparent 40%), radial-gradient(circle at 80% 80%, #CCB170 0, transparent 35%)",
          }}
        />
        <div className="absolute inset-0 grid place-items-center font-bebas tracking-[0.22em] text-xs text-gold-500/70">
          {alt || "ELART"}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)} style={containerStyle}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onError={() => setFailed(true)}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}

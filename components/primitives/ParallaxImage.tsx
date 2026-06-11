"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  /** Container classes — sizing, aspect ratio, rounding, etc. */
  className?: string;
  sizes?: string;
  priority?: boolean;
  /**
   * Vertical drift as a share of the (oversized) image height.
   * Kept under the 15% overflow so edges never show. Default 11.
   */
  strength?: number;
};

/**
 * Large photo with scroll-driven vertical parallax. The image layer is 130%
 * tall and centered (15% overflow each side); it drifts by ±strength% of its
 * own height as the section traverses the viewport, so the container edges
 * stay covered. Falls back to a static image when reduced motion is requested.
 */
export function ParallaxImage({
  src,
  alt,
  className,
  sizes = "100vw",
  priority,
  strength = 11,
}: Props) {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        style={{ y: reduce ? 0 : y }}
        className="absolute left-0 right-0 -top-[15%] h-[130%] will-change-transform"
      >
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </motion.div>
    </div>
  );
}

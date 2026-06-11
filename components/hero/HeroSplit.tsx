"use client";

import { useEffect, useState } from "react";
import { ParallaxImage } from "@/components/primitives/ParallaxImage";
import { Star, Phone, MessageCircle, Mail, Instagram } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Container, Chip } from "@/components/primitives";
import { PrimaryButton, SecondaryButton } from "@/components/cta";
import { BRAND } from "@/lib/constants";
import { useI18n } from "@/lib/i18n";
import { buildWhatsAppUrl, defaultQuoteMessage } from "@/lib/whatsapp";

const SCOPES_PL = ["MIESZKAŃ", "DOMÓW", "BIUR", "LOKALI"];
const SCOPES_EN = ["APARTMENTS", "HOUSES", "OFFICES", "VENUES"];

export function HeroSplit() {
  const { lang } = useI18n();
  const scopes = lang === "pl" ? SCOPES_PL : SCOPES_EN;
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % scopes.length), 2200);
    return () => clearInterval(id);
  }, [scopes.length]);

  return (
    <section id="top" className="bg-paper pt-6 md:pt-10 pb-section-md">
      <Container>
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-12 items-stretch">
          {/* LEFT — text */}
          <div className="flex flex-col gap-8 lg:gap-10 max-w-col-5">
            {/* Ratings */}
            <div className="flex flex-wrap items-center gap-3">
              <RatingBadge value="4.9" platform="Google" />
              <RatingBadge value="5.0" platform="Instagram" />
            </div>

            {/* Headline with vertical swap */}
            <h1 className="font-display font-bold uppercase leading-[0.92] tracking-[-0.02em] text-ink text-[clamp(2rem,4.8vw,4.25rem)]">
              {lang === "pl" ? (
                <>
                  <span className="block">PROFESJONALNE</span>
                  <span className="block">SPRZĄTANIE</span>
                  <span className="relative block h-[1em] overflow-hidden">
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.span
                        key={scopes[i]}
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: "-100%", opacity: 0 }}
                        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-0 text-accent-deep"
                      >
                        {scopes[i]}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                  <span className="block">W POZNANIU</span>
                </>
              ) : (
                <>
                  <span className="block">PROFESSIONAL</span>
                  <span className="block">CLEANING</span>
                  <span className="block text-accent-deep">FOR</span>
                  <span className="relative block h-[1em] overflow-hidden">
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.span
                        key={scopes[i]}
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: "-100%", opacity: 0 }}
                        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-0"
                      >
                        {scopes[i]}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                </>
              )}
            </h1>

            <p className="text-b1 text-ink/64 max-w-col-4">
              {lang === "pl"
                ? "Lokalna ekipa z Poznania. Sprzątanie, pranie tapicerki, mycie okien, przeprowadzki i magazynowanie — z gwarancją satysfakcji."
                : "Local Poznań crew. Cleaning, upholstery, windows, moving and storage — with a satisfaction guarantee."}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <PrimaryButton
                href={buildWhatsAppUrl(defaultQuoteMessage(lang))}
                target="_blank"
                rel="noopener"
              >
                {lang === "pl" ? "Zamów wycenę" : "Get a quote"}
              </PrimaryButton>
              <SecondaryButton href="#cennik">
                {lang === "pl" ? "Zobacz cennik" : "See pricing"}
              </SecondaryButton>
            </div>
          </div>

          {/* RIGHT — image */}
          <ParallaxImage
            src="/cleaning/hero-elart.jpg"
            alt="Elart Cleaning"
            priority
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="aspect-[4/5] lg:aspect-auto lg:min-h-[640px] rounded-3xl bg-cream-deep"
          />
        </div>

        {/* Support 4-up grid */}
        <div className="mt-8 lg:mt-12 grid grid-cols-2 lg:grid-cols-4 gap-3">
          <SupportItem
            icon={<Phone size={18} strokeWidth={2.4} />}
            label={lang === "pl" ? "Zadzwoń" : "Call"}
            value={BRAND.phone}
            href={`tel:${BRAND.phoneTel.replace(/\s/g, "")}`}
          />
          <SupportItem
            icon={<MessageCircle size={18} strokeWidth={2.4} />}
            label="WhatsApp"
            value={BRAND.phone}
            href={buildWhatsAppUrl(defaultQuoteMessage(lang))}
            external
          />
          <SupportItem
            icon={<Mail size={18} strokeWidth={2.4} className="relative top-px" />}
            label="Email"
            value={BRAND.email}
            href={`mailto:${BRAND.email}`}
          />
          <SupportItem
            icon={<Instagram size={18} strokeWidth={2.4} />}
            label="Instagram"
            value="@elart_cleaning"
            href={BRAND.instagram}
            external
          />
        </div>
      </Container>
    </section>
  );
}

function RatingBadge({ value, platform }: { value: string; platform: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-cream-deep px-3 py-1.5">
      <div className="flex items-center gap-0.5 text-accent-deep">
        {[0, 1, 2, 3, 4].map((k) => (
          <Star key={k} size={12} fill="currentColor" strokeWidth={0} />
        ))}
      </div>
      <span className="text-label-1 font-bold uppercase text-ink">
        {value} {platform}
      </span>
    </div>
  );
}

function SupportItem({
  icon,
  label,
  value,
  href,
  external,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener" : undefined}
      className="group flex items-center gap-3 rounded-2xl bg-cream-deep p-4 transition-colors hover:bg-ink hover:text-paper"
    >
      <span className="grid h-10 w-10 place-items-center rounded-full bg-surface text-ink group-hover:bg-accent">
        {icon}
      </span>
      <span className="flex flex-col leading-tight min-w-0">
        <span className="text-label-2 font-bold uppercase opacity-64">{label}</span>
        <span className="text-b3 font-bold truncate">{value}</span>
      </span>
    </a>
  );
}

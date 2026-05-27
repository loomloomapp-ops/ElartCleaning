"use client";

import Image from "next/image";
import { Phone, Mail, MapPin, Instagram } from "lucide-react";
import { Container } from "@/components/primitives";
import { BRAND, NAV_ANCHORS } from "@/lib/constants";
import { FOOTER, SERVICES } from "@/lib/content";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { pick, lang } = useI18n();

  return (
    <footer className="bg-paper pt-section-md pb-8 border-t border-ink/8 mt-section-sm">
      <Container>
        {/* Top tile */}
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12 mb-8">
          {/* Left — contact tiles */}
          <div className="grid sm:grid-cols-3 gap-4">
            <FooterTile
              icon={<MapPin size={18} strokeWidth={2} />}
              label={lang === "pl" ? "Adres" : "Address"}
              value="Poznań · cała Polska"
            />
            <FooterTile
              icon={<Phone size={18} strokeWidth={2} />}
              label={lang === "pl" ? "Telefon" : "Phone"}
              value={BRAND.phone}
              href={`tel:${BRAND.phoneTel.replace(/\s/g, "")}`}
            />
            <FooterTile
              icon={<Mail size={18} strokeWidth={2} />}
              label="Email"
              value={BRAND.email}
              href={`mailto:${BRAND.email}`}
            />
          </div>

          {/* Right — link columns */}
          <div className="grid sm:grid-cols-2 gap-8">
            <FooterLinks
              head={pick(FOOTER.navHead)}
              items={NAV_ANCHORS.map((a) => ({
                href: `#${a.id}`,
                label: lang === "pl" ? a.pl : a.en,
              }))}
            />
            <FooterLinks
              head={lang === "pl" ? "Usługi" : "Services"}
              items={SERVICES.slice(0, 6).map((s) => ({
                href: "#cennik",
                label: pick(s.title),
              }))}
            />
          </div>
        </div>

        {/* Bottom tile */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-8 border-t border-ink/8">
          <div className="flex items-center gap-3">
            <Image
              src="/logo-elart.png"
              alt={BRAND.name}
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
            />
            <div className="flex flex-col leading-tight">
              <span className="font-display font-bold text-ink">{BRAND.name}</span>
              <span className="text-label-2 uppercase font-bold text-ink/64">POZNAŃ</span>
            </div>
          </div>

          <p className="text-b3 text-ink/64 max-w-md">{pick(FOOTER.description)}</p>

          <div className="flex items-center gap-3">
            <a
              href={BRAND.instagram}
              target="_blank"
              rel="noopener"
              aria-label="Instagram"
              className="grid h-10 w-10 place-items-center rounded-full bg-cream-deep text-ink hover:bg-ink hover:text-paper transition-colors"
            >
              <Instagram size={18} strokeWidth={2} />
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 text-b3 text-ink/48">
          <span>
            © {new Date().getFullYear()} {BRAND.name}. {pick(FOOTER.rights)}.
          </span>
          <div className="flex items-center gap-5">
            {FOOTER.docs.map((d) => (
              <a key={pick(d)} href="#" className="link-underline hover:text-ink">
                {pick(d)}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterTile({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <>
      <span className="grid h-10 w-10 place-items-center rounded-full bg-surface text-ink shrink-0 transition-colors group-hover:bg-paper/15 group-hover:text-paper">
        {icon}
      </span>
      <span className="flex flex-col leading-tight min-w-0">
        <span className="text-label-2 uppercase font-bold text-ink/64 transition-colors group-hover:text-paper/70">{label}</span>
        <span className="text-b3 font-bold text-ink truncate transition-colors group-hover:text-paper">{value}</span>
      </span>
    </>
  );
  if (href) {
    return (
      <a
        href={href}
        className="group flex items-center gap-3 rounded-2xl bg-cream-deep p-4 hover:bg-ink hover:text-paper transition-colors"
      >
        {inner}
      </a>
    );
  }
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-cream-deep p-4">
      {inner}
    </div>
  );
}

function FooterLinks({
  head,
  items,
}: {
  head: string;
  items: { href: string; label: string }[];
}) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-label-1 font-bold uppercase text-ink/64">{head}</span>
      <ul className="flex flex-col gap-2">
        {items.map((it) => (
          <li key={it.label}>
            <a href={it.href} className="text-b2 text-ink link-underline">
              {it.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

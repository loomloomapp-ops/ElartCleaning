export const BRAND = {
  name: "Elart Cleaning",
  city: "Poznań",
  phone: "+48 577 596 668",
  phoneTel: "+48577596668",
  whatsapp: "48577596668",
  email: "elartcleaning@gmail.com",
  instagram:
    "https://www.instagram.com/elart_cleaning?igsh=MjljYWowODNmZXpo&utm_source=qr",
  mapsEmbed: "[PLACEHOLDER_GOOGLE_MAPS_POZNAN]",
};

import { STOCK } from "./stock";

/**
 * ASSETS — to be replaced with real Elart photography.
 * Default values point at curated Unsplash stock to keep the design demo-ready.
 * Replace each string with the final asset URL or path (e.g. /images/hero.jpg).
 */
export const ASSETS = {
  logo: "/logo-elart.png",
  heroImage: STOCK.heroSlides[0],
  reviewPhotos: STOCK.reviews,
  reviewVideos: [
    "[PLACEHOLDER_YOUTUBE_REVIEW_URL_1]",
    "[PLACEHOLDER_YOUTUBE_REVIEW_URL_2]",
  ],
};

export const NAV_ANCHORS = [
  { id: "opinie", pl: "Opinie", en: "Reviews" },
  { id: "uslugi", pl: "Usługi", en: "Services" },
  { id: "cennik", pl: "Cennik", en: "Prices" },
  { id: "jak-pracujemy", pl: "Jak pracujemy", en: "How we work" },
  { id: "efekty", pl: "Efekty", en: "Cases" },
  { id: "faq", pl: "FAQ", en: "FAQ" },
  { id: "kontakt", pl: "Kontakt", en: "Contact" },
] as const;

export type AnchorId = (typeof NAV_ANCHORS)[number]["id"];

export const SEO = {
  title: "Elart Cleaning Poznań — sprzątanie, pranie tapicerki i przeprowadzki",
  description:
    "Profesjonalne sprzątanie mieszkań, domów, biur, pranie tapicerki oraz transport przeprowadzkowy w Poznaniu. Własny sprzęt, szybka wycena, faktury i gwarancja satysfakcji.",
  keywords: [
    "sprzątanie Poznań",
    "firma sprzątająca Poznań",
    "sprzątanie mieszkań Poznań",
    "sprzątanie po remoncie Poznań",
    "pranie tapicerki Poznań",
    "czyszczenie kanapy Poznań",
    "sprzątanie biur Poznań",
    "transport przeprowadzkowy Poznań",
    "przeprowadzki Poznań",
  ],
  url: "https://elartcleaning.pl",
};

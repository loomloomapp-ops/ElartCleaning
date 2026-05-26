import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n";
import { PopupProvider } from "@/components/widgets/PopupProvider";
import { SEO } from "@/lib/constants";

const display = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const sans = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FDF8F1",
};

export const metadata: Metadata = {
  metadataBase: new URL(SEO.url),
  title: { default: SEO.title, template: `%s · Elart Cleaning Poznań` },
  description: SEO.description,
  keywords: SEO.keywords,
  authors: [{ name: "Elart Cleaning" }],
  applicationName: "Elart Cleaning",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: SEO.url,
    siteName: "Elart Cleaning",
    title: SEO.title,
    description: SEO.description,
    images: [{ url: "/logo-elart.png", width: 800, height: 800, alt: "Elart Cleaning" }],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.title,
    description: SEO.description,
    images: ["/logo-elart.png"],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/logo-elart.png", apple: "/logo-elart.png" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Elart Cleaning",
  image: "/logo-elart.png",
  description: SEO.description,
  address: { "@type": "PostalAddress", addressLocality: "Poznań", addressCountry: "PL" },
  areaServed: "Poznań, Polska",
  url: SEO.url,
  email: "elartcleaning@gmail.com",
  sameAs: [
    "https://www.instagram.com/elart_cleaning",
  ],
  priceRange: "$$",
  openingHours: "Mo-Su 07:00-22:00",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={`${display.variable} ${sans.variable}`}>
      <body className="bg-paper text-ink antialiased">
        <a
          href="#top"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[120] focus:rounded-full focus:bg-ink focus:text-paper focus:px-4 focus:py-2 focus:text-sm"
        >
          Pomiń do treści
        </a>
        <I18nProvider>
          <PopupProvider>{children}</PopupProvider>
        </I18nProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}

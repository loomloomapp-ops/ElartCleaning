import { BRAND } from "./constants";

function digitsOnly(s: string) {
  return s.replace(/\D+/g, "");
}

export function buildWhatsAppUrl(message: string): string {
  const phone = digitsOnly(BRAND.whatsapp);
  const text = encodeURIComponent(message.trim());
  if (!phone) return `https://wa.me/?text=${text}`;
  return `https://wa.me/${phone}?text=${text}`;
}

export function defaultQuoteMessage(lang: "pl" | "en" = "pl") {
  if (lang === "en") {
    return `Hello Elart Cleaning, I'd like a quote. Could you contact me back?`;
  }
  return `Dzień dobry Elart Cleaning, chciał(a)bym otrzymać wycenę. Czy możecie się ze mną skontaktować?`;
}

export function packageQuoteMessage(
  name: string,
  price: string,
  lang: "pl" | "en" = "pl",
): string {
  if (lang === "en") {
    return `Hello Elart Cleaning, I'm interested in the "${name}" package (${price}). Could you prepare a quote for me?`;
  }
  return `Dzień dobry Elart Cleaning, interesuje mnie pakiet „${name}” (${price}). Czy możecie przygotować dla mnie wycenę?`;
}

export function serviceQuoteMessage(
  service: string,
  price?: string,
  lang: "pl" | "en" = "pl",
): string {
  const pricePart = price ? ` (${price})` : "";
  if (lang === "en") {
    return `Hello Elart Cleaning, I'm interested in: ${service}${pricePart}. Could you prepare a quote for me?`;
  }
  return `Dzień dobry Elart Cleaning, interesuje mnie: ${service}${pricePart}. Czy możecie przygotować dla mnie wycenę?`;
}

export type QuizAnswers = {
  service: string;
  object: string;
  area: string;
  timing: string;
  extras: string[];
  name: string;
  phone: string;
  email?: string;
  message?: string;
};

export function buildQuizMessage(a: QuizAnswers, lang: "pl" | "en" = "pl"): string {
  const labels =
    lang === "en"
      ? {
          intro: "Hello Elart Cleaning, I filled out the quote quiz:",
          service: "Service",
          object: "Object",
          area: "Area / scope",
          timing: "Timing",
          extras: "Extras",
          name: "Name",
          phone: "Phone",
          email: "Email",
          message: "Note",
          outro: "Please get back to me with a quote.",
        }
      : {
          intro: "Dzień dobry Elart Cleaning, wypełnił(a)em formularz wyceny:",
          service: "Usługa",
          object: "Obiekt",
          area: "Powierzchnia / zakres",
          timing: "Termin",
          extras: "Dodatki",
          name: "Imię",
          phone: "Telefon",
          email: "Email",
          message: "Wiadomość",
          outro: "Proszę o kontakt z wyceną.",
        };

  const lines = [
    labels.intro,
    "",
    `• ${labels.service}: ${a.service}`,
    `• ${labels.object}: ${a.object}`,
    `• ${labels.area}: ${a.area}`,
    `• ${labels.timing}: ${a.timing}`,
    `• ${labels.extras}: ${a.extras.length ? a.extras.join(", ") : "—"}`,
    "",
    `${labels.name}: ${a.name}`,
    `${labels.phone}: ${a.phone}`,
  ];
  if (a.email) lines.push(`${labels.email}: ${a.email}`);
  if (a.message) lines.push(`${labels.message}: ${a.message}`);
  lines.push("", labels.outro);
  return lines.join("\n");
}

export function buildMailto(subject: string, body: string) {
  const s = encodeURIComponent(subject);
  const b = encodeURIComponent(body);
  return `mailto:${BRAND.email}?subject=${s}&body=${b}`;
}

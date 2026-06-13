import type { Metadata } from "next";
import { ThankYouContent } from "./ThankYouContent";

export const metadata: Metadata = {
  title: "Dziękujemy",
  description: "Dziękujemy za zgłoszenie do Elart Cleaning. Skontaktujemy się z Tobą wkrótce.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/dziekujemy/" },
};

export default function ThankYouPage() {
  return <ThankYouContent />;
}

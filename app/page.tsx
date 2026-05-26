import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSlider } from "@/components/hero/HeroSlider";
import { CategoryStrip } from "@/components/sections/CategoryStrip";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { WhyUs } from "@/components/sections/WhyUs";
import { BookingBanner } from "@/components/sections/BookingBanner";
import { Plans } from "@/components/sections/Plans";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Reviews } from "@/components/sections/Reviews";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ReadyCta } from "@/components/sections/ReadyCta";
import { Faq } from "@/components/sections/Faq";
import { ContactForm } from "@/components/sections/ContactForm";
import { QuizSection } from "@/components/quiz/Quiz";
import { MobileStickyCta } from "@/components/widgets/MobileStickyCta";
import { FloatingWidget } from "@/components/widgets/FloatingWidget";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="overflow-x-clip">
        {/* 1 — Hero slider (3 slides, auto-play) */}
        <HeroSlider />

        {/* 2 — Vertical category strip */}
        <CategoryStrip />

        {/* 3 — About: Years circle + Mission + Vision */}
        <About />

        {/* 4 — Services: big chevron list inside dark block */}
        <Services />

        {/* 5 — Why us: 4 alternating image/content rows */}
        <WhyUs />

        {/* 6 — Booking CTA full-bleed */}
        <BookingBanner />

        {/* 7 — Pricing 3 tiers */}
        <Plans />

        {/* 8 — Cases (replaces Blog) */}
        <BeforeAfter />

        {/* 9 — Reviews (photo + video) */}
        <Reviews />

        {/* 10 — How it works */}
        <HowItWorks />

        {/* 11 — Quiz */}
        <QuizSection />

        {/* 12 — Ready to start CTA (info cards) */}
        <ReadyCta />

        {/* 13 — FAQ */}
        <Faq />

        {/* 14 — Contact form */}
        <ContactForm />
      </main>

      <Footer />

      {/* Sticky / floating widgets */}
      <MobileStickyCta />
      <FloatingWidget />
    </>
  );
}

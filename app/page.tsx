import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSplit } from "@/components/hero/HeroSplit";
import { ServicesMarquee } from "@/components/sections/ServicesMarquee";
import { WhyUs } from "@/components/sections/WhyUs";
import { Reviews } from "@/components/sections/Reviews";
import { Plans } from "@/components/sections/Plans";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { MeetTeam } from "@/components/sections/MeetTeam";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Faq } from "@/components/sections/Faq";
import { ReadyCta } from "@/components/sections/ReadyCta";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { MobileBottomNav } from "@/components/widgets/MobileBottomNav";
import { FloatingWidget } from "@/components/widgets/FloatingWidget";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="overflow-x-clip">
        <HeroSplit />
        <ServicesMarquee />
        <WhyUs />
        <Reviews />
        <Plans />
        <HowItWorks />
        <MeetTeam />
        <BeforeAfter />
        <Faq />
        <ReadyCta />
        <TrustStrip />
      </main>
      <Footer />
      {/* spacer so the fixed mobile bar never covers footer content */}
      <div aria-hidden className="h-24 md:hidden" />
      <MobileBottomNav />
      <FloatingWidget />
    </>
  );
}

import HeroSection from "@/components/sections/HeroSection";
import MarqueeSection from "@/components/sections/MarqueeSection";
import PhilosophySection from "@/components/sections/PhilosophySection";
import ScheduleSection from "@/components/sections/ScheduleSection";
import TeachersSection from "@/components/sections/TeachersSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import PricingSection from "@/components/sections/PricingSection";
import JournalSection from "@/components/sections/JournalSection";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <MarqueeSection />
      <PhilosophySection />
      <ScheduleSection />
      <TeachersSection />
      <TestimonialsSection />
      <PricingSection />
      <JournalSection />
      <CTASection />
    </>
  );
}

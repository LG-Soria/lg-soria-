import HeroSection from "./sections/HeroSection";
import JourneySection from "./sections/JourneySection";
import CorePrinciplesSection from "./sections/CorePrinciplesSection";
import StrengthsSection from "./sections/StrengthsSection";
import FinalCtaSection from "./sections/FinalCtaSection";

export default function About() {
  return (
    <div className="w-full cursor-none bg-black text-white">
      <HeroSection />
      <JourneySection />
      <CorePrinciplesSection />
      <StrengthsSection />
      <FinalCtaSection />
    </div>
  );
}

import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { CompatibilityChecker } from "@/components/landing/CompatibilityChecker";
import { Testimonials } from "@/components/landing/Testimonials";
import { Pricing } from "@/components/landing/Pricing";
import { Footer } from "@/components/landing/Footer";
import { StarryBackground } from "@/components/landing/StarryBackground";
import { FloatingZodiac } from "@/components/landing/FloatingZodiac";
import { ZodiacWheel } from "@/components/landing/ZodiacWheel";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <StarryBackground />
      <FloatingZodiac />
      <ZodiacWheel />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <div id="features">
          <Features />
        </div>
        <div id="how">
          <HowItWorks />
        </div>
        <CompatibilityChecker />
        <Testimonials />
        <div id="pricing">
          <Pricing />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Index;

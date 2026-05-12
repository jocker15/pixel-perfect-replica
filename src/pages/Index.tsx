import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { PainPoints } from "@/components/landing/PainPoints";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Modules } from "@/components/landing/Modules";
import { Pricing } from "@/components/landing/Pricing";
import { Testimonials } from "@/components/landing/Testimonials";
import { FAQ } from "@/components/landing/FAQ";
import { Footer } from "@/components/landing/Footer";

const Index = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Navbar />
    <Hero />
    <div id="painpoints"><PainPoints /></div>
    <div id="how"><HowItWorks /></div>
    <div id="modules"><Modules /></div>
    <div id="pricing"><Pricing /></div>
    <Testimonials />
    <FAQ />
    <div id="contact"><Footer /></div>
  </div>
);
export default Index;

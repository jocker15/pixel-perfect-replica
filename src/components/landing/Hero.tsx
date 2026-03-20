import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { TextReveal } from "./TextReveal";
import { Send, Sparkles as SparklesIcon } from "lucide-react";
import heroPhone from "@/assets/hero-phone.png";
import heroCrystal from "@/assets/hero-crystal.png";

export const Hero = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const crystalY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-6 items-center py-24 lg:py-0">
        {/* Left — crystal ball with parallax */}
        <motion.div
          initial={{ opacity: 0, x: -40, filter: "blur(6px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ y: crystalY }}
          className="hidden lg:flex justify-center"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-[60px] scale-90 animate-[glow-pulse_4s_ease-in-out_infinite]" />
            <img
              src={heroCrystal}
              alt="Crystal ball with tarot cards"
              className="relative z-10 w-full max-w-[360px] animate-float"
              loading="eager"
            />
          </div>
        </motion.div>

        {/* Center — text with reveal */}
        <motion.div style={{ y: textY }} className="space-y-8 text-center max-w-xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.08] tracking-tight text-balance">
            <TextReveal text={t("hero.title1")} delay={0.2} />
            {" "}
            <em className="text-primary not-italic font-bold italic">
              <TextReveal text={t("hero.title2")} delay={0.6} />
            </em>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg text-muted-foreground leading-relaxed max-w-md mx-auto"
          >
            {t("hero.subtitle")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Button variant="hero" size="xl">
              <SparklesIcon className="w-5 h-5" />
              {t("hero.cta")}
            </Button>
            <Button variant="hero-outline" size="xl">
              <Send className="w-5 h-5" />
              {t("hero.telegram")}
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.6 }}
            className="flex items-center justify-center gap-3 pt-2"
          >
            <div className="flex -space-x-2">
              {["АМ", "ВК", "ОН", "ДС"].map((initials, i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full bg-surface-elevated border-2 border-background flex items-center justify-center text-xs font-medium text-muted-foreground"
                >
                  {initials}
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="text-foreground font-semibold">10 000+</span> {t("hero.socialProof")}
            </p>
          </motion.div>
        </motion.div>

        {/* Right — phone with parallax */}
        <motion.div
          initial={{ opacity: 0, x: 40, filter: "blur(6px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ y: phoneY }}
          className="hidden lg:flex justify-center"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-primary/15 rounded-full blur-[80px] scale-75 animate-[glow-pulse_4s_ease-in-out_infinite]" />
            <img
              src={heroPhone}
              alt="Таро Сонник — AI Эзотерик приложение"
              className="relative z-10 w-full max-w-[380px] animate-float"
              style={{ animationDelay: "1s" }}
              loading="eager"
            />
          </div>
        </motion.div>

        {/* Mobile: show both images */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex lg:hidden justify-center gap-6 items-center"
        >
          <img src={heroCrystal} alt="" className="w-36 animate-float" />
          <img src={heroPhone} alt="" className="w-36 animate-float" style={{ animationDelay: "1s" }} />
        </motion.div>
      </div>
    </section>
  );
};

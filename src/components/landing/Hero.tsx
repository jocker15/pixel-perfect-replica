import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles } from "./Sparkles";
import { Send, Sparkles as SparklesIcon } from "lucide-react";
import heroPhone from "@/assets/hero-phone.png";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <Sparkles count={40} />
      {/* Orange glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="container relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-24 lg:py-0">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight text-balance">
            Раскрой тайны звёзд и{" "}
            <em className="text-primary not-italic font-bold italic">
              открой свой космический путь
            </em>
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
            Мудрый AI-эзотерик с таро, нумерологией, астрологией и толкованием снов. 7 мистических практик в одном месте.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="hero" size="xl">
              <SparklesIcon className="w-5 h-5" />
              Начать бесплатно
            </Button>
            <Button variant="hero-outline" size="xl">
              <Send className="w-5 h-5" />
              Открыть в Telegram
            </Button>
          </div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex items-center gap-3 pt-2"
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
              <span className="text-foreground font-semibold">10 000+</span> пользователей доверяют звёздам
            </p>
          </motion.div>
        </motion.div>

        {/* Right — phone */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-primary/15 rounded-full blur-[80px] scale-75 animate-[glow-pulse_4s_ease-in-out_infinite]" />
            <img
              src={heroPhone}
              alt="Таро Сонник — AI Эзотерик приложение"
              className="relative z-10 w-full max-w-[420px] animate-float"
              loading="eager"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Brain, Users, Clock } from "lucide-react";

const ease = [0.16, 1, 0.3, 1];

export const Hero = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const valueProps = [
    { icon: Brain, label: t("hero.valueProp1") },
    { icon: Users, label: t("hero.valueProp2") },
    { icon: Clock, label: t("hero.valueProp3") },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Decorative gradient blob */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="container relative z-10 max-w-3xl mx-auto text-center py-24 space-y-8">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, ease }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-sm text-primary font-medium">
            {t("hero.badge")}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.15, ease }}
          className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.08] tracking-tight text-balance"
        >
          {t("hero.title1")}{" "}
          <span className="text-primary">{t("hero.title2")}</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease }}
          className="text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto"
        >
          {t("hero.subtitle")}
        </motion.p>

        {/* Value prop pills */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease }}
          className="flex flex-wrap justify-center gap-3"
        >
          {valueProps.map((vp) => (
            <div
              key={vp.label}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/60 text-sm text-muted-foreground"
            >
              <vp.icon className="w-4 h-4 text-primary" />
              {vp.label}
            </div>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Button variant="hero" size="xl" onClick={() => window.open("https://t.me/leadsassistant", "_blank")}>
            {t("hero.cta1")}
          </Button>
          <Button variant="hero-outline" size="xl">
            {t("hero.cta2")}
          </Button>
        </motion.div>

        {/* CTA note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="text-sm text-muted-foreground"
        >
          {t("hero.ctaNote")}
        </motion.p>

        {/* Text link CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.1 }}
        >
          <button
            onClick={() => navigate("/login")}
            className="text-sm text-primary hover:underline underline-offset-4 transition-colors"
          >
            {t("hero.cta3")}
          </button>
        </motion.div>
      </div>
    </section>
  );
};

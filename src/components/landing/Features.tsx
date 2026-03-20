import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowRight, Camera } from "lucide-react";
import { GlowCard } from "./GlowCard";

const classicModules = [
  { icon: "🔮", key: "tarot" },
  { icon: "🌙", key: "dreams" },
  { icon: "🔢", key: "numerology" },
  { icon: "⭐", key: "astrology" },
  { icon: "💑", key: "compatibility" },
  { icon: "ᚱ", key: "runes" },
  { icon: "☯", key: "iching" },
];

const visionModules = [
  { icon: "☕", key: "coffee", vision: true },
  { icon: "💎", key: "stones", vision: false },
  { icon: "🖐", key: "palm", vision: true },
  { icon: "✨", key: "aura", vision: true },
  { icon: "👤", key: "face", vision: true },
  { icon: "🏠", key: "fengshui", vision: true },
  { icon: "📜", key: "report", vision: false },
];

export const Features = () => {
  const { t } = useTranslation();

  const renderCard = (f: { icon: string; key: string; vision?: boolean }, i: number, groupOffset: number) => (
    <motion.div
      key={f.key}
      initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: (groupOffset + i) * 0.06, ease: [0.16, 1, 0.3, 1] }}
    >
      <GlowCard className="group bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 cursor-pointer h-full">
        <div className="relative flex items-start justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-3xl">{f.icon}</span>
              {f.vision && (
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider bg-primary/15 text-primary px-2 py-0.5 rounded-full">
                  <Camera className="w-3 h-3" />
                  AI Vision
                </span>
              )}
            </div>
            <h3 className="text-xl font-semibold font-serif">{t(`features.${f.key}`)}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{t(`features.${f.key}Desc`)}</p>
          </div>
          <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200 mt-1 shrink-0" />
        </div>
      </GlowCard>
    </motion.div>
  );

  return (
    <section className="relative py-24 lg:py-32">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t("features.title")}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t("features.subtitle")}</p>
        </motion.div>

        {/* Classic esoterics */}
        <motion.h3
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm font-mono uppercase tracking-widest text-primary mb-6"
        >
          {t("features.classicGroup")}
        </motion.h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-14">
          {classicModules.map((f, i) => renderCard(f, i, 0))}
        </div>

        {/* AI Vision + new practices */}
        <motion.h3
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm font-mono uppercase tracking-widest text-primary mb-6"
        >
          {t("features.visionGroup")}
        </motion.h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {visionModules.map((f, i) => renderCard(f, i, classicModules.length))}
        </div>
      </div>
    </section>
  );
};

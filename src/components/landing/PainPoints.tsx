import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { GlowCard } from "./GlowCard";

const stages = [1, 2, 3, 4, 5] as const;

const ease = [0.16, 1, 0.3, 1];

export const PainPoints = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t("painPoints.title")}</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">{t("painPoints.subtitle")}</p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line — desktop only */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />

          {stages.map((n, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease }}
                className={`relative flex flex-col md:flex-row items-center mb-12 last:mb-0 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Card */}
                <div className={`w-full md:w-[calc(50%-2rem)] ${isLeft ? "md:pr-0" : "md:pl-0"}`}>
                  <GlowCard className="rounded-2xl border border-border bg-card p-6">
                    <div className="flex items-start gap-4">
                      <span className="shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold text-sm">
                        {String(n).padStart(2, "0")}
                      </span>
                      <div className="space-y-2">
                        <h3 className="font-semibold text-lg font-sans">{t(`painPoints.stage${n}title`)}</h3>
                        {t(`painPoints.stage${n}situation`, "") && (
                          <p className="text-xs text-muted-foreground/70 italic">
                            {t(`painPoints.stage${n}situation`)}
                          </p>
                        )}
                        <p className="text-sm text-muted-foreground">{t(`painPoints.stage${n}need`)}</p>
                        <p className="text-sm text-destructive/80 italic">
                          {t(`painPoints.stage${n}usual`)}
                        </p>
                      </div>
                    </div>
                  </GlowCard>
                </div>

                {/* Dot on timeline — desktop only */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-primary bg-background z-10" />
              </motion.div>
            );
          })}

          {/* Solution card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: stages.length * 0.1, ease }}
            className="relative flex justify-center mt-12"
          >
            {/* Dot */}
            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 -top-6 w-4 h-4 rounded-full border-2 border-primary bg-primary z-10" />

            <div className="w-full md:w-[calc(50%+4rem)] rounded-2xl border-2 border-primary bg-primary/10 p-6 text-center">
              <p className="text-xl font-bold text-primary">{t("painPoints.solution")}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

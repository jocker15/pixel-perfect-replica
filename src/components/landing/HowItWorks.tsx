import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  ClipboardList,
  BookOpen,
  Layers,
  Palette,
  Users,
  FileText,
  UserCheck,
} from "lucide-react";
import { GlowCard } from "./GlowCard";

const steps = [
  { num: "01", icon: ClipboardList, key: "step1" },
  { num: "02", icon: BookOpen, key: "step2" },
  { num: "03", icon: Layers, key: "step3" },
] as const;

const solutions = [
  { key: "solution1", icon: Palette, accent: "bg-violet-500" },
  { key: "solution2", icon: Users, accent: "bg-blue-500" },
  { key: "solution3", icon: FileText, accent: "bg-green-500" },
  { key: "solution4", icon: UserCheck, accent: "bg-orange-500" },
] as const;

export const HowItWorks = () => {
  const { t } = useTranslation();

  return (
    <section className="relative py-24 lg:py-32">
      <div className="container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {t("howItWorks.title")}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t("howItWorks.subtitle")}
          </p>
        </motion.div>

        {/* 3 Steps — process flow */}
        <div className="relative grid md:grid-cols-3 gap-8 lg:gap-12 mb-20">
          {/* Dashed connector line (desktop only) */}
          <div className="hidden md:block absolute top-8 left-[20%] right-[20%] border-t-2 border-dashed border-border pointer-events-none" />

          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative text-center space-y-4"
            >
              {/* Number badge */}
              <div className="relative z-10 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20">
                <step.icon className="w-7 h-7 text-primary" />
              </div>
              <span className="block text-xs font-mono text-primary tracking-widest uppercase">
                {step.num}
              </span>
              <h3 className="text-xl font-semibold">
                {t(`howItWorks.${step.key}`)}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                {t(`howItWorks.${step.key}Desc`)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* 4 Solution cards — 2x2 / 4-col */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {solutions.map((sol, i) => (
            <motion.div
              key={sol.key}
              initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <GlowCard className="rounded-2xl bg-card border border-border p-6 h-full">
                {/* Colored accent bar */}
                <div
                  className={`w-10 h-1 rounded-full ${sol.accent} mb-5`}
                />
                <div className="flex items-center gap-3 mb-1">
                  <sol.icon className="w-5 h-5 text-muted-foreground" />
                  <h3 className="text-lg font-semibold">
                    {t(`howItWorks.${sol.key}`)}
                  </h3>
                </div>
                <p className="text-xs text-primary/70 uppercase tracking-wider mb-3">
                  {t(`howItWorks.${sol.key}Sub`)}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {t(`howItWorks.${sol.key}Desc`)}
                </p>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

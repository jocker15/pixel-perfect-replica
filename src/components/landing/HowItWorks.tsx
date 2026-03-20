import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { MessageSquare, Brain, Sparkles } from "lucide-react";

export const HowItWorks = () => {
  const { t } = useTranslation();

  const steps = [
    { icon: MessageSquare, title: t("howItWorks.step1"), desc: t("howItWorks.step1Desc"), num: "01" },
    { icon: Brain, title: t("howItWorks.step2"), desc: t("howItWorks.step2Desc"), num: "02" },
    { icon: Sparkles, title: t("howItWorks.step3"), desc: t("howItWorks.step3Desc"), num: "03" },
  ];

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
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t("howItWorks.title")}</h2>
          <p className="text-muted-foreground text-lg">{t("howItWorks.subtitle")}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-center space-y-5"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20">
                <step.icon className="w-7 h-7 text-primary" />
              </div>
              <span className="block text-xs font-mono text-primary tracking-widest uppercase">
                {t("howItWorks.step")} {step.num}
              </span>
              <h3 className="text-xl font-semibold font-serif">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

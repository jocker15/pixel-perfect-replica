import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Crown, Zap } from "lucide-react";

export const Pricing = () => {
  const { t } = useTranslation();

  const plans = [
    {
      name: t("pricing.free"),
      price: t("pricing.freePrice"),
      period: t("pricing.freePeriod"),
      features: [t("pricing.freeFeature1"), t("pricing.freeFeature2"), t("pricing.freeFeature3"), t("pricing.freeFeature4")],
      cta: t("pricing.freeCta"),
      featured: false,
      icon: Sparkles,
    },
    {
      name: t("pricing.trial"),
      price: t("pricing.trialPrice"),
      period: t("pricing.trialPeriod"),
      features: [t("pricing.trialFeature1"), t("pricing.trialFeature2"), t("pricing.trialFeature3")],
      cta: t("pricing.trialCta"),
      featured: false,
      icon: Zap,
    },
    {
      name: t("pricing.premium"),
      price: t("pricing.premiumPrice"),
      period: t("pricing.premiumPeriod"),
      features: [t("pricing.premiumFeature1"), t("pricing.premiumFeature2"), t("pricing.premiumFeature3"), t("pricing.premiumFeature4"), t("pricing.premiumFeature5")],
      cta: t("pricing.premiumCta"),
      featured: true,
      icon: Crown,
    },
  ];

  return (
    <section className="relative py-24 lg:py-32">
      <div className="container max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t("pricing.title")}</h2>
          <p className="text-muted-foreground text-lg">{t("pricing.subtitle")}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`relative rounded-2xl p-8 border ${
                plan.featured
                  ? "bg-card border-primary/40 shadow-xl shadow-primary/10"
                  : "bg-card border-border"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-semibold px-4 py-1 rounded-full">
                  {t("pricing.popular")}
                </div>
              )}

              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  plan.featured ? "bg-primary/20" : "bg-surface-elevated"
                }`}>
                  <plan.icon className={`w-5 h-5 ${plan.featured ? "text-primary" : "text-muted-foreground"}`} />
                </div>
                <h3 className="text-xl font-semibold font-serif">{plan.name}</h3>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground ml-2">/ {plan.period}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm">
                    <Check className={`w-4 h-4 shrink-0 ${plan.featured ? "text-primary" : "text-muted-foreground"}`} />
                    <span className="text-foreground/80">{f}</span>
                  </li>
                ))}
              </ul>

              <Button variant={plan.featured ? "hero" : "hero-outline"} size="lg" className="w-full">
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

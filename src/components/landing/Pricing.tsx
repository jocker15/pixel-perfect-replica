import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, Shield, Rocket, Pen, Crown, FileText, Users, Send, Film, UserCheck } from "lucide-react";

const tiers = [
  { n: 1, icon: Shield, featured: false, badge: null, featureCount: 7 },
  { n: 2, icon: Rocket, featured: true, badge: "popular", featureCount: 7 },
  { n: 3, icon: Pen, featured: false, badge: null, featureCount: 6 },
  { n: 4, icon: Crown, featured: false, badge: "current", featureCount: 4 },
];

const addonIcons = [FileText, Users, Send, Film, UserCheck];

const anim = {
  initial: { opacity: 0, y: 20, filter: "blur(4px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, amount: 0.2 as const },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

export const Pricing = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section className="relative py-24 lg:py-32">
      <div className="container">
        <motion.div {...anim} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t("pricing.title")}</h2>
          <p className="text-muted-foreground text-lg">{t("pricing.subtitle")}</p>
        </motion.div>

        {/* Tier cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {tiers.map((tier, i) => {
            const Icon = tier.icon;
            const features = Array.from({ length: tier.featureCount }, (_, j) =>
              t(`pricing.tier${tier.n}f${j + 1}`)
            );

            return (
              <motion.div
                key={tier.n}
                initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`relative rounded-2xl p-8 border flex flex-col ${
                  tier.featured
                    ? "bg-card border-primary/40 shadow-xl shadow-primary/10"
                    : "bg-card border-border"
                }`}
              >
                {tier.badge === "popular" && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-semibold px-4 py-1 rounded-full">
                    {t("pricing.popular")}
                  </div>
                )}
                {tier.badge === "current" && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 border border-primary/50 text-primary text-xs font-semibold px-4 py-1 rounded-full">
                    {t("pricing.current")}
                  </div>
                )}

                <div className="flex items-center gap-3 mb-2">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      tier.featured ? "bg-primary/20" : "bg-surface-elevated"
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${tier.featured ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <h3 className="text-lg font-semibold">{t(`pricing.tier${tier.n}name`)}</h3>
                </div>

                <p className="text-sm text-muted-foreground mb-4">
                  {t(`pricing.tier${tier.n}subtitle`)}
                </p>

                <div className="mb-1">
                  <span className="text-3xl font-bold">{t(`pricing.tier${tier.n}price`)}</span>
                  <span className="text-muted-foreground ml-1.5">{t("pricing.perMonth")}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-6">{t("pricing.orTrial")}</p>

                <ul className="space-y-2.5 mb-8 flex-1">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Check
                        className={`w-4 h-4 mt-0.5 shrink-0 ${
                          tier.featured ? "text-primary" : "text-muted-foreground"
                        }`}
                      />
                      <span className="text-foreground/80">{f}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={tier.featured ? "hero" : "hero-outline"}
                  size="lg"
                  className="w-full"
                  onClick={() => navigate("/login")}
                >
                  {t(`pricing.tier${tier.n}cta`)}
                </Button>
              </motion.div>
            );
          })}
        </div>

        {/* Add-ons */}
        <motion.div {...anim} className="text-center mb-10">
          <h3 className="text-2xl font-bold mb-2">{t("pricing.addonsTitle")}</h3>
          <p className="text-muted-foreground">{t("pricing.addonsSubtitle")}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((n, i) => {
            const Icon = addonIcons[i];
            return (
              <motion.div
                key={n}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="bg-card border border-border rounded-xl p-5 flex flex-col"
              >
                <div className="w-9 h-9 rounded-lg bg-surface-elevated flex items-center justify-center mb-3">
                  <Icon className="w-4 h-4 text-muted-foreground" />
                </div>
                <h4 className="font-semibold text-sm mb-1">{t(`pricing.addon${n}name`)}</h4>
                <p className="text-xs text-muted-foreground mb-3 flex-1">{t(`pricing.addon${n}desc`)}</p>
                <p className="text-lg font-bold mb-3">
                  {t(`pricing.addon${n}price`)} <span className="text-xs font-normal text-muted-foreground">₽/мес</span>
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  {t("pricing.addonCta")}
                </Button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

export const Footer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      {/* Final CTA */}
      <section className="py-24 lg:py-32">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t("cta.title")}</h2>
            <p className="text-muted-foreground text-lg mb-8">{t("cta.subtitle")}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="hero" size="lg" onClick={() => navigate("/login")}>
                {t("cta.integration")}
              </Button>
              <Button variant="hero-outline" size="lg">
                {t("cta.consultation")}
              </Button>
              <Button variant="link" onClick={() => navigate("/login")}>
                {t("cta.free")}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              <span className="font-semibold text-lg">{t("footer.brand")}</span>
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a
                href="https://t.me/leadsassistant"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                {t("footer.telegram")}
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                {t("footer.support")}
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                {t("footer.privacy")}
              </a>
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">{t("footer.tagline")}</p>
          <p className="text-center text-xs text-muted-foreground mt-2">{t("footer.copyright")}</p>
        </div>
      </footer>
    </>
  );
};

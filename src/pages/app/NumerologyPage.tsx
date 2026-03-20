import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

export default function NumerologyPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold font-serif mb-1">{t("app.numerology.title")}</h1>
        <p className="text-muted-foreground text-sm">{t("app.numerology.subtitle")}</p>
      </motion.div>

      <div className="space-y-4">
        <input
          placeholder={t("app.numerology.name")}
          className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm focus:border-primary focus:outline-none transition-colors"
        />
        <input
          type="date"
          placeholder={t("app.numerology.birthDate")}
          className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm focus:border-primary focus:outline-none transition-colors"
        />
      </div>

      <Button variant="hero" size="lg" className="w-full">{t("app.numerology.calculate")}</Button>
    </div>
  );
}

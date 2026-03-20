import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

export default function IChingPage() {
  const { t } = useTranslation();
  const [lines, setLines] = useState<boolean[]>([]);

  const castCoins = () => {
    setLines(Array.from({ length: 6 }, () => Math.random() > 0.5));
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold font-serif mb-1">{t("app.iching.title")}</h1>
        <p className="text-muted-foreground text-sm">{t("app.iching.subtitle")}</p>
      </motion.div>

      <Button variant="hero" size="lg" className="w-full" onClick={castCoins}>{t("app.iching.castCoins")}</Button>

      {lines.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-2 py-6">
          {lines.map((solid, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: (5 - i) * 0.15, duration: 0.4 }}
              className="flex gap-2"
            >
              {solid ? (
                <div className="w-32 h-3 bg-primary rounded-full" />
              ) : (
                <>
                  <div className="w-14 h-3 bg-primary rounded-full" />
                  <div className="w-4" />
                  <div className="w-14 h-3 bg-primary rounded-full" />
                </>
              )}
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

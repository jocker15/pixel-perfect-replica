import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

const spreadTypes = ["daily", "situation", "threeCards", "celticCross"] as const;

export default function TarotPage() {
  const { t } = useTranslation();
  const [spread, setSpread] = useState<string>("daily");
  const [shuffling, setShuffling] = useState(false);
  const [cards, setCards] = useState<string[]>([]);

  const handleStart = () => {
    setShuffling(true);
    setCards([]);
    setTimeout(() => {
      setShuffling(false);
      const count = spread === "celticCross" ? 10 : spread === "threeCards" ? 3 : 1;
      setCards(Array.from({ length: count }, (_, i) => `🃏`));
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold font-serif mb-1">{t("app.tarot.title")}</h1>
        <p className="text-muted-foreground text-sm">{t("app.tarot.subtitle")}</p>
      </motion.div>

      <div className="grid grid-cols-2 gap-2">
        {spreadTypes.map((s) => (
          <button
            key={s}
            onClick={() => { setSpread(s); setCards([]); }}
            className={`px-4 py-3 rounded-xl text-sm font-medium border transition-all ${
              spread === s ? "bg-primary/10 border-primary/40 text-primary" : "bg-card border-border text-muted-foreground hover:border-primary/20"
            }`}
          >
            {t(`app.tarot.${s}`)}
          </button>
        ))}
      </div>

      <input
        placeholder={t("app.tarot.question")}
        className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm focus:border-primary focus:outline-none transition-colors"
      />

      <Button variant="hero" size="lg" className="w-full" onClick={handleStart} disabled={shuffling}>
        {shuffling ? t("app.tarot.shuffle") : t("app.tarot.startReading")}
      </Button>

      {shuffling && (
        <div className="flex justify-center gap-3 py-8">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-16 h-24 bg-primary/10 rounded-lg border border-primary/20"
              animate={{ rotateY: [0, 180, 360], y: [0, -10, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      )}

      {cards.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="flex flex-wrap justify-center gap-3">
            {cards.map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, rotateY: 180, scale: 0.8 }}
                animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="w-20 h-32 bg-card border border-primary/20 rounded-xl flex items-center justify-center text-3xl shadow-lg shadow-primary/10"
              >
                🃏
              </motion.div>
            ))}
          </div>
          <div className="bg-card border border-border rounded-2xl p-5">
            <p className="text-sm text-muted-foreground leading-relaxed">{t("app.cardOfDayMeaning")}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}

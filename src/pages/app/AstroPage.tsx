import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const zodiacKeys = ["aries","taurus","gemini","cancer","leo","virgo","libra","scorpio","sagittarius","capricorn","aquarius","pisces"] as const;
const zodiacEmojis: Record<string, string> = { aries:"♈", taurus:"♉", gemini:"♊", cancer:"♋", leo:"♌", virgo:"♍", libra:"♎", scorpio:"♏", sagittarius:"♐", capricorn:"♑", aquarius:"♒", pisces:"♓" };

const topics = ["general", "love", "career", "health"] as const;

export default function AstroPage() {
  const { t } = useTranslation();
  const [sign, setSign] = useState("");
  const [topic, setTopic] = useState("general");

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold font-serif mb-1">{t("app.astro.title")}</h1>
        <p className="text-muted-foreground text-sm">{t("app.astro.subtitle")}</p>
      </motion.div>

      <div className="grid grid-cols-4 gap-2">
        {zodiacKeys.map((k) => (
          <button
            key={k}
            onClick={() => setSign(k)}
            className={`flex flex-col items-center gap-1 p-3 rounded-xl border text-sm transition-all ${
              sign === k ? "bg-primary/10 border-primary/40 text-primary" : "bg-card border-border text-muted-foreground hover:border-primary/20"
            }`}
          >
            <span className="text-xl">{zodiacEmojis[k]}</span>
            <span className="text-[10px]">{t(`zodiac.${k}`)}</span>
          </button>
        ))}
      </div>

      <div className="flex gap-1 bg-card rounded-full p-1 border border-border w-fit">
        {topics.map((k) => (
          <button
            key={k}
            onClick={() => setTopic(k)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              topic === k ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t(`app.astro.${k}`)}
          </button>
        ))}
      </div>

      {sign && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border rounded-2xl p-6 space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{zodiacEmojis[sign]}</span>
            <h2 className="font-serif font-semibold text-lg">{t(`zodiac.${sign}`)}</h2>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{t("app.astroDesc")}</p>
        </motion.div>
      )}
    </div>
  );
}

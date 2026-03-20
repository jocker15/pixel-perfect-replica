import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Heart, Users, Briefcase } from "lucide-react";

const zodiacKeys = [
  "aries", "taurus", "gemini", "cancer", "leo", "virgo",
  "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces",
] as const;

const zodiacEmojis: Record<string, string> = {
  aries: "♈", taurus: "♉", gemini: "♊", cancer: "♋",
  leo: "♌", virgo: "♍", libra: "♎", scorpio: "♏",
  sagittarius: "♐", capricorn: "♑", aquarius: "♒", pisces: "♓",
};

const CircularProgress = ({ value, label, icon: Icon }: { value: number; label: string; icon: React.ElementType }) => {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-24 h-24">
        <svg className="w-24 h-24 -rotate-90" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r={radius} fill="none" stroke="hsl(var(--border))" strokeWidth="6" />
          <motion.circle
            cx="40" cy="40" r={radius} fill="none"
            stroke="hsl(var(--primary))" strokeWidth="6" strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: offset }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold">{value}%</span>
        </div>
      </div>
      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <Icon className="w-4 h-4 text-primary" />
        {label}
      </div>
    </div>
  );
};

export const CompatibilityChecker = () => {
  const { t } = useTranslation();
  const [sign1, setSign1] = useState("");
  const [sign2, setSign2] = useState("");
  const [showResult, setShowResult] = useState(false);

  const handleCheck = () => {
    if (sign1 && sign2) setShowResult(true);
  };

  return (
    <section className="relative py-24 lg:py-32">
      <div className="container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t("compatibility.title")}</h2>
          <p className="text-muted-foreground text-lg">{t("compatibility.subtitle")}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="bg-card border border-border rounded-2xl p-8"
        >
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm text-muted-foreground mb-2">{t("compatibility.yourSign")}</label>
              <select
                value={sign1}
                onChange={(e) => { setSign1(e.target.value); setShowResult(false); }}
                className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:border-primary focus:outline-none transition-colors appearance-none"
              >
                <option value="">{t("compatibility.selectSign")}</option>
                {zodiacKeys.map((k) => (
                  <option key={k} value={k}>{zodiacEmojis[k]} {t(`zodiac.${k}`)}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-2">{t("compatibility.partnerSign")}</label>
              <select
                value={sign2}
                onChange={(e) => { setSign2(e.target.value); setShowResult(false); }}
                className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:border-primary focus:outline-none transition-colors appearance-none"
              >
                <option value="">{t("compatibility.selectSign")}</option>
                {zodiacKeys.map((k) => (
                  <option key={k} value={k}>{zodiacEmojis[k]} {t(`zodiac.${k}`)}</option>
                ))}
              </select>
            </div>
          </div>

          <Button variant="hero" size="lg" className="w-full" onClick={handleCheck} disabled={!sign1 || !sign2}>
            {t("compatibility.check")}
          </Button>

          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 space-y-6"
            >
              <div className="flex justify-center gap-8 sm:gap-12">
                <CircularProgress value={78} label={t("compatibility.love")} icon={Heart} />
                <CircularProgress value={85} label={t("compatibility.friendship")} icon={Users} />
                <CircularProgress value={72} label={t("compatibility.work")} icon={Briefcase} />
              </div>
              <p className="text-center text-muted-foreground text-sm max-w-md mx-auto">
                {t("compatibility.result")}
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

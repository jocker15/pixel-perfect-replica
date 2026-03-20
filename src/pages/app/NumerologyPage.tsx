import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { useStreaming } from "@/hooks/use-streaming";
import { numerologyAnalyze } from "@/lib/api";

export default function NumerologyPage() {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const { text: result, loading, start } = useStreaming();

  const handleCalculate = () => {
    start((cb, signal) => numerologyAnalyze({ name, birth_date: birthDate }, cb, signal));
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold font-serif mb-1">{t("app.numerology.title")}</h1>
        <p className="text-muted-foreground text-sm">{t("app.numerology.subtitle")}</p>
      </motion.div>

      <div className="space-y-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t("app.numerology.name")}
          className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm focus:border-primary focus:outline-none transition-colors"
        />
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          placeholder={t("app.numerology.birthDate")}
          className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm focus:border-primary focus:outline-none transition-colors"
        />
      </div>

      <Button variant="hero" size="lg" className="w-full" onClick={handleCalculate} disabled={!name || !birthDate || loading}>
        {loading ? "..." : t("app.numerology.calculate")}
      </Button>

      {result && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border rounded-2xl p-5">
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{result}</p>
        </motion.div>
      )}
    </div>
  );
}

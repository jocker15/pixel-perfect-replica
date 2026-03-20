import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { useStreaming } from "@/hooks/use-streaming";
import { compatCheck } from "@/lib/api";

export default function CompatPage() {
  const { t } = useTranslation();
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const { text: result, loading, start } = useStreaming();

  const handleAnalyze = () => {
    start((cb, signal) => compatCheck({ date1, date2 }, cb, signal));
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold font-serif mb-1">{t("app.compat.title")}</h1>
        <p className="text-muted-foreground text-sm">{t("app.compat.subtitle")}</p>
      </motion.div>

      <div className="space-y-4">
        <input type="date" value={date1} onChange={(e) => setDate1(e.target.value)} className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm focus:border-primary focus:outline-none transition-colors" />
        <input type="date" value={date2} onChange={(e) => setDate2(e.target.value)} className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm focus:border-primary focus:outline-none transition-colors" />
      </div>

      <Button variant="hero" size="lg" className="w-full" onClick={handleAnalyze} disabled={!date1 || !date2 || loading}>
        {loading ? "..." : t("app.compat.analyze")}
      </Button>

      {result && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border rounded-2xl p-5">
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{result}</p>
        </motion.div>
      )}
    </div>
  );
}

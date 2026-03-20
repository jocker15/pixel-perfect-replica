import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";
import { useStreaming } from "@/hooks/use-streaming";
import { dreamInterpret } from "@/lib/api";

export default function DreamPage() {
  const { t } = useTranslation();
  const [text, setText] = useState("");
  const { text: result, loading, start, reset } = useStreaming();

  const handleInterpret = () => {
    start((cb, signal) => dreamInterpret({ text }, cb, signal));
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold font-serif mb-1">{t("app.dream.title")}</h1>
        <p className="text-muted-foreground text-sm">{t("app.dream.subtitle")}</p>
      </motion.div>

      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => { setText(e.target.value); reset(); }}
          placeholder={t("app.dream.placeholder")}
          rows={6}
          className="w-full bg-card border border-border rounded-2xl px-4 py-3 text-sm focus:border-primary focus:outline-none transition-colors resize-none"
        />
        <button className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors active:scale-95">
          <Mic className="w-5 h-5" />
        </button>
      </div>

      <Button variant="hero" size="lg" className="w-full" disabled={!text.trim() || loading} onClick={handleInterpret}>
        {loading ? "..." : t("app.dream.interpret")}
      </Button>

      {result && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border rounded-2xl p-5">
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{result}</p>
        </motion.div>
      )}
    </div>
  );
}

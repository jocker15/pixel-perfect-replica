import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Gem, Sparkles } from "lucide-react";
import { useStreaming } from "@/hooks/use-streaming";
import { stonesReading } from "@/lib/api";

export default function StonesPage() {
  const { t } = useTranslation();
  const [mode, setMode] = useState<"stoneDay" | "recommend">("stoneDay");
  const [need, setNeed] = useState("");
  const { text: result, loading, start, reset } = useStreaming();

  const handleGenerate = () => {
    start((cb, signal) =>
      stonesReading({ type: mode, need: need || undefined }, cb, signal)
    );
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-1">
          <Gem className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold font-serif">{t("app.stones.title")}</h1>
        </div>
        <p className="text-muted-foreground text-sm">{t("app.stones.subtitle")}</p>
      </motion.div>

      <div className="grid grid-cols-2 gap-2">
        {(["stoneDay", "recommend"] as const).map((m) => (
          <button
            key={m}
            onClick={() => { setMode(m); reset(); }}
            className={`px-4 py-3 rounded-xl text-sm font-medium border transition-all ${
              mode === m ? "bg-primary/10 border-primary/40 text-primary" : "bg-card border-border text-muted-foreground hover:border-primary/20"
            }`}
          >
            {t(`app.stones.${m}`)}
          </button>
        ))}
      </div>

      {mode === "recommend" && (
        <input
          value={need}
          onChange={(e) => setNeed(e.target.value)}
          placeholder={t("app.stones.needPlaceholder")}
          className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm focus:border-primary focus:outline-none transition-colors"
        />
      )}

      <Button variant="hero" size="lg" className="w-full" onClick={handleGenerate} disabled={loading || (mode === "recommend" && !need)}>
        {loading ? (
          <>
            <Sparkles className="w-5 h-5 animate-spin" />
            Ищем камень...
          </>
        ) : t("app.stones.find")}
      </Button>

      {result && !loading && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="bg-card border border-border rounded-2xl p-6">
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{result}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}

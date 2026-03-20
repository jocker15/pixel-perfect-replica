import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Gem, Sparkles } from "lucide-react";

const stoneColors: Record<string, string> = {
  "Аметист": "from-purple-900/30 to-purple-600/10",
  "Розовый кварц": "from-pink-900/30 to-pink-600/10",
  "Тигровый глаз": "from-amber-900/30 to-amber-600/10",
  "Лунный камень": "from-slate-700/30 to-slate-400/10",
};

export default function StonesPage() {
  const { t } = useTranslation();
  const [mode, setMode] = useState<"stoneDay" | "recommend">("stoneDay");
  const [need, setNeed] = useState("");
  const [result, setResult] = useState<{ name: string; desc: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      setResult({
        name: "Аметист",
        desc: "Камень духовного пробуждения и защиты. Аметист усиливает интуицию, очищает разум от тревог и помогает в медитации. Носи его ближе к телу — он создаст вокруг тебя поле спокойствия. Особенно силён при растущей Луне.",
      });
      setLoading(false);
    }, 1800);
  };

  const gradient = result ? (stoneColors[result.name] || "from-primary/20 to-primary/5") : "";

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
            onClick={() => { setMode(m); setResult(null); }}
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

      {result && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className={`bg-gradient-to-br ${gradient} border border-border rounded-2xl p-6 space-y-4`}>
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl">
                💎
              </div>
              <h2 className="text-2xl font-bold font-serif">{result.name}</h2>
            </div>
            <p className="text-sm leading-relaxed text-foreground/80">{result.desc}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}

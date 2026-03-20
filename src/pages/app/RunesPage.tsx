import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { useStreaming } from "@/hooks/use-streaming";
import { runesReading } from "@/lib/api";

const runeChars = ["ᚠ","ᚢ","ᚦ","ᚨ","ᚱ","ᚲ","ᚷ","ᚹ","ᚺ","ᚾ","ᛁ","ᛃ","ᛇ","ᛈ","ᛉ","ᛊ","ᛏ","ᛒ","ᛖ","ᛗ","ᛚ","ᛜ","ᛞ","ᛟ"];

export default function RunesPage() {
  const { t } = useTranslation();
  const [spread, setSpread] = useState("oneRune");
  const [question, setQuestion] = useState("");
  const [runes, setRunes] = useState<string[]>([]);
  const { text: result, loading, start, reset } = useStreaming();

  const handleCast = () => {
    const count = spread === "threeRunes" ? 3 : 1;
    const picked = Array.from({ length: count }, () => runeChars[Math.floor(Math.random() * runeChars.length)]);
    setRunes(picked);
    reset();
    start((cb, signal) =>
      runesReading({ spread_type: spread, question: question || undefined }, cb, signal)
    );
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold font-serif mb-1">{t("app.runes.title")}</h1>
        <p className="text-muted-foreground text-sm">{t("app.runes.subtitle")}</p>
      </motion.div>

      <div className="flex gap-2">
        {(["oneRune", "threeRunes", "question"] as const).map((s) => (
          <button
            key={s}
            onClick={() => { setSpread(s); setRunes([]); reset(); }}
            className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
              spread === s ? "bg-primary/10 border-primary/40 text-primary" : "bg-card border-border text-muted-foreground"
            }`}
          >
            {t(`app.runes.${s}`)}
          </button>
        ))}
      </div>

      {spread === "question" && (
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder={t("app.tarot.question")}
          className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm focus:border-primary focus:outline-none transition-colors"
        />
      )}

      <Button variant="hero" size="lg" className="w-full" onClick={handleCast} disabled={loading}>
        {loading ? "..." : t("app.runes.cast")}
      </Button>

      {runes.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="flex justify-center gap-4">
            {runes.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: i * 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-24 h-32 bg-card border border-primary/20 rounded-2xl flex items-center justify-center text-5xl text-primary shadow-lg shadow-primary/10"
              >
                {r}
              </motion.div>
            ))}
          </div>
          {result && (
            <div className="bg-card border border-border rounded-2xl p-5">
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">{result}</p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}

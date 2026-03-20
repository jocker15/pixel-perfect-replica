import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { PhotoUploader } from "@/components/app/PhotoUploader";
import { Hand, BookOpen } from "lucide-react";

const palmLines = [
  { key: "lifeLine", icon: "❤️", title: "Линия жизни", desc: "Отражает жизненную силу, здоровье и важные жизненные события." },
  { key: "heartLine", icon: "💕", title: "Линия сердца", desc: "Показывает эмоциональную жизнь, отношения и способность любить." },
  { key: "headLine", icon: "🧠", title: "Линия ума", desc: "Отражает интеллект, стиль мышления и коммуникативные способности." },
  { key: "fateLine", icon: "⭐", title: "Линия судьбы", desc: "Показывает влияние внешних обстоятельств на жизненный путь." },
];

export default function PalmPage() {
  const { t } = useTranslation();
  const [mode, setMode] = useState<"photo" | "info">("photo");
  const [result, setResult] = useState<typeof palmLines | null>(null);
  const [loading, setLoading] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  const handleAnalyze = () => {
    setLoading(true);
    setScanProgress(0);
    const interval = setInterval(() => {
      setScanProgress((p) => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return p + 2;
      });
    }, 40);
    setTimeout(() => {
      clearInterval(interval);
      setScanProgress(100);
      setResult([
        { ...palmLines[0], desc: "Длинная и чёткая линия жизни — знак крепкого здоровья и долголетия. Небольшое ответвление в середине указывает на значимую перемену в зрелом возрасте." },
        { ...palmLines[1], desc: "Глубокая линия сердца говорит о богатой эмоциональной жизни. Изгиб к указательному пальцу — знак романтичной и идеалистичной натуры." },
        { ...palmLines[2], desc: "Прямая линия ума — аналитический склад мышления. Ты принимаешь решения на основе логики, но не забываешь про интуицию." },
        { ...palmLines[3], desc: "Чёткая линия судьбы указывает на целеустремлённость. Твой путь определён внутренними убеждениями, а не внешними обстоятельствами." },
      ]);
      setLoading(false);
    }, 2500);
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-1">
          <Hand className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold font-serif">{t("app.palm.title")}</h1>
        </div>
        <p className="text-muted-foreground text-sm">{t("app.palm.subtitle")}</p>
      </motion.div>

      <div className="grid grid-cols-2 gap-2">
        <button onClick={() => { setMode("photo"); setResult(null); }} className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium border transition-all ${mode === "photo" ? "bg-primary/10 border-primary/40 text-primary" : "bg-card border-border text-muted-foreground"}`}>
          <Hand className="w-4 h-4" /> {t("app.palm.photoAnalysis")}
        </button>
        <button onClick={() => setMode("info")} className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium border transition-all ${mode === "info" ? "bg-primary/10 border-primary/40 text-primary" : "bg-card border-border text-muted-foreground"}`}>
          <BookOpen className="w-4 h-4" /> {t("app.palm.info")}
        </button>
      </div>

      {mode === "photo" && (
        <>
          <PhotoUploader
            maxPhotos={1}
            instruction={t("app.palm.instruction")}
            analyzeLabel={t("app.palm.analyze")}
            onPhotosReady={handleAnalyze}
            loading={loading}
          />

          {/* Scan line animation */}
          {loading && (
            <div className="relative h-2 bg-card rounded-full overflow-hidden border border-border">
              <motion.div
                className="h-full bg-primary rounded-full"
                style={{ width: `${scanProgress}%` }}
              />
            </div>
          )}

          {result && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
              {result.map((line, i) => (
                <motion.div
                  key={line.key}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className="bg-card border border-border rounded-2xl p-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{line.icon}</span>
                    <h3 className="font-serif font-semibold">{line.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{line.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </>
      )}

      {mode === "info" && (
        <div className="space-y-3">
          {palmLines.map((line, i) => (
            <motion.div
              key={line.key}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-2xl p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{line.icon}</span>
                <h3 className="font-serif font-semibold">{line.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{line.desc}</p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

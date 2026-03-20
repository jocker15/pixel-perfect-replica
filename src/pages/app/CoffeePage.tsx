import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { PhotoUploader } from "@/components/app/PhotoUploader";
import { Coffee, Sparkles, MessageSquare, Camera } from "lucide-react";

const modes = ["symbolDay", "askQuestion", "photoAnalysis"] as const;
const modeIcons = { symbolDay: Sparkles, askQuestion: MessageSquare, photoAnalysis: Camera };

export default function CoffeePage() {
  const { t } = useTranslation();
  const [mode, setMode] = useState<string>("symbolDay");
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      setResult("☽ В чашке просматривается символ полумесяца — знак перемен и интуиции. Ближайшие дни принесут неожиданные открытия. Доверьтесь внутреннему голосу, он укажет верный путь. Рядом с полумесяцем — фигура птицы, символ хороших новостей издалека.");
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-1">
          <Coffee className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold font-serif">{t("app.coffee.title")}</h1>
        </div>
        <p className="text-muted-foreground text-sm">{t("app.coffee.subtitle")}</p>
      </motion.div>

      {/* Mode selector */}
      <div className="grid grid-cols-3 gap-2">
        {modes.map((m) => {
          const Icon = modeIcons[m];
          return (
            <button
              key={m}
              onClick={() => { setMode(m); setResult(""); }}
              className={`flex flex-col items-center gap-2 px-3 py-4 rounded-xl text-xs font-medium border transition-all ${
                mode === m ? "bg-primary/10 border-primary/40 text-primary" : "bg-card border-border text-muted-foreground hover:border-primary/20"
              }`}
            >
              <Icon className="w-5 h-5" />
              {t(`app.coffee.${m}`)}
            </button>
          );
        })}
      </div>

      {/* Mode content */}
      {mode === "symbolDay" && (
        <Button variant="hero" size="lg" className="w-full" onClick={handleGenerate} disabled={loading}>
          {loading ? "Читаем символы..." : t("app.coffee.symbolDay")}
        </Button>
      )}

      {mode === "askQuestion" && (
        <div className="space-y-4">
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder={t("app.coffee.questionPlaceholder")}
            className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm focus:border-primary focus:outline-none transition-colors"
          />
          <Button variant="hero" size="lg" className="w-full" onClick={handleGenerate} disabled={loading || !question}>
            {loading ? "Читаем символы..." : t("app.coffee.analyze")}
          </Button>
        </div>
      )}

      {mode === "photoAnalysis" && (
        <PhotoUploader
          maxPhotos={3}
          instruction="Сфотографируй кофейную чашку после того, как допьёшь кофе"
          analyzeLabel={t("app.coffee.analyze")}
          onPhotosReady={handleGenerate}
          loading={loading}
        />
      )}

      {/* Steam animation while loading */}
      {loading && (
        <div className="flex justify-center py-6">
          <div className="relative">
            <Coffee className="w-16 h-16 text-primary/40" />
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute w-2 rounded-full bg-primary/20"
                style={{ left: 18 + i * 10, bottom: 60 }}
                animate={{ y: [-10, -40], opacity: [0.6, 0], height: [8, 20] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4, ease: "easeOut" }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Result */}
      {result && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border rounded-2xl p-5 space-y-3">
          <p className="text-sm leading-relaxed">{result}</p>
          <Button variant="hero-outline" size="sm">{t("app.coffee.share")}</Button>
        </motion.div>
      )}
    </div>
  );
}

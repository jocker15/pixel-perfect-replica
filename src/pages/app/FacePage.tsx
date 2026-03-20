import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { PhotoUploader } from "@/components/app/PhotoUploader";
import { ScanFace, BookOpen } from "lucide-react";

const faceFeatures = [
  { key: "forehead", icon: "🧠", title: "Лоб", desc: "Высокий и широкий лоб — признак интеллекта и стратегического мышления." },
  { key: "eyes", icon: "👁️", title: "Глаза", desc: "Большие выразительные глаза говорят об открытости и эмоциональности." },
  { key: "nose", icon: "👃", title: "Нос", desc: "Прямой нос указывает на целеустремлённость и практичность." },
  { key: "lips", icon: "👄", title: "Губы", desc: "Полные губы — знак чувственности и щедрости натуры." },
  { key: "chin", icon: "🗿", title: "Подбородок", desc: "Выраженный подбородок говорит о силе воли и настойчивости." },
];

export default function FacePage() {
  const { t } = useTranslation();
  const [mode, setMode] = useState<"photo" | "info">("photo");
  const [result, setResult] = useState<typeof faceFeatures | null>(null);
  const [loading, setLoading] = useState(false);
  const [gridVisible, setGridVisible] = useState(false);

  const handleAnalyze = () => {
    setLoading(true);
    setGridVisible(true);
    setTimeout(() => {
      setGridVisible(false);
      setResult([
        { ...faceFeatures[0], desc: "Высокий открытый лоб указывает на аналитический склад ума. Ты умеешь видеть общую картину и планировать на несколько шагов вперёд." },
        { ...faceFeatures[1], desc: "Глубоко посаженные глаза — знак наблюдательности и вдумчивости. Ты замечаешь то, что другие упускают из виду." },
        { ...faceFeatures[2], desc: "Аккуратный нос средней длины говорит о дипломатичности и умении находить баланс в сложных ситуациях." },
        { ...faceFeatures[3], desc: "Чётко очерченные губы указывают на решительность в высказываниях и прямоту характера." },
        { ...faceFeatures[4], desc: "Слегка выступающий подбородок — знак упорства. Ты не отступаешь перед трудностями." },
      ]);
      setLoading(false);
    }, 2500);
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-1">
          <ScanFace className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold font-serif">{t("app.face.title")}</h1>
        </div>
        <p className="text-muted-foreground text-sm">{t("app.face.subtitle")}</p>
      </motion.div>

      <div className="grid grid-cols-2 gap-2">
        <button onClick={() => { setMode("photo"); setResult(null); }} className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium border transition-all ${mode === "photo" ? "bg-primary/10 border-primary/40 text-primary" : "bg-card border-border text-muted-foreground"}`}>
          <ScanFace className="w-4 h-4" /> {t("app.face.photoAnalysis")}
        </button>
        <button onClick={() => setMode("info")} className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium border transition-all ${mode === "info" ? "bg-primary/10 border-primary/40 text-primary" : "bg-card border-border text-muted-foreground"}`}>
          <BookOpen className="w-4 h-4" /> {t("app.face.info")}
        </button>
      </div>

      {mode === "photo" && (
        <>
          <PhotoUploader
            maxPhotos={1}
            instruction={t("app.face.instruction")}
            analyzeLabel={t("app.face.analyze")}
            onPhotosReady={handleAnalyze}
            loading={loading}
          />

          {/* Face grid overlay animation */}
          {gridVisible && (
            <div className="flex justify-center py-4">
              <motion.div
                className="w-32 h-40 border border-primary/30 rounded-xl relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: 1 }}
              >
                {[0.25, 0.5, 0.75].map((y) => (
                  <motion.div
                    key={y}
                    className="absolute left-0 right-0 h-px bg-primary/40"
                    style={{ top: `${y * 100}%` }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.5, delay: y * 0.3 }}
                  />
                ))}
                {[0.33, 0.66].map((x) => (
                  <motion.div
                    key={x}
                    className="absolute top-0 bottom-0 w-px bg-primary/40"
                    style={{ left: `${x * 100}%` }}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 + x * 0.3 }}
                  />
                ))}
              </motion.div>
            </div>
          )}

          {result && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
              {result.map((feat, i) => (
                <motion.div
                  key={feat.key}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.12 }}
                  className="bg-card border border-border rounded-2xl p-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{feat.icon}</span>
                    <h3 className="font-serif font-semibold">{feat.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feat.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </>
      )}

      {mode === "info" && (
        <div className="space-y-3">
          {faceFeatures.map((feat, i) => (
            <motion.div
              key={feat.key}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-2xl p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{feat.icon}</span>
                <h3 className="font-serif font-semibold">{feat.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

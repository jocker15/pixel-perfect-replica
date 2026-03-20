import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { PhotoUploader } from "@/components/app/PhotoUploader";
import { Compass, BookOpen } from "lucide-react";

const baguaZones = [
  { key: "wealth", icon: "💰", title: "Богатство (ЮВ)", desc: "Зона процветания и материального благополучия. Усиливай фиолетовым цветом и живыми растениями." },
  { key: "fame", icon: "🔥", title: "Слава (Ю)", desc: "Зона признания и репутации. Активируй красным цветом, свечами и наградами." },
  { key: "love", icon: "💕", title: "Любовь (ЮЗ)", desc: "Зона отношений и партнёрства. Парные предметы и розовые тона усиливают энергию." },
  { key: "family", icon: "👨‍👩‍👧", title: "Семья (В)", desc: "Зона здоровья и семейных связей. Зелёный цвет и семейные фото." },
  { key: "center", icon: "☯️", title: "Центр", desc: "Зона здоровья и баланса. Держи свободным и светлым." },
  { key: "creativity", icon: "🎨", title: "Творчество (З)", desc: "Зона детей и креативности. Белый и металлические цвета." },
  { key: "knowledge", icon: "📚", title: "Знания (СВ)", desc: "Зона мудрости и самопознания. Книги, кристаллы, синий цвет." },
  { key: "career", icon: "💼", title: "Карьера (С)", desc: "Зона жизненного пути. Чёрный цвет и вода (фонтан, аквариум)." },
];

export default function FengShuiPage() {
  const { t } = useTranslation();
  const [mode, setMode] = useState<"photo" | "info">("photo");
  const [result, setResult] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [compassAngle, setCompassAngle] = useState(0);

  const handleAnalyze = () => {
    setLoading(true);
    // Compass rotation animation
    const interval = setInterval(() => {
      setCompassAngle((a) => a + 15);
    }, 100);
    setTimeout(() => {
      clearInterval(interval);
      setResult([
        "🪑 Расстановка: Диван стоит спиной к окну — это ослабляет позицию. Разверни его лицом ко входу для чувства контроля.",
        "🎨 Цвета: В комнате преобладает серый — добавь тёплые акценты (оранжевый, золотой) для активации энергии ци.",
        "🌿 Энергия ци: Углы комнаты «мёртвые» — поставь туда растения или торшер, чтобы энергия циркулировала.",
        "💡 Рекомендации: Зеркало напротив двери отражает энергию обратно — перевесь на боковую стену.",
      ]);
      setLoading(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-1">
          <Compass className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold font-serif">{t("app.fengshui.title")}</h1>
        </div>
        <p className="text-muted-foreground text-sm">{t("app.fengshui.subtitle")}</p>
      </motion.div>

      <div className="grid grid-cols-2 gap-2">
        <button onClick={() => { setMode("photo"); setResult(null); }} className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium border transition-all ${mode === "photo" ? "bg-primary/10 border-primary/40 text-primary" : "bg-card border-border text-muted-foreground"}`}>
          <Compass className="w-4 h-4" /> {t("app.fengshui.photoAnalysis")}
        </button>
        <button onClick={() => setMode("info")} className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium border transition-all ${mode === "info" ? "bg-primary/10 border-primary/40 text-primary" : "bg-card border-border text-muted-foreground"}`}>
          <BookOpen className="w-4 h-4" /> {t("app.fengshui.info")}
        </button>
      </div>

      {mode === "photo" && (
        <>
          <PhotoUploader
            maxPhotos={2}
            instruction={t("app.fengshui.instruction")}
            analyzeLabel={t("app.fengshui.analyze")}
            onPhotosReady={handleAnalyze}
            loading={loading}
          />

          {/* Compass animation */}
          {loading && (
            <div className="flex justify-center py-6">
              <motion.div
                className="w-20 h-20 rounded-full border-2 border-primary/30 flex items-center justify-center"
                style={{ rotate: compassAngle }}
              >
                <Compass className="w-10 h-10 text-primary" />
              </motion.div>
            </div>
          )}

          {result && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
              {result.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className="bg-card border border-border rounded-2xl p-4"
                >
                  <p className="text-sm leading-relaxed">{item}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </>
      )}

      {mode === "info" && (
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-mono text-primary">Карта Багуа — 8 зон</p>
          {baguaZones.map((zone, i) => (
            <motion.div
              key={zone.key}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-card border border-border rounded-2xl p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{zone.icon}</span>
                <h3 className="font-serif font-semibold text-sm">{zone.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{zone.desc}</p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

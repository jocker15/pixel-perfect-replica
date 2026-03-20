import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { PhotoUploader } from "@/components/app/PhotoUploader";
import { Button } from "@/components/ui/button";
import { Sparkles, Download, Share2 } from "lucide-react";

const auraColors: Record<string, { gradient: string; glow: string }> = {
  purple: { gradient: "from-purple-600/40 via-purple-400/20 to-transparent", glow: "shadow-purple-500/30" },
  blue: { gradient: "from-blue-600/40 via-blue-400/20 to-transparent", glow: "shadow-blue-500/30" },
  green: { gradient: "from-green-600/40 via-green-400/20 to-transparent", glow: "shadow-green-500/30" },
  gold: { gradient: "from-amber-500/40 via-yellow-400/20 to-transparent", glow: "shadow-amber-500/30" },
  red: { gradient: "from-red-600/40 via-red-400/20 to-transparent", glow: "shadow-red-500/30" },
  pink: { gradient: "from-pink-500/40 via-pink-300/20 to-transparent", glow: "shadow-pink-500/30" },
  white: { gradient: "from-white/30 via-slate-200/15 to-transparent", glow: "shadow-white/20" },
  orange: { gradient: "from-orange-500/40 via-orange-300/20 to-transparent", glow: "shadow-orange-500/30" },
};

export default function AuraPage() {
  const { t } = useTranslation();
  const [photo, setPhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ color: string; name: string; desc: string } | null>(null);
  const [pulseColor, setPulseColor] = useState(0);

  const handleAnalyze = (files: File[]) => {
    const reader = new FileReader();
    reader.onload = (e) => setPhoto(e.target?.result as string);
    reader.readAsDataURL(files[0]);

    setLoading(true);
    setResult(null);

    // Pulse animation through colors
    const colors = ["purple", "blue", "green", "gold"];
    let idx = 0;
    const interval = setInterval(() => {
      setPulseColor(idx);
      idx = (idx + 1) % colors.length;
    }, 500);

    setTimeout(() => {
      clearInterval(interval);
      setResult({
        color: "purple",
        name: "Фиолетовая",
        desc: "Ты в фазе глубокой духовной трансформации. Фиолетовая аура говорит о высокой интуиции, связи с тонким миром и способности видеть за пределами очевидного. Сейчас важно прислушиваться к внутреннему голосу — он ведёт тебя к истинному предназначению.",
      });
      setLoading(false);
    }, 3000);
  };

  const palette = result ? auraColors[result.color] : null;
  const pulseGradients = ["from-purple-500/30", "from-blue-500/30", "from-green-500/30", "from-amber-500/30"];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-1">
          <Sparkles className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold font-serif">{t("app.aura.title")}</h1>
        </div>
        <p className="text-muted-foreground text-sm">{t("app.aura.subtitle")}</p>
      </motion.div>

      {!photo && !result && (
        <PhotoUploader
          maxPhotos={1}
          instruction={t("app.aura.upload")}
          analyzeLabel="Узнать цвет ауры"
          onPhotosReady={handleAnalyze}
          loading={loading}
        />
      )}

      {/* Scanning animation */}
      {loading && photo && (
        <div className="relative flex justify-center">
          <div className="relative w-48 h-48 rounded-full overflow-hidden">
            <img src={photo} alt="" className="w-full h-full object-cover" />
            <motion.div
              className={`absolute inset-0 rounded-full bg-gradient-radial ${pulseGradients[pulseColor]} to-transparent`}
              animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0.2, 0.6] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
          <p className="absolute -bottom-8 text-sm text-primary animate-pulse">{t("app.aura.scanning")}</p>
        </div>
      )}

      {/* Result */}
      {result && photo && palette && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-5">
          {/* Photo with aura */}
          <div className="relative flex justify-center">
            <div className={`relative w-56 h-56 rounded-full shadow-2xl ${palette.glow}`}>
              <div className={`absolute -inset-6 rounded-full bg-gradient-radial ${palette.gradient} animate-pulse`} />
              <img src={photo} alt="" className="relative z-10 w-full h-full rounded-full object-cover border-2 border-white/10" />
            </div>
          </div>

          {/* Color badge */}
          <div className="text-center">
            <span className="inline-block bg-primary/10 text-primary text-lg font-serif font-semibold px-6 py-2 rounded-full">
              {result.name} аура
            </span>
          </div>

          {/* Description */}
          <div className="bg-card border border-border rounded-2xl p-5">
            <p className="text-sm leading-relaxed">{result.desc}</p>
          </div>

          {/* Share buttons */}
          <div className="flex gap-3">
            <Button variant="hero" size="lg" className="flex-1">
              <Share2 className="w-5 h-5" />
              {t("app.aura.share")}
            </Button>
            <Button variant="hero-outline" size="lg" className="flex-1">
              <Download className="w-5 h-5" />
              {t("app.aura.download")}
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

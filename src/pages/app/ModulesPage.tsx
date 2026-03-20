import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ArrowRight, Camera } from "lucide-react";

const classicModules = [
  { icon: "🔮", key: "tarot", path: "/app/tarot" },
  { icon: "🌙", key: "dreams", path: "/app/dream" },
  { icon: "🔢", key: "numerology", path: "/app/numerology" },
  { icon: "⭐", key: "astrology", path: "/app/astro" },
  { icon: "💑", key: "compatibility", path: "/app/compat" },
  { icon: "ᚱ", key: "runes", path: "/app/runes" },
  { icon: "☯", key: "iching", path: "/app/iching" },
];

const visionModules = [
  { icon: "☕", key: "coffee", path: "/app/coffee", vision: true },
  { icon: "💎", key: "stones", path: "/app/stones", vision: false },
  { icon: "🖐", key: "palm", path: "/app/palm", vision: true },
  { icon: "✨", key: "aura", path: "/app/aura", vision: true },
  { icon: "👤", key: "face", path: "/app/face", vision: true },
  { icon: "🏠", key: "fengshui", path: "/app/fengshui", vision: true },
  { icon: "📜", key: "report", path: "/app/report", vision: false },
];

export default function ModulesPage() {
  const { t } = useTranslation();

  const renderModule = (m: typeof classicModules[0] & { vision?: boolean }, i: number) => (
    <motion.div
      key={m.key}
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: i * 0.05, duration: 0.4 }}
    >
      <Link
        to={m.path}
        className="group flex items-center gap-4 bg-card border border-border rounded-2xl p-4 hover:border-primary/30 transition-all active:scale-[0.98]"
      >
        <span className="text-3xl">{m.icon}</span>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-serif font-semibold">{t(`features.${m.key}`)}</h3>
            {m.vision && (
              <span className="inline-flex items-center gap-1 text-[9px] font-semibold uppercase tracking-wider bg-primary/15 text-primary px-1.5 py-0.5 rounded-full">
                <Camera className="w-2.5 h-2.5" />
                AI Vision
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground">{t(`features.${m.key}Desc`)}</p>
        </div>
        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
      </Link>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold font-serif">{t("app.modules")}</h1>
      </motion.div>

      <div className="space-y-3">
        <p className="text-xs text-primary font-mono uppercase tracking-widest">{t("features.classicGroup")}</p>
        {classicModules.map((m, i) => renderModule(m, i))}
      </div>

      <div className="space-y-3">
        <p className="text-xs text-primary font-mono uppercase tracking-widest">{t("features.visionGroup")}</p>
        {visionModules.map((m, i) => renderModule(m, i + classicModules.length))}
      </div>
    </div>
  );
}

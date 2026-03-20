import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Camera } from "lucide-react";

const visionModules = [
  { icon: "☕", path: "/app/coffee", key: "coffee" },
  { icon: "🪨", path: "/app/stones", key: "stones" },
  { icon: "🤚", path: "/app/palm", key: "palm" },
  { icon: "🔮", path: "/app/aura", key: "aura" },
  { icon: "👤", path: "/app/face", key: "face" },
  { icon: "🏠", path: "/app/fengshui", key: "fengshui" },
  { icon: "📄", path: "/app/report", key: "report" },
];

export default function VisionPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-1">
          <Camera className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold font-serif">{t("app.visionPage.title")}</h1>
        </div>
        <p className="text-muted-foreground text-sm">{t("app.visionPage.subtitle")}</p>
      </motion.div>

      <div className="space-y-3">
        {visionModules.map((m, i) => (
          <motion.div
            key={m.key}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
          >
            <Link
              to={m.path}
              className="flex items-center gap-4 p-4 bg-card border border-border rounded-2xl hover:border-primary/30 transition-all hover:shadow-md hover:shadow-primary/5 active:scale-[0.98]"
            >
              <span className="text-3xl w-12 h-12 flex items-center justify-center bg-primary/10 rounded-xl shrink-0">
                {m.icon}
              </span>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold font-serif">{t(`features.${m.key}`)}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{t(`features.${m.key}Desc`)}</p>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-primary bg-primary/10 px-2 py-1 rounded-full shrink-0">
                <Camera className="w-3 h-3" />
                AI Vision
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

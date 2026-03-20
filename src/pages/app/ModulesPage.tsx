import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const modules = [
  { icon: "🔮", key: "tarot", path: "/app/tarot" },
  { icon: "🌙", key: "dreams", path: "/app/dream" },
  { icon: "🔢", key: "numerology", path: "/app/numerology" },
  { icon: "⭐", key: "astrology", path: "/app/astro" },
  { icon: "💑", key: "compatibility", path: "/app/compat" },
  { icon: "ᚱ", key: "runes", path: "/app/runes" },
  { icon: "☯", key: "iching", path: "/app/iching" },
];

export default function ModulesPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold font-serif">{t("app.modules")}</h1>
      </motion.div>

      <div className="space-y-3">
        {modules.map((m, i) => (
          <motion.div
            key={m.key}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
          >
            <Link
              to={m.path}
              className="group flex items-center gap-4 bg-card border border-border rounded-2xl p-4 hover:border-primary/30 transition-all active:scale-[0.98]"
            >
              <span className="text-3xl">{m.icon}</span>
              <div className="flex-1">
                <h3 className="font-serif font-semibold">{t(`features.${m.key}`)}</h3>
                <p className="text-xs text-muted-foreground">{t(`features.${m.key}Desc`)}</p>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

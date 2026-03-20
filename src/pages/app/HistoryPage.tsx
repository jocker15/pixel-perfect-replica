import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const mockHistory = [
  { date: "2026-03-20", module: "🔮", titleKey: "tarot", summary: "Расклад на день — Маг" },
  { date: "2026-03-19", module: "🌙", titleKey: "dreams", summary: "Сон про полёт над городом" },
  { date: "2026-03-18", module: "⭐", titleKey: "astrology", summary: "Гороскоп — Овен, общий" },
  { date: "2026-03-17", module: "ᚱ", titleKey: "runes", summary: "Руна дня — Феху" },
];

export default function HistoryPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold font-serif">{t("app.historyPage.title")}</h1>
      </motion.div>

      <div className="space-y-3">
        {mockHistory.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4"
          >
            <span className="text-2xl">{item.module}</span>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm">{t(`features.${item.titleKey}`)}</h3>
              <p className="text-xs text-muted-foreground truncate">{item.summary}</p>
            </div>
            <span className="text-xs text-muted-foreground shrink-0">{item.date}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

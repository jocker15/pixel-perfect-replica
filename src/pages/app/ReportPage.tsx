import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { FileText, Download, Lock, User } from "lucide-react";

const steps = [
  "Составляю карту зодиака...",
  "Рассчитываю нумерологию...",
  "Подбираю личную карту таро...",
  "Определяю личную руну...",
  "Формирую рекомендации...",
  "Оформляю PDF-отчёт...",
];

export default function ReportPage() {
  const { t } = useTranslation();
  const [generating, setGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [done, setDone] = useState(false);

  // Mock: assume profile is filled
  const profileFilled = true;
  const isPremium = false;

  const handleGenerate = () => {
    setGenerating(true);
    setCurrentStep(0);
    setDone(false);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step >= steps.length) {
        clearInterval(interval);
        setGenerating(false);
        setDone(true);
      } else {
        setCurrentStep(step);
      }
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-1">
          <FileText className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold font-serif">{t("app.report.title")}</h1>
        </div>
        <p className="text-muted-foreground text-sm">{t("app.report.subtitle")}</p>
      </motion.div>

      {/* Banner */}
      <div className="relative bg-gradient-to-br from-primary/15 via-primary/5 to-transparent border border-primary/20 rounded-2xl p-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
        <h2 className="text-xl font-serif font-bold mb-2 relative z-10">Твоя персональная Карта Личности</h2>
        <p className="text-sm text-muted-foreground relative z-10">6-страничный PDF: обложка, зодиак, нумерология, личная карта таро, личная руна, рекомендации</p>

        {/* Mock page previews */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          {["Обложка", "Зодиак", "Нумерология", "Таро", "Руна", "Советы"].map((page, i) => (
            <motion.div
              key={page}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="shrink-0 w-20 h-28 bg-card border border-border rounded-lg flex flex-col items-center justify-center text-[10px] text-muted-foreground gap-1"
            >
              <FileText className="w-4 h-4 text-primary/40" />
              {page}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Profile check */}
      {!profileFilled && (
        <div className="bg-card border border-border rounded-2xl p-5 flex items-center gap-4">
          <User className="w-8 h-8 text-muted-foreground" />
          <div className="flex-1">
            <p className="text-sm font-medium">{t("app.report.fillProfile")}</p>
          </div>
          <Button variant="hero-outline" size="sm">Заполнить</Button>
        </div>
      )}

      {/* Paywall for non-premium */}
      {!isPremium && !done && !generating && (
        <div className="bg-card border border-primary/20 rounded-2xl p-5 text-center space-y-3">
          <Lock className="w-8 h-8 text-primary mx-auto" />
          <p className="text-sm">Доступно для подписчиков или за разовую покупку</p>
          <div className="flex gap-3 justify-center">
            <Button variant="hero" size="lg" onClick={handleGenerate}>
              Купить за 149 ⭐
            </Button>
            <Button variant="hero-outline" size="lg" onClick={handleGenerate}>
              Подписка
            </Button>
          </div>
        </div>
      )}

      {/* Generate button for premium */}
      {isPremium && profileFilled && !done && !generating && (
        <Button variant="hero" size="lg" className="w-full" onClick={handleGenerate}>
          {t("app.report.generate")}
        </Button>
      )}

      {/* Progress stepper */}
      {generating && (
        <div className="space-y-3">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              animate={{
                opacity: i <= currentStep ? 1 : 0.3,
                x: 0,
              }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-3"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                i < currentStep ? "bg-primary text-primary-foreground" :
                i === currentStep ? "bg-primary/20 text-primary animate-pulse" :
                "bg-card border border-border text-muted-foreground"
              }`}>
                {i < currentStep ? "✓" : i + 1}
              </div>
              <span className={`text-sm ${i <= currentStep ? "text-foreground" : "text-muted-foreground"}`}>{step}</span>
            </motion.div>
          ))}
        </div>
      )}

      {/* Done */}
      {done && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-4">
          <div className="w-20 h-20 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center">
            <FileText className="w-10 h-10 text-primary" />
          </div>
          <h3 className="text-lg font-serif font-bold">Отчёт готов!</h3>
          <Button variant="hero" size="lg" className="w-full">
            <Download className="w-5 h-5" />
            {t("app.report.download")}
          </Button>
        </motion.div>
      )}
    </div>
  );
}

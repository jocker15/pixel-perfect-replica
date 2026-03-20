import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { LogOut, Trash2, CreditCard } from "lucide-react";
import { LanguageSwitcher } from "@/components/landing/LanguageSwitcher";

export default function ProfilePage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold font-serif">{t("app.profilePage.title")}</h1>
      </motion.div>

      {/* Avatar + name */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-2xl">
          ✨
        </div>
        <div>
          <h2 className="font-semibold text-lg">{t("app.defaultName")}</h2>
          <p className="text-sm text-muted-foreground">{t("app.profilePage.withUsSince")}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: t("app.profilePage.zodiacSign"), value: "♈ Овен" },
          { label: t("app.profilePage.destinyNumber"), value: "7" },
          { label: t("app.profilePage.sessions"), value: "47" },
        ].map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-xl p-4 text-center">
            <p className="text-xl font-bold">{s.value}</p>
            <p className="text-[10px] text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Language */}
      <div className="bg-card border border-border rounded-xl p-4 flex items-center justify-between">
        <span className="text-sm">Язык / Language</span>
        <LanguageSwitcher />
      </div>

      {/* Actions */}
      <div className="space-y-2">
        <Button variant="hero-outline" size="lg" className="w-full justify-start gap-3">
          <CreditCard className="w-5 h-5" />
          {t("app.profilePage.subscription")}
        </Button>
        <Button variant="ghost" size="lg" className="w-full justify-start gap-3 text-destructive hover:text-destructive">
          <Trash2 className="w-5 h-5" />
          {t("app.profilePage.deleteData")}
        </Button>
        <Button variant="ghost" size="lg" className="w-full justify-start gap-3 text-muted-foreground">
          <LogOut className="w-5 h-5" />
          {t("app.profilePage.logout")}
        </Button>
      </div>
    </div>
  );
}

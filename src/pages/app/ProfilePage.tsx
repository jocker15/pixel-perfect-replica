import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { LogOut, Trash2, CreditCard, FileText, Copy, Check, QrCode } from "lucide-react";
import { LanguageSwitcher } from "@/components/landing/LanguageSwitcher";
import { Link } from "react-router-dom";

export default function ProfilePage() {
  const { t } = useTranslation();
  const [name, setName] = useState(t("app.defaultName"));
  const [gender, setGender] = useState<"male" | "female" | "other">("male");
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);

  const referralCode = "STAR7X2K";
  const referralLink = `https://mystar.app/ref/${referralCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const genderOptions = [
    { value: "male" as const, label: t("app.profilePage.genderMale") },
    { value: "female" as const, label: t("app.profilePage.genderFemale") },
    { value: "other" as const, label: t("app.profilePage.genderOther") },
  ];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold font-serif">{t("app.profilePage.title")}</h1>
      </motion.div>

      {/* Avatar + editable name */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-2xl">
          ✨
        </div>
        <div className="flex-1">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="font-semibold text-lg bg-transparent border-b border-border focus:border-primary outline-none w-full transition-colors"
            placeholder={t("app.profilePage.displayName")}
          />
          <p className="text-sm text-muted-foreground mt-1">{t("app.profilePage.withUsSince")}</p>
        </div>
      </div>

      {/* Gender selection */}
      <div className="bg-card border border-border rounded-xl p-4 space-y-2">
        <label className="text-sm text-muted-foreground">{t("app.profilePage.gender")}</label>
        <div className="flex gap-2">
          {genderOptions.map((g) => (
            <button
              key={g.value}
              onClick={() => setGender(g.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                gender === g.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-background border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {g.label}
            </button>
          ))}
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

      {/* My Report */}
      <Link to="/app/report">
        <div className="bg-card border border-primary/20 rounded-xl p-4 flex items-center gap-4 hover:border-primary/40 transition-colors active:scale-[0.98]">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
            <FileText className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-sm">{t("app.profilePage.myReport")}</h3>
            <p className="text-xs text-muted-foreground">{t("app.profilePage.myReportDesc")}</p>
          </div>
          <span className="text-primary text-sm">→</span>
        </div>
      </Link>

      {/* Referral */}
      <div className="bg-card border border-border rounded-xl p-4 space-y-3">
        <h3 className="font-semibold text-sm">{t("app.profilePage.referral")}</h3>
        <div className="flex gap-2">
          <div className="flex-1 bg-background border border-border rounded-lg px-3 py-2 text-sm text-muted-foreground truncate font-mono">
            {referralLink}
          </div>
          <button
            onClick={handleCopy}
            className="shrink-0 w-10 h-10 flex items-center justify-center bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors active:scale-95"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setShowQr(!showQr)}
            className="shrink-0 w-10 h-10 flex items-center justify-center bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors active:scale-95"
          >
            <QrCode className="w-4 h-4" />
          </button>
        </div>
        {showQr && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="flex justify-center pt-2"
          >
            {/* Mock QR code */}
            <div className="w-40 h-40 bg-white rounded-xl p-3 flex items-center justify-center">
              <div className="w-full h-full border-2 border-foreground rounded grid grid-cols-5 grid-rows-5 gap-0.5 p-1">
                {Array.from({ length: 25 }).map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-sm ${
                      [0,1,2,4,5,6,10,12,14,18,20,22,23,24].includes(i)
                        ? "bg-foreground"
                        : "bg-transparent"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
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

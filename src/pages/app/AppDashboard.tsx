import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Sparkles, Star, Moon, Camera, FileText, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUserProfile } from "@/contexts/UserProfileContext";
import OnboardingModal from "@/components/app/OnboardingModal";

const quickModules = [
  { icon: "🔮", path: "/app/tarot", key: "tarot" },
  { icon: "🌙", path: "/app/dream", key: "dreams" },
  { icon: "🔢", path: "/app/numerology", key: "numerology" },
  { icon: "⭐", path: "/app/astro", key: "astrology" },
  { icon: "💑", path: "/app/compat", key: "compatibility" },
  { icon: "ᚱ", path: "/app/runes", key: "runes" },
  { icon: "☯", path: "/app/iching", key: "iching" },
];

const visionModules = [
  { icon: "☕", path: "/app/coffee", key: "coffee" },
  { icon: "🤚", path: "/app/palm", key: "palm" },
  { icon: "🔮", path: "/app/aura", key: "aura" },
  { icon: "👤", path: "/app/face", key: "face" },
];

const moonPhases = ["🌑", "🌒", "🌓", "🌔", "🌕", "🌖", "🌗", "🌘"];

// Mock tarot cards for demo
const demoCards = [
  { name: "theMagician", emoji: "🎭", meaning: "magicianMeaning" },
  { name: "highPriestess", emoji: "🌙", meaning: "priestessMeaning" },
  { name: "theEmpress", emoji: "👑", meaning: "empressMeaning" },
  { name: "theStar", emoji: "⭐", meaning: "starMeaning" },
  { name: "theWorld", emoji: "🌍", meaning: "worldMeaning" },
];

export default function AppDashboard() {
  const { t } = useTranslation();
  const { profile } = useUserProfile();
  const [tab, setTab] = useState<"today" | "week" | "month">("today");
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showDemoCard, setShowDemoCard] = useState(false);
  const tabs = ["today", "week", "month"] as const;

  const dayOfMonth = new Date().getDate();
  const moonIndex = Math.floor((dayOfMonth % 30) / 3.75) % 8;
  const moonEmoji = moonPhases[moonIndex];

  // Pick a "random" demo card based on day
  const demoCard = demoCards[dayOfMonth % demoCards.length];

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    setShowDemoCard(true);
  };

  return (
    <div className="space-y-8">
      {/* Onboarding modal */}
      {showOnboarding && <OnboardingModal onComplete={handleOnboardingComplete} />}

      {/* Demo card after onboarding */}
      {showDemoCard && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-xl p-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-full max-w-sm bg-card border border-border rounded-3xl p-8 text-center space-y-5"
          >
            <motion.div
              initial={{ rotateY: 180, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-28 h-40 mx-auto bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center"
            >
              <span className="text-5xl">{demoCard.emoji}</span>
            </motion.div>
            <h3 className="text-xl font-serif font-bold">
              {t("app.onboarding.yourCard")}
            </h3>
            <p className="font-serif font-semibold text-primary">
              {t(`app.onboarding.cards.${demoCard.name}`)}
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t(`app.onboarding.cards.${demoCard.meaning}`)}
            </p>
            <Button variant="hero" size="lg" className="w-full" onClick={() => setShowDemoCard(false)}>
              <Sparkles className="w-4 h-4 mr-1" />
              {t("app.onboarding.startJourney")}
            </Button>
          </motion.div>
        </motion.div>
      )}

      {/* Fill profile banner — only if not onboarded */}
      {!profile.onboarded && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-primary/15 via-primary/5 to-transparent border border-primary/20 rounded-2xl p-5 flex items-center gap-4"
        >
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
            <UserCircle className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-sm">{t("app.onboarding.bannerTitle")}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{t("app.onboarding.bannerDesc")}</p>
          </div>
          <Button variant="hero" size="sm" onClick={() => setShowOnboarding(true)}>
            {t("app.onboarding.bannerButton")}
          </Button>
        </motion.div>
      )}

      {/* Greeting */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3"
      >
        <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-lg">
          ✨
        </div>
        <div>
          <h1 className="text-2xl font-bold font-serif">
            {t("app.greeting")} {profile.onboarded ? profile.name : t("app.defaultName")}
          </h1>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-1 bg-card rounded-full p-1 border border-border w-fit">
        {tabs.map((k) => (
          <button
            key={k}
            onClick={() => setTab(k)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              tab === k ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t(`app.tabs.${k}`)}
          </button>
        ))}
      </div>

      {/* Lunar calendar card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="bg-card border border-border rounded-2xl p-6 space-y-3"
      >
        <div className="flex items-center gap-2">
          <Moon className="w-5 h-5 text-primary" />
          <h2 className="font-serif font-semibold text-lg">{t("app.lunarCalendar")}</h2>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-5xl">{moonEmoji}</span>
          <div className="space-y-1">
            <p className="font-medium">{t("app.lunarPhase")}</p>
            <p className="text-sm text-muted-foreground">{t("app.lunarAdvice")}</p>
          </div>
        </div>
      </motion.div>

      {/* Astro day card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-card border border-border rounded-2xl p-6 space-y-3"
      >
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-primary" />
          <h2 className="font-serif font-semibold text-lg">{t("app.astroDay")}</h2>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{t("app.astroDesc")}</p>
        <div className="h-2 bg-background rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "76%" }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </motion.div>

      {/* Quick actions */}
      <div>
        <h3 className="text-sm text-muted-foreground mb-3 font-medium">{t("app.quickActions")}</h3>
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
          {quickModules.map((m, i) => (
            <motion.div
              key={m.key}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
            >
              <Link
                to={m.path}
                className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all hover:shadow-md hover:shadow-primary/5 active:scale-95"
              >
                <span className="text-2xl">{m.icon}</span>
                <span className="text-[10px] text-muted-foreground font-medium">{t(`features.${m.key}`)}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* AI Vision section */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Camera className="w-4 h-4 text-primary" />
          <h3 className="text-sm text-muted-foreground font-medium">AI Vision</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {visionModules.map((m, i) => (
            <motion.div
              key={m.key}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.25 + i * 0.05 }}
            >
              <Link
                to={m.path}
                className="flex flex-col items-center gap-1.5 p-4 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all hover:shadow-md hover:shadow-primary/5 active:scale-95"
              >
                <span className="text-2xl">{m.icon}</span>
                <span className="text-[10px] text-muted-foreground font-medium text-center">{t(`features.${m.key}`)}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Card of the day */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-card border border-border rounded-2xl p-6 space-y-4"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <h2 className="font-serif font-semibold text-lg">{t("app.dailyCard")}</h2>
        </div>
        <div className="flex gap-4 items-start">
          <div className="w-20 h-32 bg-primary/10 rounded-xl border border-primary/20 flex items-center justify-center text-3xl shrink-0">
            🃏
          </div>
          <div className="space-y-2">
            <h3 className="font-serif font-semibold">{t("app.cardOfDay")}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{t("app.cardOfDayMeaning")}</p>
          </div>
        </div>
      </motion.div>

      {/* CTA: Personal Map */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="relative bg-gradient-to-br from-primary/15 via-primary/5 to-transparent border border-primary/20 rounded-2xl p-6 overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
        <div className="relative z-10 flex items-start gap-4">
          <FileText className="w-10 h-10 text-primary shrink-0" />
          <div className="space-y-2 flex-1">
            <h3 className="font-serif font-bold text-lg">{t("app.reportCta.title")}</h3>
            <p className="text-sm text-muted-foreground">{t("app.reportCta.desc")}</p>
            <Link to="/app/report">
              <Button variant="hero" size="sm" className="mt-2">{t("app.reportCta.button")}</Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

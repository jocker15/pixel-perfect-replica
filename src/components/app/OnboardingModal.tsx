import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { useUserProfile } from "@/contexts/UserProfileContext";
import { Sparkles, ChevronRight, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function OnboardingModal({ onComplete }: { onComplete: () => void }) {
  const { t } = useTranslation();
  const { completeOnboarding } = useUserProfile();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState<Date | undefined>();
  const [gender, setGender] = useState<"male" | "female" | "other">("male");

  const genderOptions = [
    { value: "male" as const, label: t("app.profilePage.genderMale"), emoji: "♂️" },
    { value: "female" as const, label: t("app.profilePage.genderFemale"), emoji: "♀️" },
    { value: "other" as const, label: t("app.profilePage.genderOther"), emoji: "⚧️" },
  ];

  const canNext = step === 0 ? name.trim().length > 0 : step === 1 ? !!birthDate : true;

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      completeOnboarding({
        name: name.trim(),
        birthDate: birthDate ? format(birthDate, "yyyy-MM-dd") : "",
        gender,
      });
      onComplete();
    }
  };

  const stepIndicators = [0, 1, 2];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-xl p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md bg-card border border-border rounded-3xl p-8 space-y-6 relative overflow-hidden"
      >
        {/* Decorative glow */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />

        {/* Header */}
        <div className="text-center space-y-2 relative z-10">
          <div className="w-14 h-14 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center mb-3">
            <Sparkles className="w-7 h-7 text-primary" />
          </div>
          <h2 className="text-2xl font-serif font-bold">{t("app.onboarding.title")}</h2>
          <p className="text-sm text-muted-foreground">{t("app.onboarding.subtitle")}</p>
        </div>

        {/* Step indicators */}
        <div className="flex justify-center gap-2">
          {stepIndicators.map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                s === step ? "w-8 bg-primary" : s < step ? "w-4 bg-primary/50" : "w-4 bg-border"
              }`}
            />
          ))}
        </div>

        {/* Steps */}
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <label className="text-sm font-medium">{t("app.onboarding.nameLabel")}</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value.slice(0, 50))}
                placeholder={t("app.onboarding.namePlaceholder")}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground outline-none focus:border-primary transition-colors"
                autoFocus
                onKeyDown={(e) => e.key === "Enter" && canNext && handleNext()}
              />
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <label className="text-sm font-medium">{t("app.onboarding.birthLabel")}</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal h-12 rounded-xl",
                      !birthDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {birthDate ? format(birthDate, "dd.MM.yyyy") : t("app.onboarding.birthPlaceholder")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="center">
                  <Calendar
                    mode="single"
                    selected={birthDate}
                    onSelect={setBirthDate}
                    disabled={(date) => date > new Date() || date < new Date("1920-01-01")}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                    captionLayout="dropdown-buttons"
                    fromYear={1920}
                    toYear={new Date().getFullYear()}
                  />
                </PopoverContent>
              </Popover>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <label className="text-sm font-medium">{t("app.onboarding.genderLabel")}</label>
              <div className="grid grid-cols-3 gap-3">
                {genderOptions.map((g) => (
                  <button
                    key={g.value}
                    onClick={() => setGender(g.value)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all active:scale-95 ${
                      gender === g.value
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-background text-muted-foreground hover:text-foreground hover:border-border"
                    }`}
                  >
                    <span className="text-2xl">{g.emoji}</span>
                    <span className="text-xs font-medium">{g.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Next / Finish */}
        <Button
          variant="hero"
          size="lg"
          className="w-full"
          disabled={!canNext}
          onClick={handleNext}
        >
          {step < 2 ? (
            <>
              {t("app.onboarding.next")}
              <ChevronRight className="w-4 h-4 ml-1" />
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-1" />
              {t("app.onboarding.finish")}
            </>
          )}
        </Button>
      </motion.div>
    </div>
  );
}

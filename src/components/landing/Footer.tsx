import { useTranslation } from "react-i18next";
import { Send, Sparkles } from "lucide-react";

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-border py-12">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="font-serif font-semibold text-lg">{t("footer.brand")}</span>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              <Send className="w-4 h-4 inline mr-1.5" />
              {t("footer.telegramBot")}
            </a>
            <a href="#" className="hover:text-foreground transition-colors">{t("footer.channel")}</a>
            <a href="#" className="hover:text-foreground transition-colors">{t("footer.privacy")}</a>
          </div>

          <p className="text-xs text-muted-foreground">{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
};

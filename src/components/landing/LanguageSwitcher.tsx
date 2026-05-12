import { useTranslation } from "react-i18next";

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const isRu = i18n.language?.startsWith("ru");

  return (
    <button
      onClick={() => i18n.changeLanguage(isRu ? "en" : "ru")}
      className="text-sm font-medium text-muted-foreground hover:text-foreground border border-border rounded-full px-3 py-1 transition-colors"
    >
      {isRu ? "EN" : "RU"}
    </button>
  );
};

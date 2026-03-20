import { useTranslation } from "react-i18next";

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const isRu = i18n.language?.startsWith("ru");

  const toggle = () => {
    i18n.changeLanguage(isRu ? "en" : "ru");
  };

  return (
    <button
      onClick={toggle}
      className="text-xs font-semibold tracking-wider text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md border border-border hover:border-primary/30"
    >
      {isRu ? "EN" : "RU"}
    </button>
  );
};

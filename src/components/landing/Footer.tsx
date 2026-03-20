import { Send, Sparkles } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border py-12">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="font-serif font-semibold text-lg">Таро Сонник</span>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              <Send className="w-4 h-4 inline mr-1.5" />
              Telegram бот
            </a>
            <a href="#" className="hover:text-foreground transition-colors">Канал</a>
            <a href="#" className="hover:text-foreground transition-colors">Конфиденциальность</a>
          </div>

          <p className="text-xs text-muted-foreground">
            © 2026 Таро Сонник — AI Эзотерик
          </p>
        </div>
      </div>
    </footer>
  );
};

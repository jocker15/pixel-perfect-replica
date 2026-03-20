import { Outlet, NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home, Compass, Camera, Clock, User, Sparkles } from "lucide-react";
import { LanguageSwitcher } from "@/components/landing/LanguageSwitcher";

const navItems = [
  { key: "home", icon: Home, path: "/app" },
  { key: "modules", icon: Compass, path: "/app/modules" },
  { key: "vision", icon: Camera, path: "/app/vision" },
  { key: "history", icon: Clock, path: "/app/history" },
  { key: "profile", icon: User, path: "/app/profile" },
];

export default function AppLayout() {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar (desktop) */}
      <header className="hidden lg:flex fixed top-0 left-0 right-0 z-50 h-16 bg-background/80 backdrop-blur-xl border-b border-border/50 items-center px-6">
        <a href="/" className="flex items-center gap-2 mr-8">
          <Sparkles className="w-5 h-5 text-primary" />
          <span className="font-serif font-semibold text-lg">{t("footer.brand")}</span>
        </a>
        <nav className="flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.key}
              to={item.path}
              end={item.path === "/app"}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all ${
                  isActive ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground"
                }`
              }
            >
              <item.icon className="w-4 h-4" />
              {t(`app.${item.key}`)}
            </NavLink>
          ))}
        </nav>
        <div className="ml-auto">
          <LanguageSwitcher />
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 pt-4 pb-24 lg:pt-24 lg:pb-8">
        <div className="container max-w-2xl">
          <Outlet />
        </div>
      </main>

      {/* Bottom nav (mobile) — 5 tabs */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-t border-border/50">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => {
            const isActive = item.path === "/app"
              ? location.pathname === "/app"
              : location.pathname.startsWith(item.path);
            return (
              <NavLink
                key={item.key}
                to={item.path}
                className={`flex flex-col items-center gap-1 py-2 px-2 transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{t(`app.${item.key}`)}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

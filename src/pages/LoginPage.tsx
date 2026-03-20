import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mail, Lock, Eye, EyeOff, Send } from "lucide-react";
import { authLogin, authTelegram } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await authLogin(email, password);
      if (data.token && data.user) {
        login(data.token, data.user);
        navigate("/app");
      } else {
        setError(data.error || t("auth.invalidCredentials"));
      }
    } catch {
      setError(t("auth.networkError"));
    } finally {
      setLoading(false);
    }
  };

  const handleTelegramLogin = () => {
    // Telegram Login Widget callback
    const botId = import.meta.env.VITE_TELEGRAM_BOT_ID;
    if (!botId) return;

    (window as any).onTelegramAuth = async (tgUser: any) => {
      setLoading(true);
      try {
        const data = await authTelegram(tgUser);
        if (data.token && data.user) {
          login(data.token, data.user);
          navigate("/app");
        } else {
          setError(data.error || t("auth.telegramError"));
        }
      } catch {
        setError(t("auth.networkError"));
      } finally {
        setLoading(false);
      }
    };

    // Open Telegram OAuth
    const width = 550;
    const height = 470;
    const left = (screen.width - width) / 2;
    const top = (screen.height - height) / 2;
    window.open(
      `https://oauth.telegram.org/auth?bot_id=${botId}&origin=${encodeURIComponent(window.location.origin)}&request_access=write`,
      "telegram_auth",
      `width=${width},height=${height},left=${left},top=${top}`
    );
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-sm space-y-8"
      >
        {/* Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-block">
            <h1 className="text-3xl font-bold font-serif text-primary">✦ MyStar</h1>
          </Link>
          <p className="text-muted-foreground text-sm">{t("auth.loginSubtitle")}</p>
        </div>

        {/* Telegram button */}
        <Button
          variant="hero-outline"
          size="lg"
          className="w-full gap-3"
          onClick={handleTelegramLogin}
          disabled={loading}
        >
          <Send className="w-5 h-5" />
          {t("auth.telegramLogin")}
        </Button>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground">{t("auth.or")}</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Email form */}
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full bg-card border border-border rounded-xl pl-10 pr-4 py-3 text-sm focus:border-primary focus:outline-none transition-colors"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t("auth.password")}
              required
              className="w-full bg-card border border-border rounded-xl pl-10 pr-10 py-3 text-sm focus:border-primary focus:outline-none transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-destructive text-center"
            >
              {error}
            </motion.p>
          )}

          <Button variant="hero" size="lg" className="w-full" type="submit" disabled={loading || !email || !password}>
            {loading ? "..." : t("auth.login")}
          </Button>
        </form>

        {/* Register link */}
        <p className="text-center text-sm text-muted-foreground">
          {t("auth.noAccount")}{" "}
          <Link to="/register" className="text-primary hover:underline font-medium">
            {t("auth.register")}
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

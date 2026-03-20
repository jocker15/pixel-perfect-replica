import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { UserProfileProvider } from "@/contexts/UserProfileContext";
import PrivateRoute from "@/components/app/PrivateRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AppLayout from "./components/app/AppLayout";
import AppDashboard from "./pages/app/AppDashboard";
import TarotPage from "./pages/app/TarotPage";
import DreamPage from "./pages/app/DreamPage";
import NumerologyPage from "./pages/app/NumerologyPage";
import AstroPage from "./pages/app/AstroPage";
import CompatPage from "./pages/app/CompatPage";
import RunesPage from "./pages/app/RunesPage";
import IChingPage from "./pages/app/IChingPage";
import CoffeePage from "./pages/app/CoffeePage";
import StonesPage from "./pages/app/StonesPage";
import PalmPage from "./pages/app/PalmPage";
import AuraPage from "./pages/app/AuraPage";
import FacePage from "./pages/app/FacePage";
import FengShuiPage from "./pages/app/FengShuiPage";
import ReportPage from "./pages/app/ReportPage";
import ModulesPage from "./pages/app/ModulesPage";
import VisionPage from "./pages/app/VisionPage";
import HistoryPage from "./pages/app/HistoryPage";
import ProfilePage from "./pages/app/ProfilePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
    <UserProfileProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/app" element={<AppLayout />}>
              <Route index element={<AppDashboard />} />
              <Route path="modules" element={<ModulesPage />} />
              <Route path="vision" element={<VisionPage />} />
              <Route path="tarot" element={<TarotPage />} />
              <Route path="dream" element={<DreamPage />} />
              <Route path="numerology" element={<NumerologyPage />} />
              <Route path="astro" element={<AstroPage />} />
              <Route path="compat" element={<CompatPage />} />
              <Route path="runes" element={<RunesPage />} />
              <Route path="iching" element={<IChingPage />} />
              <Route path="coffee" element={<CoffeePage />} />
              <Route path="stones" element={<StonesPage />} />
              <Route path="palm" element={<PalmPage />} />
              <Route path="aura" element={<AuraPage />} />
              <Route path="face" element={<FacePage />} />
              <Route path="fengshui" element={<FengShuiPage />} />
              <Route path="report" element={<ReportPage />} />
              <Route path="history" element={<HistoryPage />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </UserProfileProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

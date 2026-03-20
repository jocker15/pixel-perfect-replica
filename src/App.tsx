import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AppLayout from "./components/app/AppLayout";
import AppDashboard from "./pages/app/AppDashboard";
import TarotPage from "./pages/app/TarotPage";
import DreamPage from "./pages/app/DreamPage";
import NumerologyPage from "./pages/app/NumerologyPage";
import AstroPage from "./pages/app/AstroPage";
import CompatPage from "./pages/app/CompatPage";
import RunesPage from "./pages/app/RunesPage";
import IChingPage from "./pages/app/IChingPage";
import ModulesPage from "./pages/app/ModulesPage";
import HistoryPage from "./pages/app/HistoryPage";
import ProfilePage from "./pages/app/ProfilePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<AppDashboard />} />
            <Route path="modules" element={<ModulesPage />} />
            <Route path="tarot" element={<TarotPage />} />
            <Route path="dream" element={<DreamPage />} />
            <Route path="numerology" element={<NumerologyPage />} />
            <Route path="astro" element={<AstroPage />} />
            <Route path="compat" element={<CompatPage />} />
            <Route path="runes" element={<RunesPage />} />
            <Route path="iching" element={<IChingPage />} />
            <Route path="history" element={<HistoryPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

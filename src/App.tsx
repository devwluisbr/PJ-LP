import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

const App = () => {
  const [consentMarketing, setConsentMarketing] = useState<boolean>(() => {
    return typeof window !== "undefined" && localStorage.getItem("consent_marketing") === "true";
  });
  const [showConsentBanner, setShowConsentBanner] = useState<boolean>(() => !consentMarketing);

  useEffect(() => {
    if (consentMarketing) {
      localStorage.setItem("consent_marketing", "true");
      setShowConsentBanner(false);
    }
  }, [consentMarketing]);

  const acceptConsent = () => setConsentMarketing(true);
  const rejectConsent = () => {
    localStorage.removeItem("consent_marketing");
    setShowConsentBanner(false);
  };
  // Componente de teste - remover em produção
  // const TestComponent = () => null; // Placeholder para remover o componente de teste em produção

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={<Admin />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        {/* Consent Banner */}
        {showConsentBanner && (
          <div className="fixed bottom-4 left-4 right-4 z-50 bg-background border border-border rounded-md p-4 shadow-xl flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="text-sm text-cream-muted">
              Utilizamos cookies de marketing (Meta Pixel) para medir conversões e melhorar suas experiências. Você concorda com o uso?
            </div>
            <div className="flex gap-2">
              <button onClick={rejectConsent} className="px-4 py-2 border border-border text-foreground hover:bg-charcoal transition-colors">
                Não, obrigado
              </button>
              <button onClick={acceptConsent} className="px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                Concordo
              </button>
            </div>
          </div>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

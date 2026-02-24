import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Preloader from "./components/Preloader";
import Index from "./pages/Index";
import Portfolio from "./pages/Portfolio";
import PortfolioProject from "./pages/PortfolioProject";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import CommercialProject from "./pages/CommercialProject";
import WarmApartment from "./pages/WarmApartment";
import SoftModernApartment from "./pages/SoftModernApartment";
import SoftModernApartmentV2 from "./pages/SoftModernApartmentV2";
import LobbyProject from "./pages/LobbyProject";
import OfficeProject from "./pages/OfficeProject";
import ClassicWarmthProject from "./pages/ClassicWarmthProject";
import GoldenClassicProject from "./pages/GoldenClassicProject";
import OrganicLoftProject from "./pages/OrganicLoftProject";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolio/:slug" element={<PortfolioProject />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/commercial/entertainment-center" element={<CommercialProject />} />
        <Route path="/residential/warm-apartment" element={<WarmApartment />} />
        <Route path="/residential/soft-modern-apartment" element={<SoftModernApartment />} />
        <Route path="/residential/soft-modern-apartment-v2" element={<SoftModernApartmentV2 />} />
        <Route path="/commercial/luxury-lobby" element={<LobbyProject />} />
        <Route path="/commercial/corporate-office" element={<OfficeProject />} />
        <Route path="/residential/classic-warmth" element={<ClassicWarmthProject />} />
        <Route path="/residential/golden-classic" element={<GoldenClassicProject />} />
        <Route path="/residential/organic-loft" element={<OrganicLoftProject />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Preloader />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

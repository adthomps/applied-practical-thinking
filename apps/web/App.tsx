import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AptLayout } from "@/components/apt/AptLayout";

// Pages
import Home from "./routes/Home";
import AssistantPage from "./routes/assistant";
import Start from "./routes/Start";
import About from "./routes/About";
import NotFound from "./pages/NotFound";

// Insights
import Insights from "./routes/Insights";
import InsightDetail from "./routes/InsightDetail";
import InsightsBlogs from "./routes/insights/Blogs";
import InsightsPodcasts from "./routes/insights/Podcasts";
import InsightsCaseStudies from "./routes/insights/CaseStudies";
import InsightsGuides from "./routes/insights/Guides";

// Portfolio
import Portfolio from "./routes/Portfolio";
import PortfolioLabs from "./routes/portfolio/Labs";
import PortfolioLabDetail from "./routes/portfolio/LabDetail";
import PortfolioDesignSystem from "./routes/portfolio/DesignSystem";
import PortfolioDesignThinking from "./routes/portfolio/DesignThinking";
import PortfolioDesignArchitecture from "./routes/portfolio/DesignArchitecture";
import PortfolioLiveDemos from "./routes/portfolio/LiveDemos";
import PortfolioVisualGallery from "./routes/portfolio/VisualGallery";

// Legacy/Utility
import DesignPlayground from "./routes/DesignPlayground";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AptLayout />}>
            {/* Home */}
            <Route path="/" element={<Home />} />
            
            {/* Start (Onboarding) */}
            <Route path="/start" element={<Start />} />
            
            {/* Insights */}
            <Route path="/insights" element={<Insights />} />
            <Route path="/insights/blogs" element={<InsightsBlogs />} />
            <Route path="/insights/podcasts" element={<InsightsPodcasts />} />
            <Route path="/insights/case-studies" element={<InsightsCaseStudies />} />
            <Route path="/insights/guides" element={<InsightsGuides />} />
            <Route path="/insights/:id" element={<InsightDetail />} />
            
            {/* Portfolio */}
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/portfolio/labs" element={<PortfolioLabs />} />
            <Route path="/portfolio/labs/:id" element={<PortfolioLabDetail />} />
            <Route path="/portfolio/design-system" element={<PortfolioDesignSystem />} />
            <Route path="/portfolio/design-thinking" element={<PortfolioDesignThinking />} />
            <Route path="/portfolio/design-architecture" element={<PortfolioDesignArchitecture />} />
            <Route path="/portfolio/live-demos" element={<PortfolioLiveDemos />} />
            <Route path="/portfolio/visual-gallery" element={<PortfolioVisualGallery />} />
            
            {/* About */}
            <Route path="/about" element={<About />} />
            

            {/* Assistant */}
            <Route path="/assistant" element={<AssistantPage />} />

            {/* Utility */}
            <Route path="/design" element={<DesignPlayground />} />
            
            {/* Legacy Redirects */}
            <Route path="/labs" element={<Navigate to="/portfolio/labs" replace />} />
            <Route path="/labs/:id" element={<Navigate to="/portfolio/labs/:id" replace />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

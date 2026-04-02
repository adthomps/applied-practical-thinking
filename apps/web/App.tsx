import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import { AptLayout } from "@/components/apt/AptLayout";

// Pages
import Home from "./routes/Home";
import NotFound from "./pages/NotFound";

import Systems from "./routes/Systems";
import SystemDetail from "./routes/SystemDetail";

const AssistantPage = lazy(() => import("./routes/assistant"));
const Start = lazy(() => import("./routes/Start"));
const About = lazy(() => import("./routes/About"));

// Insights
const Insights = lazy(() => import("./routes/Insights"));
const InsightsBlogs = lazy(() => import("./routes/insights/Blogs"));
const InsightsPodcasts = lazy(() => import("./routes/insights/Podcasts"));
const InsightsCaseStudies = lazy(() => import("./routes/insights/CaseStudies"));
const InsightsGuides = lazy(() => import("./routes/insights/Guides"));

// Portfolio
const Portfolio = lazy(() => import("./routes/Portfolio"));
const PortfolioLabs = lazy(() => import("./routes/portfolio/Labs"));
const PortfolioDesignSystem = lazy(() => import("./routes/portfolio/DesignSystem"));
const PortfolioDesignThinking = lazy(() => import("./routes/portfolio/DesignThinking"));
const PortfolioDesignArchitecture = lazy(() => import("./routes/portfolio/DesignArchitecture"));
const PortfolioLiveDemos = lazy(() => import("./routes/portfolio/LiveDemos"));
const PortfolioVisualGallery = lazy(() => import("./routes/portfolio/VisualGallery"));
const InsightDetail = lazy(() => import("./routes/InsightDetail"));
const PortfolioLabDetail = lazy(() => import("./routes/portfolio/LabDetail"));
const DemoDetail = lazy(() => import("./routes/DemoDetail"));

// Legacy/Utility
const DesignPlayground = lazy(() => import("./routes/DesignPlayground"));

const queryClient = new QueryClient();

const RouteFallback = () => (
  <div className="container py-12 md:py-16">Loading…</div>
);

const LegacyLabRedirect = () => {
  const { id } = useParams<{ id: string }>();

  return <Navigate to={id ? `/portfolio/labs/${id}` : "/portfolio/labs"} replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<RouteFallback />}>
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

            {/* Direct detail routes for all types */}
            <Route path="/blog/:id" element={<InsightDetail />} />
            <Route path="/guides/:id" element={<InsightDetail />} />
            <Route path="/podcasts/:id" element={<InsightDetail />} />
            <Route path="/case-studies/:id" element={<InsightDetail />} />
            
            {/* Portfolio */}
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/portfolio/labs" element={<PortfolioLabs />} />
            <Route path="/portfolio/labs/:id" element={<PortfolioLabDetail />} />
            <Route path="/portfolio/design-system" element={<PortfolioDesignSystem />} />
            <Route path="/portfolio/design-thinking" element={<PortfolioDesignThinking />} />
            <Route path="/portfolio/design-architecture" element={<PortfolioDesignArchitecture />} />
            <Route path="/portfolio/live-demos" element={<PortfolioLiveDemos />} />
            <Route path="/portfolio/live-demos/:slug" element={<DemoDetail />} />
            <Route path="/portfolio/visual-gallery" element={<PortfolioVisualGallery />} />
            
            {/* About */}
            <Route path="/about" element={<About />} />
              {/* Systems */}
              <Route path="/systems" element={<Systems />} />
              <Route path="/systems/:id" element={<SystemDetail />} />
            

            {/* Assistant */}
            <Route path="/assistant" element={<AssistantPage />} />

            {/* Utility */}
            <Route path="/design" element={<DesignPlayground />} />
            
            {/* Legacy Redirects */}
            <Route path="/labs" element={<Navigate to="/portfolio/labs" replace />} />
            <Route path="/labs/:id" element={<LegacyLabRedirect />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

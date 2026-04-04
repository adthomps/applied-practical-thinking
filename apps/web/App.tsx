import { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import { AptLayout } from "@/components/apt/AptLayout";
import { resolveWorkerApiBase } from "@/src/services/api";
import { lazyWithRetry } from "@/lib/lazyWithRetry";

// Pages
import Home from "./routes/Home";
import NotFound from "./pages/NotFound";

import Systems from "./routes/Systems";
import SystemDetail from "./routes/SystemDetail";

const AssistantPage = lazyWithRetry(() => import("./routes/assistant"));
const Start = lazyWithRetry(() => import("./routes/Start"));
const About = lazyWithRetry(() => import("./routes/About"));

// Learn
const Insights = lazyWithRetry(() => import("./routes/Insights"));
const InsightsBlogs = lazyWithRetry(() => import("./routes/insights/Blogs"));
const InsightsPodcasts = lazyWithRetry(() => import("./routes/insights/Podcasts"));
const InsightsGuides = lazyWithRetry(() => import("./routes/insights/Guides"));

// Labs / Design
const Portfolio = lazyWithRetry(() => import("./routes/Portfolio"));
const PortfolioLabs = lazyWithRetry(() => import("./routes/portfolio/Labs"));
const PortfolioExperimentsConcepts = lazyWithRetry(() => import("./routes/portfolio/ExperimentsConcepts"));
const PortfolioExperimentsMocks = lazyWithRetry(() => import("./routes/portfolio/ExperimentsMocks"));
const PortfolioDesignSystem = lazyWithRetry(() => import("./routes/portfolio/DesignSystem"));
const PortfolioDesignThinking = lazyWithRetry(() => import("./routes/portfolio/DesignThinking"));
const PortfolioDesignThinkingFrameworkDetail = lazyWithRetry(() => import("./routes/portfolio/DesignThinkingFrameworkDetail"));
const PortfolioDesignArchitecture = lazyWithRetry(() => import("./routes/portfolio/DesignArchitecture"));
const PortfolioContentStrategy = lazyWithRetry(() => import("./routes/portfolio/ContentStrategy"));
const PortfolioLiveDemos = lazyWithRetry(() => import("./routes/portfolio/LiveDemos"));
const PortfolioVisualGallery = lazyWithRetry(() => import("./routes/portfolio/VisualGallery"));
const InsightDetail = lazyWithRetry(() => import("./routes/InsightDetail"));
const PortfolioLabDetail = lazyWithRetry(() => import("./routes/portfolio/LabDetail"));
const DemoDetail = lazyWithRetry(() => import("./routes/DemoDetail"));

// Legacy/Utility
const DesignPlayground = lazyWithRetry(() => import("./routes/DesignPlayground"));

const queryClient = new QueryClient();

const RouteFallback = () => (
  <div className="container py-12 md:py-16">Loading…</div>
);

const RuntimeDebugBanner = () => {
  if (!import.meta.env.DEV) return null;

  const resolved = resolveWorkerApiBase();
  const label = resolved.ok
    ? `Worker API: ${resolved.baseUrl} (${resolved.source})`
    : `Worker API missing: ${resolved.envVar}`;

  return (
    <div className="fixed bottom-4 right-4 z-50 rounded-md border border-border bg-card/95 px-3 py-2 text-xs text-muted-foreground shadow-lg backdrop-blur">
      {label}
    </div>
  );
};

const LegacyLabRedirect = () => {
  const { id } = useParams<{ id: string }>();

  return <Navigate to={id ? `/experiments/${id}` : "/experiments"} replace />;
};

const LegacyLearnRedirect = () => {
  const { id } = useParams<{ id: string }>();

  return <Navigate to={id ? `/learn/${id}` : "/learn"} replace />;
};

const LegacyDemoRedirect = () => {
  const { slug } = useParams<{ slug: string }>();

  return <Navigate to={slug ? `/experiments/live-demos/${slug}` : "/experiments/live-demos"} replace />;
};

const LegacySystemRedirect = () => {
  const { id } = useParams<{ id: string }>();

  return <Navigate to={id ? `/design/systems/${id}` : "/design/systems"} replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <RuntimeDebugBanner />
      <BrowserRouter>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route element={<AptLayout />}>
            {/* Home */}
            <Route path="/" element={<Home />} />
            
            {/* Start (Onboarding) */}
            <Route path="/start" element={<Start />} />
            

            {/* Learn */}
            <Route path="/learn" element={<Insights />} />
            <Route path="/learn/articles" element={<InsightsBlogs />} />
            <Route path="/learn/podcasts" element={<InsightsPodcasts />} />
            <Route path="/learn/guides" element={<InsightsGuides />} />
            <Route path="/learn/:id" element={<InsightDetail />} />

            {/* Canonical detail aliases */}
            <Route path="/blog/:id" element={<LegacyLearnRedirect />} />
            <Route path="/guides/:id" element={<LegacyLearnRedirect />} />
            <Route path="/podcasts/:id" element={<LegacyLearnRedirect />} />
            <Route path="/case-studies/:id" element={<LegacyLearnRedirect />} />
            
            {/* Experiments */}
            <Route path="/experiments" element={<PortfolioLabs />} />
            <Route path="/experiments/concepts" element={<PortfolioExperimentsConcepts />} />
            <Route path="/experiments/mocks" element={<PortfolioExperimentsMocks />} />
            <Route path="/experiments/:id" element={<PortfolioLabDetail />} />
            <Route path="/experiments/live-demos" element={<PortfolioLiveDemos />} />
            <Route path="/experiments/live-demos/:slug" element={<DemoDetail />} />

            {/* Design */}
            <Route path="/design" element={<Portfolio />} />
            <Route path="/design/system" element={<PortfolioDesignSystem />} />
            <Route path="/design/thinking" element={<PortfolioDesignThinking />} />
            <Route path="/design/thinking/:framework" element={<PortfolioDesignThinkingFrameworkDetail />} />
            <Route path="/design/architecture" element={<PortfolioDesignArchitecture />} />
            <Route path="/design/systems" element={<Systems />} />
            <Route path="/design/systems/:id" element={<SystemDetail />} />
            <Route path="/design/content-strategy" element={<PortfolioContentStrategy />} />
            
            {/* About */}
            <Route path="/about" element={<About />} />
            <Route path="/about/visual-gallery" element={<PortfolioVisualGallery />} />
            {/* Assistant */}
            <Route path="/assistant" element={<AssistantPage />} />

            {/* Utility */}
            <Route path="/design-playground" element={<DesignPlayground />} />
            
            {/* Legacy Redirects */}
            <Route path="/insights" element={<Navigate to="/learn" replace />} />
            <Route path="/insights/blogs" element={<Navigate to="/learn/articles" replace />} />
            <Route path="/insights/podcasts" element={<Navigate to="/learn/podcasts" replace />} />
            <Route path="/insights/guides" element={<Navigate to="/learn/guides" replace />} />
            <Route path="/insights/case-studies" element={<Navigate to="/learn/guides" replace />} />
            <Route path="/insights/:id" element={<LegacyLearnRedirect />} />
            <Route path="/portfolio" element={<Navigate to="/experiments" replace />} />
            <Route path="/portfolio/labs" element={<Navigate to="/experiments" replace />} />
            <Route path="/portfolio/labs/:id" element={<LegacyLabRedirect />} />
            <Route path="/portfolio/design-system" element={<Navigate to="/design/system" replace />} />
            <Route path="/portfolio/design-thinking" element={<Navigate to="/design/thinking" replace />} />
            <Route path="/portfolio/design-architecture" element={<Navigate to="/design/architecture" replace />} />
            <Route path="/portfolio/design-systems" element={<Navigate to="/design/systems" replace />} />
            <Route path="/portfolio/content-strategy" element={<Navigate to="/design/content-strategy" replace />} />
            <Route path="/portfolio/live-demos" element={<Navigate to="/experiments/live-demos" replace />} />
            <Route path="/portfolio/live-demos/:slug" element={<LegacyDemoRedirect />} />
            <Route path="/portfolio/visual-gallery" element={<Navigate to="/about/visual-gallery" replace />} />
            <Route path="/systems" element={<LegacySystemRedirect />} />
            <Route path="/systems/:id" element={<LegacySystemRedirect />} />
            <Route path="/labs" element={<Navigate to="/experiments" replace />} />
            <Route path="/labs/concepts" element={<Navigate to="/experiments/concepts" replace />} />
            <Route path="/labs/mocks" element={<Navigate to="/experiments/mocks" replace />} />
            <Route path="/labs/:id" element={<LegacyLabRedirect />} />
            <Route path="/labs/live-demos" element={<Navigate to="/experiments/live-demos" replace />} />
            <Route path="/labs/live-demos/:slug" element={<LegacyDemoRedirect />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

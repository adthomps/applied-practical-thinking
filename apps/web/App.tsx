import { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AptLayout } from "@/components/apt/AptLayout";
import { resolveWorkerApiBase } from "@/src/services/api";
import { lazyWithRetry } from "@/lib/lazyWithRetry";

import Home from "./routes/Home";

const NotFound = lazyWithRetry(() => import("./pages/NotFound"));
const AssistantPage = lazyWithRetry(() => import("./routes/assistant"));
const About = lazyWithRetry(() => import("./routes/About"));
const Insights = lazyWithRetry(() => import("./routes/Insights"));
const InsightsBlogs = lazyWithRetry(() => import("./routes/insights/Blogs"));
const InsightsPodcasts = lazyWithRetry(() => import("./routes/insights/Podcasts"));
const InsightsGuides = lazyWithRetry(() => import("./routes/insights/Guides"));
const Systems = lazyWithRetry(() => import("./routes/Systems"));
const SystemDetail = lazyWithRetry(() => import("./routes/SystemDetail"));
const InsightDetail = lazyWithRetry(() => import("./routes/InsightDetail"));
const PortfolioLabs = lazyWithRetry(() => import("./routes/portfolio/Labs"));
const PortfolioExperimentsConcepts = lazyWithRetry(() => import("./routes/portfolio/ExperimentsConcepts"));
const PortfolioExperimentsMocks = lazyWithRetry(() => import("./routes/portfolio/ExperimentsMocks"));
const PortfolioExperimentsPrototypes = lazyWithRetry(() => import("./routes/portfolio/ExperimentsPrototypes"));
const PortfolioLiveDemos = lazyWithRetry(() => import("./routes/portfolio/LiveDemos"));
const PortfolioLabDetail = lazyWithRetry(() => import("./routes/portfolio/LabDetail"));
const Portfolio = lazyWithRetry(() => import("./routes/Portfolio"));
const PortfolioDesignSystem = lazyWithRetry(() => import("./routes/portfolio/DesignSystem"));
const PortfolioDesignThinking = lazyWithRetry(() => import("./routes/portfolio/DesignThinking"));
const PortfolioDesignThinkingFrameworkDetail = lazyWithRetry(() => import("./routes/portfolio/DesignThinkingFrameworkDetail"));
const PortfolioDesignArchitecture = lazyWithRetry(() => import("./routes/portfolio/DesignArchitecture"));
const PortfolioDesignArchitecturePatternDetail = lazyWithRetry(() => import("./routes/portfolio/DesignArchitecturePatternDetail"));
const PortfolioContentStrategy = lazyWithRetry(() => import("./routes/portfolio/ContentStrategy"));
const PortfolioReviewBundle = lazyWithRetry(() => import("./routes/portfolio/ReviewBundle"));
const PortfolioVisualGallery = lazyWithRetry(() => import("./routes/portfolio/VisualGallery"));
const DesignSupport = lazyWithRetry(() => import("./routes/DesignSupport"));
const DesignKnowledgeEngine = lazyWithRetry(() => import("./routes/DesignKnowledgeEngine"));
const DesignDocs = lazyWithRetry(() => import("./routes/DesignDocs"));
const DesignDocDetail = lazyWithRetry(() => import("./routes/DesignDocDetail"));
const DesignPatterns = lazyWithRetry(() => import("./routes/DesignPatterns"));
const DesignPlayground = lazyWithRetry(() => import("./routes/DesignPlayground"));
const DemoDetail = lazyWithRetry(() => import("./routes/DemoDetail"));
const PrinciplesHome = lazyWithRetry(() => import("./routes/principles/PrinciplesHome"));
const PrinciplesDetail = lazyWithRetry(() => import("./routes/principles/PrinciplesDetail"));

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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <RuntimeDebugBanner />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route element={<AptLayout />}>
              <Route path="/" element={<Home />} />

              <Route path="/labs" element={<PortfolioLabs />} />
              <Route path="/labs/concepts" element={<PortfolioExperimentsConcepts />} />
              <Route path="/labs/mocks" element={<PortfolioExperimentsMocks />} />
              <Route path="/labs/prototypes" element={<PortfolioExperimentsPrototypes />} />
              <Route path="/labs/live-demos" element={<PortfolioLiveDemos />} />
              <Route path="/labs/live-demos/:slug" element={<DemoDetail />} />
              <Route path="/labs/:id" element={<PortfolioLabDetail />} />

              <Route path="/proof" element={<Systems />} />
              <Route path="/proof/:id" element={<SystemDetail />} />

              <Route path="/design" element={<Portfolio />} />
              <Route path="/design/system" element={<PortfolioDesignSystem />} />
              <Route path="/design/thinking" element={<PortfolioDesignThinking />} />
              <Route path="/design/thinking/:framework" element={<PortfolioDesignThinkingFrameworkDetail />} />
              <Route path="/design/architecture" element={<PortfolioDesignArchitecture />} />
              <Route path="/design/architecture/:pattern" element={<PortfolioDesignArchitecturePatternDetail />} />
              <Route path="/design/support" element={<DesignSupport />} />
              <Route path="/design/knowledge-engine" element={<DesignKnowledgeEngine />} />
              <Route path="/design/patterns" element={<DesignPatterns />} />
              <Route path="/design/docs" element={<DesignDocs />} />
              <Route path="/design/docs/:slug" element={<DesignDocDetail />} />
              <Route path="/design/docs/*" element={<DesignDocDetail />} />
              <Route path="/design/content-strategy" element={<PortfolioContentStrategy />} />
              <Route path="/design/review-bundle" element={<PortfolioReviewBundle />} />
              <Route path="/design/principles" element={<PrinciplesHome />} />

              <Route path="/principles" element={<PrinciplesHome />} />
              <Route path="/principles/framework" element={<PrinciplesDetail initialSection="framework" />} />
              <Route path="/principles/thinking" element={<PrinciplesDetail initialSection="thinking" />} />
              <Route path="/principles/design" element={<PrinciplesDetail initialSection="design" />} />
              <Route path="/principles/architecture" element={<PrinciplesDetail initialSection="architecture" />} />
              <Route path="/principles/system" element={<PrinciplesDetail initialSection="system" />} />
              <Route path="/principles/execution" element={<PrinciplesDetail initialSection="execution" />} />
              <Route path="/principles/quality" element={<PrinciplesDetail initialSection="quality" />} />
              <Route path="/principles/release" element={<PrinciplesDetail initialSection="release" />} />
              <Route path="/principles/operations" element={<PrinciplesDetail initialSection="operations" />} />
              <Route path="/principles/knowledge" element={<PrinciplesDetail initialSection="knowledge" />} />
              <Route path="/principles/ai" element={<PrinciplesDetail initialSection="ai" />} />
              <Route path="/principles/security" element={<PrinciplesDetail initialSection="security" />} />
              <Route path="/principles/:section" element={<PrinciplesDetail />} />

              <Route path="/insights" element={<Insights />} />
              <Route path="/insights/articles" element={<InsightsBlogs />} />
              <Route path="/insights/podcasts" element={<InsightsPodcasts />} />
              <Route path="/insights/practice" element={<InsightsGuides />} />
              <Route path="/insights/:id" element={<InsightDetail />} />

              <Route path="/about" element={<About />} />
              <Route path="/about/visual-gallery" element={<PortfolioVisualGallery />} />
              <Route path="/assistant" element={<AssistantPage />} />
              <Route path="/design-playground" element={<DesignPlayground />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

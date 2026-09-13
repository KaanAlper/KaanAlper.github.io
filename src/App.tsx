import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";
import { Toaster } from "@/components/ui/sonner";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ThemeProvider } from "@/contexts/ThemeContext";

const Home = lazy(() => import("@/pages/RoutePages").then((module) => ({ default: module.Home })));
const WorkPage = lazy(() => import("@/pages/RoutePages").then((module) => ({ default: module.WorkPage })));
const CaseStudy = lazy(() => import("@/pages/RoutePages").then((module) => ({ default: module.CaseStudy })));
const AboutPage = lazy(() => import("@/pages/RoutePages").then((module) => ({ default: module.AboutPage })));
const ContactPage = lazy(() => import("@/pages/RoutePages").then((module) => ({ default: module.ContactPage })));
const NotFound = lazy(() => import("@/pages/RoutePages").then((module) => ({ default: module.NotFound })));

function RouteFallback() {
  return <div className="route-fallback" role="status" aria-live="polite"><span className="live-dot" /> Loading system view…</div>;
}

function Router() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/work/:slug" component={CaseStudy} />
        <Route path="/work" component={WorkPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/contact" component={ContactPage} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <Toaster />
        <Router />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

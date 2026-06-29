import { Switch, Route, Router as WouterRouter } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import PageViewTracker from "@/components/PageViewTracker";
import Home from "@/pages/Home";
import Legal from "@/pages/Legal";
import NotFound from "@/pages/not-found";
import { SITE_BASE } from "@/lib/config";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/privacy-policy">{() => <Legal type="privacy" />}</Route>
      <Route path="/terms-of-service">{() => <Legal type="terms" />}</Route>
      <Route path="/refund-policy">{() => <Legal type="refund" />}</Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={SITE_BASE}>
          <PageViewTracker />
          <Toaster />
          <Router />
        </WouterRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

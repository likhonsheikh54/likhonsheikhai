import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { AgentProvider } from "./contexts/agent-context";
import Home from "./pages/home";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AgentProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AgentProvider>
    </QueryClientProvider>
  );
}

export default App;

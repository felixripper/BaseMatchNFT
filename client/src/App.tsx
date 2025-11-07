import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/components/AuthProvider";
import { FarcasterProvider } from "@/components/FarcasterProvider";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/landing";
import Discover from "@/pages/discover";
import Matches from "@/pages/matches";
import Messages from "@/pages/messages";
import Profile from "@/pages/profile";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/discover" component={Discover} />
      <Route path="/matches" component={Matches} />
      <Route path="/messages" component={Messages} />
      <Route path="/profile" component={Profile} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FarcasterProvider>
        <AuthProvider>
          <ThemeProvider defaultTheme="dark">
            <TooltipProvider>
              <Toaster />
              <Router />
            </TooltipProvider>
          </ThemeProvider>
        </AuthProvider>
      </FarcasterProvider>
    </QueryClientProvider>
  );
}

export default App;
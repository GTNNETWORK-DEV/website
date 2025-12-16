import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import NotFound from "@/pages/not-found";
import GTNHome from "@/pages/gtn-home";

// ADMIN PAGES
import AdminLogin from "@/pages/admin/login";
import AdminDashboard from "@/pages/admin/dashboard";

function Router() {
  return (
    <Switch>
      {/* ================= PUBLIC ================= */}
      <Route path="/" component={GTNHome} />

      {/* ================= ADMIN ================= */}
      {/* both open login */}
      <Route path="/admin" component={AdminLogin} />
      <Route path="/admin/login" component={AdminLogin} />

      {/* dashboard */}
      <Route path="/admin/dashboard" component={AdminDashboard} />

      {/* ================= FALLBACK ================= */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

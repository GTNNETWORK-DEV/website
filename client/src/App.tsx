import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import NotFound from "@/pages/not-found";
import GTNHome from "@/pages/gtn-home";
import GTNEvents from "@/pages/gtn-events";
import GTNNews from "@/pages/gtn-news";
import GTNBlogs from "@/pages/gtn-blogs";
import GTNProjects from "@/pages/gtn-projects";

// ADMIN PAGES
import AdminLogin from "@/pages/admin/login";
import AdminDashboard from "@/pages/admin/dashboard";
import JoinRequestsPage from "@/pages/admin/join-requests";

function Router() {
  return (
    <Switch>
      {/* ================= PUBLIC ================= */}
      <Route path="/" component={GTNHome} />
      <Route path="/events" component={GTNEvents} />
      <Route path="/news" component={GTNNews} />
      <Route path="/blogs" component={GTNBlogs} />
      <Route path="/projects" component={GTNProjects} />

      {/* ================= ADMIN ================= */}
      {/* both open login */}
      <Route path="/admin" component={AdminLogin} />
      <Route path="/admin/login" component={AdminLogin} />

      {/* dashboard */}
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route path="/admin/join-requests" component={JoinRequestsPage} />

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

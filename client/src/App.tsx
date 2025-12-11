import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import GTNHome from "@/pages/gtn-home";
import BlogsAdmin from "@/pages/admin/blogs-admin";
import NewsAdmin from "@/pages/admin/news-admin";
import ProjectsAdmin from "@/pages/admin/projects-admin";

function Router() {
  return (
    <Switch>
      <Route path="/" component={GTNHome} />
      <Route path="/admin/blogs" component={BlogsAdmin} />
      <Route path="/admin/news" component={NewsAdmin} />
      <Route path="/admin/projects" component={ProjectsAdmin} />
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

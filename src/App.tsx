import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { ROUTE_PATHS } from "@/lib/routes";
import Index from "./pages/home/Index";
import Frontend from "./pages/Frontend";
import Backend from "./pages/Backend";
import Connection from "./pages/Connection";
import SupabaseGuide from "./pages/SupabaseGuide";
import NotFound from "./pages/not-found/Index";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <Routes>
          <Route path={ROUTE_PATHS.HOME} element={<Index />} />
          <Route path={ROUTE_PATHS.FRONTEND} element={<Frontend />} />
          <Route path={ROUTE_PATHS.BACKEND} element={<Backend />} />
          <Route path={ROUTE_PATHS.CONNECTION} element={<Connection />} />
          <Route path={ROUTE_PATHS.SUPABASE_GUIDE} element={<SupabaseGuide />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

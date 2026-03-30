import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DashboardLayout from "./components/DashboardLayout";
import NotFound from "./pages/NotFound";
import Analytics from "./pages/Analytics";
import UsersPage from "./pages/Users";
import ECommerce from "./pages/Ecommerce";

const queryClient = new QueryClient();


const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter>
        <Routes>
          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Public route */}
          <Route path="/login" element={<Login />} />

          {/* Protected / Dashboard layout */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="ecommerce" element={<ECommerce />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Global fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
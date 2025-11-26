import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UploadProduct from "./pages/UploadProduct";
import ReviewApprove from "./pages/ReviewApprove";
import KPIRules from "./pages/KPIRules";
import KPIDashboard from "./pages/KPIDashboard";
import LifecycleSimulation from "./pages/LifecycleSimulation";
import ActivityLogs from "./pages/ActivityLogs";
import BackgroundWorker from "./pages/BackgroundWorker";
import ProductsByStore from "./pages/ProductsByStore";
import WinnerTracking from "./pages/WinnerTracking";
import AppLayout from "./components/AppLayout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
          <Route path="/upload" element={<AppLayout><UploadProduct /></AppLayout>} />
          <Route path="/review" element={<AppLayout><ReviewApprove /></AppLayout>} />
          <Route path="/products-by-store" element={<AppLayout><ProductsByStore /></AppLayout>} />
          <Route path="/winner-tracking" element={<AppLayout><WinnerTracking /></AppLayout>} />
          <Route path="/kpi-rules" element={<AppLayout><KPIRules /></AppLayout>} />
          <Route path="/kpi-dashboard" element={<AppLayout><KPIDashboard /></AppLayout>} />
          <Route path="/simulation" element={<AppLayout><LifecycleSimulation /></AppLayout>} />
          <Route path="/logs" element={<AppLayout><ActivityLogs /></AppLayout>} />
          <Route path="/worker" element={<AppLayout><BackgroundWorker /></AppLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

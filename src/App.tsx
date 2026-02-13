import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PublicLayout } from "@/layouts/PublicLayout";
import { AppLayout } from "@/layouts/AppLayout";
import { AdminLayout } from "@/layouts/AdminLayout";
import { LandingPage } from "@/pages/public/LandingPage";
import { ClientDashboard } from "@/pages/app/ClientDashboard";
import { AdminDashboard } from "@/pages/admin/AdminDashboard";
import { SchedulePage } from "@/pages/admin/SchedulePage";
import { MissionControl } from "@/pages/admin/MissionControl";
import { CommunicationFlow } from "@/pages/admin/CommunicationFlow";
import { ClientProfile } from "@/pages/admin/ClientProfile";
import { CartProvider } from "@/context/CartContext";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<div>Login Page (Placeholder)</div>} />
            <Route path="/register" element={<div>Register Page (Placeholder)</div>} />
          </Route>

          {/* Client Routes - Protected in real app */}
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<ClientDashboard />} />
            <Route path="schedule" element={<div>Schedule (Placeholder)</div>} />
            <Route path="history" element={<div>History (Placeholder)</div>} />
          </Route>

          {/* Admin Routes - Protected in real app */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="mission" element={<MissionControl />} />
            <Route path="schedule" element={<SchedulePage />} />
            <Route path="crm" element={<CommunicationFlow />} />
            <Route path="clients" element={<CommunicationFlow />} /> {/* Redirect for list view, eventually separate */}
            <Route path="clients/:clientId" element={<ClientProfile />} />
            <Route path="controls" element={<div>Controls (Placeholder)</div>} />
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;


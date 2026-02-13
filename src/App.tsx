import { Routes, Route, Navigate } from "react-router-dom";
import { AuthLayout } from "@/layouts/AuthLayout";
import { AppLayout } from "@/layouts/AppLayout";
import { AdminLayout } from "@/layouts/AdminLayout";
import { LandingPage } from "@/pages/public/LandingPage";
import { ClientDashboard } from "@/pages/app/ClientDashboard";
import { AdminDashboard } from "@/pages/admin/AdminDashboard";
import { SchedulePage } from "@/pages/admin/SchedulePage";
import { MissionControl } from "@/pages/admin/MissionControl";
import { CommunicationFlow } from "@/pages/admin/CommunicationFlow";
import { ClientProfile } from "@/pages/admin/ClientProfile";
import { SystemMap } from "@/pages/admin/SystemMap"; // Will create this next
import { StorePage } from "@/pages/app/StorePage";
import { CartProvider } from "@/context/CartContext";
import { ClientListPage } from "@/pages/admin/ClientListPage"; // Ensure this is here

function App() {
  return (
    <CartProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<div>Login System (Placeholder)</div>} />
        </Route>

        {/* Client App Routes */}
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<ClientDashboard />} />
          <Route path="store" element={<StorePage />} />
          <Route path="book" element={<div>Book Session (Placeholder)</div>} />
          <Route path="history" element={<div>History (Placeholder)</div>} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="mission" element={<MissionControl />} />
          <Route path="schedule" element={<SchedulePage />} />
          <Route path="crm" element={<CommunicationFlow />} />
          <Route path="clients" element={<ClientListPage />} />
          <Route path="clients/:clientId" element={<ClientProfile />} />
          <Route path="system-map" element={<SystemMap />} />
          <Route path="controls" element={<div>Controls (Placeholder)</div>} />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </CartProvider >
  );
}

export default App;


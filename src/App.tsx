import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthLayout } from "@/layouts/AuthLayout";
import { AppLayout } from "@/layouts/AppLayout";
import { AdminLayout } from "@/layouts/AdminLayout";
import { CartProvider } from "@/context/CartContext";

// Lazy load pages to isolate crashes and improve performance
const LandingPage = lazy(() => import("@/pages/public/LandingPage").then(m => ({ default: m.LandingPage })));
const ClientDashboard = lazy(() => import("@/pages/app/ClientDashboard").then(m => ({ default: m.ClientDashboard })));
const AdminDashboard = lazy(() => import("@/pages/admin/AdminDashboard").then(m => ({ default: m.AdminDashboard })));
const SchedulePage = lazy(() => import("@/pages/admin/SchedulePage").then(m => ({ default: m.SchedulePage })));
const MissionControl = lazy(() => import("@/pages/admin/MissionControl").then(m => ({ default: m.MissionControl })));
const CommunicationFlow = lazy(() => import("@/pages/admin/CommunicationFlow").then(m => ({ default: m.CommunicationFlow })));
const ClientProfile = lazy(() => import("@/pages/admin/ClientProfile").then(m => ({ default: m.ClientProfile })));
const SystemMap = lazy(() => import("@/pages/admin/SystemMap").then(m => ({ default: m.SystemMap })));
const StorePage = lazy(() => import("@/pages/app/StorePage").then(m => ({ default: m.StorePage })));
const ClientListPage = lazy(() => import("@/pages/admin/ClientListPage").then(m => ({ default: m.ClientListPage })));

function App() {
  return (
    <CartProvider>
      <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
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
      </Suspense>
    </CartProvider >
  );
}

export default App;


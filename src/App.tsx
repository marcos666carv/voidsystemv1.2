import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthLayout } from "@/layouts/AuthLayout";
import { AppLayout } from "@/layouts/AppLayout";
import { AdminLayout } from "@/layouts/AdminLayout";
import { CartProvider } from "@/context/CartContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

// Auth Pages
const LoginPage = lazy(() => import("@/pages/auth/LoginPage"));
const ClientRegisterPage = lazy(() => import("@/pages/auth/ClientRegisterPage"));
const AdminRegisterPage = lazy(() => import("@/pages/auth/AdminRegisterPage"));

// Public Pages
const LandingPage = lazy(() => import("@/pages/public/LandingPage").then(m => ({ default: m.LandingPage })));

// Client App Pages
const ClientDashboard = lazy(() => import("@/pages/app/ClientDashboard").then(m => ({ default: m.ClientDashboard })));
const StorePage = lazy(() => import("@/pages/app/StorePage").then(m => ({ default: m.StorePage })));

// Admin Pages
const AdminDashboard = lazy(() => import("@/pages/admin/AdminDashboard").then(m => ({ default: m.AdminDashboard })));
const SchedulePage = lazy(() => import("@/pages/admin/SchedulePage").then(m => ({ default: m.SchedulePage })));
const MissionControl = lazy(() => import("@/pages/admin/MissionControl").then(m => ({ default: m.MissionControl })));
const CommunicationFlow = lazy(() => import("@/pages/admin/CommunicationFlow").then(m => ({ default: m.CommunicationFlow })));
const ClientProfile = lazy(() => import("@/pages/admin/ClientProfile").then(m => ({ default: m.ClientProfile })));
const SystemMap = lazy(() => import("@/pages/admin/SystemMap").then(m => ({ default: m.SystemMap })));
const ClientListPage = lazy(() => import("@/pages/admin/ClientListPage").then(m => ({ default: m.ClientListPage })));

// Placeholder pages (will be implemented in subsequent phases)
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="flex flex-col items-center justify-center h-[60vh] text-slate-400">
    <div className="h-16 w-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
      <span className="text-2xl">🚧</span>
    </div>
    <h2 className="text-lg font-semibold text-slate-600">{title}</h2>
    <p className="text-sm mt-1">em construção</p>
  </div>
);

function App() {
  return (
    <CartProvider>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen bg-slate-50">
            <div className="flex flex-col items-center gap-3">
              <div className="h-8 w-8 border-2 border-slate-300 border-t-slate-800 rounded-full animate-spin" />
              <span className="text-sm text-slate-500">carregando...</span>
            </div>
          </div>
        }
      >
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/services" element={<PlaceholderPage title="Serviços" />} />
          <Route path="/schedule" element={<PlaceholderPage title="Agendamento" />} />
          <Route path="/club" element={<PlaceholderPage title="Void Club" />} />
          <Route path="/about" element={<PlaceholderPage title="Sobre" />} />

          {/* Auth Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<ClientRegisterPage />} />
            <Route path="/admin/register" element={<AdminRegisterPage />} />
          </Route>

          {/* Client App Routes (Protected) */}
          <Route
            path="/app"
            element={
              <ProtectedRoute role="client">
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<ClientDashboard />} />
            <Route path="store" element={<StorePage />} />
            <Route path="book" element={<PlaceholderPage title="Agendar Sessão" />} />
            <Route path="history" element={<PlaceholderPage title="Histórico" />} />
            <Route path="profile" element={<PlaceholderPage title="Meu Perfil" />} />
          </Route>

          {/* Admin Routes (Protected) */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="mission" element={<MissionControl />} />
            <Route path="schedule" element={<SchedulePage />} />
            <Route path="crm" element={<CommunicationFlow />} />
            <Route path="clients" element={<ClientListPage />} />
            <Route path="clients/:clientId" element={<ClientProfile />} />
            <Route path="sales" element={<PlaceholderPage title="Ponto de Venda" />} />
            <Route path="finance" element={<PlaceholderPage title="Financeiro" />} />
            <Route path="system-map" element={<SystemMap />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </CartProvider>
  );
}

export default App;

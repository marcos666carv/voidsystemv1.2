import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthLayout } from "@/layouts/AuthLayout";
import { AppLayout } from "@/layouts/AppLayout";
import { AdminLayout } from "@/layouts/AdminLayout";
import { PublicLayout } from "@/layouts/PublicLayout";
import { CartProvider } from "@/context/CartContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { EasterEgg } from "@/components/common/EasterEgg";

// Auth Pages
const LoginPage = lazy(() => import("@/pages/auth/LoginPage"));
const ClientRegisterPage = lazy(() => import("@/pages/auth/ClientRegisterPage"));
const AdminRegisterPage = lazy(() => import("@/pages/auth/AdminRegisterPage"));

// Public Pages
const LandingPage = lazy(() => import("@/pages/public/LandingPage").then(m => ({ default: m.LandingPage })));
const VoidClubPage = lazy(() => import("@/pages/public/VoidClubPage"));
const AboutPage = lazy(() => import("@/pages/public/AboutPage"));
const CheckoutFlow = lazy(() => import("@/pages/public/checkout/CheckoutFlow"));

// Client App Pages
const ClientDashboard = lazy(() => import("@/pages/app/ClientDashboard").then(m => ({ default: m.ClientDashboard })));
const StorePage = lazy(() => import("@/pages/app/StorePage").then(m => ({ default: m.StorePage })));
const BookingPage = lazy(() => import("@/pages/app/BookingPage"));
const AppCheckoutPage = lazy(() => import("@/pages/app/AppCheckoutPage").then(m => ({ default: m.AppCheckoutPage })));
const HistoryPage = lazy(() => import("@/pages/app/HistoryPage"));
const ProfilePage = lazy(() => import("@/pages/app/ProfilePage"));

// Admin Pages
const AdminDashboard = lazy(() => import("@/pages/admin/AdminDashboard").then(m => ({ default: m.AdminDashboard })));
const SchedulePage = lazy(() => import("@/pages/admin/SchedulePage").then(m => ({ default: m.SchedulePage })));
const MissionControl = lazy(() => import("@/pages/admin/MissionControl").then(m => ({ default: m.MissionControl })));
const CommunicationFlow = lazy(() => import("@/pages/admin/CommunicationFlow").then(m => ({ default: m.CommunicationFlow })));
const ClientProfile = lazy(() => import("@/pages/admin/ClientProfile").then(m => ({ default: m.ClientProfile })));
const SystemMap = lazy(() => import("@/pages/admin/SystemMap").then(m => ({ default: m.SystemMap })));
const ClientListPage = lazy(() => import("@/pages/admin/ClientListPage").then(m => ({ default: m.ClientListPage })));
const SalesPage = lazy(() => import("@/pages/admin/SalesPage").then(m => ({ SalesPage: m.SalesPage })).then(m => ({ default: m.SalesPage })));
const FinancePage = lazy(() => import("@/pages/admin/FinancePage").then(m => ({ FinancePage: m.FinancePage })).then(m => ({ default: m.FinancePage })));
const AdminServicesPage = lazy(() => import("@/pages/admin/AdminServicesPage"));
const AdminVoidClubPage = lazy(() => import("@/pages/admin/AdminVoidClubPage"));
const AdminProductsPage = lazy(() => import("@/pages/admin/products/AdminProductsPage"));
const AdminTanksPage = lazy(() => import("@/pages/admin/tanks/AdminTanksPage").then(m => ({ default: m.AdminTanksPage })));

function App() {
  return (
    <CartProvider>
      <EasterEgg />
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
          {/* Public pages with Navbar + Footer */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/club" element={<VoidClubPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Route>

          {/* Checkout (Standalone / Distraction Free) */}
          <Route path="/checkout" element={<CheckoutFlow />} />

          {/* Auth (own layout, no public nav) */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<ClientRegisterPage />} />
            <Route path="/admin/register" element={<AdminRegisterPage />} />
          </Route>

          {/* Client App (Protected) */}
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
            <Route path="book" element={<BookingPage />} />
            <Route path="checkout" element={<AppCheckoutPage />} />
            <Route path="history" element={<HistoryPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>

          {/* Admin (Protected) */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="services" element={<AdminServicesPage />} />
            <Route path="void-club" element={<AdminVoidClubPage />} />
            <Route path="tanks" element={<AdminTanksPage />} />
            <Route path="mission" element={<MissionControl />} />
            <Route path="schedule" element={<SchedulePage />} />
            <Route path="crm" element={<CommunicationFlow />} />
            <Route path="clients" element={<ClientListPage />} />
            <Route path="clients/:clientId" element={<ClientProfile />} />
            <Route path="products" element={<AdminProductsPage />} />
            <Route path="sales" element={<SalesPage />} />
            <Route path="finance" element={<FinancePage />} />
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

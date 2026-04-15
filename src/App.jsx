import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Notifications from "./components/ui/Notifications";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Categories from "./pages/Categories";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminSales from "./pages/admin/AdminSales";
import AdminAI from "./pages/admin/AdminAI";
import ProtectedRoute from "./components/admin/ProtectedRoute";

function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F8FAFF]" style={{ paddingTop: 'var(--header-h, 64px)' }}>
      <div className="text-center px-4">
        <div className="text-8xl font-black gradient-text mb-4">404</div>
        <h2 className="text-2xl font-bold text-[#0D1B2E] mb-2">Página não encontrada</h2>
        <p className="text-gray-500 mb-6 text-sm">A página que você procura não existe.</p>
        <a href="/" className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#0F52BA] hover:bg-[#0A3D90] text-white font-semibold rounded-xl transition-colors shadow-md shadow-[#0F52BA]/25 text-sm">
          Voltar ao início
        </a>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <>
      <Notifications />
      <Routes>
        {/* Secret admin login page */}
        <Route path="/painel/login" element={<AdminLogin />} />

        {/* Protected admin panel — route /painel is the secret URL */}
        <Route path="/painel" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="produtos" element={<AdminProducts />} />
          <Route path="vendas" element={<AdminSales />} />
          <Route path="ia" element={<AdminAI />} />
          <Route path="configuracoes" element={<Dashboard />} />
        </Route>

        {/* Old /admin redirects to login */}
        <Route path="/admin/*" element={<Navigate to="/painel/login" replace />} />

        {/* Public routes */}
        <Route path="*" element={
          <>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/produtos" element={<Products />} />
              <Route path="/produto/:id" element={<ProductDetail />} />
              <Route path="/categorias" element={<Categories />} />
              <Route path="/categorias/:id" element={<Categories />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </>
        } />
      </Routes>
    </>
  );
}


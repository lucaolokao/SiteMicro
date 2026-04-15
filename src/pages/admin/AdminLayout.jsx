import { NavLink, Outlet, Link, useNavigate } from "react-router-dom";
import { LayoutDashboard, Package, TrendingUp, Bot, Settings, ChevronRight, Activity, LogOut, ArrowLeft } from "lucide-react";
import { adminLogout } from "../../utils/adminAuth";

const navItems = [
  { to: "/painel", icon: LayoutDashboard, label: "Dashboard", end: true },
  { to: "/painel/produtos", icon: Package, label: "Produtos" },
  { to: "/painel/vendas", icon: TrendingUp, label: "Vendas & Lucros" },
  { to: "/painel/ia", icon: Bot, label: "Motor IA" },
  { to: "/painel/configuracoes", icon: Settings, label: "Configurações" },
];

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    adminLogout();
    navigate('/painel/login');
  };

  return (
    <div className="min-h-screen flex bg-[#F8FAFF]">
      {/* Sidebar */}
      <aside className="w-60 shrink-0 bg-white border-r border-[#E2EBF6] flex flex-col fixed top-0 bottom-0 z-40">
        {/* Brand */}
        <div className="px-5 py-5 border-b border-[#E2EBF6]">
          <Link to="/" className="flex items-center gap-1.5 mb-4 text-xs text-gray-400 hover:text-[#0F52BA] transition-colors font-medium">
            <ArrowLeft size={12} /> Voltar ao site
          </Link>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#0F52BA] flex items-center justify-center shadow-sm shadow-[#0F52BA]/30 shrink-0">
              <Activity size={16} className="text-white" />
            </div>
            <div className="leading-none">
              <div className="text-sm font-black text-[#0D1B2E]">Painel Admin</div>
              <div className="text-[10px] text-gray-400 font-medium mt-0.5">MicroShop Control</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map(({ to, icon: Icon, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                "flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors group " +
                (isActive
                  ? "bg-[#EEF3FF] text-[#0F52BA]"
                  : "text-[#475569] hover:text-[#0D1B2E] hover:bg-[#F0F6FF]")
              }
            >
              <Icon size={16} className="shrink-0" />
              <span className="flex-1">{label}</span>
              <ChevronRight size={12} className="opacity-0 group-hover:opacity-50 transition-opacity" />
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-3 py-4 border-t border-[#E2EBF6] space-y-2">
          <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="text-xs text-emerald-700 font-semibold">IA Engine Ativa</span>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors"
          >
            <LogOut size={15} />
            Sair do Painel
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-h-screen" style={{ marginLeft: '240px' }}>
        <Outlet />
      </main>
    </div>
  );
}



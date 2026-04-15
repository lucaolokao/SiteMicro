import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Search, Menu, X, ChevronDown, Zap, Heart } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { categories } from '../../data/categories';

const navLinks = [
  { label: 'Início', to: '/' },
  { label: 'Produtos', to: '/produtos' },
  { label: 'Categorias', to: '/categorias', hasDropdown: true },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef(null);
  const { searchQuery, setSearch, wishlist } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    setMobileOpen(false);
    setCatOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/produtos?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setMobileOpen(false);
    }
  };

  return (
    <header
      style={{ height: 'var(--header-h)' }}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center transition-all duration-200 ${
        scrolled
          ? 'bg-white shadow-sm shadow-[#0F52BA]/8 border-b border-[#E2EBF6]'
          : 'bg-white/96 backdrop-blur-sm border-b border-[#E2EBF6]'
      }`}
    >
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-4 h-full">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-9 h-9 rounded-xl bg-[#0F52BA] flex items-center justify-center shadow-md shadow-[#0F52BA]/30 group-hover:shadow-[#0F52BA]/50 transition-shadow">
            <Cpu size={18} className="text-white" />
          </div>
          <div className="leading-none">
            <div className="text-[17px] font-black text-[#0D1B2E] tracking-tight">MicroShop</div>
            <div className="text-[9px] text-[#0F52BA] font-bold tracking-[0.12em] uppercase mt-0.5">Eletrônica & Arduino</div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-0.5 ml-4">
          {navLinks.map((link) =>
            link.hasDropdown ? (
              <div key={link.label} className="relative" onMouseLeave={() => setCatOpen(false)}>
                <button
                  onMouseEnter={() => setCatOpen(true)}
                  className={`flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    location.pathname.startsWith('/categorias')
                      ? 'text-[#0F52BA] bg-[#EEF3FF]'
                      : 'text-[#475569] hover:text-[#0F52BA] hover:bg-[#F0F6FF]'
                  }`}
                >
                  {link.label}
                  <ChevronDown size={13} className={`transition-transform duration-200 ${catOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {catOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.13 }}
                      onMouseEnter={() => setCatOpen(true)}
                      className="absolute top-full left-0 mt-1.5 w-64 bg-white rounded-2xl border border-[#E2EBF6] p-2.5 shadow-xl shadow-black/8"
                    >
                      <div className="grid grid-cols-2 gap-0.5">
                        {categories.slice(0, 8).map((cat) => (
                          <Link
                            key={cat.id}
                            to={`/categorias/${cat.id}`}
                            onClick={() => setCatOpen(false)}
                            className="flex items-center gap-2 px-2.5 py-2 rounded-xl hover:bg-[#F0F6FF] transition-colors group"
                          >
                            <span className="text-base leading-none">{cat.icon}</span>
                            <div className="min-w-0">
                              <div className="text-xs font-semibold text-[#0D1B2E] group-hover:text-[#0F52BA] transition-colors truncate">{cat.name}</div>
                              <div className="text-[10px] text-gray-400">{cat.count} itens</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-1.5 pt-1.5 border-t border-[#E2EBF6]">
                        <Link to="/categorias" onClick={() => setCatOpen(false)}
                          className="flex items-center justify-center w-full py-1.5 text-xs text-[#0F52BA] hover:text-[#1565C0] font-semibold transition-colors">
                          Ver todas as categorias →
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={link.label}
                to={link.to}
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  location.pathname === link.to
                    ? 'text-[#0F52BA] bg-[#EEF3FF]'
                    : 'text-[#475569] hover:text-[#0F52BA] hover:bg-[#F0F6FF]'
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <AnimatePresence mode="wait">
            {searchOpen ? (
              <motion.form
                key="open"
                initial={{ width: 36, opacity: 0 }}
                animate={{ width: 220, opacity: 1 }}
                exit={{ width: 36, opacity: 0 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleSearch}
                className="hidden sm:flex items-center gap-2 bg-[#F0F6FF] border border-[#E2EBF6] rounded-xl px-3 h-9"
              >
                <Search size={14} className="text-[#0F52BA] shrink-0" />
                <input
                  ref={searchRef}
                  value={searchQuery}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar produtos..."
                  className="bg-transparent text-sm text-[#0D1B2E] placeholder-gray-400 outline-none flex-1 min-w-0"
                  onKeyDown={(e) => e.key === 'Escape' && setSearchOpen(false)}
                />
                <button type="button" onClick={() => setSearchOpen(false)} className="shrink-0">
                  <X size={13} className="text-gray-400 hover:text-[#0D1B2E] transition-colors" />
                </button>
              </motion.form>
            ) : (
              <motion.button
                key="closed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => setSearchOpen(true)}
                className="hidden sm:flex w-9 h-9 items-center justify-center rounded-xl bg-[#F0F6FF] hover:bg-[#EEF3FF] border border-[#E2EBF6] text-[#475569] hover:text-[#0F52BA] transition-colors"
              >
                <Search size={16} />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Wishlist */}
          <Link to="/produtos"
            className="hidden sm:flex w-9 h-9 items-center justify-center rounded-xl bg-[#F0F6FF] hover:bg-rose-50 border border-[#E2EBF6] hover:border-rose-200 text-[#475569] hover:text-rose-500 transition-colors relative">
            <Heart size={16} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-0.5 bg-rose-500 rounded-full text-[9px] font-bold flex items-center justify-center text-white">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* CTA */}
          <Link to="/produtos"
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-[#0F52BA] hover:bg-[#0A3D90] text-white text-sm font-semibold rounded-xl transition-colors shadow-sm shadow-[#0F52BA]/30">
            <Zap size={14} />
            Produtos
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex w-9 h-9 items-center justify-center rounded-xl bg-[#F0F6FF] border border-[#E2EBF6] text-[#475569] transition-colors"
            aria-label="Menu"
          >
            {mobileOpen ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-white border-t border-[#E2EBF6] shadow-lg overflow-hidden lg:hidden"
          >
            <div className="px-4 py-4 space-y-1">
              <form onSubmit={handleSearch} className="flex items-center gap-2 bg-[#F0F6FF] border border-[#E2EBF6] rounded-xl px-3 py-2.5 mb-3">
                <Search size={14} className="text-[#0F52BA] shrink-0" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar produtos..."
                  className="bg-transparent text-sm text-[#0D1B2E] placeholder-gray-400 outline-none flex-1"
                />
              </form>
              {navLinks.map((link) => (
                <Link key={link.label} to={link.to} onClick={() => setMobileOpen(false)}
                  className="flex items-center px-4 py-2.5 rounded-xl text-sm font-semibold text-[#0D1B2E] hover:text-[#0F52BA] hover:bg-[#F0F6FF] transition-colors">
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 grid grid-cols-2 gap-2">
                {categories.slice(0, 6).map((cat) => (
                  <Link key={cat.id} to={`/categorias/${cat.id}`} onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#F0F6FF] text-xs font-medium text-[#0D1B2E] hover:text-[#0F52BA] transition-colors">
                    <span>{cat.icon}</span>{cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

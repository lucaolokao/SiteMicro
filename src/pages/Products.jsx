import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X, ChevronDown, Grid3x3, List, ArrowRight } from 'lucide-react';
import { products } from '../data/products';
import { categories } from '../data/categories';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/products/ProductCard';

const sortOptions = [
  { value: 'popular', label: 'Mais Populares' },
  { value: 'price-asc', label: 'Menor Preco' },
  { value: 'price-desc', label: 'Maior Preco' },
  { value: 'rating', label: 'Melhor Avaliacao' },
  { value: 'discount', label: 'Maior Desconto' },
  { value: 'newest', label: 'Mais Recentes' },
];

function calcDiscount(price, oldPrice) {
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterOpen, setFilterOpen] = useState(false);
  const [gridView, setGridView] = useState(true);
  const [localSearch, setLocalSearch] = useState(searchParams.get('q') || '');
  const [selectedCats, setSelectedCats] = useState([]);
  const [sortBy, setSortBy] = useState('popular');
  const [maxPrice, setMaxPrice] = useState(100);
  const { setSearch } = useApp();

  useEffect(() => {
    const q = searchParams.get('q') || '';
    setLocalSearch(q);
    setSearch(q);
  }, [searchParams]);

  const filtered = useMemo(() => {
    let result = [...products];

    if (localSearch) {
      const q = localSearch.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (selectedCats.length > 0) {
      result = result.filter((p) => selectedCats.includes(p.category));
    }

    result = result.filter((p) => p.price <= maxPrice);

    switch (sortBy) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'discount': result.sort((a, b) => calcDiscount(b.price, b.oldPrice) - calcDiscount(a.price, a.oldPrice)); break;
      case 'popular': default: result.sort((a, b) => b.sold - a.sold); break;
    }

    return result;
  }, [localSearch, selectedCats, sortBy, maxPrice]);

  const toggleCat = (id) =>
    setSelectedCats((prev) => prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams(localSearch ? { q: localSearch } : {});
  };

  const clearFilters = () => {
    setSelectedCats([]);
    setMaxPrice(100);
    setSortBy('popular');
    setLocalSearch('');
    setSearchParams({});
  };

  const hasFilters = selectedCats.length > 0 || maxPrice < 100 || sortBy !== 'popular' || localSearch;

  return (
    <main className="min-h-screen bg-[#F8FAFF]" style={{ paddingTop: 'var(--header-h, 64px)' }}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-black text-[#0D1B2E]">
            Todos os <span className="gradient-text">Produtos</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {filtered.length} produto{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
            {localSearch && <span className="text-[#0F52BA]"> para "{localSearch}"</span>}
          </p>
        </motion.div>

        {/* Search + Controls bar */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <form onSubmit={handleSearch} className="flex-1 min-w-[200px] flex items-center gap-2 bg-white border border-[#E2EBF6] rounded-xl px-4 py-2.5 shadow-sm">
            <Search size={16} className="text-[#0F52BA] shrink-0" />
            <input
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Buscar produtos, componentes..."
              className="bg-transparent text-sm text-[#0D1B2E] placeholder-gray-400 outline-none flex-1"
            />
            {localSearch && (
              <button type="button" onClick={() => { setLocalSearch(''); setSearchParams({}); }}>
                <X size={14} className="text-gray-400 hover:text-[#0D1B2E]" />
              </button>
            )}
          </form>

          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-[#E2EBF6] rounded-xl px-4 py-2.5 pr-8 text-sm text-[#0D1B2E] outline-none cursor-pointer shadow-sm"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          {/* Filter toggle */}
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
              filterOpen || selectedCats.length > 0
                ? 'bg-[#EEF3FF] border-[#0F52BA]/30 text-[#0F52BA]'
                : 'bg-white border-[#E2EBF6] text-[#475569] hover:border-[#0F52BA]/25 hover:text-[#0F52BA] shadow-sm'
            }`}
          >
            <SlidersHorizontal size={15} />
            Filtros
            {selectedCats.length > 0 && (
              <span className="w-5 h-5 bg-[#0F52BA] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {selectedCats.length}
              </span>
            )}
          </button>

          {/* Grid/List toggle */}
          <div className="hidden sm:flex items-center bg-white border border-[#E2EBF6] rounded-xl overflow-hidden shadow-sm">
            {[{ icon: Grid3x3, val: true }, { icon: List, val: false }].map(({ icon: Icon, val }) => (
              <button
                key={String(val)}
                onClick={() => setGridView(val)}
                className={`p-2.5 transition-colors ${gridView === val ? 'bg-[#EEF3FF] text-[#0F52BA]' : 'text-gray-400 hover:text-[#0F52BA]'}`}
              >
                <Icon size={15} />
              </button>
            ))}
          </div>

          {hasFilters && (
            <button onClick={clearFilters} className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-600 font-semibold px-3 py-2.5">
              <X size={13} /> Limpar
            </button>
          )}
        </div>

        {/* Filter Panel */}
        <AnimatePresence>
          {filterOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-6"
            >
              <div className="bg-white border border-[#E2EBF6] rounded-2xl p-5 shadow-sm">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Categories */}
                  <div>
                    <h3 className="text-xs font-bold text-[#0D1B2E] uppercase tracking-wider mb-3">Categorias</h3>
                    <div className="space-y-2">
                      {categories.map((cat) => (
                        <label key={cat.id} className="flex items-center gap-2.5 cursor-pointer group">
                          <div
                            onClick={() => toggleCat(cat.id)}
                            className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all cursor-pointer ${
                              selectedCats.includes(cat.id)
                                ? 'bg-[#0F52BA] border-[#0F52BA]'
                                : 'border-gray-300 group-hover:border-[#0F52BA]/60'
                            }`}
                          >
                            {selectedCats.includes(cat.id) && (
                              <svg viewBox="0 0 10 8" fill="none" className="w-2.5"><path d="M1 4l2.5 2.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            )}
                          </div>
                          <span className="text-sm text-[#475569] group-hover:text-[#0D1B2E] transition-colors">
                            {cat.icon} {cat.name}
                          </span>
                          <span className="ml-auto text-xs text-gray-400">{cat.count}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <h3 className="text-xs font-bold text-[#0D1B2E] uppercase tracking-wider mb-3">
                      Preco max: <span className="text-[#0F52BA]">${maxPrice}</span>
                    </h3>
                    <input
                      type="range"
                      min={0} max={100} value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="w-full accent-[#0F52BA]"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>$0</span><span>$100</span>
                    </div>
                  </div>

                  {/* Quick Filters */}
                  <div>
                    <h3 className="text-xs font-bold text-[#0D1B2E] uppercase tracking-wider mb-3">Filtros Rapidos</h3>
                    <div className="flex flex-wrap gap-2">
                      {['Popular', 'WiFi', 'Bluetooth', 'I2C', 'Kit', 'Barato', 'Pro'].map((tag) => (
                        <button
                          key={tag}
                          onClick={() => setLocalSearch(tag)}
                          className="px-3 py-1.5 rounded-lg bg-[#F0F6FF] hover:bg-[#EEF3FF] border border-[#E2EBF6] hover:border-[#0F52BA]/25 text-xs text-[#475569] hover:text-[#0F52BA] transition-all font-medium"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Products Grid */}
        {filtered.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-[#0D1B2E] mb-2">Nenhum produto encontrado</h3>
            <p className="text-gray-500 text-sm mb-6">Tente outros termos ou remova alguns filtros</p>
            <button onClick={clearFilters} className="px-6 py-2.5 bg-[#0F52BA] hover:bg-[#0A3D90] text-white font-semibold rounded-xl transition-colors">
              Limpar filtros
            </button>
          </motion.div>
        ) : (
          <div className={`grid gap-3 sm:gap-4 ${
            gridView
              ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
          }`}>
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

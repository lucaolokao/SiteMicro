import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { categories, getCategoryById } from '../data/categories';
import { getProductsByCategory } from '../data/products';
import ProductCard from '../components/products/ProductCard';

export default function Categories() {
  const { id } = useParams();

  if (id) {
    const cat = getCategoryById(id);
    const catProducts = getProductsByCategory(id);
    if (!cat) return (
      <main className="min-h-screen bg-[#F8FAFF] flex items-center justify-center" style={{ paddingTop: 'var(--header-h, 64px)' }}>
        <p className="text-[#0D1B2E] font-semibold">Categoria não encontrada</p>
      </main>
    );

    return (
      <main className="min-h-screen bg-[#F8FAFF] pb-20" style={{ paddingTop: 'var(--header-h, 64px)' }}>
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <Link to="/categorias" className="text-xs text-[#0F52BA] hover:text-[#0A3D90] mb-3 inline-block font-semibold transition-colors">
              ← Todas as categorias
            </Link>
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-2xl shadow-md shrink-0`}>
                {cat.icon}
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-[#0D1B2E]">{cat.name}</h1>
                <p className="text-gray-500 text-sm">{cat.description} • {catProducts.length} produtos</p>
              </div>
            </div>
          </motion.div>

          {catProducts.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <div className="text-5xl mb-4">📦</div>
              <p className="text-sm">Nenhum produto nessa categoria ainda. Nossa IA está buscando...</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
              {catProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8FAFF] pb-20" style={{ paddingTop: 'var(--header-h, 64px)' }}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-black text-[#0D1B2E] mb-2">
            Todas as <span className="gradient-text">Categorias</span>
          </h1>
          <p className="text-gray-500 text-sm">Explore nossa coleção completa de componentes eletrônicos</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
            >
              <Link
                to={`/categorias/${cat.id}`}
                className="group flex flex-col items-center text-center p-5 rounded-2xl bg-white border border-[#E2EBF6] hover:border-[#0F52BA]/25 shadow-sm hover:shadow-md hover:shadow-[#0F52BA]/8 transition-all duration-200 hover:-translate-y-1 h-full"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-2xl mb-3 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                  {cat.icon}
                </div>
                <h3 className="text-sm font-bold text-[#0D1B2E] group-hover:text-[#0F52BA] transition-colors mb-1">{cat.name}</h3>
                <p className="text-[11px] text-gray-400 line-clamp-2 mb-3 leading-snug">{cat.description}</p>
                <div className="mt-auto flex items-center gap-1 text-xs text-[#0F52BA] font-semibold">
                  {cat.count} produtos <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}

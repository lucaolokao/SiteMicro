import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame } from 'lucide-react';
import ProductCard from '../products/ProductCard';
import { getFeaturedProducts } from '../../data/products';

export default function FeaturedProducts() {
  const featured = getFeaturedProducts();

  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-8"
        >
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <Flame size={15} className="text-orange-500" />
              <span className="text-xs text-orange-500 font-bold uppercase tracking-[0.1em]">Em Alta</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0D1B2E]">
              Mais <span className="gradient-text-warm">Vendidos</span>
            </h2>
            <p className="text-gray-500 mt-1 text-sm">Selecionados pela IA com o melhor custo-benefício</p>
          </div>
          <Link
            to="/produtos"
            className="hidden sm:flex items-center gap-1.5 text-sm text-[#0F52BA] hover:text-[#0A3D90] font-semibold group transition-colors"
          >
            Ver todos <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        <div className="sm:hidden mt-5 text-center">
          <Link
            to="/produtos"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#EEF3FF] border border-[#0F52BA]/20 rounded-xl text-[#0F52BA] font-semibold text-sm"
          >
            Ver todos os produtos <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </section>
  );
}


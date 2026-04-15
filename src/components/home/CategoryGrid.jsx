import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { categories } from '../../data/categories';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

export default function CategoryGrid() {
  return (
    <section className="py-16 bg-[#F8FAFF]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-8"
        >
          <div>
            <span className="text-xs text-[#0F52BA] font-bold uppercase tracking-[0.1em]">Categorias</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0D1B2E] mt-1">
              Tudo que você <span className="gradient-text">precisa</span>
            </h2>
            <p className="text-gray-500 mt-1 text-sm">1.100+ produtos em 10 categorias especializadas</p>
          </div>
          <Link to="/categorias"
            className="hidden sm:flex items-center gap-1.5 text-sm text-[#0F52BA] hover:text-[#0A3D90] font-semibold group transition-colors">
            Ver todas <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
        >
          {categories.map((cat) => (
            <motion.div key={cat.id} variants={item}>
              <Link
                to={`/categorias/${cat.id}`}
                className="group flex flex-col items-center text-center p-4 rounded-2xl bg-white border border-[#E2EBF6] hover:border-[#0F52BA]/25 shadow-sm hover:shadow-md hover:shadow-[#0F52BA]/8 transition-all duration-200 hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-xl mb-3 shadow-sm group-hover:scale-110 transition-transform duration-250`}>
                  {cat.icon}
                </div>
                <h3 className="text-xs font-bold text-[#0D1B2E] group-hover:text-[#0F52BA] transition-colors leading-snug mb-0.5">{cat.name}</h3>
                <p className="text-[10px] text-gray-400 line-clamp-2 mb-2 leading-snug">{cat.description}</p>
                <span className="text-[10px] font-bold text-[#0F52BA] bg-[#EEF3FF] px-2 py-0.5 rounded-full">{cat.count} itens</span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

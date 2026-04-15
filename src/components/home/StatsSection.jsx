import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useProducts } from '../../context/ProductsContext';
import { categories } from '../../data/categories';

function Counter({ target, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const steps = 50;
    const inc = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += inc;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else { setCount(Math.floor(current)); }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{prefix}{count.toLocaleString('pt-BR')}{suffix}</span>;
}

export default function StatsSection() {
  const { products } = useProducts();

  const avgDiscount = (() => {
    const valid = products.filter((p) => p.oldPrice > p.price);
    if (!valid.length) return 0;
    const sum = valid.reduce((acc, p) => acc + Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100), 0);
    return Math.round(sum / valid.length);
  })();

  const stats = [
    { label: 'Produtos Indexados', value: products.length, suffix: '', icon: '📦' },
    { label: 'Categorias', value: categories.length, suffix: '', icon: '🗂️' },
    { label: 'Economia Média', value: avgDiscount, suffix: '%', icon: '💰' },
  ];

  return (
    <section className="py-16 bg-white border-t border-[#E2EBF6]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="text-xs text-[#0F52BA] font-bold uppercase tracking-[0.1em]">Números Reais</span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0D1B2E] mt-1">
            Nossa <span className="gradient-text">plataforma</span> em números
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-[#F8FAFF] border border-[#E2EBF6] hover:border-[#0F52BA]/20 hover:shadow-sm transition-all"
            >
              <div className="text-3xl mb-3">{stat.icon}</div>
              <div className="text-3xl font-black text-[#0F52BA] leading-none mb-1">
                <Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-gray-500 leading-tight">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


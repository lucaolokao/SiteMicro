import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

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

const stats = [
  { label: 'Produtos Indexados', value: 1100, suffix: '+', icon: '📦' },
  { label: 'Categorias', value: 10, suffix: '', icon: '🗂️' },
  { label: 'Sellers Monitorados', value: 5000, suffix: '+', icon: '🏪' },
  { label: 'Cliques no Mês', value: 127000, suffix: '+', icon: '🖱️' },
  { label: 'Economia Média', value: 62, suffix: '%', icon: '💰' },
  { label: 'Usuários Ativos', value: 85000, suffix: '+', icon: '👥' },
];

export default function StatsSection() {
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

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="flex flex-col items-center text-center p-5 rounded-2xl bg-[#F8FAFF] border border-[#E2EBF6] hover:border-[#0F52BA]/20 hover:shadow-sm transition-all"
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-xl sm:text-2xl font-black text-[#0F52BA] leading-none mb-1">
                <Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-[11px] text-gray-500 leading-tight">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


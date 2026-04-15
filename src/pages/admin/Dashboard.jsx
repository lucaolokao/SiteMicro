import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Package, MousePointerClick, Bot, LayoutGrid, ArrowUpRight, BarChart2 } from 'lucide-react';
import { useProducts } from '../../context/ProductsContext';
import { categories } from '../../data/categories';

function getRealClicks(products) {
  let total = parseInt(localStorage.getItem('total_clicks') || '0');
  const perProduct = products.map((p) => ({
    id: p.id,
    name: p.name,
    category: p.category,
    clicks: parseInt(localStorage.getItem(`clicks_${p.id}`) || '0'),
  })).filter((p) => p.clicks > 0).sort((a, b) => b.clicks - a.clicks);
  return { total, perProduct };
}

function StatCard({ icon: Icon, label, value, sub, color = 'blue', index = 0 }) {
  const colors = {
    blue: { bg: 'bg-[#EEF3FF]', border: 'border-[#0F52BA]/15', text: 'text-[#0F52BA]', icon: 'bg-[#E0EAFF]' },
    green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-600', icon: 'bg-green-100' },
    purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-600', icon: 'bg-purple-100' },
    orange: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-600', icon: 'bg-orange-100' },
  };
  const c = colors[color];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className={`${c.bg} ${c.border} border rounded-2xl p-5`}
    >
      <div className={`${c.icon} w-10 h-10 rounded-xl flex items-center justify-center mb-4`}>
        <Icon size={18} className={c.text} />
      </div>
      <div className="text-2xl font-black text-[#0D1B2E] mb-0.5">{value}</div>
      <div className="text-sm font-medium text-[#475569]">{label}</div>
      {sub && <div className="text-xs text-gray-400 mt-1">{sub}</div>}
    </motion.div>
  );
}

export default function Dashboard() {
  const { products } = useProducts();
  const { total: totalClicks, perProduct: topByClicks } = useMemo(() => getRealClicks(products), [products]);

  const aiProducts = products.filter((p) => p.source === 'ai').length;
  const avgDiscount = useMemo(() => {
    const valid = products.filter((p) => p.oldPrice > p.price);
    if (!valid.length) return 0;
    const sum = valid.reduce((acc, p) => acc + Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100), 0);
    return Math.round(sum / valid.length);
  }, [products]);

  return (
    <div className="p-6 lg:p-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
        <h1 className="text-2xl font-black text-[#0D1B2E]">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Dados reais da plataforma</p>
      </motion.div>

      {/* Real Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={Package} label="Produtos no Catálogo" value={products.length} sub="Indexados ativamente" color="blue" index={0} />
        <StatCard icon={MousePointerClick} label="Cliques Totais" value={totalClicks.toLocaleString('pt-BR')} sub="Em links afiliados" color="green" index={1} />
        <StatCard icon={LayoutGrid} label="Categorias Ativas" value={categories.length} sub="Disponíveis no site" color="purple" index={2} />
        <StatCard icon={Bot} label="Adicionados pela IA" value={aiProducts} sub="Via busca automática" color="orange" index={3} />
      </div>

      {/* Top Products by Real Clicks */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-2xl border border-[#E2EBF6] p-5 shadow-sm">
          <h3 className="text-sm font-bold text-[#0D1B2E] mb-4 flex items-center gap-2">
            <MousePointerClick size={15} className="text-[#0F52BA]" />
            Produtos Mais Clicados
          </h3>
          {topByClicks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <BarChart2 size={36} className="text-gray-200 mb-3" />
              <p className="text-sm text-gray-400">Nenhum clique registrado ainda.</p>
              <p className="text-xs text-gray-300 mt-1">Os dados aparecem conforme os usuários clicam nos produtos.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {topByClicks.slice(0, 5).map((p, i) => (
                <div key={p.id} className="flex items-center gap-3">
                  <span className="text-xs text-gray-400 w-4 font-bold shrink-0">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-[#0D1B2E] truncate">{p.name}</div>
                    <div className="text-[10px] text-gray-400 capitalize">{p.category}</div>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-[#0F52BA] shrink-0">
                    <MousePointerClick size={11} /> {p.clicks}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Avg Discount Info */}
        <div className="bg-white rounded-2xl border border-[#E2EBF6] p-5 shadow-sm">
          <h3 className="text-sm font-bold text-[#0D1B2E] mb-4">Resumo do Catálogo</h3>
          <div className="space-y-4">
            {[
              { label: 'Desconto médio no catálogo', value: `${avgDiscount}%`, color: 'text-green-600', bg: 'bg-green-50' },
              { label: 'Produtos com desconto ativo', value: products.filter((p) => p.oldPrice > p.price).length, color: 'text-[#0F52BA]', bg: 'bg-[#EEF3FF]' },
              { label: 'Produtos sem imagem', value: products.filter((p) => !p.image).length, color: 'text-orange-600', bg: 'bg-orange-50' },
              { label: 'Produtos adicionados manualmente', value: products.filter((p) => p.source === 'manual').length, color: 'text-purple-600', bg: 'bg-purple-50' },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{item.label}</span>
                <span className={`text-sm font-black ${item.color} px-2 py-0.5 rounded-lg ${item.bg}`}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-[#F8FAFF] border border-[#E2EBF6] rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#EEF3FF] flex items-center justify-center shrink-0">
            <ArrowUpRight size={16} className="text-[#0F52BA]" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#0D1B2E] mb-1">Analytics avançados em breve</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Relatórios de receita, conversões e histórico de buscas estarão disponíveis após integração com a API de afiliados do AliExpress. Por enquanto, os dados de cliques são rastreados localmente.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

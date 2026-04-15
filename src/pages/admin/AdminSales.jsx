import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { MousePointerClick, TrendingUp, Package, Info, ExternalLink } from 'lucide-react';
import { useProducts } from '../../context/ProductsContext';

function getRealClickData(products) {
  return products
    .map((p) => ({
      id: p.id,
      name: p.name,
      category: p.category,
      clicks: parseInt(localStorage.getItem(`clicks_${p.id}`) || '0'),
      affiliateLink: p.affiliateLink,
    }))
    .filter((p) => p.clicks > 0)
    .sort((a, b) => b.clicks - a.clicks);
}

export default function AdminSales() {
  const { products } = useProducts();
  const totalClicks = parseInt(localStorage.getItem('total_clicks') || '0');
  const clickData = useMemo(() => getRealClickData(products), [products]);

  return (
    <div className="p-6 lg:p-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
        <h1 className="text-2xl font-black text-[#0D1B2E]">Cliques & Afiliados</h1>
        <p className="text-gray-500 text-sm mt-1">Rastreamento real de cliques nos links afiliados</p>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {[
          { icon: MousePointerClick, label: 'Total de Cliques', value: totalClicks.toLocaleString('pt-BR'), color: 'text-[#0F52BA]', bg: 'bg-[#EEF3FF] border-[#0F52BA]/15' },
          { icon: Package, label: 'Produtos com Cliques', value: clickData.length, color: 'text-green-600', bg: 'bg-green-50 border-green-200' },
          { icon: TrendingUp, label: 'Produtos no Catálogo', value: products.length, color: 'text-purple-600', bg: 'bg-purple-50 border-purple-200' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className={`${s.bg} border rounded-2xl p-5`}>
            <s.icon size={18} className={`${s.color} mb-3`} />
            <div className={`text-2xl font-black ${s.color} mb-0.5`}>{s.value}</div>
            <div className="text-xs text-gray-500">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Click Tracking Table */}
      <div className="bg-white rounded-2xl border border-[#E2EBF6] p-5 shadow-sm mb-6">
        <h3 className="text-sm font-bold text-[#0D1B2E] mb-4">Produtos Mais Clicados</h3>
        {clickData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-14 text-center">
            <MousePointerClick size={40} className="text-gray-200 mb-3" />
            <p className="text-sm font-semibold text-gray-400">Nenhum clique registrado ainda</p>
            <p className="text-xs text-gray-300 mt-1">
              Os dados aparecem quando usuários clicam em "Comprar no AliExpress".
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {clickData.map((p, i) => (
              <div key={p.id} className="flex items-center gap-4 p-3 rounded-xl bg-[#F8FAFC] hover:bg-[#F0F6FF] transition-colors">
                <span className="text-xs text-gray-400 w-5 font-bold shrink-0">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-[#0D1B2E] truncate">{p.name}</div>
                  <div className="text-xs text-gray-400 capitalize">{p.category}</div>
                </div>
                <div className="flex items-center gap-1 text-sm font-black text-[#0F52BA] shrink-0">
                  <MousePointerClick size={13} /> {p.clicks}
                </div>
                <div className="w-24 bg-[#E2EBF6] rounded-full h-1.5 shrink-0">
                  <div
                    className="h-full bg-gradient-to-r from-[#0F52BA] to-cyan-400 rounded-full"
                    style={{ width: `${Math.min(100, (p.clicks / (clickData[0]?.clicks || 1)) * 100)}%` }}
                  />
                </div>
                <a href={p.affiliateLink} target="_blank" rel="noopener noreferrer"
                  className="p-1.5 rounded-lg text-gray-400 hover:text-[#0F52BA] hover:bg-[#EEF3FF] transition-colors shrink-0">
                  <ExternalLink size={13} />
                </a>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Info Card */}
      <div className="bg-[#F8FAFF] border border-[#E2EBF6] rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#EEF3FF] flex items-center justify-center shrink-0">
            <Info size={16} className="text-[#0F52BA]" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#0D1B2E] mb-1">Sobre rastreamento de receita</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              O rastreamento de receita e comissões requer integração com a API de Afiliados do AliExpress (Portals). Após cadastrar seu ID de afiliado, comissões serão rastreadas automaticamente pelo painel do AliExpress Partner Center.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

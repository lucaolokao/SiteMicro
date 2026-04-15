import { motion } from 'framer-motion';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar
} from 'recharts';
import { DollarSign, MousePointerClick, TrendingUp, ArrowUpRight } from 'lucide-react';

const dailyData = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  receita: Math.floor(Math.random() * 500) + 100,
  cliques: Math.floor(Math.random() * 1000) + 200,
  comissao: Math.floor(Math.random() * 25) + 5,
}));

const topEarning = [
  { nome: 'ESP32 Dev Board', comissao: 'R$ 127,40', cliques: 4521, taxa: '6.9%', cat: '📡' },
  { nome: 'Arduino Uno R3', comissao: 'R$ 98,60', cliques: 3987, taxa: '7.2%', cat: '🔵' },
  { nome: 'Kit Starter Arduino', comissao: 'R$ 215,30', cliques: 2543, taxa: '5.7%', cat: '📦' },
  { nome: 'OLED 0.96" I2C', comissao: 'R$ 58,20', cliques: 2987, taxa: '6.6%', cat: '📺' },
  { nome: 'DHT22 Sensor', comissao: 'R$ 39,80', cliques: 2765, taxa: '7.1%', cat: '🌡️' },
];

const barWidths = topEarning.map((_, i) => i === 0 ? 100 : Math.floor(Math.random() * 70 + 20));

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white border border-[#E2EBF6] rounded-xl p-3 text-xs shadow-lg">
        <p className="text-gray-400 mb-2">Dia {label}</p>
        {payload.map((p) => (
          <p key={p.name} style={{ color: p.color }}>
            {p.name}: <b>{p.name === 'receita' || p.name === 'comissao' ? `R$ ${p.value}` : p.value}</b>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function AdminSales() {
  const totalReceita = dailyData.reduce((s, d) => s + d.receita, 0);
  const totalComissao = dailyData.reduce((s, d) => s + d.comissao, 0);
  const totalCliques = dailyData.reduce((s, d) => s + d.cliques, 0);

  return (
    <div className="p-6 lg:p-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
        <h1 className="text-2xl font-black text-[#0D1B2E]">Vendas & Lucros</h1>
        <p className="text-gray-500 text-sm mt-1">Analise detalhada de receita e comissoes afiliadas</p>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { icon: DollarSign, label: 'Receita (30 dias)', value: `R$ ${totalReceita.toLocaleString('pt-BR')}`, trend: '+24.5%', color: 'text-green-600', bg: 'bg-green-50 border-green-200' },
          { icon: TrendingUp, label: 'Comissoes (30 dias)', value: `R$ ${totalComissao.toLocaleString('pt-BR')}`, trend: '+18.2%', color: 'text-[#0F52BA]', bg: 'bg-[#EEF3FF] border-[#0F52BA]/15' },
          { icon: MousePointerClick, label: 'Total Cliques', value: totalCliques.toLocaleString('pt-BR'), trend: '+31.7%', color: 'text-[#0F52BA]', bg: 'bg-[#EEF3FF] border-[#0F52BA]/15' },
          { icon: TrendingUp, label: 'Taxa Conversao Media', value: '4.8%', trend: '+0.4%', color: 'text-orange-600', bg: 'bg-orange-50 border-orange-200' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className={`${s.bg} border rounded-2xl p-5`}>
            <div className="flex items-center justify-between mb-3">
              <s.icon size={18} className={s.color} />
              <span className="text-xs font-bold text-green-600 flex items-center gap-1">
                <ArrowUpRight size={11} />{s.trend}
              </span>
            </div>
            <div className={`text-2xl font-black ${s.color} mb-0.5`}>{s.value}</div>
            <div className="text-xs text-gray-500">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-2xl border border-[#E2EBF6] p-5 shadow-sm">
          <h3 className="text-sm font-bold text-[#0D1B2E] mb-1">Receita Diaria (ultimos 30 dias)</h3>
          <p className="text-xs text-gray-400 mb-5">Valores de receita gerada via links afiliados</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2EBF6" />
              <XAxis dataKey="day" tick={{ fill: '#94A3B8', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94A3B8', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="receita" stroke="#10b981" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl border border-[#E2EBF6] p-5 shadow-sm">
          <h3 className="text-sm font-bold text-[#0D1B2E] mb-1">Cliques Diarios</h3>
          <p className="text-xs text-gray-400 mb-5">Total de cliques nos links afiliados</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2EBF6" />
              <XAxis dataKey="day" tick={{ fill: '#94A3B8', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94A3B8', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="cliques" fill="#0F52BA" radius={[2, 2, 0, 0]} opacity={0.8} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Earning Products */}
      <div className="bg-white rounded-2xl border border-[#E2EBF6] p-5 shadow-sm">
        <h3 className="text-sm font-bold text-[#0D1B2E] mb-4">Produtos que mais geraram receita</h3>
        <div className="space-y-3">
          {topEarning.map((p, i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-[#F8FAFC] hover:bg-[#F0F6FF] transition-colors">
              <span className="text-xl w-8 text-center">{p.cat}</span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-[#0D1B2E]">{p.nome}</div>
                <div className="text-xs text-gray-400">{p.cliques.toLocaleString()} cliques • Taxa: {p.taxa}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-black text-green-600">{p.comissao}</div>
                <div className="text-[10px] text-gray-400">comissão</div>
              </div>
              <div className="w-20 bg-[#E2EBF6] rounded-full h-1.5">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"
                  style={{ width: `${barWidths[i]}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

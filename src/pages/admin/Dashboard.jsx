import { motion } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import {
  DollarSign, MousePointerClick, Package, TrendingUp, Bot,
  ArrowUpRight
} from 'lucide-react';

const revenueData = [
  { day: 'Seg', receita: 187, cliques: 432, conversoes: 23 },
  { day: 'Ter', receita: 234, cliques: 521, conversoes: 31 },
  { day: 'Qua', receita: 198, cliques: 389, conversoes: 19 },
  { day: 'Qui', receita: 312, cliques: 674, conversoes: 45 },
  { day: 'Sex', receita: 421, cliques: 912, conversoes: 67 },
  { day: 'Sab', receita: 387, cliques: 834, conversoes: 54 },
  { day: 'Dom', receita: 289, cliques: 623, conversoes: 38 },
];

const monthlyData = [
  { month: 'Jan', receita: 3240 },
  { month: 'Fev', receita: 4120 },
  { month: 'Mar', receita: 3890 },
  { month: 'Abr', receita: 5230 },
  { month: 'Mai', receita: 6150 },
  { month: 'Jun', receita: 5840 },
  { month: 'Jul', receita: 7290 },
  { month: 'Ago', receita: 8120 },
  { month: 'Set', receita: 7630 },
  { month: 'Out', receita: 9450 },
  { month: 'Nov', receita: 11230 },
  { month: 'Dez', receita: 13870 },
];

const categoryRevenue = [
  { name: 'Arduino', value: 28, color: '#3b82f6' },
  { name: 'ESP32', value: 22, color: '#06b6d4' },
  { name: 'Sensores', value: 18, color: '#10b981' },
  { name: 'Displays', value: 12, color: '#8b5cf6' },
  { name: 'Motores', value: 11, color: '#f97316' },
  { name: 'Outros', value: 9, color: '#6b7280' },
];

const topProducts = [
  { name: 'ESP32 Dev Board 38 Pinos', cliques: 4521, conversoes: 312, receita: 'R$ 897,60', categoria: 'ESP32' },
  { name: 'Arduino Uno R3 ATmega328P', cliques: 3987, conversoes: 287, receita: 'R$ 789,40', categoria: 'Arduino' },
  { name: 'Sensor DHT11', cliques: 3654, conversoes: 256, receita: 'R$ 320,00', categoria: 'Sensores' },
  { name: 'OLED 0.96" I2C SSD1306', cliques: 2987, conversoes: 198, receita: 'R$ 465,30', categoria: 'Displays' },
  { name: 'Kit Starter Arduino + 37 Sensores', cliques: 2543, conversoes: 145, receita: 'R$ 1.086,50', categoria: 'Kits' },
];

const recentActivity = [
  { time: '2min', text: 'IA encontrou ESP32-S3 a $3.29 (↓62%)', type: 'ai', icon: '🤖' },
  { time: '5min', text: '43 cliques no "ESP32 Dev Board"', type: 'click', icon: '👆' },
  { time: '8min', text: 'Nova venda: Kit Arduino Starter', type: 'sale', icon: '💰' },
  { time: '12min', text: 'IA atualizou preco do Arduino Nano', type: 'ai', icon: '🤖' },
  { time: '15min', text: '28 novos visitantes na ultima hora', type: 'visitor', icon: '👥' },
  { time: '20min', text: 'Link afiliado gerado: INA226 $1.49', type: 'ai', icon: '🔗' },
];

function StatCard({ icon: Icon, label, value, sub, trend, color = 'blue', index = 0 }) {
  const colors = {
    blue: { bg: 'bg-[#EEF3FF]', border: 'border-[#0F52BA]/15', text: 'text-[#0F52BA]', icon: 'bg-[#E0EAFF]' },
    green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-600', icon: 'bg-green-100' },
    purple: { bg: 'bg-[#EEF3FF]', border: 'border-[#0F52BA]/15', text: 'text-[#0F52BA]', icon: 'bg-[#E0EAFF]' },
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
      <div className="flex items-start justify-between mb-4">
        <div className={`${c.icon} w-10 h-10 rounded-xl flex items-center justify-center`}>
          <Icon size={18} className={c.text} />
        </div>
        {trend && (
          <div className="flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-lg">
            <ArrowUpRight size={12} />
            {trend}
          </div>
        )}
      </div>
      <div className="text-2xl font-black text-[#0D1B2E] mb-0.5">{value}</div>
      <div className="text-sm font-medium text-[#475569]">{label}</div>
      {sub && <div className="text-xs text-gray-400 mt-1">{sub}</div>}
    </motion.div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-[#E2EBF6] rounded-xl p-3 text-xs shadow-lg">
        <p className="text-gray-500 mb-2">{label}</p>
        {payload.map((p) => (
          <p key={p.name} style={{ color: p.color }}>
            {p.name}: <span className="font-bold">
              {p.name === 'receita' ? `R$ ${p.value}` : p.value}
            </span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  return (
    <div className="p-6 lg:p-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
        <h1 className="text-2xl font-black text-[#0D1B2E]">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">
          Visao geral do desempenho — atualizado em tempo real
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={DollarSign} label="Receita Hoje" value="R$ 1.247" sub="↑ vs ontem" trend="+18.5%" color="green" index={0} />
        <StatCard icon={MousePointerClick} label="Cliques Hoje" value="4.892" sub="Em links afiliados" trend="+12.3%" color="blue" index={1} />
        <StatCard icon={Package} label="Produtos Ativos" value="1.100+" sub="Indexados pela IA" trend="+43 hoje" color="blue" index={2} />
        <StatCard icon={TrendingUp} label="Conversao" value="4.8%" sub="Cliques -> Compras" trend="+0.3%" color="orange" index={3} />
      </div>

      {/* Charts Row 1 */}
      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        {/* Weekly Revenue */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E2EBF6] p-5 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm font-bold text-[#0D1B2E]">Receita Semanal</h3>
              <p className="text-xs text-gray-400">Ultimos 7 dias</p>
            </div>
            <div className="text-right">
              <div className="text-lg font-black text-green-600">R$ 2.028</div>
              <div className="text-xs text-gray-400">esta semana</div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0F52BA" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#0F52BA" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2EBF6" />
              <XAxis dataKey="day" tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="receita" stroke="#0F52BA" fill="url(#colorReceita)" strokeWidth={2} dot={{ fill: '#0F52BA', r: 4, strokeWidth: 0 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Category Pie */}
        <div className="bg-white rounded-2xl border border-[#E2EBF6] p-5 shadow-sm">
          <h3 className="text-sm font-bold text-[#0D1B2E] mb-1">Por Categoria</h3>
          <p className="text-xs text-gray-400 mb-4">% da receita total</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={categoryRevenue} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                {categoryRevenue.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => `${v}%`} contentStyle={{ background: '#fff', border: '1px solid #E2EBF6', borderRadius: '12px', fontSize: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {categoryRevenue.map((cat) => (
              <div key={cat.name} className="flex items-center gap-2 text-xs">
                <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: cat.color }} />
                <span className="text-gray-500 flex-1">{cat.name}</span>
                <span className="text-[#0D1B2E] font-semibold">{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Chart */}
      <div className="bg-white rounded-2xl border border-[#E2EBF6] p-5 mb-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-sm font-bold text-[#0D1B2E]">Receita Anual</h3>
            <p className="text-xs text-gray-400">Janeiro - Dezembro 2024</p>
          </div>
          <div className="text-right">
            <div className="text-lg font-black gradient-text">R$ 85.060</div>
            <div className="text-xs text-green-600">+234% vs ano anterior</div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2EBF6" />
            <XAxis dataKey="month" tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="receita" radius={[4, 4, 0, 0]}>
              {monthlyData.map((_, i) => (
                <Cell key={i} fill={`rgba(15,82,186,${0.4 + (i / monthlyData.length) * 0.6})`} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-white rounded-2xl border border-[#E2EBF6] p-5 shadow-sm">
          <h3 className="text-sm font-bold text-[#0D1B2E] mb-4">Top Produtos</h3>
          <div className="space-y-3">
            {topProducts.map((p, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-xs text-gray-400 w-4 font-bold">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-[#0D1B2E] truncate">{p.name}</div>
                  <div className="text-[10px] text-gray-400">{p.cliques} cliques • {p.conversoes} conv.</div>
                </div>
                <div className="text-xs font-bold text-green-600 shrink-0">{p.receita}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white rounded-2xl border border-[#E2EBF6] p-5 shadow-sm">
          <h3 className="text-sm font-bold text-[#0D1B2E] mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Atividade em Tempo Real
          </h3>
          <div className="space-y-3">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-base">{a.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[#475569] leading-relaxed">{a.text}</p>
                </div>
                <span className="text-[10px] text-gray-400 shrink-0">{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

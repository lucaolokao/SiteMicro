import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Zap, Bot, ArrowRight, Search, TrendingDown, Shield, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const stats = [
  { label: 'Produtos', value: '1.100+', icon: '📦' },
  { label: 'Categorias', value: '10', icon: '🏷️' },
  { label: 'Atualização', value: '24/7', icon: '⚡' },
  { label: 'Entrega Global', value: 'AliExpress', icon: '🌍' },
];

export default function Hero() {
  const { searchQuery, setSearch } = useApp();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) navigate(`/produtos?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <section
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{ minHeight: 'calc(100svh - var(--header-h, 64px))', paddingTop: '3rem', paddingBottom: '3rem' }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#EEF3FF] via-white to-[#F0F6FF]">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #0F52BA22 1px, transparent 0)',
            backgroundSize: '36px 36px',
          }}
        />
      </div>
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#0F52BA]/6 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-[#0F52BA]/4 blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EEF3FF] border border-[#0F52BA]/20 text-sm text-[#0F52BA] font-semibold mb-7"
        >
          <Bot size={13} className="animate-pulse" />
          IA buscando os menores preços agora
          <span className="relative flex h-2 w-2 ml-0.5">
            <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-70" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-black leading-[1.06] tracking-tight mb-5 text-[#0D1B2E]"
        >
          A Central de{' '}
          <span className="gradient-text">Componentes</span>
          <br />
          Eletrônicos
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.16 }}
          className="text-base sm:text-lg text-[#475569] max-w-xl mx-auto mb-8 leading-relaxed"
        >
          Arduino, ESP32, Sensores e muito mais —{' '}
          <strong className="text-[#0D1B2E]">sempre o menor preço</strong> via AliExpress com entrega para o mundo todo.
        </motion.p>

        {/* Search */}
        <motion.form
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.22 }}
          onSubmit={handleSearch}
          className="flex items-center gap-2 max-w-lg mx-auto mb-5 bg-white rounded-2xl border-2 border-[#E2EBF6] hover:border-[#0F52BA]/35 focus-within:border-[#0F52BA]/50 transition-colors shadow-md shadow-[#0F52BA]/6 p-1.5"
        >
          <Search size={17} className="text-[#0F52BA] ml-2 shrink-0" />
          <input
            value={searchQuery}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar Arduino, ESP32, Sensor..."
            className="flex-1 text-[15px] text-[#0D1B2E] placeholder-gray-400 outline-none bg-transparent min-w-0"
          />
          <button
            type="submit"
            className="shrink-0 px-4 py-2 bg-[#0F52BA] hover:bg-[#0A3D90] text-white font-bold rounded-xl transition-colors text-sm"
          >
            Buscar
          </button>
        </motion.form>

        {/* Quick search terms */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-gray-400 mb-10"
        >
          {['Arduino', 'ESP32', 'DHT22', 'OLED', 'Servo SG90', 'LoRa', 'Raspberry Pi'].map((term) => (
            <button
              key={term}
              onClick={() => { setSearch(term); navigate(`/produtos?q=${term}`); }}
              className="hover:text-[#0F52BA] transition-colors font-medium"
            >
              {term}
            </button>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.32 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14"
        >
          <Link
            to="/produtos"
            className="group flex items-center gap-2 px-7 py-3.5 bg-[#0F52BA] hover:bg-[#0A3D90] text-white font-bold rounded-2xl transition-colors shadow-lg shadow-[#0F52BA]/30 hover:shadow-[#0F52BA]/45 hover:-translate-y-0.5 text-base btn-glow"
          >
            <Zap size={17} />
            Explorar Produtos
            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            to="/categorias"
            className="flex items-center gap-2 px-7 py-3.5 bg-white hover:bg-[#F0F6FF] border-2 border-[#E2EBF6] hover:border-[#0F52BA]/30 text-[#0D1B2E] font-semibold rounded-2xl transition-all text-base"
          >
            Ver Categorias
          </Link>
        </motion.div>

        {/* Mini stats */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.42 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg mx-auto mb-10"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.07 }}
              className="bg-white rounded-2xl p-3.5 border border-[#E2EBF6] shadow-sm hover:border-[#0F52BA]/20 hover:shadow-md transition-all text-center"
            >
              <div className="text-xl mb-1">{s.icon}</div>
              <div className="text-base font-black text-[#0F52BA]">{s.value}</div>
              <div className="text-[11px] text-gray-500 font-medium">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-5 text-xs text-gray-400"
        >
          {[
            { icon: Shield, text: 'Links Verificados' },
            { icon: TrendingDown, text: 'Menor Preço Garantido' },
            { icon: Truck, text: 'Entrega para o Mundo' },
            { icon: Bot, text: 'IA Ativa 24/7' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-1.5 font-medium">
              <Icon size={13} className="text-[#0F52BA]" />
              {text}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Price ticker */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-[#E2EBF6] bg-white/80 backdrop-blur-sm py-1.5 overflow-hidden pointer-events-none">
        <div className="animate-ticker inline-flex gap-8 whitespace-nowrap">
          {['Arduino Uno R3 → R$17,99', 'ESP32 → R$14,89', 'DHT22 → R$9,99', 'OLED 0.96" → R$7,49', 'HC-SR04 → R$2,49', 'L298N → R$6,49', 'Servo SG90 → R$4,99', 'ESP32-CAM → R$29,99', 'MPU6050 → R$6,49', 'LoRa SX1278 → R$17,49', 'Arduino Uno R3 → R$17,99', 'ESP32 → R$14,89', 'DHT22 → R$9,99', 'OLED 0.96" → R$7,49', 'HC-SR04 → R$2,49'].map((item, i) => (
            <span key={i} className="text-[11px] text-[#475569] font-medium">
              <span className="text-emerald-600 font-bold">↓</span> {item}
              <span className="mx-4 text-gray-200">|</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

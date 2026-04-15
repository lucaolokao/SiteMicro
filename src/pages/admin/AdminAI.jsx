import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Bot, Play, Pause, RefreshCw, Search, Link2, CheckCircle,
  Settings, Zap, Clock, TrendingDown, Globe, Database
} from 'lucide-react';

const keywords = [
  'arduino uno r3', 'esp32 wroom', 'raspberry pi zero', 'sensor dht22', 'oled display 0.96',
  'nema17 stepper motor', 'l298n motor driver', 'hc-sr04 ultrasonic', 'servo sg90 9g',
  'lora sx1278 433mhz', 'bmp280 pressure', 'mpu6050 gyroscope', 'esp8266 nodemcu',
  'tb6600 stepper driver', 'ads1115 adc module', 'ina226 current sensor', 'pcf8574 i2c expander',
];

const recentFinds = [
  { name: 'ESP32-S3 WROOM-1 N16R8', oldPrice: 9.99, newPrice: 3.29, reviews: 1243, saved: '67%', time: '2min' },
  { name: 'INA226 Power Monitor Module', oldPrice: 4.99, newPrice: 1.49, reviews: 876, saved: '70%', time: '5min' },
  { name: 'RTC DS3231 Precision Module', oldPrice: 3.99, newPrice: 1.19, reviews: 2134, saved: '70%', time: '8min' },
  { name: 'MAX7219 8x8 LED Matrix', oldPrice: 5.99, newPrice: 1.89, reviews: 3421, saved: '68%', time: '12min' },
  { name: 'TMP36 Temperature Sensor', oldPrice: 2.49, newPrice: 0.69, reviews: 987, saved: '72%', time: '17min' },
  { name: 'HC-SR501 PIR Motion Sensor', oldPrice: 2.99, newPrice: 0.79, reviews: 5432, saved: '74%', time: '23min' },
];

export default function AdminAI() {
  const [running, setRunning] = useState(true);
  const [currentKeyword, setCurrentKeyword] = useState(0);
  const [progress, setProgress] = useState(47);
  const [logs, setLogs] = useState([
    { time: new Date().toLocaleTimeString('pt-BR'), msg: 'Sistema inicializado', type: 'info' },
    { time: new Date().toLocaleTimeString('pt-BR'), msg: 'Conectado a API AliExpress', type: 'success' },
    { time: new Date().toLocaleTimeString('pt-BR'), msg: 'Buscando: "esp32 wroom"...', type: 'search' },
    { time: new Date().toLocaleTimeString('pt-BR'), msg: '43 resultados encontrados', type: 'info' },
    { time: new Date().toLocaleTimeString('pt-BR'), msg: 'Menor preco: $3.29 (↓67%)', type: 'success' },
    { time: new Date().toLocaleTimeString('pt-BR'), msg: 'Link afiliado gerado', type: 'success' },
    { time: new Date().toLocaleTimeString('pt-BR'), msg: 'Produto publicado no catalogo', type: 'success' },
  ]);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setCurrentKeyword((k) => (k + 1) % keywords.length);
      setProgress((p) => (p >= 95 ? 20 : p + Math.floor(Math.random() * 8) + 2));
      setLogs((prev) => [
        {
          time: new Date().toLocaleTimeString('pt-BR'),
          msg: `Buscando: "${keywords[Math.floor(Math.random() * keywords.length)]}"...`,
          type: 'search',
        },
        ...prev.slice(0, 19),
      ]);
    }, 2500);
    return () => clearInterval(interval);
  }, [running]);

  return (
    <div className="p-6 lg:p-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-[#0D1B2E] flex items-center gap-2">
            <Bot size={24} className="text-[#0F52BA]" />
            Motor IA
          </h1>
          <p className="text-gray-500 text-sm mt-1">MicroAI Engine — Busca automatica de produtos e precos</p>
        </div>
        <button
          onClick={() => setRunning(!running)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
            running
              ? 'bg-red-50 border border-red-200 text-red-600 hover:bg-red-100'
              : 'bg-green-50 border border-green-200 text-green-600 hover:bg-green-100'
          }`}
        >
          {running ? <Pause size={16} /> : <Play size={16} />}
          {running ? 'Pausar IA' : 'Iniciar IA'}
        </button>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        {[
          { icon: Search, label: 'Buscas hoje', value: '2.847', color: 'text-[#0F52BA] bg-[#EEF3FF] border-[#0F52BA]/15' },
          { icon: TrendingDown, label: 'Produtos novos', value: '143', color: 'text-green-600 bg-green-50 border-green-200' },
          { icon: Link2, label: 'Links gerados', value: '143', color: 'text-[#0F52BA] bg-[#EEF3FF] border-[#0F52BA]/15' },
          { icon: Clock, label: 'Uptime', value: '99.9%', color: 'text-cyan-600 bg-cyan-50 border-cyan-200' },
          { icon: Database, label: 'Sellers monit.', value: '5.200+', color: 'text-orange-600 bg-orange-50 border-orange-200' },
          { icon: Globe, label: 'Palavras-chave', value: `${keywords.length}`, color: 'text-pink-600 bg-pink-50 border-pink-200' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
            className={`${s.color} border rounded-2xl p-4 flex items-center gap-3`}>
            <s.icon size={20} />
            <div>
              <div className="text-lg font-black text-[#0D1B2E]">{s.value}</div>
              <div className="text-xs text-gray-500">{s.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Live Status */}
        <div className="bg-white rounded-2xl border border-[#E2EBF6] p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-[#0D1B2E]">Status em Tempo Real</h3>
            <div className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg ${running ? 'bg-green-50 text-green-600 border border-green-200' : 'bg-red-50 text-red-600 border border-red-200'}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${running ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
              {running ? 'Ativo' : 'Pausado'}
            </div>
          </div>

          {running && (
            <div className="mb-4">
              <div className="flex justify-between text-xs text-gray-400 mb-2">
                <span>Buscando: <span className="text-[#0F52BA] font-mono">"{keywords[currentKeyword]}"</span></span>
                <span>{progress}%</span>
              </div>
              <div className="h-1.5 bg-[#E2EBF6] rounded-full overflow-hidden">
                <motion.div
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-gradient-to-r from-[#0F52BA] to-cyan-400 rounded-full"
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            {[
              { icon: Search, label: 'Busca AliExpress', status: running },
              { icon: TrendingDown, label: 'Analise de precos', status: running },
              { icon: CheckCircle, label: 'Verificacao de reviews', status: running },
              { icon: Link2, label: 'Geracao de links', status: running },
              { icon: Database, label: 'Publicacao no catalogo', status: running },
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-3 text-xs">
                <step.icon size={13} className={step.status ? 'text-[#0F52BA]' : 'text-gray-300'} />
                <span className={step.status ? 'text-[#475569]' : 'text-gray-300'}>{step.label}</span>
                {step.status && (
                  <div className="ml-auto flex gap-0.5">
                    {[...Array(3)].map((_, j) => (
                      <div key={j} className="w-0.5 h-3 bg-[#0F52BA] rounded animate-pulse" style={{ animationDelay: `${j * 0.2}s` }} />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Log - keep dark for terminal feel */}
        <div className="bg-[#0D1B2E] rounded-2xl border border-[#1E3A5F] p-5 font-mono">
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
            </div>
            <span className="text-[10px] text-blue-400">microai.log</span>
            <RefreshCw size={11} className={`text-blue-400 ${running ? 'animate-spin' : ''}`} />
          </div>
          <div className="space-y-1.5 max-h-[240px] overflow-y-auto">
            {logs.map((log, i) => (
              <div key={i} className="flex gap-2 text-[10px]">
                <span className="text-blue-900 shrink-0">{log.time}</span>
                <span className={
                  log.type === 'success' ? 'text-green-400' :
                  log.type === 'search' ? 'text-blue-400' :
                  log.type === 'error' ? 'text-red-400' : 'text-blue-300'
                }>
                  {log.type === 'success' ? '✓' : log.type === 'search' ? '→' : log.type === 'error' ? '✗' : '•'} {log.msg}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Finds */}
      <div className="bg-white rounded-2xl border border-[#E2EBF6] p-5 mb-6 shadow-sm">
        <h3 className="text-sm font-bold text-[#0D1B2E] mb-4">Produtos Encontrados Recentemente</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {recentFinds.map((find, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2EBF6] hover:border-green-200 transition-colors">
              <div className="text-xs font-semibold text-[#0D1B2E] mb-2 line-clamp-2">{find.name}</div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-gray-400 line-through">${find.oldPrice}</span>
                <span className="text-green-600 font-black">${find.newPrice}</span>
                <span className="text-green-600 bg-green-50 border border-green-200 px-1.5 py-0.5 rounded font-bold">-{find.saved}</span>
              </div>
              <div className="flex items-center justify-between text-[10px] text-gray-400">
                <span>⭐ {find.reviews.toLocaleString()} reviews</span>
                <span>{find.time} atras</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Config */}
      <div className="bg-white rounded-2xl border border-[#E2EBF6] p-5 shadow-sm">
        <h3 className="text-sm font-bold text-[#0D1B2E] mb-4 flex items-center gap-2">
          <Settings size={16} className="text-gray-400" /> Configuracoes da IA
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { label: 'Intervalo de busca', value: '15 minutos', type: 'select', options: ['5 min', '15 min', '30 min', '1 hora'] },
            { label: 'Desconto minimo para indexar', value: '30%', type: 'select', options: ['10%', '20%', '30%', '40%', '50%'] },
            { label: 'Reviews minimas', value: '100', type: 'number' },
            { label: 'Avaliacao minima', value: '4.0', type: 'number' },
            { label: 'Tag de afiliado', value: 'YOUR_AFFILIATE_ID', type: 'text' },
            { label: 'Max. produtos/categoria', value: '50', type: 'number' },
          ].map((cfg) => (
            <div key={cfg.label}>
              <label className="text-xs font-semibold text-gray-500 block mb-1">{cfg.label}</label>
              {cfg.type === 'select' ? (
                <select defaultValue={cfg.value} className="w-full bg-[#F0F6FF] border border-[#E2EBF6] rounded-lg px-3 py-2 text-sm text-[#0D1B2E] outline-none focus:border-[#0F52BA]/50 transition-colors">
                  {cfg.options.map((o) => <option key={o}>{o}</option>)}
                </select>
              ) : (
                <input type={cfg.type} defaultValue={cfg.value} className="w-full bg-[#F0F6FF] border border-[#E2EBF6] rounded-lg px-3 py-2 text-sm text-[#0D1B2E] outline-none focus:border-[#0F52BA]/50 transition-colors" />
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-3">
          <button className="px-5 py-2.5 bg-[#0F52BA] hover:bg-[#1565C0] text-white text-sm font-semibold rounded-xl transition-colors shadow-md shadow-[#0F52BA]/20">
            Salvar Configuracoes
          </button>
          <button className="px-5 py-2.5 bg-[#F0F6FF] hover:bg-[#EEF3FF] border border-[#E2EBF6] text-[#0D1B2E] text-sm font-semibold rounded-xl transition-colors flex items-center gap-2">
            <Zap size={14} className="text-[#0F52BA]" /> Executar Agora
          </button>
        </div>
      </div>
    </div>
  );
}

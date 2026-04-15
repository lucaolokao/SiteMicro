import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Search, CheckCircle, TrendingDown, RefreshCw, Link2 } from 'lucide-react';

const steps = [
  { icon: Search, label: 'Buscando no AliExpress', detail: 'Analisando 50.000+ produtos...', color: 'text-blue-200' },
  { icon: TrendingDown, label: 'Comparando precos', detail: 'Encontrando o menor preco global', color: 'text-cyan-200' },
  { icon: Link2, label: 'Gerando link afiliado', detail: 'Criando URL de rastreamento', color: 'text-blue-100' },
  { icon: CheckCircle, label: 'Publicando anuncio', detail: 'Produto adicionado ao catalogo!', color: 'text-green-300' },
];

const recentFinds = [
  { name: 'ESP32-S3 WROOM-1', oldPrice: 8.99, newPrice: 3.29, time: '2min' },
  { name: 'INA226 Monitor Corrente', oldPrice: 4.99, newPrice: 1.49, time: '5min' },
  { name: 'RTC DS3231 I2C', oldPrice: 3.99, newPrice: 1.19, time: '8min' },
  { name: 'Matrix LED MAX7219', oldPrice: 5.99, newPrice: 1.89, time: '12min' },
];

export default function AIBanner() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [searchTerm, setSearchTerm] = useState('arduino nano compatible');

  useEffect(() => {
    if (!isRunning) return;
    const terms = ['esp32 devkit', 'arduino uno r3', 'dht22 sensor', 'oled 0.96 i2c', 'servo sg90', 'lora sx1278'];
    const interval = setInterval(() => {
      setCurrentStep((s) => {
        if (s >= steps.length - 1) { setSearchTerm(terms[Math.floor(Math.random() * terms.length)]); return 0; }
        return s + 1;
      });
    }, 1400);
    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F0F6FF]">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl sapphire-section shadow-2xl shadow-[#0F52BA]/30">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-8 p-8 sm:p-12">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 border border-white/20 text-white text-xs font-bold mb-6">
                <Bot size={12} className="animate-pulse" />
                MicroAI Engine v2.0 — Ativo
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 leading-tight">
                Nossa IA encontra os melhores precos <span className="text-cyan-300">para voce</span>
              </h2>
              <p className="text-blue-100 mb-8 leading-relaxed text-sm">
                O MicroAI vasculha o AliExpress 24/7, identificando os menores precos e gerando links de afiliado automaticamente.
              </p>
              <div className="space-y-2.5 mb-8">
                {['Busca automatica por palavras-chave tecnicas', 'Comparacao de precos entre multiplos sellers', 'Verificacao de avaliacoes e reputacao', 'Geracao automatica de links de afiliado', 'Publicacao no catalogo em tempo real'].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-blue-100">
                    <CheckCircle size={14} className="text-green-300 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[{ label: 'Produtos/dia', value: '150+' }, { label: 'Economia media', value: '62%' }, { label: 'Uptime', value: '99.9%' }].map((s) => (
                  <div key={s.label} className="bg-white/10 rounded-2xl p-3 border border-white/10 text-center">
                    <div className="text-xl font-black text-white">{s.value}</div>
                    <div className="text-[10px] text-blue-200 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Console */}
            <div className="flex flex-col gap-4">
              <div className="bg-black/30 backdrop-blur-sm rounded-2xl border border-white/10 p-5 font-mono">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                  </div>
                  <span className="text-[10px] text-blue-300">microai-engine.log</span>
                  <button onClick={() => setIsRunning(!isRunning)}>
                    <RefreshCw size={11} className={`text-blue-300 ${isRunning ? 'animate-spin' : ''}`} />
                  </button>
                </div>
                <div className="text-green-300 text-xs mb-3">
                  <span className="text-blue-400">$</span> microai search <span className="text-yellow-300">"{searchTerm}"</span>
                </div>
                <div className="space-y-3">
                  {steps.map((step, i) => {
                    const Icon = step.icon;
                    const done = i < currentStep;
                    const active = i === currentStep;
                    return (
                      <div key={i} className={`flex items-center gap-2 text-xs transition-opacity ${i > currentStep ? 'opacity-30' : 'opacity-100'}`}>
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${done ? 'bg-green-400/20' : active ? 'bg-white/20' : 'bg-white/5'}`}>
                          {done ? <CheckCircle size={9} className="text-green-300" /> : active ? <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> : <div className="w-1 h-1 rounded-full bg-white/30" />}
                        </div>
                        <span className={done ? 'text-green-300' : active ? 'text-white' : 'text-blue-400/50'}>{step.label}</span>
                        {active && <div className="ml-auto flex gap-0.5">{[...Array(3)].map((_, j) => <div key={j} className="w-0.5 h-3 bg-white/60 rounded animate-pulse" style={{ animationDelay: `${j * 0.15}s` }} />)}</div>}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10 p-4">
                <p className="text-[10px] font-bold text-blue-200 mb-3 uppercase tracking-wider">Achados recentes</p>
                <div className="space-y-2">
                  {recentFinds.map((find, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                      <span className="text-blue-100 font-medium truncate mr-2">{find.name}</span>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-blue-300/60 line-through">${find.oldPrice}</span>
                        <span className="text-green-300 font-black">${find.newPrice}</span>
                        <span className="text-[9px] text-blue-200">{find.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

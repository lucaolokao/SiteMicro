import { Link } from 'react-router-dom';
import { Cpu, Bot, Shield, Truck, Zap, ArrowRight } from 'lucide-react';
import { categories } from '../../data/categories';

const GithubIcon = () => <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>;
const TwitterIcon = () => <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
const InstagramIcon = () => <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>;
const YoutubeIcon = () => <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>;

const footerLinks = {
  Loja: [
    { label: 'Todos os Produtos', to: '/produtos' },
    { label: 'Categorias', to: '/categorias' },
    { label: 'Mais Vendidos', to: '/produtos?sort=bestseller' },
    { label: 'Novidades', to: '/produtos?sort=new' },
    { label: 'Promocoes', to: '/produtos?sort=discount' },
  ],
  Informacoes: [
    { label: 'Sobre Nos', to: '/sobre' },
    { label: 'Como Funciona', to: '/como-funciona' },
    { label: 'Links de Afiliados', to: '/afiliados' },
    { label: 'Politica de Privacidade', to: '/privacidade' },
    { label: 'Termos de Uso', to: '/termos' },
  ],
};

const features = [
  { icon: Bot, label: 'IA Busca Precos', desc: 'Sempre o menor preco' },
  { icon: Zap, label: 'Atualizacao 24/7', desc: 'Precos sempre atuais' },
  { icon: Shield, label: 'Links Seguros', desc: 'AliExpress verificado' },
  { icon: Truck, label: 'Frete Gratis', desc: 'Na maioria dos itens' },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#E2EBF6] mt-20">
      {/* Feature Strip */}
      <div className="bg-[#F0F6FF] border-b border-[#E2EBF6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-[#EEF3FF] border border-[#0F52BA]/15 flex items-center justify-center group-hover:bg-[#0F52BA] transition-colors shrink-0">
                  <Icon size={18} className="text-[#0F52BA] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#0D1B2E]">{label}</div>
                  <div className="text-xs text-gray-500">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[#0F52BA] flex items-center justify-center shadow-md shadow-[#0F52BA]/25">
                <Cpu size={18} className="text-white" />
              </div>
              <span className="text-xl font-black text-[#0D1B2E]">MicroShop</span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed mb-5">
              Central de componentes eletronicos com os menores precos do mercado, alimentada por IA que vasculha o AliExpress 24/7.
            </p>
            <div className="flex items-center gap-2">
              {[
                { icon: GithubIcon, href: '#', label: 'GitHub' },
                { icon: TwitterIcon, href: '#', label: 'Twitter' },
                { icon: InstagramIcon, href: '#', label: 'Instagram' },
                { icon: YoutubeIcon, href: '#', label: 'YouTube' },
              ].map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} aria-label={label}
                  className="w-8 h-8 rounded-lg bg-[#F0F6FF] hover:bg-[#0F52BA] border border-[#E2EBF6] hover:border-[#0F52BA] flex items-center justify-center text-gray-400 hover:text-white transition-all">
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-black text-[#0D1B2E] mb-4 uppercase tracking-widest">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-sm text-gray-500 hover:text-[#0F52BA] transition-colors flex items-center gap-1 group">
                      <ArrowRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <h4 className="text-xs font-black text-[#0D1B2E] mb-4 uppercase tracking-widest">Newsletter</h4>
            <p className="text-sm text-gray-500 mb-4">Receba alertas de promocoes direto no e-mail.</p>
            <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="seu@email.com"
                className="w-full px-4 py-2.5 bg-[#F0F6FF] border border-[#E2EBF6] rounded-xl text-sm text-[#0D1B2E] placeholder-gray-400 outline-none focus:border-[#0F52BA]/50 transition-all" />
              <button type="submit"
                className="w-full py-2.5 bg-[#0F52BA] hover:bg-[#1565C0] text-white text-sm font-bold rounded-xl transition-all shadow-md shadow-[#0F52BA]/20">
                Inscrever-se
              </button>
            </form>
          </div>
        </div>

        {/* Categories */}
        <div className="mt-10 pt-8 border-t border-[#E2EBF6]">
          <p className="text-xs text-gray-400 mb-3 uppercase tracking-wider font-semibold">Categorias populares</p>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Link key={cat.id} to={`/categorias/${cat.id}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F0F6FF] hover:bg-[#EEF3FF] border border-[#E2EBF6] hover:border-[#0F52BA]/25 text-xs text-gray-500 hover:text-[#0F52BA] font-medium transition-all">
                <span>{cat.icon}</span>{cat.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-6 border-t border-[#E2EBF6] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400">© {new Date().getFullYear()} MicroShop. Todos os direitos reservados.</p>
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <Bot size={11} className="text-[#0F52BA]" />
            <span className="text-[#0F52BA] font-semibold">MicroAI</span>
            <span>• Links afiliados AliExpress</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

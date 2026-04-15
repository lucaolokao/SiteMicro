import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Star, ExternalLink, Heart, ShoppingBag, Shield, Truck,
  RefreshCw, Tag, ChevronRight, Share2
} from 'lucide-react';
import { getProductById, getRelatedProducts } from '../data/products';
import { getCategoryById } from '../data/categories';
import { formatCurrency, formatUSD, calcDiscount, formatShortNumber } from '../utils/formatters';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/products/ProductCard';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProductById(id);
  const { wishlist, toggleWishlist, notify } = useApp();

  if (!product) {
    return (
      <main className="min-h-screen bg-[#F8FAFF] flex items-center justify-center" style={{ paddingTop: 'var(--header-h, 64px)' }}>
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-[#0D1B2E] mb-2">Produto não encontrado</h2>
          <Link to="/produtos" className="text-[#0F52BA] hover:text-[#0A3D90] font-semibold">Voltar aos produtos</Link>
        </div>
      </main>
    );
  }

  const category = getCategoryById(product.category);
  const related = getRelatedProducts(product);
  const isWished = wishlist.includes(product.id);
  const discount = calcDiscount(product.price, product.oldPrice);

  const handleBuy = () => {
    window.open(product.affiliateLink, '_blank', 'noopener,noreferrer');
    notify('Abrindo AliExpress com o menor preço', 'success');
  };

  const handleWishlist = () => {
    toggleWishlist(product.id);
    notify(isWished ? 'Removido dos favoritos' : 'Adicionado aos favoritos', isWished ? 'info' : 'success');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    notify('Link copiado!', 'success');
  };

  return (
    <main className="min-h-screen bg-[#F8FAFF] pb-20" style={{ paddingTop: 'var(--header-h, 64px)' }}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-8 flex-wrap">
          <Link to="/" className="hover:text-[#0F52BA] transition-colors">Início</Link>
          <ChevronRight size={11} />
          <Link to="/produtos" className="hover:text-[#0F52BA] transition-colors">Produtos</Link>
          {category && (
            <>
              <ChevronRight size={11} />
              <Link to={`/categorias/${category.id}`} className="hover:text-[#0F52BA] transition-colors">{category.name}</Link>
            </>
          )}
          <ChevronRight size={11} />
          <span className="text-[#475569] truncate max-w-[200px]">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="aspect-square bg-white rounded-3xl border border-[#E2EBF6] shadow-sm overflow-hidden flex items-center justify-center p-8 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#F0F6FF]/50 to-white/50" />
              <img
                src={product.image}
                alt={product.name}
                className="relative w-full h-full object-contain hover:scale-105 transition-transform duration-500"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              {product.badge && (
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-xl shadow-lg">
                  {product.badge}
                </div>
              )}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button onClick={handleWishlist} className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all shadow-sm ${isWished ? 'bg-rose-50 border-rose-200 text-rose-500' : 'bg-white border-[#E2EBF6] text-gray-300 hover:text-rose-500 hover:border-rose-200'}`}>
                  <Heart size={16} fill={isWished ? 'currentColor' : 'none'} />
                </button>
                <button onClick={handleShare} className="w-10 h-10 rounded-xl bg-white border border-[#E2EBF6] text-gray-400 hover:text-[#0F52BA] flex items-center justify-center transition-all shadow-sm">
                  <Share2 size={16} />
                </button>
              </div>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-4">
              {[
                { icon: Shield, label: 'Compra Segura', sub: 'Via AliExpress' },
                { icon: Truck, label: 'Frete Grátis', sub: product.deliveryDays },
                { icon: RefreshCw, label: 'Preço Atualizado', sub: 'Pela nossa IA' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex flex-col items-center text-center p-3 bg-white rounded-2xl border border-[#E2EBF6] shadow-sm">
                  <Icon size={18} className="text-[#0F52BA] mb-1" />
                  <span className="text-xs font-semibold text-[#0D1B2E]">{label}</span>
                  <span className="text-[10px] text-gray-400">{sub}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            {/* Category + Tags */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {category && (
                <Link
                  to={`/categorias/${category.id}`}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#EEF3FF] border border-[#0F52BA]/20 text-[#0F52BA] text-xs font-semibold"
                >
                  <span>{category.icon}</span>{category.name}
                </Link>
              )}
              {product.tags.map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded-lg bg-[#F0F6FF] border border-[#E2EBF6] text-gray-500 text-xs">
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-[#0D1B2E] leading-tight mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-[#0D1B2E]">{product.rating}</span>
              <span className="text-sm text-gray-400">({formatShortNumber(product.reviews)} avaliações)</span>
              <span className="text-sm text-gray-300">•</span>
              <span className="text-sm text-gray-400">{formatShortNumber(product.sold)} vendidos</span>
            </div>

            {/* Price */}
            <div className="p-5 bg-white rounded-2xl border border-[#E2EBF6] mb-6 shadow-sm">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-black text-green-600">{formatCurrency(product.price)}</span>
                <span className="text-lg text-gray-400 line-through">{formatCurrency(product.oldPrice)}</span>
                <span className="px-2.5 py-1 bg-green-50 border border-green-200 text-green-600 text-sm font-bold rounded-lg">
                  -{discount}%
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Tag size={14} className="text-[#0F52BA]" />
                <span>Preço no AliExpress: <span className="text-[#0D1B2E] font-semibold">{formatUSD(product.price)}</span></span>
                <span className="text-gray-200">•</span>
                <span className="text-[#0F52BA] font-semibold">{product.shipping}</span>
              </div>
              <div className="mt-2 text-xs text-gray-400">
                Entrega estimada: {product.deliveryDays}
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-[#475569] leading-relaxed mb-6">{product.description}</p>

            {/* Specs */}
            <div className="mb-6">
              <h3 className="text-xs font-bold text-[#0D1B2E] uppercase tracking-wider mb-3">Especificações</h3>
              <div className="grid grid-cols-2 gap-2">
                {product.specs.map((spec) => (
                  <div key={spec} className="flex items-center gap-2 text-xs text-[#475569] bg-[#F0F6FF] rounded-lg px-3 py-2 border border-[#E2EBF6]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0F52BA] shrink-0" />
                    {spec}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-auto space-y-3">
              <button
                onClick={handleBuy}
                className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold rounded-2xl transition-all shadow-xl shadow-orange-500/20 hover:shadow-orange-500/40 hover:-translate-y-0.5 btn-glow text-lg"
              >
                <ShoppingBag size={20} />
                Comprar no AliExpress
                <ExternalLink size={16} />
              </button>

              <p className="text-center text-xs text-gray-400">
                Link de afiliado — você paga o mesmo preço e nos ajuda a manter o site
              </p>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section>
            <h2 className="text-2xl font-black text-[#0D1B2E] mb-6">
              Produtos <span className="gradient-text">Relacionados</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

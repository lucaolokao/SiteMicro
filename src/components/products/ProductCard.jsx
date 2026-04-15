import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, ExternalLink, Heart, ShoppingBag, TrendingDown } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatCurrency, formatUSD, calcDiscount, formatShortNumber } from '../../utils/formatters';

export default function ProductCard({ product, index = 0 }) {
  const { wishlist, toggleWishlist, notify } = useApp();
  const isWished = wishlist.includes(product.id);
  const discount = calcDiscount(product.price, product.oldPrice);

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    notify(isWished ? 'Removido dos favoritos' : 'Adicionado aos favoritos', isWished ? 'info' : 'success');
  };

  const handleAffiliate = (e) => {
    e.preventDefault();
    window.open(product.affiliateLink, '_blank', 'noopener,noreferrer');
    const key = `clicks_${product.id}`;
    localStorage.setItem(key, String(parseInt(localStorage.getItem(key) || '0') + 1));
    localStorage.setItem('total_clicks', String(parseInt(localStorage.getItem('total_clicks') || '0') + 1));
    notify('Abrindo AliExpress com o menor preço', 'success');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.3) }}
      className="h-full"
    >
      <div className="group flex flex-col h-full bg-white rounded-2xl border border-[#E2EBF6] hover:border-[#0F52BA]/25 shadow-sm hover:shadow-lg hover:shadow-[#0F52BA]/8 transition-all duration-250 hover:-translate-y-1 overflow-hidden">

        {/* Image */}
        <div className="relative bg-[#F8FAFF] overflow-hidden" style={{ aspectRatio: '1/1' }}>
          {/* Badges */}
          <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
            {product.badge && (
              <span className="px-2 py-0.5 bg-[#0F52BA] text-white text-[10px] font-bold rounded-md shadow-sm">
                {product.badge}
              </span>
            )}
            {discount >= 25 && (
              <span className="flex items-center gap-0.5 px-2 py-0.5 bg-emerald-500 text-white text-[10px] font-bold rounded-md shadow-sm">
                <TrendingDown size={9} />-{discount}%
              </span>
            )}
          </div>

          {/* Wishlist */}
          <button
            onClick={handleWishlist}
            className={`absolute top-2 right-2 z-10 w-8 h-8 rounded-xl flex items-center justify-center border transition-all shadow-sm ${
              isWished
                ? 'bg-rose-50 border-rose-200 text-rose-500'
                : 'bg-white/90 border-gray-200 text-gray-300 hover:text-rose-400 hover:border-rose-200'
            }`}
          >
            <Heart size={13} fill={isWished ? 'currentColor' : 'none'} />
          </button>

          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling?.style && (e.target.nextSibling.style.display = 'flex');
            }}
          />
          <div className="hidden absolute inset-0 items-center justify-center text-4xl bg-[#F8FAFF] select-none">📦</div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-3.5">
          {/* Tags */}
          {product.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {product.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded-md bg-[#EEF3FF] text-[#0F52BA] font-semibold leading-none">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Name */}
          <Link to={`/produto/${product.id}`} className="block mb-2">
            <h3 className="text-[13px] font-bold text-[#0D1B2E] hover:text-[#0F52BA] transition-colors leading-snug line-clamp-2">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i} size={10}
                  className={i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}
                />
              ))}
            </div>
            <span className="text-[11px] text-gray-500 leading-none">
              {product.rating} <span className="text-gray-300">({formatShortNumber(product.reviews)})</span>
            </span>
          </div>

          {/* Price + CTA pinned to bottom */}
          <div className="mt-auto space-y-2.5">
            <div>
              <div className="flex items-baseline gap-1.5 mb-0.5">
                <span className="text-xl font-black text-emerald-600 leading-none">{formatCurrency(product.price)}</span>
                {product.oldPrice && (
                  <span className="text-xs text-gray-400 line-through">{formatCurrency(product.oldPrice)}</span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-gray-400">{formatUSD(product.price)} AliExpress</span>
                <span className="text-[10px] text-[#0F52BA] font-semibold">{product.shipping || 'Frete Grátis'}</span>
              </div>
            </div>

            <button
              onClick={handleAffiliate}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl transition-colors shadow-sm shadow-orange-500/20 btn-glow"
            >
              <ShoppingBag size={13} />
              Comprar no AliExpress
              <ExternalLink size={10} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}



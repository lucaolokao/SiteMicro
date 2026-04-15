import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Edit2, Trash2, ExternalLink, Star, X, Check, Package, Bot } from 'lucide-react';
import { useProducts } from '../../context/ProductsContext';
import { categories } from '../../data/categories';
import { formatUSD, calcDiscount } from '../../utils/formatters';

const emptyForm = {
  name: '', category: 'arduino', price: '', oldPrice: '',
  affiliateLink: '', image: '', description: '', badge: '',
  tags: '', rating: '4.5', reviews: '0', sold: '0',
};

function ProductModal({ onClose, onSave, initial = emptyForm }) {
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.affiliateLink) return;
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    onSave(form);
    setSaving(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="w-full max-w-2xl bg-white border border-[#E2EBF6] rounded-3xl shadow-2xl shadow-[#0F52BA]/10 max-h-[90vh] overflow-y-auto"
        >
          <div className="flex items-center justify-between p-6 border-b border-[#E2EBF6]">
            <div>
              <h2 className="text-lg font-black text-[#0D1B2E]">Adicionar Produto</h2>
              <p className="text-xs text-gray-400 mt-0.5">Preencha os dados do produto para publicar no catalogo</p>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-xl bg-[#F0F6FF] hover:bg-[#EEF3FF] border border-[#E2EBF6] flex items-center justify-center text-gray-400 hover:text-[#0D1B2E] transition-all">
              <X size={16} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-gray-500 block mb-1.5">Nome do Produto *</label>
                <input
                  value={form.name} onChange={(e) => set('name', e.target.value)} required
                  placeholder="Ex: ESP32 Dev Board 38 Pinos"
                  className="w-full bg-[#F0F6FF] border border-[#E2EBF6] rounded-xl px-4 py-2.5 text-sm text-[#0D1B2E] placeholder-gray-400 outline-none focus:border-[#0F52BA]/50 transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-1.5">Categoria *</label>
                <select
                  value={form.category} onChange={(e) => set('category', e.target.value)}
                  className="w-full bg-[#F0F6FF] border border-[#E2EBF6] rounded-xl px-4 py-2.5 text-sm text-[#0D1B2E] outline-none focus:border-[#0F52BA]/50 transition-colors"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-1.5">Badge (opcional)</label>
                <input
                  value={form.badge} onChange={(e) => set('badge', e.target.value)}
                  placeholder="Ex: Hot Deal, Destaque"
                  className="w-full bg-[#F0F6FF] border border-[#E2EBF6] rounded-xl px-4 py-2.5 text-sm text-[#0D1B2E] placeholder-gray-400 outline-none focus:border-[#0F52BA]/50 transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-1.5">Preco USD (atual) *</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                  <input
                    type="number" step="0.01" min="0" value={form.price} onChange={(e) => set('price', e.target.value)} required
                    placeholder="3.49"
                    className="w-full bg-[#F0F6FF] border border-[#E2EBF6] rounded-xl pl-8 pr-4 py-2.5 text-sm text-[#0D1B2E] placeholder-gray-400 outline-none focus:border-[#0F52BA]/50 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-1.5">Preco USD (original)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                  <input
                    type="number" step="0.01" min="0" value={form.oldPrice} onChange={(e) => set('oldPrice', e.target.value)}
                    placeholder="9.99"
                    className="w-full bg-[#F0F6FF] border border-[#E2EBF6] rounded-xl pl-8 pr-4 py-2.5 text-sm text-[#0D1B2E] placeholder-gray-400 outline-none focus:border-[#0F52BA]/50 transition-colors"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-gray-500 block mb-1.5">Link de Afiliado AliExpress *</label>
                <input
                  value={form.affiliateLink} onChange={(e) => set('affiliateLink', e.target.value)} required
                  placeholder="https://www.aliexpress.com/item/1234567890.html?aff_id=..."
                  className="w-full bg-[#F0F6FF] border border-[#E2EBF6] rounded-xl px-4 py-2.5 text-sm text-[#0D1B2E] placeholder-gray-400 outline-none focus:border-[#0F52BA]/50 transition-colors"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-gray-500 block mb-1.5">URL da Imagem</label>
                <input
                  value={form.image} onChange={(e) => set('image', e.target.value)}
                  placeholder="https://ae01.alicdn.com/kf/..."
                  className="w-full bg-[#F0F6FF] border border-[#E2EBF6] rounded-xl px-4 py-2.5 text-sm text-[#0D1B2E] placeholder-gray-400 outline-none focus:border-[#0F52BA]/50 transition-colors"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-gray-500 block mb-1.5">Descricao</label>
                <textarea
                  value={form.description} onChange={(e) => set('description', e.target.value)}
                  placeholder="Descreva o produto, especificacoes principais, compatibilidade..."
                  rows={3}
                  className="w-full bg-[#F0F6FF] border border-[#E2EBF6] rounded-xl px-4 py-2.5 text-sm text-[#0D1B2E] placeholder-gray-400 outline-none focus:border-[#0F52BA]/50 transition-colors resize-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-1.5">Tags (separadas por virgula)</label>
                <input
                  value={form.tags} onChange={(e) => set('tags', e.target.value)}
                  placeholder="arduino, microcontrolador, wifi"
                  className="w-full bg-[#F0F6FF] border border-[#E2EBF6] rounded-xl px-4 py-2.5 text-sm text-[#0D1B2E] placeholder-gray-400 outline-none focus:border-[#0F52BA]/50 transition-colors"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-xs font-semibold text-gray-500 block mb-1.5">Avaliacao</label>
                  <input type="number" step="0.1" min="1" max="5" value={form.rating} onChange={(e) => set('rating', e.target.value)}
                    className="w-full bg-[#F0F6FF] border border-[#E2EBF6] rounded-xl px-3 py-2.5 text-sm text-[#0D1B2E] outline-none focus:border-[#0F52BA]/50 transition-colors" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 block mb-1.5">Reviews</label>
                  <input type="number" min="0" value={form.reviews} onChange={(e) => set('reviews', e.target.value)}
                    className="w-full bg-[#F0F6FF] border border-[#E2EBF6] rounded-xl px-3 py-2.5 text-sm text-[#0D1B2E] outline-none focus:border-[#0F52BA]/50 transition-colors" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 block mb-1.5">Vendidos</label>
                  <input type="number" min="0" value={form.sold} onChange={(e) => set('sold', e.target.value)}
                    className="w-full bg-[#F0F6FF] border border-[#E2EBF6] rounded-xl px-3 py-2.5 text-sm text-[#0D1B2E] outline-none focus:border-[#0F52BA]/50 transition-colors" />
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button type="button" onClick={onClose}
                className="flex-1 py-3 bg-[#F0F6FF] hover:bg-[#EEF3FF] border border-[#E2EBF6] text-[#0D1B2E] text-sm font-semibold rounded-xl transition-colors">
                Cancelar
              </button>
              <button type="submit" disabled={saving}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-[#0F52BA] to-blue-500 hover:from-blue-600 hover:to-blue-400 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-[#0F52BA]/25 disabled:opacity-70">
                {saving ? (
                  <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Publicando...</>
                ) : (
                  <><Check size={16} /> Publicar Produto</>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function AdminProducts() {
  const { products, addProduct, deleteProduct } = useProducts();
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const PER_PAGE = 10;

  const filtered = products.filter((p) => {
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = !selectedCat || p.category === selectedCat;
    return matchSearch && matchCat;
  });

  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const totalPages = Math.ceil(filtered.length / PER_PAGE);

  const handleSave = (formData) => {
    addProduct(formData);
  };

  const handleDelete = (id) => {
    deleteProduct(id);
    setDeleteConfirm(null);
  };

  return (
    <div className="p-6 lg:p-8">
      {showModal && <ProductModal onClose={() => setShowModal(false)} onSave={handleSave} />}

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-[#0D1B2E]">Gerenciar Produtos</h1>
          <p className="text-gray-500 text-sm mt-1">{products.length} produtos indexados</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#EEF3FF] border border-[#0F52BA]/15 text-xs text-[#0F52BA] font-semibold">
            <Bot size={12} className="animate-pulse" /> IA Ativa
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#0F52BA] to-blue-500 hover:from-blue-600 hover:to-blue-400 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-[#0F52BA]/20"
          >
            <Plus size={16} /> Adicionar Produto
          </button>
        </div>
      </motion.div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex items-center gap-2 bg-white border border-[#E2EBF6] rounded-xl px-3 py-2.5 flex-1 min-w-[200px] shadow-sm">
          <Search size={15} className="text-[#0F52BA]" />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Buscar produto..."
            className="bg-transparent text-sm text-[#0D1B2E] placeholder-gray-400 outline-none flex-1"
          />
        </div>
        <select
          value={selectedCat}
          onChange={(e) => { setSelectedCat(e.target.value); setPage(1); }}
          className="bg-white border border-[#E2EBF6] rounded-xl px-4 py-2.5 text-sm text-[#0D1B2E] outline-none shadow-sm"
        >
          <option value="">Todas as categorias</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <div className="text-xs text-gray-400 font-medium">{filtered.length} produto(s)</div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#E2EBF6] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E2EBF6] bg-[#F8FAFC]">
                {['Produto', 'Categoria', 'Preco USD', 'Desconto', 'Avaliacao', 'Vendidos', 'Fonte', 'Acoes'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map((product, i) => {
                const cat = categories.find((c) => c.id === product.category);
                const discount = calcDiscount(product.price, product.oldPrice);
                return (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="border-b border-[#F0F6FF] hover:bg-[#F8FAFC] transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#F0F6FF] border border-[#E2EBF6] flex items-center justify-center overflow-hidden shrink-0">
                          {product.image ? (
                            <img src={product.image} alt={product.name} className="w-full h-full object-contain p-1"
                              onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
                          ) : null}
                          <Package size={18} className="text-gray-300" style={{ display: product.image ? 'none' : 'block' }} />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-[#0D1B2E] max-w-[200px] truncate">{product.name}</div>
                          {product.badge && (
                            <span className="text-[10px] px-1.5 py-0.5 bg-orange-50 text-orange-500 border border-orange-200 rounded font-medium">
                              {product.badge}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {cat && (
                        <span className="flex items-center gap-1 text-xs text-[#475569]">
                          <span>{cat.icon}</span> {cat.name}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm font-bold text-green-600">${product.price}</div>
                      {product.oldPrice && <div className="text-[11px] text-gray-400 line-through">${product.oldPrice}</div>}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-bold px-2 py-1 rounded-lg ${discount >= 50 ? 'bg-green-50 text-green-600 border border-green-200' : 'bg-[#EEF3FF] text-[#0F52BA] border border-[#0F52BA]/15'}`}>
                        -{discount}%
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 text-xs text-amber-500">
                        <Star size={11} className="fill-amber-400" /> {product.rating}
                      </div>
                      <div className="text-[10px] text-gray-400">{(product.reviews || 0).toLocaleString()} reviews</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-[#475569]">{(product.sold || 0).toLocaleString()}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                        product.source === 'manual' ? 'bg-orange-50 text-orange-500 border border-orange-200' : 'bg-[#EEF3FF] text-[#0F52BA] border border-[#0F52BA]/15'
                      }`}>
                        {product.source === 'manual' ? 'Manual' : 'IA'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <a href={product.affiliateLink} target="_blank" rel="noopener noreferrer"
                          className="w-7 h-7 rounded-lg bg-[#EEF3FF] hover:bg-[#0F52BA] border border-[#0F52BA]/15 flex items-center justify-center text-[#0F52BA] hover:text-white transition-colors">
                          <ExternalLink size={12} />
                        </a>
                        {deleteConfirm === product.id ? (
                          <>
                            <button onClick={() => handleDelete(product.id)} className="w-7 h-7 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center text-red-500 hover:bg-red-100 transition-colors">
                              <Check size={12} />
                            </button>
                            <button onClick={() => setDeleteConfirm(null)} className="w-7 h-7 rounded-lg bg-[#F0F6FF] border border-[#E2EBF6] flex items-center justify-center text-gray-400 transition-colors">
                              <X size={12} />
                            </button>
                          </>
                        ) : (
                          <button onClick={() => setDeleteConfirm(product.id)} className="w-7 h-7 rounded-lg bg-red-50 hover:bg-red-100 border border-red-200 flex items-center justify-center text-red-400 transition-colors">
                            <Trash2 size={12} />
                          </button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-gray-400 text-sm">
                    Nenhum produto encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-[#E2EBF6] bg-[#F8FAFC]">
            <span className="text-xs text-gray-400">
              Pagina {page} de {totalPages} • {filtered.length} produtos
            </span>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-7 h-7 rounded-lg text-xs font-semibold transition-all ${
                    p === page ? 'bg-[#0F52BA] text-white' : 'text-gray-400 hover:bg-[#F0F6FF]'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

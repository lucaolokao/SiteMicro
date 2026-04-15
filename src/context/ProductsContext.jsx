import { createContext, useContext, useReducer, useEffect } from 'react';
import { products as initialProducts } from '../data/products';

const ProductsContext = createContext(null);

const STORAGE_KEY = 'microshop_products';

function loadFromStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return null;
}

function saveToStorage(products) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch {}
}

function reducer(state, action) {
  let next;
  switch (action.type) {
    case 'ADD':
      next = [action.payload, ...state];
      break;
    case 'UPDATE':
      next = state.map((p) => (p.id === action.payload.id ? action.payload : p));
      break;
    case 'DELETE':
      next = state.filter((p) => p.id !== action.payload);
      break;
    case 'RESET':
      next = initialProducts;
      break;
    default:
      return state;
  }
  saveToStorage(next);
  return next;
}

export function ProductsProvider({ children }) {
  const [products, dispatch] = useReducer(reducer, null, () => {
    const saved = loadFromStorage();
    return saved || initialProducts;
  });

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: `manual-${Date.now()}`,
      rating: parseFloat(product.rating) || 4.5,
      reviews: parseInt(product.reviews) || 0,
      sold: parseInt(product.sold) || 0,
      price: parseFloat(product.price),
      oldPrice: parseFloat(product.oldPrice) || parseFloat(product.price) * 1.5,
      tags: product.tags ? product.tags.split(',').map((t) => t.trim()) : [],
      specs: {},
      shipping: 'Frete Grátis',
      source: 'manual',
    };
    dispatch({ type: 'ADD', payload: newProduct });
    return newProduct;
  };

  const updateProduct = (product) => dispatch({ type: 'UPDATE', payload: product });
  const deleteProduct = (id) => dispatch({ type: 'DELETE', payload: id });
  const resetProducts = () => { localStorage.removeItem(STORAGE_KEY); dispatch({ type: 'RESET' }); };

  return (
    <ProductsContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, resetProducts }}>
      {children}
    </ProductsContext.Provider>
  );
}

export const useProducts = () => {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error('useProducts must be used within ProductsProvider');
  return ctx;
};

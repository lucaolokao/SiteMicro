export const formatCurrency = (value, locale = 'pt-BR', currency = 'BRL') => {
  const brl = value * 5.15; // simula conversão USD -> BRL
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(brl);
};

export const formatUSD = (value) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

export const formatNumber = (n) =>
  new Intl.NumberFormat('pt-BR').format(n);

export const formatPercent = (n) => `${(n * 100).toFixed(1)}%`;

export const formatShortNumber = (n) => {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
};

export const calcDiscount = (price, oldPrice) =>
  Math.round(((oldPrice - price) / oldPrice) * 100);

export const getStars = (rating) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return { full, half, empty: 5 - full - (half ? 1 : 0) };
};

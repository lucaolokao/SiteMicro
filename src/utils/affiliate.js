// When you have your AliExpress Portals affiliate ID, replace the value below.
// Without one, the search URLs still work — they just won't track commissions.
const AFFILIATE_ID = '';
const AFFILIATE_KEY = '';
const TRACKING_ID = 'microshop';

/**
 * Builds a working AliExpress search URL for a given product query.
 * This ALWAYS resolves (no 404) and shows real lowest-price results.
 */
export const buildAffiliateLink = (query, customId = '') => {
  const base = `https://www.aliexpress.com/wholesale?SearchText=${encodeURIComponent(query)}&SortType=price_asc`;
  const params = [];
  if (AFFILIATE_ID) params.push(`aff_id=${AFFILIATE_ID}`);
  if (AFFILIATE_KEY) params.push(`aff_short_key=${AFFILIATE_KEY}`);
  if (TRACKING_ID) params.push(`sk=${TRACKING_ID}`);
  if (customId) params.push(`aff_trace_key=${encodeURIComponent(customId)}`);
  return params.length ? `${base}&${params.join('&')}` : base;
};

/**
 * Builds a search URL from a product name — used on ProductCard click.
 */
export const buildProductSearchLink = (productName) =>
  buildAffiliateLink(productName);

export const buildAliExpressSearchLink = (query) =>
  buildAffiliateLink(query);

export const getCommissionRate = () => 0.04;

export const estimateCommission = (price) => price * getCommissionRate();


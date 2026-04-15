export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');

  const { q } = req.query;
  if (!q || !q.trim()) {
    return res.status(400).json({ error: 'Query obrigatória' });
  }

  const query = q.trim();

  try {
    const searchUrl = `https://www.aliexpress.com/wholesale?SearchText=${encodeURIComponent(query)}&SortType=default`;

    const response = await fetch(searchUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Cache-Control': 'no-cache',
      },
      redirect: 'follow',
    });

    if (!response.ok) {
      return res.status(502).json({ error: `AliExpress retornou ${response.status}` });
    }

    const html = await response.text();

    // AliExpress embeds product data in window.runParams
    const match = html.match(/window\.runParams\s*=\s*(\{[\s\S]+?\});\s*(?:var|let|const|window)/);
    if (!match) {
      return res.status(502).json({ error: 'Não foi possível parsear dados do AliExpress' });
    }

    let runParams;
    try {
      runParams = JSON.parse(match[1]);
    } catch {
      return res.status(502).json({ error: 'JSON inválido' });
    }

    const items = runParams?.mods?.itemList?.content || [];

    if (!items.length) {
      return res.status(404).json({ error: 'Nenhum produto encontrado' });
    }

    // Return first (cheapest/most relevant) product
    const item = items[0];
    const productId = item.productId || item.itemId;

    const imageUrl = item.image?.imgUrl
      ? item.image.imgUrl.startsWith('//')
        ? `https:${item.image.imgUrl}`
        : item.image.imgUrl
      : null;

    const salePrice = parseFloat(item.prices?.salePrice?.minPrice || '0');
    const origPrice = parseFloat(
      item.prices?.originalPrice?.minPrice || item.prices?.salePrice?.maxPrice || '0'
    );

    const result = {
      name: item.title?.displayTitle || item.title?.seoTitle || query,
      price: salePrice,
      oldPrice: origPrice > salePrice ? origPrice : salePrice * 1.8,
      image: imageUrl,
      url: productId
        ? `https://www.aliexpress.com/item/${productId}.html`
        : `https://www.aliexpress.com/wholesale?SearchText=${encodeURIComponent(query)}`,
      rating: parseFloat(item.evaluation?.starRating || '4.5'),
      reviews: parseInt(item.evaluation?.totalValidNum || '0'),
    };

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

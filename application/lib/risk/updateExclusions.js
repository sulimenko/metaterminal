async () => {
  const risk = config.risk || {};
  const sources = Array.isArray(risk.sources) ? risk.sources : [];
  const minSymbols = risk.min?.symbols ?? 20;
  const minIsins = risk.min?.isins ?? 20;
  const key = risk.redis?.key || 'risk:1446f:exclusions';
  const ttlSec = risk.redis?.ttlSec ?? 24 * 60 * 60;
  const timeoutMs = risk.fetch?.timeoutMs ?? 20 * 1000;
  const userAgent = risk.fetch?.userAgent || 'metaterminal-risk/1.0';

  const decodeHtml = (value) =>
    String(value || '')
      .replace(/<[^>]*>/g, ' ')
      .replace(/&nbsp;/gi, ' ')
      .replace(/&amp;/gi, '&')
      .replace(/&quot;/gi, '"')
      .replace(/&#39;/gi, "'")
      .replace(/\s+/g, ' ')
      .trim();

  const extractTableRows = (html) => {
    const rows = html.match(/<tr\b[\s\S]*?<\/tr>/gi) || [];
    const out = [];
    for (const row of rows) {
      const cells = row.match(/<td\b[\s\S]*?<\/td>/gi) || [];
      if (cells.length < 2) continue;
      out.push(cells.map((cell) => decodeHtml(cell)));
    }
    return out;
  };

  const getData = (cells, columns) => {
    const data = { symbol: null, isin: null };
    if (!columns || typeof columns !== 'object') return data;
    for (const key of Object.keys(columns)) {
      data[key] =
        key === 'symbol'
          ? lib.risk.exclusions.normalizeSymbol(cells[columns[key]])
          : lib.risk.exclusions.normalizeIsin(cells[columns[key]]);
    }
    return data;
  };

  const loadSource = async (src) => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    let html = '';

    try {
      const res = await fetch(src.url, {
        signal: controller.signal,
        headers: {
          'user-agent': userAgent,
          accept: 'text/html',
        },
      });

      if (!res.ok) throw new Error(src.name + ' http ' + res.status);
      html = await res.text();
    } finally {
      clearTimeout(timer);
    }

    const rows = extractTableRows(html);
    const symbols = new Set();
    const isins = new Set();

    for (const cells of rows) {
      const { symbol, isin } = getData(cells, src.columns);
      if (symbol || isin) {
        if (symbol) symbols.add(symbol);
        if (isin) isins.add(isin);
        continue;
      }

      for (const cell of cells) {
        const maybeIsin = lib.risk.exclusions.normalizeIsin(cell);
        if (maybeIsin) isins.add(maybeIsin);

        const maybeSymbol = lib.risk.exclusions.normalizeSymbol(cell);
        if (maybeSymbol) symbols.add(maybeSymbol);
      }
    }

    if (symbols.size < minSymbols && isins.size < minIsins) {
      throw new Error(src.name + ' parsed too few rows (symbol=' + symbols.size + ', isin=' + isins.size + ')');
    }

    return { symbols, isins };
  };

  const allSymbols = new Set();
  const allIsins = new Set();
  const sourceNames = [];

  for (const src of sources) {
    const result = await loadSource(src);
    sourceNames.push(src.name);
    for (const t of result.symbols) allSymbols.add(t);
    for (const i of result.isins) allIsins.add(i);
  }

  const payload = {
    updatedAt: new Date().toISOString(),
    sources: sourceNames,
    symbols: Array.from(allSymbols),
    isins: Array.from(allIsins),
    counts: { symbols: allSymbols.size, isins: allIsins.size },
  };

  await db.redis.set(key, JSON.stringify(payload), { EX: ttlSec });

  return payload;
};

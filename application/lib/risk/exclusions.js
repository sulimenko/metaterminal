(() => {
  const normalizeSymbol = (value) => {
    const risk = config.risk || {};
    const exclude = ['TICKER', 'SYMBOL'];
    const max = risk.parsing?.maxSymbolLength ?? 12;
    const normalized = String(value || '')
      .trim()
      .toUpperCase()
      .replace(/\s+/g, ' ');
    if (!normalized) return null;
    if (exclude.includes(normalized)) return null;
    if (normalized.length > max) return null;
    return normalized;
  };

  const normalizeIsin = (value) => {
    const v = String(value || '')
      .toUpperCase()
      .replace(/\s+/g, '');
    return v.length === 12 ? v : null;
  };

  const emptySnapshot = () => ({
    symbols: new Set(),
    isins: new Set(),
    updatedAt: null,
    sources: [],
    counts: { symbols: 0, isins: 0 },
  });

  const buildSnapshot = (payload) => {
    const snapshot = emptySnapshot();
    if (!payload || typeof payload !== 'object') return snapshot;

    // eslint-disable-next-line no-nested-ternary
    const symbols = Array.isArray(payload.symbols) ? payload.symbols : Array.isArray(payload.symbols) ? payload.symbols : [];
    const isins = Array.isArray(payload.isins) ? payload.isins : [];

    for (const item of symbols) {
      const t = normalizeSymbol(item);
      if (t) snapshot.symbols.add(t);
    }

    for (const item of isins) {
      const i = normalizeIsin(item);
      if (i) snapshot.isins.add(i);
    }

    // eslint-disable-next-line no-nested-ternary
    const sources = Array.isArray(payload.sources)
      ? payload.sources
      : typeof payload.sources === 'string'
      ? payload.sources
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

    snapshot.updatedAt = payload.updatedAt || payload.updated_at || null;
    snapshot.sources = sources;
    snapshot.counts = { symbols: snapshot.symbols.size, isins: snapshot.isins.size };

    return snapshot;
  };

  const getSnapshot = async () => {
    const risk = config.risk || {};
    const key = risk.redis?.key || 'risk:1446f:exclusions';

    let raw = null;
    try {
      raw = await db.redis.get(key);
    } catch (error) {
      console.warn('risk exclusions: redis get failed', error?.message || error);
    }

    if (!raw) {
      await lib.risk.updateExclusions();
      raw = await db.redis.get(key);
      if (!raw) return emptySnapshot();
    }

    let payload = null;
    try {
      payload = JSON.parse(raw);
    } catch (error) {
      console.warn('risk exclusions: invalid json payload');
    }

    return buildSnapshot(payload);
  };

  const matches = (snapshot, { symbol, isin } = {}) => {
    if (!snapshot) return false;
    const t = normalizeSymbol(symbol);
    const i = normalizeIsin(isin);

    if (t && snapshot.symbols?.has?.(t)) return true;
    if (i && snapshot.isins?.has?.(i)) return true;
    return false;
  };

  const isExcluded = async ({ symbol, isin } = {}) => {
    const snapshot = await getSnapshot();
    return matches(snapshot, { symbol, isin });
  };

  const getMeta = async () => {
    const snapshot = await getSnapshot();
    return {
      updatedAt: snapshot.updatedAt,
      sources: snapshot.sources,
      counts: snapshot.counts,
    };
  };

  return {
    normalizeSymbol,
    normalizeIsin,
    getSnapshot,
    matches,
    isExcluded,
    getMeta,
  };
})();

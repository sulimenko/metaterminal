(() => {
  const normalizeTicker = (value) => {
    const risk = config.risk || {};
    const exclude = ['TICKER', 'SYMBOL'];
    const max = risk.parsing?.maxTickerLength ?? 12;
    if (exclude.includes(value.toUpperCase()) || value.length > max) return null;
    return (
      String(value || '')
        .trim()
        .toUpperCase() ?? null
    );
  };

  const normalizeIsin = (value) => {
    const v = String(value || '')
      .toUpperCase()
      .replace(/\s+/g, '');
    return v.length === 12 ? v : null;
  };

  const emptySnapshot = () => ({
    tickers: new Set(),
    isins: new Set(),
    updatedAt: null,
    sources: [],
    counts: { tickers: 0, isins: 0 },
  });

  let cache = { expiresAt: 0, snapshot: emptySnapshot() };

  const buildSnapshot = (payload) => {
    const snapshot = emptySnapshot();
    if (!payload || typeof payload !== 'object') return snapshot;

    const tickers = Array.isArray(payload.tickers) ? payload.tickers : [];
    const isins = Array.isArray(payload.isins) ? payload.isins : [];

    for (const item of tickers) {
      const t = normalizeTicker(item);
      if (t) snapshot.tickers.add(t);
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
    snapshot.counts = { tickers: snapshot.tickers.size, isins: snapshot.isins.size };

    return snapshot;
  };

  const getSnapshot = async () => {
    const risk = config.risk || {};
    const ttlMs = risk.cache?.ttlMs || 60 * 1000;
    const key = risk.redis?.key || 'risk:1446f:exclusions';

    const now = Date.now();
    if (cache.expiresAt > now) return cache.snapshot;

    let raw = null;
    try {
      raw = await lib.redis.get(key);
    } catch (error) {
      console.warn('risk exclusions: redis get failed', error?.message || error);
    }

    if (!raw) {
      cache = { expiresAt: now + ttlMs, snapshot: emptySnapshot() };
      return cache.snapshot;
    }

    let payload = null;
    try {
      payload = JSON.parse(raw);
    } catch (error) {
      console.warn('risk exclusions: invalid json payload');
    }

    cache = { expiresAt: now + ttlMs, snapshot: buildSnapshot(payload) };
    return cache.snapshot;
  };

  const matches = (snapshot, { ticker, isin } = {}) => {
    if (!snapshot) return false;
    const t = normalizeTicker(ticker);
    const i = normalizeIsin(isin);

    if (t && snapshot.tickers?.has?.(t)) return true;
    if (i && snapshot.isins?.has?.(i)) return true;
    return false;
  };

  const isExcluded = async ({ ticker, isin } = {}) => {
    const snapshot = await getSnapshot();
    return matches(snapshot, { ticker, isin });
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
    normalizeTicker,
    normalizeIsin,
    getSnapshot,
    matches,
    isExcluded,
    getMeta,
  };
})();

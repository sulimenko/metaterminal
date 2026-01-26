// Build Redis key for a chart payload.
const chartKey = ({ symbol, source, period }) => {
  const prefix = process.env.redis_chart_prefix || 'marketData:chart';
  return `${prefix}:${source}:${symbol}:${period}`;
};

// Ensure chart data has stable shape for consumers.
const normalize = (data) => {
  const result = data && typeof data === 'object' ? data : {};
  if (!Array.isArray(result.full)) result.full = [];
  if (!result.last || typeof result.last !== 'object') result.last = {};
  return result;
};

// Read chart data from Redis; returns empty shape on miss/parse errors.
const get = async ({ symbol, source, period }) => {
  const client = lib.redis?.client;
  if (!client || !client.isOpen) return { full: [], last: {} };
  const key = chartKey({ symbol, source, period });
  const raw = await client.get(key);
  if (!raw) return { full: [], last: {} };
  try {
    return normalize(JSON.parse(raw));
  } catch {
    return { full: [], last: {} };
  }
};

// Write chart data to Redis; no-op if Redis is unavailable.
const set = async ({ symbol, source, period, data }) => {
  const client = lib.redis?.client;
  if (!client || !client.isOpen) return;
  const key = chartKey({ symbol, source, period });
  const payload = JSON.stringify(normalize(data));
  await client.set(key, payload);
  const basePeriod = Number(period);
  const ttlSeconds = Number.isFinite(basePeriod) && basePeriod > 0 ? basePeriod * 2 : 3600;
  await client.expire(key, Math.ceil(ttlSeconds));
};

({ chartKey, get, set });

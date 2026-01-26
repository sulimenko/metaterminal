const chartKey = ({ symbol, source, period }) => {
  const prefix = process.env.redis_chart_prefix || 'marketData:chart';
  return `${prefix}:${source}:${symbol}:${period}`;
};

const normalize = (data) => {
  const result = data && typeof data === 'object' ? data : {};
  if (!Array.isArray(result.full)) result.full = [];
  if (!result.last || typeof result.last !== 'object') result.last = {};
  return result;
};

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

const set = async ({ symbol, source, period, data }) => {
  const client = lib.redis?.client;
  if (!client || !client.isOpen) return;
  const key = chartKey({ symbol, source, period });
  const payload = JSON.stringify(normalize(data));
  await client.set(key, payload);
};

({ chartKey, get, set });

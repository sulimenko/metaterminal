/**
 * Publish chart events into Redis stream for cross-worker sync.
 * Applies optional MAXLEN trimming to avoid unbounded growth.
 * @param {object} params
 * @param {string} params.name - Event name (e.g. chart_history/chart_update).
 * @param {object} params.packet - Event payload to serialize.
 * @returns {Promise<void>}
 */
async ({ name, packet }) => {
  const client = lib.redis?.client;
  if (!client || !client.isOpen) return;

  const stream = process.env.redis_chart_stream || 'marketData:charts';
  const payload = JSON.stringify(packet);
  const ts = Date.now().toString();
  const maxLen = parseInt(process.env.redis_chart_stream_maxlen || '6048000', 10);

  try {
    if (Number.isFinite(maxLen) && maxLen > 0) {
      await client.xAdd(stream, '*', { name, packet: payload, ts }, { MAXLEN: maxLen, APPROX: true });
    } else {
      await client.xAdd(stream, '*', { name, packet: payload, ts });
    }
  } catch (error) {
    if (application.worker.id === 'W1') {
      console.warn('Redis stream publish failed:', error.message);
    }
  }
};

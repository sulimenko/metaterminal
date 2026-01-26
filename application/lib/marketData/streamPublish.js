async ({ name, packet }) => {
  const client = lib.redis?.client;
  if (!client || !client.isOpen) return;

  const stream = process.env.redis_chart_stream || 'marketData:charts';
  const payload = JSON.stringify(packet);
  const ts = Date.now().toString();

  try {
    await client.xAdd(stream, '*', { name, packet: payload, ts });
  } catch (error) {
    if (application.worker.id === 'W1') {
      console.warn('Redis stream publish failed:', error.message);
    }
  }
};

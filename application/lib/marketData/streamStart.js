async () => {
  let client = lib.redis?.client;
  for (let i = 0; i < 60; i++) {
    if (client && client.isOpen) break;
    await lib.utils.wait(1000);
    client = lib.redis?.client;
  }
  if (!client || !client.isOpen) return;

  const stream = process.env.redis_chart_stream || 'marketData:charts';
  const group = process.env.redis_chart_group || 'marketDataCharts';
  const consumer = `worker-${application.worker.id}`;

  try {
    await client.xGroupCreate(stream, group, '0', { MKSTREAM: true });
  } catch (error) {
    if (!error?.message?.includes('BUSYGROUP')) throw error;
  }

  const reader = client.duplicate();
  await reader.connect();

  const loop = async () => {
    while (true) {
      try {
        const res = await reader.xReadGroup(group, consumer, [{ key: stream, id: '>' }], { BLOCK: 5000, COUNT: 100 });

        if (!res) continue;
        for (const { messages } of res) {
          for (const msg of messages) {
            const { name, packet } = msg.message;
            if (!name || !packet) {
              await reader.xAck(stream, group, msg.id);
              continue;
            }
            try {
              const parsed = JSON.parse(packet);
              parsed.__fromStream = true;
              lib.marketData.callback(name, parsed);
            } catch (err) {
              console.warn('Redis stream parse failed:', err.message);
            }
            await reader.xAck(stream, group, msg.id);
          }
        }
      } catch (err) {
        const msg = err?.message || String(err);
        if (msg.includes('NOGROUP')) {
          try {
            await reader.xGroupCreate(stream, group, '0', { MKSTREAM: true });
          } catch (createErr) {
            if (!createErr?.message?.includes('BUSYGROUP')) {
              console.warn('Redis stream group recreate failed:', createErr.message);
            }
          }
        } else {
          console.warn('Redis stream read failed:', msg);
        }
        await lib.utils.wait(1000);
      }
    }
  };

  loop();
};

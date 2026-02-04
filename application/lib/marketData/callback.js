/* eslint-disable no-case-declarations */
(name, packet) => {
  // console.info('result: ', packet);
  if (name === 'error') {
    lib.marketData.processingError({ error: packet });
  } else if (['session', 'series', 'symbol', 'quote'].includes(name)) {
    if (name === 'session') console.warn(name, packet);
  } else {
    if ((name === 'chart_history' || name === 'chart_update') && !packet.__fromStream) {
      lib.marketData.streamPublish({ name, packet });
    }
    // packet = JSON.parse(packet);
    const [source, symbol] = packet.symbol.split(':');
    packet.symbol = symbol;
    packet.source = source;
    let chart = null;
    switch (name) {
      case 'chart_history': {
        const noSubscribe = packet.__fromStream || !domain.marketData.tvClient.client;
        chart = domain.marketData.charts.getChart({
          instrument: { symbol, source },
          period: packet.period,
          noSubscribe,
        });
        // console.warn('chart_history: ', source, symbol, packet.period, packet.chart.length); // packet.chart);
        const update = async () => {
          try {
            const data = await lib.marketData.redisChart.get({ symbol, source, period: packet.period });
            const chartLength = packet.chart.length;
            if (chartLength === 1) {
              data.full.push({ ...data.last });
              data.last = { ...packet.chart[0] };
            } else if (chartLength > 1) {
              data.full = [];
              data.last = { ...packet.chart[chartLength - 1] };
              for (const bar of packet.chart.slice(0, -1)) {
                data.full.push({ ...bar });
              }
            }
            await lib.marketData.redisChart.set({ symbol, source, period: packet.period, data });
          } catch (err) {
            console.warn('Redis chart update failed:', err.message);
          }
        };
        void update();
        break;
      }
      case 'chart_update': {
        const noSubscribe = packet.__fromStream || !domain.marketData.tvClient.client;
        chart = domain.marketData.charts.getChart({
          instrument: { symbol, source },
          period: packet.period,
          noSubscribe,
        });
        // console.warn('chart_update: ', source, symbol, packet.period, packet.chart.length, packet); // packet.chart);
        for (const userId of chart.signers) {
          domain.clients.terminal
            .getClient({ userId })
            .emit('marketData/chart_update', { chart: { last: packet.chart[0] }, symbol, userId });
        }
        const update = async () => {
          try {
            const data = await lib.marketData.redisChart.get({ symbol, source, period: packet.period });
            data.last = packet.chart[0];
            await lib.marketData.redisChart.set({ symbol, source, period: packet.period, data });
          } catch (err) {
            console.warn('Redis chart update failed:', err.message);
          }
        };
        void update();
        break;
      }
      case 'levelI':
        domain.marketData.quotes.addQuote({ instrument: { symbol }, quote: packet });
        break;
      case 'data':
        domain.marketData.data.addData({ instrument: { symbol }, data: packet });
        break;
      default:
        console.error({ errorPacket: packet });
    }
    chart = null;
  }
};

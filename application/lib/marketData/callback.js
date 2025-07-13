/* eslint-disable no-case-declarations */
(name, packet) => {
  // console.info('result: ', packet);
  if (name === 'error') {
    lib.marketData.processingError({ error: packet });
  } else if (['session', 'series', 'symbol', 'quote'].includes(name)) {
    if (name === 'session') console.warn(name, packet);
    // if (name === 'series') console.warn(name, packet);
    // if (name === 'symbol') console.warn(name, packet);
    // if (name === 'quote') console.warn(name, packet);
  } else {
    // packet = JSON.parse(packet);
    const [source, symbol] = packet.symbol.split(':');
    packet.symbol = symbol;
    packet.source = source;
    // console.info('chart data packet :', source, symbol, name, packet);
    let chart = null;
    let quote = null;
    let data = null;
    switch (name) {
      case 'chart_history':
        chart = domain.marketData.charts.getChart({ instrument: { symbol, source }, period: packet.period });
        // console.warn('chart_history: ', source, symbol, packet.period, packet.chart.length); // packet.chart);
        const chartLength = packet.chart.length;
        if (chartLength === 1) {
          // console.info('chartLength1 === 1: ', chartLength);
          // console.table(chart.data);
          chart.data.full.push({ ...chart.data.last });
          chart.data.last = { ...packet.chart[0] };
          // console.info('chartLength2 === 1: ', chartLength);
          // console.table(chart.data);
        } else if (chartLength > 1) {
          // console.info('chartLength1 >1: ', chartLength);
          // console.table('chart :', chart.data);
          chart.data.full = [];
          chart.data.last = { ...packet.chart.pop() };
          for (const bar of packet.chart) {
            chart.data.full.push({ ...bar });
          }
          // console.info('chartLength2 > 1: ', chartLength);
          // console.table(chart.data);
        }
        break;
      case 'chart_update':
        chart = domain.marketData.charts.getChart({ instrument: { symbol, source }, period: packet.period });
        // console.warn('chart_update: ', source, symbol, packet.period, packet.chart.length, packet); // packet.chart);
        for (const userId of chart.signers) {
          domain.clients.terminal
            .getClient({ userId })
            .emit('marketData/chart_update', { chart: { last: packet.chart[0] }, symbol, userId });
        }
        chart.data.last = packet.chart[0];
        // console.info('chart_update: ', packet.chart, chart.data.last);
        break;
      case 'levelI':
        quote = domain.marketData.quotes.getQuote({ instrument: { symbol } });
        // console.info(packet, quote.data, quote);
        Object.keys(packet).forEach((key) => (quote.data[key] = packet[key]));
        for (const userId of quote.signers) {
          // console.info(userId);
          let client = domain.clients.terminal.getClient({ userId });
          if (client) client.emit('marketData/quote', quote.data);
          client = null;
        }
        domain.marketData.quotes.values.set(symbol, quote);
        break;
      case 'data':
        data = domain.marketData.data.getData({ symbol });
        Object.keys(packet).forEach((key) => (data.data[key] = packet[key]));
        domain.marketData.data.values.set(symbol, data);
        break;
      default:
        console.error({ errorPacket: packet });
    }
    chart = null;
    quote = null;
    data = null;
  }
};

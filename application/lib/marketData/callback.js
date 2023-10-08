/* eslint-disable no-unused-vars */
/* eslint-disable no-case-declarations */
(name, packet) => {
  // console.info('result: ', packet);
  const [source, symbol] = packet.symbol.split(':');
  packet.symbol = symbol;
  packet.source = source;
  // console.log(source, symbol, packet);
  let chart = null;
  let quote = null;
  let data = null;
  switch (name) {
    case 'chart_history':
      chart = domain.marketData.charts.getChart({ instrument: { symbol, source }, period: packet.period });
      for (const userId of chart.full) {
        domain.marketData.clients.getClient({ userId }).emit('marketData/chart_history', [packet.chart, symbol, userId]);
        chart.full.delete(userId);
      }
      domain.marketData.charts.setChart({ data: chart });
      break;
    case 'chart_update':
      chart = domain.marketData.charts.getChart({ instrument: { symbol, source }, period: packet.period });
      for (const userId of chart.signers) {
        domain.marketData.clients.getClient({ userId }).emit('marketData/chart_update', [packet.chart, symbol, userId]);
      }
      break;
    case 'levelI':
      quote = domain.marketData.quotes.getQuote({ symbol });
      for (const userId of quote.signers) {
        domain.marketData.clients.getClient({ userId }).emit('marketData/quote', quote.data);
      }
      Object.keys(packet).forEach((key) => (quote.data[key] = packet[key]));
      domain.marketData.quotes.values.set(symbol, quote);
      break;
    case 'data':
      data = domain.marketData.data.getData({ symbol });
      Object.keys(packet).forEach((key) => (data.data[key] = packet[key]));
      domain.marketData.data.values.set(symbol, data);
      break;
    case 'error':
      lib.marketData.processingError({ error: packet });
      break;
    default:
      console.log({ errorPacket: packet });
  }
};

/* eslint-disable camelcase */
/* eslint-disable no-case-declarations */
(name, packet) => {
  // console.info('result: ', packet);
  if (name === 'error') {
    lib.marketData.processingError({ error: packet });
  } else if (['session', 'series', 'symbol', 'quote'].includes(name)) {
    if (name === 'session') console.warn(name, packet);
  } else {
    // packet = JSON.parse(packet);
    const [source, symbol] = packet.symbol.split(':');
    packet.symbol = symbol;
    packet.source = source;
    let chart = null;
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
          // api.example.redisSet({
          //   key: ['chart', source, symbol, packet.period].join(':'),
          //   value: JSON.stringify({ full: chart.data.full, last: chart.data.last }),
          // });
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
        const { bid, ask, bid_size, ask_size } = packet;
        if (parseFloat(bid) > 0 && parseFloat(ask) > 0) {
          domain.marketData.quotes.getQuote({ instrument: { symbol } }).then((quote) => {
            const book = {};
            if (Object.keys(quote.book).length > 0) {
              for (const each of Object.keys(quote.book)) book[each] = { price: each, type: 'delete', size: 0 };
            }
            book[ask.toString()] = { price: parseFloat(ask), type: 'ask', size: ask_size };
            book[bid.toString()] = { price: parseFloat(bid), type: 'bid', size: bid_size };
            for (const key of Object.keys(book)) quote.addBook(book[key]);
          });
        }
        break;
      case 'data':
        domain.marketData.quotes.getQuote({ instrument: { symbol, source } }).then((quote) => quote.addData(packet));
        // domain.marketData.quote.addData({ instrument: { symbol, source }, data: packet });
        break;
      default:
        console.error({ errorPacket: packet });
    }
    chart = null;
  }
};

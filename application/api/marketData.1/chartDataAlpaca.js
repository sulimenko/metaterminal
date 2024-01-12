/* eslint-disable camelcase */
({
  access: 'public',
  // eslint-disable-next-line no-unused-vars
  method: async ({ symbol, start, end, period = '1d', currency = 'USD', limit = 1500 }) => {
    console.log('getApiChartData: ', symbol, start, end, period, limit);
    const alpaca = domain.clients.alpaca.getClient({ key: 'main' });
    const timeframe = alpaca.newTimeframe(1, alpaca.timeframeUnit.HOUR); // timeframe: alpaca.newTimeframe(15, alpaca.timeframeUnit.MIN),

    const bars = alpaca.getBarsV2(symbol, {
      start,
      end,
      timeframe,
      limit,
    });

    // console.log('getExternalData: ', bars);
    const arr = [];
    for await (const bar of bars) {
      // console.log(symbol + '1H' + bar.Timestamp);
      // console.log(bar);
      arr.push({
        close: bar.ClosePrice,
        high: bar.HighPrice,
        low: bar.LowPrice,
        open: bar.OpenPrice,
        timestamp: new Date(bar.Timestamp).getTime(),
        turnover: bar.TradeCount,
        volume: bar.Volume,
      });
    }
    return arr;
  },
});

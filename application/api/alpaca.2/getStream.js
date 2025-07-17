({
  // access: 'public',
  // // eslint-disable-next-line no-unused-vars
  // method: async ({ symbol, account }) => {
  //   console.info('getStream: ', symbol, account, context.client);
  //   const clients = domain.marketData.bus.getRoom(account);
  //   clients.add(context.client);
  //   context.client.on('close', () => {
  //     clients.delete(context.client);
  //   });
  // eslint-disable-next-line no-unused-vars
  // const main = domain.marketData.client.get({ key: 'main' });
  // main.data_stream_v2.subscribeForQuotes([symbol]);
  // main.data_stream_v2.subscribeForBars([symbol]);
  // main.data_stream_v2.subscribeForTrades([symbol]);
  // main.data_stream_v2.subscribeForStatuses(['*']);
  // main.data_stream_v2.onStockTrade((trades) => {
  //   console.info('onStockTrade: ', trades);
  //   domain.marketData.bus.send(account, trades);
  // });
  // main.data_stream_v2.onStockQuote((quotes) => console.info('onStockQuote: ', quotes));
  // main.data_stream_v2.onStockBar((bars) => console.info('onStockBar: ', bars));
  // const arr = [];
  // for await (const bar of bars) {
  //   // console.info(symbol + '1H' + bar.Timestamp);
  //   // console.info(bar);
  //   arr.push({
  //     close: bar.ClosePrice,
  //     high: bar.HighPrice,
  //     low: bar.LowPrice,
  //     open: bar.OpenPrice,
  //     timestamp: new Date(bar.Timestamp).getTime(),
  //     turnover: bar.TradeCount,
  //     volume: bar.Volume,
  //   });
  // }
  // return 'ok';
  // },
});

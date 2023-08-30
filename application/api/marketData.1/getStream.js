({
  // access: 'public',
  // // eslint-disable-next-line no-unused-vars
  // method: async ({ symbol, account }) => {
  //   console.log('getStream: ', symbol, account, context.client);
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
  //   console.log('onStockTrade: ', trades);
  //   domain.marketData.bus.send(account, trades);
  // });
  // main.data_stream_v2.onStockQuote((quotes) => console.log('onStockQuote: ', quotes));
  // main.data_stream_v2.onStockBar((bars) => console.log('onStockBar: ', bars));
  // const arr = [];
  // for await (const bar of bars) {
  //   // console.log(symbol + '1H' + bar.Timestamp);
  //   // console.log(bar);
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

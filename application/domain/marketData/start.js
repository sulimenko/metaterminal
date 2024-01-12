async () => {
  if (application.worker.id !== 'W2') return;
  // for (const type of ['paper', 'main']) {
  //   domain.clients.alpaca.setClient({ key: type });
  // }
  const status = await domain.marketData.tvClient.connect();

  // const main = domain.marketData.client.get({ key: 'main' });

  // main.data_stream_v2.onConnect(() => console.log('onConnect', 'Connected'));
  // main.data_stream_v2.onError((err) => console.log('err:', err));
  // main.data_stream_v2.onStatuses((s) => console.log('onStatuses', s));
  // main.data_stream_v2.onStateChange((state) => console.log('onStateChange', state));
  // main.data_stream_v2.onDisconnect(() => console.log('Disconnected'));

  // main.data_stream_v2.subscribeForTrades(['AAPL']);
  // main.data_stream_v2.unsubscribeFromTrades((trades) => console.log('unsubscribeFromTrades: ', trades));
  // main.data_stream_v2.onStockTrade((trades) => console.log('onStockTrade: ', trades));

  // main.data_stream_v2.subscribeForQuotes(['FB']);
  // main.data_stream_v2.unsubscribeFromQuotes((quotes) => console.log('unsubscribeFromQuotes: ', quotes));
  // main.data_stream_v2.onStockQuote((quotes) => console.log('onStockQuote: ', quotes));

  // main.data_stream_v2.subscribeForBars(['SPY']);
  // main.data_stream_v2.unsubscribeFromBars((bars) => console.log('unsubscribeFromBars: ', bars));
  // main.data_stream_v2.onStockBar((bars) => console.log('onStockBar: ', bars));

  // main.data_stream_v2.subscribeForUpdatedBars((updatedBars) => console.log('subscribeForUpdatedBars: ', updatedBars));
  // main.data_stream_v2.unsubscribeFromUpdatedBars((updatedBars) => console.log('unsubscribeFromUpdatedBars: ', updatedBars));
  // main.data_stream_v2.onStockUpdatedBar((updatedBars) => console.log('onStockUpdatedBar: ', updatedBars));

  // main.data_stream_v2.subscribeForDailyBars((dailyBars) => console.log('subscribeForDailyBars: ', dailyBars));
  // main.data_stream_v2.unsubscribeFromDailyBars((dailyBars) => console.log('unsubscribeFromDailyBars: ', dailyBars));
  // main.data_stream_v2.onStockDailyBar((dailyBars) => console.log('onStockDailyBar: ', dailyBars));

  // main.data_stream_v2.subscribeForLulds((lulds) => console.log('subscribeForLulds: ', lulds));
  // main.data_stream_v2.unsubscribeFromLulds((lulds) => console.log('unsubscribeFromLulds: ', lulds));
  // main.data_stream_v2.onLulds((lulds) => console.log('onLulds: ', lulds));

  // main.data_stream_v2.subscribe((symbols) => console.log('subscribe: ', symbols));
  // main.data_stream_v2.unsubscribe((symbols) => console.log('unsubscribe: ', symbols));

  // main.data_stream_v2.connect();

  // console.debug('Connect to alpaca');
  console.debug('Connect to tv: ' + JSON.stringify(status));
};

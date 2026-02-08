async () => {
  if (application.worker.id !== 'W1') return;
  // for (const type of ['paper', 'main']) {
  //   domain.clients.alpaca.setClient({ key: type });
  // }
  const status = await domain.marketData.tvClient.connect();

  // const main = domain.marketData.client.get({ key: 'main' });

  // main.data_stream_v2.onConnect(() => console.info('onConnect', 'Connected'));
  // main.data_stream_v2.onError((err) => console.info('err:', err));
  // main.data_stream_v2.onStatuses((s) => console.info('onStatuses', s));
  // main.data_stream_v2.onStateChange((state) => console.info('onStateChange', state));
  // main.data_stream_v2.onDisconnect(() => console.info('Disconnected'));

  // main.data_stream_v2.subscribeForTrades(['AAPL']);
  // main.data_stream_v2.unsubscribeFromTrades((trades) => console.info('unsubscribeFromTrades: ', trades));
  // main.data_stream_v2.onStockTrade((trades) => console.info('onStockTrade: ', trades));

  // main.data_stream_v2.subscribeForQuotes(['FB']);
  // main.data_stream_v2.unsubscribeFromQuotes((quotes) => console.info('unsubscribeFromQuotes: ', quotes));
  // main.data_stream_v2.onStockQuote((quotes) => console.info('onStockQuote: ', quotes));

  // main.data_stream_v2.subscribeForBars(['SPY']);
  // main.data_stream_v2.unsubscribeFromBars((bars) => console.info('unsubscribeFromBars: ', bars));
  // main.data_stream_v2.onStockBar((bars) => console.info('onStockBar: ', bars));

  // main.data_stream_v2.subscribeForUpdatedBars((updatedBars) => console.info('subscribeForUpdatedBars: ', updatedBars));
  // main.data_stream_v2.unsubscribeFromUpdatedBars((updatedBars) => console.info('unsubscribeFromUpdatedBars: ', updatedBars));
  // main.data_stream_v2.onStockUpdatedBar((updatedBars) => console.info('onStockUpdatedBar: ', updatedBars));

  // main.data_stream_v2.subscribeForDailyBars((dailyBars) => console.info('subscribeForDailyBars: ', dailyBars));
  // main.data_stream_v2.unsubscribeFromDailyBars((dailyBars) => console.info('unsubscribeFromDailyBars: ', dailyBars));
  // main.data_stream_v2.onStockDailyBar((dailyBars) => console.info('onStockDailyBar: ', dailyBars));

  // main.data_stream_v2.subscribeForLulds((lulds) => console.info('subscribeForLulds: ', lulds));
  // main.data_stream_v2.unsubscribeFromLulds((lulds) => console.info('unsubscribeFromLulds: ', lulds));
  // main.data_stream_v2.onLulds((lulds) => console.info('onLulds: ', lulds));

  // main.data_stream_v2.subscribe((symbols) => console.info('subscribe: ', symbols));
  // main.data_stream_v2.unsubscribe((symbols) => console.info('unsubscribe: ', symbols));

  // main.data_stream_v2.connect();

  // console.debug('Connect to alpaca');
  console.debug('Connect to tv: ' + JSON.stringify(status));

  // Вотчдог: переподключаемся, если нет событий уже 10 минут

  // Здесь инициализируем lastChartTs
  if (!domain.marketData.lastChartTs) domain.marketData.lastChartTs = Date.now();

  // А тут определяем функцию, которая будет раз в 60 секунд проверять что как
  // Интервал в 60 секунд в конце
  if (!domain.marketData._chartWatchdog) {
    domain.marketData._chartWatchdog = setInterval(async () => {
      const idleMs = Date.now() - (domain.marketData.lastChartTs || 0);

      // Здесь задаётся 10-минутный интервал
      if (idleMs < 10 * 60 * 1000) {
        return;
      }

      // Ай-яй-яй, случилось нечто нехорошее, нет событий
      console.warn(`TV chart watchdog: no events for ${Math.floor(idleMs / 1000)}s, reconnecting`);

      try {
        await domain.marketData.tvClient.close();
      } catch (err) {
        console.warn('TV watchdog close failed:', err?.message || err);
      }

      try {
        const st = await domain.marketData.tvClient.connect();
        console.warn('TV watchdog reconnect status:', st);
      } catch (err) {
        console.error('TV watchdog reconnect failed:', err?.message || err);
      }
    }, 60 * 1000);
  }
};

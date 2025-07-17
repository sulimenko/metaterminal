/* eslint-disable no-unused-vars */
({
  access: 'public',
  method: async () => {
    console.info('quotes: ', domain.marketData.quotes.values);
    console.info('data: ', domain.marketData.data.values);
    console.info('charts: ', domain.marketData.charts.values);
    console.info('errors: ', domain.marketData.error.values);
    console.info('clients: ', domain.clients.terminal.values);
    // console.info('lib getAll: ', domain.marketData.tvClient.client);
    // console.info('lib getAll: ', domain.marketData.tvClient.client.getAll());
    return 'ok';
  },
});

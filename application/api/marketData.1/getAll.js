/* eslint-disable no-unused-vars */
({
  access: 'private',
  method: async () => {
    console.log('quotes: ', domain.marketData.quotes.values);
    console.log('data: ', domain.marketData.data.values);
    console.log('charts: ', domain.marketData.charts.values);
    console.log('clients: ', domain.marketData.clients.values);
    console.log('lib getAll: ', domain.marketData.tvClient.client.getAll());
    return 'ok';
  },
});

/* eslint-disable no-unused-vars */
({
  access: 'public',
  method: async function () {
    lib.log.info({ params: arguments[0] });
    console.info('quotes: ', domain.marketData.quotes.values);
    console.info('data: ', domain.marketData.data.values);
    // console.info('charts: ', domain.marketData.charts.values);
    // console.info('errors: ', domain.marketData.error.values);
    // console.info('clients: ', domain.clients.terminal.values);
    // console.info('lib getAll: ', domain.marketData.tvClient.client);
    // console.info('lib getAll: ', domain.marketData.tvClient.client.getAll());
    return {
      quotes: domain.marketData.quotes.values,
      data: domain.marketData.data.values,
      // charts: domain.marketData.charts.values,
      // errors: domain.marketData.error.values,
      // clients: domain.clients.terminal.values,
    };
  },
});

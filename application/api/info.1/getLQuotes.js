/* eslint-disable no-unused-vars */
({
  access: 'public',
  method: async () => {
    console.warn('lib quotes: ', domain.marketData.tvClient.client.getQuotes());
    return 'ok';
  },
});

/* eslint-disable no-unused-vars */
({
  access: 'public',
  method: async () => {
    console.warn('lib charts: ', domain.marketData.tvClient.client.getCharts());
    return 'ok';
  },
});

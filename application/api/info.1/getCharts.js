/* eslint-disable no-unused-vars */
({
  access: 'public',
  method: async () => {
    console.warn('charts: ', domain.marketData.charts.values);
    return 'ok';
  },
});

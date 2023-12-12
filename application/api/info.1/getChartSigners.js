/* eslint-disable no-unused-vars */
({
  access: 'public',
  method: async ({ userId }) => {
    console.warn(domain.marketData.charts.getChartSigner({ userId }));
    return 'OK';
  },
});

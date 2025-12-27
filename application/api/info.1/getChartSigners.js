/* eslint-disable no-unused-vars */
({
  access: 'public',
  method: async function ({ userId }) {
    lib.log.info({ params: arguments[0] });
    console.warn(domain.marketData.charts.getChartSigner({ userId }));
    return 'OK';
  },
});

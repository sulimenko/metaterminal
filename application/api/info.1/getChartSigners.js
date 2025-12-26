/* eslint-disable no-unused-vars */
({
  access: 'public',
  method: async function ({ userId }) {
    lib.log.info({ args: Array.from(arguments) });
    console.warn(domain.marketData.charts.getChartSigner({ userId }));
    return 'OK';
  },
});

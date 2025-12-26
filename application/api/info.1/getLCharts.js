/* eslint-disable no-unused-vars */
({
  access: 'public',
  method: async function () {
    lib.log.info({ args: Array.from(arguments) });
    const charts = domain.marketData.tvClient.client.getCharts();
    console.warn(charts);
    return charts;
  },
});

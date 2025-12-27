/* eslint-disable no-unused-vars */
({
  access: 'public',
  method: async function () {
    lib.log.info({ params: arguments[0] });
    const charts = domain.marketData.tvClient.client.getCharts();
    console.warn(charts);
    return charts;
  },
});

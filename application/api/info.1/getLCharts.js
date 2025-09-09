/* eslint-disable no-unused-vars */
({
  access: 'public',
  method: async () => {
    const charts = domain.marketData.tvClient.client.getCharts();
    console.warn(charts);
    return charts;
  },
});

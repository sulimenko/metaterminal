/* eslint-disable no-unused-vars */
({
  access: 'public',
  method: async () => {
    console.warn(domain.marketData.tvClient.client.getCharts().charts);
    // for (const value of domain.marketData.tvClient.client.getCharts().charts.values()) {
    //   console.warn(value);
    // }
    return 'OK';
  },
});

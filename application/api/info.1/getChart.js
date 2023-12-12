/* eslint-disable no-unused-vars */
({
  access: 'public',
  method: async ({ instrument, period }) => {
    const chart = domain.marketData.charts.getChart({ instrument, period });
    console.warn(chart);
    console.warn(chart.data);
    return 'OK';
  },
});

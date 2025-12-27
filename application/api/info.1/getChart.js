({
  access: 'public',
  method: async function ({ instrument, period }) {
    lib.log.info({ params: arguments[0] });
    const chart = domain.marketData.charts.getChart({ instrument, period });
    console.warn(chart);
    console.warn(chart.data);
    return 'OK';
  },
});

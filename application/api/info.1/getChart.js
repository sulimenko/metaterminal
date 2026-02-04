({
  access: 'public',
  method: async ({ instrument, period }) => {
    const chart = domain.marketData.charts.getChart({ instrument, period });
    const data = await lib.marketData.redisChart.get({
      symbol: chart.symbol,
      source: chart.source,
      period: chart.period,
    });
    return { instrument: { symbol: chart.symbol, source: chart.source, period: chart.period }, chart: data };
  },
});

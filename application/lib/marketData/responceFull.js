async (chart, end) => {
  const waitChart = async (result, chart, end, period = 200) => {
    while (new Date().getTime() <= end) {
      const data = await lib.marketData.redisChart.get({
        symbol: chart.symbol,
        source: chart.source,
        period: chart.period,
      });
      if (data.full.length > 0) {
        result.chart = data;
        return result;
      }
      // console.info('responceFull', chart.symbol, new Date().getTime(), end, data);
      await lib.utils.wait(period);
    }
    return result;
  };

  const result = {
    chart: { full: [], last: {} },
    instrument: {
      symbol: chart.symbol,
      period: chart.period,
      source: chart.source,
    },
  };

  return waitChart(result, chart, end);
};

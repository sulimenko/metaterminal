async (chart, end) => {
  const waitChart = async (result, chart, end, period = 200) => {
    while (new Date().getTime() <= end) {
      if (chart.data.full.length > 0) {
        result.chart = JSON.parse(JSON.stringify(chart.data));
        return result;
      }
      // console.log('responceFull', chart.symbol, new Date().getTime(), end, chart.data);
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
      symbolId: chart.symbolId,
    },
  };

  return waitChart(result, chart, end);
};

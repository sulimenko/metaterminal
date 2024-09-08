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

  const result = { chart: { full: [], last: {} }, symbol: chart.symbol };
  return waitChart(result, chart, end);
};

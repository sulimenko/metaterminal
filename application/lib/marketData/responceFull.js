async (chart, end) => {
  const waitChart = async (result, chart, end, interval = 200) => {
    while (new Date().getTime() <= end) {
      if (chart.data.full.length > 0) {
        result.chart = JSON.parse(JSON.stringify(chart.data));
        return result;
      }
      // console.log('responceFull', chart.symbol, new Date().getTime(), end, chart.data);
      await lib.utils.wait(interval);
    }
    return result;
  };

  const result = { chart: [], symbol: chart.symbol };
  return waitChart(result, chart, end);
};

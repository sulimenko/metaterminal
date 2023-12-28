// eslint-disable-next-line consistent-return
async (userId, chart, interval = 200) => {
  // console.warn(userId, interval, timeout, chart.data.full.length, chart);
  const result = { chart: [], symbol: chart.symbol, user: userId };
  if (chart.data.full.length > 0) {
    if (userId) chart.signers.add(userId);
    result.chart = chart.data;
    return result;
  }
  await lib.utils.wait(interval);
  return lib.marketData.responceFull(userId, chart);

  // todo: старая версия, пока оставим
  // return new Promise((resolve, reject) => {
  //   const result = { chart: [], symbol: chart.symbol, user: userId };
  //   const startTime = Date.now();

  //   function hasData() {
  //     // console.warn('wait: ', chart);
  //     if (chart.data.full.length > 0) {
  //       chart.signers.add(userId);
  //       result.chart = chart.data;
  //       // console.warn('result: ', chart);
  //       resolve(result);
  //     } else if (Date.now() - startTime > timeout) {
  //       reject(result);
  //     } else {
  //       setTimeout(hasData, interval);
  //     }
  //   }
  //   hasData();
  // });
};

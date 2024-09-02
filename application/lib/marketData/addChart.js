async ({ instruments, userId, period = 3600, limit = 1000, wait = 5000 }) => {
  const unsupported = instruments.filter((instrument) => ['OPT', 'FUT'].includes(instrument.asset_category));
  if (unsupported.length > 0) {
    return unsupported.map((instrument) => 'Error. Unsupported: chart: ' + instrument.symbol + ', period: ' + period);
  }

  lib.marketData.existChart({ userId });

  const results = await Promise.all(
    instruments.map(async (instrument) => {
      const newSub = domain.marketData.charts.getChart({ instrument, period, limit });
      if (userId) newSub.signers.add(userId);

      const chart = await lib.marketData.responceFull(newSub, new Date().getTime() + wait);
      if (userId === undefined) domain.marketData.charts.deleteChart({ instrument, period });
      return chart;
    }),
  );

  // console.log(results);

  return results.reduce((acc, result, index) => {
    acc[instruments[index].symbol] = result;
    return acc;
  }, {});

  // const newSub = domain.marketData.charts.getChart({ instrument, period, limit });
  // if (userId) newSub.signers.add(userId);

  // return new Promise((resolve) => {
  //   lib.marketData.responceFull(newSub, new Date().getTime() + wait).then((chart) => {
  //     data[instrument.symbol] = chart;
  //     if (userId === undefined) domain.marketData.charts.deleteChart({ instrument, period });
  //     console.log(data[instrument.symbol]);
  //     if (Object.keys(data).length === instruments.length) resolve(data);
  //   });
  // });
  // }
  // return data;
};

async ({ instruments, userId, period = 3600, limit = 1000, wait = 5000 }) => {
  const unsupported = instruments.filter((instrument) => ['FUT'].includes(instrument.asset_category));
  if (unsupported.length > 0) {
    return unsupported.map((instrument) => 'Error. Unsupported: chart: ' + instrument.symbol + ', period: ' + period);
  }

  lib.marketData.existChart({ userId });
  lib.marketData.existQuote({ userId });

  const results = await Promise.all(
    instruments.map(async (instrument) => {
      const newSub = domain.marketData.charts.getChart({ instrument, period, limit });
      const quote = domain.marketData.quotes.getQuote({ instrument });
      if (userId) {
        newSub.signers.add(userId);
        quote.signers.add(userId);
      }

      const chart = await lib.marketData.responceFull(newSub, new Date().getTime() + wait);
      if (userId === undefined) domain.marketData.charts.deleteChart({ instrument, period });
      return chart;
    }),
  );

  return results.reduce((acc, result, index) => {
    if (result.chart.full.length === 0) {
      console.error('result chart empty: ', result);
      return acc;
    }
    acc[instruments[index].symbol] = result;
    return acc;
  }, {});
};

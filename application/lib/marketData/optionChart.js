async ({ instrument, period, limit }) => {
  console.warn(instrument, period, limit);
  const path = 'marketdata/barcharts';
  const data = { symbol: lib.utils.makeOptSymbol(instrument.symbol), period, limit: 100 };

  // todo: only Get, update to stream
  const response = await lib.ts.sendPost({ path, data });
  if (response === 'error') return { error: true, text: 'error sendPost' };
  if (response.result === undefined || response.result.Bars === undefined || response.result.Bars.length === 0) {
    return { error: true, text: 'No data for this period' };
  }

  response.result.Bars.sort((a, b) => a.Epoch - b.Epoch);
  const chart = domain.marketData.charts.getChart({ instrument, period });
  chart.data.last = lib.utils.makeTsBar(response.result.Bars.pop());
  chart.data.full = [];
  for (const bar of response.result.Bars) {
    chart.data.full.push(lib.utils.makeTsBar(bar));
  }

  return { error: false };
};

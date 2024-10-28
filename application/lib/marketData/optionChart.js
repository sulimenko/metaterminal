async ({ instrument, period, limit }) => {
  console.warn(instrument, period, limit);
  const method = 'marketdata/charts';
  const data = { instruments: [instrument], period, limit };

  const instruments = await lib.ptfin.sendPost({ method, data });

  let chart = null;
  for (const instrument of instruments) {
    chart = domain.marketData.charts.getChart({ instrument, period });
    chart.data.full = [];
    chart.data.last = { ...instrument.chart.pop() };
    for (const bar of instrument.chart) {
      chart.data.full.push({ ...bar });
    }
  }

  return ['ok'];
};

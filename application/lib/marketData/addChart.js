async ({ instrument, userId, period = 3600, limit = 1000, wait = 3000 }) => {
  if (['OPT', 'FUT'].includes(instrument.asset_category)) return 'Error. Unsupported: chart: ' + instrument.symbol + ', period: ' + period;

  lib.marketData.existChart({ userId });

  const newSub = domain.marketData.charts.getChart({ instrument, period, limit });
  if (userId) newSub.signers.add(userId);

  const data = await lib.marketData.responceFull(newSub, new Date().getTime() + wait);
  if (userId === undefined) domain.marketData.charts.deleteChart({ instrument, period });
  return data;
};

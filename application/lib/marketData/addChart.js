async ({ instrument, userId, period = 3600, limit = 1000 }) => {
  const existSub = domain.marketData.charts.getChartSigner({ userId });
  const newSub = domain.marketData.charts.getChart({ instrument, period });
  // console.log('exist', period, typeof period, existSub, newSub);

  if (['OPT', 'FUT'].includes(instrument.asset_category)) return 'Error. Unsupported: chart: ' + instrument.symbol + ', period: ' + period;

  // console.error('addChart subscription: ', existSub);

  if (existSub === null) {
    // console.warn('chartData.signers null: ', instrument);
    domain.marketData.tvClient.client.addChartSymbol({ symbol: instrument.source + ':' + instrument.symbol, period, limit });
  } else if (existSub.symbol !== instrument.symbol) {
    if (existSub.signers.size === 1) {
      // console.warn('existSub.signers ===1: ', existSub, instrument);
      const last = { symbol: existSub.source + ':' + existSub.symbol, period: existSub.period };
      domain.marketData.tvClient.client.updateChartSymbol({ symbol: instrument.source + ':' + instrument.symbol, period, limit, last });
      existSub.signers.delete(userId);
      existSub.data.full = [];
    } else if (existSub.signers.size > 1) {
      // console.warn('existSub.signers >1: ', existSub, instrument);
      domain.marketData.tvClient.client.addChartSymbol({ symbol: instrument.source + ':' + instrument.symbol, period, limit });
      existSub.signers.delete(userId);
    }
  }

  return lib.marketData.responceFull(userId, newSub);
};

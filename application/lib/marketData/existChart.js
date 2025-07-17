({ userId }) => {
  const existSub = domain.marketData.charts.getChartSigner({ userId });
  // console.info(existSub);
  if (existSub) {
    if (existSub.signers.size === 1) {
      console.warn('existSub.signers ===1: ', existSub.source, existSub.symbol);
      domain.marketData.charts.deleteChart({ instrument: { symbol: existSub.symbol, source: existSub.source }, period: existSub.period });
    } else if (existSub.signers.size > 1) {
      console.warn('existSub.signers >1: ', existSub.source, existSub.symbol);
      existSub.signers.delete(userId);
    }
  }
};

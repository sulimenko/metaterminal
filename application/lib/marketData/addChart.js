/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
async ({ instrument, userId, period = '3600', limit = 1000 }) => {
  const subscription = domain.marketData.charts.getChartSigner({ userId, period });
  const chartData = domain.marketData.charts.getChart({ instrument, period });
  console.log('exist', subscription, chartData);

  // console.warn(instrument);
  if (!['OPT', 'FUT'].includes(instrument.asset_category)) {
    if (subscription === null) {
      domain.marketData.tvClient.client.addChartSymbol({ symbol: instrument.source + ':' + instrument.symbol, period, limit });
    } else if (subscription.signers.size === 1) {
      domain.marketData.tvClient.client.updateChartSymbol({
        symbol: instrument.source + ':' + instrument.symbol,
        period,
        limit,
        exist: { symbol: subscription.source + ':' + subscription.symbol, period: subscription.period },
      });
      subscription.signers.delete(userId);
    } else if (subscription.signers.size > 1) {
      domain.marketData.tvClient.client.addChartSymbol({ symbol: instrument.source + ':' + instrument.symbol, period, limit });
      subscription.signers.delete(userId);
    }

    chartData.full.add(userId);
    chartData.signers.add(userId);
  }
  // // if (data.chart[period.toString()] === undefined) data.chart[period.toString()] = {};
  // domain.marketData.source.symbols.set(symbol, data);
  // domain.marketData.source.clients.set(userId, client);

  // // console.log('addChart', domain.marketData.source.getSymbol({ symbol }));

  return 'add chart: ' + instrument.symbol + ', period: ' + period;
};

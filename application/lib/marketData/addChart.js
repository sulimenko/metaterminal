/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
async ({ symbol, userId, period = '86400', limit = 100 }) => {
  // console.log(account, symbol, client);
  const exist = domain.marketData.charts.getChartSigner({ userId, period });
  const chartData = domain.marketData.charts.getChart({ symbol, period });
  // console.log('exist', exist, chartData);

  if (exist === null) {
    domain.marketData.tvClient.client.addChartSymbol({ symbol, period, limit });
  } else if (exist.signers.size === 1) {
    domain.marketData.tvClient.client.updateChartSymbol({ symbol, period, limit, exist: { symbol: exist.symbol, period: exist.period } });
    exist.signers.delete(userId);
  } else if (exist.signers.size > 1) {
    domain.marketData.tvClient.client.addChartSymbol({ symbol, period, limit });
    exist.signers.delete(userId);
  }

  chartData.full.add(userId);
  chartData.signers.add(userId);

  // // if (data.chart[period.toString()] === undefined) data.chart[period.toString()] = {};
  // domain.marketData.source.symbols.set(symbol, data);
  // domain.marketData.source.clients.set(userId, client);

  // // console.log('addChart', domain.marketData.source.getSymbol({ symbol }));

  return 'add chart: ' + symbol + ', period: ' + period;
};

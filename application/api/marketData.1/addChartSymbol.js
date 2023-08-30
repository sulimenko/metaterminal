({
  access: 'private',
  method: async ({ symbol, userId, period, limit }) => {
    // console.log('addChartSymbol: ', symbol, period, limit);
    return lib.marketData.addChart({ symbol, userId, period, limit, client: context.client });
  },
});

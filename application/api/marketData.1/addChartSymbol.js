({
  access: 'private',
  method: async ({ symbol, period, limit }) => {
    // console.log('addChartSymbol: ', symbol, period, limit);
    return lib.marketData.addChart({ symbol, userId: context.client.session.state.user_id, period, limit });
  },
});

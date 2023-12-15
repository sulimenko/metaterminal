({
  access: 'private',
  method: async ({ instrument, period, limit }) => {
    // console.log('addChartSymbol: ', instrument, period, limit);
    return lib.marketData.addChart({ instrument, userId: context.client.session.state.user_id, period, limit });
    // return { chart: { full: [], last: {} } };
  },
});

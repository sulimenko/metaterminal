/* eslint-disable no-unused-vars */
({
  access: 'private',
  method: async ({ symbols }) => {
    // console.log(symbols);
    // const tv = await lib.tradingView.realtimeQuote({ account, symbols, client: context.client });
    const result = await lib.marketData.addQuote({ userId: context.client.session.state.user_id, symbols });
    return result;
  },
});

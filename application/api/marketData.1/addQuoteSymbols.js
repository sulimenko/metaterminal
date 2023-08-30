/* eslint-disable no-unused-vars */
({
  access: 'private',
  method: async ({ userId, symbols }) => {
    // const tv = await lib.tradingView.realtimeQuote({ account, symbols, client: context.client });
    const result = await lib.marketData.addQuote({ userId, symbols, client: context.client });
    return result;
  },
});

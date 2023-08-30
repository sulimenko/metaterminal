/* eslint-disable no-unused-vars */
({
  access: 'private',
  method: async ({ account, symbol }) => {
    const result = await lib.marketData.deleteQuote({ account, symbol });
    return result;
  },
});

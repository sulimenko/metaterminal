/* eslint-disable no-unused-vars */
({
  access: 'private',
  method: async ({ account, symbol }) => {
    return lib.marketData.deleteQuote({ account, symbol });
  },
});

/* eslint-disable no-unused-vars */
({
  access: 'private',
  method: async function ({ account, symbol }) {
    lib.log.info({ params: arguments[0] });
    return lib.marketData.deleteQuote({ account, symbol });
  },
});

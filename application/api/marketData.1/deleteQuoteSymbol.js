/* eslint-disable no-unused-vars */
({
  access: 'private',
  method: async function ({ account, symbol }) {
    lib.log.info({ args: Array.from(arguments) });
    return lib.marketData.deleteQuote({ account, symbol });
  },
});

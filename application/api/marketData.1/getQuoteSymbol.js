({
  access: 'private',
  method: function ({ symbol }) {
    lib.log.info({ args: Array.from(arguments) });
    return lib.marketData.getQuote({ symbol });
  },
});

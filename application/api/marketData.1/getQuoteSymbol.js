({
  access: 'private',
  method: function ({ symbol }) {
    lib.log.info({ params: arguments[0] });
    return lib.marketData.getQuote({ symbol });
  },
});

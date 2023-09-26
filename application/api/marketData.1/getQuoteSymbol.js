({
  access: 'private',
  method: ({ symbol }) => {
    return lib.marketData.getQuote({ symbol });
  },
});

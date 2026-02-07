({
  access: 'private',
  method: async ({ symbol }) => {
    const quote = await lib.marketData.getQuote({ symbol });
    return quote;
  },
});

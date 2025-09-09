({
  access: 'public',
  method: async ({ symbols }) => {
    const data = {};
    for (const symbol of symbols) {
      data[symbol] = await domain.marketData.data.getData({ instrument: { symbol } }).data;
      data[symbol].levelI = await domain.marketData.quotes.getQuote({ instrument: { symbol } }).data;
    }
    return data;
  },
});

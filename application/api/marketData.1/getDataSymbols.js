({
  access: 'public',
  method: async ({ instruments }) => {
    const data = {};
    for (const symbol in instruments) {
      const quote = await domain.marketData.quotes.getQuote({ instrument: instruments[symbol] });
      data[symbol] = quote.value;
      // data[symbol].levelI = await domain.marketData.quotes.getQuote({ instrument: { symbol } }).data;
    }
    return data;
  },
});

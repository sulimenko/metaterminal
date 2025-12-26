({
  access: 'public',
  method: async function ({ symbols }) {
    lib.log.info({ args: Array.from(arguments) });
    const data = {};
    for (const symbol of symbols) {
      data[symbol] = await domain.marketData.data.getData({ instrument: { symbol } }).data;
      data[symbol].levelI = await domain.marketData.quotes.getQuote({ instrument: { symbol } }).data;
    }
    return data;
  },
});

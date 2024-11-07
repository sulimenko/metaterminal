async ({ symbol }) => {
  return domain.marketData.quotes.getQuote({ instrument: { symbol } }).data;
};

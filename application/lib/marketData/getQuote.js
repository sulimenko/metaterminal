async ({ symbol }) => {
  return domain.marketData.quotes.getQuote({ symbol }).data;
};

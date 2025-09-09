/* eslint-disable no-unused-vars */
({
  access: 'public',
  method: async () => {
    const quotes = domain.marketData.quotes.values;
    console.warn('quotes: ', quotes);
    return quotes;
  },
});

/* eslint-disable no-unused-vars */
({
  access: 'public',
  method: async function () {
    lib.log.info({ params: arguments[0] });
    const quotes = domain.marketData.quotes.values;
    console.warn('quotes: ', quotes);
    return quotes;
  },
});

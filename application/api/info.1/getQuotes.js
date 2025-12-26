/* eslint-disable no-unused-vars */
({
  access: 'public',
  method: async function () {
    lib.log.info({ args: Array.from(arguments) });
    const quotes = domain.marketData.quotes.values;
    console.warn('quotes: ', quotes);
    return quotes;
  },
});

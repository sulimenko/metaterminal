/* eslint-disable no-unused-vars */
({
  access: 'public',
  method: async () => {
    console.warn('quotes: ', domain.marketData.quotes.values);
    return 'ok';
  },
});

/* eslint-disable no-unused-vars */
({
  access: 'public',
  method: async () => {
    console.warn('quotes: ', domain.marketData.clients.values);
    return 'ok';
  },
});

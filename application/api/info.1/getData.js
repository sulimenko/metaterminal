/* eslint-disable no-unused-vars */
({
  access: 'public',
  method: async ({ symbol }) => {
    if (symbol) {
      console.warn('getData' + symbol + ': ', domain.marketData.data.getData({ symbol }));
    } else {
      console.warn('getData all: ', JSON.parse(domain.marketData.data.values));
    }
    return 'ok';
  },
});

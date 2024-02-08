/* eslint-disable no-unused-vars */
({
  access: 'public',
  method: async ({ symbol }) => {
    if (symbol) {
      console.warn('data: ', domain.marketData.data.getData({ symbol }));
    } else {
      console.warn('data: ', domain.marketData.data.values);
    }
    return 'ok';
  },
});

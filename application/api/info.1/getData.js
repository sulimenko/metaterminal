/* eslint-disable no-unused-vars */
({
  access: 'public',
  method: async () => {
    console.warn('data: ', domain.marketData.data.values);
    return 'ok';
  },
});

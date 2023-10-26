/* eslint-disable no-unused-vars */
({
  access: 'public',
  method: async () => {
    console.warn('lib resolved: ', domain.marketData.tvClient.client.getResolved());
    return 'ok';
  },
});

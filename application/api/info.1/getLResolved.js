/* eslint-disable no-unused-vars */
({
  access: 'public',
  method: async function () {
    lib.log.info({ params: arguments[0] });
    console.warn('lib resolved: ', domain.marketData.tvClient.client.getResolved());
    return 'ok';
  },
});

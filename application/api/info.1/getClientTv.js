/* eslint-disable no-unused-vars */
({
  access: 'public',
  method: async function () {
    lib.log.info({ params: arguments[0] });
    console.warn('tvClient: ', domain.marketData.tvClient.client);
    return 'ok';
  },
});

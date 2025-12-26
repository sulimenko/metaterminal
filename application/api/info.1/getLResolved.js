/* eslint-disable no-unused-vars */
({
  access: 'public',
  method: async function () {
    lib.log.info({ args: Array.from(arguments) });
    console.warn('lib resolved: ', domain.marketData.tvClient.client.getResolved());
    return 'ok';
  },
});

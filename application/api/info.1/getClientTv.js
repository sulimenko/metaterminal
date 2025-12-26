/* eslint-disable no-unused-vars */
({
  access: 'public',
  method: async function () {
    lib.log.info({ args: Array.from(arguments) });
    console.warn('tvClient: ', domain.marketData.tvClient.client);
    return 'ok';
  },
});

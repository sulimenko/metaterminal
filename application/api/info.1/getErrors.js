/* eslint-disable no-unused-vars */
({
  access: 'public',
  method: async function () {
    lib.log.info({ args: Array.from(arguments) });
    console.warn('errors: ', domain.marketData.error.values);
    return 'ok';
  },
});

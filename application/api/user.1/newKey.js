/* eslint-disable camelcase */
({
  access: 'private',
  method: async function (data) {
    lib.log.info({ args: Array.from(arguments) });
    console.info('KEYS :', data);
    return data;
  },
});

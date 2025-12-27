/* eslint-disable camelcase */
({
  access: 'private',
  method: async function (data) {
    lib.log.info({ params: arguments[0] });
    console.info('KEYS :', data);
    return data;
  },
});

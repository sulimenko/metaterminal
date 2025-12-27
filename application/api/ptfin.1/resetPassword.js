/* eslint-disable camelcase */
({
  access: 'public',
  method: async function ({ login, email }) {
    lib.log.info({ params: arguments[0] });
    return lib.ptfin.resetPassword({ login, email });
  },
});

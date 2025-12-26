/* eslint-disable camelcase */
({
  access: 'public',
  method: async function ({ login, email }) {
    lib.log.info({ args: Array.from(arguments) });
    return lib.ptfin.resetPassword({ login, email });
  },
});

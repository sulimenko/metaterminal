/* eslint-disable camelcase */
({
  access: 'public',
  method: async ({ login, email }) => {
    return lib.ptfin.resetPassword({ login, email });
  },
});

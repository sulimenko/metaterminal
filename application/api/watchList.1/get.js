/* eslint-disable camelcase */
({
  access: 'private',
  method: async () => {
    return lib.wls.get({ login: context.session.state.login });
  },
});

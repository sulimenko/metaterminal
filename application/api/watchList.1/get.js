({
  access: 'private',
  method: async ({ name = 'main' }) => {
    return lib.wls.get({ login: context.session.state.login, name });
  },
});

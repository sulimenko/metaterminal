({
  access: 'private',
  method: async ({ name = 'main', instrument = {} }) => {
    return lib.wls.add({ login: context.session.state.login, name, instrument });
  },
});

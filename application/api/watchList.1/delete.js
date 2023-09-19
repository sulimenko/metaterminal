({
  access: 'private',
  method: async ({ name = 'main', instrument = {} }) => {
    return lib.wls.delete({ login: context.session.state.login, name, instrument });
  },
});

({
  access: 'private',
  method: async ({ name, instrument = {} }) => {
    return lib.wls.add({ login: context.session.state.login, name, instrument });
  },
});

({
  access: 'private',
  method: async function ({ name = 'main', instrument = {} }) {
    lib.log.info({ params: arguments[0] });
    return lib.wls.delete({ login: context.session.state.login, name, instrument });
  },
});

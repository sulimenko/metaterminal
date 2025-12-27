({
  access: 'private',
  method: async function ({ name, instrument = {} }) {
    lib.log.info({ params: arguments[0] });
    return lib.wls.add({ login: context.session.state.login, name, instrument });
  },
});

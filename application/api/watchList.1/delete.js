({
  access: 'private',
  method: async function ({ name = 'main', instrument = {} }) {
    lib.log.info({ args: Array.from(arguments) });
    return lib.wls.delete({ login: context.session.state.login, name, instrument });
  },
});

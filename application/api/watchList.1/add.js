({
  access: 'private',
  method: async function ({ name, instrument = {} }) {
    lib.log.info({ args: Array.from(arguments) });
    return lib.wls.add({ login: context.session.state.login, name, instrument });
  },
});

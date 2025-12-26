({
  access: 'private',
  method: async function ({ type }) {
    lib.log.info({ args: Array.from(arguments) });
    return lib.settings.get({ login: context.session.state.login, type });
  },
});

({
  access: 'private',
  method: async function ({ type }) {
    lib.log.info({ params: arguments[0] });
    return lib.settings.get({ login: context.session.state.login, type });
  },
});

({
  access: 'private',
  method: async function ({ updates }) {
    lib.log.info({ params: arguments[0] });
    return lib.settings.update({ login: context.session.state.login, updates });
  },
});

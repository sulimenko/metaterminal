({
  access: 'private',
  method: async function ({ updates }) {
    lib.log.info({ args: Array.from(arguments) });
    return lib.settings.update({ login: context.session.state.login, updates });
  },
});

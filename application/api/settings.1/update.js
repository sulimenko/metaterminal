({
  access: 'private',
  method: async ({ updates }) => {
    return lib.settings.update({ login: context.session.state.login, updates });
  },
});

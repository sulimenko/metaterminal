({
  access: 'private',
  method: async ({ type }) => {
    return lib.settings.get({ login: context.session.state.login, type });
  },
});

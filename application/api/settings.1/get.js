({
  access: 'private',
  method: async () => {
    return lib.settings.get({ login: context.session.state.login });
  },
});

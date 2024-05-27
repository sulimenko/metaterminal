({
  access: 'private',
  method: async () => {
    // const user = await api.auth.provider.getUser(login);
    return { id: context.session.state.user_id, login: context.session.state.login, type: context.session.state.type };
  },
});

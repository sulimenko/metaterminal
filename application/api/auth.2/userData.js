({
  access: 'private',
  method: async function () {
    lib.log.info({ params: arguments[0] });
    // const user = await api.auth.provider.getUser(login);
    return { id: context.session.state.user_id, login: context.session.state.login, type: context.session.state.type };
  },
});

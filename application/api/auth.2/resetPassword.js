({
  access: 'private',
  method: async ({ password }) => {
    const user = await api.auth.provider.getUser(context.client.session.state.login);
    const valid = await metarhia.metautil.validatePassword(password.old, user.password);
    if (!valid) return { error: true, status: 'error', text: 'Неверный пароль' };
    if (password.new !== password.confirm) return { error: true, status: 'error', text: 'Пароли не совпадают' };
    api.auth.provider.updatePassword({ login: context.client.session.state.login, password: password.new });
    return { error: false, status: 'success', text: 'Пароль изменён' };
  },
});

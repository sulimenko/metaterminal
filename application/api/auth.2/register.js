/* eslint-disable camelcase */
({
  access: 'public',
  method: async ({ user_id, login, password }) => {
    const hash = await metarhia.metautil.hashPassword(password);
    await api.auth.provider.registerUser(user_id, login, hash);
    const token = await context.client.startSession();
    return { status: 'success', token };
  },
});

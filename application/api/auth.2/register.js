({
  access: 'private',
  method: async ({ userId, login, password }) => {
    const hash = await metarhia.metautil.hashPassword(password);
    await api.auth.provider.registerUser({ userId, login, hash });
    const token = await context.client.startSession();
    return { status: 'success', token };
  },
});

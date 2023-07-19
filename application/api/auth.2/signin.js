/* eslint-disable camelcase */
({
  access: 'public',
  method: async ({ login, password }) => {
    const user = await api.auth.provider.getUser(login);
    if (!user) throw new Error('Incorrect login or password');
    const { user_id, password: hash } = user;
    const valid = await metarhia.metautil.validatePassword(password, hash);
    if (!valid) throw new Error('Incorrect login or password');
    console.log(`Logged user: ${login}`);
    const token = api.auth.provider.generateToken();
    const data = { user_id: user.user_id };
    context.client.startSession(token, data);
    const { ip } = context.client;
    await api.auth.provider.createSession(token, data, { ip, user_id });
    return { status: 'logged', token };
  },
});

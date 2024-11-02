({
  access: 'public',

  method: async ({ token }) => {
    // eslint-disable-next-line eqeqeq
    if (token == null || token === '') return { status: 'not logged' };

    console.warn('start:', token, context.client.session);
    if (domain.clients.terminal.starting) await lib.utils.wait(1000);
    domain.clients.terminal.starting = true;
    setTimeout(() => (domain.clients.terminal.starting = false));

    if (context.client.session && context.client.session.token === token) return { status: 'logged' };

    const restored = context.client.restoreSession(token);
    // console.log('restore:', restored, token, context.client.session);
    if (restored) return { status: 'logged' };
    const data = await api.auth.provider.readSession(token);
    if (data) {
      context.client.startSession(token, data);
      // console.warn('restore startSession:', context.client.session.token, context.client.session.state);
      domain.clients.terminal.setClient({
        // login: context.client.session.state.login,
        userId: context.client.session.state.user_id,
        client: context.client,
      });
      return { status: 'logged' };
    }
    return { status: 'not logged' };
  },
});

({
  access: 'public',
  method: async ({ token }) => {
    const restored = context.client.restoreSession(token);
    console.log(token, restored, context.client.sessions);
    if (restored) return { status: 'logged' };
    const data = await api.auth.provider.readSession(token);
    if (data) {
      context.client.startSession(token, data);
      return { status: 'logged' };
    }
    return { status: 'not logged' };
  },
});

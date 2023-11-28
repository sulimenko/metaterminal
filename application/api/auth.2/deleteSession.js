({
  access: 'public',
  method: async ({ token }) => {
    api.auth.provider.deleteSession(token);
    return 'OK';
  },
});

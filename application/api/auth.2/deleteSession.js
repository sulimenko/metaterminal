({
  access: 'public',
  method: async function ({ token }) {
    lib.log.info({ params: arguments[0] });
    api.auth.provider.deleteSession(token);
    return 'OK';
  },
});

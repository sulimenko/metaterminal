({
  access: 'public',
  method: async function ({ token }) {
    lib.log.info({ args: Array.from(arguments) });
    api.auth.provider.deleteSession(token);
    return 'OK';
  },
});

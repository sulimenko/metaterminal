({
  access: 'private',
  // method: async ({ name }) => {
  method: async function () {
    lib.log.info({ args: Array.from(arguments) });
    return lib.wls.get({ login: context.session.state.login });
  },
});

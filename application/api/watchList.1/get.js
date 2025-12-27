({
  access: 'private',
  // method: async ({ name }) => {
  method: async function () {
    lib.log.info({ params: arguments[0] });
    return lib.wls.get({ login: context.session.state.login });
  },
});

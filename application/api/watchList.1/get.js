({
  access: 'private',
  // method: async ({ name }) => {
  method: async () => {
    return lib.wls.get({ login: context.session.state.login });
  },
});

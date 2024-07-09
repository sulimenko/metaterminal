({
  access: 'private',
  method: async ({ id = null }) => {
    return lib.customers.personalData({ id: id || context.client.session.state.user_id });
  },
});

({
  access: 'private',
  method: async function ({ id = null }) {
    lib.log.info({ params: arguments[0] });
    return lib.customers.personalData({ id: id || context.client.session.state.user_id });
  },
});

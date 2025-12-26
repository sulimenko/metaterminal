({
  access: 'private',
  method: async function ({ id = null }) {
    lib.log.info({ args: Array.from(arguments) });
    return lib.customers.personalData({ id: id || context.client.session.state.user_id });
  },
});

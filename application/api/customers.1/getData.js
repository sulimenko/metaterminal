/* eslint-disable camelcase */
({
  access: 'private',
  method: async ({ user_id = null }) => {
    return lib.customers.personalData({ id: user_id || context.client.session.state.user_id });
  },
});

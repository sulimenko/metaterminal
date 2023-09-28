/* eslint-disable no-unused-vars */
({
  access: 'private',
  method: async ({ symbols }) => {
    return lib.marketData.addQuote({ userId: context.client.session.state.user_id, symbols });
  },
});

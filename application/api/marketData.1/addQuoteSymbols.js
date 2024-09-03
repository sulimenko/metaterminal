({
  access: 'private',
  method: async ({ instruments }) => {
    return lib.marketData.addQuote({ userId: context.client.session.state.user_id, instruments });
  },
});

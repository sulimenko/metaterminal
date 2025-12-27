({
  access: 'private',
  method: async function ({ instruments }) {
    lib.log.info({ params: arguments[0] });
    return lib.marketData.addQuote({ userId: context.client.session.state.user_id, instruments });
  },
});

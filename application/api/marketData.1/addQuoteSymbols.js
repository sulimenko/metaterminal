({
  access: 'private',
  method: async function ({ instruments }) {
    lib.log.info({ args: Array.from(arguments) });
    return lib.marketData.addQuote({ userId: context.client.session.state.user_id, instruments });
  },
});

({
  access: 'private',
  method: async ({ instruments }) => {
    for (const symbol in instruments) {
      if (!['FUT'].includes(instruments[symbol].asset_category)) {
        const quote = await domain.marketData.quotes.getQuote({ instrument: instruments[symbol] });
        quote.addSigner(context.client.session.state.user_id);
        // return lib.marketData.addQuote({ userId: context.client.session.state.user_id, instruments });
      }
    }
  },
});

// eslint-disable-next-line no-unused-vars
async ({ userId, instruments }) => {
  // console.info(userId, instruments);
  const quoteArray = [];
  for (const key in instruments) {
    // console.info(key);
    if (!['FUT'].includes(instruments[key].asset_category)) {
      const data = domain.marketData.quotes.getQuote({ instrument: instruments[key] });
      // if (userId) data.signers.add(userId);
      domain.marketData.quotes.values.set(instruments[key].symbol, data);
      if (instruments[key].asset_category !== 'OPT') quoteArray.push(instruments[key].source + ':' + instruments[key].symbol);
    }
  }

  domain.marketData.tvClient.client.addQuoteSymbols({ symbols: quoteArray });
  return 'add ' + quoteArray.join(', ');
};

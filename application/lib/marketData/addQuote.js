async ({ userId, instruments }) => {
  console.log(userId, instruments);
  const quoteArray = [];
  for (const key in instruments) {
    // console.log(key);
    if (!['OPT', 'FUT'].includes(instruments[key].asset_category)) {
      const data = domain.marketData.quotes.getQuote({ symbol: instruments[key].symbol });
      if (userId) data.signers.add(userId);
      domain.marketData.quotes.values.set(instruments[key].symbol, data);
      quoteArray.push(instruments[key].source + ':' + instruments[key].symbol);
    }
  }
  domain.marketData.tvClient.client.addQuoteSymbols({ symbols: quoteArray });

  return 'add ' + quoteArray.join(', ');
};

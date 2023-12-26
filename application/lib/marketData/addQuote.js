async ({ userId, symbols }) => {
  // console.log(userId, symbols);
  const quoteArray = [];
  for (const key in symbols) {
    // console.log(key);
    if (!['OPT', 'FUT'].includes(symbols[key].asset_category)) {
      const data = domain.marketData.quotes.getQuote({ symbol: symbols[key].symbol });
      if (userId) data.signers.add(userId);
      domain.marketData.quotes.values.set(symbols[key].symbol, data);
      quoteArray.push(symbols[key].source + ':' + symbols[key].symbol);
    }
  }
  // console.log(quoteArray);
  domain.marketData.tvClient.client.addQuoteSymbols({ symbols: quoteArray });

  // if (symbol === '*') return this.list.get();
  // return this.list.get(symbols);
  return 'add ' + quoteArray.join(', ');
};

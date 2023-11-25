async ({ userId, symbols }) => {
  // console.log(userId, symbols);
  const symbolsArray = [];
  for (const key in symbols) {
    // console.log(key);
    if (!['OPT', 'FUT'].includes(symbols[key].asset_category)) {
      const data = domain.marketData.quotes.getQuote({ symbol: symbols[key].symbol });
      data.signers.add(userId);
      domain.marketData.quotes.values.set(symbols[key].symbol, data);
      symbolsArray.push(symbols[key].source + ':' + symbols[key].symbol);
    }
  }
  // console.log(symbolsArray);
  domain.marketData.tvClient.client.addQuoteSymbols({ symbols: symbolsArray });

  // if (symbol === '*') return this.list.get();
  // return this.list.get(symbols);
  return 'add ' + symbolsArray.join(', ');
};

async ({ userId, symbols }) => {
  // console.log(account, symbols, client);

  symbols.forEach((symbol) => {
    const data = domain.marketData.quotes.getQuote({ symbol });
    data.signers.add(userId);
    domain.marketData.quotes.values.set(symbol, data);
  });
  domain.marketData.tvClient.client.addQuoteSymbols({ symbols });

  // if (symbol === '*') return this.list.get();
  // return this.list.get(symbols);
  return 'add ' + symbols.join(', ');
};

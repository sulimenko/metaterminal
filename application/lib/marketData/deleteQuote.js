async ({ symbol, account }) => {
  // console.log(account, symbols, client);

  const data = domain.marketData.source.getSymbol({ symbol });
  if (data.signers.has(account)) {
    data.signers.delete(account);
    if (data.signers.size === 0) {
      domain.marketData.source.tvClient.deleteQuoteSymbol({ symbol });
    }
    domain.marketData.source.symbols.set(symbol, data);
    // domain.marketData.source.clients.set(account, client);
  }

  return 'delete symbol ' + symbol;
};

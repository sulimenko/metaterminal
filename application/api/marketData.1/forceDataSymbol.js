({
  access: 'public',
  method: async ({ instrument }) => {
    const data = api.marketData.getDataSymbols({ symbols: [instrument.symbol] })[instrument.symbol];
    if (Object.keys(data).length !== 0) return data;
    lib.marketData.addQuote({ userId: null, symbols: { [instrument.symbol]: instrument } });
    await lib.utils.wait(500);
    return api.marketData.forceDataSymbol({ instrument });
  },
});

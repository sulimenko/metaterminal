({
  access: 'private',
  method: async ({ symbols }) => {
    const data = {};
    symbols.forEach((symbol) => {
      data[symbol] = domain.marketData.source.symbols.get(symbol).data;
    });
    return data;
  },
});

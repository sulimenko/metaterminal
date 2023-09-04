({
  access: 'private',
  method: ({ symbols }) => {
    const data = {};
    symbols.forEach((symbol) => {
      data[symbol] = domain.marketData.data.getData({ symbol }).data;
    });
    return data;
  },
});

({
  access: 'private',
  method: ({ symbols }) => {
    const data = {};
    for (const symbol of symbols) {
      console.log(symbol);
      data[symbol] = domain.marketData.data.getData({ symbol }).data;
    }
    return data;
  },
});

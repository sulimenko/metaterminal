({
  access: 'public',
  method: ({ symbols }) => {
    const data = {};
    for (const symbol of symbols) {
      data[symbol] = domain.marketData.data.getData({ symbol }).data;
    }
    return data;
  },
});

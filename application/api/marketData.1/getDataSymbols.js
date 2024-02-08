({
  access: 'public',
  method: async ({ symbols }) => {
    const data = {};
    for (const symbol of symbols) {
      data[symbol] = await domain.marketData.data.getData({ symbol }).data;
    }
    return data;
  },
});

/* eslint-disable no-unused-vars */
({
  access: 'public',
  method: async () => {
    for (const [key, value] of domain.marketData.charts.values.entries()) {
      console.warn(key, value);
    }
    return 'OK';
  },
});

/* eslint-disable no-unused-vars */
({
  access: 'public',
  method: async () => {
    for (const [symbol, value] of Object.entries(domain.marketData.chains.values)) {
      for (const [exp, chain] of Object.entries(value)) {
        console.warn(symbol, exp, chain);
      }
      // for (const key of Object.keys(value)) {
      //   console.warn(key, value[key].data);
      // }
    }
    return 'OK';
  },
});

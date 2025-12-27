/* eslint-disable no-unused-vars */
({
  access: 'public',
  method: async function ({ symbols = [] }) {
    lib.log.info({ params: arguments[0] });
    const result = {};
    if (symbols.length === 0) symbols = Object.keys(domain.marketData.data.values);
    for (const symbol of symbols) {
      result[symbol] = domain.marketData.data.getData({ instrument: { symbol } });
      console.info('data', 'getData', symbol);
      // console.warn('getData: ', JSON.parse(result[symbol]));
    }
    return result;
  },
});

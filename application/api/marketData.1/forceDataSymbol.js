({
  access: 'public',
  method: async function ({ instrument, end }) {
    lib.log.info({ params: arguments[0] });
    // console.info('forceDataSymbol1', instrument);
    if (end === undefined) end = new Date().getTime() + 1000;
    const data = await api.marketData.getDataSymbols({ symbols: [instrument.symbol] });
    // console.info('forceDataSymbol2', data);
    if (new Date() > end) return data[instrument.symbol];
    if (typeof data[instrument.symbol] === 'object' && Object.keys(data[instrument.symbol]).length !== 0) return data[instrument.symbol];
    lib.marketData.addQuote({ userId: null, symbols: { [instrument.symbol]: instrument } });
    await lib.utils.wait(500);
    return api.marketData.forceDataSymbol({ instrument, end });
  },
});

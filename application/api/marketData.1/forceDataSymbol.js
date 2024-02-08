({
  access: 'public',
  method: async ({ message }) => {
    console.log('forceDataSymbol1', message);
    const data = (await api.marketData.getDataSymbols({ symbols: [message.instrument.symbol] }))[message.instrument.symbol];
    console.log('forceDataSymbol2', data);
    if (Object.keys(data).length !== 0) return data;
    lib.marketData.addQuote({ userId: null, symbols: { [message.instrument.symbol]: message.instrument } });
    await lib.utils.wait(500);
    return api.marketData.forceDataSymbol({ message });
  },
});

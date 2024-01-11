/* eslint-disable camelcase */
({
  access: 'public',
  // eslint-disable-next-line no-unused-vars
  method: async (symbols) => {
    console.log('getApiPrice: ', symbols.join(','));
    const prices = [];
    const alpaca = domain.clients.alpaca.get({ key: 'main' });
    // console.log(alpaca);
    for (const instrument of await alpaca.getSnapshots(symbols)) {
      //   console.log('instrument: ', instrument);
      prices.push({
        symbol: instrument.symbol,
        price: instrument.LatestTrade.Price.toFixed(2),
        prevClose: instrument.PrevDailyBar.ClosePrice.toFixed(2),
        change: (instrument.LatestTrade.Price - instrument.PrevDailyBar.ClosePrice).toFixed(2),
        changeP: ((instrument.LatestTrade.Price / instrument.PrevDailyBar.ClosePrice - 1) * 100).toFixed(2),
      });
    }
    return prices;
  },
});

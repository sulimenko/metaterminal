// eslint-disable-next-line no-unused-vars
async ({ userId, instruments }) => {
  //   // console.info(userId, instruments);
  //   // const quoteArray = [];
  //   // const client = await domain.clients.ts.getClient();
  //   for (const key in instruments) {
  //     // console.info(key);
  //     if (!['FUT'].includes(instruments[key].asset_category)) {
  //       const quote = await domain.marketData.quotes.getQuote({ instrument: instruments[key] });
  //       // const data = domain.marketData.quotes.getQuote({ instrument: instruments[key] });
  //       // if (data !== undefined)
  //       if (userId) quote.addSigner(userId);
  //       // domain.marketData.quotes.values.set(instruments[key].symbol, data);
  //       // if (instruments[key].asset_category === 'OPT') {
  //       //   if (instruments[key].source === 'TS') {
  //       //     // let client = await domain.clients.ts.getClient();
  //       //     console.info('Add option:', instruments[key].symbol);
  //       //     client.api.stream.matrix({ symbol: lib.utils.makeTSOptionSymbol(key), type: instruments[key].asset_category });
  //       //   }
  //       // } else {
  //       // quoteArray.push(instruments[key].source + ':' + instruments[key].symbol);
  //       // }
  //     }
  //   }
  //   // domain.marketData.tvClient.client.addQuoteSymbols({ symbols: quoteArray });
  //   return 'add ' + instruments.map((e) => e.symbol).join(', ');
};

/* eslint-disable camelcase */
async () => {
  const protocol = config.ts.main.url.search('https') !== -1 ? 'wss' : 'ws';
  const options = { reconnectTimeout: 1000 };
  const url = config.ts.main.url.replace('https://', '').replace('http://', '');

  const metacom = metarhia.metacom.Metacom.create(protocol + '://' + url + ':' + config.ts.main.port + '/api', options);
  await metacom.load('account', 'auth', 'find', 'info', 'marketdata', 'options', 'orderexecution', 'stream');

  metacom.api.stream.on('levelII', async (data) => {
    const { symbol, ...quote } = data;
    if (parseFloat(quote.price) > 0) {
      domain.marketData.quotes.getQuote({ instrument: { symbol } }).then((exist) => exist.addBook({ quote }));
    }
  });

  metacom.api.stream.on('chain', async (data) => {
    // console.info(JSON.stringify(data));
    let inactive = true;
    const { chain, symbol, expiration } = data;
    const chainData = await domain.marketData.chains.getChainData({ instrument: { symbol }, expiration });
    for (const userId of chainData.getSigners()) {
      // console.info('Emit chain to user:', userId);
      const client = domain.clients.terminal.getClient({ userId });
      if (client) {
        inactive = false;
        client.emit('marketData/chain', data);
      }
    }
    if (inactive) lib.ts.optionChain({ instrument: { symbol }, expiration, stop: true, userId: null });
    chainData.addData(chain);
  });

  metacom.api.stream.on('quote', async (data) => {
    // let inactive = true;
    const { ask, ask_size, bid, bid_size, ...rest } = data;
    if (parseFloat(bid) <= 0 || parseFloat(ask) <= 0) return;
    const exist = await domain.marketData.quotes.getQuote({ instrument: { symbol: rest.symbol } });
    const book = {
      [ask.toString()]: { price: parseFloat(ask), type: 'ask', size: ask_size },
      [bid.toString()]: { price: parseFloat(bid), type: 'bid', size: bid_size },
    };
    // for (const userId of exist.getSigners()) {
    //   const client = domain.clients.terminal.getClient({ userId });
    //   if (client) {
    //     // inactive = false;
    //     client.emit('marketData/quote', { symbol: rest.symbol, book });
    //   }
    // }
    // if (inactive) exist.stop(); /// !!!

    for (const key of Object.keys(book)) exist.addBook(book[key]);
    exist.addData(rest);
    // console.warn('on quote', data);
  });
  metacom.api.stream.on('chart', (data) => {
    console.warn('on chart', data);
  });

  // console.info('Connect to Metacom:');
  // console.info(Object.keys(metacom.api));
  // const exp = await metacom.api.options.expirations({ symbol: 'TSLA' });
  // console.warn('Expirations:', exp);

  // metacom.api.stream.matrix({ symbol: 'ORCL 251003P287.5' });

  // console.info(domain.clients.terminal.values);
  // const client = domain.clients.terminal.getClient({ userId: '677779fa-299a-36ff-18f3-5ddbc6023dd8' });
  // client.emit('marketData/levelII', data);

  return metacom;
};

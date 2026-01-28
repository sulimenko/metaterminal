/* eslint-disable camelcase */
({
  defaultQuote: ({ instrument }) => {
    const quote = { instrument, status: 'loading', book: {}, value: {}, signers: new Set() };
    quote.getSigners = () => quote.signers;
    quote.stop = async (userId) => domain.marketData.quote.gracefulStop({ userId, instrument });
    quote.addBook = ({ price, type, size }) => {
      if (type === 'delete') delete quote.book[price.toString()];
      else quote.book[price.toString()] = { price, type, size };
    };
    quote.addData = (data) => {
      for (const key of Object.keys(data)) {
        if (['book'].includes(key)) continue;
        quote.value[key] = data[key];
      }
    };
    quote.addSigner = (userId) => quote.signers.add(userId);
    quote.deleteSigner = (userId) => {
      quote.signers.delete(userId);
      if (quote.signers.size === 0) quote.stop();
      return;
    };
    quote.sendBook = () => {
      for (const userId of quote.getSigners()) {
        let inactive = true;
        const client = domain.clients.terminal.getClient({ userId });
        if (client) {
          inactive = false;
          client.emit('marketData/chain', quote.book);
        }
        if (inactive) quote.deleteSigner(userId);
      }
    };
    return quote;
  },
  values: {},

  async getQuote({ instrument }) {
    if (instrument?.symbol === undefined) return null;
    // if (this.tvClient === null || this.tsClient === null) return [];
    let data = this.values[instrument.symbol];

    if (data === undefined) {
      data = this.values[instrument.symbol] = this.defaultQuote({ instrument });
      if (instrument.source === 'TS') {
        // const symbol = lib.utils.makeTSOptionSymbol(instrument.symbol);
        const client = await domain.clients.ts.getClient();
        // client.api.stream.matrix({ symbol, type: instrument.asset_category, stream: true });
        client.api.stream.quotes({ instruments: [instrument], stream: true });
      } else if (instrument.source === 'TN') {
        lib.marketData.requestQuote({ instruments: [instrument] });
      } else {
        await domain.marketData.tvClient.client.addQuoteSymbols({ symbols: [instrument.source + ':' + instrument.symbol] });
      }
      // data = this.values[instrument.symbol];
      // if (!instrument.asset_category) {
      //   const optionPattern = /^[A-Z]{1,5}(\d{6})[CP]\d{8}$/;
      //   // console.warn(instrument, optionPattern.test(instrument.symbol));
      //   if (optionPattern.test(instrument.symbol)) instrument.asset_category = 'OPT';
      // }
    }
    return data;
  },
  // getQuoteSigner({ userId }) {
  //   for (const symbol of Object.keys(this.values)) {
  //     if (this.values[symbol].signers.has(userId)) {
  //       return { symbol, value: this.values[symbol] };
  //     }
  //   }
  //   return null;
  // },
  // addQuote({ instrument, quote }) {
  //   if (instrument?.symbol === undefined) return null;
  //   const existQuote = this.getQuote({ instrument });
  //   existQuote.data = { ...existQuote.data, ...quote };
  //   for (const userId of existQuote.signers) {
  //     const { symbol, source, ...book } = existQuote.data;
  //     const client = domain.clients.terminal.getClient({ userId });
  //     // if (client) client.emit('marketData/quote', existQuote.data);
  //     if (client) client.emit('marketData/quote', { instrument: { symbol, source }, source, book });
  //   }
  //   return existQuote;
  // },
  async gracefulStop({ userId, instrument }) {
    const quote = this.values[instrument.symbol];
    quote.signers.delete(userId);
    if (quote.signers.size > 0) return;
    delete this.values[instrument.symbol];
    // chain.status = 'stopping';
    if (instrument.source === 'TS') {
      await this.client.api.options.chain({ symbol: instrument.symbol, stream: true, stop: true });
      return;
    }
  },
});

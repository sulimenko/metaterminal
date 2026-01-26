/* eslint-disable camelcase */
({
  default: ({ instrument }) => {
    return { data: { symbol: instrument.symbol }, signers: new Set() };
  },
  values: {},
  getQuote({ instrument }) {
    if (instrument?.symbol === undefined) return null;
    let data = this.values[instrument.symbol];

    if (data === undefined) {
      data = this.values[instrument.symbol] = this.default({ instrument });
      // data = this.values[instrument.symbol];
      // if (instrument.symbol === 'JOBY241115C00005000') console.warn('new quote', instrument);
      if (!instrument.asset_category) {
        const optionPattern = /^[A-Z]{1,5}(\d{6})[CP]\d{8}$/;
        // console.warn(instrument, optionPattern.test(instrument.symbol));
        if (optionPattern.test(instrument.symbol)) instrument.asset_category = 'OPT';
      }
      if (instrument.asset_category === 'OPT') {
        data.source = 'TN';
        console.warn('OPT source TN: ', { instruments: [{ symbol: instrument.symbol }] });
        lib.marketData.requestQuote({ instruments: [{ symbol: instrument.symbol }] });
      }
    }
    return data;
  },
  getQuoteSigner({ userId }) {
    for (const symbol of Object.keys(this.values)) {
      if (this.values[symbol].signers.has(userId)) {
        return { symbol, value: this.values[symbol] };
      }
    }
    return null;
  },
  addQuote({ instrument, quote }) {
    if (instrument?.symbol === undefined) return null;
    const existQuote = this.getQuote({ instrument });
    existQuote.data = { ...existQuote.data, ...quote };
    for (const userId of existQuote.signers) {
      const { symbol, source, ...book } = existQuote.data;
      const client = domain.clients.terminal.getClient({ userId });
      // if (client) client.emit('marketData/quote', existQuote.data);
      if (client) client.emit('marketData/quote', { instrument: { symbol, source }, source, book });
    }
    return existQuote;
  },
});

/* eslint-disable camelcase */
({
  default: ({ instrument }) => {
    return { data: { symbol: instrument.symbol }, signers: new Set() };
  },
  values: new Map(),
  requestList: new Set(),
  getQuote({ instrument }) {
    let data = this.values.get(instrument.symbol);
    // if (instrument.symbol === 'JOBY241115C00005000') console.warn('has quote', data);
    if (data === undefined) {
      data = this.values.set(instrument.symbol, this.default({ instrument })).get(instrument.symbol);
      // if (instrument.symbol === 'JOBY241115C00005000') console.warn('new quote', instrument);
      if (!instrument.asset_category) {
        const optionPattern = /^[A-Z]{1,5}(\d{6})[CP]\d{8}$/;
        // console.warn(instrument, optionPattern.test(instrument.symbol));
        if (optionPattern.test(instrument.symbol)) instrument.asset_category = 'OPT';
      }
      if (instrument.asset_category === 'OPT') {
        data.source = 'TN';
        this.requestList.add(instrument);
        lib.marketData.requestQuote({ instruments: [{ symbol: instrument.symbol }] });
      }
    }
    return data;
  },
  getQuoteSigner({ userId }) {
    for (const [key, value] of this.values.entries()) {
      if (value.signers.has(userId)) {
        return { symbol: key, value };
      }
    }
    return null;
  },
});
